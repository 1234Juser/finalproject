import {FaHeart, FaRegHeart} from "react-icons/fa6";
import { WishButton, Container, ImageSection, InfoSection, Title, PriceWrapper, Badge, DetailText
    ,DetailTabWrapper, DetailTab, DetailContentWrapper, SubTitle, Divider, MainSectionWrapper
} from "../../style/product/StyleProductDetail";
import MapSection from "../../containers/product/MapSection";


function ProductDetailCom({product, isWished, onToggleWish}) {
    if (!product) return <p>로딩중...</p>;

    return (
        <Container>
            <MainSectionWrapper>
            <ImageSection>
                {/* <img src={product.productThumbnail} alt="상품 이미지" /> */}
                <img src="/static/img/product/london.jpg" alt="상품 이미지" />
            </ImageSection>

            <InfoSection>
            <DetailText><strong>판매 상태:</strong> {product.productStatus}</DetailText>
            <Title>{product.productTitle}</Title>
            <PriceWrapper>
                {product.productAdult}원
            </PriceWrapper>
            <Badge>#현지투어</Badge>
            {/* <DetailText><strong>아동 가격:</strong> {product.productChild}원</DetailText> */}
            <DetailText>최소출발인원(수량) {product.productMinParticipants}명(개)</DetailText>
            <DetailText>최대출발인원(수량) {product.productMaxParticipants}명(개)</DetailText>
            <DetailText>출발가능기간 : {product.productStartDate} ~ {product.productEndDate}</DetailText>
                        <WishButton onClick={onToggleWish} aria-label="찜 토글">
                            {isWished ? <FaHeart /> : <FaRegHeart />}
                        </WishButton>
             </InfoSection>
            </MainSectionWrapper>
            <DetailTabWrapper>
                <DetailTab active>기본정보</DetailTab>
                <DetailTab>미팅정보</DetailTab>
                <DetailTab>코스안내</DetailTab>
                <DetailTab>안내사항</DetailTab>
                <DetailTab>리뷰</DetailTab>
            </DetailTabWrapper>
            <DetailContentWrapper>
                <DetailText><strong>상품 설명:</strong> {product.productContent}</DetailText>
                <p><span className="emoji">🎫</span>런던에서 꼭 가봐야 할 박물관과 투어가 포함된 상품입니다!</p>
                <p><span className="emoji">⏰</span>투어 신청 전 출발 시간 꼭 확인해주세요.</p>
                <p><span className="emoji">❤️</span>가이드 투어로 여행의 시작을 특별하게 만들어보세요.</p>

                <SubTitle>📚 책보다 자세한 가이드</SubTitle>
                <p>여행 책자보다 풍부하고 유머 있는 설명으로 여행이 더 즐거워집니다.</p>

                <SubTitle>📸 가이드와 함께하는 인생샷</SubTitle>
                <p>가이드가 알려주는 명소 포토스팟에서 특별한 사진을 남기세요!</p>

                <Divider />

                <SubTitle>🏛️ 빅토리아 앤 앨버트 박물관</SubTitle>
                <p>세계에서 가장 큰 장식 예술 박물관으로 다양한 전시가 열리고 있어요.</p>
                <SubTitle>🗺️ 여행 위치</SubTitle>
                {product.countryName && <MapSection countryName={product.cityId} />}
            </DetailContentWrapper>
        </Container>
    )
}

export default ProductDetailCom;