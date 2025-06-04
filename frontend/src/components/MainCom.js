import {
    BannerSectionStyledWrapper,
    BestBannerContainer,
    BestLabel,
    BestSlideCard,
    BestSlideImage,
    BestSlideOverlay,
    BestSlideText,
    BestSlideWrapper,
    CityImage,
    CityLabel,
    CityName,
    ExchangeTimeContainer,
    HighlightText,
    ImageGallery,
    ImageLinkWrapper,
    images,
    MainSectionWrapper,
    MainTitle,
    MainTitleOnVisual,
    MainVideoOverlay,
    MainVideoWrapper,
    PageWrapper,
    SubTextFx,
    Subtitle,
    TitleSection,
} from "../style/MainStyle";
import React, {useEffect, useState} from "react";
import ExchangeBoxCom from "./exchange/ExchangeBoxCom";
import RecentReviewRequestModalCon from "../containers/review/RecentReviewRequestModalCon";
import TimedifferenceCom from "./exchange/TimedifferenceCom";
import EventSliderCom from "./event/EventSliderCom";

export default function MainCom({accessToken, state, dispatch}) {
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);


    useEffect(() => {
        const lastIndex = images.length - 1;

        // 화면 크기 변경 감지 로직 추가
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 767);
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // 컴포넌트 마운트 시 초기 실행

        return () => {
            window.removeEventListener('resize', handleResize); // 언마운트 시 리스너 해제
        };
    }, []);

    const slideTexts = [
        {
            text: <>천년의 미소, 앙코르와트 속으로—<br/>신비로운 캄보디아 유적 탐험</>,
            link: "https://hellotravelogic.link/products/city?city_id=17"
        },
        {
            text: <>바다와 별이 만나는 곳, 남해—<br/>자연이 주는 가장 고요한 선물</>,
            link: "https://hellotravelogic.link/products/city?city_id=3"
        },
        {
            text: <>파도 위의 천국, 하와이—<br/>당신의 여름은 여기서 시작돼요</>,
            link: "https://hellotravelogic.link/products/city?city_id=21"
        },
        {
            text: <>북유럽 하늘에 별이 춤추는 순간,<br/>당신도 거기 있을 수 있어요.</>,
            link: "https://hellotravelogic.link/products/city?city_id=46"
        },
        {
            text: <>‘여기 진짜 실화냐?’ 싶은 풍경,<br/>중국 장가계 투어 전격 오픈!</>,
            link: "https://hellotravelogic.link/products/city?city_id=26"
        }
    ];

    const cityImages = [
        {
            id: 1,
            src: "/static/img/product/region4/singapore.png",
            alt: "싱가포르",
            caption: "마리나 베이 샌즈에서 인생샷 예약",
            link: "/products/city?city_id=48",
        },
        {
            id: 2,
            src: "/static/img/product/region6/rio_de_janeiro.jpg",
            alt: "리우데자네이루",
            caption: "태양과 자유, 지금 여기 브라질",
            link: "/products/city?city_id=38",
        },
        {
            id: 3,
            src: "/static/img/product/region5/london.jpg",
            alt: "런던",
            caption: "그냥 걷기만 해도 브릿팝 BGM 자동 재생  ️",
            link: "/products/city?city_id=41",
        },
        {
            id: 4,
            src: "/static/img/product/region7/auckland.jpg",
            alt: "오클랜드",
            caption: "시간이 느리게 흐르는 도시, 오클랜드",
            link: "/products/city?city_id=37",
        },
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
                <BestBannerContainer>
                    <BestSlideWrapper>
                        {[...images, ...images].map((src, idx) => {
                            const currentSlideData = slideTexts[idx % slideTexts.length];
                            return (
                                <BestSlideCard key={idx}
                                               onClick={() => {
                                                   window.location.href = currentSlideData.link;
                                               }}
                                               style={{ cursor: 'pointer' }} // 클릭 가능한 UI 표시
                                >
                                    <BestLabel>BEST {(idx % images.length) + 1}</BestLabel>
                                    <BestSlideImage
                                        // src={`http://localhost:8080${src}`}
                                        src={`https://api.hellotravelogic.link${src}`}
                                        alt={`banner-${idx}`}
                                    />
                                    <BestSlideOverlay/>
                                    <BestSlideText>{currentSlideData.text}</BestSlideText>
                                </BestSlideCard>
                                )
                        })}
                    </BestSlideWrapper>
                </BestBannerContainer>
            </BannerSectionStyledWrapper>

            {/* === 환율 박스 여기에 넣기 === */}
            <ExchangeTimeContainer>
                <ExchangeBoxCom style={{ flex: 1 }} /> {/* flex: 1 추가 */}
                <TimedifferenceCom style={{ flex: 1 }} /> {/* flex: 1 추가 */}
            </ExchangeTimeContainer>

            <MainSectionWrapper style={{ marginTop: "70px"}}>
                    <TitleSection>
                        <MainTitle>
                            <span>
                                📌MD가 찜한<HighlightText> "그 도시"</HighlightText>,
                                {isMobileView && <br />} {/* 모바일일 때만 br 태그 렌더링 */}
                                대신 다녀와주세요
                            </span>
                        </MainTitle>
                        <Subtitle>다음에 가야지가 벌써 3년째 ㅠㅠ</Subtitle>
                    </TitleSection>

                    <ImageGallery>
                        {cityImages.map((image) => (
                            <ImageLinkWrapper key={image.id} to={image.link}>
                                <CityImage src={image.src} alt={image.alt} />
                                <CityLabel>{image.alt}</CityLabel>
                                <CityName>{image.caption}</CityName>
                            </ImageLinkWrapper>
                        ))}
                    </ImageGallery>
            </MainSectionWrapper>

            {/* 4. 이벤트 슬라이드쇼 */}
            <EventSliderCom />

            <MainSectionWrapper>
            {/*    메인 섹션 추가 */}
            </MainSectionWrapper>



        </PageWrapper>
    </>
    );
}