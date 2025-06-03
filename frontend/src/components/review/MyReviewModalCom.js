import React, {useEffect, useState} from "react";
import {getReviewImage} from "../../service/reviewService";
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

function MyReviewModalCom({ review, onClose, onDelete }) {
    const [imageSrc, setImageSrc] = useState("/img/default-review.jpg");
    const [showFullImage, setShowFullImage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (review && review.reviewPic) {
            getReviewImage(review.reviewPic)
                .then((blob) => {
                    const imageUrl = URL.createObjectURL(blob);
                    setImageSrc(imageUrl);
                })
                .catch((error) => {
                    console.error("리뷰 이미지 로드 실패:", error);
                });
        }
    }, [review]);

    useEffect(() => {
        if (!review || !review.reviewStatus) return;

        console.log("리뷰 상태 확인:", review.reviewStatus);
    }, [review]);

    const handleEdit = () => {
        navigate(`/review/edit/${review.reviewCode}`);
    };

    const isDeletedByAdmin = review && review.reviewStatus === "DELETE_BY_ADMIN";

    const handleImageClick = () => {
        if (review.reviewPic) {
            setShowFullImage(true);
        }
    };

    const getImageSrc = (pic) => {
        if (!pic) return "/img/default-review.jpg";
        return pic.startsWith("http") ? pic : `/upload/review/${encodeURIComponent(pic)}`;
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
                        {review.reviewPic && (
                        <Thumbnail src={getImageSrc(review.reviewPic)}
                                   // src={`/upload/review/${encodeURIComponent(review.reviewPic)}`}
                                    alt="리뷰 이미지"
                                    onClick={handleImageClick}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
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
                    {!isDeletedByAdmin ? (
                        <>
                            <FooterButton onClick={handleEdit}>수정</FooterButton>
                            <FooterButton onClick={onDelete}>삭제</FooterButton>
                        </>
                    ) : (
                        <p style={{ color: "#999", textAlign: "center" }}>관리자에 의해 삭제된 리뷰입니다.</p>
                    )}
                </Footer>
            </Modal>
            {showFullImage && review.reviewPic && (
                <FullImageOverlay onClick={(e) => {
                    e.stopPropagation();
                    setShowFullImage(false);
                }}>
                    {/*<FullImage src={`/upload/review/${encodeURIComponent(review.reviewPic)}`} alt="원본 리뷰 이미지" />*/}
                    <FullImage src={getImageSrc(review.reviewPic)} alt="원본 리뷰 이미지" />
                </FullImageOverlay>
            )}
        </Overlay>
    );
}

export default MyReviewModalCom;