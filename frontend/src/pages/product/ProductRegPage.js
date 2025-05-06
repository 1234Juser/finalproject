import ProductRegCon from "../../containers/product/ProductRegCon";
import {useParams} from "react-router-dom";

function ProductRegPage() {

    const  {productUid} = useParams()

    return (
        <>
            <ProductRegCon productUid={productUid}/>
        </>
    )
}

export default ProductRegPage;