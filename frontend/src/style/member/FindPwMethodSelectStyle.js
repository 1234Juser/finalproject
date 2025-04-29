import styled from "styled-components";
import { FaUserClock, FaMobileAlt } from "react-icons/fa";

export const ModalWrap = styled.div`
  background: #fff;
  border-radius: 20px;
  max-width: 400px;
  width: 100%;
  padding: 36px 32px 28px 32px;
  box-shadow: 0 10px 28px rgba(62,103,201,0.18);
  box-sizing: border-box;
  position: relative;
  text-align: center;
`;

export const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 26px;
  color: #254974;
`;

export const MethodRow = styled.div`
  display: flex;
  gap: 18px;
  justify-content: center;
  margin-bottom: 26px;
`;

export const MethodBtn = styled.button`
  flex: 1 1 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  background: #f5f7fa;
  border: 2px solid #e7ecf3;
  border-radius: 12px;
  padding: 22px 7px 17px 7px;
  font-size: 1.08rem;
  color: #254974;
  cursor: pointer;
  font-weight: bold;
  box-shadow: none;
  transition: border 0.18s, box-shadow 0.18s;
  &:hover,
  &:focus {
    border: 2px solid #496af2;
    box-shadow: 0 3px 15px rgba(73, 106, 242, 0.09);
  }
`;

export const Icon1 = styled(FaUserClock)`
  color: #8fa5ff;
  font-size: 2.1rem;
`;

export const Icon2 = styled(FaMobileAlt)`
  color: #e9b84c;
  font-size: 2.1rem;
`;

export const CloseIconBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 22px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #a1a1a1;
  cursor: pointer;
  &:hover {
    color: #e64040;
  }
`;

export const BottomCloseBtn = styled.button`
    min-width: 280px;
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
