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

export const AuthErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 전체 뷰포트 높이 */
  text-align: center;
  padding: 20px;
  background-color: #f8f9fa; /* 부드러운 배경색 */
`;

export const AuthErrorTitle = styled.h1`
  color: #232222;
  margin-bottom: 20px;
`;

export const AuthErrorMessage = styled.p`
  font-size: 1.2em;
  margin-bottom: 30px;
`;

export const AuthErrorButton = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const InfoMessage = styled.div`
  padding: 20px;
  text-align: center;
`;

