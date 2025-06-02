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

export const UserIcon = styled(FiUser)`
    font-size: 2.1rem;
    color: #9dc1ff;

    @media (max-width: 767px) {
        font-size: 1.8rem;
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
