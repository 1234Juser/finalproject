import {Link} from "react-router-dom";

function ProductCom({products}){

    return (
        <>
        <h3> 투어 상품 리스트</h3>
            {products.map((p, i) => (
                <Link to={`/products/${p.productUid}`} key={p.productUid}>
                    <div style={{border: "1px solid #ddd", padding: "10px", margin: "10px 0"}}>
                    <h4>{p.productTitle}</h4> 
                    <p><strong>성인 가격:</strong> {p.productAdult}원</p>
                    <p><strong>최소 참가자:</strong> {p.productMinParticipants}명</p>
                    <p><strong>판매 상태:</strong> {p.productStatus}</p>
                    <p><strong>여행 시작일:</strong> {p.productStartDate}</p>
                    <p><strong>여행 종료일:</strong> {p.productEndDate}</p>

                </div>
                </Link>
            ))}
        </>
    )
}

export default ProductCom;