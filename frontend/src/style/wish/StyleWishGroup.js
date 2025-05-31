import styled from "styled-components";

export const StyleLikeBlock = styled.div`
    display: flex;
    justify-content: center;
`;
export const StyleContentWrap = styled.div`
    width: 70%;
    max-width: 1200px;
`;
export const TitleWrapper = styled.div`
    height: 100px;               // 원하는 높이
    display: flex;
    justify-content: center;    // 가로 중앙
    align-items: center;        // 세로 중앙
`;
export const ListTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
`;
export const GridWrap = styled.div`
    display: grid;
    //grid-template-columns: repeat(4, 1fr); // ← 한 줄에 4개
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    max-width: 1100px; // 200px * 4 + 여유 간격 정도
    margin: 0 auto;
    gap: 40px 20px;
`;
export const LikeCard = styled.div`
    aspect-ratio: 1 / 1; // 정사각형 만들기
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    background-color: #fff;
    transition: transform 0.2s ease-in-out;
    &:hover {
        transform: translateY(-5px);
    }
`;
export const ThumbImg = styled.img`
    width: 100%;
    height: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
`;
export const CardTitle = styled.p`
    font-size: 16px;
    font-weight: bold;
    margin: 10px;
`;
export const GroupActionWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;
export const SavedCount = styled.p`
    font-size: 14px;
    color: #666;
    margin: 5px 5px 5px 5px;
`;
export const GroupDeleteBtn = styled.button`
    background-color: transparent;
    color: #ff4d4f;
    border: none;
    padding: 0;
    cursor: pointer;
    font-weight: 600;
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;;
    &:hover {
        color: #ff7875;
        transform: scale(1.05);
    }
    &:active {
        transform: scale(0.98);
    }
    &:focus {
        outline: none;
    }
`;