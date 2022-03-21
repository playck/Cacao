import React from "react";
import styeld from "@emotion/styled/macro";
import { useNavigate } from "react-router-dom";
import { BiSearchAlt2, BiArrowBack } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";

const Base = styeld.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 36px;
    box-sizing: border-box;
`;

const Title = styeld.h1`
  font-size: 20px;
  margin: 0;
  padding: 0;
`;

const ActionItemContainer = styeld.div``;

const ActionItem = styeld.span`
  font-size: 20px;
  padding: 0 8px;
`;

interface Props {
  title: string;
}

const TopNavigation: React.FC<Props> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <Base>
      <ActionItem onClick={() => navigate("/rooms", { replace: true })}>
        <BiArrowBack />
      </ActionItem>
      <Title>{title}</Title>
      <ActionItemContainer>
        <ActionItem>
          <BiSearchAlt2 />
        </ActionItem>
        <ActionItem>
          <GiHamburgerMenu />
        </ActionItem>
      </ActionItemContainer>
    </Base>
  );
};

export default TopNavigation;
