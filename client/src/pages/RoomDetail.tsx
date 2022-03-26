import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled/macro";
import { Global, css } from "@emotion/react";
import { io } from "socket.io-client";
import MessageList from "../components/ChatRoomDetail/MessageList";
import TopNavigation from "../components/ChatRoomDetail/TopNavigation";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { fetchMyProfile } from "../api/userApi";
import { fetchChatRoomDetail } from "../api/roomApi";
import { fetchChatMassageList, sendChatMessage } from "../api/chatApi";
import { AxiosError, AxiosResponse } from "axios";
import { IChat, IProfile, IRoom } from "../types";
import SentMessage from "../components/ChatRoomDetail/SentMessage";
import ReceiveMessage from "../components/ChatRoomDetail/ReceiveMessage";
import InputChat from "../components/ChatRoomDetail/InputChat";
import { API_HOST } from "../config";

const Base = styled.div`
  position: relative;
  list-style: none;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 64px;
  align-items: center;
  padding: 0 24px;
`;

const globalStyle = css`
  body {
    background-color: #abc1d1;
  }
`;

const RoomDetail: React.FC = () => {
  const { roomId } = useParams<string>();
  const scroolBottomRef = useRef<HTMLLIElement>(null);

  const { data: profileData } = useQuery<AxiosResponse<IProfile>, AxiosError>(
    "fetchMyProfile",
    fetchMyProfile
  );
  const { data: chatRoomDetailData } = useQuery<
    AxiosResponse<IRoom>,
    AxiosError
  >(["fetchChatRoomDetail", roomId], () =>
    fetchChatRoomDetail(roomId as string)
  );
  const { data: chatListData } = useQuery<
    AxiosResponse<Array<IChat>>,
    AxiosError
  >(["fetchChatMessageList", roomId], () =>
    fetchChatMassageList(roomId as string)
  );

  const [messages, setMessages] = useState<Array<IChat>>(
    chatListData?.data || []
  );

  useEffect(() => {
    const socket = io(`${API_HOST}/chat`, { path: "/socket.io" });

    socket.emit("join", roomId);

    socket.on("chat", (newMessage: IChat) => {
      setMessages((prev) => [...prev, newMessage]);
    });
  }, []);

  const mutation = useMutation("sendChatMessage", (content: string) =>
    sendChatMessage(roomId as string, content)
  );

  const handleSend = (content: string) => {
    if (content.length) {
      mutation.mutate(content);
    }
  };

  useEffect(() => {
    if (scroolBottomRef.current !== null) {
      scroolBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (scroolBottomRef.current !== null) {
      scroolBottomRef.current.scrollIntoView({ block: "start" });
    }
  }, []);

  return (
    <Base>
      <Global styles={globalStyle} />
      {chatRoomDetailData && (
        <TopNavigation title={chatRoomDetailData.data.user.username} />
      )}
      <Container>
        <MessageList>
          {messages.map((message) =>
            message.senderId === profileData?.data.userId ? (
              <SentMessage
                key={message.id}
                senderId={message.senderId}
                content={message.content}
                timestamp={message.createdAt}
              />
            ) : (
              <ReceiveMessage
                key={message.id}
                receiver={message.user?.username}
                senderId={message.senderId}
                content={message.content}
                timestamp={message.createdAt}
              />
            )
          )}
        </MessageList>
      </Container>
      <li ref={scroolBottomRef} />
      <InputChat onClick={handleSend} />
    </Base>
  );
};

export default RoomDetail;
