import React, {useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import path, {getReviewImage} from "../../service/reviewService";
import {useNavigate} from "react-router-dom";

const Overlay = styled.div`
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

const Modal = styled.div`
    width: 500px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const Header = styled.div`
    padding: 1rem;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.h2`
    font-size: 1.5rem;
    margin: 0;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
`;

const Content = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ThumbnailTitleWrap = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
`;

const Thumbnail = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 1rem;
`;

const ProductTitle = styled.h3`
    margin-left: 10px;
    font-size: 1.3rem;
    flex-grow: 1;
`;

const TitleRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
`;

const ReviewInfo = styled.div`
    width: 100%;
    max-width: 320px;
    text-align: left;
    word-wrap: break-word;
    word-break: break-word;
    margin-left: 10px;
`;

const ReviewDate = styled.p`
    color: #888;
    font-size: 0.9rem;
    margin: 0.5rem 0;
`;

const Rating = styled.div`
    font-size: 1.2rem;
    color: #ffd700;
    margin-bottom: 1rem;
`;

const ReviewText = styled.p`
    white-space: pre-wrap;
    line-height: 1.6;
`;

const Footer = styled.div`
    padding: 1rem;
    background-color: #f5f5f5;
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: center;
    gap: 1rem;
`;

const FooterButton = styled.button`
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

function MyReviewModalCom({ review, onClose, onDelete }) {
    const [imageSrc, setImageSrc] = useState("/img/default-review.jpg");
    const navigate = useNavigate();

    useEffect(() => {
        if (review.reviewPic) {
            getReviewImage(review.reviewPic)
                .then((blob) => {
                    const imageUrl = URL.createObjectURL(blob);
                    setImageSrc(imageUrl);
                })
                .catch((error) => {
                    console.error("리뷰 이미지 로드 실패:", error);
                });
        }
    }, [review.reviewPic]);

    const handleEdit = () => {
        navigate(`/review/edit/${review.reviewCode}`);
    };

    return (
        <Overlay onClick={onClose}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <Header>
                    <Title>내 후기</Title>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </Header>
                <Content>
                    <ThumbnailTitleWrap>
                        <Thumbnail src={review.reviewPic ? `${path}/review/${encodeURIComponent(review.reviewPic)}` : "/img/default-review.jpg"} alt="리뷰 이미지" />
                        <ProductTitle>{review.productTitle}</ProductTitle>
                    </ThumbnailTitleWrap>
                    <ReviewInfo>
                        <TitleRow>
                            <Rating>{"★".repeat(review.reviewRating)}</Rating>
                            <ReviewDate>{new Date(review.reviewDate).toLocaleString()}</ReviewDate>
                        </TitleRow>
                        <ReviewText>{review.reviewContent}</ReviewText>
                    </ReviewInfo>
                </Content>
                <Footer>
                    <FooterButton onClick={handleEdit}>수정</FooterButton>
                    <FooterButton onClick={onDelete}>삭제</FooterButton>
                </Footer>
            </Modal>
        </Overlay>
    );
}

export default MyReviewModalCom;