import styled from "styled-components";

export const InputWrapper = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    width: 50%;
`;

export const StyledLabel = styled.label`
    font-size: 14px;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
`;

export const StyledInput = styled.input`
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;

    &:focus {
        border-color: #007bff;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
`;

export const StyledTextArea = styled.textarea`
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    min-height: 100px;

    &:focus {
        border-color: #007bff;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
`;

export const StyledSelect = styled.select`
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;

    &:focus {
        border-color: #007bff;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
`;

export const StyledFileInput = styled.input`
    padding: 8px 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
    cursor: pointer;

    &:focus {
        border-color: #007bff;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
`;

export const StyledError = styled.span`
    color: red;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    margin-bottom: 0;
`;


