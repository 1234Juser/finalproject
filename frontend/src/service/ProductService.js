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
    // console.log("response--->" , response);
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
    console.log("response--->" , response);
    return response.json();
}


// 국가별 도시 데이터 가져오는 함수
const getCitiesByCountry = async (countryCode) => {

    const response = await fetch(`${path}/cities/${countryCode}`, {
        method : "GET"
    })
    console.log("response--->" , response);
    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`); // 요청 실패 시 에러 출력
    }
    return response.json();
}



// 국가별 투어 상품 데이터 가져오는 함수
const getProductsByCountry = async (countryCode) => {
    console.log("요청 받은 cityCode : ", countryCode);
    const response = await fetch(`${path}/products/country?countrycode=${countryCode}`, {
        method : "GET"
    });
    console.log("getProductsByCity response data:::: : ", response.data);
    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`); // 요청 실패 시 에러 출력
    }

    return response.json();
}



// 도시별 투어 상품 데이터 가져오는 함수
const getProductsByCity = async (cityCode) => {
    console.log("요청 받은 cityCode : ", cityCode);
    const response = await fetch(`${path}/products/city?citycode=${cityCode}`, {
        method : "GET"
    });
    console.log("getProductsByCity response data:::: : ", response.data);
    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`); // 요청 실패 시 에러 출력
    }

    return response.json();
}

export {getProductsList, getDomList, getIntlList, getCountryList, getCitiesByCountry, getProductsByCountry, getProductsByCity};