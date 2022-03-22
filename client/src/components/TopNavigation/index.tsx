import React from "react";
import styled from "@emotion/styled/macro";

import { BiSearchAlt2 } from "react-icons/bi";
import { RiChatNewLine } from "react-icons/ri";
import { HiOutlineMusicNote } from "react-icons/hi";
import { AiOutlineSetting } from "react-icons/ai";

const Base = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 12px;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  background-color: #fff;
`;

const Title = styled.h1`
  font-size: 20px;
  margin: 0;
  padding: 0;
`;

const ActionItemContainer = styled.div``;

const ActionItem = styled.span`
  font-size: 20px;
  padding: 0 15px;
`;

interface Props {
  title: string;
}

const TopNavigation: React.FC<Props> = ({ title }) => {
  return (
    <Base>
      <Title>{title}</Title>
      <ActionItemContainer>
        <ActionItem>
          <BiSearchAlt2 />
        </ActionItem>
        <ActionItem>
          <RiChatNewLine />
        </ActionItem>
        <ActionItem>
          <HiOutlineMusicNote />
        </ActionItem>
        <ActionItem>
          <AiOutlineSetting />
        </ActionItem>
      </ActionItemContainer>
    </Base>
  );
};

export default TopNavigation;
