import AdminReviewModalCom from "./AdminReviewModalCom";
import {useState} from "react";
import styled from "styled-components";

const StyleReviewBlock = styled.div`
    display: flex;
    justify-content: center;
`;

const SelectBox = styled.select`
    padding: 6px 12px;
    border-radius: 6px;
    border: 1px solid #ccc;
`;

const FilterAndActionWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

const LeftBox = styled.div`
    display: flex;
    align-items: center;
`;

const RightBox = styled.div`
    text-align: right;
`;

const StyleContentWrap = styled.div`
    width: 90%;
    max-width: 2000px;
`;

const TitleWrapper = styled.div`
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ListTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
`;

const StyledTable = styled.table`
    width: 100%;
    border-radius: 12px;
    border-collapse: collapse;
    border: 1px solid #e0e0e0;
    overflow: hidden;
    font-size: 0.95rem;

    th, td {
        //width: 30px;
        padding: 20px 5px;
        border: none;
        text-align: center;
    }

    thead {
        background-color: #f5f5f5;
        color: #333;
        font-weight: bold;
    }

    tbody tr {
        border-bottom: 1px solid #eee;
    }

    tbody tr:last-child {
        border-bottom: none;
    }

    tbody tr:hover {
        background-color: #f5faff;
        transition: background-color 0.2s ease-in-out;
    }

    tbody td {
        color: #555;
    }
    .title {
        width: 200px;
    }
    .rating {
        width: 30px;
    }
    .name {
        width: 80px;
    }
    .content {
        width: 380px;
    }
    .use {
        width: 100px;
    }
    .create {
        width: 200px;
    }
    .status {
        width: 30px;
    }
`;

const StyledActionButton = styled.button`
    background-color: #fbeff1;
    color: #333;
    padding: 8px 14px;
    border: 1px solid #f8dbe1;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: #f8dbe1;
    }
`;

const StyledStatusBadge = styled.span`
    display: inline-block;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
    color: ${({ status }) =>
    status === "ACTIVE" ? "#00796b" :
        status === "DELETE_BY_ADMIN" ? "#c62828" :
            "#555"};
    background-color: ${({ status }) =>
    status === "ACTIVE" ? "#e0f2f1" :
        status === "DELETE_BY_ADMIN" ? "#ffebee" :
            "#eee"};
`;

const DivWrap = styled.div`
    margin: auto;
    width: 70%;
`;
// 페이지 버튼들이 모인 구역
const DivPage = styled.div`
    margin-top : 20px;
    text-align : center;
`;
// 페이지 버튼 낱개들
const SpanPage = styled.span`
    width : 30px;
    display : inline-block;
    cursor : pointer;
`;

function AdminReviewByProductCom({ products,
                                    selectedProductCode,
                                    onProductChange,
                                    reviews,
                                    loading,
                                    error,
                                    currentPage,
                                    totalPages,
                                    onClick,
                                    onDelete }) {
    const [selectedReview, setSelectedReview] = useState(null);

    if (loading) {
        console.log("🟡 로딩 중...");
        return <p>로딩 중...</p>;
    }

    if (error) {
        console.error("🔴 오류 발생:", error);
        return <p>{error}</p>;
    }

    // const isEmpty = !reviews || reviews.length === 0;
    const isEmpty = !Array.isArray(reviews) || reviews.length === 0;
    const reviewList = reviews || []; // 빈 배열로 초기화
    let number = []

    if (totalPages > 0) {
        for(let i = 1; i <= totalPages; i++) {
            number.push(
                <SpanPage
                    key={i}
                    onClick={() => onClick(i)}
                    style={{ fontWeight: currentPage === i ? "bold" : "normal" }}
                >
                    {i}
                </SpanPage>
            )
        }
        number.push(<b key={totalPages + 1}>({currentPage}/{totalPages})</b>);
    }

    const handleReviewClick = (review) => {
        console.log("🟢 선택된 리뷰:", review);
        setSelectedReview(review);
    };

    const handleCloseModal = () => setSelectedReview(null);

    return(
    <>
        <StyleReviewBlock>
            <StyleContentWrap>
                <TitleWrapper>
                    <ListTitle>상품별 리뷰 관리</ListTitle>
                </TitleWrapper>
                <DivWrap>
                    <FilterAndActionWrap>
                        <LeftBox>
                            <label htmlFor="productFilter" style={{ marginRight: "0.5rem" }}>
                                상품 필터:
                            </label>
                            <SelectBox
                                id="productFilter"
                                // 선택된 상품코드가 없다면 전체, 그렇지 않다면 선택된 상품코드로
                                value={selectedProductCode === null ? "all" : selectedProductCode}
                                onChange={onProductChange}
                            >
                                <option value="all">전체</option>
                                {Array.isArray(products) &&
                                    products.map((p) => (
                                        <option key={p.productCode} value={p.productCode}>
                                            {p.productTitle}
                                        </option>
                                    ))}
                            </SelectBox>
                        </LeftBox>

                        <RightBox>
                            <StyledActionButton type="submit">선택한 예약 취소</StyledActionButton>
                        </RightBox>
                    </FilterAndActionWrap>
                    <StyledTable>
                        <thead>
                        <tr>
                            <th className="title">상품명</th>
                            <th className="rating">평점</th>
                            <th className="name">작성자</th>
                            <th className="content">리뷰 내용</th>
                            <th className="use">예약일</th>
                            <th className="create">작성일</th>
                            <th className="status">상태</th>
                        </tr>
                        </thead>
                        <tbody>
                        {isEmpty ? (
                            <tr>
                                <td colSpan="7" style={{ textAlign: "center" }}>리뷰가 없습니다.</td>
                            </tr>
                        ) : (
                            reviews && reviews.map((review) => {
                                console.log("🟢 개별 리뷰 데이터:", review);
                                // 예약일 처리
                                const reservationDate = review.reservationDate
                                    ? new Date(review.reservationDate).toLocaleDateString()
                                    : "예약일 없음";
                                // 리뷰 작성일 처리
                                const reviewDate = review.reviewDate
                                    ? new Date(review.reviewDate).toLocaleString()
                                    : "작성일 없음";
                                return (
                                    <tr key={review.reviewCode} onClick={() => handleReviewClick(review)}>
                                        <td>{review.productTitle || "상품명 없음"}</td>
                                        <td>{review.reviewRating || "-"}</td>
                                        <td>{review.memberName || "작성자 없음"}</td>
                                        <td>{review.reviewContent || "내용 없음"}</td>
                                        <td>{review.reservationDate || "예약일 없음"}</td>
                                        <td>
                                            {review.reviewDate
                                                ? new Date(review.reviewDate).toLocaleString()
                                                : "작성일 없음"}
                                        </td>
                                        <td>
                                            <StyledStatusBadge status={review.reviewStatus || "ACTIVE"}>
                                                {review.reviewStatus || "ACTIVE"}
                                            </StyledStatusBadge>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                        </tbody>
                    </StyledTable>
                    {!loading && reviews && reviews.length > 0 && (
                        <>
                            <div style={{marginTop: "1rem"}}>
                                페이지: {currentPage} / {totalPages}
                            </div>
                            <DivPage>{number}</DivPage>
                        </>
                    )}
                </DivWrap>
                {/* 선택된 리뷰가 있으면 모달 열기 */}
                {selectedReview && (
                    <AdminReviewModalCom
                        review={selectedReview}
                        onClose={handleCloseModal}
                        onDelete={() => onDelete(selectedReview.reviewCode)}
                    />
                )}
            </StyleContentWrap>
        </StyleReviewBlock>
    </>)
}
export default AdminReviewByProductCom;