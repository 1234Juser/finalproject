import ProductReviewCom from "../../components/review/ProductReviewCom";
import {useEffect, useReducer} from "react";
import {initialState, reducer} from "../../modules/reviewModule";
import {getReviewsByProductUid} from "../../service/reviewService";

function ProductReviewCon({ productUid }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                dispatch({ type: "SET_LOADING", data: true });
                const sortOption = state.sortOption || "date";
                const reviews = await getReviewsByProductUid(productUid, sortOption);
                // const reviews = await getReviewsByProduct(productCode, state.sortOption);
                dispatch({ type: "SET_REVIEWS", data: reviews });
            } catch (error) {
                dispatch({ type: "SET_ERROR", data: error.message });
            } finally {
                dispatch({ type: "SET_LOADING", data: false });
            }
        };

        if (productUid) {
            fetchReviews();
        }
    }, [productUid, state.sortOption]);

    const handleSortChange = (sortOption) => {
        dispatch({ type: "SET_SORT_OPTION", data: sortOption });
    };

    return(
        <>
            <ProductReviewCom
                reviews={state.reviews}
                loading={state.loading}
                error={state.error}
                sortOption={state.sortOption || "date"}  // 기본값 설정
                onSortChange={handleSortChange}
            />
        </>)
}
export default ProductReviewCon;