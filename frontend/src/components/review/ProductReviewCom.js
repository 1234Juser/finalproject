import {SubTitle} from "../../style/product/StyleProductDetail";
import React, {useState} from "react";
import AllReviewModal from "./AllReviewModal";
import {
    FullImage,
    FullImageOverlay,
    HeaderWrapper, LeftSide, NoReviewMessage, Rating, RatingAndReviewerRow,
    ReviewContainer, ReviewContent, ModalReviewContent, ReviewDate, Reviewer,
    ReviewItem, ModalReviewItem,
    ReviewList, ShowMoreButton,
    SortWrapper, Thumbnail, ReviewBodyRow
} from "../../style/review/StyleProductReview";

function ProductReviewCom({ top3Reviews = [], previewSortOption = "date", onPreviewSortChange = () => {},
                            reviews = [], modalSortOption = "date", onModalSortChange = () => {},
                            loading, error,
                            averageRating = 0,
                            reviewCount = 0 }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [showFullImage, setShowFullImage] = useState(false);
    const [fullImageSrc, setFullImageSrc] = useState(null);
    const handleModalToggle = () => {
        if (!isModalOpen) {
            onModalSortChange("date"); // 열릴 때 정렬 초기화
        }
        setModalOpen(!isModalOpen);
    };

    const handleImageClick = (review) => {
        if (review.reviewPic) {
            const src = `/upload/review/${encodeURIComponent(review.reviewPic)}`;
            setFullImageSrc(src);
            setShowFullImage(true);
        }
    };

    return (
        <>
            <ReviewContainer>
                <HeaderWrapper>
                    <SubTitle>💬 리뷰 {averageRating.toFixed(1)} / 5.0 ({reviewCount}개)</SubTitle>
                    <SortWrapper>
                        <label>정렬: </label>
                        <select value={previewSortOption} onChange={(e) => onPreviewSortChange(e.target.value)}>
                            <option value="date">작성일 순</option>
                            <option value="rating">평점 순</option>
                        </select>
                    </SortWrapper>
                </HeaderWrapper>
                {loading && <p>로딩 중...</p>}
                {error && <p>에러 발생: {error}</p>}
                <ReviewList>
                    {top3Reviews.length > 0 ? (
                        top3Reviews && top3Reviews.map((review) => (
                            <ReviewItem key={review.reviewCode}
                                        onClick={() => setModalOpen(true)}>
                                <RatingAndReviewerRow>
                                    <LeftSide>
                                        <Rating>⭐ {review.reviewRating.toFixed(1)}</Rating>
                                        <Reviewer>{review.memberName}</Reviewer>
                                    </LeftSide>
                                    <ReviewDate>{review.reviewDate}</ReviewDate>
                                </RatingAndReviewerRow>
                                <ReviewBodyRow>
                                    <ReviewContent>{review.reviewContent}</ReviewContent>
                                    {review.reviewPic && (
                                        <Thumbnail src={`/upload/review/${encodeURIComponent(review.reviewPic)}`}
                                                    alt="리뷰 이미지"
                                                    onClick={() => {
                                                    setFullImageSrc(`/upload/review/${encodeURIComponent(review.reviewPic)}`);
                                                    setShowFullImage(true);
                                                }}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                                style={{cursor: 'pointer'}}
                                        />
                                    )}
                                </ReviewBodyRow>
                            </ReviewItem>
                        ))
                    ) : (
                        <NoReviewMessage>아직 등록된 리뷰가 없습니다. 첫 번째 리뷰를 작성해 주세요!</NoReviewMessage>
                    )}
                </ReviewList>
                {reviews.length > 3 && <ShowMoreButton onClick={handleModalToggle}>리뷰 모두 보기</ShowMoreButton>}
            </ReviewContainer>

            {/* 리뷰 모달 */}
            {isModalOpen && (
                <AllReviewModal onClose={handleModalToggle}>
                    <HeaderWrapper>
                        <SubTitle>📝 모든 리뷰 보기 {averageRating.toFixed(1)} / 5.0 ({reviewCount}개)</SubTitle>
                        <SortWrapper>
                            <label>정렬: </label>
                            <select value={modalSortOption} onChange={(e) => onModalSortChange(e.target.value)}>
                                <option value="date">작성일 순</option>
                                <option value="rating">평점 순</option>
                            </select>
                        </SortWrapper>
                    </HeaderWrapper>
                    <ReviewList>
                        {reviews.length > 0 ? (
                            reviews && reviews.map((review) => (
                                <ModalReviewItem key={review.reviewCode}>
                                    <RatingAndReviewerRow>
                                        <LeftSide>
                                            <Rating>⭐ {review.reviewRating.toFixed(1)}</Rating>
                                            <Reviewer>{review.memberName}</Reviewer>
                                        </LeftSide>
                                        <ReviewDate>{review.reviewDate}</ReviewDate>
                                    </RatingAndReviewerRow>
                                    <ReviewBodyRow>
                                        <ModalReviewContent>{review.reviewContent}</ModalReviewContent>
                                        {review.reviewPic && (
                                            <Thumbnail
                                                src={`/upload/review/${encodeURIComponent(review.reviewPic)}`}
                                                alt="리뷰 이미지"
                                                onClick={() => handleImageClick(review)}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                                style={{cursor: 'pointer'}}
                                            />
                                        )}
                                    </ReviewBodyRow>
                                </ModalReviewItem>
                            ))
                        ) : (
                            <NoReviewMessage>아직 등록된 리뷰가 없습니다. 첫 번째 리뷰를 작성해 주세요!</NoReviewMessage>
                        )}
                    </ReviewList>
                    {showFullImage && (
                        <FullImageOverlay onClick={(e) => {
                            e.stopPropagation();
                            setShowFullImage(false);
                        }}>
                            <FullImage src={fullImageSrc} alt="원본 리뷰 이미지"/>
                        </FullImageOverlay>
                    )}
                </AllReviewModal>
            )}
        </>);
}
export default ProductReviewCom;