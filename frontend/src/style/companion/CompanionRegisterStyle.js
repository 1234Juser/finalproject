import styled from "styled-components";

export const FormWrapper = styled.div`
    max-width: 580px;
    min-height: 600px; /* 전체 폼의 최소 높이를 더 크게 설정 */
    margin: 70px auto 0 auto;
    background: #f9fcfe;
    border-radius: 18px;
    box-shadow: 0 4px 24px rgba(25,102,163,0.10);
    padding: 40px 36px 32px 36px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.h2`
    font-size: 2.1rem;
    font-weight: 800;
    color: #1486ba;
    margin-bottom: 38px;
    letter-spacing: 1.5px;
    text-align: center;
`;

export const StyledForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const FormRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px; // 레이블과 입력 필드 사이의 간격
    box-sizing: border-box;
    align-items: flex-start; // 왼쪽 정렬
    flex-shrink: 0; /* 자식 요소의 크기가 줄어들지 않도록 설정 */
`;

export const Label = styled.label`
    font-size: 1.13rem;
    color: #1976d2;
    font-weight: 600;
    margin-bottom: 2px;
    letter-spacing: 0.4px;
`;

export const StyledInput = styled.input`
    width: 480px; /* 고정된 가로 길이 */
    min-width: 0;
    box-sizing: border-box;
    padding: 13px 14px;
    border: 1.6px solid #b5dafc;
    border-radius: 8px;
    background: #fff;
    font-size: 1.09rem;
    transition: border 0.18s;
    &:focus {
        outline: none;
        border-color: #198dbb;
        background: #eaf6fb;
    }
    display: block; /* 블록 레벨 요소로 설정 */
`;

export const StyledTextarea = styled.textarea`
    width: 480px; /* 고정된 가로 길이 */
    min-width: 0;
    min-height: 110px;
    resize: vertical;
    padding: 13px 14px;
    border: 1.6px solid #b5dafc;
    border-radius: 8px;
    background: #fff;
    font-size: 1.09rem;
    font-family: inherit;
    transition: border 0.18s;
    &:focus {
        border-color: #198dbb;
        background: #eaf6fb;
    }
    display: block; /* 블록 레벨 요소로 설정 */
`;

export const SubmitButton = styled.button`
    width: 100%;
    background: linear-gradient(90deg,#36abc9,#198dbb);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 1.19rem;
    font-weight: 700;
    padding: 15px 0;
    letter-spacing: 1.1px;
    box-shadow: 0 2px 12px #44c0ee26;
    margin-top: 8px;
    cursor: pointer;
    transition: background 0.18s, transform 0.12s;
    &:hover {
        background: linear-gradient(90deg,#198dbb,#36abc9);
        transform: translateY(-2px) scale(1.017);
    }
`;

export const CancelButton = styled.button`
    flex: 1;
    background: #fff;
    color: #1486ba;
    border: 2px solid #1486ba;
    border-radius: 12px;
    font-size: 1.09rem;
    font-weight: 700;
    padding: 15px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.7px;
    box-shadow: 0 2px 10px #a3e5fa1c;
    position: relative;
    transition: background 0.17s, color 0.15s, border 0.15s, box-shadow 0.16s;
    &:hover {
        background: #e7f6fb;
        color: #1976d2;
        border-color: #1976d2;
        box-shadow: 0 4px 18px #a1d0f735;
    }
`;

export const ErrorMessage = styled.p`
    color: red;
    font-size: 0.875rem;
    margin-top: 0.25rem;
`;

// 추가된 체크박스 관련 스타일
export const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px; // 필요에 따라 간격 조정
`;


export const CheckboxInput = styled.input`
    margin-right: 8px;
    width: 16px; // 체크박스 크기
    height: 16px; // 체크박스 크기
    cursor: pointer;
`;

export const CheckboxLabel = styled.label`
    font-size: 0.95rem;
    color: #333;
    cursor: pointer;
`;

// 이미지 미리보기 컨테이너 스타일
export const ImagePreviewContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
`;

// 이미지 미리보기 wrapper (삭제 버튼 포함)
export const ImagePreviewWrapper = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
`;

// 이미지 미리보기 스타일
export const ImagePreview = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

// 이미지 삭제 버튼 스타일
export const RemoveImageButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: rgba(255, 0, 0, 0.7);
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 0;
`;

// 파일 입력 필드 레이블 스타일 (버튼처럼 보이도록)
export const FileInputLabel = styled.label`
    display: inline-block;
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #0056b3;
    }
`;
