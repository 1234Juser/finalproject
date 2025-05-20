import styled from 'styled-components';

// 추가된 div의 스타일
export const ContentWrapper = styled.div`
    max-width: 800px; /* 원하는 최대 너비 설정 */
    margin: 0 auto; /* 중앙 정렬 */
    width: 100%;
    /* 필요 시 추가 스타일 */
`;


export const Header = styled.h2`
    margin-bottom: 20px;
    color: #2c3e50;
`;

export const MessagesContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #dcdde1;
    border-radius: 5px;
    margin-bottom: 20px;
`;

export const Message = styled.div`
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    background-color: ${({ senderType }) => senderType === "ADMIN" ? "#d1f7c4" : "#f1f1f1"};
`;

export const Sender = styled.span`
    font-weight: bold;
    color: #2c3e50;
`;

export const Timestamp = styled.small`
    display: block;
    color: #7f8c8d;
    margin-top: 5px;
`;

export const MessageInputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    resize: none;
    border: 1px solid #dcdde1;
    border-radius: 5px;
    font-size: 16px;
    margin-bottom: 10px;
`;

export const SendButton = styled.button`
    align-self: flex-end;
    padding: 10px 20px;
    background-color: #0984e3;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:disabled {
        background-color: #b2bec3;
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        background-color: #74b9ff;
    }
`;
