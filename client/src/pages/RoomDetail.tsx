import React from "react";
import styled from "@emotion/styled/macro";
import { Global, css } from "@emotion/react";
import BottomNavigation from "../components/BottomNavigation";

const Base = styled.div``;

const Container = styled.div``;

const globalStyle = css`
  body {
    background-color: #abc1d1;
  }
`;

const RoomDetail: React.FC = () => {
  return (
    <Base>
      <Global styles={globalStyle} />
      <Container>{}</Container>

      <BottomNavigation />
    </Base>
  );
};

export default RoomDetail;
