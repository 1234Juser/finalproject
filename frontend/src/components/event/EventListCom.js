import { useNavigate } from "react-router-dom";
import {
    EventListWrapper, ListGrid, EventCard,
    EventImg, Title, Period, RegisterButton,
    HeaderArea, Tabs, TabButton
} from "../../style/event/EventListStyle";

// 탭 이름 목록
const tabList = [
    { key: "진행중", label: "진행중인 이벤트" },
    { key: "종료", label: "종료된 이벤트" }
];

function EventListCom({
                          events,
                          tab,
                          onTabChange,
                          showRegisterButton,
                          onRegisterClick
                      }) {
    const navigate = useNavigate();

    // 이미지 경로 처리 함수
    const getImgUrl = (imgPath) => {
        if (!imgPath || imgPath === "event/default_event.jpg") {
            // 기본이미지의 경우
            return "/img/event/default_event.jpg";
        }
        // event/로 시작하는 경로의 경우 이미 event 폴더 내에 있는 이미지이므로 그대로 사용
        // 그 외의 경우는 /upload/events/ 경로를 붙여줌 (UUID 파일명 처리)
        if (imgPath.startsWith("event/")) {
            return `/img/${imgPath}`;
        }
        return `/events/${imgPath}`;

    };

    return (
        <EventListWrapper>
            <HeaderArea>
                <h2 style={{
                    margin: 0, fontSize: "1.35rem", letterSpacing: "-1px",
                    color: "#273a69"
                }}>
                    이벤트 목록
                </h2>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 18
                }}>
                    <Tabs>
                        {tabList.map(tb => (
                            <TabButton
                                key={tb.key}
                                active={(tab === tb.key).toString()}
                                onClick={() => onTabChange(tb.key)}
                            >
                                {tb.label}
                            </TabButton>
                        ))}
                    </Tabs>
                    {showRegisterButton && (
                        <RegisterButton
                            onClick={onRegisterClick || (() => navigate("/event/register"))}
                            style={{ marginBottom: 0 }}
                        >
                            + 이벤트 등록
                        </RegisterButton>
                    )}
                </div>
            </HeaderArea>
            <ListGrid>
                {events.length === 0 &&
                    <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#98a" }}>
                        진행 중인 이벤트가 없습니다.
                    </div>
                }
                {events.map(event => (
                    <EventCard
                        key={event.eventCode}
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/event/${event.eventCode}`)}
                    >
                        <EventImg src={getImgUrl(event.eventImg)} alt={event.eventTitle}/>
                        <Title>{event.eventTitle}</Title>
                        <Period>기간: {event.eventStartdate} ~ {event.eventEnddate}</Period>
                    </EventCard>
                ))}
            </ListGrid>
        </EventListWrapper>
    );
}
export default EventListCom;