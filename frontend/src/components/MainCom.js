import {
    MainVideoWrapper, MainVideoOverlay, MainTitleOnVisual, SubTextFx,
    MainSectionWrapper, BannerContainer, SlideWrapper, SlideCard, SlideImage, SlideOverlay, SlideText, BestLabel, images,
    PageWrapper, BannerSectionStyledWrapper, ExchangeTimeContainer,
} from "../style/MainStyle";
import {useEffect, useState} from "react";
import ExchangeBoxCom from "./exchange/ExchangeBoxCom";
import RecentReviewRequestModalCon from "../containers/review/RecentReviewRequestModalCon";
import TimedifferenceCom from "./exchange/TimedifferenceCom";
import EventSliderCom from "./event/EventSliderCom";

export default function MainCom({accessToken, state, dispatch}) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const lastIndex = images.length - 1;
        const timer = setInterval(() => {
            setIndex(prev => (prev === lastIndex ? 0 : prev + 1));
        }, 3000); // 3초마다

        return () => clearInterval(timer); // 언마운트 시 해제
    }, []);

    const slideTexts = [
        <>천년의 미소, 앙코르와트 속으로—<br/>신비로운 캄보디아 유적 탐험</>,
        <>바다와 별이 만나는 곳, 남해—<br/>자연이 주는 가장 고요한 선물</>,
        <>파도 위의 천국, 하와이—<br/>당신의 여름은 여기서 시작돼요</>,
        <>북유럽 하늘에 별이 춤추는 순간,<br/>당신도 거기 있을 수 있어요.</>,
        <>‘여기 진짜 실화냐?’ 싶은 풍경,<br/>중국 장가계 투어 전격 오픈!</>
    ];

    return (
    <>
        <RecentReviewRequestModalCon
            accessToken={accessToken}
            state={state}
            dispatch={dispatch}
        />
        <PageWrapper>
            {/* 1. 상단 풀 비주얼 영상 */}
            <MainVideoWrapper>
                <video autoPlay muted loop playsInline>
                    <source src="/img/logo/finalvideo.mp4" type="video/mp4" />
                    브라우저가 video 태그를 지원하지 않습니다.
                </video>
                <MainVideoOverlay />
            </MainVideoWrapper>

            {/* 2. 타이틀과 감성 부제목 */}
            <MainTitleOnVisual>

                <SubTextFx>
                    설레임 가득, 지금 가장 인기있는 여행을 영상과 함께 만나보세요!
                </SubTextFx>
            </MainTitleOnVisual>

            {/* 3. 슬라이드 배너 */}
            <BannerSectionStyledWrapper>
                <BannerContainer>
                    <SlideWrapper style={{ transform: `translateX(-${index * 100}%)` }}>
                        {images.map((src, idx) => (
                            <SlideCard key={idx}>
                                <BestLabel>BEST {idx + 1}</BestLabel>
                                <SlideImage
                                    src={`http://localhost:8080${src}`}
                                    alt={`banner-${idx}`}
                                />
                                <SlideOverlay />
                                <SlideText>{slideTexts[idx]}</SlideText>
                            </SlideCard>
                        ))}
                    </SlideWrapper>
                </BannerContainer>
            </BannerSectionStyledWrapper>

            {/* === 환율 박스 여기에 넣기 === */}
            <ExchangeTimeContainer>
                <ExchangeBoxCom style={{ flex: 1 }} /> {/* flex: 1 추가 */}
                <TimedifferenceCom style={{ flex: 1 }} /> {/* flex: 1 추가 */}
            </ExchangeTimeContainer>

            {/* 4. 이벤트 슬라이드쇼 */}
            <EventSliderCom />
            
            <MainSectionWrapper>

            </MainSectionWrapper>


        </PageWrapper>
    </>
    );
}