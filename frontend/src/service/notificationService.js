const path = "https://hellotravelogic.link/";


// 알림 목록 요청
export const getNotificationList = async (token, memberCode) => {
    try {
        const response = await fetch(`${path}/api/notifications/member/${memberCode}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        console.log("API 응답 데이터 ::::: ", data);

        if (!response.ok) {
            console.error("서버 응답 오류:", data);
            throw new Error(data.message || `데이터를 받아오지 못했습니다.: ${data.status}`);
        }
        console.log("알림 목록 요청 성공 ", data);
        return data;

    } catch (error) {
        console.error("알림 목록 요청 오류 : ", error);
        throw error; // 에러를 다시 던져 상위에서 처리할 수 있도록 함

    }
}


// 모두 읽음 처리 함수
export const markAllNotificationsAsRead = async (token, memberCode) => {
    try {
        const response = await fetch(`${path}/api/notifications/mark-all-as-read/member/${memberCode}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            const data = await response.json();
            console.error("서버 응답 오류:", data);
            throw new Error(data.message || `알림 읽음 처리 실패: ${response.status}`);
        }

        console.log("모든 알림을 읽음으로 처리했습니다.");
    } catch (error) {
        console.error("모든 알림 읽음 처리 오류:", error);
        throw error;
    }
};


// 개별 알림을 읽음으로 표시하는 함수
export const markNotificationAsRead = async (token, notiId) => {
    try {
        const response = await fetch(`${path}/api/notifications/mark-as-read/${notiId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            const data = await response.json();
            console.error("서버 응답 오류:", data);
            throw new Error(data.message || `알림 읽음 처리 실패: ${response.status}`);
        }

        console.log(`알림 ${notiId}을(를) 읽음으로 처리했습니다.`);
    } catch (error) {
        console.error(`알림 ${notiId} 읽음 처리 오류:`, error);
        throw error;
    }
};


// 개별 알림 삭제 호출 함수
export const deleteNotification = async (token, notiId) => {
    try {
        const response = await fetch(`${path}/api/notifications/delete/${notiId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || '알림 삭제에 실패했습니다.');
        }

        // 성공 시 별도의 데이터 반환이 필요 없다면 그냥 종료
    } catch (error) {
        // 에러를 호출한 곳으로 전달
        throw error;
    }
};


// 모든 알림 삭제 호출 함수
export const deleteAllNotifications = async (token) => {
    try {
        const response = await fetch(`${path}/api/notifications/delete-all`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || '알림 삭제에 실패했습니다.');
        }

        // 성공 시 별도의 데이터 반환이 필요 없다면 그냥 종료
    } catch (error) {
        // 에러를 호출한 곳으로 전달
        throw error;
    }
}

