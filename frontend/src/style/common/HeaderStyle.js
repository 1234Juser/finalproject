import styled from "styled-components";
import { FiUser } from "react-icons/fi";

// 헤더 배경을 전체 배경색과 동일하게, 테두리·그림자 없음!
export const StyledHeader = styled.header`
    width: 100%;
    height: 80px;
    background: #fff; /* 완전 흰색으로 변경 */
    border-radius: 0;
    box-shadow: none; /* 그림자·경계선 모두 제거 */
    border: none;     /* 혹시 있을 수 있는 border 명시적으로 제거 */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    position: relative;

    box-sizing: border-box; // 패딩이 너비에 포함되도록

    @media (max-width: 1023px) { // 태블릿
        height: 70px;
        padding: 0 24px;
    }

    @media (max-width: 767px) { // 모바일
        flex-direction: column; // 자식 요소들을 세로로 쌓음
        height: auto; // 내용에 따라 높이 자동 조절
        padding: 20px 15px; // 모바일에서 상하 패딩 추가, 좌우 패딩 조정
        gap: 20px; // 세로로 쌓인 요소들 간의 간격
    }
`;


export const StyledTitle = styled.h1`
    font-size: 2.1rem;
    font-weight: bold;
    font-family: 'Poppins', 'Pretendard', sans-serif;
    background: linear-gradient(90deg, #409cff, #be85ff 60%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    letter-spacing: 1.2px;
    margin: 0;
    .link {
        text-decoration: none;
        color: inherit;
    }

    white-space: nowrap; // 줄바꿈 방지
    @media (max-width: 1024px) { // 1024px 이하 화면에서 적용
        font-size: 1.5rem; // 태블릿에서 사용했던 폰트 크기 적용
        white-space: normal; // 텍스트 줄바꿈 허용
        line-height: 1.2; // 줄 간격 조절 (필요시)
        max-width: 130px;  // 예시 값 (테스트 후 조절 필요)
         text-align: left; // 또는 left, right 등 원하는 정렬로
    }

    @media (max-width: 767px) { // 모바일
        font-size: 1.6rem; // 모바일에서 로고 폰트 크기 살짝 조정
        text-align: center; // 로고 텍스트 중앙 정렬
        white-space: normal; // 이미 상속됨
        max-width : none;
        line-height: normal;
    }
`;

// 새로 추가된 검색 컨테이너 스타일
export const SearchContainer = styled.div`
    flex: 1; // StyledHeader 내에서 기본적으로 가능한 많은 공간을 차지하도록 함
    display: flex;
    align-items: center;
     justify-content: center; // 자식 요소의 flex-grow로 인해 재조정될 수 있으므로, 필요에 따라 flex-start 또는 space-between 등으로 변경
    min-width: 0; // 컨테이너가 내용물보다 작아질 수 있도록 허용
    padding: 0 20px; // 데스크톱 기본 좌우 패딩
    gap: 12px; // SearchInputPage와 RealtimeRanking 사이의 간격 (데스크톱)

    // SearchInputPage (첫 번째 자식) 스타일링
    & > :first-child {
        flex-grow: 0;   // 고정 너비를 가지므로 늘어나지 않음
        flex-shrink: 0; // 고정 너비를 가지므로 줄어들지 않음
        flex-basis: 350px; // 데스크톱에서 SearchInputCom의 너비와 동일하게 설정
    }

    // RealtimeRanking (두 번째 자식) 스타일링
    & > :last-child {
        flex-grow: 0;
        flex-shrink: 0;
        // RealtimeRanking.js 내부에서 너비가 제어됨 (예: max-width: 180px 등)
    }

    @media (max-width: 1024px) { // 태블릿
        padding: 0 15px;
        gap: 10px;

        & > :first-child { // SearchInputPage (SearchInputCom의 태블릿 너비에 맞춤)
            flex-basis: 220px; // SearchInputCom Wrapper의 태블릿 너비와 일치
        }
    }

    @media (max-width: 767px) { // 모바일
        //flex-direction: column; // 검색창과 실시간랭킹을 세로로 쌓음
        width: 100%; // 부모(StyledHeader) 너비에 맞춤 (StyledHeader가 align-items:center 이므로 중앙에 위치)
        max-width: 400px; // 너무 넓어지지 않도록 최대 너비 설정 (선택적)
        padding: 0; // 내부 패딩은 각 자식 요소가 갖도록 하거나 여기서 0으로 초기화
        gap: 15px; // 세로로 쌓인 검색창과 실시간랭킹 사이 간격

        & > :first-child { // SearchInputCom (모바일)
            //width: 100%; // SearchContainer 너비에 100%
            flex-basis: auto; // flex-basis 초기화
            min-width: 0; // min-width 초기화 (SearchInputCom.js에서 width:100%로 이미 유연함)
            // SearchInputCom.js의 Wrapper에서 모바일 width: 100% 적용됨
        }

        & > :last-child { // RealtimeRanking (모바일)
            width: 100%; // SearchContainer 너비에 100% (내부적으로 max-width:140px 적용됨)
            // RealtimeRanking.js의 RankingContainer에서 모바일 max-width: 140px; 적용됨
        }
    }
`;



export const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    gap: 16px; // 데스크톱 기본 간격
    font-size: 1.07rem; // 데스크톱 기본 폰트 크기

    @media (max-width: 1023px) { // 태블릿
        gap: 12px;
        font-size: 1rem;
    }

    @media (max-width: 767px) { // 모바일
        gap: 10px; // 버튼 간 간격
        font-size: 0.9rem;
        width: 100%; // 전체 너비 사용 또는 auto
        justify-content: center; // 버튼들을 중앙 정렬
    }
`;

export const ProfileImg = styled.img`
    width: 42px;
    height: 42px;
    border-radius: 100%;
    object-fit: cover;
    border: 2px solid #7ac2fd;
    box-shadow: 0 2px 8px #d7daf6b0;
    margin-right: 7px;
    background: #eff5fb;

    @media (max-width: 1023px) { // 태블릿
        width: 38px;
        height: 38px;
        margin-right: 5px;
    }

    @media (max-width: 767px) { // 모바일
        width: 32px;
        height: 32px;
        margin-right: 4px;
        border-width: 1.5px;
    }
`;


export const HeaderButton = styled.button`
    background: #fff;
    color: #111;
    /* 텍스트 색상: 원래의 파란 계열과 어울리도록 설정 */
    border: none; /* 미세 경계선 추가(없애고 싶으면 border: none;) */
    border-radius: 8px;
    padding: 7px 18px;
    font-size: 1.07rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: none;
    transition: background .13s, color .13s, border .13s;

    &:hover {
        background: #f1f6ff;
        color: #409cff;
        border: 1.5px solid #b8d5fc;
    }

    white-space: nowrap; // 버튼 내 텍스트 줄바꿈 방지

    &:hover {
        background: #f1f6ff;
        color: #409cff;
        // border: 1.5px solid #b8d5fc; // 호버 시 테두리는 유지하거나 필요에 따라 조정
    }

    @media (max-width: 1023px) { // 태블릿
        padding: 6px 14px;
        font-size: 1rem;
    }

    @media (max-width: 767px) { // 모바일
        padding: 5px 10px;
        font-size: 0.9rem;
        font-weight: 600;
    }
`;

// 모바일 전용 햄버거 버튼
export const HamburgerButton = styled.button`
    display: none;
    border: 2px solid #383838; // 연두색 테두리로 포인트
    border-radius: 8px; // 둥근 모서리
    cursor: pointer;
    padding: 8px;
    transition: background-color 0.3s ease, border-color 0.3s ease;

    svg {
        font-size: 24px;
        color: #888888; // 아이콘 색상도 테두리와 맞춤
        display: block;
        transition: color 0.3s ease;
    }

    @media (max-width: 768px) {
        display: block;
        position: absolute;
        top: 20px;
        left: 15px;
        border: none; // 모바일에서 테두리 없애고 싶으면 여길 주석 처리해도 됨
        background: transparent; // 모바일에서 배경 투명하게 변경 가능 (선택사항)
        padding: 6px;
    }
`;

// 백드롭 (모바일에서만 보임)
export const Backdrop = styled.div`
    display: none;

    @media (max-width: 768px) {
        display: ${({ isOpen }) => (isOpen ? "block" : "none")};
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, ${({ isOpen }) => (isOpen ? "0.4" : "0")});
        z-index: 1000;
        opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
        visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
        pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};

        transition: background-color 0.4s ease, opacity 0.4s ease, visibility 0.4s;
    }
`;

// 사이드 메뉴 영역
export const AsideMenu = styled.aside`
    //display: none;

    @media (max-width: 768px) {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 260px;
        background-color: #fff;
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
        z-index: 1050;
        transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(-20%)")};
        opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
        pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")}; // 닫혔을 땐 클릭 못 하게
        transition: transform 0.4s ease, opacity 0.4s ease, visibility 0.4s;
        display: flex;
        flex-direction: column;
        padding: 20px;
    }
`;

// 프로필/로그인 버튼 영역 감싸는 래퍼 (기존 HeaderRight 내용 그대로 이 안에 넣기)
export const AsideProfileWrap = styled.div`
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    border-bottom: 1px solid #eee;
    align-items: flex-start; // 내부 요소들 왼쪽 정렬

    // 프로필 이미지와 이름, 로그아웃 버튼을 포함하는 HeaderRight를 여기서 사용
    // HeaderRight의 모바일 스타일이 여기에 적용되도록 조정 필요
    ${HeaderRight} { // HeaderRight 컴포넌트에 직접 스타일 적용
        //flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        width: 100%;
        font-size: 1rem; // Aside 내부 폰트 크기 통일성 고려
    }

    ${ProfileImg} { // Aside 내부 프로필 이미지
        width: 48px;
        height: 48px;
        margin-bottom: 8px; // 이름과의 간격
    }

    span { // 사용자 이름 스타일
        font-weight: 600;
        white-space: nowrap;
        font-size: 1.1rem;
    }

    ${HeaderButton} { // Aside 내부 버튼들 (로그인, 회원가입, 로그아웃)
        width: 100%; // 버튼 너비 100%
        padding: 10px; // 버튼 패딩
        font-size: 1rem;
    }
`;

// NavPage 컴포넌트를 감싸는 스타일 (원래 NavPage 그대로 이 안에 넣기)
export const AsideNavWrap = styled.div`
    flex-grow: 1;
    //overflow-y: auto;
    padding: 15px 20px; // 네비게이션 영역 패딩

    nav { // NavPage 내부의 nav 태그에 적용
        display: flex;
        flex-direction: column;
        gap: 10px; // 네비게이션 아이템 간 간격

        // NavPage 내부의 Link 또는 button 스타일 조정 (예시)
        a, button {
            padding: 12px 0; // 위아래 패딩으로 높이감 부여
            font-size: 1rem;
            text-decoration: none;
            color: #333;
            border-radius: 4px;
            transition: background-color 0.2s;

            &:hover {
                background-color: #f0f0f0;
            }
        }
    }
`;

// 사이드 메뉴 닫기 버튼
export const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 28px;
    color: #888;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
        color: #333;
    }

    @media (min-width: 769px) {
        display: none; // PC에선 닫기 버튼 안 보이게
    }
`;




/*// 기존 HeaderRight는 데스크탑에서만 보이도록
export const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    @media (max-width: 767px) {
        display: none;
    }
`;*/

/*// 모바일에서도 재사용할 버튼 스타일
export const HeaderButton = styled.button`
    background-color: #409cff;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    white-space: nowrap;
`;*/

/*
// 프로필 이미지
export const ProfileImg = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
`;*/