import NotificationListCom from "../../components/notification/NotificationListCom";
import {useEffect, useState} from "react";
import {getNotificationList} from "../../service/notificationService";


const authInfo = () => {
    const token = localStorage.getItem("accessToken");
    const username = localStorage.getItem("memberName");
    const memberCodeString = localStorage.getItem("memberCode");
    const memberCode = memberCodeString ? parseInt(memberCodeString, 10) : null;
    const rolesString = localStorage.getItem("roles");
    const roles = rolesString ? JSON.parse(rolesString) : [];

    console.log('memberCode 확인----->', memberCode);

    return { token, username, memberCode, roles };
};


function NotificationListCon({isVisible}){
    const [notifications, setNotifications] = useState([]);



    useEffect(() => {
        const { memberCode, token } = authInfo();

        console.log('여기서 멤버코드 확인:::', memberCode);
        console.log('여기서 토큰 확인:::', token);

        // if (memberCode) {
        if (memberCode && token && isVisible === true && notifications.length === 0) {
            getNotificationList(token, memberCode)
                .then(response => {
                    setNotifications(response.data);
                    console.log('받아온 데이터 확인 :::::', response.data);
                })
                .catch(error => {
                    console.error("알림 목록을 가져오는 중 오류 발생:", error);
                });
        }

        // 테스트를 위한 임시 데이터 추가
        // const mockNotifications = [
        //     {
        //         notiId: 1,
        //         content: "첫 번째 알림입니다.",
        //         isRead: false,
        //         createdAt: new Date(),
        //     },
        //     {
        //         notiId: 2,
        //         content: "두 번째 알림입니다.",
        //         isRead: true,
        //         createdAt: new Date(),
        //     },
        //     // 추가적인 알림 데이터...
        // ];
    }, []);



    const onHandleClick = (memberCode) => {
        // 알림을 클릭했을 때 처리할 로직 (추후 구현)
        // 예: markNotificationAsRead(id).then(...)
        setNotifications(prev =>
            prev.map(n => n.memberCode === memberCode ? { ...n, isRead: true } : n)
        );

        /*        fetch(`/api/notifications/read`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ notificationId: id })
                })
                    .then(() => {
                        setNotifications(prev =>
                            prev.map(n => n.id === id ? { ...n, isRead: true } : n)
                        );
                    });*/
    };




    return(
        <>
            <NotificationListCom notifications={notifications} onHandleClick={onHandleClick}/>
        </>
    )
}

export default NotificationListCon;