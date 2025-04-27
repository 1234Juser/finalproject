import styled from "styled-components";

export const LoginFormContainer = styled.div`
  max-width: 340px;
  margin: 48px auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 10px;
  background: #fff;
`;

export const Form = styled.form``;

export const FormItem = styled.div`
  margin: 16px 0;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 6px;
  font-weight: bold;
`;

export const Input = styled.input`
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
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
    background: #496af2;
    color: #fff;
  border: none;
    border-radius: 5px; /* RegisterStyle 버튼과 동일하게 5px로 변경 */
    font-size: 1.08rem; /* RegisterStyle 버튼과 맞춤 */

    font-weight: bold;
  margin-top: 8px;
    cursor: pointer;

`;