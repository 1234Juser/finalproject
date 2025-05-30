import {Link} from "react-router-dom";
import {
    TourPageContainer,
    TourHeader,
    TourCard,
    CardImageWrapper,
    CardImage,
    CardContent,
    CardTitle,
    CardSubInfo,
    ViewDetailButton, ProductUid, CalendarTextContainer, CalendarText, CardPrice,
    FilterSortBar, FilterSection, FilterLabel, FilterResetBtn, SortSection, SortBtn,

} from "../../style/product/StyleProductCon";
import { GoCalendar, GoFilter  } from "react-icons/go";
import {SaleStatus} from "../../style/product/StyleProductDetail";

function ProductCom({ cityName, handleFilterReset, handleSort, products, filteredProducts}){

    const formatPrice = (price) => {
        if (typeof price !== "number") return price; // 숫자가 아닐 경우 그대로 반환
        return new Intl.NumberFormat("ko-KR").format(price);
    };

    const productStatus = {
        ON_SALE: "판매 중",
        CLOSED: "판매 종료",
        SOLD_OUT: "매진",
    };


    return (
        <TourPageContainer>
        <TourHeader>{cityName}</TourHeader>
            <FilterSortBar>
                <FilterSection>
                    <FilterLabel><GoFilter /> 필터</FilterLabel>
                    <FilterResetBtn onClick={handleFilterReset}>필터초기화 ⭮</FilterResetBtn>
                </FilterSection>
                <SortSection>
                    <SortBtn onClick={() => handleSort("low")}>낮은 가격순</SortBtn>
                    <SortBtn onClick={() => handleSort("high")}>높은 가격순</SortBtn>
                </SortSection>
            </FilterSortBar>


            {filteredProducts.map((p, i) => {
                const displayStatusText = productStatus[p.productStatus]
                    return (
                        <TourCard key={p.productUid}>
                                <CardImageWrapper>
                                    <CardImage src={p.productThumbnail      // p.productThumbnail에는 이미 완전한 S3 URL이 저장되어 있습니다.
                                                        ? p.productThumbnail
                                                        : '/static/img/earth.jpg'}      // productThumbnail이 없거나 비어있을 때 표시할 대체 이미지
                                                alt="상품 이미지"
                                                onError={(e) => {
                                                    e.target.onerror = null; // 무한 루프 방지
                                                    e.target.src = '/static/img/earth.jpg';
                                                }}/>
                                </CardImageWrapper>
                                <CardContent>
                                    <CardSubInfo>
                                        <SaleStatus status={p.productStatus}>
                                            {displayStatusText}
                                        </SaleStatus>
                                        <ProductUid>상품번호 {p.productUid}</ProductUid>
                                    </CardSubInfo>
                                    <CardTitle>{p.productTitle}</CardTitle>
                                    <CalendarText>{p.productContent}</CalendarText>
                                    <CardPrice>￦ {formatPrice(p.productAdult)}원</CardPrice>
                                    <CardSubInfo $noSpaceBetween> {/* noSpaceBetween prop을 적용 */}
                                        <GoCalendar size={24}/>
                                        <CalendarTextContainer>
                                            <CalendarText>출발 기간 : {p.productStartDate} ~ {p.productEndDate} </CalendarText>
                                        </CalendarTextContainer>
                                    </CardSubInfo>
                                    <Link to={`/products/${p.productUid}`}>
                                        <ViewDetailButton
                                        >자세히 보기</ViewDetailButton
                                        >
                                    </Link>
                                </CardContent>
                        </TourCard>
                    )})}

        </TourPageContainer>
    )
}

export default ProductCom;