import {getReviewImage} from "../../service/reviewService";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    CloseButton,
    Content, Footer, FooterButton, FullImage, FullImageOverlay,
    Header,
    Modal,
    Overlay, ProductTitle, Rating, RatingDateRow, ReviewDate, ReviewInfo, ReviewText, Thumbnail,
    ThumbnailTitleWrap,
    Title
} from "../../style/review/StyleReviewModal";

function AdminReviewModalCom({ review, onClose, onDelete }) {
    const [imageSrc, setImageSrc] = useState("/img/default-review.jpg");
    const [showFullImage, setShowFullImage] = useState(false);
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

    return(
    <>
        <Overlay onClick={onClose}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <Header>
                    <Title>리뷰관리</Title>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </Header>
                <Content>
                    <ThumbnailTitleWrap>
                        {review.reviewPic && (
                        <Thumbnail src={`/upload/review/${encodeURIComponent(review.reviewPic)}`}
                                    alt="리뷰 이미지"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                   onClick={() => setShowFullImage(true)}
                                   style={{ cursor: 'pointer' }}
                        />
                        )}
                        <ProductTitle onClick={() => navigate(`/products/${review.productUid}`)}>{review.productTitle}</ProductTitle>
                    </ThumbnailTitleWrap>
                    <ReviewInfo>
                            <RatingDateRow>
                            <Rating>{"★".repeat(review.reviewRating)}</Rating>
                            <ReviewDate>{new Date(review.reviewDate).toLocaleString()}</ReviewDate>
                            </RatingDateRow>
                        <ReviewText>{review.reviewContent}</ReviewText>
                    </ReviewInfo>
                </Content>
                <Footer>
                    <FooterButton onClick={onDelete}>삭제</FooterButton>
                </Footer>
            </Modal>
            {showFullImage && review.reviewPic && (
                <FullImageOverlay onClick={(e) => {
                    e.stopPropagation();
                    setShowFullImage(false);
                }}>
                    <FullImage src={`/upload/review/${encodeURIComponent(review.reviewPic)}`} alt="원본 리뷰 이미지" />
                </FullImageOverlay>
            )}
        </Overlay>
    </>)
}
export default AdminReviewModalCom;