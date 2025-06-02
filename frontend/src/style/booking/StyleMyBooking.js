import styled from 'styled-components';

// 공통구역
export const TabWrapperStyle = styled.div`
    display: flex;
    border-bottom: 2px solid #ddd;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto 20px;
    gap: 12px;
`;

export const TabButton = styled.button`
    padding: 12px 0;
    margin-right: 30px;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
    border-bottom: ${({ $active }) => ($active ? '4px solid black' : 'none')};
`;

export const activeTabStyle = {
    fontWeight: "bold",
    borderBottom: "4px solid black"
};

export const inactiveTabStyle = {
    fontWeight: "normal",
    borderBottom: "none"
};

// 탭별 구역
export const StyleBookingBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 2rem;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    overflow-x: hidden;
`;
export const StyleContentWrap = styled.div`
    width: 100%;
    max-width: 800px;
    padding: 0 30px;
    box-sizing: border-box;
`;
export const TitleWrapper = styled.div`
    height: 100px;               // 원하는 높이
    display: flex;
    justify-content: center;    // 가로 중앙
    align-items: center;        // 세로 중앙
    box-sizing: border-box;
`;
export const ListTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 15px;
    height: 50px;               // 세로 높이 지정
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`;
export const GridWrap = styled.div`
    display: flex;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 2rem;
    justify-items: center;
    list-style: none;
    box-sizing: border-box;

    ul {
        list-style: none;
        padding-right: 40px;   // 기본패딩이랑 똑같게 오른쪽에 여백 추가
        margin: 0;
    }
`;
export const Title = styled.h4`
    font-size: 1rem;
    margin-bottom: 0.5rem;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;
export const Card = styled.div`
    width: 800px;
    max-width: 800px;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    background: #fff;
    overflow: hidden;
    transition: transform 0.2s ease-in-out;
    margin: 0 auto 1.5rem;
    padding: 20px;
    box-sizing: border-box;

    &:hover {
        transform: translateY(-5px);
    }
    
    @media (max-width: 780px) {
        width: 700px;
        padding: 1rem;
    }
    @media (max-width: 650px) {
        width: 580px;
    }
    @media (max-width: 600px) {
        width: 500px;
    }
`;
export const StyledStatus = styled.h3`
    color: #008080;
    margin-top: 10px;
    margin-left: 10px;
    box-sizing: border-box;
`;
export const StyledInfo = styled.div`
    display: flex;
    margin-left: 70px;
    margin-right: 70px;
    margin-bottom: 20px;
    box-sizing: border-box;
    gap: 0.5rem;
    padding: 1rem;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.3s ease;

    span {
        font-size: 0.95rem;
        display: flex;
        align-items: center;

        strong {
            min-width: 30px;
            color: #333;
        }
    }

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
`;
export const LeftBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;  // 자식들 간의 간격이다. LeftBlock의 자식은 span과 strong
    font-size: 0.95rem;
    color: #333;
    width: 50%;
`;
export const RightBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
    width: 50%;
    font-size: 0.95rem;
`;
export const Item = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0;

    strong {
        color: #333;
        font-weight: 600;
        margin-right: 0;
    }

    span {
        color: #555;
    }
`;
export const StyledButtonArea = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 5px;
    gap: 10px;
    box-sizing: border-box;
    padding-left: 70px;
    padding-right: 70px;
    
    @media (max-width: 550px) {
        width: 100%;
        padding: 1rem;
        flex-direction: column;
        align-items: center;
    }
`;
export const ThumbImg = styled.img`
    width: 100%;
    max-width: 150px;
    height: 110px;
    object-fit: cover;
    border-radius: 8px;
    margin-left: 70px;
    margin-bottom: 20px;
    box-sizing: border-box;
`;
export const LoadMoreButton = styled.button`
    padding: 12px 24px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 1rem;

    &:hover {
        background-color: #ddd;
    }
`;