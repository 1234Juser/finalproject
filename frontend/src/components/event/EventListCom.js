function EventListCom({ events }) {
    return (
        <div>
            <h2>이벤트 목록</h2>
            {events.map(event => (
                <div key={event.eventCode}>
                    <h3>{event.eventTitle}</h3>
                    <p>{event.eventContent}</p>
                    <img src={event.eventImg} alt={event.eventTitle} width="200" />
                </div>
            ))}
        </div>
    );
}
export default EventListCom;
