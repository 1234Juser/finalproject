import styled from "styled-components";

export const Wrapper = styled.div`
    min-height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 220px;
`;

export const FormBox = styled.form`
    min-width: 340px;
    width: 380px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.04);
    padding: 32px 32px 24px 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const FormRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2px;
    position: relative;
`;

export const InputGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 3px;
    position: relative;
`;

export const EyeButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
    position: absolute;
    right: 8px;
    top: 7px;
    padding: 0 3px;
`;

export const Label = styled.label`
    font-size: 1rem;
    margin-bottom: 3px;
    color: #333;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1.2px solid #aaa;
    font-size: 1rem;
    box-sizing: border-box;
    &:focus {
        outline: none;
        border: 1.2px solid #496AF2;
    }
`;

export const InlineButton = styled.button`
    margin-left: 6px;
    background: #496af2;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 0.97rem;
    padding: 8px 14px;
    cursor: pointer;
    white-space: nowrap;
    &:disabled {
        background: #b2b8c6;
        cursor: not-allowed;
    }
`;

export const Button = styled.button`
    width: 100%;
    margin-top: 10px;
    background: #496af2;
    color: #fff;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    font-size: 1.08rem;
    padding: 12px;
    cursor: pointer;
    &:disabled {
        background: #b2b8c6;
        cursor: not-allowed;
    }
`;

export const Message = styled.div`
    font-size: 0.93rem;
    margin-top: 4px;
    margin-bottom: 4px;
    text-align: center;
`;

export const ErrorMsg = styled(Message)`
    color: #d81b60;
`;

export const SuccessMsg = styled(Message)`
    color: #258a23;
`;

export const TermsBox = styled.div`
    font-size: 0.95rem;
    background: #f9f9fb;
    border: 1px solid #ececec;
    border-radius: 6px;
    padding: 16px 12px;
    margin-bottom: 8px;
    color: #444;
`;

export const TermsLabel = styled.label`
    margin-top: 3px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 1.01rem;
    user-select: none;
`;

export const TermsError = styled.div`
  font-size: 0.93rem;
  color: #d81b60;
  margin-top: -4px;
  margin-bottom: 4px;
`;

export const Title = styled.h2`
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
`;
