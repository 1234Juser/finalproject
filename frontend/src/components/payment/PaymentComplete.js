import {useNavigate} from "react-router-dom";
import { FaEarthAsia } from "react-icons/fa6";
import {
    BoxTitle, ConfirmButton, Earth, InfoText, OrderInfo,
    ProductBox, ProductInfo, ProductPrice, ProductTitle,
    Title, VbankInfo, Wrapper
} from "../../style/payment/StylePayment";

function PaymentComplete({ bookingUid,
                            orderDate,
                            productTitle,
                            totalPrice,
                            vbankNum,
                            vbankName,
                            vbankHolder,
                            vbankDue}) {
    const navigate = useNavigate();

    const handleGoToReservations = () => {
        navigate("/my/reservations");
    };

    return(
    <>
        <Wrapper>
            <Earth><FaEarthAsia /></Earth>
            <Title>주문이 완료되었습니다.</Title>

            <InfoText className="number">
                <strong>주문번호:</strong> {bookingUid}
            </InfoText>
            <InfoText className="date">
                <strong>주문일자:</strong> {orderDate?.toLocaleString()}
            </InfoText>

            <ProductBox>
                <BoxTitle>주문 상품 정보</BoxTitle>
                <OrderInfo>
                <ProductInfo>
                    <ProductTitle>{productTitle}</ProductTitle>
                    <ProductPrice>
                        총 결제금액: {totalPrice?.toLocaleString()}원
                    </ProductPrice>
                </ProductInfo>
                </OrderInfo>
            </ProductBox>

            {vbankNum ? (
                <VbankInfo>
                    <h3>무통장 입금 안내</h3>
                    <p><strong>입금 은행:</strong> {vbankName}</p>
                    <p><strong>계좌 번호:</strong> {vbankNum}</p>
                    <p><strong>예금주:</strong> {vbankHolder}</p>
                    <p><strong>입금 마감일시:</strong> {vbankDue}</p>
                    <p style={{ color: "#d00", marginTop: "1rem" }}>
                        ※ 입금 기한 내에 정확한 금액을 입금해야 예약이 확정됩니다.
                    </p>
                </VbankInfo>
            ) : (
                <p style={{ color: "gray" }}>무통장입금 정보 없음</p>
            )}
            <ConfirmButton onClick={handleGoToReservations}>예정된 여행 목록 보기</ConfirmButton>
        </Wrapper>
    </>)
}
export default PaymentComplete;