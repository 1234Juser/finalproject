const path = "http://localhost:8080";


// 알림 목록 요청
export const getNotificationList = async (token, memberCode) => {
    try {
        const response = await fetch(`${path}/api/notifications/${memberCode}`, {
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


// 알림을 읽음으로 표시하는 함수 (추후 구현)
export const markNotificationAsRead = (notiId) => {
    return axios.post(`/api/notifications/read`, { notificationId: notiId });
};
