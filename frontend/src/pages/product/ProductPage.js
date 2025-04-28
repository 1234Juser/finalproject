import ProductCon from "../../containers/product/ProductCon";

function ProductPage() {
    return (
        <>
            <h2>도시 별 상품 페이지</h2>
            <p>해당 도시의 상품 리스트를 확인하세요.</p>
            <ProductCon/>
        </>
    )
}

export default ProductPage;