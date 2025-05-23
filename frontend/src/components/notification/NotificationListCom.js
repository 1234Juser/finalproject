import {
    DeleteAllSpan,
    DeleteSpan,
    MarkAllAsReadSpan, MarkAllSpanWrapper,
    NoNotificationsMessage,
    NotificationItem,
    NotificationListContainer, NotificationMessage, NotificationTimestamp
} from "../../style/notification/StyleNotification";

function NotificationListCom({notifications, onHandleClick, onMarkAllAsRead, onDeleteAll, onDelete}) {
    const hasUnread = notifications.some(noti => !noti.notiIsRead);
    const hasNotifications = notifications.length > 0;

    return (
        <NotificationListContainer>
            {hasNotifications && (
                <MarkAllSpanWrapper>
                        <MarkAllAsReadSpan onClick={onMarkAllAsRead} disabled={!hasUnread}>
                            모두 읽음
                        </MarkAllAsReadSpan>
                        <DeleteAllSpan onClick={onDeleteAll}>
                            모든 알림 삭제
                        </DeleteAllSpan>
                </MarkAllSpanWrapper>
           )}
            {notifications?.length === 0 ? (
                <NoNotificationsMessage>알림이 없습니다.</NoNotificationsMessage>
            ) : (
                notifications?.map((n) => (
                    <NotificationItem
                        key={n.notiId}
                        isRead={n.notiIsRead}
                    >
                        <NotificationMessage isRead={n.notiIsRead}>
                            <a href={`/community/companion/${n.notiTargetPostId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                {n.notiMessage}
                            </a>
                        </NotificationMessage>
                        <NotificationTimestamp isRead={n.notiIsRead}>
                            {new Date(n.notiCreatedAt).toLocaleString()}
                        </NotificationTimestamp>
                        <DeleteSpan onClick={() => onHandleClick(n.notiId, n.notiTargetPostId)}>
                            읽음
                        </DeleteSpan>
                        <DeleteSpan onClick={() => onDelete(n.notiId)}>
                            삭제
                        </DeleteSpan>
                    </NotificationItem>
                ))
            )}
        </NotificationListContainer>
    )
}

export default NotificationListCom;