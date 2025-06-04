import {Link} from "react-router-dom";
import {FaHeart, FaRegHeart} from "react-icons/fa6";
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
    FilterSortBar, FilterSection, FilterLabel, FilterResetBtn, SortSection, SortBtn, WishOneButton,

} from "../../style/product/StyleProductCon";
import { GoCalendar, GoFilter  } from "react-icons/go";
import {SaleStatus} from "../../style/product/StyleProductDetail";
import ProductFilterCom from "./ProductFilterCom";
import styled from "styled-components";

// "일치하는 상품이 없습니다" 메시지 스타일 컴포넌트 추가
const NoResultsMessage = styled.div`
  padding: 2rem;
  text-align: center;
  font-size: 1.2rem;
  color: #777;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin: 2rem auto; // 위아래 마진 추가 및 가운데 정렬
  border: 1px dashed #ddd;
`;



function ProductCom({ cityName, handleFilterReset, handleSort, filteredProducts = [], onToggleWish = () => {},
                    onFilterChange, activeFilterApplied}){

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
            <ProductFilterCom onFilterChange={onFilterChange}/>
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


            {/* 상품 목록 또는 "결과 없음" 메시지 표시 */}
            {activeFilterApplied && filteredProducts.length === 0 ? (
                <NoResultsMessage>일치하는 상품이 없습니다.</NoResultsMessage>
            ) : filteredProducts.length === 0 && !activeFilterApplied && cityName ? ( // 초기 로드 시 또는 필터 미적용 시 상품이 아예 없는 경우 (선택적)
                <NoResultsMessage>해당 지역의 상품이 아직 없습니다.</NoResultsMessage>
            ) : (
            filteredProducts.map((p, i) => {
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
                                        <WishOneButton onClick={() => onToggleWish(p)} aria-label="찜 토글">
                                            {p.isWished ? <FaHeart /> : <FaRegHeart />}
                                        </WishOneButton>
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
                    )
                })
            )}
        </TourPageContainer>
    )
}

export default ProductCom;