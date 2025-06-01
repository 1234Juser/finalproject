import styled from 'styled-components';

export const ChatWrapper = styled.div`
  width: 400px;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: 'Noto Sans KR', Arial, sans-serif; // 한글 폰트 추가
  background-color: #fff;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

export const Header = styled.div`
  background: #f7f7f7;
  padding: 16px;
  border-bottom: 1px solid #eee;
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 1.25em; // 약간 크게
`;

export const Description = styled.div`
  color: #888;
  font-size: 12px;
  margin-top: 4px;
`;

export const MessageBox = styled.div`
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    gap: 12px; // 메시지 간 간격

    /* 항상 하단에 메시지가 오도록 설정 */
    justify-content: flex-end;

    /* 스크롤바 스타일링 (선택 사항) */
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 3px;
    }
    &::-webkit-scrollbar-track {
        background-color: #f0f0f0;
    }

`;

// 개별 메시지 스타일
export const Message = styled.div`
  background-color: ${({ $isSystem, $isUser }) => {
    if ($isSystem) return '#2e4684';
    if ($isUser) return '#daf1ff';
    return '#fff';
  }};
  border-radius: 12px;
  padding: 12px;
  font-size: 14px;
  white-space: pre-wrap;
    align-self: ${(props) => (props.$isUser ? 'flex-end' : (props.$isSystem ? 'center' : 'flex-start'))};
    max-width: 80%;
    text-align: ${(props) => (props.$isSystem ? 'center' : 'left')};
    font-style: ${(props) => (props.$isSystem ? 'italic' : 'normal')};
    color: ${(props) => (props.$isSystem ? '#FFFFFF' : 'black')};
`;


// 하단 입력 필드 및 전송 버튼 컨테이너
export const BottomInput = styled.div`
    display: flex;
    border-top: 1px solid #eee;
    padding: 8px;
    background-color: #fff;
`;


// 입력 필드 스타일
export const InputField = styled.textarea`
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 20px;
    outline: none;
    font-size: 14px;
    resize: none;
    height: 50px;
    overflow-y: auto;

    &:focus {
        border-color: #66afe9;
        box-shadow: 0 0 5px rgba(102, 175, 233, 0.6);
    }
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


export const ErrorMessageUI = styled.p` // ErrorMessage와 이름 충돌 방지
    padding: 10px;
    background-color: #ffffff;
    color: #0025a9;
    border-radius: 4px;
    margin: 10px 15px;
    text-align: center;
    font-size: 0.9em;
    //margin-bottom: 12px;
`;

export const MessageTimestamp = styled.div`
  font-size: 0.75em;
  color: #888;
  margin-top: 4px;
  align-self: ${props => props.$isUser ? 'flex-end' : 'flex-start'}; // 사용자에 따라 정렬
  text-align: ${props => props.$isUser ? 'right' : 'left'};
`;

export const CloseButton = styled.button`
    background-color: #2d57af;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;

    &:focus {
        outline: none;
    }
`;
