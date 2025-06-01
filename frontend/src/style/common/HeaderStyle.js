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
        height: 60px;
        padding: 0 16px;
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
        font-size: 1.8rem; // 태블릿에서 사용했던 폰트 크기 적용
        white-space: normal; // 텍스트 줄바꿈 허용
        line-height: 1.2; // 줄 간격 조절 (필요시)
    }

    @media (max-width: 767px) { // 모바일
        font-size: 1.5rem; // "Hello, " 부분을 숨기거나 전체 텍스트를 줄여야 할 수 있음
        // 여기서는 폰트 크기만 조정
    }
`;

// 새로 추가된 검색 컨테이너 스타일
export const SearchContainer = styled.div`
    flex: 1; // StyledHeader 내에서 기본적으로 가능한 많은 공간을 차지하도록 함
    display: flex;
    align-items: center;
    // justify-content: center; // 자식 요소의 flex-grow로 인해 재조정될 수 있으므로, 필요에 따라 flex-start 또는 space-between 등으로 변경
    min-width: 0; // 컨테이너가 내용물보다 작아질 수 있도록 허용
    padding: 0 20px; // 데스크톱 기본 좌우 패딩
    gap: 12px; // SearchInputPage와 RealtimeRanking 사이의 간격 (데스크톱)

    // SearchInputPage (첫 번째 자식) 스타일링
    & > :first-child {
        flex-grow: 1;   // SearchContainer 내에서 남는 공간을 모두 차지
        flex-shrink: 1; // 공간이 부족할 때 줄어들도록 허용
        min-width: 120px; // 검색창의 최소 너비 (예: 데스크톱에서는 최소 이 정도는 확보)
        // 이 값은 실제 SearchInputPage 내부 input의 사용성을 고려하여 조절해주세요.
    }

    // RealtimeRanking (두 번째 자식) 스타일링
    & > :last-child {
        flex-grow: 0;   // 추가 공간을 차지하지 않음
        flex-shrink: 0; // 공간이 부족해도 줄어들지 않고 자신의 컨텐츠 너비를 유지
    }

    @media (max-width: 1024px) { // 1024px 이하 화면 (작은 데스크톱 및 태블릿 시작점)
        padding: 0 15px; // 내부 패딩 약간 줄임
        gap: 10px; // 자식 요소 간 간격 약간 줄임

        & > :first-child { // SearchInputPage
            min-width: 100px; // 화면이 줄어듦에 따라 검색창 최소 너비도 약간 줄임
        }
        // RealtimeRanking은 숨기지 않고 계속 표시됩니다.
    }

    @media (max-width: 767px) { // 모바일
        //flex-grow: 0.5; // SearchContainer 자체가 헤더 내에서 차지하는 비율을 줄일 수 있음
        //justify-content: flex-start; // 모바일에서는 검색 관련 요소들을 왼쪽으로 정렬
        padding: 0 10px; // 모바일 내부 패딩
        gap: 8px; // 자식 요소 간 간격 더 줄임

        & > :first-child { // SearchInputPage
            min-width: 80px; // 모바일에서 검색창 최소 너비
        }
        // 모바일에서도 RealtimeRanking은 일단 표시됩니다.
        // 만약 모바일에서 공간이 너무 부족하다면, 이때 RealtimeRanking을 숨기는 것을 다시 고려할 수 있습니다.
        // 예: & > :last-child { display: none; }
    }
`;



export const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 1.07rem;

    @media (max-width: 1023px) { // 태블릿
        gap: 12px;
        font-size: 1rem;
    }

    @media (max-width: 767px) { // 모바일
        gap: 8px;
        font-size: 0.9rem; // 전체적인 폰트 크기 줄임

        // 모바일에서 사용자 이름 텍스트 숨기기 (옵션)
        // & > span { display: none; }
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
        font-weight: 500;
    }
`;
