const path = "https://hellotravelogic.link/";

 // REST API로 채팅방 시작/조회 요청
const getStartInquiry = async ({inquiryMessage, token}) => {
    try {
        const response = await fetch(`${path}/api/inquiry/start`, { // 실제 API 엔드포인트
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(inquiryMessage),
        });

        return response.json();
        
    } catch (error) {
        console.error("문의 전송 오류 : ", error);
        throw error; // 에러를 다시 던져 상위에서 처리할 수 있도록 함

    }
}


// 관리자용 채팅방 목록 조회 요청 (필터 및 정렬 기능 제거)
const getAdminChatList = async (token) => {
    try {
        const response = await fetch(`${path}/api/inquiry/admin/chat-list`, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json', // 서버에 JSON 응답을 기대한다고 명시할 수 있습니다.
            },
        });

        return response.json();

    } catch (error) {
        console.error("관리자 채팅방 목록 조회 오류:", error);
        throw error;
    }
};


// 특정 채팅방의 메시지 가져오기
const getMessages = async (inquiryChatId) => {
    const token = localStorage.getItem("accessToken");
    try {
        const response = await fetch(`${path}/api/inquiry/messages/${inquiryChatId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                // 'Accept': 'application/json',
            },
        });

        return response.json();

    } catch (error) {
        console.error("메시지 조회 오류:", error);
        throw error;
    }
};


// 채팅 종료
const closeInquiryChat = async (icId, token) => {
    try {
        const response = await fetch(`${path}/api/inquiry/close/${icId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })

        return response.json();

    } catch (error) {
        console.error("채팅 종료 실패!!");
        throw error; // 에러를 상위에서 처리할 수 있도록 던짐
    }
};


export {
    getStartInquiry,
    getAdminChatList,
    getMessages,
    closeInquiryChat,
}


