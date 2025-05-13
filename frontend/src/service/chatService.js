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
