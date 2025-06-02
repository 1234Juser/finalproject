import styled, {keyframes} from "styled-components";
import {Link} from "react-router-dom";

// 전체 섹션 컨테이너
export const MainSectionWrapper = styled.div`
    position: relative;
    width: 100%;
    min-height: 37vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 15px; // 모바일 좌우 여백 추가
    
    @media (max-width: 767px) {
        min-height: auto; // 모바일에서 컨텐츠에 맞게 높이 조절
        padding: 0 10px;
    }
`;

// 상단 "월간 Best 여행이지!" 제목
export const BannerSectionTitle = styled.div`
    position: relative;  // absolute → relative 변경
    margin-top: 60px;   // 상단 여백 필요시 조정
    margin-bottom: 12px;
    left: 0;
    font-size: 2.2rem;
    font-weight: bold;
    color: #4a321b;
    letter-spacing: -1.5px;
    z-index: 3;
    display: flex;
    align-items: center;
    gap: 16px;

    .emoji {
        font-size: 2.3rem;
        margin-right: 3px;
    }

    @media (max-width: 1023px) {
        font-size: 2rem;
        margin-top: 40px;
    }
    @media (max-width: 767px) {
        font-size: 1.6rem;
        margin-top: 30px;
        margin-bottom: 10px;
        gap: 10px;
        .emoji {
            font-size: 1.8rem;
        }
    }
`;

// MainSectionWrapper를 확장하는 BannerSectionStyledWrapper
export const BannerSectionStyledWrapper = styled.div` // MainSectionWrapper를 styled(MainSectionWrapper)로 확장하면 MainSectionWrapper의 스타일이 상속됩니다. 여기서는 MainSectionWrapper가 별도 스타일 컴포넌트가 아니므로 div로 변경하고 필요시 스타일을 직접 추가합니다.
    margin-top: calc(62vh + 20px); /* MainVideoWrapper 높이 + 20px */
    margin-bottom: 20px; /* 하단 여백 20px 추가 */
    z-index: 2;
    /* MainSectionWrapper의 기존 스타일 (예: text-align: center, padding 등)이 여기에 추가될 수 있습니다 */
    width: 100%;
    display: flex;
    justify-content: center;

    @media (max-width: 1023px) { // 태블릿
        margin-top: calc(55vh + 20px); // MainVideoWrapper 높이 고려하여 조정
    }
    @media (max-width: 767px) { // 모바일
        margin-top: calc(45vh + 10px); // MainVideoWrapper 높이 고려하여 조정
        // 또는 고정값으로 변경: 예) 280px
        margin-bottom: 10px;
    }
`;

// 배너(슬라이드 영역) 컨테이너
export const BannerContainer = styled.div`
    width: 66%;
    height: 340px;
    margin-top: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;
    position: relative;
    border-radius: 32px;
    /*background: linear-gradient(to bottom right, #fffdf6 80%, #feeabf 100%);*/    
`;

export const BestBannerContainer = styled.div`
    width: 100%; /* 고정 너비 (상위 요소에 따라 조절 필요) */
    //max-width: 1200px; /* 최대 너비 제한 (선택 사항) */
    height: 340px;
    margin: 70px auto 0; /* margin-top: 64px, 좌우 자동 마진으로 가운데 정렬 */
    display: flex;
    justify-content: center; /* 자식 요소 가운데 정렬 */
    align-items: center;
    overflow: hidden; /* 슬라이드 영역 밖의 내용은 숨김 */
    position: relative;
    /* background: linear-gradient(to bottom right, #fffdf6 80%, #feeabf 100%); */
    /* 반응형 조정을 위한 미디어 쿼리 추가 */
    
    @media (max-width: 1023px) { // 태블릿
        width: 90%;
        height: 300px;
        margin-top: 50px;
    }
    @media (max-width: 767px) { // 모바일
        width: 95%;
        height: 260px; // 슬라이드 카드 크기 고려
        margin-top: 20px; // BannerSectionStyledWrapper의 margin-top과 연동
        border-radius: 20px;
    }
`;



// 애니메이션 정의
const infiniteScroll = keyframes`
    0% {
        transform: translateX(0%);
    }
    100% {
        transform: translateX(-100%); 
    }
`;


// 이벤트 슬라이더를 위한 컨테이너 (새로 추가)
export const EventSliderContainer = styled(BannerContainer)`
    margin-top: 40px; /* 환율 박스 아래 공간 조정 */
    margin-bottom: 80px; /* 하단 여백 추가 */
    height: 300px; /* 이벤트 슬라이더 높이 조정 */
    width: 60%; /* 이벤트 슬라이더 너비 조정 */
    /*background: linear-gradient(to bottom right, #eaf2ff 80%, #dbe4ff 100%);*/

    @media (max-width: 1023px) { // 태블릿
        width: 80%;
        height: 280px;
        margin-top: 30px;
        margin-bottom: 60px;
    }
    @media (max-width: 767px) { // 모바일
        width: 95%;
        height: 220px;
        margin-top: 20px;
        margin-bottom: 40px;
    }
`;


// 슬라이드 전체를 감싸는 래퍼
export const SlideWrapper = styled.div`
    display: flex;
    width: calc(100% * 5);
    height: 100%;
    transition: transform 0.8s cubic-bezier(.25,.79,.63,.97);
`;

export const BestSlideWrapper = styled.div`
    display: flex;
    height: 100%;
    animation: ${infiniteScroll} 50s linear infinite; /* 속도를 2배로 느리게 (10s -> 20s) */

    &:hover {
        animation-play-state: paused;
    }
`;


// 슬라이드 개별 카드
export const SlideCard = styled.div`
    width: 100%;
    min-width: 100%;
    height: 100%;
    border-radius: 26px;
    box-shadow: 0 7px 20px rgba(180,140,60,0.16);
    background: #fff;
    overflow: hidden;
    position: relative;
    margin: 0 14px 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

export const BestSlideCard = styled.div`
    min-width: 380px; /* 각 슬라이드 카드 최소 너비 설정 (이 값을 조정하여 한 화면에 보이는 슬라이드 수 조절) */
    width: 25%; /* min-width에 따라 자동으로 조절 */
    height: 100%;
    background: #fff;
    overflow: hidden;
    position: relative;
    margin: 0 20px 0 0; /* 카드 사이의 마진 */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex-shrink: 0; /* flex 아이템이 줄어들지 않도록 함 */

    @media (max-width: 1023px) { // 태블릿
        min-width: 300px;
        margin: 0 15px 0 0;
    }
    @media (max-width: 767px) { // 모바일
        min-width: 240px; // 화면 너비에 따라 1개 또는 일부가 보이도록
        margin: 0 10px 0 0;
        border-radius: 10px;
    }
`;



// BEST 라벨
export const BestLabel = styled.div`
    position: absolute;
    top: 18px;
    left: 18px;
    background: linear-gradient(90deg, #ffb331 60%, #ffd18b 100%);
    color: #3a2700;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 16px;
    padding: 7px 18px 5px 15px;
    box-shadow: 0 2px 10px #ffd18b38;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    gap: 3px;
    z-index: 6;

    @media (max-width: 767px) {
        font-size: 0.8rem;
        padding: 5px 12px 4px 10px;
        top: 10px;
        left: 10px;
        border-radius: 12px;
    }
`;

// 슬라이드 이미지
export const SlideImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .7s cubic-bezier(.22,1,.36,1);
    border-radius: 26px 26px 0 0;
`;

export const BestSlideImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .7s cubic-bezier(.22,1,.36,1);
`;


// 이미지 하단 그라데이션 오버레이
export const SlideOverlay = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 42%;
    background: linear-gradient(0deg,rgba(0,0,0,0.41)0%,rgba(0,0,0,0.18)58%,transparent 100%);
    border-radius: 0 0 26px 26px;
    z-index: 3;
`;

export const BestSlideOverlay = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50%; // 텍스트 가독성 위해 좀 더 어둡게
    background: linear-gradient(0deg,rgba(0,0,0,0.41)0%,rgba(0,0,0,0.18)58%,transparent 100%);
    border-radius: 0 0 15px 15px; // 카드 radius와 맞춤

    @media (max-width: 767px) {
        border-radius: 0 0 10px 10px;
    }
`;


// 오버레이 위에 올라가는 텍스트
export const SlideText = styled.div`
    position: absolute;
    left: 24px;
    bottom: 22px;
    color: #fff;
    font-size: 1.4rem;
    font-weight: 600;
    z-index: 4;
    text-shadow: 1px 2px 8px rgba(30, 16, 2, 0.28);
    letter-spacing: -1px;
`;

export const BestSlideText = styled.div`
    position: absolute;
    left: 24px;
    bottom: 22px;
    color: #fff;
    font-size: 1.4rem;
    font-weight: 600;
    z-index: 4;
    text-shadow: 1px 1px 6px rgba(0,0,0,0.5); // 그림자 강화
    letter-spacing: -0.5px;

    @media (max-width: 1023px) {
        font-size: 1.2rem;
        left: 20px;
        bottom: 20px;
        right: 20px;
    }
    @media (max-width: 767px) {
        font-size: 1rem;
        left: 15px;
        bottom: 15px;
        right: 15px;
        letter-spacing: -0.2px;
    }
`;

// 영상 컨테이너 (그 아래)

// 이미지 배열 예시
export const images = [
    "/img/banner/bannerImg01copy.jpg",
    "/img/banner/bannerImg02copy.jpg",
    "/img/banner/bannerImg03copy.jpg",
    "/img/banner/bannerImg04copy.jpg",
    "/img/banner/bannerImg05copy.jpg"
];

// 영상 배경 컨테이너
export const MainVideoWrapper = styled.div`
    position: absolute;
    top: 0; left: 0; width: 100vw; height: 62vh; min-height: 400px;
    z-index: 0;
    overflow: hidden;
    video {
        width: 100vw; height: 100%; object-fit: cover;
        filter: brightness(0.85) blur(2px);
        transition: filter .5s;
        display: block;
    }

    @media (max-width: 1023px) { // 태블릿
        height: 55vh;
        min-height: 350px;
    }
    @media (max-width: 767px) { // 모바일
        height: 45vh;
        min-height: 250px;
        video {
            filter: brightness(0.75) blur(1px); // 모바일에서 좀 더 어둡게
        }
    }
`;

// 영상 위 블러/그라데이션 오버레이
export const MainVideoOverlay = styled.div`
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(to bottom,rgba(42,58,121,0.23) 30%,rgba(255,210,110,0.28) 100%);
    z-index: 1;
`;

export const MainTitleOnVisual = styled.div`
    position: absolute;
    top: 19vh; left: 0; width: 100%;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: none;

    text-align: center; // 텍스트 중앙 정렬
    padding: 0 20px; // 좌우 여백
    box-sizing: border-box;

    @media (max-width: 1023px) {
        top: 17vh;
    }
    @media (max-width: 767px) {
        top: 15vh; // 모바일에서 위치 조정
        padding: 0 10px;
    }
`;



export const SubTextFx = styled.div`
    margin-top: 10px;
    font-size: 1.25rem; color: #785727;
    opacity: 0.82; letter-spacing: -1px;
    background: rgba(255,255,255,0.49);
    border-radius: 14px; padding: 7px 18px;
    box-shadow: 0 4px 24px 0 rgba(170,130,60,0.07);
    animation: fadeUp 1.3s .18s cubic-bezier(.44,1,.46,1) both;

    @media (max-width: 1023px) {
        font-size: 1.1rem;
        padding: 6px 15px;
    }
    @media (max-width: 767px) {
        font-size: 0.9rem;
        padding: 5px 12px;
        margin-top: 5px;
        border-radius: 10px;
        letter-spacing: -0.5px;
        max-width: 90%; // 너무 길어지지 않도록
    }
`;

// 이벤트 슬라이드 텍스트 추가 (이벤트 기간 표시용)
export const EventSlidePeriodText = styled.div`
    position: absolute;
    left: 24px;
    bottom: 22px;
    color: #fff;
    font-size: 1.2rem; /* 텍스트 크기 조정 */
    font-weight: 500; /* 폰트 굵기 조정 */
    z-index: 4;
    text-shadow: 1px 2px 8px rgba(30, 16, 2, 0.28);
    letter-spacing: -0.5px; /* 자간 조정 */

    @media (max-width: 767px) {
        font-size: 1rem;
        left: 15px;
        bottom: 15px;
    }
`;

// 새로 추가된 스타일드 컴포넌트들
export const PageWrapper = styled.div`
    position: relative;
    min-height: 100vh;
    overflow-x: hidden; // 가로 스크롤 방지
`;


export const ExchangeTimeContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top : 70px;
    width: 100%;

    max-width: 1200px; // 최대 너비 제한
    padding: 0 20px; // 좌우 여백
    box-sizing: border-box;

    @media (max-width: 1023px) {
        gap: 15px;
        margin-top: 50px;
        padding: 0 15px;
        // 태블릿에서는 아직 가로 배치 유지 가능
    }
    @media (max-width: 767px) {
        flex-direction: column; // 모바일에서 세로 정렬
        align-items: center; // 가운데 정렬
        gap: 15px;
        margin-top: 30px;
        padding: 0 10px;
        & > div { // ExchangeBoxCom, TimedifferenceCom
            width: 100%;
            max-width: 400px; // 모바일에서 너무 넓어지지 않도록
        }
    }
    `;


// 1. 전체 섹션 컨테이너 스타일 컴포넌트 정의
export const SectionContainer = styled.div`
  text-align: center;
  padding: 2rem 1rem; /* py-8 px-4 */

    @media (min-width: 640px) {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }
    @media (min-width: 1024px) {
        padding-left: 2rem;
        padding-right: 2rem;
    }
    @media (max-width: 767px) {
        padding: 1.5rem 0.5rem;
    }
`;

// 2. 제목 섹션 컨테이너 스타일 컴포넌트 정의
export const TitleSection = styled.div`
  margin-bottom: 2rem; /* mb-8 */

    @media (max-width: 767px) {
        margin-bottom: 1.5rem;
    }
`;

// 3. 메인 제목 (h2) 스타일 컴포넌트 정의
export const MainTitle = styled.h2`
    font-size: 1.8rem; /* text-2xl */
    font-weight: bold;
    color: #262626;
    margin-bottom: 0.5rem; /* mb-4 */

    @media (min-width: 640px) { // sm:text-3xl (approx 2.25rem)
        font-size: 2.25rem;
    }
    @media (max-width: 767px) {
        font-size: 1.5rem; // 모바일용 폰트 크기
        margin-bottom: 0.3rem;
    }
`;

// 4. 서브 제목 (span) 스타일 컴포넌트 정의
export const Subtitle = styled.span`
    display: block;
    font-size: 1.125rem; /* text-lg */
    color: #262626; /* text-gray-600 */
    text-align: center;

    @media (max-width: 767px) {
        font-size: 0.9rem; // 모바일용 폰트 크기
    }
`;

// 5. 강조 텍스트 (span) 스타일 컴포넌트 정의
export const HighlightText = styled.span`
  color: #567eff;
`;

// 6. 이미지 갤러리 컨테이너 스타일 컴포넌트 정의
export const ImageGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem; /* gap-6 */

    max-width: 1200px; // 최대 너비 제한
    margin: 0 auto; // 가운데 정렬

    @media (max-width: 1023px) { // 태블릿
        gap: 1rem;
    }
    @media (max-width: 767px) { // 모바일
        gap: 1rem;
        // 모바일에서는 한 줄에 2개 또는 1개 표시되도록 아이템 크기 조절
    }
`;

// 7. 개별 이미지 링크 컨테이너 스타일 컴포넌트 정의 (Link 컴포넌트를 styled-components로 감쌈)
export const ImageLinkWrapper = styled(Link)`
  display: block;
  border-radius: 0.5rem; /* rounded-lg */
  //box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* shadow-lg */
  //transition: box-shadow 0.3s ease-in-out; /* transition-shadow duration-300 */
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
    position: relative;

    width: calc(25% - 1.125rem); // 데스크탑 4개 (gap 고려)
    box-sizing: border-box;

    &:hover img {
        transform: scale(1.05); // 호버 시 이미지 확대 효과
    }

    @media (max-width: 1023px) { // 태블릿 (한 줄에 2개)
        width: calc(50% - 0.5rem); // gap 1rem 기준
    }

    @media (max-width: 767px) { // 모바일 (한 줄에 1개 또는 2개)
        width: calc(50% - 0.5rem); // 한 줄에 2개 (더 작은 화면에서는 100% 고려)
        // 만약 한 줄에 1개를 원한다면:
        // width: 90%;
        // margin-bottom: 1rem;
    }
    @media (max-width: 480px) { // 더 작은 모바일 (한 줄에 1개)
        width: 100%;
        max-width: 300px; // 너무 커지지 않게
    }
`;

// 8. 이미지 스타일 컴포넌트 정의
export const CityImage = styled.img`
    width: 100%; // 부모 너비에 맞춤
    height: 22rem; // 데스크톱 기본 높이 (sm:h-44는 약 11rem)
    object-fit: cover;
    border-radius: 0.5rem;
    transition: transform 0.3s ease-in-out;

    @media (max-width: 1023px) { // 태블릿
        height: 18rem;
    }
    @media (max-width: 767px) { // 모바일
        height: 15rem; // CityImage의 기존 sm:h-44 (176px) 보다 약간 크게
    }
    @media (max-width: 480px) {
        height: 12rem;
    }
`;

// 9. 이미지 아래 도시 이름 텍스트 스타일 컴포넌트 정의
export const CityName = styled.p`
  margin-top: 0.5rem; /* mt-2 */
  font-size: 1.3rem; /* text-md */
  font-weight: 500; /* font-semibold */
  color: #262626;

    text-align: left; // CityLabel과 맞춤

    @media (max-width: 1023px) {
        font-size: 1.15rem;
    }
    @media (max-width: 767px) {
        font-size: 1rem;
        margin-top: 0.3rem;
    }
`

export const CityLabel = styled.span`
    display: block;
    margin-top: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    color: #222;
    text-align: left;

    @media (max-width: 767px) {
        font-size: 1rem;
        margin-top: 6px;
    }
`;
