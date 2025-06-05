import styled from "styled-components";

export const Container = styled.div`
    padding: 24px;
    max-width: 720px;
    margin: 40px auto;
    background-color: #ffffff;
    border-radius: 16px;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.12);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const ConnectionStatus = styled.span`
    color: ${({ connected }) => (connected ? "#28a745" : "#dc3545")};
    font-weight: 600;
`;

export const ChatRoomTitleText = styled.p`
    font-size: 1.5em; /* h2보다 약간 작게 */
    color: #444;
    margin-bottom: 15px;
    border-radius: 5px;
    text-align: center;
    word-break: break-word;
`;

export const ChatRoomDescription = styled.p`
    font-size: 1em; /* 기본 폰트 크기 */
    margin-top: 10px; /* 제목과의 간격 */
    margin-bottom: 25px; /* 메시지 목록과의 간격 */
    padding: 10px 20px;
    text-align: center;
    word-break: break-word; /* 긴 설명도 줄 바꿈 */
`;

export const ChatBox = styled.div`
    border: 1.5px solid #d1d5db;
    height: 320px;
    overflow-y: auto;
    margin-bottom: 16px;
    padding: 14px;
    border-radius: 12px;
    background-color: #f9fafb;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
    scrollbar-width: thin;

    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #cbd5e1;
        border-radius: 4px;
    }
`;

export const CreatorBadge = styled.span`
    display: inline-block;
    background-color: #ffd700; /* 황금색 */
    color: #333;
    font-size: 0.7em;
    font-weight: bold;
    padding: 2px 6px;
    border-radius: 3px;
    margin-right: 5px;
    vertical-align: middle;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
`;

export const MessageRow = styled.div`
    margin-bottom: 10px;
    display: flex;
    align-items: flex-start;
`;

export const JoinMsg = styled.em`
    color: #28a745;
    //margin-left: 10px;
    font-style: normal;
    font-weight: 600;
`;

export const LeaveMsg = styled.em`
    color: #dc3545;
    //margin-left: 10px;
    font-style: normal;
    font-weight: 600;
`;

export const ChatForm = styled.form`
    display: flex;
    gap: 12px;
`;

export const ChatInput = styled.input`
    flex-grow: 1;
    padding: 14px 18px;
    font-size: 1rem;
    border: 1.5px solid #cbd5e1;
    border-radius: 12px;
    transition: border-color 0.3s ease;

    &:focus {
        outline: none;
        border-color: #2563eb;
        box-shadow: 0 0 6px rgba(37, 99, 235, 0.5);
    }
`;

export const ChatButton = styled.button`
    padding: 14px 26px;
    font-size: 1rem;
    background-color: #2563eb;
    color: white;
    font-weight: 600;
    border: none;
    border-radius: 24px;
    cursor: pointer;
    transition: background-color 0.25s ease;

    &:disabled {
        background-color: #94a3b8;
        cursor: not-allowed;
        box-shadow: none;
    }

    &:not(:disabled):hover {
        background-color: #1e40af;
    }
`;

export const AuthErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    padding: 30px;
    background-color: #f3f4f6;
`;

export const AuthErrorTitle = styled.h1`
    color: #1f2937;
    margin-bottom: 24px;
    font-weight: 700;
    font-size: 2rem;
`;

export const AuthErrorMessage = styled.p`
    font-size: 1.3rem;
    margin-bottom: 32px;
    color: #374151;
`;

export const AuthErrorButton = styled.button`
    padding: 12px 26px;
    font-size: 1.1rem;
    color: white;
    background-color: #3b82f6;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 6px 14px rgb(59 130 246 / 0.6);
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #1d4ed8;
    }
`;

export const InfoMessage = styled.div`
    padding: 24px;
    text-align: center;
    font-size: 1rem;
    color: #4b5563;
`;

// 프로필 이미지 스타일 정의
export const profileImageStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '12px',
    objectFit: 'cover',
    flexShrink: 0,
};

// 메시지 내용(이미지 + 텍스트)을 담을 컨테이너 스타일
export const messageContentStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    // marginBottom: '10px',
};

// 메시지 텍스트 부분 스타일 (발신자, 시간, 메시지 내용)
export const messageTextStyle = {
    display: 'flex',
    flexDirection: 'column',
    // maxWidth: '85%',
    wordBreak: 'break-word',
};

export const senderInfoStyle = {
    fontSize: '0.9em',
    color: '#6b7280',
    marginBottom: '4px',
};


export const BaseButton = styled.button`
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, transform 0.1s ease;

    &:active {
        transform: translateY(1px);
    }
`;

export const DangerButton = styled(BaseButton)`
    background-color: #395680;
    color: white;
    margin: 0 20px 20px 0;
    width: 130px;

    &:hover {
        background-color: #5f74a2;
    }
`;

export const OutlineButton = styled(BaseButton)`
    background-color: transparent; /* 배경 채우기 없음 */
    color: #6c757d; /* 차분한 글자색 */
    border: 1px solid #6c757d; /* 아웃라인 테두리 */
    margin-bottom: 10px;
    width: 130px;

    &:hover {
        background-color: #e2e6ea; /* 호버 시 밝은 배경 */
        color: #495057;
        border-color: #495057;
    }
`;