const path = "http://localhost:8080";

 // REST API로 채팅방 시작/조회 요청
export const getStartInquiry = async ({inquiryMessage, token}) => {
    try {
        const response = await fetch(`${path}/api/inquiry/start`, { // 실제 API 엔드포인트
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(inquiryMessage),
        });

        const data = await response.json();
        console.log("API 응답 데이터 ::::: ", data);
        
        if (!response.ok) {
            console.error("서버 응답 오류:", data);
            throw new Error(data.message || `채팅방을 시작하지 못했습니다: ${data.status}`);
        }
        console.log("1:1 채팅방 시작, 채팅방 생성 ", data);
        return data;
        
    } catch (error) {
        console.error("문의 전송 오류 : ", error);
        throw error; // 에러를 다시 던져 상위에서 처리할 수 있도록 함

    }
}


// 관리자용 채팅방 목록 조회 요청 (필터 및 정렬 기능 제거)
export const getAdminChatList = async (token) => {
    try {
        const response = await fetch(`${path}/api/inquiry/admin/chat-list`, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json', // 서버에 JSON 응답을 기대한다고 명시할 수 있습니다.
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("서버 응답 오류:", errorData);
            throw new Error(errorData.message || "관리자 채팅방 목록을 불러오는 데 실패했습니다.");
        }

        const data = await response.json();
        console.log("관리자용 채팅방 목록 조회 : ", data);
        return data;

    } catch (error) {
        console.error("관리자 채팅방 목록 조회 오류:", error);
        throw error;
    }
};


// 특정 채팅방의 메시지 가져오기
export const getMessages = async (inquiryChatId) => {
    const token = localStorage.getItem("accessToken"); // 필요시 토큰 가져오기
    try {
        const response = await fetch(`${path}/api/inquiry/messages/${inquiryChatId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                // 'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("서버 응답 오류:", errorData);
            throw new Error(errorData.message || "메시지 조회에 실패했습니다.");
        }

        const data = await response.json();
        console.log("메시지 조회 성공 : ", data);
        return data;
    } catch (error) {
        console.error("메시지 조회 오류:", error);
        throw error;
    }
};


// 메시지 전송
/*export const sendMessage = async (token, messagePayload) => {
    try {
        const response = await fetch(`${path}/api/inquiry/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(messagePayload),
        });

/!*        if (!response.ok) {
            const errorData = await response.json();
            console.error("서버 응답 오류:", errorData);
            throw new Error(errorData.message || "메시지 전송에 실패했습니다.");
        }

        const data = await response.json();
        console.log("메시지 전송 성공 : ", data);
        return data;*!/

        const text = await response.text();
        console.log("서버 응답 텍스트:", text);

        if (!response.ok) {
            const errorData = text ? JSON.parse(text) : { message: "Unknown error" };
            console.error("서버 응답 오류:", errorData);
            throw new Error(errorData.message || "메시지 전송에 실패했습니다.");
        }

        const data = text ? JSON.parse(text) : null;
        console.log("메시지 전송 성공 : ", data);
        return data;



    } catch (error) {
        console.error("메시지 전송 오류:", error);
        throw error;
    }
}*/;


