import styled from 'styled-components';

export const RegisterContainer = styled.div`
    max-width: 480px;
    margin: 48px auto;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 3px 24px rgba(44,62,80,0.10);
    padding: 40px 32px;
`;

export const RegisterTitle = styled.h2`
    font-size: 1.7rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 36px;
    letter-spacing: 1px;
    color: #115391;
`;

export const Label = styled.label`
    display: block;
    font-weight: 500;
    margin-bottom: 6px;
    color: #333;
`;

export const Input = styled.input`
    width: 100%;
    height: 50px;
    border: 1.5px solid #abc6e2;
    border-radius: 10px;
    font-size: 1.12rem;
    padding: 0 16px;
    background: #f6fbff;
    box-sizing: border-box;
    transition: border 0.2s;

    &:focus {
        outline: none;
        border-color: #4798de;
        background: #e8f3fd;
    }
`;

export const Textarea = styled.textarea`
    width: 100%;
    min-height: 120px;
    height: 120px;
    border: 1.5px solid #abc6e2;
    border-radius: 10px;
    font-size: 1.12rem;
    padding: 16px;
    background: #f6fbff;
    box-sizing: border-box;
    resize: vertical;
    transition: border 0.2s;

    &:focus {
        outline: none;
        border-color: #4798de;
        background: #e8f3fd;
    }
`;

export const BtnRow = styled.div`
    display: flex;
    margin-top: 32px;
    justify-content: center;
    gap: 14px;
`;

export const MainBtn = styled.button`
    width: 120px;
    height: 48px;
    border-radius: 10px;
    border: none;
    font-weight: 600;
    font-size: 1.07rem;
    background: #2186d6;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(33,134,214,0.08);
    transition: background 0.2s;

    &:hover, &:focus {
        background: #156ab5;
    }
`;

export const CancelBtn = styled(MainBtn)`
    background: #e2eaf4;
    color: #1971b7;
    &:hover, &:focus {
        background: #d0daec;
    }
`;

export const FieldWrap = styled.div`
    margin-bottom: 25px;
`;