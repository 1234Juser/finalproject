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
    0% { color: #28a745; transform: scale(1); } /* 초록색 시작 */
    50% { color: #28a745; transform: scale(1.05); }
    100% { color: #28a745; transform: scale(1); }
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
        transform: scale(1);
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
    display: flex;
    flex-direction: column; /* 요소를 세로로 정렬 */
    align-items: center; /* 이미지와 텍스트 블록을 가운데 정렬 */
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
`;

// 다음 페이지 섹션을 위한 새로운 스타일드 컴포넌트
export const SecondPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* 내용을 수직 가운데 정렬 */
    height: 100vh; /* 뷰포트 높이만큼 공간 차지 */
    /* background-color: rgba(255, 255, 255, 0.8);  반투명 배경색 */
    padding: 20px;
    box-sizing: border-box; /* 패딩이 너비에 포함되도록 */
    text-align: center;

    &.animated {
        .HelloLogoWrapper {
            animation: ${helloImageZoomIn} 1.5s ease-out forwards;
            animation-delay: 0.5s;
        }
        .CompanyParagraph {
            animation: ${fadeIn} 1s forwards;
            animation-delay: 1.0s;
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
// Hello 이미지를 위한 별도의 LogoWrapper (애니메이션 적용)
export const HelloLogoWrapper = styled(LogoWrapper)`
    /* 애니메이션을 .animated 클래스에 정의 */
`;



export const CompanyTextWrapper = styled.div`
    flex-grow: 1; /* 남은 공간을 텍스트가 차지 */
    display: flex;
    flex-direction: column;
    gap: 15px; /* 문단 사이 간격 */
    width: 100%; /* 텍스트 wrapper가 전체 너비를 차지하도록 설정 */
    max-width: 800px; /* 텍스트 영역의 최대 너비 설정 */
`;

export const CompanyTitle = styled.h2`
    font-size: 36px;
    font-weight: 700;
    color: #333;
    margin-bottom: 10px;
    opacity: 0; /* 초기 상태를 투명하게 설정 */
    text-align: center; /* 텍스트 가운데 정렬 추가 */
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