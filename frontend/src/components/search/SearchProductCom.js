import { Link } from "react-router-dom";
import styled from "styled-components";
import { GoCalendar } from "react-icons/go"; // GoCalendar 아이콘 import

// ProductCom과 유사한 스타일 컴포넌트 정의 (일부 기존 스타일 재사용 및 추가)
const TourPageContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
`;

const TourHeader = styled.h2`
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.8em;
`;

const TourCard = styled.div`
    display: flex;
    border: 1px solid #e0e0e0;
    margin-bottom: 25px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: translateY(-5px);
    }
`;

const CardImageWrapper = styled.div`
    flex-shrink: 0;
    width: 220px;
    height: 220px; /* 이미지 높이 조정이 필요하면 변경 */
    overflow: hidden;
`;

const CardImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const CardContent = styled.div`
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const CardTitle = styled.h3`
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 1.4em;
    color: #333;
`;

const CardDescription = styled.p`
    font-size: 0.9em;
    color: #555;
    line-height: 1.5;
    margin-bottom: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 설명 두 줄 제한 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: calc(1.5em * 2); /* 두 줄 높이 확보 */
`;

const CardExtraInfo = styled.div`
    font-size: 0.85em;
    color: #777;
    margin-bottom: 8px;
`;

const CardPrice = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    color: #007bff;
    margin-bottom: 12px;
`;

const CardSubInfo = styled.div`
    display: flex;
    align-items: center;
    font-size: 0.9em;
    color: #555;
    margin-bottom: 15px;

    svg { /* 아이콘 스타일 */
        margin-right: 8px;
        color: #007bff;
    }
`;

const CalendarTextContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const CalendarText = styled.span`
    font-size: 0.9em;
`;

const ViewDetailButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: bold;
    align-self: flex-start;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

// 가격 포맷 함수
const formatPrice = (price) => {
    if (typeof price !== "number") return "가격 정보 없음";
    return new Intl.NumberFormat("ko-KR").format(price);
};

function SearchProductCom({ products, loading, keyword }) {
    // products는 SearchDTO[] 타입으로 가정합니다.
    // SearchDTO에는 title, description, extraInfo, productUid, productAdult, productStartDate, productEndDate가 포함됩니다.

    return (
        <TourPageContainer>
            <TourHeader>“{keyword}” 검색 결과</TourHeader>
            {loading && <div style={{ textAlign: "center", fontSize: "1.2em", padding: "20px" }}>검색 중입니다...</div>}
            {!loading && products.length === 0 && <div style={{ textAlign: "center", fontSize: "1.2em", padding: "20px" }}>검색 결과가 없습니다.</div>}
            {!loading && products.length > 0 && (
                <div>
                    {products.map((p) => (
                        // p는 SearchDTO 객체입니다. type이 'product'인 경우를 가정합니다.
                        // 다른 type(city, country 등)의 결과도 있다면, p.type에 따라 다른 렌더링을 할 수 있습니다.
                        p.type === "product" && ( // 상품 타입인 경우에만 렌더링 (다른 타입은 다른 UI 필요)
                            <TourCard key={p.productUid}>
                                <CardImageWrapper>
                                    {/* SearchDTO에 imageUrl 필드가 있다면 p.imageUrl 사용, 없다면 기본 이미지 */}
                                    <CardImage src={p.imageUrl || "/static/img/earth.jpg"} alt={p.title || "상품 이미지"} />
                                </CardImageWrapper>
                                <CardContent>
                                    <div>
                                        <CardTitle>{p.title || "제목 없음"}</CardTitle>
                                        <CardDescription>{p.description || "설명 없음"}</CardDescription>
                                        {p.extraInfo && <CardExtraInfo>위치: {p.extraInfo}</CardExtraInfo>}
                                        <CardPrice>￦ {formatPrice(p.productAdult)}원</CardPrice>
                                        {(p.productStartDate || p.productEndDate) && (
                                            <CardSubInfo>
                                                <GoCalendar size={20}/>
                                                <CalendarTextContainer>
                                                    <CalendarText>
                                                        출발 기간: {p.productStartDate || '미정'} ~ {p.productEndDate || '미정'}
                                                    </CalendarText>
                                                </CalendarTextContainer>
                                            </CardSubInfo>
                                        )}
                                    </div>
                                    {p.productUid && (
                                        <Link to={`/products/${p.productUid}`} style={{ textDecoration: 'none' }}>
                                            <ViewDetailButton>자세히 보기</ViewDetailButton>
                                        </Link>
                                    )}
                                </CardContent>
                            </TourCard>
                        )
                    ))}
                </div>
            )}
        </TourPageContainer>
    );
}

export default SearchProductCom;