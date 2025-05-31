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
export const BackButton = styled.button`
    background: none;
    border: none;
    color: #333;
    font-size: 18px;
    cursor: pointer;
    margin-right: 10px;
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #f0f0f0;
    }
`;
export const ListTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
    height: 60px;               // 세로 높이 지정
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const GridWrap = styled.div`
    //display: grid;
    display: flex;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 2rem;
`;

export const Card = styled.div`
    width: 800px;
    height: 160px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    background: #fff;
    overflow: hidden;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: translateY(-5px);
    }
`;

export const ThumbImg = styled.img`
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
`;

export const CardBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem;
`;

export const Title = styled.h4`
    font-size: 1rem;
    margin-bottom: 0.5rem;
    word-break: keep-all;  // 단어 단위로 줄바꿈 방지
    white-space: nowrap;   // 긴 제목이 한 줄로 유지
    overflow: hidden;      // 너비를 넘어가는 경우 넘치는 텍스트 숨김
    text-overflow: ellipsis;  // ... 말줄임 표시
    text-align: center;
`;

export const DeleteBtn = styled.button`
    background: transparent;
    border: none;
    color: red;
    //padding: 0.4rem 0.8rem;
    border-radius: 6px;
    padding: 0;
    font-size: 20px;
    cursor: pointer;

    &:hover {
        transform: scale(1.2);
    }
`;
export const Left = styled.div`
    flex: 1;
    max-width: 33%;
    height: 160px;
    padding: 5px;
    align-items: center;
    justify-content: center;
`;

export const Center = styled.div`
    flex: 2;
    max-width: 33%;
    min-width: 300px;
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    //align-items: center;
    align-items: flex-start;
    justify-content: center;
`;

export const Right = styled.div`
    flex: 1;
    max-width: 33%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;