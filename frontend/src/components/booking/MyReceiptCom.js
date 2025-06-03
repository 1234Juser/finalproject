import {FaAngleLeft, FaCopy} from "react-icons/fa6";
import AdSlider from "../ad/AdSlider";
import MapSection from "../../containers/product/MapSection";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import {
    AdSection, BackButton, BookingNumber,
    CancelButton, CancelButtonWrapper, CancelPolicy, CancelSection, CancelTitle,
    ContentCard, CopyButton, CreatedDate, DetailWrapper,
    Header, HeaderLeft, InfoCard, InfoLabel, InfoRow,
    InfoValue, Inquiry, Label, MapWrap, PaymentCard, PaymentHighlight,
    ProductImage, ProductInfo, ProductLocation, ProductSection,
    ProductTitle, Section, SectionTitle, StatusTag, Title, Value, Wrapper
} from "../../style/booking/StyleReceipt";

function MyReceiptCom({order, option, payment, bookingUid,
                        adProducts = [],
                        product, onBack, onCancelReservation}){
    const navigate = useNavigate();

    if (!order || !option || !payment || !product) {
        return <p>로딩 중입니다...</p>;
    }

    const location = product.fullLocation || `${product.countryName || ''} ${product.cityName || ''}`;

    const onCopy = () => {
        navigator.clipboard.writeText(bookingUid)
            .then(() => alert("예약번호가 복사되었습니다."))
            .catch((err) => console.error("복사 실패:", err));
    };

    const thumbnail = product.productThumbnail?.startsWith('/static/')
        ? product.productThumbnail
        : `/upload/product/${product.productThumbnail}`;

    const formattedTime = payment?.paymentTime
        ? dayjs(payment.paymentTime).format("YYYY-MM-DD HH:mm:ss")
        : "시간 정보 없음";

    const getOrderStatusText = (status) => {
        switch (status) {
            case "SCHEDULED":
                return "예약확정";
            case "COMPLETED":
                return "여행완료";
            case "CANCELED":
                return "예약취소";
            case "WAITING_BANK_TRANSFER":
                return "무통장 입금대기";
            case "PENDING":
                return "결제 대기";
            default:
                return "상태 없음";
        }
    };
    const getOrderStatusMessage = (status) => {
        switch (status) {
            case "SCHEDULED":
                return "설레는 여행 같이 준비할까요?";
            case "COMPLETED":
                return "여행은 어떠셨나요?";
            case "CANCELED":
                return "다른 여행은 어떠세요?";
            default:
                return "여행 정보";
        }
    };

    const getPaymentStatusText = (status) => {
        switch (status) {
            case "COMPLETED":
                return "결제 완료";
            case "PENDING":
                return "결제 대기";
            case "WAITING_BANK_TRANSFER":
                return "무통장 입금 대기"
            case "CANCELED":
                return "결제 취소";
            case "EXPIRED":
                return "무통장 입금기한 만료";
            default:
                return "상태 없음";
        }
    };

    return(
    <>
        <Wrapper>
            <Header>
                <HeaderLeft>
                    <BackButton onClick={onBack}>
                        <FaAngleLeft size={20} />
                    </BackButton>
                    <BookingNumber>
                        예약번호 {bookingUid}
                        <CopyButton onClick={onCopy}><FaCopy size={14} /></CopyButton>
                    </BookingNumber>
                </HeaderLeft>
                <CreatedDate>
                    <Label>예약 생성 일시</Label>
                    <Value>{order?.orderDate || "예약일 정보 없음"}</Value>
                </CreatedDate>
            </Header>
            <ContentCard>
                <StatusTag status={order?.orderStatus}>{getOrderStatusText(order?.orderStatus)}</StatusTag>
                <Title>{getOrderStatusMessage(order?.orderStatus)}</Title>

                <ProductSection>
                    <ProductImage src={thumbnail} alt="상품 이미지"
                                style={{ width: "300px", borderRadius: "8px" }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                }} />
                    <ProductInfo>
                        <ProductTitle onClick={() => navigate(`/products/${product.productUid}`)}>{product.productTitle}</ProductTitle>
                        <ProductLocation>{product.cityName}</ProductLocation>
                    </ProductInfo>
                    <Inquiry>문의하기</Inquiry>
                </ProductSection>
                <Section>
                    <SectionTitle>상품 정보</SectionTitle>
                    <InfoCard>
                        <InfoRow>
                            <InfoLabel>사용일</InfoLabel>
                            <InfoValue>{option?.reservationDate || "예약 날짜 정보 없음"}</InfoValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>성인 / 아동</InfoLabel>
                            <InfoValue>{option?.adultCount ?? 0}명 / {option?.childCount ?? 0}명</InfoValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>총 인원</InfoLabel>
                            <InfoValue>{(option?.adultCount ?? 0) + (option?.childCount ?? 0)}명</InfoValue>
                        </InfoRow>
                    </InfoCard>
                </Section>
            </ContentCard>

            <CancelSection>
                <CancelTitle>예약 취소</CancelTitle>
                <CancelPolicy>
                    - 체크인 30일 전 취소 전액 환불<br />
                    - 체크인 하루 전 ~ 당일 취소 및 노쇼 환불불가<br />
                    - 숙소 이용 후, 시설 파손 등은 보상 불가<br />
                    - 고객 잘못으로 발생한 손해는 보상 대상 아님<br />
                    - 도난은 여행사 측에서 보상 불가. 해외 여행 시 여행자 보험 필수 가입<br />
                </CancelPolicy>
                <CancelButtonWrapper>
                <CancelButton onClick={(e) => {
                    e.stopPropagation();
                    if (order?.orderCode) {
                        onCancelReservation(order.orderCode);
                    } else {
                        console.error("orderCode가 정의되지 않음:", order);
                    }
                }}>예약 취소</CancelButton>
                </CancelButtonWrapper>
            </CancelSection>

            <DetailWrapper>
                <Section>
                    <SectionTitle>상품 정보</SectionTitle>
                    <MapWrap>
                        {product.fullLocation && (
                                <MapSection location={product.fullLocation} />
                        )}
                    </MapWrap>
                </Section>
                <Section>
                    <SectionTitle>결제 정보</SectionTitle>
                    <PaymentCard>
                        <InfoRow>
                            <InfoLabel>결제금액</InfoLabel>
                            <PaymentHighlight>￦{payment?.paymentAmount?.toLocaleString() || "금액 없음"}</PaymentHighlight>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>결제수단</InfoLabel>
                            <InfoValue>{payment?.paymentBrand || "정보 없음"}</InfoValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>결제시간</InfoLabel>
                            <InfoValue>{formattedTime}</InfoValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>결제상태</InfoLabel>
                            <InfoValue>{getPaymentStatusText(payment?.paymentStatus || "상태 없음")}</InfoValue>
                        </InfoRow>
                    </PaymentCard>
                </Section>
                <AdSection>
                    <AdSlider adProducts={adProducts} />
                </AdSection>
            </DetailWrapper>
        </Wrapper>
    </>)
}
export default MyReceiptCom;