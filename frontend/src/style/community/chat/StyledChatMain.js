import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: auto;
`;

export const ConnectionStatus = styled.span`
  color: ${({ connected }) => (connected ? "green" : "red")};
`;

export const ChatBox = styled.div`
  border: 1px solid #ccc;
  height: 300px;
  overflow-y: scroll;
  margin-bottom: 10px;
  padding: 10px;
`;

export const MessageRow = styled.div`
  margin-bottom: 5px;
`;

export const JoinMsg = styled.em`
  color: green;
  margin-left: 5px;
`;

export const LeaveMsg = styled.em`
  color: red;
  margin-left: 5px;
`;

export const ChatForm = styled.form`
  display: flex;
`;

export const ChatInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  margin-right: 10px;
`;

export const ChatButton = styled.button`
  padding: 10px;
`;
