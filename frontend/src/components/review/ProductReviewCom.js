import styled from "styled-components";
import {SubTitle} from "../../style/product/StyleProductDetail";

export const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0 1rem;
`;
export const SortWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    select {
        padding: 0.3rem 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 0.9rem;
        background-color: #f9f9f9;
        cursor: pointer;
    }
`;
const ReviewList = styled.ul`
    list-style: none;
    padding: 0;
`;
const ReviewItem = styled.li`
    margin-bottom: 1rem;
    border-bottom: 1px solid #ddd;
    padding-bottom: 0.5rem;
`;

function ProductReviewCom({ reviews = [], loading, error, sortOption = "date", onSortChange }) {
    if (typeof onSortChange !== "function") {
        console.error("onSortChange는 함수여야 합니다.");
        return null;
    }

    return(
        <>
            <HeaderWrapper>
                <SubTitle>💬 리뷰</SubTitle>
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
                {reviews.length > 0 ? (
                    reviews && reviews.map(review => (
                        <ReviewItem key={review.reviewCode}>
                            <p>작성자: {review.memberName}</p>
                            <p>{review.reviewRating}</p>
                            <p>작성일: {review.reviewDate}</p>
                            <p>내용: {review.reviewContent}</p>
                        </ReviewItem>
                    ))
                ) : (
                    <p>아직 등록된 리뷰가 없습니다. 첫 번째 리뷰를 작성해 주세요!</p>
                )}
            </ReviewList>
        </>)
}
export default ProductReviewCom;