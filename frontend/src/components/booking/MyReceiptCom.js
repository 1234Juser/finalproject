import styled from "styled-components";
import {FaCopy} from "react-icons/fa6";
import {Link} from "react-router-dom";
import AdSlider from "../ad/AdSlider";

function MyReceiptCom({bookingUid,
                        adProducts = [],
                        productTitle,
                        productThumbnail,
                        productCity,
                        orderDateTime,
                        productDescription,
                        mapUrl,
                        onCheckPayment}){

    const onCopy = () => {
        navigator.clipboard.writeText(bookingUid)
            .then(() => alert("예약번호가 복사되었습니다."))
            .catch((err) => console.error("복사 실패:", err));
    };

    // const getRandomProducts = (products, count = 6) => {
    //     const shuffled = [...products].sort(() => 0.5 - Math.random());
    //     return shuffled.slice(0, count);
    // };

    return(
    <>
        <Wrapper>
            <Header>
                <BookingNumber>
                    예약번호 {bookingUid}
                    <CopyButton onClick={onCopy}><FaCopy size={14} /></CopyButton>
                </BookingNumber>
            </Header>
            <ContentCard>
                <StatusTag>예약확정</StatusTag>
                <Title>설레는 여행 같이 준비해요!</Title>

                <ProductSection>
                    <ProductImage src={productThumbnail} alt={productTitle} />
                    <ProductInfo>
                        <ProductTitle>{productTitle}</ProductTitle>
                        <ProductLocation>{productCity}</ProductLocation>
                    </ProductInfo>
                    <Inquiry>문의하기</Inquiry>
                </ProductSection>
            </ContentCard>

            <CancelSection>
                <CancelTitle>예약 취소</CancelTitle>
                <CancelPolicy>
                    - 체크인 30일 전 취소 전액 환불<br />
                    - 체크인 29 ~ 15일 전 취소 30% 공제<br />
                    - 체크인 14 ~ 4일 전 취소 50% 공제<br />
                    - 체크인 3일 ~ 당일 취소 및 노쇼 환불불가<br />
                    - 숙소 이용 후, 시설 파손 등은 보상 불가<br />
                    - 고객 잘못으로 발생한 손해는 보상 대상 아님<br />
                </CancelPolicy>
                <CancelButtons>
                    <button>환불 규정 보기</button>
                    <button>예약 취소</button>
                </CancelButtons>
            </CancelSection>

            <DetailWrapper>
                <Section>
                    <SectionTitle>세부 사항</SectionTitle>
                    <DetailGrid>
                        <div>
                            <Label>헬로, 트래블로직! 예약 번호</Label>
                            <Value blue>{bookingUid}</Value>
                        </div>
                        <div>
                            <Label>예약 생성 일시</Label>
                            <Value>{orderDateTime}</Value>
                        </div>
                    </DetailGrid>
                </Section>

                <Section>
                    <SectionTitle>상품 정보</SectionTitle>
                    <MapWrap>
                        <img src={mapUrl} alt="오시는 길" />
                        <Rules>{productDescription}</Rules>
                    </MapWrap>
                    <MoreButton>설명 더 보기</MoreButton>
                </Section>
                <Section>
                    <SectionTitle>결제 정보</SectionTitle>
                    <PaymentButton onClick={onCheckPayment}>결제 정보 확인</PaymentButton>
                </Section>
                <AdSection>
                    {/*<AdBanner>*/}
                    {/*    <AdGrid>*/}
                    {/*        {adProducts && adProducts.map(product => (*/}
                    {/*            <AdCard key={product.productCode}>*/}
                    {/*                <ImageWrapper>*/}
                    {/*                <Link to={`/products/${product.productUid}`} style={{ textDecoration: 'none', color: 'inherit' }}>*/}
                    {/*                    <StyledImg*/}
                    {/*                        src={product.productThumbnail || "/style/empty/empty-list.jpeg"}*/}
                    {/*                        alt={product.productTitle}*/}
                    {/*                        onError={(e) => {*/}
                    {/*                            e.target.onerror = null;}}*/}
                    {/*                    />*/}
                    {/*                    <OverlayText>{product.productTitle}</OverlayText>*/}
                    {/*                <span>{product.cityName}</span>*/}
                    {/*                </Link>*/}
                    {/*                </ImageWrapper>*/}
                    {/*            </AdCard>*/}
                    {/*        ))}*/}
                    {/*    </AdGrid>*/}
                    {/*</AdBanner>*/}
                        <AdSlider adProducts={adProducts} />
                </AdSection>
            </DetailWrapper>
        </Wrapper>
    </>)
}
export default MyReceiptCom;

const Wrapper = styled.div`
    width: 100%;
    max-width: 800px;
    padding: 2rem;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    flex-direction: column;
    //align-items: center;
    box-sizing: border-box;
`;

const Header = styled.div`
    margin-bottom: 1.5rem;
`;

const BookingNumber = styled.div`
    font-size: 0.95rem;
    font-weight: bold;
`;

const CopyButton = styled.button`
    margin-left: 10px;
    background: none;
    border: none;
    cursor: pointer;
    color: #888;
`;

const ContentCard = styled.div`
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 1.5rem;
    background: #fff;
    margin-bottom: 2rem;
`;

const StatusTag = styled.div`
    display: inline-block;
    background-color: #d3f5f0;
    color: #008080;
    padding: 0.2rem 0.5rem;
    border-radius: 8px;
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
`;

const Title = styled.h2`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
`;

const ProductSection = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
`;

const ProductImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 10px;
    object-fit: cover;
`;

const ProductInfo = styled.div`
    flex-grow: 1;
`;

const ProductTitle = styled.h3`
    font-size: 1rem;
    font-weight: 600;
`;

const ProductLocation = styled.p`
    font-size: 0.9rem;
    color: #666;
`;

const Inquiry = styled.div`
    color: #007aff;
    cursor: pointer;
    font-size: 0.9rem;
`;

const CancelSection = styled.div`
    padding: 1.5rem;
    background-color: #fafafa;
    border-radius: 12px;
`;

const CancelTitle = styled.h4`
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

const CancelPolicy = styled.div`
    font-size: 0.85rem;
    color: #555;
    line-height: 1.5;
    margin-bottom: 1rem;
`;

const CancelButtons = styled.div`
    display: flex;
    gap: 1rem;

    button {
        padding: 0.6rem 1rem;
        border-radius: 8px;
        border: 1px solid #ccc;
        cursor: pointer;
        background: #f5f5f5;

        &:last-child {
            background: #fbeff1;
            border-color: #fbeff1;
        }
    }
`;

const DetailWrapper = styled.div`
    padding: 2rem;
`;

const Section = styled.div`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h4`
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 1rem;
`;

const DetailGrid = styled.div`
    display: flex;
    gap: 3rem;
    font-size: 0.95rem;
`;

const Label = styled.div`
    color: #666;
    font-weight: 500;
    margin-bottom: 0.2rem;
`;

const Value = styled.div`
    font-weight: bold;
    color: ${props => props.blue ? "#007aff" : "#333"};
`;

const MapWrap = styled.div`
    display: flex;
    gap: 1.5rem;

    img {
        width: 240px;
        height: 120px;
        border-radius: 8px;
        object-fit: cover;
    }
`;

const Rules = styled.div`
    font-size: 0.9rem;
    color: #444;
    line-height: 1.5;
`;

const MoreButton = styled.button`
    margin-top: 1rem;
    padding: 8px 16px;
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
`;

const PaymentButton = styled.button`
    padding: 10px 20px;
    background: #fbeff1;
    border: 1px solid #fbeff1;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background: #f8dbe1;
    }
`;

const AdSection = styled.div`
    margin-top: 3rem;

    //h4 {
    //    font-size: 1.1rem;
    //    font-weight: bold;
    //    margin-bottom: 0.5rem; /* 기존 간격보다 확 줄임 */
    //}
`;

const AdBox = styled.div`
    display: flex;
    justify-content: center;
`;

const AdBanner = styled.div`
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: #111;
    color: white;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
        width: 120px;
        border-radius: 8px;
    }

    span {
        color: #ff7777;
        font-weight: bold;
    }
`;

const AdGrid = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
`;

const AdCard = styled.div`
    width: 200px;
    padding: 0.5rem;
    background: #f8f8f8;
    color: black;
    border-radius: 8px;
    text-align: center;

    img {
        width: 100%;
        height: 100px;
        object-fit: cover;
        border-radius: 6px;
    }

    div {
        margin-top: 0.5rem;
        font-weight: 600;
        font-size: 0.9rem;
    }

    span {
        font-size: 0.85rem;
        color: black;
    }
`;
const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 200px; /* 또는 이미지 비율에 맞게 조절 */
    overflow: hidden;
    border-radius: 8px;
`;

const StyledImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`;

const OverlayText = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
    color: #fff;
    padding: 0.5rem;
    font-weight: bold;
    font-size: 1rem;
    text-align: center;
`;