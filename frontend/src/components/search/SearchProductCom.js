import { Link } from "react-router-dom";
import {
    TourPageContainer,
    TourHeader,
    TourCard,
    CardImageWrapper,
    CardImage,
    CardContent,
    CardTitle,
    CardSubInfo,
    CardPrice,
    ProductUid,
    ViewDetailButton,
    CalendarTextContainer,
    CalendarText,
    FilterSortBar,
    FilterSection,
    FilterLabel,
    FilterResetBtn,
    SortSection,
    SortBtn,
    PagingWrapper,
    PagingButton,
} from "../../style/search/SearchProductStyle";
import { GoCalendar, GoFilter } from "react-icons/go";
import { SaleStatus } from "../../style/product/StyleProductDetail"; // SaleStatus 임포트 추가

// 가격 포맷 함수
const formatPrice = (price) => {
    if (typeof price !== "number") return "가격 정보 없음";
    return new Intl.NumberFormat("ko-KR").format(price);
};


// 페이징 버튼 렌더링 함수
const renderPaginationButtons = (currentPage, totalPages, handlePageChange) => {
    const pageNumbers = [];
    const maxPageButtons = 10; // 한 번에 보여줄 페이지 버튼 개수

    // 시작 페이지와 끝 페이지 계산
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    // 만약 endPage가 maxPageButtons보다 작으면 startPage를 조정하여 항상 maxPageButtons 개수만큼 보이도록 함
    if (endPage - startPage + 1 < maxPageButtons) {
        startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    // 이전 페이지 버튼
    pageNumbers.push(
        <PagingButton key="prev" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            이전
        </PagingButton>
    );

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
            <PagingButton key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
                {i}
            </PagingButton>
        );
    }

    // 다음 페이지 버튼
    pageNumbers.push(
        <PagingButton key="next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            다음
        </PagingButton>
    );

    return pageNumbers;
};



function SearchProductCom({
                              products,
                              loading,
                              keyword,
                              handleSort,
                              handleFilterReset,
                              currentPage, // 페이징 props
                              totalPages,    // 페이징 props
                              handlePageChange, // 페이징 props
                              totalProducts // 전체 상품 개수 props
                          }) {

    const productStatusMap = { // productStatus 맵 추가
        ON_SALE: "판매 중",
        CLOSED: "판매 종료",
        SOLD_OUT: "매진",
    };

    return (
        <TourPageContainer>
            <TourHeader>“{keyword}” 검색 결과 ({totalProducts}개)</TourHeader> {/* 전체 상품 개수 표시 */}

            <FilterSortBar>
                <FilterSection>
                    <FilterLabel><GoFilter /> 필터</FilterLabel>
                    <FilterResetBtn onClick={handleFilterReset}>초기화 ⭮</FilterResetBtn>
                </FilterSection>
                <SortSection>
                    <SortBtn onClick={() => handleSort("low")}>낮은 가격순</SortBtn>
                    <SortBtn onClick={() => handleSort("high")}>높은 가격순</SortBtn>
                </SortSection>
            </FilterSortBar>

            {loading && <div style={{ textAlign: "center", fontSize: "1.2em", padding: "20px" }}>검색 중입니다...</div>}
            {!loading && products.length === 0 && <div style={{ textAlign: "center", fontSize: "1.2em", padding: "20px" }}>검색 결과가 없습니다.</div>}
            {!loading && products.length > 0 && (
                <div>
                    {products.map((p) => {
                        const displayStatusText = productStatusMap[p.productStatus]; // productStatus 맵 사용
                        return (
                            p.type === "product" && (
                                <TourCard key={p.productUid}>
                                    <CardImageWrapper>
                                        <CardImage
                                            src={p.productThumbnail?.startsWith('/static/')
                                                ? p.productThumbnail
                                                : `/upload/product/${p.productThumbnail}`}
                                            alt="상품 이미지"
                                            onError={(e) => { // 에러 핸들링 추가
                                                e.target.onerror = null;
                                                e.target.src = '/static/img/earth.jpg';
                                            }}
                                        />
                                    </CardImageWrapper>
                                    <CardContent>
                                        <CardSubInfo>
                                            <SaleStatus status={p.productStatus}> {/* SaleStatus 컴포넌트 사용 */}
                                                {displayStatusText}
                                            </SaleStatus>
                                            <ProductUid>상품번호 {p.productUid || '정보 없음'}</ProductUid>
                                        </CardSubInfo>
                                        <CardTitle>{p.title || "제목 없음"}</CardTitle>
                                        <CalendarText>{p.productContent || "내용 없음"}</CalendarText>
                                        <CardPrice>￦ {formatPrice(p.productAdult)}원</CardPrice>
                                        {(p.productStartDate || p.productEndDate) && (
                                            <CardSubInfo $noSpaceBetween>
                                                <GoCalendar size={24}/>
                                                <CalendarTextContainer>
                                                    <CalendarText>
                                                        출발 기간: {p.productStartDate || '미정'} ~ {p.productEndDate || '미정'}
                                                    </CalendarText>
                                                </CalendarTextContainer>
                                            </CardSubInfo>
                                        )}
                                        {p.productUid && (
                                            <Link to={`/products/${p.productUid}`} style={{ textDecoration: 'none' }}>
                                                <ViewDetailButton>자세히 보기</ViewDetailButton>
                                            </Link>
                                        )}
                                    </CardContent>
                                </TourCard>
                            )
                        );
                    })}
                </div>
            )}
            {/* 페이징 UI 렌더링 */}
            {!loading && totalPages > 1 && (
                <PagingWrapper>
                    {renderPaginationButtons(currentPage, totalPages, handlePageChange)}
                </PagingWrapper>
            )}

        </TourPageContainer>
    );
}

export default SearchProductCom;