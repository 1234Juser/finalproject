import styled from "styled-components";
import {useNavigate} from "react-router-dom";

function OrderCheckoutCom({ optionData, loadedOptionData, memberInfo, orderCode, loading, error, onCheckout }) {
    const navigate = useNavigate();
    // const navigation = useNavigation();

    if (!optionData) return <p>옵션 정보가 없습니다.</p>;
    // if (!loadedOptionData) return <p>옵션 정보가 없습니다.</p>;
    // if (!memberInfo) return <p>회원 정보가 없습니다.</p>;
    const {
        productTitle = "상품명 없음",
        reservationDate = "예약일 없음",
        adultCount = 0,
        childCount = 0,
        productAdult = 0,
        productChild = 0,
        totalPrice = 0,
        productThumbnail = null,
    } = optionData;

    const {
        memberName = "이름 없음",
        memberEmail = "이메일 없음",
        memberPhone = "전화번호 없음",
    } = memberInfo;

    const imagePath = productThumbnail
        ? `/upload/product/${encodeURIComponent(productThumbnail)}`
        : "/img/default-product.jpg";

    const handleGoBack = () => {
        navigate(-1);
    };

    // const handlePayment = () => {
    //     // navigation.push('/payments/create');
    //     navigate(`/payments/create/${orderCode}`);
    // }

    return(
        <>
            <Wrapper>
                {/* 예약 정보 */}
                <Section>
                    <Title>예약하기</Title>
                    <ProductInfo>
                        <ProductImage src={optionData?.productThumbnail || ''} alt={optionData?.productTitle || '상품명 없음'} />
                        <ProductDetails>
                            <ProductTitleText>{optionData?.productTitle || '상품명 없음'}</ProductTitleText>
                            <ReservationDate>{optionData?.reservationDate || '예약일 없음'}</ReservationDate>
                            <div>일반 {(optionData?.adultCount || 0).toLocaleString()}개 선택</div>
                            <TotalPrice>일반 총 금액{(optionData?.productAdult || 0).toLocaleString()}원</TotalPrice>
                            <div>아동 {(optionData?.childCount || 0).toLocaleString()}개 선택</div>
                            <TotalPrice>아동 총 금액{(optionData?.productChild || 0).toLocaleString()}원</TotalPrice>
                            {/*<TotalPrice>{(optionData?.totalPrice || 0).toLocaleString()}원</TotalPrice>*/}
                        </ProductDetails>
                    </ProductInfo>
                    {/* 구매자 정보 */}
                    <BuyerInfoContainer>
                        <BuyerInfoTitle>구매자 정보</BuyerInfoTitle>
                        <BuyerInfoList>
                            <BuyerInfoItem>이름: {memberName}</BuyerInfoItem>
                            <BuyerInfoItem>이메일: {memberEmail}</BuyerInfoItem>
                            <BuyerInfoItem>전화번호: {memberPhone}</BuyerInfoItem>
                        </BuyerInfoList>
                    </BuyerInfoContainer>

                    {/* 결제수단 선택 */}
                    <PaymentContainer>
                        <PaymentTitle>결제수단 선택</PaymentTitle>
                        <PaymentSelect>
                            <PaymentOption value="">결제수단 선택</PaymentOption>
                            <PaymentOption value="CARD">카드</PaymentOption>
                            <PaymentOption value="BANK_TRANSFER">무통장 입금</PaymentOption>
                            <PaymentOption value="PAYPAL">페이팔</PaymentOption>
                            <PaymentOption value="KAKAO_PAY">카카오페이</PaymentOption>
                        </PaymentSelect>
                    </PaymentContainer>
                </Section>

                {/* 결제 정보 */}
                <Sidebar>
                    <PaymentInfo>
                        <PriceTitle>결제 정보</PriceTitle>
                        <PriceRow>
                            <span>주문 금액</span>
                            <span>{totalPrice.toLocaleString()}원</span>
                        </PriceRow>
                        <TotalAmount>
                            <span>총 결제 금액</span>
                            <Amount>{(optionData?.totalPrice || 0).toLocaleString()}원</Amount>
                        </TotalAmount>
                    </PaymentInfo>

                    <Terms>
                        <TermTitle>약관 안내</TermTitle>
                        <TermItem>개인정보 수집 및 이용 동의 (필수)</TermItem>
                        <TermItem>개인정보 제공 동의 (필수)</TermItem>
                    </Terms>

                    <CancelPolicy>
                        <CancelTitle>예약 취소 규정</CancelTitle>
                        <ul>
                            <li>여행시작 30일 전까지: 전액 환불</li>
                            <li>여행시작 20일 전까지: 상품 요금의 20% 공제</li>
                            <li>여행시작 7일 전까지: 상품 요금의 30% 공제</li>
                            <li>여행시작 4일 전까지: 상품 요금의 50% 공제</li>
                            <li>여행시작 3일 전까지: 취소/환불 불가</li>
                        </ul>
                    </CancelPolicy>

                    <EditButton onClick={handleGoBack}>옵션 수정하기</EditButton>
                    {/*<PaymentButton onClick={handlePayment}>결제하기</PaymentButton>*/}
                    <PaymentButton onClick={onCheckout}>결제하기</PaymentButton>
                </Sidebar>
            </Wrapper>
        </>)
}
export default OrderCheckoutCom;

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 2rem;
    background-color: #f9f9f9;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    border-radius: 12px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
`;

const Section = styled.div`
    flex: 2;
    margin-right: 2rem;
`;

const Sidebar = styled.div`
    flex: 1;
    min-width: 300px;
    max-width: 250px;
    flex-shrink: 0;
    align-self: flex-start;
    //height: 600px;
    height: auto;
    vertical-align: top;
    overflow-y: visible;
    background-color: #fff;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    font-size: 1.8rem;
    margin-bottom: 1rem;
`;

const ProductInfo = styled.div`
    display: flex;
    margin-bottom: 2rem;
`;

const ProductImage = styled.img`
    width: 100%;
    max-width: 400px;
    max-height: 400px;
    aspect-ratio: auto;
    object-fit: contain;
    //object-fit: cover;
    border-radius: 8px;
    margin-right: 1rem;
    align-self: flex-start;
`;

const ProductDetails = styled.div`
    flex: 1;
`;

const ProductTitleText = styled.h3`
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
`;

const ReservationDate = styled.div`
    color: #666;
    margin-bottom: 0.5rem;
`;

const TotalPrice = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
`;

const BuyerInfoContainer = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
`;

const BuyerInfoTitle = styled.h3`
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: #333;
    border-bottom: 2px solid #007bff;
    padding-bottom: 5px;
`;

const BuyerInfoList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    font-size: 1rem;
    color: #555;
`;

const BuyerInfoItem = styled.li`
    margin-bottom: 10px;
`;

const PaymentContainer = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const PaymentTitle = styled.h3`
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: #333;
    border-bottom: 2px solid #007bff;
    padding-bottom: 5px;
`;

const PaymentSelect = styled.select`
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
    background-color: #ffffff;
    transition: border-color 0.3s;

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const PaymentOption = styled.option`
    font-size: 1rem;
    color: #333;
`;

const PaymentInfo = styled.div`
    margin-bottom: 1.5rem;
`;

const PriceTitle = styled.h3`
    font-size: 1.4rem;
    margin-bottom: 1rem;
`;

const PriceRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
`;

const TotalAmount = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    font-size: 1.6rem;
    font-weight: bold;
    color: #3399ff;
`;

const Amount = styled.span`
    color: #3399ff;
`;

const Terms = styled.div`
    margin-bottom: 1.5rem;
`;

const TermTitle = styled.h4`
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
`;

const TermItem = styled.div`
    margin-bottom: 0.3rem;
    color: #666;
`;

const CancelPolicy = styled.div`
    margin-bottom: 1.5rem;
    ul {
        padding-left: 0;
        margin-left: 0;
        list-style-position: inside;
    }

    li {
        margin-bottom: 0.2rem;
        font-size: 0.9rem;
    }
`;

const CancelTitle = styled.h4`
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
`;

const EditButton = styled.button`
    width: 100%;
    padding: 1rem;
    background-color: #ff7875;
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        background-color: #ff4d4f;
    }
`;

const PaymentButton = styled.button`
    width: 100%;
    padding: 1rem;
    background-color: #3399ff;
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        background-color: #287ac6;
    }
`;