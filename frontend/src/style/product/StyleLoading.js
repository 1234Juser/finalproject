import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform:  rotate(0deg);
  }
  100% {
    transform:  rotate(360deg);
  }
`;

// 배경을 흐리게 하고 어둡게 만드는 스타일
const Backdrop = styled.div`
  position: fixed; /* 화면 전체를 덮도록 고정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  //background-color: rgba(180, 180, 180, 0.2); /* 약간 어두운 반투명 배경 */
  backdrop-filter: blur(2px); /* 배경 흐림 효과 */
  -webkit-backdrop-filter: blur(4px); /* Safari 브라우저 호환성 */
  z-index: 999; /* 로딩 컴포넌트보다 아래에 위치 */
`;


// 로딩 컴포넌트 전체를 감싸는 스타일
const LoadingWrapper = styled.div`
    position: fixed; /* 화면 중앙에 고정 */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* 정확한 중앙 정렬 */
    display: flex; /* 내부 요소들을 flex로 정렬 */
    flex-direction: column; /* 요소들을 세로로 배치 */
    align-items: center; /* 가로축 중앙 정렬 */
    justify-content: center; /* 세로축 중앙 정렬 */
    font-size: 20px; /* 텍스트 크기 */
    font-weight: bold; /* 텍스트 굵기 */
    color: #FFFFFF; /* 어두운 배경과 대비되는 밝은 텍스트 색상 */
    z-index: 1000; /* Backdrop보다 위에 위치 */
    padding: 20px; /* 내부 여백 */
    border-radius: 10px; /* 모서리 둥글게 (선택 사항) */
    /* background-color: rgba(0, 0, 0, 0.5); // 로딩 컴포넌트 자체의 배경 (선택 사항) */
`;

// 스피너 스타일
const Spinner = styled.div`
    width: 40px; /* 스피너 크기 */
    height: 40px; /* 스피너 크기 */
    border: 4px solid rgba(255, 255, 255, 0.3); /* 스피너 테두리 색상 (밝게) */
    border-top-color: #85c0e9; /* 스피너 상단 테두리 색상 (더 밝게) */
    border-radius: 50%; /* 원형 모양 */
    animation: ${spin} 1s linear infinite; /* 회전 애니메이션 적용 */
`;

// 로딩 컴포넌트
const Loading = () => {

    return (
        <>
            <Backdrop /> {/* 배경 흐림 효과를 위한 Backdrop 렌더링 */}
            <LoadingWrapper>
                <Spinner /> {/* 스피너 렌더링 */}
                {/*<LoadingText>Loading...</LoadingText> /!* 로딩 텍스트 렌더링 *!/*/}
            </LoadingWrapper>
        </>
    );
}

export default Loading;