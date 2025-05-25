import NotificationListCom from "../../components/notification/NotificationListCom";
import {useEffect, useState} from "react";
import {
    deleteAllNotifications,
    deleteNotification,
    getNotificationList,
    markAllNotificationsAsRead,
    markNotificationAsRead
} from "../../service/notificationService";
import {useNavigate} from "react-router-dom";


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


function NotificationListCon(){
    const [notifications, setNotifications] = useState([]);

    const navigate = useNavigate();



    useEffect(() => {
        const { memberCode, token } = authInfo();

        if (memberCode && token) {
            getNotificationList(token, memberCode)
                .then( data => {

                    setNotifications(data);
                    console.log('받아온 데이터 확인 :::::', data);
                })
                .catch(error => {
                    console.error("알림 목록을 가져오는 중 오류 발생:", error);
                });
        }
    }, []);


    // 개별 알림 클릭 시 읽음 처리
    const onHandleClick = (notiId, targerPostId) => {
        const { token } = authInfo();

        if (token) {
            markNotificationAsRead(token, notiId)
                .then(() => {
                    setNotifications(prev =>
                        prev.map(n => n.notiId === notiId ? { ...n, notiIsRead: true } : n)
                    );
                    console.log(`알림 ${notiId}을(를) 읽음으로 처리했습니다.`);
                })
                .catch(error => {
                    console.error(`알림 ${notiId} 읽음 처리 중 오류 발생:`, error);
                    alert("알림을 읽음으로 처리하는 데 실패했습니다.");
                });
        }


    };


    // 모두 읽음 버튼 클릭 시 읽음 처리
    const handleMarkAllAsRead = () => {
        const { memberCode, token } = authInfo();

        if (memberCode && token) {
            markAllNotificationsAsRead(token, memberCode)
                .then(() => {
                    setNotifications(prev =>
                        prev.map(noti => ({ ...noti, notiIsRead: true }))
                    );
                    console.log("모든 알림을 읽음으로 처리했습니다.");
                })
                .catch(error => {
                    console.error("모든 알림 읽음 처리 중 오류 발생:", error);
                });
        }
    };


    // 알림 삭제
    const handleDeleteNotification = (notiId) => {
        const { memberCode, token } = authInfo();

        if (memberCode && token) {
                deleteNotification(token, notiId)
                    .then(() => {
                        setNotifications(prev =>
                            prev.filter(n => n.notiId !== notiId)
                        );
                        console.log(`알림 ${notiId}을(를) 삭제했습니다.`);
                    })
                    .catch(error => {
                        console.error(`알림 ${notiId} 삭제 중 오류 발생:`, error);
                        alert("알림을 삭제하는 데 실패했습니다.");
                    });
        }
    };


    // 모든 알림 삭제
    const handleDeleteAllNotifications =  () => {
        const {  token } = authInfo();

        if (token) {
                deleteAllNotifications(token)
                    .then(() => {
                    setNotifications([]); // 모든 알림을 비웁니다.
                    console.log("모든 알림을 삭제했습니다.");
                })
                    .catch(error => {
                    console.error("모든 알림 삭제 중 오류 발생:", error);
                    })
        }

    }



    return(
        <>
            <NotificationListCom notifications={notifications} onHandleClick={onHandleClick}
                                 onMarkAllAsRead={handleMarkAllAsRead} onDelete={handleDeleteNotification}
                                 onDeleteAll={handleDeleteAllNotifications}
            />
        </>
    )
}

export default NotificationListCon;