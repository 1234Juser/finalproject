import ProductDetailCon from "../../containers/product/ProductDetailCon";
import ProductReviewCon from "../../containers/review/ProductReviewCon";

function ProductDetailPage() {
    const accessToken = localStorage.getItem("accessToken");

    return (
        <>
            <ProductDetailCon accessToken={accessToken}/>
        </>
    )
}

export default ProductDetailPage