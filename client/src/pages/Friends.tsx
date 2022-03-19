import React from "react";
import styled from "@emotion/styled/macro";
import { useNavigate } from "react-router-dom";
import TopNavigation from "../components/TopNavigation";
import BottomNavigation from "../components/BottomNavigation";
import { useMutation, useQuery } from "react-query";
import { fetchMyProfile, fetchUserList } from "../api/userApi";
import { AxiosError, AxiosResponse } from "axios";
import Profile from "../components/Profile";
import Friend from "../components/FriendList/Firend";
import FriendList from "../components/FriendList";
import { IProfile, IRoom, IUser } from "../types";
import {
  makeChatRoom,
  MakeChatRoomRequest,
  fetchChatRoomList,
} from "../api/roomApi";

const Base = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 12px;
  box-sizing: border-box;
`;

const Contianer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Summary = styled.small`
  margin: 4px 0;
  padding: 24px 0 0 0;
`;

const Friends: React.FC = () => {
  const navigate = useNavigate();
  const { data: profileData } = useQuery<AxiosResponse<IProfile>, AxiosError>(
    "fetchMyProfile",
    fetchMyProfile
  );

  const { data: userData } = useQuery<
    AxiosResponse<{ count: number; rows: Array<IUser> }>,
    AxiosError
  >("fetchUserList", fetchUserList);

  const { data: chatRoomListData } = useQuery<
    AxiosResponse<Array<IRoom>>,
    AxiosError
  >("fetchChatRoomList", fetchChatRoomList);

  const mutation = useMutation("makeChatRoom", (request: MakeChatRoomRequest) =>
    makeChatRoom(request)
  );

  const handleChatRoomCreate = (opponentId: string) => {
    const chatRoom = chatRoomListData?.data.find(
      (chatRoom) => chatRoom.opponentId === opponentId
    );

    if (chatRoom) {
      navigate(`/rooms/${chatRoom.id}`);
    } else {
      mutation.mutate(
        {
          opponentId,
        },
        {
          onSuccess: (data) => {
            navigate(`/room${data.data.id}`);
          },
        }
      );
    }
  };

  return (
    <Base>
      <Contianer>
        <TopNavigation title="친구" />
        {profileData && <Profile username={profileData.data.username} />}
        {userData && (
          <>
            <Summary>친구: {userData.data.count}</Summary>
            <FriendList>
              {userData.data.rows.map((row) => (
                <Friend
                  key={row.id}
                  username={row.username}
                  thumbnailImage={row.thumbnailImageUrl}
                  onClick={() => handleChatRoomCreate(row.id)}
                />
              ))}
            </FriendList>
          </>
        )}
        <BottomNavigation />
      </Contianer>
    </Base>
  );
};

export default Friends;
