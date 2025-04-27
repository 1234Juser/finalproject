import styled from "styled-components";

// 프로필 단순 이미지 크기 스타일
const ProfileImg = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 8px;
`;

const StyledHeader = styled.header`
    display: flex; /* 자식 요소들을 수평으로 정렬 */
    align-items: center; /* 세로 정렬 */
    justify-content: space-between; /* 양 끝으로 정렬 */
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
`;

const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-left: auto;
`;

const StyledTitle = styled.h1`
    margin-right: auto;
    .link { color : black; }
    .link:hover {color : gray;}
`;


export {ProfileImg, StyledHeader, HeaderRight, StyledTitle}