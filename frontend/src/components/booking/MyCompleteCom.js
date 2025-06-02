import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {
    Card, GridWrap, Item, LeftBlock, ListTitle, LoadMoreButton, RightBlock, StyleBookingBlock,
    StyleContentWrap, StyledButtonArea, StyledInfo, StyledStatus, ThumbImg, Title, TitleWrapper
} from "../../style/booking/StyleMyBooking";

const StyledButton = styled.button`
    width: 100%;
    max-width: 300px;
    padding: 10px 16px;
    background: #fbeff1;
    border: 1px solid #fbeff1;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    letter-spacing: 0.04em;
    margin: 0 2px;
    transition: all 0.2s ease;
    box-sizing: border-box;
    text-align: center;
    &:hover {
        background: #f8dbe1;
    }

    @media (max-width: 550px) {
        align-items: stretch;
    }
`;

function MyCompleteCom({ reservations = [], onPageClick, onLoadOldReservations, showMoreComplete, openReviewModal }) {
    const completed = (reservations ?? []).filter(res => res.orderStatus === "COMPLETED");
    console.log("예약 상태들:", reservations.map(r => r.orderStatus));
    const navigate = useNavigate();
    const onClickProduct = (productUid) => {
        navigate(`/products/${productUid}`);
    };
    const onClickReceipt = (bookingUid) => {
        navigate(`/reservations/receipt/${bookingUid}`);
    }

    if (completed.length === 0) {
        return <p>종료된 여행이 없습니다.</p>;
    }

    return(
    <>
        <StyleBookingBlock>
            <StyleContentWrap>
                <TitleWrapper>
                    <ListTitle>완료된 여행 목록</ListTitle>
                </TitleWrapper>
                <GridWrap>
                    <ul>
                        {completed && completed.map(res => {
                            console.log("res:", res);
                            return (
                            <Card key={res.orderCode}>
                                <StyledStatus>
                                    예약완료 | <span style={{ fontSize: "0.9rem", color: "#555" }}>{res.bookingUid}</span>
                                </StyledStatus>
                                <div style={{ display: "flex", gap: "50px" }}>
                                    <ThumbImg
                                        src={res.productThumbnail || "../../style/empty/empty-list.jpeg"}
                                        alt={res.productTitle}
                                    />
                                    <div>
                                        <Title onClick={() => onClickProduct(res.productUid)}>
                                            {res.productTitle || `상품코드 ${res.productCode}`}
                                        </Title>
                                    </div>
                                </div>
                                <StyledInfo>
                                    <LeftBlock>
                                        <strong>사용 예정일</strong><span>{res.reservationDate}</span>
                                    </LeftBlock>
                                    <RightBlock>
                                        <Item><strong>성인</strong><span>{res.adultCount}명</span></Item>
                                        <Item><strong>아동</strong><span>{res.childCount ?? 0}명</span></Item>
                                    </RightBlock>
                                </StyledInfo>
                                <StyledButtonArea>
                                    <StyledButton>문의하기</StyledButton>
                                    <StyledButton onClick={() => onClickReceipt(res.bookingUid)}>명세서 보기</StyledButton>
                                    {Boolean(res.reviewed) ? (
                                        <StyledButton onClick={() => openReviewModal(res.orderCode)}>리뷰보기</StyledButton>
                                    ) : (
                                        <StyledButton onClick={() => navigate(`/review/write/${res.orderCode}`)}>후기쓰기</StyledButton>
                                    )}
                                </StyledButtonArea>
                            </Card>
                        )})}
                    </ul>
                    {/* 공통 버튼 위치 여기! */}
                    {showMoreComplete && (
                        <div style={{ textAlign: "center", margin: "2rem" }}>
                            <LoadMoreButton onClick={onLoadOldReservations}>
                                6개월 전 예약 더 보기
                            </LoadMoreButton>
                        </div>
                    )}
                </GridWrap>
            </StyleContentWrap>
        </StyleBookingBlock>
    </>)
}
export default MyCompleteCom;