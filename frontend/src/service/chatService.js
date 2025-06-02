const path = "https://hellotravelogic.link/";

// 채팅방 전체 조회
export const getAllChatRooms = async () => {
    try {
        const response = await fetch(`${path}/api/chatrooms`);
        if (!response.ok) {
            throw new Error(`서버 응답 에러: ${response.status} ${response.statusText}`);     // 4xx, 5xx 에러 처리
        }

        // 204 No Content 상태 코드 처리
        if (response.status === 204) {
            // console.log("조회된 채팅방 없음 (서버 응답 204 No Content)");
            return [];  // 내용이 없으므로 빈 배열 반환
        }

        // 204가 아닌 다른 성공 응답
        return response.json();

    } catch (error) {
        console.error('채팅방 목록 가져오기 실패:', error);
        return [];
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

        return response.json();
        
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

        return response;

    } catch (error) {
        console.error('채팅방 삭제 실패:', error);
        return false;
    }
};


// 채팅방 퇴장 호출
export const leaveChatRoom = async (chatRoomUid, token) => {
    try {

        const response = await fetch(`${path}/api/chatrooms/leave/${chatRoomUid}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' // 필요시 Content-Type 설정 (POST 요청에 body가 없어도 명시 가능)
            },
            // body: JSON.stringify({}) // POST 요청이지만 body가 필요 없다면 생략하거나 빈 객체 전송
        });

        if (!response.ok) {
            console.error(`API 호출 실패: ${response.status}`, response);
        }
        return response;

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

        return response.json();

    } catch (error) {
        console.error('채팅방 퇴장 실패 : ', error);
    }
};


// 채팅방 상세 정보 호출 함수
export const getChatRoomDetail = async (chatRoomUid, token) => {
    try {
        const response = await fetch(`${path}/api/chatrooms/detail/${chatRoomUid}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.json();

    } catch(error) {
        console.error("채팅방 세부 정보 불러오기 실패:", error);
    }
}