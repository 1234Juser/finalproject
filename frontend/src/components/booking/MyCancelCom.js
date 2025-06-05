import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {
    Card, GridWrap, Item, LeftBlock, ListTitle, LoadMoreButton, RightBlock,
    StyleBookingBlock, StyleContentWrap,
    StyledButtonArea, StyledInfo, StyledStatus,
    ThumbImg, Title, TitleWrapper
} from "../../style/booking/StyleMyBooking";

const StyledButton = styled.button`
    width: 100%;
    max-width: 650px;
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

function MyCancelCom({ reservations = [], onLoadOldReservations, showMoreCancel, cityIdMap = {} }) {
    const canceled = (reservations ?? []).filter(res => res.orderStatus === "CANCELED");
    console.log("예약 상태들:", reservations.map(r => r.orderStatus));
    const navigate = useNavigate();
    const onClickProduct = (productUid) => {
        navigate(`/products/${productUid}`);
    };
    const onClickReceipt = (bookingUid) => {
        navigate(`/reservations/receipt/${bookingUid}`);
    }

    if (canceled.length === 0) {
        return <p>취소된 여행이 없습니다.</p>;
    }

    return(
    <>
        <StyleBookingBlock>
            <StyleContentWrap>
                <TitleWrapper>
                    <ListTitle>취소된 여행 목록</ListTitle>
                </TitleWrapper>
                <GridWrap>
                    <ul>
                        {canceled && canceled.map(res => (
                            <Card key={res.orderCode}>
                                <StyledStatus>
                                    {res.paymentStatus === "EXPIRED"
                                        ? "무통장 입금 만료"
                                        : "예약취소"}
                                    {" | "}
                                    <span style={{ fontSize: "0.9rem", color: "#555" }}>{res.bookingUid}</span>
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
                                    <StyledButton onClick={() =>
                                        navigate(`/products/city?city_id=${cityIdMap[res.productUid]}`)
                                    }>이 도시의 다른 상품 보기</StyledButton>
                                    <StyledButton onClick={() => onClickReceipt(res.bookingUid)}>명세서 보기</StyledButton>
                                </StyledButtonArea>
                            </Card>
                        ))}
                    </ul>
                    {/* 공통 버튼 위치 여기! */}
                    {showMoreCancel && (
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
export default MyCancelCom;