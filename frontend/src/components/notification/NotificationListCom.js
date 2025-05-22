function NotificationListCom({notifications, onHandleClick}) {

    return (
        <div className="notification-list">
            {notifications.length === 0 ? (
                <p style={{ padding: '10px' }}>알림이 없습니다.</p>
            ) : (
                notifications.map((n) => (
                    <div
                        key={n.notiId}
                        onClick={() => onHandleClick(n.notiId)}
                        style={{
                            padding: '10px',
                            margin: '5px 0',
                            backgroundColor: n.isRead ? '#eee' : '#fff',
                            cursor: 'pointer',
                            borderLeft: n.isRead ? '5px solid #ccc' : '5px solid #007bff'
                        }}
                    >
                        <p>{n.content}</p>
                        <small>{new Date(n.createdAt).toLocaleString()}</small>
                    </div>
            )))}
        </div>
    )
}

export default NotificationListCom;