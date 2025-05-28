import styled from "styled-components";

export const ReviewContainer = styled.div`
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    margin-bottom: 40px;
`;

export const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

export const SortWrapper = styled.div`
    select {
        padding: 8px 16px;
        border-radius: 8px;
        border: 1px solid #ddd;
        background-color: #fff;
        font-size: 14px;
        cursor: pointer;
    }
`;

export const ReviewList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
`;

export const ReviewItem = styled.div`
    background-color: #ffffff;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.05);
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    }
`;

export const RatingAndReviewerRow = styled.div`
    display: flex;
    align-items: center;
    //justify-content: flex-start;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 10px;
`;

export const LeftSide = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const Rating = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: #ffa500;
    margin-bottom: 10px;
`;

export const Reviewer = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: #555;
    margin-bottom: 5px;
`;

export const ReviewDate = styled.div`
    font-size: 12px;
    color: #888;
    margin-bottom: 15px;
`;

export const ReviewContent = styled.p`
    font-size: 14px;
    color: #333;
    line-height: 1.5;
`;

export const NoReviewMessage = styled.p`
    font-size: 14px;
    color: #888;
    text-align: center;
    grid-column: span 2;
`;

export const ShowMoreButton = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    margin: 20px auto;
    display: block;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }
`;
export const Thumbnail = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 8px;
    margin-right: 16px;
    object-fit: cover;
    flex-shrink: 0;
`;

export const FullImageOverlay = styled.div`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0,0,0,0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
`;

export const FullImage = styled.img`
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 10px;
`;