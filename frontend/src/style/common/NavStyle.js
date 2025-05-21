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
            a {
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
        }
        position: relative; /* ChatFloatingWrapper의 절대 위치 기준 */

`;

// 마이페이지 오른쪽 아이콘 및 텍스트 묶음용 스타일 컴포넌트
export const MyPageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  position: relative; /* ChatFloatingWrapper의 절대 위치 기준 */

`;

const slideDownFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;


export const NavContentWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;


// 채팅 창을 담는 컨테이너 스타일 (절대 위치를 사용하여 MdChat 바로 아래에 위치)
export const ChatFloatingWrapper = styled.div`
        position: absolute;
        top: 80%;
        right: 100px;
        width: 400px;
        background: white;
        border: 1px solid #ccc;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        z-index: 1000;
`;

