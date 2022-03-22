import React from "react";
import styeld from "@emotion/styled/macro";

export interface MessageType {
  senderId: string;
  content: string;
  timestamp: string;
}

const Base = styeld.ul`
  list-style: none;
  margin: 0;
  padding: 0 0 60px 0;
  width: 100%;
  > li + li {
    margin-top: 20px;
  }
`;

const MessageList: React.FC = ({ children }) => {
  return <Base>{children}</Base>;
};

export default MessageList;
