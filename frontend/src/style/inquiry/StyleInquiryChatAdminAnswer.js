import styled from 'styled-components';

// 콘텐츠 래퍼: 전체 높이를 100%으로 설정하고, 플렉스 컬럼 레이아웃 유지
export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 800px;
    width: 600px;
`;

// 메시지 컨테이너: 플렉스 1로 부모 컨테이너에서 남은 공간 차지, 스크롤 숨기기
export const MessagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    overflow-y: auto;
    flex: 1; /* 부모 컨테이너 내에서 남은 공간을 차지 */
    background-color: #f5f5f5;

    /* 스크롤바 숨기기 */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* IE and Edge */
    
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }

    /* 항상 하단에 메시지가 오도록 설정 */
    //justify-content: flex-end;
`;

// 개별 메시지 스타일
export const Message = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    max-width: 60%;
    align-self: ${(props) => (props.senderType === 'ADMIN' ? 'flex-end' : 'flex-start')};
    background-color: ${(props) => (props.senderType === 'ADMIN' ? '#d1e7dd' : '#ffffff')};
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
`;

export const Sender = styled.span`
    font-weight: bold;
    margin-bottom: 5px;
`;

export const MessageContent = styled.p`
    margin: 0;
    word-wrap: break-word;
`;

export const Timestamp = styled.span`
    font-size: 0.8em;
    color: #999;
    align-self: flex-end;
    margin-top: 5px;
`;

// 메시지 입력 컨테이너
export const MessageInputContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #ffffff;
    border-top: 1px solid #ddd;
`;

// 텍스트 영역: 고정된 높이 설정
export const TextArea = styled.textarea`
    flex: 1;
    resize: none;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
    font-size: 1em;
    height: 60px; /* 고정된 높이 설정 */
    overflow: hidden;
`;

// 전송 버튼
export const SendButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    color: #ffffff;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;

// 헤더
export const Header = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

// 나머지 스타일은 동일...