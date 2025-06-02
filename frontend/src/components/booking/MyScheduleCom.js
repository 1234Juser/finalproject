import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {
    Card, GridWrap, Item, LeftBlock, ListTitle,
    LoadMoreButton, RightBlock, StyleBookingBlock,
    StyleContentWrap, StyledButtonArea, StyledInfo,
    StyledStatus, ThumbImg, Title, TitleWrapper
} from "../../style/booking/StyleMyBooking";

const StyledButton = styled.button`
    width: 100%;
    max-width: 250px;
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

function MyScheduleCom({ reservations = [], onCancelReservation, onLoadOldReservations, showMoreSchedule }){
    const scheduled = (reservations ?? []).filter(
        res => res.orderStatus === "SCHEDULED" || res.orderStatus === "WAITING_BANK_TRANSFER"
    );
    console.log("예약 상태들:", reservations.map(r => r.orderStatus));
    const navigate = useNavigate();
    const onClickProduct = (productUid) => {
        navigate(`/products/${productUid}`);
    };
    const onClickReceipt = (bookingUid) => {
        navigate(`/reservations/receipt/${bookingUid}`);
    }

    if (scheduled.length === 0) {
        return <p>예정된 여행이 없습니다.</p>;
    }

    return(
        <>
            <StyleBookingBlock>
                <StyleContentWrap>
                    <TitleWrapper>
                        <ListTitle>예정된 여행 목록</ListTitle>
                    </TitleWrapper>
                    <GridWrap>
                        <ul>
                            {scheduled && scheduled.map(res => (
                                <li key={res.orderCode}>
                                    <Card>
                                        <StyledStatus>
                                            {res.orderStatus === "WAITING_BANK_TRANSFER" ? (
                                                <>
                                                    무통장 입금 대기
                                                    {res.vbankDue ? (
                                                        <> (입금기한: {res.vbankDue.replace("T", " ").slice(0, 16)})</>
                                                    ) : (
                                                        <> (입금기한 정보 없음)</>
                                                    )}
                                                </>
                                            ) : (
                                                "예약확정"
                                            )}
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
                                        <StyledButton>문의하기</StyledButton>
                                        <StyledButton onClick={() => onClickReceipt(res.bookingUid)}>명세서 보기</StyledButton>
                                        <StyledButton onClick={(e) => {
                                            e.stopPropagation();
                                            if (res?.orderCode) {
                                                onCancelReservation(res.orderCode);
                                            } else {
                                                console.error("orderCode가 정의되지 않음:", res);
                                            }
                                        }}
                                        >예약취소</StyledButton>
                                    </StyledButtonArea>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                        {/* 공통 버튼 위치 여기! */}
                        {showMoreSchedule && (
                            <div style={{ textAlign: "center", margin: "2rem" }}>
                                <LoadMoreButton onClick={(e) => {
                                    e.stopPropagation();
                                    onLoadOldReservations();
                                }}
                                >
                                    6개월 전 예약 더 보기
                                </LoadMoreButton>
                            </div>
                        )}
                    </GridWrap>
                </StyleContentWrap>
            </StyleBookingBlock>
        </>
    )
}
export default MyScheduleCom;