const path = "http://localhost:8080";

// 채팅방 전체 조회
export const getAllChatRooms = async () => {
    try {
        const response = await fetch(`${path}/api/chatrooms`);
        if (!response.ok) {
            throw new Error(`서버 응답 에러: ${response.status}`);
        }
        const data = await response.json();
        console.log("개설된 채팅방 목록 불러오기 : ", data);
        return data;
    } catch (error) {
        console.error('채팅방 목록 가져오기 실패:', error);
    }
}


// 채팅방 생성
export const createChatRoom = async (roomData, token) => {
    try {
        const response = await fetch(`${path}/api/chatrooms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(roomData)
        });

        const data = await response.json();

        // 성공 여부 체크
        if (!response.ok) {
        console.error("서버 응답 오류:", data);
        throw new Error(data.message || '채팅방 생성 실패');
        }

        console.log("생성된 채팅방 확인 : ", data);
        return data;
        
    } catch (error) {
        console.error("채팅방 생성 실패 : ", error);
    }
}


// 채팅방 삭제
export const deleteChatRoom = async (chatRoomUid, token) => {
    try {
        const response = await fetch(`${path}/api/chatrooms/${chatRoomUid}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`삭제 실패: ${response.status}`);
        }
        console.log("삭제 응답 확인 : ", response);
        return response;
    } catch (error) {
        console.error('채팅방 삭제 실패:', error);
        return false;
    }
};


// 채팅방 퇴장 호출
export const leaveChatRoom = async (chatRoomUid, token) => {
    try {

        const response = await fetch(`${path}/api/chatrooms/leave/${chatRoomUid}`, { // 백엔드 서버 주소 및 경로 확인
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // 토큰을 Authorization 헤더에 포함
                'Content-Type': 'application/json' // 필요시 Content-Type 설정 (POST 요청에 body가 없어도 명시 가능)
            },
            // body: JSON.stringify({}) // POST 요청이지만 body가 필요 없다면 생략하거나 빈 객체 전송
        });
        
        // 응답 상태 코드에 따라 추가 로직 처리 가능 (예: 401, 403 등)
        if (!response.ok) {
            console.error(`API 호출 실패: ${response.status}`, response);
            // 실패 응답의 body를 읽어서 에러 메시지를 포함할 수 있습니다.
            // const errorBody = await response.json();
            // throw new Error(errorBody.message || '채팅방 퇴장 API 호출 실패');
        }
        
        return response; // 성공 시 응답 객체 반환 (204 No Content 예상)
    } catch (error) {
        console.error('채팅방 퇴장 실패 : ', error);
    }
};


// 1:1 문의 채팅 호출 (처음 시작할 때 POST 요청)
export const startInquiryChat = async (token, memberId) => {
    try {

        const response = await fetch(`${path}/api/inquiry/start`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // 로그인 했으면 토큰도 같이 보내
            },
            body: JSON.stringify({
                memberCode: token.memberCode,
                authorityCode: token.authorityCode,
                icChatStatus: "WAITING",
                memberId: memberId,
                icStartDate: new Date().toISOString(),
            }),
        });
        
        const chat = await response.json();
        console.log("채팅방 생성 완료:", chat);
        return chat.icId; // 생성된 채팅방 ID
    } catch (error) {
        console.error('채팅방 퇴장 실패 : ', error);
    }
};