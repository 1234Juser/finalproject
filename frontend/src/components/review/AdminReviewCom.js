import styled from 'styled-components';
import MyReviewModalCom from "./MyReviewModalCom";
import {useState} from "react";
import {deleteReviewByAdmin} from "../../service/reviewService";

const StyleReviewBlock = styled.div`
    display: flex;
    justify-content: center;
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

function AdminReviewCom({ reviews, loading, error }) {
    const [selectedReview, setSelectedReview] = useState(null);

    if (loading) {
        console.log("🟡 로딩 중...");
        return <p>로딩 중...</p>;
    }

    if (error) {
        console.error("🔴 오류 발생:", error);
        return <p>{error}</p>;
    }

    const isEmpty = !Array.isArray(reviews) || reviews.length === 0;

    const handleReviewClick = (review) => {
        console.log("🟢 선택된 리뷰:", review);
        setSelectedReview(review);
    };

    const handleCloseModal = () => setSelectedReview(null);

    const handleDeleteReview = async (reviewCode) => {
        if (window.confirm("정말 이 리뷰를 삭제하시겠습니까?")) {
            try {
                await deleteReviewByAdmin(reviewCode);
                alert("리뷰가 성공적으로 삭제되었습니다.");
                handleCloseModal();
                window.location.reload(); // 삭제 후 페이지 새로고침
            } catch (error) {
                alert("리뷰 삭제에 실패했습니다.");
                console.error("🔴 리뷰 삭제 실패:", error);
            }
        }
    };

    return(
        <>
            <StyleReviewBlock>
                <StyleContentWrap>
                    <TitleWrapper>
                        <ListTitle>리뷰 관리</ListTitle>
                    </TitleWrapper>
                    <DivWrap>
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
                                                <StyledStatusBadge status={review.reviewStatus}>
                                                    {review.reviewStatus || "상태 없음"}
                                                </StyledStatusBadge>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                            </tbody>
                        </StyledTable>
                    </DivWrap>
                    {/* 선택된 리뷰가 있으면 모달 열기 */}
                    {selectedReview && (
                        <MyReviewModalCom
                            review={selectedReview}
                            onClose={handleCloseModal}
                            onDelete={() => handleDeleteReview(selectedReview.reviewCode)}
                        />
                    )}
                </StyleContentWrap>
            </StyleReviewBlock>
        </>)
}
export default AdminReviewCom