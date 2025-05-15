import styled from 'styled-components';

export const ChatWrapper = styled.div`
  width: 400px;
  border: 1px solid #ddd;
  border-radius: 16px;
  overflow: hidden;
  font-family: 'Apple SD Gothic Neo', sans-serif;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

export const Header = styled.div`
  background: #f7f7f7;
  padding: 16px;
  border-bottom: 1px solid #eee;
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

export const Description = styled.div`
  color: #888;
  font-size: 12px;
  margin-top: 4px;
`;

export const MessageBox = styled.div`
  padding: 16px;
  flex-grow: 1;
  overflow-y: auto;
`;

export const Message = styled.div`
  background-color: ${({ isSystem }) => (isSystem ? '#f2f2f2' : '#daf1ff')};
  border-radius: 12px;
  padding: 12px;
  font-size: 14px;
  white-space: pre-wrap;
  margin-bottom: 12px;
`;

export const IconList = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 12px 16px;
  background-color: #f9f9f9;
  border-top: 1px solid #eee;
`;

export const IconButton = styled.button`
  font-size: 14px;
  background: #fff;
  border: 1px solid #ddd;
  padding: 6px 12px;
  border-radius: 16px;
  cursor: pointer;
  &:hover {
    background-color: #efefef;
  }
`;

export const BottomInput = styled.div`
  display: flex;
  border-top: 1px solid #eee;
  padding: 8px;
`;

export const InputField = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
  font-size: 14px;
`;

export const SendButton = styled.button`
  margin-left: 8px;
  padding: 8px 16px;
  background-color: #00aaff;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #008ecc;
  }
`;
