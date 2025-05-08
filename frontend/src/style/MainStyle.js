import styled from "styled-components";

// 전체 섹션 컨테이너
export const MainSectionWrapper = styled.div`
    position: relative;
    width: 100%;
    min-height: 37vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    background: linear-gradient(to bottom right, #fffdf6 80%, #feeabf 100%);
    box-shadow:
        0 4px 36px 10px rgba(220,167,50,0.13),
        0 0 0 7px #fff8e2 inset;
    border: 2px solid #efd492;
`;

// 슬라이드 전체를 감싸는 래퍼
export const SlideWrapper = styled.div`
    display: flex;
    width: calc(100% * 5);
    height: 100%;
    transition: transform 0.8s cubic-bezier(.25,.79,.63,.97);
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
`;

// 슬라이드 이미지
export const SlideImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .7s cubic-bezier(.22,1,.36,1);
    border-radius: 26px 26px 0 0;
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
    border-bottom-left-radius: 46px;
    border-bottom-right-radius: 46px;
    video {
        width: 100vw; height: 100%; object-fit: cover;
        filter: brightness(0.85) blur(2px);
        transition: filter .5s;
        display: block;
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
`;



export const SubTextFx = styled.div`
    margin-top: 10px;
    font-size: 1.25rem; color: #785727;
    opacity: 0.82; letter-spacing: -1px;
    background: rgba(255,255,255,0.49);
    border-radius: 14px; padding: 7px 18px;
    box-shadow: 0 4px 24px 0 rgba(170,130,60,0.07);
    animation: fadeUp 1.3s .18s cubic-bezier(.44,1,.46,1) both;
`;