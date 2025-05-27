import {
    MainVideoWrapper, MainVideoOverlay, MainTitleOnVisual, SubTextFx,
    MainSectionWrapper, BannerContainer, SlideWrapper, SlideCard, SlideImage, SlideOverlay, SlideText, BestLabel, images
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
        "1번 배너 설명",
        "2번 배너 설명",
        "3번 배너 설명",
        "4번 배너 설명",
        "5번 배너 설명"
    ];


    return (
    <>
        <RecentReviewRequestModalCon
            accessToken={accessToken}
            state={state}
            dispatch={dispatch}
        />
        <div style={{position:"relative", minHeight:"100vh", overflow:"hidden"}}>
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
            <MainSectionWrapper style={{marginTop:"62vh", zIndex:2}}>
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
            </MainSectionWrapper>

            {/* === 환율 박스 여기에 넣기 === */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px", // 환율 박스와 시차 박스 사이의 간격 (이미 0이지만 다시 확인)
                marginTop: "16px", // 위쪽 공간 확보
                width: "100%", // 부모 너비를 꽉 채우도록 설정
                boxSizing: "border-box" // padding이 포함된 너비 계산 방식
            }}>
                <ExchangeBoxCom style={{ flex: 1 }} /> {/* flex: 1 추가 */}
                <TimedifferenceCom style={{ flex: 1 }} /> {/* flex: 1 추가 */}
            </div>

            {/* 4. 이벤트 슬라이드쇼 */}
            <EventSliderCom />



        </div>
    </>
    );
}