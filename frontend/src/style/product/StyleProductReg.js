import styled from "styled-components";


// 제목 스타일(h1)
export const StyledTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  text-align: left;
  margin: 20px 0;
  text-transform: capitalize; /* 텍스트의 첫 글자 대문자 처리 */
  letter-spacing: 1px; /* 글자 간격 조절 */
`;

// 구분선 스타일(hr)
export const StyledDivider = styled.hr`
    margin: 20px 0;
    border: none;
    border-top: 1px solid #7e7e7e; 
    width: 80%; /* 구분선 너비 설정 */
    opacity: 0.7; /* 약간의 투명도 */
`;


export const InputWrapper = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    width: 50%;
`;

export const StyledLabel = styled.label`
    font-size: 18px;
    font-weight: normal;
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
    box-sizing: border-box; /* 패딩과 보더가 width/height에 포함되도록 */
    height: 65px;
    resize: none;

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

// 기존 StyledFileInput 숨기기
export const HiddenFileInput = styled.input`
  display: none;
`;

// 파일 선택용 라벨을 버튼처럼 꾸미기
export const FileSelectButton = styled.label`
  display: inline-block;
  padding: 8px 16px;
  font-size: 14px;
  //background-color: #2196f3;
  //color: white;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1976d2;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(25, 118, 210, 0.7);
  }
`;




export const StyledError = styled.span`
    color: red;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    margin-bottom: 0;
`;


// 버튼 공통 스타일
const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(100, 150, 250, 0.6);
  }
`;

// 상품 등록 버튼 스타일 (초록색 계열)
export const RegisterButton = styled(Button)`
  background-color: #4caf50;
  color: white;

  &:hover {
    background-color: #45a049;
  }
`;

// 상품 수정 버튼 스타일 (파란색 계열)
export const EditButton = styled(Button)`
  background-color: #2196f3;
  color: white;

  &:hover {
    background-color: #1976d2;
  }
`;

// 목록으로 버튼 스타일 (회색 계열)
export const ListButton = styled(Button)`
  background-color: #9e9e9e;
  color: white;

  &:hover {
    background-color: #757575;
  }
`;