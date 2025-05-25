import styled, {keyframes} from "styled-components";

// 플렉스 구조 : 왼쪽(로고) - 가운데(중앙 메뉴) - 오른쪽(유저 기능)
export const StyledNav = styled.nav`
        background: #fff;
        border-radius: 0;
        padding: 0 28px;
        margin-bottom: 22px;
        display: flex;
        align-items: center;
        height: 110px;      // 원하는 높이로(예시)
        min-height: 110px;  // 원하는 높이로(예시)
`;




// 가운데 메뉴(중앙 정렬)
export const NavCenter = styled.ul`
    flex: 1 1 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 34px;
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 1.08rem;
    li {
        a, span {
            display: block;
            padding: 7px 16px;
            border-radius: 10px;
            font-weight: 500;
            color: #111;
            background: none;
            text-decoration: none;
            transition: all 0.16s;
            cursor: pointer;
            &:hover {
                background: linear-gradient(90deg, #fdf6ff 0%, #d8edff 100%);
                color: #409cff;
            }
        }
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
        margin: 0;
        padding: 0;
        li {
                display: flex;
                align-items: center;    
                padding: 7px 14px;
                border-radius: 8px;
                font-weight: 500;
                color: #111;
                background: none;
                text-decoration: none;
                transition: all 0.16s;
            &:hover {
                background: linear-gradient(90deg, #f2f8fb 0%, #e0edfe 100%);
                color: #409cff;
            }
        }
        position: relative; /* ChatFloatingWrapper의 절대 위치 기준 */

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
    margin: 0;
    min-width: 150px; // 드롭다운 최소 너비
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
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
        position: absolute;
        top: 80%;
        right: 100px;
        width: 400px;
        z-index: 1000;
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

`
