import {useState} from "react";
import AdminReviewModalCom from "./AdminReviewModalCom";
import {useNavigate} from "react-router-dom";
import {
    DivPage, DivWrap,
    ListTitle, ProductTitleCell, SpanPage,
    StyleContentWrap, StyledStatusBadge, StyledTable,
    StyleReviewBlock, TitleWrapper
} from "../../style/review/StyleAdminReview";
import {containerStyle, mainStyle, sidebarStyle} from "../../style/member/MyPageStyle";
import AdminSideBarPage from "../../pages/common/AdminSideBarPage";

function AdminReviewCom({ reviews, loading, error, currentPage, totalPages, onClick, onDelete }) {
    const [selectedReview, setSelectedReview] = useState(null);
    const navigate = useNavigate();

    if (loading) {
        return <p>로딩 중...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }

    const isEmpty = !reviews || reviews.length === 0;
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
        setSelectedReview(review);
    };

    const handleGoToProduct = (productUid) => {
        if (!productUid) return;
        navigate(`/products/${productUid}`);
    };

    const handleCloseModal = () => setSelectedReview(null);

    return(
        <>
        <div style={containerStyle}>
            <aside style={sidebarStyle}>
                <AdminSideBarPage />
            </aside>
            <main style={mainStyle}>
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
                                            <ProductTitleCell onClick={(e) => {
                                                e.stopPropagation(); // tr 클릭과 충돌 방지
                                                handleGoToProduct(review.productUid);
                                            }}>{review.productTitle || "상품명 없음"}</ProductTitleCell>
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
            </main>
        </div>
        </>)
}
export default AdminReviewCom;