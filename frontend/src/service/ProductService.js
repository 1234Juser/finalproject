const path = "http://localhost:8080"

// tbl_product 전체 데이터 가져오는 함수
const getProductsList = async () => {
    const response = await fetch(`${path}/products`, {
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


// 국가별 도시 데이터 가져오는 함수 (해외여행용)
const getCitiesByCountry = async (countryCode) => {

    const response = await fetch(`${path}/cities/${countryCode}`, {
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
        console.log("요청 받은 countryId : ", countryId);
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
        console.log("요청 받은 cityId : ", cityId);
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
const getProductDetail = async (productUid) => {
    try {
        console.log("productUid : ", productUid);
        const response = await fetch(`${path}/products/${productUid}`, {
            method : "GET"
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("백엔드로부터 받은 data : ", data);
        return data;
    } catch (error) {
        console.error("상품 상세 데이터 조회 중 에러 발생 : ", error);
        throw error;
    }
}


// 상품 등록 함수
const ProductRegist = async (formData) => {
    try {
        const response = await fetch(`${path}/products/register`, {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(formData),
        })
        console.log("response", response);

        if( response.ok) {
            const result = await response.json();
            alert(`등록 성공 : ${result.message}`);
        } else {
            const errorData = await response.json();
            alert(`등록 실패: ${errorData.message}`);
        }

    } catch (error) {
        console.error("등록 에러 발생 !!!", error);
        
    }
}


// ------------- 관리자 페이지 내 상품 등록용 함수
// 권역 데이터 불러오기
const getRegions = async (regionType) => {
    try {
        console.log("regionType : ", regionType);
        const response = await fetch(`${path}/region/${regionType}`, {
            method : "GET"
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("백엔드로부터 받은 data : ", data);
        return data;
    } catch (error) {
        console.error("권역 데이터 조회 중 에러 발생 : ", error);
        throw error;
    }
}


export {getProductsList, getDomList, getIntlList, getCountryList, getCitiesByCountry, getCitiesByRegion, 
    getProductsByCountry, getProductsByCity, getProductDetail,
    ProductRegist,
    getRegions,
};