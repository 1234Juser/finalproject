import ProductReviewCom from "../../components/review/ProductReviewCom";
import {useEffect, useReducer, useState} from "react";
import {initialState, reducer} from "../../modules/reviewModule";
import {
    getAverageRatingByProductUid,
    getReviewCountByProductUid,
    getReviewsByProductUid
} from "../../service/reviewService";

function ProductReviewCon({ productUid }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                dispatch({ type: "SET_LOADING", data: true });
                const sortOption = state.sortOption || "date";
                const reviews = await getReviewsByProductUid(productUid, sortOption);
                // const reviews = await getReviewsByProduct(productCode, state.sortOption);
                dispatch({ type: "SET_REVIEWS", data: reviews });

                const average = await getAverageRatingByProductUid(productUid);
                dispatch({ type: "SET_AVERAGE_RATING", data: average || 0 });

                const reviewCount = await getReviewCountByProductUid(productUid);
                dispatch({ type: "SET_REVIEW_COUNT", data: reviewCount || 0 });

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

    //     const fetchAverageRating = async () => {
    //         try {
    //             const average = await getAverageRatingByProductUid(productUid);
    //             console.log("평균 평점:", average);
    //             setAverageRating(average || 0);
    //         } catch (error) {
    //             console.error("평균 평점 로딩 실패:", error);
    //         }
    //     };
    //
    //     if (productUid) {
    //         fetchReviews();
    //         fetchAverageRating();
    //     }
    // }, [productUid, state.sortOption]);

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
                averageRating={state.averageRating || 0}
                reviewCount={state.reviewCount || 0}
            />
        </>)
}
export default ProductReviewCon;