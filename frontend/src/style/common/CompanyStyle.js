import styled, { keyframes, createGlobalStyle } from 'styled-components';

// 텍스트 등장 애니메이션
const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

// "Hello" 강조 애니메이션 (텍스트 컬러 변경)
const helloEmphasis = keyframes`
    0% { color: #28a745; transform: scale(0.1); } /* 초록색 시작 */
    50% { color: #28a745; transform: scale(0.1); }
    100% { color: #28a745; transform: scale(0.1); }
`;

// "Hello" 텍스트에 적용될 애니메이션
const helloTextAnimation = keyframes`
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
`;

// Hello 이미지 확대 애니메이션
const helloImageZoomIn = keyframes`
    from {
        transform: scale(0.5);
        opacity: 0;
    }
    to {
        transform: scale(0.8);
        opacity: 1;
    }
`;

// 전역 스타일: 배경을 흰색으로 설정
export const GlobalStyle = createGlobalStyle`
    body {
        background-color: #ffffff; /* 배경색을 흰색으로 변경 */
        background-image: none; /* 배경 이미지 제거 */
        margin: 0; /* 기본 마진 제거 */
        padding: 0; /* 기본 패딩 제거 */
        position: relative; /* 가상 요소를 위한 position 설정 (필요 없으면 제거) */
    }

    body::before {
        /* 배경 명도 조절을 위한 가상 요소는 제거 */
        content: none;
    }
`;

export const CompanyContainer = styled.div`
    display: flex; /* 가로 정렬을 위해 flex 사용 */
    flex-direction: row; /* 요소를 가로로 정렬 */
    justify-content: center; /* 가운데 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
    padding: 40px 20px;
    max-width: 1200px;
    margin: 0 auto;
    gap: 40px; /* 이미지와 텍스트 사이 간격 */
    background-color: #ffffff;
    margin-top: 50px;
    overflow: hidden; /* 내부 애니메이션 요소들이 벗어나지 않도록 */

    &.animated {
        .CompanyTitle {
            animation: ${fadeIn} 1s forwards;
            animation-delay: 0.5s;
        }
        .CompanyParagraph:nth-of-type(1) {
            animation: ${fadeIn} 1s forwards;
            animation-delay: 1.0s;
        }
        .CompanyParagraph:nth-of-type(2) {
            animation: ${fadeIn} 1s forwards;
            animation-delay: 1.5s;
        }
        .HelloText {
            animation: ${helloTextAnimation} 1.5s ease-out forwards;
            animation-delay: 2.5s;
        }
    }

    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
    }
`;


// 다음 페이지 섹션을 위한 새로운 스타일드 컴포넌트
export const SecondPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* 내용을 수직 가운데 정렬 */
    height: 100vh; /* 뷰포트 높이만큼 공간 차지 */
    padding: 20px;
    box-sizing: border-box; /* 패딩이 너비에 포함되도록 */
    text-align: center;
    margin-top: 10vh; /* 이전 섹션과 스크롤 간격 조정 */
    min-height: 100vh; /* 최소 높이를 뷰포트 높이로 설정 */

    &.animated {
        .HelloLogoWrapper {
            animation: ${helloImageZoomIn} 1.5s ease-out forwards;
            animation-delay: 0.5s;
        }
        .CompanyParagraph {
            animation: ${fadeIn} 1s forwards;
            animation-delay: 1.0s;
        }
        .CompanyParagraph .HelloText { /* 여기에 HelloText 애니메이션 추가 */
            animation: ${helloTextAnimation} 1.5s ease-out forwards;
            animation-delay: 1.5s; /* 필요에 따라 딜레이 조정 */
        }
    }
`;

export const LogoWrapper = styled.div`
    flex-shrink: 0; /* 이미지 크기 유지 */
    width: 100%; /* 로고 이미지 크기를 더 크게 조정 */
    max-width: 600px; /* 최대 너비 설정 */
    height: auto;
    display: flex;
    justify-content: center; /* 이미지를 가운데 정렬 */
`;

export const LogoWrapper2 = styled.div`
    flex-shrink: 0; /* 이미지 크기 유지 */
    width: 100%; /* 로고 이미지 크기를 더 크게 조정 */
    max-width: 600px; /* 최대 너비 설정 */
    height: 400px;
    display: flex;
    justify-content: center; /* 이미지를 가운데 정렬 */
`;
// Hello 이미지를 위한 별도의 LogoWrapper (애니메이션 적용)
export const HelloLogoWrapper = styled(LogoWrapper)`
    /* 애니메이션을 .animated 클래스에 정의 */
`;

export const CompanyTextWrapper = styled.div`
    flex-grow: 1; /* 남은 공간을 텍스트가 차지 */
    display: flex;
    flex-direction: column;
    gap: 4px; /* 문단 사이 간격 (기존 4px에서 줄임) */
    width: 100%; /* 텍스트 wrapper가 전체 너비를 차지하도록 설정 */
    max-width: 800px; /* 텍스트 영역의 최대 너비 설정 */
    max-height: 200px; /* 세로 최대 높이 추가 (예시 값, 필요에 따라 조절) */
`;


export const CompanyTitle = styled.h2`
    font-size: 36px;
    font-weight: 700;
    color: #333;
    margin-bottom: 10px;
    opacity: 0; /* 초기 상태를 투명하게 설정 */
    text-align: center; /* 텍스트 가운데 정렬 추가 */
    margin-bottom: 0px; /* 단락 하단 마진을 0으로 설정 */
    margin-top: 0px; /* 단락 상단 마진을 0으로 설정 */
    /* 애니메이션을 .animated 클래스에 정의 */
`;

export const CompanyParagraph = styled.p`
    font-size: 18px;
    line-height: 1.6;
    color: #555;
    opacity: 0; /* 초기 상태를 투명하게 설정 */
    text-align: center; /* 텍스트 가운데 정렬 추가 */
    /* 애니메이션을 .animated 클래스에 정의 */
`;

export const CompanyParagraph2 = styled.p`
    font-size: 18px;
    line-height: 0.7;
    color: #555;
    opacity: 0; /* 초기 상태를 투명하게 설정 */
    text-align: left; /* 텍스트 가운데 정렬 추가 */
    /* 애니메이션을 .animated 클래스에 정의 */
`;
export const FirstParagraphOfThirdPage = styled(CompanyParagraph2)`
    font-size: 28px; /* 글자 크기 키움 */
    font-weight: 700; /* 글자 강조 */
    color: #333; /* 색상 변경 */
`;


export const HighlightText = styled.span`
    font-weight: 700;
    color: #007bff; /* 강조 색상 */
    animation: ${helloEmphasis} 3s infinite alternate; /* Hello 텍스트 강조 애니메이션 */
`;

export const HelloText = styled.span`
    font-size: 20px; /* "Hello" 텍스트 크기 */
    font-weight: 900; /* "Hello" 텍스트 굵기 */
    color: #28a745; /* "Hello" 텍스트 초기 색상 */
    display: inline-block; /* transform 적용을 위해 필요 */
    opacity: 0; /* 초기 상태를 투명하게 설정 */
    margin-left: 5px; /* 앞 텍스트와의 간격 */
    /* 애니메이션을 .animated 클래스에 정의 */
`;

// 새로 추가된 세 번째 페이지 섹션 (이미지 + 텍스트)
export const ThirdPageContainer = styled.div`
    display: flex; /* 가로 정렬을 위해 flex 사용 */
    flex-direction: row; /* 요소를 가로로 정렬 */
    justify-content: center; /* 가운데 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
    padding: 40px 20px;
    max-width: 1200px;
    margin: 0 auto;
    gap: 15px; /* 이미지와 텍스트 사이 간격 */
    background-color: #ffffff;
    margin-top: 5vh; /* 이전 섹션과 스크롤 간격 조정 */
    min-height: 100vh; /* 최소 높이를 뷰포트 높이로 설정 */
    overflow: hidden; /* 내부 애니메이션 요소들이 벗어나지 않도록 */

    &.animated {
        /* 이미지 애니메이션 제거 */
        .ThirdPageImage {
            animation: none;
        }
        /* ThirdPageContainer 내부의 모든 CompanyParagraph2와 FirstParagraphOfThirdPage에 개별 애니메이션 적용 */
        ${FirstParagraphOfThirdPage} {
            animation: ${fadeIn} 1s forwards;
            animation-delay: 0.5s;
        }
        ${CompanyParagraph2}:nth-of-type(1) {
            animation: ${fadeIn} 1s forwards;
            animation-delay: 1.0s;
        }
        ${CompanyParagraph2}:nth-of-type(2) {
            animation: ${fadeIn} 1s forwards;
            animation-delay: 1.5s;
        }
        ${CompanyParagraph2}:nth-of-type(3) {
            animation: ${fadeIn} 1s forwards;
            animation-delay: 2.0s;
        }
        ${CompanyParagraph2}:nth-of-type(4) {
            animation: ${fadeIn} 1s forwards;
            animation-delay: 2.5s;
        } 
        ${CompanyParagraph2}:nth-of-type(5) {
                    animation: ${fadeIn} 1s forwards;
                    animation-delay: 3s;
            }    
    }

    /* 모바일 뷰: 세로로 정렬 */
    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center; /* 텍스트 가운데 정렬 */
    }
`;