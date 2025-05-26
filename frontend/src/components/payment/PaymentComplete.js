import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import { FaEarthAsia } from "react-icons/fa6";

function PaymentComplete({ bookingUid,
                             orderDate,
                             productTitle,
                             productThumbnail,
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
                    <ProductImageWrap>
                <ProductImage
                    src={productThumbnail || "/img/empty/empty-list.jpeg"}
                    alt={productTitle}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/img/empty/empty-list.jpeg";
                    }}
                />
                    </ProductImageWrap>
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

const Wrapper = styled.div`
    max-width: 800px;
    margin: 4rem auto;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 16px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.02);
    text-align: center;
    font-family: 'Pretendard', sans-serif;
`;

const Earth = styled.div`
    font-size: 5rem;
    color: #001F3F;
    margin-bottom: 1.5rem;
`;

const Title = styled.h2`
    font-size: 1.8rem;
    color: #001F3F;
    margin-bottom: 1.5rem;
`;

const InfoText = styled.p`
    display: flex;
    justify-content: space-between;
    font-size: 1.6rem;
    color: #333;
    margin: 0.5rem 6rem;
    gap: 0.5rem;

    strong {
        color: #555;
        margin-right: 0.8rem;
    }
`;

const ProductBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 430px;
    gap: 2rem;
    background-color: white;
    padding: 1rem;
    margin: 2rem 0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

    /* 마스크 적용 */
    -webkit-mask-image: url('/img/stamp-mask.svg');
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-image: url('/img/stamp-mask.svg');
    mask-repeat: no-repeat;
    mask-size: 100% 100%;
`;

const BoxTitle = styled.h3`
    font-size: 1.2rem;
    font-weight: bold;
    //margin-bottom: 1rem;
    margin-top: 3rem;
    text-align: left;
    align-self: flex-start;
    margin-left: 5rem;
    margin-right: 5rem;
    width: 80%;
    color: #001F3F;
    padding-bottom: 0.8rem;
    border-bottom: 4px solid #003153;
`;

const OrderInfo = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    width: 100%;
    //height: 100%;
    height: auto;
`;

const ProductImageWrap = styled.div`
    width: 50%;
    display: flex;
    justify-content: flex-end; // 이미지가 너무 왼쪽으로 붙지 않게
    padding-left: 2rem; // 원하는 여백
    box-sizing: border-box;
    align-items: center;
`;

const ProductImage = styled.img`
    max-width: 300px;
    max-height: 300px;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 10px;
    display: block;
    text-align: left;
    align-self: flex-start;
    //flex: start-left;
    gap: 5rem;
`;

const ProductInfo = styled.div`
    flex: 1;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    //padding-left: 1rem;
    padding-right: 5rem;
`;

const ProductTitle = styled.div`
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

const ProductPrice = styled.div`
    font-size: 0.95rem;
    color: #555;
`;

const ConfirmButton = styled.button`
    background-color: #6ba4d8;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #3f5974;
    }
`;

const VbankInfo = styled.div`
    background-color: #e8f0fb;
    padding: 2rem;
    border-radius: 16px;
    margin-top: 2rem;
    width: 90%;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    font-size: 1.05rem;
    color: #003153;
    box-shadow: 0 4px 12px rgba(0, 31, 63, 0.08);

    h3 {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 1rem;
        color: #001F3F;
    }

    p {
        margin: 0.3rem 0;
        line-height: 1.6;
        strong {
            font-weight: 600;
            margin-right: 0.5rem;
            color: #001F3F;
        }
    }
`;