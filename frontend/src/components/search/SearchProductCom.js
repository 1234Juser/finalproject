import { Link } from "react-router-dom";

function SearchProductCom({ products, loading, keyword }) {
    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
            <h2>“{keyword}” 검색 결과</h2>
            {loading && <div>검색 중입니다...</div>}
            {!loading && products.length === 0 && <div>검색 결과가 없습니다.</div>}
            {!loading && products.length > 0 && (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {products.map((p) => (
                        <li key={p.productUid} style={{border: "1px solid #ddd", margin: "12px 0", padding: 24}}>
                            <Link to={`/products/${p.productUid}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <strong>{p.productTitle}</strong>
                                <div>여행기간: {p.productStartDate} ~ {p.productEndDate}</div>
                                <div>도시: {p.cityName} / 가격: {p.productAdult ? `₩ ${p.productAdult.toLocaleString()}원` : "-"}</div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchProductCom;