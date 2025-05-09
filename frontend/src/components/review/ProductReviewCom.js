import styled from "styled-components";
import {SubTitle} from "../../style/product/StyleProductDetail";
import {useState} from "react";
import AllReviewModal from "./AllReviewModal";

const ReviewContainer = styled.div`
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    margin-bottom: 40px;
`;

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

// const SubTitle = styled.h2`
//     font-size: 24px;
//     font-weight: bold;
//     color: #333;
// `;

const SortWrapper = styled.div`
    select {
        padding: 8px 16px;
        border-radius: 8px;
        border: 1px solid #ddd;
        background-color: #fff;
        font-size: 14px;
        cursor: pointer;
    }
`;

const ReviewList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
`;

const ReviewItem = styled.div`
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

const Rating = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: #ffa500;
    margin-bottom: 10px;
`;

const Reviewer = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: #555;
    margin-bottom: 5px;
`;

const ReviewDate = styled.div`
    font-size: 12px;
    color: #888;
    margin-bottom: 15px;
`;

const ReviewContent = styled.p`
    font-size: 14px;
    color: #333;
    line-height: 1.5;
`;

const NoReviewMessage = styled.p`
    font-size: 14px;
    color: #888;
    text-align: center;
    grid-column: span 2;
`;

const ShowMoreButton = styled.button`
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


function ProductReviewCom({ reviews = [], loading, error,
                            sortOption = "date",
                            onSortChange,
                            averageRating = 0,
                            reviewCount = 0 }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const top3Reviews = reviews.slice(0, 3);
    const handleModalToggle = () => {
        setModalOpen(!isModalOpen);
    };

    if (typeof onSortChange !== "function") {
        console.error("onSortChange는 함수여야 합니다.");
        return null;
    }

    return(
        <>
            <ReviewContainer>
                <HeaderWrapper>
                    <SubTitle>💬 리뷰 {averageRating.toFixed(1)} / 5.0 ({reviewCount}개)</SubTitle>
                </HeaderWrapper>
                {loading && <p>로딩 중...</p>}
                {error && <p>에러 발생: {error}</p>}
                <ReviewList>
                    {top3Reviews.length > 0 ? (
                        top3Reviews && top3Reviews.map((review) => (
                            <ReviewItem key={review.reviewCode}>
                                <Rating>⭐ {review.reviewRating.toFixed(1)}</Rating>
                                <Reviewer>{review.memberName}</Reviewer>
                                <ReviewDate>{review.reviewDate}</ReviewDate>
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
                                    <Rating>⭐ {review.reviewRating.toFixed(1)}</Rating>
                                    <Reviewer>{review.memberName}</Reviewer>
                                    <ReviewDate>{review.reviewDate}</ReviewDate>
                                    <ReviewContent>{review.reviewContent}</ReviewContent>
                                </ReviewItem>
                            ))
                        ) : (
                            <NoReviewMessage>아직 등록된 리뷰가 없습니다. 첫 번째 리뷰를 작성해 주세요!</NoReviewMessage>
                        )}
                    </ReviewList>
                </AllReviewModal>
            )}
        </>)
}
export default ProductReviewCom;