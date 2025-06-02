import {useNavigate} from "react-router-dom";
import {
    Amount, BuyerInfoContainer, BuyerInfoItem, BuyerInfoList, BuyerInfoTitle,
    CancelPolicy, CancelTitle, EditButton, PaymentButton,
    PaymentContainer, PaymentInfo, PaymentOption, PaymentSelect,
    PaymentTitle, PriceRow, PriceTitle, ProductDetails, ProductImage,
    ProductInfo, ProductTitleText, ReservationDate,
    Section, Sidebar, TermItem, Terms, TermTitle,
    Title, TotalAmount, TotalPrice, Wrapper
} from "../../style/payment/StyleOrderCheckout";

function OrderCheckoutCom({
                            optionData,
                            loadedOptionData,
                            memberInfo,
                            orderCode,
                            loading,
                            error,
                            onCheckout,
                            paymentMethods,
                            selectedPaymentMethod,
                            setSelectedPaymentMethod}) {
    const navigate = useNavigate();

    if (!optionData) return <p>옵션 정보가 없습니다.</p>;

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

    const PAYMENT_LABELS = {
        CARD: "카드",
        BANK_TRANSFER: "무통장 입금",
        KAKAO_PAY: "카카오페이",
        NAVER_PAY: "네이버페이",
        TOSS_PAY: "토스페이"
    };
    const imagePath = productThumbnail
        ? `/upload/product/${encodeURIComponent(productThumbnail)}`
        : "/img/default-product.jpg";

    const handleGoBack = () => {
        navigate(-1);
    };

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
                        <PaymentSelect value={selectedPaymentMethod} onChange={(e) => setSelectedPaymentMethod(e.target.value)}>
                            <PaymentOption value="">결제수단 선택</PaymentOption>
                            {paymentMethods.map((method) => (
                                <PaymentOption key={method} value={method}>
                                    {PAYMENT_LABELS[method] || method}
                                </PaymentOption>
                            ))}
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
                    <PaymentButton onClick={onCheckout}>결제하기</PaymentButton>
                </Sidebar>
            </Wrapper>
        </>)
}
export default OrderCheckoutCom;