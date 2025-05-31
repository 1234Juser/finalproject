const path = "http://localhost:8080";

// tbl_product 전체 데이터 가져오는 함수
const getProductsList = async (currentPage) => {
    const response = await fetch(`${path}/products?start=${currentPage}`, {
        method : "GET"
    });
    return response.json();
}

// 국내여행 권역 데이터 가져오는 함수
const getDomList = async () => {
    const response = await fetch(`${path}/domestic`, {
        method : "GET"
    });
    return response.json();
}

// 해외여행 대륙 데이터 가져오는 함수
const getIntlList = async () => {
    const response = await fetch(`${path}/international`, {
        method : "GET"
    });
    return response.json();
}


// 대륙별 국가 데이터 가져오는 함수
const getCountryList = async (regionCode) => {
    const response = await fetch(`${path}/country/${regionCode}`, {
        method : "GET"
    });
    return response.json();
}


// 도시 데이터 가져오는 함수
const getCityById = async (cityId) => {
    const response = await fetch(`${path}/city/${cityId}`, {
        method : "GET"
    });
    return response.json();
}


// 국가별 도시 데이터 가져오는 함수 (해외여행용)
const getCitiesByCountry = async (countryId) => {
    const response = await fetch(`${path}/cities/${countryId}`, {
        method : "GET"
    })
    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`); 
    }
    return response.json();
}


// 권역별 도시 데이터 가져오는 함수 (국내여행용)
const getCitiesByRegion = async (regionCode) => {
    try {
        const response = await fetch(`${path}/cities/region/${regionCode}`, {
            method : "GET"
        })
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`); 
        }
        return response.json();

    } catch (error) {
        console.error("도시 조회 중 에러 발생 : ", error);
        throw error;
    }
}


// 국가별 투어 상품 데이터 가져오는 함수
const getProductsByCountry = async (countryId) => {
    try {
        const response = await fetch(`${path}/products/country?country_id=${countryId}`, {
            method : "GET"
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`); 
        }
        return response.json();

    } catch (error) {
        console.error("국가별 투어 상품 데이터 조회 중 에러 발생 : ", error);
        throw error;
    }
}


// 도시별 투어 상품 데이터 가져오는 함수
const getProductsByCity = async (cityId) => {
    try {
        const response = await fetch(`${path}/products/city?city_id=${cityId}`, {
            method : "GET"
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("도시별 투어 상품 데이터 조회 중 에러 발생 : ", error);
        throw error;
    }

}


// 상품 상세 데이터 가져오는 함수
const getProductDetail = async (productUid, accessToken) => {
    try {
        const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
        const response = await fetch(`${path}/products/${productUid}`, {
            method : "GET",
            headers: headers
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("상품 상세 데이터 조회 중 에러 발생 : ", error);
        throw error;
    }
}


// ------------- 관리자 페이지 내 상품 관리용 함수
// 권역 데이터 불러오기
const getRegions = async (regionType) => {
    try {
        const response = await fetch(`${path}/region/${regionType}`, {
            method : "GET"
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("권역 데이터 조회 중 에러 발생 : ", error);
        throw error;
    }
}


// 테마 목록 불러오기
const getThemes = async () => {
        const response = await fetch(`${path}/themes`, {
            method : "GET"
        });
        return response.json();
}


// 상품 등록 함수
const ProductRegist = async (formData) => {
    console.log("ProductRegist 함수 호출됨"); // <-- 함수 호출 확인 로그
    try {
        const response = await fetch(`${path}/products/register`, {
            method : "POST",
            body : formData
        })

        if( response.ok) {
            const result = await response.text();
            console.log('상품 등록 함수 확인 result----->', result);
            return { ok: true, message: result };
        } else {
            const errorData = await response.json();  // 실패시 JSON 응답 처리
            return { ok: false, message: errorData.message };
        }

    } catch (error) {
        console.error("등록 에러 발생 !!!", error);
        return { ok: false, message: "등록 중 오류가 발생했습니다." };
        
    }
}

// 수정용 데이터 불러오기
const getProductModify = async (productUid) => {
    try {
        const response = await fetch(`${path}/products/admin/${productUid}`, {
            method : "GET"
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("데이터 불러오기 실패!! : ", error);
        throw error;
    }
}

// 수정하기
const setProductModify = async (productUid, formData) => {
    try {
        const response = await fetch(`${path}/products/admin/${productUid}`, {
            method: "PUT",
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("수정 실패 ㅠㅠ다시 확인하세요 : ", error);
        throw error;
    }
}


// 삭제하기
const ProductDelete = (productUid) => {
    return fetch(`${path}/products/admin/${productUid}`, {
            method: "DELETE",
    });
}


//  ------------- 상품 관련 부가 기능 함수
// 찜 추가하기
const toggleWish = async (product, accessToken) => {
    try {
        if (!accessToken) {
            const currentPath = window.location.pathname;
            alert("로그인이 필요합니다.");
            window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
            return;
        }
        const response = await fetch(`/wish/toggle/${product.productCode}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({})
        });

        if (!response.ok) {
            throw new Error(`찜 요청 실패: ${response.status}`);
        }

        const data = await response.text(); // 응답이 "LIKED" 또는 "UNLIKED" 문자열일 경우
        console.log("찜 응답:", data);
        return data;
    } catch (error) {
        console.error("찜 토글 실패", error.message);
        throw error;
    }
};

// 랜덤 광고 상품 6개 가져오기
export const fetchAdProducts = async () => {
    try {
        const response = await fetch(`${path}/products/ads`, {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error(`광고 상품 응답 오류: ${response.status}`);
        }
        return response.json();
    } catch (err) {
        console.error("광고 상품 fetch 실패:", err);
        throw err;
    }
};

export {
    getProductsList, getDomList, getIntlList, getCountryList, getCityById, getCitiesByCountry, getCitiesByRegion,
    getProductsByCountry, getProductsByCity, getProductDetail, ProductRegist,
    getRegions, getThemes, toggleWish, getProductModify, setProductModify, ProductDelete
};