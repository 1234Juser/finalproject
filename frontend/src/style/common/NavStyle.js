import styled from "styled-components";
import { RiChatSmile2Line } from "react-icons/ri";


// 전체 컨텐츠를 감싸는 래퍼(비디오 위에 올라옴)
export const NavContentWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    align-items: center;

    justify-content: space-between; // 로고(가상) - NavCenter - NavRight 간 정렬

    @media (max-width: 767px) { // 모바일
        flex-wrap: wrap; // NavCenter와 NavRight가 다음 줄로 넘어갈 수 있도록
    }
`;

// 브라우저 우측 하단에 고정될 스타일 정의
export const FloatingChatButton = styled(RiChatSmile2Line)`
    position: fixed;
    bottom: 80px;
    right: 80px;
    width: 60px;
    height: 60px;
    padding: 12px;
    box-sizing: border-box;

    color: #409cff;
    background: #ffffff;
    border-radius: 50%; /* 원형 버튼 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* 그림자 */

    cursor: pointer;
    z-index: 1000;
    transition: all 0.3s ease;

    &:hover {
        background: #409cff;
        color: #fff;
        transform: translateY(-4px); /* 살짝 뜨는 애니메이션 */
        box-shadow: 0 8px 16px rgba(64, 156, 255, 0.4); /* 더 강한 그림자 */
    }

    &:active {
        transform: scale(0.95); /* 클릭 시 눌리는 효과 */
    }

    @media (max-width: 767px) { // 모바일
        width: 50px;
        height: 50px;
        padding: 10px;
        bottom: 20px;
        right: 20px;
    }
`;



// 플렉스 구조 : 왼쪽(로고) - 가운데(중앙 메뉴) - 오른쪽(유저 기능)
export const StyledNav = styled.nav`
        background: #fff;
        padding: 0 28px;
        margin-bottom: 22px;
        display: flex;
        align-items: center;
        height: 110px;      // 원하는 높이로(예시)
        min-height: 110px;  // 원하는 높이로(예시)

    @media (max-width: 1023px) { // 태블릿
        height: 90px;
        min-height: 90px;
        padding: 0 20px;
    }
    @media (max-width: 767px) { // 모바일
        height: auto; // 내용에 따라 자동 조절
        min-height: 70px;
        padding: 10px 15px; // 상하 패딩 추가
        flex-wrap: wrap; // 로고-메뉴-유저메뉴가 공간 부족 시 다음 줄로
        justify-content: space-between; // 로고와 오른쪽 메뉴 양쪽 정렬
        margin-bottom: 15px;
    }
`;




// 가운데 메뉴(중앙 정렬)
export const NavCenter = styled.ul`
    flex: 1 1 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 34px;
    list-style: none;
    font-size: 1.08rem;
    li {
        a, span {
            display: block;
            padding: 7px 16px;
            border-radius: 10px;
            font-weight: 500;
            color: #111;
            text-decoration: none;
            transition: all 0.16s;
            cursor: pointer;
            &:hover {
                background: linear-gradient(90deg, #fdf6ff 0%, #d8edff 100%);
                color: #409cff;
            }
        }
    }

    @media (max-width: 1023px) { // 태블릿
        gap: 20px;
        font-size: 1rem;
        li {
            a, span {
                padding: 6px 12px;
            }
        }
    }
    @media (max-width: 767px) { // 모바일
        order: 3; // 로고, NavRight 다음으로 배치 (햄버거 메뉴 없을 시)
        width: 100%; // 전체 너비 사용
        flex-wrap: wrap; // 메뉴 항목들이 여러 줄로 표시될 수 있도록
        justify-content: space-around; // 항목들을 공간에 고르게 분배
        gap: 8px 10px; // 세로, 가로 간격
        font-size: 0.9rem;
        margin-top: 10px; // NavRight와의 간격
        li {
            a, span {
                padding: 5px 8px;
                border-radius: 8px;
            }
        }
        // 예시: 모바일에서 '더보기' 외 메뉴 개수 제한
        // li:not(:last-child):nth-child(n+4) {
        //   display: none; // 4번째 항목부터 숨김 (더보기 제외)
        // }
    }
`;

// 오른쪽 유저 메뉴
export const NavRight = styled.ul`
        flex: 0 0 auto;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 18px;
        font-size: 1.07rem;
        list-style: none;
        li {
                display: flex;
                align-items: center;    
                padding: 7px 14px;
                border-radius: 8px;
                font-weight: 500;
                color: #111;
                text-decoration: none;
                transition: all 0.16s;
            &:hover {
                background: linear-gradient(90deg, #f2f8fb 0%, #e0edfe 100%);
                color: #409cff;
            }
        }
        position: relative; /* ChatFloatingWrapper의 절대 위치 기준 */

    @media (max-width: 1023px) { // 태블릿
        gap: 12px;
        font-size: 1rem;
        li {
            padding: 6px 10px;
        }
    }
    @media (max-width: 767px) { // 모바일
        order: 2; // 로고 다음에 배치
        gap: 8px;
        font-size: 0.9rem;
        // 아이콘만 표시하고 싶을 경우, text 숨김 처리 필요
        li {
            padding: 5px 8px;
            // 예시: 텍스트 숨기고 아이콘만 (별도 클래스나 컴포넌트 구조 변경 필요)
            // span.text-label { display: none; }
        }
    }

`;

// 드롭다운 메뉴 스타일
export const DropdownMenu = styled.ul`
    position: absolute;
    top: 100%; // "더보기" 메뉴 아래에 위치
    left: 0;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 8px;
    list-style: none;
    padding: 10px 0;
    min-width: 150px; // 드롭다운 최소 너비
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 10;
    display: none; // 기본적으로 숨김

    li {
        padding: 0;
        margin: 0;
        a {
            padding: 10px 20px;
            color: #333;
            text-decoration: none;
            display: block;
            &:hover {
                background-color: #f1f1f1;
                color: #409cff;
            }
        }
    }

    @media (max-width: 767px) { // 모바일
        min-width: 130px;
        li a {
            font-size: 0.9rem;
            padding: 8px 15px;
        }
    }
`;

// "더보기" 메뉴 hover 시 드롭다운 표시
export const DropdownContainer = styled.li`
    position: relative;
    &:hover ${DropdownMenu} {
        display: block;
    }
`;
// 마이페이지 오른쪽 아이콘 및 텍스트 묶음용 스타일 컴포넌트
export const MyPageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  position: relative; /* ChatFloatingWrapper의 절대 위치 기준 */

`;


// 채팅 창을 담는 컨테이너 스타일 (절대 위치를 사용하여 MdChat 바로 아래에 위치)
export const ChatFloatingWrapper = styled.div`
    position: fixed;
    bottom: 150px;
    right: 80px;
    width: 400px;
    max-height: 600px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1001;

    /* 애니메이션 효과 */
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.3s ease forwards;

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 767px) { // 모바일
        width: 90%;
        max-width: 360px; // 너무 커지지 않게
        max-height: 80vh; // 화면 높이의 80%
        // 위치는 NavCon.js에서 화면 중앙 하단 등으로 조정 필요
        // bottom: 70px; // FloatingChatButton 위에 위치하도록 (예시)
        // left: 50%;
        // transform: translateX(-50%) translateY(20px); // 중앙 정렬
        // @keyframes fadeInUp {
        //     to {
        //         opacity: 1;
        //         transform: translateX(-50%) translateY(0);
        //     }
        // }
    }
`;


export const NotificationWrapper = styled.div`
    position: absolute;
    //top: 80%;
    top: 150px; /* 알림 아이콘 바로 아래에 위치하도록 조정 */
    right: 25%;
    width: 380px;
    height: 350px;
    background: white;
    overflow-y: auto;
    border: 1px solid #ccc;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    z-index: 1000;
    border-radius: 8px; /* 모서리 라운딩 추가 */
    padding: 10px; /* 내부 여백 추가 */

    /* 스크롤바 스타일 (선택 사항) */
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background: #ddd;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #ccc;
    }

    @media (max-width: 767px) { // 모바일
        width: 90vw; // 화면 너비의 90%
        max-width: 320px;
        max-height: 300px;
        // right: 50%; // 중앙으로 옮기려면 추가 조정 필요
        // transform: translateX(50%);
        top: calc(100% + 5px);
    }

`
