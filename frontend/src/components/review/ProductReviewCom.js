import {SubTitle} from "../../style/product/StyleProductDetail";
import React, {useState} from "react";
import AllReviewModal from "./AllReviewModal";
import {
    FullImage,
    FullImageOverlay,
    HeaderWrapper, LeftSide, NoReviewMessage, Rating, RatingAndReviewerRow,
    ReviewContainer, ReviewContent, ReviewDate, Reviewer,
    ReviewItem,
    ReviewList, ShowMoreButton,
    SortWrapper, Thumbnail
} from "../../style/review/StyleProductReview";

function ProductReviewCom({ reviews = [], loading, error,
                            sortOption = "date",
                            onSortChange,
                            averageRating = 0,
                            reviewCount = 0 }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const top3Reviews = reviews.slice(0, 3);
    const [showFullImage, setShowFullImage] = useState(false);
    const [fullImageSrc, setFullImageSrc] = useState(null);
    const handleModalToggle = () => {
        setModalOpen(!isModalOpen);
    };

    if (typeof onSortChange !== "function") {
        console.error("onSortChange는 함수여야 합니다.");
        return null;
    }

    const handleImageClick = (review) => {
        if (review.reviewPic) {
            const src = `/upload/review/${encodeURIComponent(review.reviewPic)}`;
            setFullImageSrc(src);
            setShowFullImage(true);
        }
    };

    return(
        <>
            <ReviewContainer>
                <HeaderWrapper>
                    <SubTitle>💬 리뷰 {averageRating.toFixed(1)} / 5.0 ({reviewCount}개)</SubTitle>
                    <SortWrapper>
                        <label>정렬: </label>
                        <select value={sortOption} onChange={(e) => onSortChange(e.target.value)}>
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
                            <ReviewItem key={review.reviewCode} onClick={() => setModalOpen(true)}>
                                <RatingAndReviewerRow>
                                    <LeftSide>
                                        <Rating>⭐ {review.reviewRating.toFixed(1)}</Rating>
                                        <Reviewer>{review.memberName}</Reviewer>
                                    </LeftSide>
                                    <ReviewDate>{review.reviewDate}</ReviewDate>
                                </RatingAndReviewerRow>
                                {/*<Thumbnail src={review.reviewPic ? `/review/${review.reviewPic}` : "/img/default-review.jpg"} alt="리뷰 이미지"/>*/}
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
                                            style={{ cursor: 'pointer' }}
                                />
                                )}
                                <ReviewContent>{review.reviewContent}</ReviewContent>
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
                            <select value={sortOption} onChange={(e) => onSortChange(e.target.value)}>
                                <option value="date">작성일 순</option>
                                <option value="rating">평점 순</option>
                            </select>
                        </SortWrapper>
                    </HeaderWrapper>
                    <ReviewList>
                        {reviews.length > 0 ? (
                            reviews && reviews.map((review) => (
                                <ReviewItem key={review.reviewCode}>
                                    <RatingAndReviewerRow>
                                        <LeftSide>
                                        <Rating>⭐ {review.reviewRating.toFixed(1)}</Rating>
                                        <Reviewer>{review.memberName}</Reviewer>
                                        </LeftSide>
                                    <ReviewDate>{review.reviewDate}</ReviewDate>
                                    </RatingAndReviewerRow>
                                    {review.reviewPic && (
                                    <Thumbnail
                                        // src={review.reviewPic ? `/review/${review.reviewPic}` : "/img/default-review.jpg"} alt="리뷰 이미지"
                                        src={`/upload/review/${encodeURIComponent(review.reviewPic)}`}
                                        alt="리뷰 이미지"
                                        onClick={() => handleImageClick(review)}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    )}
                                    <ReviewContent>{review.reviewContent}</ReviewContent>
                                </ReviewItem>
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
                            <FullImage src={fullImageSrc} alt="원본 리뷰 이미지" />
                        </FullImageOverlay>
                    )}
                </AllReviewModal>
            )}
        </>)
}
export default ProductReviewCom;