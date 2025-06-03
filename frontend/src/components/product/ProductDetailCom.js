import {FaHeart, FaRegHeart} from "react-icons/fa6";
import {
    WishButton,
    Container,
    ImageSection,
    InfoSection,
    Title,
    PriceWrapper,
    Badge,
    DetailText,
    DetailTabWrapper,
    DetailTab,
    DetailContentWrapper,
    SubTitle,
    Divider,
    MainSectionWrapper,
    SectionWrapper,
    FlexSectionWrapper,
    MapWrapper,
    WeatherWrapper,
    PaymentButton,
    SaleStatus,
    NoMarginDivider,
    LeftAlignedSubTitle, ConditionBadge, BadgeWrapper
} from "../../style/product/StyleProductDetail";
import MapSection from "../../containers/product/MapSection";
import WeatherSection from "../../containers/product/WeatherSection";
import ProductReviewCon from "../../containers/review/ProductReviewCon";
import {useNavigate} from "react-router-dom";


function ProductDetailCom({product, isWished, onToggleWish, onTabClick}) {
    const navigate = useNavigate();

    const handleOptionSelect = () => {
        console.log("🔵 현재 product:", product);
        console.log("🔵 현재 productUid:", product.productUid);
        if (!product.productUid) {
            console.error("⚠️ productUid가 없습니다.");
            return;
        }
        navigate(`/products/${product.productUid}/option/create`);
    };

    const formatPrice = (price) => {
        if (typeof price !== "number") return price; // 숫자가 아닐 경우 그대로 반환
        return new Intl.NumberFormat("ko-KR").format(price);
    };

    // 버튼 텍스트와 상태 결정
    const getButtonProps = (status) => {
        switch (status) {
            case 'ON_SALE':
                return { text: "옵션 선택", status: "ON_SALE" };
            case 'CLOSED':
                return { text: "판매 종료", status: "CLOSED" };
            case 'SOLD_OUT':
                return { text: "매진", status: "SOLD_OUT" };
            default:
                return { text: "옵션 선택", status: "ON_SALE" };
        }
    };

    const buttonProps = getButtonProps(product.productStatus);



    return (
        <Container>
            <MainSectionWrapper>
            <ImageSection>
                <img src={
                    product.productThumbnail
                        ? product.productThumbnail
                        : `/upload/product/${product.productThumbnail}`
                } 
                    alt="상품 이미지" 
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/static/img/earth.jpg';
                      }}/>
            </ImageSection>
            <InfoSection>
                <DetailText>
                    <SaleStatus status={product.productStatus}>
                        {product.productStatus === 'ON_SALE' && '판매 중'}
                        {product.productStatus === 'CLOSED' && '판매 종료'}
                        {product.productStatus === 'SOLD_OUT' && '매진'}
                    </SaleStatus>
                </DetailText>
                <Title>{product.productTitle}</Title>
            <PriceWrapper>
                ￦ {formatPrice(product.productAdult)}원
            </PriceWrapper>
            <BadgeWrapper>
                <Badge>{product.themeName}</Badge>
                <ConditionBadge >{product.themeCondition}</ConditionBadge >
            </BadgeWrapper>
                <NoMarginDivider />
                <DetailText>최소출발인원(수량) {product.productMinParticipants}명(개)</DetailText>
                <NoMarginDivider />
            <DetailText>최대출발인원(수량) {product.productMaxParticipants}명(개)</DetailText>
                <NoMarginDivider />
            <DetailText>출발가능기간 : {product.productStartDate} ~ {product.productEndDate}</DetailText>
                <NoMarginDivider />
            <WishButton onClick={onToggleWish} aria-label="찜 토글">
                {isWished ? <FaHeart /> : <FaRegHeart />}
            </WishButton>
                <PaymentButton
                    onClick={handleOptionSelect}
                    status={buttonProps.status}
                >
                    {buttonProps.text}
                </PaymentButton>
             </InfoSection>
            </MainSectionWrapper>
            <DetailTabWrapper>
                <DetailTab onClick={() =>onTabClick("#basicInfo")}>기본정보</DetailTab>
                <DetailTab onClick={() => onTabClick('#meetingInfo')}>미팅정보</DetailTab>
                <DetailTab onClick={() => onTabClick('#courseInfo')}>코스안내</DetailTab>
                <DetailTab onClick={() => onTabClick('#notice')}>안내사항</DetailTab>
                <DetailTab onClick={() => onTabClick('#review')}>리뷰</DetailTab>
            </DetailTabWrapper>
            <DetailContentWrapper>
                <SectionWrapper id="basicInfo">
                    <DetailText>
                        <h3>📮 기본 정보</h3>
                        <div dangerouslySetInnerHTML={{__html : product?.productDescription?.productInfo }} />
                    </DetailText>
                        <Divider />
                </SectionWrapper >
                <SectionWrapper  id="meetingInfo">
                    <div dangerouslySetInnerHTML={{__html : product?.productDescription?.productMeetingInfo }} />
                    <Divider />
                </SectionWrapper >
                <SectionWrapper  id="courseInfo">
                    <div dangerouslySetInnerHTML={{__html : product?.productDescription?.productCourseInfo }} />
                    <Divider />
                </SectionWrapper >
                <SectionWrapper  id="notice">
                    <div dangerouslySetInnerHTML={{__html : product?.productDescription?.productNotice }} />
                    <Divider />
                </SectionWrapper >
                <FlexSectionWrapper>
                    <MapWrapper>
                        <SubTitle>🗺️ 여행 위치</SubTitle>
                        {product.countryName && <MapSection location={product.fullLocation}/>}
                    </MapWrapper>
                    <WeatherWrapper>
                        <LeftAlignedSubTitle>🌈 날씨 정보</LeftAlignedSubTitle>
                        {product.countryName && <WeatherSection city={product.cityName || ""}/>}
                    </WeatherWrapper>
                </FlexSectionWrapper>
                <SectionWrapper  id="review">
                    <ProductReviewCon productUid={product.productUid} />
                </SectionWrapper >
            </DetailContentWrapper>
        </Container>
    )
}

export default ProductDetailCom;