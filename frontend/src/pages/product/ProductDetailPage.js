import ProductDetailCon from "../../containers/product/ProductDetailCon";

function ProductDetailPage() {
    const accessToken = localStorage.getItem("accessToken");

    return (
        <>
            <ProductDetailCon accessToken={accessToken}/>
        </>
    )
}

export default ProductDetailPage