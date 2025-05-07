import styled from "styled-components";

// 플렉스 구조 : 왼쪽(로고) - 가운데(중앙 메뉴) - 오른쪽(유저 기능)
export const StyledNav = styled.nav`
    background: #fff;
    border-radius: 0;
    padding: 0 28px;
    margin-bottom: 22px;
    display: flex;
    align-items: center;
    height: 70px;
    min-height: 70px;
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
                display: block;
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
        `;