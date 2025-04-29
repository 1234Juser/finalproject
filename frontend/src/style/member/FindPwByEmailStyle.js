import styled from "styled-components";
import { FaKey, FaEnvelope, FaUserAlt, FaIdBadge } from "react-icons/fa";



export const PwModalBox = styled.div`
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 10px 28px rgba(62,103,201,0.18);
    max-width: 390px;
    width: 100%;
    margin: 32px auto;
    padding: 42px 32px 30px 32px;
    box-sizing: border-box;
    text-align: center;
    position: relative;
`;

export const PwTitle = styled.h2`
    color: #254974;
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
`;

export const PwDesc = styled.div`
    color: #598ad8;
    font-size: 1.07rem;
    margin-bottom: 26px;
`;

export const PwForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 13px;
    margin-top: 6px;
`;

export const PwInputRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f5f7fa;
    border-radius: 8px;
    padding: 8px 14px;
    border: 1.5px solid #e7ecf3;
    transition: border 0.15s;
    &:focus-within {
        border: 1.5px solid #4678fa;
        background: #f0f6ff;
    }
`;

export const PwInput = styled.input`
    background: transparent;
    border: none;
    outline: none;
    flex: 1;
    font-size: 1rem;
    padding: 6px 0;
`;

export const PwSubmit = styled.button`
    width: 100%;
    padding: 12px;
    background: #496af2;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1.08rem;
    font-weight: bold;
    margin-top: 8px;
    margin-bottom: 0;
    cursor: pointer;
    &:hover {
        background: #3359cd;
    }
    &:disabled {
        background: #ced8ec;
        color: #868e96;
        cursor: not-allowed;
        box-shadow: none;
    }
`;


export const PwResult = styled.div`
    margin: 19px 0 0 0;
    color: #20c997;
    font-weight: bold;
    font-size: 1.03rem;
`;

export const PwError = styled.div`
    margin-top: 5px;
    color: #f44336;
    font-size: 0.98rem;
    font-weight: 500;
`;

export const PwClose = styled.button`
    position: absolute;
    right: 22px;
    top: 18px;
    border: none;
    background: transparent;
    color: #92a0b6;
    font-size: 1.5em;
    cursor: pointer;
    transition: color 0.14s;
    &:hover { color: #e64040; }
`;

export const PwLabelIconUser = styled(FaUserAlt)`
  color: #a4bdfc;
  font-size: 1.18em;
`;
export const PwLabelIconId = styled(FaIdBadge)`
  color: #a4bdfc;
  font-size: 1.13em;
`;
export const PwLabelIconMail = styled(FaEnvelope)`
  color: #a4bdfc;
  font-size: 1.13em;
`;
export const PwLabelIconKey = styled(FaKey)`
  color: #4678fa;
  font-size: 1.35em;
  margin-bottom: -2px;
  margin-right: 1px;
`;

export const PwCloseBtn = styled.button`
  padding: 11px;
  background: #fff;
  color: #4d6fff;
  font-weight: bold;
  border: 1px solid #4d6fff;
  border-radius: 5px;
  font-size: 1rem;
  margin-top: 0.5px;
  cursor: pointer;
`;
