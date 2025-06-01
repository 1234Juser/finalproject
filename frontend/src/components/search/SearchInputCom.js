import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const Wrapper = styled.div`
    position: relative;
    width: 100%; /* 고정 너비 350px에서 100%로 변경하여 부모 요소에 맞춤 */
    /* margin-right: 10px; // 부모 SearchContainer에서 gap으로 간격 조절하므로 제거 */
    display: flex;
    align-items: center;
    border: 2px solid #007bff;
    border-radius: 25px;
    padding: 0 1em; /* 내부 아이콘 및 입력창과의 좌우 여백 */
    transition: all 0.3s ease-in-out;
    box-sizing: border-box; // 패딩과 테두리를 너비에 포함

    &:focus-within {
        border-color: #0056b3;
        box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
    }

    @media (max-width: 767px) { // 모바일
        padding: 0 0.75em; // 모바일에서 내부 패딩 약간 줄임
        border-radius: 20px; // 모바일에서 모서리 둥글기 약간 줄임
    }
`;

const Input = styled.input`
    flex-grow: 1; // 사용 가능한 공간을 모두 차지
    border: none;
    padding: 0.75em 0; // 상하 패딩으로 높이 조절
    font-size: 1rem;
    color: #333;
    outline: none;
    background: none;
    min-width: 0; // input이 부모보다 작아질 수 있도록 허용

    &::placeholder {
        color: #999;
    }

    @media (max-width: 1024px) { // 1024px 이하 (태블릿 등)
        font-size: 0.9rem;
    }

    @media (max-width: 767px) { // 모바일
        font-size: 0.85rem;
        padding: 0.65em 0;
    }
`;

const SearchIcon = styled(FaSearch)`
    color: #007bff;
    margin-right: 0.5em; // 아이콘과 입력창 사이 간격
    font-size: 1.1rem;
    cursor: pointer;
    flex-shrink: 0; // 아이콘 크기 유지

    @media (max-width: 1024px) {
        font-size: 1rem;
    }
    @media (max-width: 767px) {
        font-size: 0.9rem;
        margin-right: 0.4em;
    }
`;



export default function SearchInputCom({ value, onChange, onKeyDown, onIconClick, placeholder }) {
    return (
        <Wrapper>
            <SearchIcon onClick={onIconClick} />

            <Input
                type="text"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown} // onKeyDown 프롭 추가
                placeholder={placeholder}
                autoComplete="off"
            />
        </Wrapper>
    );
}