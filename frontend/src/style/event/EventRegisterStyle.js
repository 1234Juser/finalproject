import styled from "styled-components";

export const FormWrapper = styled.div`
    max-width: 540px;
    width: 100%;
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
    gap: 8px;
    box-sizing: border-box;
`;

export const Label = styled.label`
    font-size: 1.13rem;
    color: #1976d2;
    font-weight: 600;
    margin-bottom: 2px;
    letter-spacing: 0.4px;
`;

export const StyledInput = styled.input`
    width: 100%;
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
    &[type="file"] {
        padding: 8px 0;
        font-size: 1rem;
        border: none;
        background: none;
    }
`;

export const StyledTextarea = styled.textarea`
    width: 100%;
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
`;

export const FileInputWrapper = styled.div`
    width: 100%;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 16px;
    box-sizing: border-box;
`;

export const FileLabel = styled(Label)`
    margin-bottom: 0;
    min-width: 65px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
`;

export const PreviewImg = styled.img`
    width: 82px;
    height: 62px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #d6e7fa;
    background: #e6f4fe;
`;

export const DateRow = styled.div`
    width: 100%;
    display: flex;
    gap: 12px;
    > div { flex: 1; min-width: 0; }
    @media (max-width: 600px) {
        flex-direction: column;
        gap: 5px;
    }
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

export const Select = styled.select`
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    padding: 13px 14px;
    border: 1.6px solid #b5dafc;
    border-radius: 8px;
    background: #fff;
    font-size: 1.09rem;
    transition: border 0.18s;
    &:focus {
        border-color: #198dbb;
        background: #eaf6fb;
    }
`;
