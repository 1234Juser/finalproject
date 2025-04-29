import styled from "styled-components";
import { FaUserAlt, FaIdBadge, FaEnvelope } from "react-icons/fa";

// 폼 컨테이너
export const FindIdFormContainer = styled.div`
    width: 330px;
    background: #fff;
    padding: 24px 28px;
    border-radius: 12px;
    box-shadow: 0 6px 32px rgba(0,0,0,0.07);
`;

// 타이틀
export const FindIdTitle = styled.h2`
    margin-bottom: 16px;
    font-size: 1.25rem;
    font-weight: bold;
    text-align: center;
    color: #30418c;
    letter-spacing: -1px;
`;

// 폼
export const FindIdForm = styled.form`
    display: flex;
    flex-direction: column;
`;

export const FindIdInputBox = styled.div`
    margin: 16px 0;
    display: flex;
    flex-direction: column;
`;

export const FindIdLabelBox = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
`;

export const FindIdLabelIconUser = styled(FaUserAlt)`
  color: #a4bdfc;
  font-size: 1.18em;
`;
export const FindIdLabelIconId = styled(FaIdBadge)`
  color: #a4bdfc;
  font-size: 1.13em;
`;
export const FindIdLabelIconMail = styled(FaEnvelope)`
  color: #a4bdfc;
  font-size: 1.13em;
`;
// -------------------------------------------------------------------- //

export const FindIdLabel = styled.label`
    font-weight: bold;
`;

export const FindIdInput = styled.input`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
`;

export const ErrorMsg = styled.div`
    color: red;
    margin-bottom: 12px;
    text-align: center;
`;

export const FindIdButton = styled.button`
    width: 100%;
    padding: 12px;
    background: #496af2;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1.08rem;
    font-weight: bold;
    margin-top: 8px;
    cursor: pointer;
    &:disabled {
        background: #ced8ec;
        cursor: not-allowed;
    }
`;

export const ResultBox = styled.div`
    margin-top: 19px;
    padding: 13px 0;
    background: #f6f8ff;
    border-radius: 7px;
    font-weight: bold;
    color: #27419c;
    text-align: center;
    font-size: 1.07rem;
`;

export const FindIdRelativeContainer = styled(FindIdFormContainer)`
    position: relative;
`;

// X 버튼
export const FindIdCloseIconBtn = styled.button`
    position: absolute;
    top: 18px;
    right: 22px;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    color: #a1a1a1;
    cursor: pointer;
    &:hover {
        color: #e82b51;
    }
`;

export const FindIdCloseBtn = styled.button`
    padding: 11px;
    background: #fff;
    color: #4d6fff;
    font-weight: bold;
    border: 1px solid #4d6fff;
    border-radius: 5px;
    font-size: 1rem;
    margin-top: 10px;
    cursor: pointer;
`;