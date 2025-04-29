import styled from "styled-components";

// 폼 컨테이너(남김)
export const FindIdFormContainer = styled.div`
    width: 330px;
    background: #fff;
    padding: 24px 28px;
    border-radius: 12px;
    box-shadow: 0 6px 32px rgba(0,0,0,0.07);
`;

// 타이틀(변경X)
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

// 입력 박스 (LoginStyle FormItem과 max한 스타일 맞춤)
export const FindIdInputBox = styled.div`
    margin: 16px 0;
    display: flex;
    flex-direction: column;
`;

// 라벨 (LoginStyle Label 참고)
export const FindIdLabel = styled.label`
    margin-bottom: 6px;
    font-weight: bold;
`;

// 인풋 (LoginStyle Input 참고)
export const FindIdInput = styled.input`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
`;

// 에러 메시지 (LoginStyle ErrorMsg 참고)
export const ErrorMsg = styled.div`
    color: red;
    margin-bottom: 12px;
    text-align: center;
`;

// 아이디 찾기 버튼 (LoginStyle Button 참고)
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

// 결과 박스, 기타는 기존 유지
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

// 상대 컨테이너(변경X)
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

// 닫기 버튼 (기존 스타일 살림)
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