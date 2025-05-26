import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const StyleBookingBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 2rem;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    overflow-x: hidden;
`;
const StyleContentWrap = styled.div`
    //width: 70%;
    //width: 800px;
    //max-width: 1200px;
    width: 100%;
    max-width: 800px;
    padding: 0 30px;
    box-sizing: border-box;
`;
const TitleWrapper = styled.div`
    height: 100px;               // 원하는 높이
    display: flex;
    justify-content: center;    // 가로 중앙
    align-items: center;        // 세로 중앙
    box-sizing: border-box;
`;
const ListTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 15px;
    height: 50px;               // 세로 높이 지정
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`;
const GridWrap = styled.div`
    display: flex;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 2rem;
    justify-items: center;
    list-style: none;
    box-sizing: border-box;

    ul {
        list-style: none;
        padding-right: 40px;   // 기본패딩이랑 똑같게 오른쪽에 여백 추가
        margin: 0;
    }
`;
const Title = styled.h4`
    font-size: 1rem;
    margin-bottom: 0.5rem;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;
const Card = styled.div`
    width: 800px;
    max-width: 800px;
    height: auto;
    //max-height: 300px;
    border: 1px solid #ddd;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    background: #fff;
    overflow: hidden;
    transition: transform 0.2s ease-in-out;
    margin: 0 auto 1.5rem;
    padding: 20px;
    box-sizing: border-box;
    //overflow-x: hidden;

    &:hover {
        transform: translateY(-5px);
    }
    
    @media (max-width: 780px) {
        width: 700px;
        padding: 1rem;
    }
    @media (max-width: 650px) {
        width: 580px;
        //padding: 1rem;
    }
    @media (max-width: 600px) {
        width: 500px;
        //padding: 1rem;
    }
`;
const StyledStatus = styled.h3`
    color: #008080;
    margin-top: 10px;
    margin-left: 10px;
    box-sizing: border-box;
`;
const StyledInfo = styled.div`
    display: flex;
    margin-left: 70px;
    margin-right: 70px;
    margin-bottom: 20px;
    box-sizing: border-box;
    gap: 0.5rem;
    padding: 1rem;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.3s ease;

    span {
        font-size: 0.95rem;
        display: flex;
        align-items: center;
        //gap: 30px;

        strong {
            min-width: 30px;
            color: #333;
        }
    }

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
`;
const LeftBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;  // 자식들 간의 간격이다. LeftBlock의 자식은 span과 strong
    font-size: 0.95rem;
    color: #333;
    width: 50%;
`;
const RightBlock = styled.div`
    display: flex;
    align-items: center;
    //justify-content: flex-end;
    justify-content: center;
    gap: 50px;
    width: 50%;
    font-size: 0.95rem;
`;
const Item = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0;

    strong {
        color: #333;
        font-weight: 600;
        margin-right: 0;
    }

    span {
        color: #555;
    }
`;
const StyledButton = styled.button`
    width: 100%;
    //max-width: 300px;
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
const StyledButtonArea = styled.div`
    display: flex;
    justify-content: center;
    //justify-content: space-between;
    //margin-top: 1rem;
    margin-bottom: 5px;
    gap: 10px;
    box-sizing: border-box;
    padding-left: 70px;
    padding-right: 70px;
    
    @media (max-width: 550px) {
        width: 100%;
        padding: 1rem;
        flex-direction: column;
        align-items: center;
    }
`;
const ThumbImg = styled.img`
    width: 100%;
    max-width: 150px;
    height: 110px;
    object-fit: cover;
    border-radius: 8px;
    margin-left: 70px;
    margin-bottom: 20px;
    box-sizing: border-box;
`;
const LoadMoreButton = styled.button`
    padding: 12px 24px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 1rem;

    &:hover {
        background-color: #ddd;
    }
`;

function MyScheduleCom({ reservations = [], onCancelReservation, onLoadOldReservations, showMoreSchedule }){
    // const scheduled = (reservations ?? []).filter(res => res.orderStatus === "SCHEDULED");
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
                                            {res.orderStatus === "WAITING_BANK_TRANSFER"
                                                ? "무통장 입금 대기"
                                                : "예약확정"} | <span style={{ fontSize: "0.9rem", color: "#555" }}>{res.bookingUid}</span>
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