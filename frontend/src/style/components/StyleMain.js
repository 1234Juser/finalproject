import styled, {keyframes} from 'styled-components';

const MainBanner = styled.img`
    width: 100%; /* 가로 길이를 부모 요소 너비에 맞춤 */
    height: auto; /* 세로 길이를 가로 비율에 맞게 자동 조정 */
    object-fit: cover; /* 이미지가 영역에 가득 차도록 설정 */
    aspect-ratio: auto; /* 원본 비율을 유지 (브라우저 지원 시) */
`;

// 슬라이드 애니메이션 정의

const slideAnimation = keyframes`
    0% {
        transform: translateX(0); /* 첫 번째 이미지 */
    }
    20% {
        transform: translateX(0); /* 첫 번째 이미지 멈춤 */
    }
    //25% {
    //    transform: translateX(-100%); /* 두 번째 이미지로 이동 */
    //}
    //45% {
    //    transform: translateX(-100%); /* 두 번째 이미지 멈춤 */
    //}
    //50% {
    //    transform: translateX(-200%); /* 세 번째 이미지로 이동 */
    //}
    //70% {
    //    transform: translateX(-200%); /* 세 번째 이미지 멈춤 */
    //}
    //75% {
    //    transform: translateX(-300%); /* 네 번째 이미지로 이동 */
    //}
    //95% {
    //    transform: translateX(-300%); /* 네 번째 이미지 멈춤 */
    //}
    //100% {
    //    transform: translateX(-400%); /* 다섯 번째 이미지로 이동 */
    //}
`;


// 슬라이드 컨테이너 스타일
const BannerContainer = styled.div`
  position: relative;
  width: 100%; 
  overflow: hidden;
    height: 100vh; /* 브라우저 높이에 맞춰 화면 전체 차지 */
    
    /* 16:9 비율 유지 */
    //&::before {
    //    content: "";
    //    display: block;
    //    padding-top: 56.25%; /* 16:9 비율을 위한 높이(9/16 x 100%) */
    //}


`;

// 슬라이드를 감싸는 Wrapper
const SlideWrapper = styled.div`
  display: flex;
    width: calc(100% * 5);
    height: 100%;
  animation: ${slideAnimation} 5s infinite; /* 10초 동안 무한 반복 (1초 멈춤 포함) */
    transition: transform 1s ease-in-out; /* 부드러운 전환 */
    position: absolute;
    height: 100%; /* 부모 컨테이너 높이에 맞춤 */


`;

// 각각의 이미지 스타일
const SlideImage = styled.img`
  width: 100%; /* 부모 컨테이너 기준에서 100% */
  height: 100%;
  object-fit: cover;
`;

// 이미지 배열 정의
const images = [
    "/img/banner/bannerImg01.jpg",
    "/img/banner/bannerImg02.jpg",
    "/img/banner/bannerImg03.jpg",
    "/img/banner/bannerImg04.jpg",
    "/img/banner/bannerImg05.jpg"
];


export {
    MainBanner, BannerContainer, SlideWrapper, SlideImage, images
};