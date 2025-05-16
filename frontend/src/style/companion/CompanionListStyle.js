import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

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

export const SearchContainer = styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

// 검색 관련 요소들을 감싸는 컨테이너 추가
export const SearchInputContainer = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1; // 등록 버튼을 제외한 나머지 공간 차지
    margin-right: 10px; // 등록 버튼과의 간격
`;

export const SearchForm = styled.form`
    display: flex;
    align-items: center;
    max-width: 350px;
    width: 100%;
    border: 2px solid #007bff;
    border-radius: 25px;
    padding: 0 1em;
    transition: all 0.3s ease-in-out;
    background-color: ${Palette.white};

    &:focus-within {
        border-color: #007bff;
        box-shadow: 0 0 8px rgba(54, 171, 201, 0.2);
    }
`;

export const SearchInput = styled.input`
    flex-grow: 1;
    border: none;
    padding: 0.75em 0.5em;
    font-size: 1rem;
    color: #333;
    outline: none;
    background: none;

    &::placeholder {
        color: ${Palette.subText};
    }
`;

export const StyledFaSearch = styled(FaSearch)`
    color: #007bff;
    margin-right: 0.5em;
    font-size: 1.1rem;
    cursor: pointer;
`;

// 검색 기준 컨테이너 스타일 수정
export const SearchOptionsContainer = styled.div`
    position: relative; // 드롭다운 메뉴를 위한 position 설정
    display: flex;
    align-items: center;
    margin-left: 10px;
`;

// 기존 ToggleButton 스타일은 유지하거나 필요시 수정
export const ToggleButton = styled.button`
    padding: 0.5em 0.8em;
    background-color: ${Palette.blueLight};
    color: ${Palette.white};
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: background-color 0.3s;
    min-width: 70px; // 버튼 최소 너비 설정

    &:hover {
        background-color: ${Palette.blue};
    }
`;

// 드롭다운 메뉴 스타일 추가
export const DropdownMenu = styled.div`
    position: absolute;
    top: 100%; // 버튼 바로 아래에 위치
    left: 0;
    background-color: ${Palette.white};
    border: 1px solid ${Palette.borderGray};
    border-radius: 8px;
    box-shadow: ${Palette.shadow};
    z-index: 10;
    margin-top: 5px; // 버튼과의 간격
    width: 100%; // 버튼 너비에 맞춤
`;

export const DropdownItem = styled.div`
    padding: 10px 15px;
    cursor: pointer;
    font-size: 0.9rem;
    color: ${Palette.text};

    &:hover {
        background-color: ${Palette.bg};
    }

    &:not(:last-child) {
        border-bottom: 1px solid ${Palette.borderGray};
    }
`;

// SearchTypeText는 더 이상 사용하지 않으므로 주석 처리 또는 삭제 가능
// export const SearchTypeText = styled.span`
//     font-size: 0.9rem;
//     color: ${Palette.subText};
//     margin-right: 8px;
// `;


export const CompanionTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    box-shadow: ${Palette.shadow};
    border-radius: 8px;
    overflow: hidden;

    th, td {
        border: 1px solid ${Palette.borderGray};
        padding: 12px 15px;
        text-align: left;
        color: ${Palette.text};
    }

    th {
        background-color: ${Palette.bg};
        text-align: center;
        font-weight: 600;
        color: ${Palette.text};
    }

    tbody tr {
        background-color: ${Palette.white};
        transition: background-color 0.2s;
    }

    tbody tr:hover {
        background-color: #f0f6ff;
        cursor: pointer;
    }

    td img {
        border: 1px solid ${Palette.borderGray};
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const StyledLink = styled(Link)`
    padding: 10px 22px;
    background: ${Palette.mainGradient};
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: background 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(54, 171, 201, 0.3);

    &:hover {
        background: linear-gradient(90deg, ${Palette.blue}, ${Palette.blueLight});
        box-shadow: 0 4px 12px rgba(54, 171, 201, 0.4);
    }
`;

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