import axios from "axios";

const path ="http://localhost:8080";

// 상품 상세페이지 내 해당 상품의 전체 리뷰 조회(디폴트 작성일 내림차순)
// export async function getReviewsByProduct(productCode, sort = "date") {
//     const response = await axios.get(`${path}/review/product/${productCode}`, {
//         method: "GET",
//         headers: {
//             "Content-Type":"application/json",
//         }
//     });
//     return await response.json();
// }
const getReviewsByProduct = async (productCode, sort = "date") => {
    return fetch( path+"/review/product/${productCode}", {method:"get"} )
}

// 로그인 된 회원의 선택 주문에 대한 본인 작성 리뷰 조회
// export async function getMyReview(orderCode) {
//     const response = await axios.get(`${path}/review/mytravel/0/${orderCode}`);
//     return response.data;
// }
// const getMyReview = async (orderCode, token) => {
//     return fetch( path+"/review/mytravel/${orderCode}", {method:"get"} )
// }
export async function getReviewByOrderCode(orderCode) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${path}/review/view/${orderCode}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        console.log("리뷰 불러오기 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("리뷰 불러오기 실패:", error);
        throw error;
    }
}

// 리뷰 작성을 위한 주문 정보
export async function getInfoForWriteReview(orderCode) {
    const token = localStorage.getItem("accessToken");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await axios.get(`${path}/review/write/info/${orderCode}`, config);
    return res.data;
}

// 리뷰 작성
export async function writeReview({ orderCode, reviewRating, reviewContent, file }) {
    const formData = new FormData();
    formData.append("orderCode", orderCode);
    formData.append("reviewRating", reviewRating);
    formData.append("reviewContent", reviewContent);
    if (file) {
        formData.append("file", file);
    }
    try {
        const response = await fetch(`${path}/review/write`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "리뷰 등록 실패");
        }

        return await response.json();
        // const result = await response.json();
        // return result;
    } catch (error) {
        console.error("리뷰 등록 실패:", error);
        throw error;
    }
}

// 리뷰 수정
export async function updateReview({ reviewCode, reviewRating, reviewContent, file, formData, token }) {
    if (!token) {
        console.error("Token does not exist in localStorage");
        return;
    }
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.put(`${path}/review/edit/${reviewCode}`, formData, config);
        console.log("Modify Success:", response.data);
        return response;
    } catch (error) {
        console.error("Modify Failed", error.response?.data || error.message);
        throw error;
    }
    // const formData = new FormData();
    // formData.append("reviewRating", reviewRating);
    // formData.append("reviewContent", reviewContent);
    // if (file) {
    //     formData.append("file", file);
    // }
    // const res = await axios.put(`${path}/review/edit/${reviewCode}`, formData, {
    //     headers: { "Content-Type": "multipart/form-data" }
    // });
    // return res.data;
}

// 리뷰 전송
export const submitReview = async (orderCode, reviewRating, reviewContent, file) => {
    try {
        const formData = new FormData();
        formData.append("orderCode", orderCode);
        formData.append("reviewRating", reviewRating);
        formData.append("reviewContent", reviewContent);
        if (file) {
            formData.append("file", file);
        }

        const response = await axios.post(`${path}/review/write`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });

        console.log("리뷰 등록 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("리뷰 등록 실패:", error.response?.data || error.message);
        throw error;
    }
};

// 본인의 리뷰 삭제
export async function deleteMyReview(reviewCode) {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("로그인이 필요합니다.");
        }

        const res = await axios.delete(`http://localhost:8080/review/delete/${reviewCode}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res.data;
    } catch (error) {
        console.error("리뷰 삭제 실패:", error);
        throw error;
    }
}

// 관리자의 전체 리뷰 조회
export async function getAllReviewsForAdmin() {
    const res = await axios.get("${path}/admin/manage/review");
    return res.data;
}

// 관리자의 상품별 리뷰 조회
export async function getReviewsByProductForAdmin(productCode) {
    const res = await axios.get(`${path}/admin/manage/review/by-product/${productCode}`);
    return res.data;
}

// 관리자의 리뷰 삭제
export async function deleteReviewByAdmin(reviewCode) {
    const res = await axios.patch(`${path}/admin/manage/reviews/${reviewCode}`);
    return res.data;
}

export async function getReviewImage(reviewPic) {
    const res = await axios.get(`${path}/review/${reviewPic}/image`, {
        responseType: "blob"
    });
    return res.data; // Blob으로 반환됨 (이미지 표시 시 필요)
}