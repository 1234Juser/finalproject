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
        //flex-direction: column;
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
    gap: 34px; // 데스크톱 간격
    list-style: none;
    padding: 0; //  ul의 기본 padding 제거 (이전 코드에 margin: 0; padding: 0; 있었으나, 파일 버전에 따라 다를 수 있어 명시)
    margin: 0;  //  ul의 기본 margin 제거
    font-size: 1.08rem; // 데스크톱 폰트 크기

    li {
        a, span {
            display: flex; /* 변경: 아이콘과 텍스트의 정렬을 위해 flex로 변경 */
            align-items: center; /* 추가: 아이콘과 텍스트를 세로 중앙 정렬 */
            padding: 7px 16px; // 데스크톱 패딩
            border-radius: 10px;
            font-weight: 500;
            color: #111;
            text-decoration: none;
            transition: all 0.16s;
            cursor: pointer;
            white-space: nowrap; /* 추가: 메뉴 텍스트가 한 줄로 표시되도록 (예: '맞춤여행') */
            
            &:hover {
                background: linear-gradient(90deg, #fdf6ff 0%, #d8edff 100%);
                color: #409cff;
            }

            /* 아이콘에 대한 스타일은 NavCom.js에서 인라인으로 marginRight이 적용되어 있습니다.
              만약 여기서 제어하고 싶다면 아래와 같이 할 수 있습니다.
              svg { 
                margin-right: 6px;
              }
            */
        }
    }

    @media (max-width: 1023px) { // 태블릿
        gap: 20px; // 태블릿 간격
        font-size: 1rem; // 태블릿 폰트 크기
        li {
            a, span {
                padding: 6px 12px; // 태블릿 패딩
                // display: flex, align-items: center, white-space: nowrap 등은 상속받음
            }
        }
    }

    @media (max-width: 767px) { // 모바일
        order: 3; 
        width: 100%; 
        flex-wrap: wrap; 
        justify-content: end; 
        gap: 8px 10px; // 모바일 세로, 가로 간격
        font-size: 0.9rem; // 모바일 폰트 크기
        margin-top: 10px; 
        li {
            a, span {
                padding: 5px 8px; // 모바일 패딩
                border-radius: 8px;
                // white-space: nowrap;은 유지되어 각 항목 내에서는 줄바꿈 안 함
            }
        }
    }
`;


// 오른쪽 유저 메뉴
export const NavRight = styled.ul`
    flex: 0 0 auto; // 크기가 내용에 맞게 고정 (늘어나거나 줄어들지 않음)
    display: flex;
    justify-content: flex-end; // 항목들을 오른쪽으로 정렬
    align-items: center; // 항목들을 세로 중앙 정렬
    gap: 18px; // 데스크톱 항목 간 간격
    font-size: 1.07rem; // 데스크톱 폰트 크기
    list-style: none;
    margin: 0; // ul 기본 마진 제거
    padding: 0; // ul 기본 패딩 제거

    li {
        display: flex; // li 내부 요소(아이콘, 텍스트 또는 a태그)를 flex로 정렬
        align-items: center; // li 내부 요소들을 세로 중앙 정렬
        padding: 7px 14px; // li 자체의 패딩 (클릭 영역, 호버 영역 정의)
        border-radius: 8px;
        font-weight: 500;
        color: #111;
        transition: background 0.16s, color 0.16s;
        cursor: pointer; // li 전체가 클릭 가능한 것처럼 보이도록
        white-space: nowrap; // li 내부의 텍스트가 줄바꿈되지 않도록 (예: "관리자 마이페이지")

        &:hover {
            background: linear-gradient(90deg, #f2f8fb 0%, #e0edfe 100%);
            color: #409cff;
        }

        // li 내부의 a 태그 (또는 MyPageWrapper 내부의 a 태그)에 대한 스타일
        // MyPageWrapper는 div이므로, a 태그는 그 자식으로 들어감.
        // 이를 위해 MyPageWrapper 내부의 a도 함께 스타일링하거나,
        // MyPageWrapper 자체에 color, font-weight 등을 li와 유사하게 적용하고,
        // MyPageWrapper 내부의 a는 display:flex, align-items:center만 갖도록 할 수 있음.
        // 여기서는 li 내부에 있는 모든 a 태그 및 MyPageWrapper 내부의 a 태그를 포괄적으로 스타일링합니다.
        a, MyPageWrapper > a { // MyPageWrapper 직계 자식 a도 포함
            display: flex;
            align-items: center; // 아이콘과 텍스트를 세로 중앙 정렬
            text-decoration: none;
            color: inherit; // 부모 li의 색상을 상속 (호버 시 색상 변경 포함)
            font-weight: inherit; // 부모 li의 폰트 굵기 상속
            white-space: nowrap; // a 태그 내부 텍스트 줄바꿈 방지

            // 아이콘 스타일은 NavCom.js에서 인라인으로 marginRight이 적용되어 있음
            // 예: svg { margin-right: 6px; }
        }
    }
    // position: relative; // 이전 주석 참고하여 필요시 사용

    @media (max-width: 1023px) { // 태블릿
        gap: 12px; // 간격 줄임
        font-size: 1rem; // 폰트 크기 줄임
        li {
            padding: 6px 10px; // 패딩 줄임
        }
        display: block;
    }

    @media (max-width: 767px) { // 모바일
        order: 2; // HeaderCom.js의 레이아웃 순서에 따라 조정 (필요시)
        gap: 8px; // 간격 더 줄임
        font-size: 0.9rem; // 폰트 크기 더 줄임

        li {
            padding: 5px 8px; // 패딩 더 줄임

            // 모바일에서 텍스트 숨기기 (선택적 고급 기능)
            // 예시: 아이콘만 남기고 싶을 때 (NavCom.js 구조 변경과 함께 사용)
            // a > .nav-text-label { display: none; } 
            // li > .nav-text-label { display: none; } // '알림' 텍스트용

            // 아이콘만 표시할 경우, 아이콘의 오른쪽 마진 제거
            // a > svg { margin-right: 0 !important; }
            // li > svg { margin-right: 0 !important; } // '알림' 아이콘용
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
    /* gap: 6px; // MyPageWrapper > a 내부에서 아이콘과 텍스트 사이의 gap은 a 내부에서 처리하거나,
                   // a 내부 아이콘의 marginRight으로 처리하는 것이 더 일반적입니다.
                   // 현재 NavCom.js의 아이콘에 이미 marginRight이 있습니다. */
    color: inherit; /* li의 색상을 상속받도록 */
    font-weight: inherit; /* li의 폰트 굵기를 상속받도록 */
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
    position: fixed;
    background: white;
    overflow-y: auto;
    border: 1px solid #ccc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    border-radius: 12px;
    padding: 16px;
    transition: transform 0.3s ease-in-out;
    box-sizing: border-box;
    overflow-x: hidden;

    /* 기본 (PC) */
    top: 150px;
    right: 25%;
    width: 380px;
    height: 350px;

    /* 스크롤바 스타일 */
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

    /* ✅ 모바일: Bottom Sheet 스타일 */
    @media (max-width: 767px) {
        top: auto;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        height: 60vh;
        border-radius: 16px 16px 0 0;
        padding: 16px;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
    }

    /* ✅ 태블릿: 좀 더 넓은 중앙 정렬 스타일 */
    @media (min-width: 768px) and (max-width: 1023px) {
        top: 150px;
        right: auto;
        left: 50%;
        transform: translateX(-50%);
        width: 480px;
        height: 50vh;
        padding: 20px;
        box-sizing: border-box;
    }
`;
