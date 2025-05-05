import {
    EventDetailWrapper,
    BackButton,
    DetailTitle,
    StatusBadge,
    Period,
    DetailImage,
    DescArea,
    EditButton,
    DeleteButton
} from "../../style/event/EventDetailStyle";

function isAdmin() {
    const roles = JSON.parse(localStorage.getItem("roles") || "[]");
    return roles.includes("ROLE_ADMIN");
}


function EventDetailCom({ event, onBack, onEdit, onDelete }) {
    if (!event) {
        return <EventDetailWrapper>이벤트 정보를 불러올 수 없습니다.</EventDetailWrapper>;
    }

    // 이미지 경로 처리
    let imgSrc = "/img/event/default_event.jpg";
    if (event.eventImg) {
        imgSrc = `/events/${event.eventImg}`;
    }

    // 상태 뱃지
    const now = new Date();
    const start = event.eventStartdate ? new Date(event.eventStartdate) : null;
    const end = event.eventEnddate ? new Date(event.eventEnddate) : null;

    let badgeType = "";
    if (start && end) {
        if (now < start) badgeType = "예정";
        else if (now > end) badgeType = "완료";
        else badgeType = "진행중";
    }

    return (
        <EventDetailWrapper>
            <BackButton onClick={onBack}>{"< 목록으로"}</BackButton>
            {isAdmin() && (
                <>
                    <EditButton onClick={onEdit}>수정</EditButton>
                    <DeleteButton onClick={onDelete}>삭제</DeleteButton>
                </>
            )}
            <div style={{marginBottom: 8}}>
                <StatusBadge type={badgeType}>
                    {badgeType}
                </StatusBadge>
                <Period>
                    {event.eventStartdate?.slice(0, 10)} ~ {event.eventEnddate?.slice(0, 10)}
                </Period>
            </div>
            {/* 이벤트제목 표시 */}
            <div style={{fontWeight: 600, color: "#6a87a9", margin: "14px 0 2px 0", fontSize: "1.07rem"}}>이벤트제목</div>
            <DetailTitle>{event.eventTitle}</DetailTitle>

            <DetailImage
                alt={event.eventTitle}
                src={imgSrc}
            />
            {/* 이벤트내용 표시 */}
            <div style={{fontWeight: 600, color: "#6a87a9", margin: "23px 0 2px 0", fontSize: "1.07rem"}}>이벤트내용</div>
            <DescArea>
                {event.eventContent}
            </DescArea>
        </EventDetailWrapper>
    );
}

export default EventDetailCom;