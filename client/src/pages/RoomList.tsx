import React from "react";
import BottomNavigation from "../components/BottomNavigation";
import TopNavigation from "../components/TopNavigation";
import styled from "@emotion/styled";

const RoomList = () => {
  const Base = styled.div``;

  const Container = styled.div``;

  return (
    <Base>
      <Container>
        <TopNavigation title="채팅" />
        {/* <ChatRoomList /> */}
        <BottomNavigation />
      </Container>
    </Base>
  );
};

export default RoomList;
