import {Link} from "react-router-dom";

function ProductCom({products}){

    return (
        <>
        <h3> 투어 상품 리스트</h3>
            {products.map((p, i) => (
                <Link to={`/products/${p.productUid}`}>
                    <div key={i} style={{border: "1px solid #ddd", padding: "10px", margin: "10px 0"}}>
                    <h4>{p.productTitle}</h4> {/* 상품 제목 */}
                    {/*<img src={`/images/${p.productThumbnail}`} alt={p.productTitle} style={{width: "100px", height: "100px"}} /> /!* 상품 썸네일 *!/*/}
                    {/* <p><strong>상품 유형:</strong> {p.productType}</p> */}
                    {/* <p><strong>상품 코드:</strong> {p.productCode}</p> */}
                    {/* <p><strong>테마 코드:</strong> {p.themeCode}</p> */}
                    <p><strong>성인 가격:</strong> {p.productAdult}원</p>
                    {/* <p><strong>어린이 가격:</strong> {p.productChild}원</p> */}
                    {/* <p><strong>설명:</strong> {p.productContent}</p> */}
                    <p><strong>최소 참가자:</strong> {p.productMinParticipants}명</p>
                    {/* <p><strong>최대 참가자:</strong> {p.productMaxParticipants}명</p> */}
                    <p><strong>판매 상태:</strong> {p.productStatus}</p>
                    <p><strong>여행 시작일:</strong> {p.productStartDate}</p>
                    <p><strong>여행 종료일:</strong> {p.productEndDate}</p>
                    {/* <p><strong>도시 코드:</strong> {p.cityCode}</p> */}
                    {/* <p><strong>국가 코드:</strong> {p.countryCode}</p> */}
                </div>
                </Link>
            ))}
        </>
    )
}

export default ProductCom;