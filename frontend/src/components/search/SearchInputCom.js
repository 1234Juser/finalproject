import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const Wrapper = styled.div`
    position: relative;
    width: 350px; 
    margin-right: 10px;
    display: flex; 
    align-items: center; 
    border: 2px solid #007bff; 
    border-radius: 25px; 
    padding: 0 1em; 
    transition: all 0.3s ease-in-out; 

    &:focus-within { 
        border-color: #0056b3;
        box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
    }
`;

const Input = styled.input`
    flex-grow: 1; 
    border: none; 
    padding: 0.75em 0; 
    font-size: 1rem;
    color: #333;
    outline: none;
    background: none; 

    &::placeholder {
        color: #999;
    }
`;
const SearchIcon = styled(FaSearch)`
    color: #007bff; 
    margin-right: 0.5em; 
    font-size: 1.1rem;
    cursor: pointer;
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