const path = "https://localhost:8080";

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
        
        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.message || `채팅방을 시작하지 못했습니다: ${response.status}`);
        }
        console.log("채팅방 시작, 회원이 보낸 메시지 : ", data);
        return data;
        
    } catch (error) {
        console.error("문의 전송 오류 : ", error);
    }
}
