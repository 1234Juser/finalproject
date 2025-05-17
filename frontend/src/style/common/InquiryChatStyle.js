import styled from 'styled-components';

export const ChatWrapper = styled.div`
  width: 400px;
  border: 1px solid #ddd;
  border-radius: 16px;
  overflow: hidden;
  font-family: 'Apple SD Gothic Neo', sans-serif;
  display: flex;
  flex-direction: column;
  font-family: 'Noto Sans KR', Arial, sans-serif; // 한글 폰트 추가
  background-color: #fff;
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

    // 스크롤바 스타일링 (선택 사항)
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

// export const LoadingOverlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(255, 255, 255, 0.7);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 1em;
//   color: #333;
//   z-index: 10;
// `;

// 마이리얼트립 버전
export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  font-size: 16px;
  font-weight: bold;
`;

// export const ErrorMessageUI = styled.p` // ErrorMessage와 이름 충돌 방지
//   padding: 10px;
//   background-color: #f8d7da;
//   color: #721c24;
//   border: 1px solid #f5c6cb;
//   border-radius: 4px;
//   margin: 10px 15px;
//   text-align: center;
//   font-size: 0.9em;
// `;

// 마이리얼트립 버전
export const ErrorMessageUI = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 12px;
`;

export const MessageTimestamp = styled.div`
  font-size: 0.75em;
  color: #888;
  margin-top: 4px;
  align-self: ${props => props.$isUser ? 'flex-end' : 'flex-start'}; // 사용자에 따라 정렬
  text-align: ${props => props.$isUser ? 'right' : 'left'};
`;