import {FaHeart, FaRegHeart} from "react-icons/fa6";
import { WishButton, Container, ImageSection, InfoSection, Title, PriceWrapper, Badge, DetailText
    ,DetailTabWrapper, DetailTab, DetailContentWrapper, SubTitle, Divider, MainSectionWrapper,
    SectionWrapper , FlexSectionWrapper, MapWrapper, WeatherWrapper, PaymentButton
} from "../../style/product/StyleProductDetail";
import MapSection from "../../containers/product/MapSection";
import WeatherSection from "../../containers/product/WeatherSection";
import ProductReviewCon from "../../containers/review/ProductReviewCon";


function ProductDetailCom({product, isWished, onToggleWish, onTabClick, activeSection}) {

    return (
        <Container>
            <MainSectionWrapper>
            <ImageSection>
                <img src={
                    product.productThumbnail?.startsWith('/static/') 
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
            <PaymentButton>결제하기</PaymentButton>
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
                    <DetailText><strong>상품 설명:</strong> {product.productContent || "활기 넘치는 서울의 심장을 느껴보세요! 경복궁의 웅장함부터 북촌 한옥마을의 고즈넉함, 남산타워에서 바라보는 환상적인 야경까지, 서울 도심의 매력을 한 번에 경험할 수 있는 특별한 투어입니다. 전문 가이드의 친절하고 재미있는 해설과 함께 숨겨진 이야기와 놓칠 수 없는 포토 스팟을 Discover 해보세요."}</DetailText>
                        <p><span className="emoji">🚶‍♀️</span>도보와 대중교통을 이용하여 서울의 구석구석을 탐험합니다.</p>
                        <p><span className="emoji">📸</span>인생샷 보장! 아름다운 서울의 명소에서 잊지 못할 추억을 남겨보세요.</p>
                        <p><span className="emoji">🇰🇷</span>한국의 역사와 문화를 깊이 있게 이해하는 시간이 될 것입니다.</p>

                        <SubTitle>✨ 서울 도심 투어만의 특별한 경험</SubTitle>
                        <p>단순히 눈으로 보는 관광이 아닌, 서울의 역사, 문화, 그리고 현재를 생생하게 느낄 수 있도록 전문 가이드가 흥미로운 이야기를 들려줍니다. 숨겨진 골목길을 걸으며 현지인들의 삶을 엿보고, 맛있는 길거리 음식을 맛보는 즐거움도 놓치지 마세요!</p>

                        <SubTitle>📍 주요 방문 장소</SubTitle>
                        <ul>
                            <li>경복궁: 조선 시대의 웅장한 정궁에서 한국 전통 건축의 아름다움을 느껴보세요.</li>
                            <li>북촌 한옥마을: 고즈넉한 한옥들이 옹기종기 모여있는 아름다운 마을에서 전통 문화를 체험해보세요.</li>
                            <li>남산타워: 서울의 아름다운 스카이라인을 한눈에 담을 수 있는 서울의 랜드마크입니다.</li>
                            <li>명동: 한국 패션과 뷰티의 중심지에서 활기 넘치는 쇼핑을 즐겨보세요. (선택 사항)</li>
                            <li>광장시장: 다양한 길거리 음식과 전통 상품을 경험할 수 있는 한국적인 시장입니다. (선택 사항)</li>
                        </ul>
                        <Divider />
                </SectionWrapper >
                <SectionWrapper  id="meetingInfo">
                    <SubTitle>🤝 미팅 정보</SubTitle>
                    <p><strong>미팅 장소:</strong> 서울 지하철 3호선 경복궁역 3번 출구 앞</p>
                    <p><strong>미팅 시간:</strong> 오전 9시 30분 (정시 출발)</p>
                    <p><strong>준비물:</strong> 편안한 신발, 생수, 개인 상비약, 카메라</p>
                    <p><strong>참고사항:</strong></p>
                    <ul>
                        <li>미팅 시간에 늦을 경우 투어 참여가 어려울 수 있습니다.</li>
                        <li>개인 이어폰을 지참하시면 가이드의 설명을 더욱 잘 들을 수 있습니다.</li>
                        <li>우천 시에도 투어는 정상적으로 진행됩니다. (우비 제공)</li>
                    </ul>
                    <Divider />
                </SectionWrapper >
                <SectionWrapper  id="courseInfo">
                    <SubTitle>🗺️ 코스 안내</SubTitle>
                    <ol>
                        <li><strong>09:30</strong> - 경복궁역 3번 출구에서 가이드 미팅 및 간단한 오리엔테이션</li>
                        <li><strong>10:00 - 12:00</strong> - 경복궁 내부 관람 (전문 가이드 해설 포함)</li>
                        <li><strong>12:00 - 13:00</strong> - 북촌 한옥마을로 이동 및 자유 시간 (점심 식사 개별)</li>
                        <li><strong>13:00 - 15:00</strong> - 북촌 한옥마을 골목길 투어 및 사진 촬영</li>
                        <li><strong>15:00 - 16:00</strong> - 남산으로 이동 및 남산 케이블카 탑승 (선택 사항)</li>
                        <li><strong>16:00 - 17:30</strong> - 남산타워 전망대 관람 및 서울 야경 감상</li>
                        <li><strong>17:30</strong> - 명동역 또는 서울역에서 투어 종료 (선택 사항에 따라 변동 가능)</li>
                    </ol>
                    <p><strong>총 소요 시간:</strong> 약 8시간</p>
                    <p><strong>이동 방법:</strong> 도보, 지하철, 버스 (남산 케이블카는 선택 사항)</p>
                    <Divider />
                </SectionWrapper >
                <SectionWrapper  id="notice">
                    <SubTitle>📝 안내사항</SubTitle>
                    <ul>
                        <li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li>
                        <li>천재지변 또는 예기치 못한 상황 발생 시 투어 일정이 변경될 수 있습니다.</li>
                        <li>개인 부주의로 인한 사고 발생 시 책임지지 않습니다.</li>
                        <li>투어 중 귀중품 분실에 유의해 주시기 바랍니다.</li>
                        <li>사진 촬영은 자유롭게 가능하나, 일부 장소에서는 제한될 수 있습니다.</li>
                        <li>쓰레기는 반드시 지정된 장소에 버려주세요.</li>
                        <li>가이드에게 궁금한 점이 있으면 언제든지 문의해주세요.</li>
                    </ul>
                    <Divider />
                </SectionWrapper >
                <FlexSectionWrapper>
                    <MapWrapper>
                        <SubTitle>🗺️ 여행 위치</SubTitle>
                        {product.countryName && <MapSection location={product.fullLocation}/>}
                    </MapWrapper>
                    <WeatherWrapper>
                        <SubTitle> 날씨 정보</SubTitle>
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