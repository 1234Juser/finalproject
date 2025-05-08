import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    position: relative;
    width: 200px;
    margin-right: 10px;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75em;
    border: 1px solid #aaa;
    border-radius: 5px;
`;

export default function SearchInputCom({ value, onChange, onKeyDown, placeholder }) {
    return (
        <Wrapper>
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