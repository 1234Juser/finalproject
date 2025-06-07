import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// 스크롤 버튼 스타일 컴포넌트
const TopButton = styled.button`
  position: fixed; /* 화면에 고정 */
  bottom: 150px;    /* 하단에서 30px 위로 */
  right: 85px;     /* 우측에서 30px 왼쪽으로 */
  width: 50px;     /* 버튼 너비 */
  height: 50px;    /* 버튼 높이 */
  background-color: #007bff; /* 배경색 */
  color: white;    /* 글자색 */
  border: none;    /* 테두리 없음 */
  border-radius: 50%; /* 원형 버튼 */
  font-size: 24px; /* 화살표 크기 */
  font-weight: bold; /* 글자 굵기 */
  display: flex;   /* flexbox 사용 */
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center;     /* 세로 중앙 정렬 */
  cursor: pointer; /* 마우스 오버 시 커서 변경 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  transition: opacity 0.3s, visibility 0.3s, background-color 0.3s; /* 부드러운 전환 효과 */
  z-index: 999;    /* 다른 요소 위에 표시 */

  /* 스크롤 위치에 따라 버튼을 보이거나 숨김 */
  opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};

  &:hover {
    background-color: #0056b3; /* 호버 시 배경색 변경 */
  }

  /* 모바일 반응형 */
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    bottom: 20px;
    right: 20px;
    font-size: 20px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    bottom: 15px;
    right: 15px;
    font-size: 18px;
  }
`;

function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // 스크롤 이벤트를 감지하여 버튼의 가시성을 조절
    const toggleVisibility = () => {
        if (window.scrollY > 200) { // 200px 이상 스크롤 시 버튼 표시
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // 버튼 클릭 시 최상단으로 스크롤
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 부드러운 스크롤 효과
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <TopButton onClick={scrollToTop} $isVisible={isVisible}>
            ↑
        </TopButton>
    );
}

export default ScrollToTopButton;