import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    MainSectionWrapper,
    EventSliderContainer,
    SlideWrapper,
    SlideCard,
    SlideImage,
    SlideOverlay,
    SlideText,
    EventSlidePeriodText, MainTitle
} from "../../style/MainStyle";
import { useNavigate } from "react-router-dom";

const EventSliderCom = () => {
    const [events, setEvents] = useState([]);
    const [index, setIndex] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        // 진행 중인 이벤트 데이터를 가져옵니다.
        axios.get("http://localhost:8080/event/ongoing-slider")
            .then(response => {
                // eventImg 경로를 조정
                const formattedEvents = response.data.map(event => {
                    let imageUrl = '/img/event/default_event.jpg'; // 기본 이미지
                    if (event.eventImg) {
                        // data.sql에서 온 이미지인 경우 (경로에 'event/' 포함)
                        if (event.eventImg.startsWith("event/")) {
                            imageUrl = `/img/${event.eventImg}`;
                        } else {
                            // 새로 등록된 이미지인 경우
                            imageUrl = `/events/${event.eventImg}`;
                        }
                    }
                    return {
                        ...event,
                        eventImg: imageUrl
                    };
                });
                setEvents(formattedEvents);
            })
            .catch(error => {
                console.error("이벤트 데이터를 가져오는 중 오류 발생:", error);
            });
    }, []);

    useEffect(() => {
        if (events.length > 0) {
            const lastIndex = events.length - 1;
            const timer = setInterval(() => {
                setIndex(prev => (prev === lastIndex ? 0 : prev + 1));
            }, 3000); // 3초마다 슬라이드 변경

            return () => clearInterval(timer); // 언마운트 시 해제
        }
    }, [events]); // events 배열이 변경될 때마다 useEffect 재실행

    // 날짜 포매팅 함수
    const formatDate = (isoString) => {
        if (!isoString) return "";
        return isoString.substring(0, 10);
    };

    if (events.length === 0) {
        return null; // 이벤트가 없으면 슬라이더를 표시하지 않음
    }
    return (
        <MainSectionWrapper style={{marginTop: "40px", zIndex: 2}}> {/* 위치 조정 */}
            <MainTitle>
                🎉<span style={{color: "#567eff"}}>진행 중</span>인 이벤트
            </MainTitle>
            <EventSliderContainer>
                {/* --slide-count 변수를 사용하여 동적으로 width를 계산하도록 합니다. */}
                <SlideWrapper style={{ transform: `translateX(-${index * 100}%)`, '--slide-count': events.length }}>
                    {events.map((event, idx) => (
                        <SlideCard key={event.eventCode} onClick={() => navigate(`/event/${event.eventCode}`)}>
                            {/* BestLabel 대신 이벤트 제목을 표시 */}
                            <SlideText style={{bottom: "55px", fontSize: "1.5rem"}}>{event.eventTitle}</SlideText>
                            <SlideImage
                                src={event.eventImg}
                                alt={event.eventTitle}
                            />
                            <SlideOverlay />
                            {/* 이벤트 기간 표시 */}
                            <EventSlidePeriodText>
                                기간: {formatDate(event.eventStartdate)} ~ {formatDate(event.eventEnddate)}
                            </EventSlidePeriodText>
                        </SlideCard>
                    ))}
                </SlideWrapper>
            </EventSliderContainer>
        </MainSectionWrapper>
    );
};

export default EventSliderCom;