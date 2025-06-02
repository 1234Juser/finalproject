import axios from "axios";

// const path = "http://localhost:8080"
const path = "https://api.hellotravelogic.link";

export const getReviewCountByProductUid = async (productUid) => {
    try {
        const response = await fetch(`${path}/review/product/${productUid}/count`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`리뷰 개수 조회 실패: ${response.status}`);
        }

        const reviewCount = await response.json();
        return reviewCount;
    } catch (error) {
        throw error;
    }
};
export const getAverageRatingByProductUid = async (productUid) => {
    try {
        const response = await fetch(`${path}/review/product/${productUid}/average`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`평균 평점 조회 실패: ${response.status}`);
        }

        const averageRating = await response.json();
        return averageRating;
    } catch (error) {
        throw error;
    }
};

// 상품 상세페이지 내 해당 상품의 전체 리뷰 조회(디폴트 작성일 내림차순)
export const getReviewsByProductUid = async (productUid, sort = "date") => {
    try {
        const response = await fetch(`${path}/review/product/${productUid}?sort=${sort}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`리뷰 조회 실패: ${response.status}`);
        }

        // const reviews = await response.json();
        // return reviews;
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// 로그인 된 회원의 선택 주문에 대한 본인 작성 리뷰 조회
export async function getReviewByOrderCode(orderCode, accessToken) {
    if (!accessToken) {
        return;
    }
    try {
        const response = await axios.get(`${path}/review/view/${orderCode}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const review = response.data;
        if (!review.reviewStatus) {
            console.warn("리뷰 상태가 설정되지 않았습니다:", review);
        }
        return review;
    } catch (error) {
        throw error;
    }
}

// 리뷰 작성을 위한 주문 정보
export async function getInfoForWriteReview(orderCode, accessToken) {
    if (!accessToken || accessToken === "null" || accessToken === "undefined") {
        throw new Error("accessToken 없음");
    }
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };
    try {
        const res = await axios.get(`${path}/review/write/info/${orderCode}`, config);
        return res.data;
    } catch (error) {
        throw error;
    }
}

// 리뷰 수정을 위한 리뷰 정보
export async function getReviewByReviewCode(reviewCode, accessToken) {
    if (!accessToken) {
        return;
    }
    try {
        const response = await axios.get(`${path}/review/edit/${reviewCode}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 리뷰 수정
export async function updateReview({ reviewCode, formData, accessToken }) {
    if (!accessToken) {
        return;
    }
    try {
        const response = await axios.put(`${path}/review/edit/${reviewCode}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
}

// 리뷰 작성(전송)
export const submitReview = async (orderCode, reviewRating, reviewContent, file, accessToken) => {
    if (!accessToken || accessToken === "null" || accessToken === "undefined") {
        throw new Error("accessToken 없음");
    }
    try {
        const formData = new FormData();
        // formData.append("orderCode", orderCode);
        formData.append("reviewRating", reviewRating);
        formData.append("reviewContent", reviewContent);
        if (file) {
            formData.append("reviewPic", file);
        } else {
            formData.append("reviewPic", "");  // 빈 파일 대체
        }

        const response = await axios.post(`${path}/review/write/${orderCode}`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 본인의 리뷰 삭제
export async function deleteMyReview(reviewCode, accessToken) {
    if (!accessToken) {
        return;
    }
    try {
        const response = await axios.delete(`${path}/review/delete/${reviewCode}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (response.status === 200 || response.status === 204) {
            return response.data;
        } else {
            throw new Error("리뷰 삭제가 실패했습니다.");
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error("리뷰가 이미 삭제되었거나 존재하지 않습니다.");
        }
        throw new Error("리뷰 삭제 중 오류가 발생했습니다.");
    }
}

// 관리자의 전체 리뷰 조회
export async function getAllReviewsForAdmin(accessToken, start = 1) {
    try {
        if (!accessToken) {
            return;
        }
        const response = await axios.get(`${path}/admin/review?start=${start}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 관리자의 상품별 리뷰 조회
export async function getReviewsByProductForAdmin(productCode, accessToken, start = 1) {
    if (!accessToken) {
        return;
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        params: { start }
    };
    try {
        if (productCode == null) {
            const response = await axios.get(`${path}/admin/review`, config);
            return response.data;
        } else {
            config.params.productCode = productCode;
            const response = await axios.get(`${path}/admin/review/by-product/${productCode}`, config);
            return response.data;
        }
    } catch (error) {
        throw error;
    }

}

// 관리자의 리뷰 삭제
export async function deleteReviewByAdmin(reviewCode, accessToken) {
    if (!accessToken) {
        return;
    }
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const response = await axios.patch(`${path}/admin/review/delete/${reviewCode}`, {}, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 상품 목록 조회 (관리자 예약 필터용)
export async function fetchProductListForFilter(accessToken) {
    if (!accessToken) {
        return [];
    }

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };

    try {
        const res = await axios.get(`${path}/admin/review/products`, config);
        // return res.data;
        // 배열 형태로 반환
        if (Array.isArray(res.data)) {
            return res.data;
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
}

export async function getReviewImage(reviewPic) {
    try {
        const res = await axios.get(`${path}/review/${reviewPic}/image`, {
            responseType: "blob"
        });
        return res.data; // Blob으로 반환됨 (이미지 표시 시 필요)
    } catch (error) {
        throw error;
    }
}