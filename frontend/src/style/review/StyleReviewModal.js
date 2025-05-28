import styled from "styled-components";

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

export const Modal = styled.div`
    width: 640px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

export const Header = styled.div`
    padding: 1rem;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled.h2`
    font-size: 1.5rem;
    margin: 0;
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
`;

export const Content = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ThumbnailTitleWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    width: 100%;
    margin-bottom: 1rem;
    margin-left: 6rem;
`;

export const Thumbnail = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 1rem;
`;

export const ProductTitle = styled.h3`
    font-size: 1.3rem;
    flex-grow: 1;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
    white-space: nowrap;    // 줄바꿈 예방. 한줄 표시
    overflow: hidden;       // 박스를 넘치는 텍스트 숨기기
    text-overflow: ellipsis;    // 넘친 텍스트 ...줄임표 사용
`;

export const ReviewInfo = styled.div`
    width: 100%;
    max-width: 528px;
    text-align: left;
    word-wrap: break-word;
    word-break: break-word;
    padding: 0 6rem;    // 상하는 0, 좌우는 6rem
`;

export const RatingDateRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 0.5rem;
`;

export const ReviewDate = styled.p`
    color: #888;
    font-size: 0.9rem;
    margin: 0.5rem 0;
`;

export const Rating = styled.div`
    font-size: 1.2rem;
    color: #ffd700;
    margin-bottom: 1rem;
`;

export const ReviewText = styled.p`
    white-space: pre-wrap;
    line-height: 1.6;
`;

export const Footer = styled.div`
    padding: 1rem;
    background-color: #f5f5f5;
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: center;
    gap: 1rem;
`;

export const FooterButton = styled.button`
    background-color: #007bff;
    color: #fff;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

export const FullImageOverlay = styled.div`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0, 0, 0, 0.85);
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