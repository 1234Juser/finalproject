import React, {useEffect, useReducer, useState} from "react";
import {deleteMyReview, getReviewByOrderCode} from "../../service/reviewService";
import MyReviewModalCom from "../../components/review/MyReviewModalCom";
import {initialState, reducer} from "../../modules/reviewModule";

function MyReviewModalCon({ orderCode, onClose, accessToken }) {
    const [review, setReview] = useState(null);
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (!orderCode || !accessToken) return;

        const fetchReview = async () => {
            try {
                const data = await getReviewByOrderCode(orderCode, accessToken);
                setReview(data);
            } catch (error) {
                console.error("리뷰 불러오기 실패:", error);
            }
        };

        fetchReview();
    }, [orderCode, accessToken]);

    const handleDelete = async () => {
        if (window.confirm("정말 이 리뷰를 삭제하시겠습니까?")) {
            try {
                await deleteMyReview(review.reviewCode, accessToken);
                dispatch({ type: "REMOVE_REVIEW", payload: review.reviewCode });
                alert("리뷰가 삭제되었습니다.");
                onClose();  // 모달 닫기
                // window.location.reload();  // 페이지 새로고침
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            } catch (error) {
                alert(error.message || "리뷰 삭제에 실패했습니다.");
            }
        }
    };

    if (!review) return null;

    return(
        <>
            {review ? (
                <MyReviewModalCom review={review} onClose={onClose} onDelete={handleDelete} />
            ) : (
                <div>Loading...</div>
            )}
        </>)
}

export default MyReviewModalCon;
