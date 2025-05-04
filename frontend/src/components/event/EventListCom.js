import { useNavigate } from "react-router-dom";
import {
    EventListWrapper, ListGrid, EventCard,
    EventImg, Title, Period, RegisterButton,
    HeaderArea, Tabs, TabButton
} from "../../style/event/EventListStyle";

// 탭 이름 목록
const tabList = [
    { key: "진행중", label: "진행중인 이벤트" },
    { key: "완료", label: "완료된 이벤트" }
];

function EventListCom({
                          events,
                          tab, // 현재 선택된 탭
                          onTabChange, // 탭 클릭시 호출
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
                                active={tab === tb.key}
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