import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Palette = {
    mainGradient: "linear-gradient(95deg, #36abc9 0%, #198dbb 100%)",
    blue: "#198dbb",
    blueLight: "#36abc9",
    borderGray: "#e4e9f1",
    shadow: "0 2px 18px 0 rgba(30,70,160,0.09)",
    cardShadow: "0 4px 16px 0 rgba(30,70,160,0.13)",
    bg: "#f4f8fd",
    text: "#273a69",
    subText: "#6a87a9",
    white: "#fff",
    tabShadow: "0 2px 8px #92c7eb55"
};

export const Container = styled.div`
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
`;


export const PageTitle = styled.h1` 
    text-align: center;
    margin-bottom: 30px;
    color: ${Palette.text};
`;

export const CompanionTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    box-shadow: ${Palette.shadow};
    border-radius: 8px;
    overflow: hidden; // border-radius 적용을 위해

    th, td {
        border: 1px solid ${Palette.borderGray};
        padding: 12px 15px; // 패딩 조정
        text-align: left;
        color: ${Palette.text};
    }

    th {
        background-color: ${Palette.bg};
        text-align: center;
        font-weight: 600; // 헤더 폰트 두께
        color: ${Palette.text};
    }

    tbody tr {
        background-color: ${Palette.white};
        transition: background-color 0.2s;
    }

    tbody tr:hover {
        background-color: #f0f6ff; // 호버 시 배경색 변경
        cursor: pointer;
    }

    td img { // 프로필 이미지 스타일 추가
        border: 1px solid ${Palette.borderGray};
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
`;

export const StyledLink = styled(Link)`
    padding: 10px 22px; // 패딩 조정
    background: ${Palette.mainGradient};
    color: white;
    text-decoration: none;
    border-radius: 8px; // 모서리 둥글게
    font-weight: 600;
    transition: background 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(54, 171, 201, 0.3);

    &:hover {
        background: linear-gradient(90deg, ${Palette.blue}, ${Palette.blueLight});
        box-shadow: 0 4px 12px rgba(54, 171, 201, 0.4);
    }
`;

// 페이징 (EventListStyle.js와 동일한 스타일 사용 가능, 또는 별도 유지)
export const PagingWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 38px;
    gap: 10px;
`;

export const PagingButton = styled.button`
    background: ${({active}) => (active ? Palette.mainGradient : "#f2f6f9")};
    color: ${({active}) => (active ? "#fff" : Palette.blue)};
    font-weight: ${({active}) => (active ? 600 : 500)};
    font-size: 1.01rem;
    border: none;
    border-radius: 8px;
    padding: 8px 20px;
    cursor: pointer;
    transition: background 0.18s, color 0.18s;
    box-shadow: ${({active}) => (active ? Palette.tabShadow : "none")};
    letter-spacing: -0.5px;
    &:hover {
        background: ${Palette.mainGradient};
        color: #fff;
    }
    &:disabled {
        opacity: .5;
        cursor: not-allowed;
    }
`;

