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
    const [top3Reviews, setTop3Reviews] = useState([]);
    const [modalSortOption, setModalSortOption] = useState("date");     // 모달용
    const [previewSortOption, setPreviewSortOption] = useState("date"); // top3용
    const [averageRating, setAverageRating] = useState(0);

    // 미리보기 top3 리뷰
    useEffect(() => {
        const fetchTop3 = async () => {
            const sorted = await getReviewsByProductUid(productUid, previewSortOption);
            setTop3Reviews(sorted.slice(0, 3));
        };
        if (productUid) fetchTop3();
    }, [productUid, previewSortOption]);

    useEffect(() => {
        const fetchFullReviews = async () => {
            try {
                dispatch({ type: "SET_LOADING", data: true });
                const sortOption = state.sortOption || "date";
                const reviews = await getReviewsByProductUid(productUid, modalSortOption);
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
            fetchFullReviews();
        }
    }, [productUid, modalSortOption]);

    const handleSortChange = (sortOption) => {
        dispatch({ type: "SET_SORT_OPTION", data: sortOption });
    };

    return(
        <>
            <ProductReviewCom
                top3Reviews={top3Reviews}
                previewSortOption={previewSortOption}
                onPreviewSortChange={setPreviewSortOption}
                reviews={state.reviews}
                modalSortOption={modalSortOption}
                onModalSortChange={setModalSortOption}
                loading={state.loading}
                error={state.error}
                averageRating={state.averageRating || 0}
                reviewCount={state.reviewCount || 0}
            />
        </>)
}
export default ProductReviewCon;