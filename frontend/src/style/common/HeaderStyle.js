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
`;

export const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 1.07rem;
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
`;

export const UserIcon = styled(FiUser)`
    font-size: 2.1rem;
    color: #9dc1ff;
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
`;
