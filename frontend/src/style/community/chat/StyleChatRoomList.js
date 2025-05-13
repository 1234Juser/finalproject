import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 24px;
  color: #333;
  text-align: center;
`;

export const RoomList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
`;

export const RoomItem = styled.li`
  background-color: white;
  padding: 14px 20px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e6f7ff;
  }
`;

export const CreateButton = styled.button`
  display: block;
  width: 140px;
  margin: 0 auto;
  padding: 12px 0;
  background-color: #007bff;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgb(0 123 255 / 0.4);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

// 모달 배경
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 1000;
`;

// 모달 본체
export const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 30px;
  background: white;
  border-radius: 16px;
  transform: translate(-50%, -50%);
  z-index: 1001;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
`;

export const ModalHeader = styled.h3`
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  font-size: 1rem;
  margin-bottom: 25px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  flex: 1;
  padding: 12px 0;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 24px;
  cursor: pointer;

  &:first-child {
    margin-right: 10px;
    background-color: #007bff;
    color: white;

    &:hover {
      background-color: #0056b3;
    }
  }

  &:last-child {
    background-color: #ccc;
    color: #444;

    &:hover {
      background-color: #999;
    }
  }
`;

export const ErrorMessage = styled.div`
  color: #d32f2f;  /* 선명한 빨간색 */
  font-size: 0.875rem;  /* 약간 작은 글씨 크기 */
  margin-top: 4px;
  margin-bottom: 8px;
  font-weight: 500;
`;
