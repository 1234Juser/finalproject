import styled from "styled-components";

export const CenteredContainer = styled.div`
    //display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* 화면 중앙에 배치하기 위해 추가 */
`;

export const ReviewFormWrap = styled.div`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 2rem;
    box-sizing: border-box;
    background-color: #fff;
`;

export const Title = styled.h2`
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: #333;
`;

export const StarRating = styled.div`
    display: flex;
    gap: 0.5rem;
    font-size: 2rem;
    color: #ccc;
    margin-bottom: 1rem;
    .star {
    cursor: pointer;
    transition: color 0.2s;
    }
    .star.active {
    color: #ffd700;
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    height: 120px;
    resize: none;
    //padding: 1rem;
    font-size: 1rem;
    margin-top: 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
`;

export const PhotoUpload = styled.div`
    margin-top: 2rem;
`;

export const PhotoBox = styled.div`
    width: 100%;
    height: 160px;
    background: #f8f8f8;
    border: 1px dashed #ccc;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #888;
    font-size: 0.95rem;
    cursor: pointer; 
    &:hover {
        background-color: #f0f0f0;
        border-color: #999;
        color: #555;
    }
`;

export const SubmitButton = styled.button`
    margin-top: 2rem;
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background-color: #3399ff;  //dodgerblue
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        background-color: #267acc;
    }
`;

export const RemoveButton = styled.button`
    margin-top: 0.5rem;
    background-color: #ff6666;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    cursor: pointer;
    &:hover {
        background-color: #cc4444;
    }
`;

export const HiddenFileInput = styled.input`
    display: none;
`;