import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomizeCom from "../../components/customize/CustomizeCom";
import {useNavigate} from "react-router-dom";

function CustomizeCon(){
    const [customizeConditions, setCustomizeConditions] = useState({
        startDate: '',
        endDate: '',
        countryId: '',
        cityId: '',
        themeCode: '', // themeCodes를 배열로 변경
        adultCount: 0,
        childCount: 0,
        minPrice: 0,
        maxPrice: 0,
        productType: '' // productTypes는 배열로 유지
    });

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});

    const navigate = useNavigate(); // useNavigate 훅 사용


    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        if (customizeConditions.countryId) {
            fetchCitiesByCountry(customizeConditions.countryId);
        } else {
            setCities([]);
            setCustomizeConditions(prevState => ({
                ...prevState,
                cityId: ''
            }));
        }
    }, [customizeConditions.countryId]);


    const fetchCountries = async () => {
        try {
            const countriesList = [
                { countryId: 1, countryNameKr: '대한민국' }, { countryId: 2, countryNameKr: '일본' },
                { countryId: 3, countryNameKr: '태국' }, { countryId: 4, countryNameKr: '프랑스' },
                { countryId: 5, countryNameKr: '이탈리아' }, { countryId: 6, countryNameKr: '미국' },
                { countryId: 7, countryNameKr: '몰디브' }, { countryId: 8, countryNameKr: '호주' },
                { countryId: 9, countryNameKr: '아랍에미리트' }, { countryId: 10, countryNameKr: '남아프리카공화국' },
                { countryId: 11, countryNameKr: '캐나다' }, { countryId: 12, countryNameKr: '중국' },
                { countryId: 13, countryNameKr: '스페인' }, { countryId: 14, countryNameKr: '베트남' },
                { countryId: 15, countryNameKr: '독일' }, { countryId: 16, countryNameKr: '이집트' },
                { countryId: 17, countryNameKr: '뉴질랜드' }, { countryId: 18, countryNameKr: '브라질' },
                { countryId: 19, countryNameKr: '인도네시아' }, { countryId: 20, countryNameKr: '영국' },
                { countryId: 21, countryNameKr: '멕시코' }, { countryId: 22, countryNameKr: '필리핀' },
                { countryId: 23, countryNameKr: '스웨덴' }, { countryId: 24, countryNameKr: '아르헨티나' },
                { countryId: 25, countryNameKr: '싱가포르' }, { countryId: 26, countryNameKr: '스위스' }
            ];
            setCountries(countriesList);
        } catch (error) {
            console.error("국가 목록 가져오기 오류:", error);
        }
    };


    const fetchCitiesByCountry = async (countryId) => {
        try {
            const allCities = [
                { cityId: 1, countryId: 1, cityNameKR: '서울' }, { cityId: 2, countryId: 1, cityNameKR: '부산' },
                { cityId: 3, countryId: 1, cityNameKR: '제주' }, { cityId: 4, countryId: 1, cityNameKR: '강릉' },
                { cityId: 5, countryId: 1, cityNameKR: '대전' }, { cityId: 6, countryId: 1, cityNameKR: '인천' },
                { cityId: 7, countryId: 1, cityNameKR: '춘천' }, { cityId: 8, countryId: 1, cityNameKR: '수원' },
                { cityId: 9, countryId: 1, cityNameKR: '청주' }, { cityId: 10, countryId: 1, cityNameKR: '대구' },
                { cityId: 11, countryId: 1, cityNameKR: '전주' }, { cityId: 12, countryId: 1, cityNameKR: '경주' },
                { cityId: 13, countryId: 1, cityNameKR: '광주' }, { cityId: 14, countryId: 1, cityNameKR: '울산' },
                { cityId: 15, countryId: 2, cityNameKR: '도쿄' }, { cityId: 16, countryId: 2, cityNameKR: '오사카' },
                { cityId: 17, countryId: 3, cityNameKR: '방콕' }, { cityId: 18, countryId: 4, cityNameKR: '파리' },
                { cityId: 19, countryId: 5, cityNameKR: '로마' }, { cityId: 20, countryId: 6, cityNameKR: '뉴욕' },
                { cityId: 21, countryId: 7, cityNameKR: '말레' }, { cityId: 22, countryId: 8, cityNameKR: '시드니' },
                { cityId: 23, countryId: 9, cityNameKR: '두바이' }, { cityId: 24, countryId: 10, cityNameKR: '케이프타운' },
                { cityId: 25, countryId: 11, cityNameKR: '토론토' }, { cityId: 26, countryId: 12, cityNameKR: '베이징' },
                { cityId: 27, countryId: 12, cityNameKR: '상하이' }, { cityId: 28, countryId: 12, cityNameKR: '광저우' },
                { cityId: 29, countryId: 13, cityNameKR: '마드리드' }, { cityId: 30, countryId: 13, cityNameKR: '바르셀로나' },
                { cityId: 31, countryId: 14, cityNameKR: '하노이' }, { cityId: 32, countryId: 14, cityNameKR: '호치민' },
                { cityId: 33, countryId: 15, cityNameKR: '베를린' }, { cityId: 34, countryId: 15, cityNameKR: '함부르크' },
                { cityId: 35, countryId: 15, cityNameKR: '뮌헨' }, { cityId: 36, countryId: 16, cityNameKR: '카이로' },
                { cityId: 37, countryId: 17, cityNameKR: '오클랜드' }, { cityId: 38, countryId: 18, cityNameKR: '리우데자네이루' },
                { cityId: 39, countryId: 18, cityNameKR: '상파울루' }, { cityId: 40, countryId: 19, cityNameKR: '자카르타' },
                { cityId: 41, countryId: 20, cityNameKR: '런던' }, { cityId: 42, countryId: 20, cityNameKR: '맨체스터' },
                { cityId: 43, countryId: 21, cityNameKR: '멕시코시티' }, { cityId: 44, countryId: 22, cityNameKR: '마닐라' },
                { cityId: 45, countryId: 22, cityNameKR: '세부' }, { cityId: 46, countryId: 23, cityNameKR: '스톡홀름' },
                { cityId: 47, countryId: 24, cityNameKR: '부에노스아이레스' }, { cityId: 48, countryId: 25, cityNameKR: '싱가포르' },
                { cityId: 49, countryId: 26, cityNameKR: '취리히' }
            ];
            const filteredCities = allCities.filter(city => city.countryId === countryId);
            setCities(filteredCities);
        } catch (error) {
            console.error("도시 목록 가져오기 오류:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomizeConditions({
            ...customizeConditions,
            [name]: value
        });
        setValidationErrors(prevState => ({
            ...prevState,
            [name]: ''
        }));
    };

    const handleThemeChange = (e) => {
        const themeValue = e.target.value;
        setCustomizeConditions(prevState => ({
            ...prevState,
            themeCode: themeValue // 단일 값으로 설정
        }));
        setValidationErrors(prevState => ({
            ...prevState,
            themeCode: '' // themeCode 사용
        }));
    };




    const handleCountryChange = (e) => {
        const countryId = e.target.value ? parseInt(e.target.value) : '';
        setCustomizeConditions({
            ...customizeConditions,
            countryId: countryId,
            cityId: ''
        });
        setValidationErrors(prevState => ({
            ...prevState,
            countryId: '',
            cityId: ''
        }));
    };

    const handleCityChange = (e) => {
        const cityId = e.target.value ? parseInt(e.target.value) : '';
        setCustomizeConditions({
            ...customizeConditions,
            cityId: cityId
        });
        setValidationErrors(prevState => ({
            ...prevState,
            cityId: ''
        }));
    };

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        // 입력된 값이 숫자가 아니거나 비어있으면 0으로 처리
        const price = value ? parseInt(value) : 0;


        if (name === 'minPrice' && price > customizeConditions.maxPrice && customizeConditions.maxPrice !== 0) {
            setValidationErrors(prevState => ({
                ...prevState,
                minPrice: '최소 가격은 최대 가격보다 클 수 없습니다.'
            }));
        } else if (name === 'maxPrice' && price < customizeConditions.minPrice && customizeConditions.minPrice !== 0) {
            setValidationErrors(prevState => ({
                ...prevState,
                maxPrice: '최대 가격은 최소 가격보다 작을 수 없습니다.'
            }));
        } else {
            setValidationErrors(prevState => ({
                ...prevState,
                [name]: ''
            }));
        }

        setCustomizeConditions({
            ...customizeConditions,
            [name]: price
        });
    };

    const handlePersonCountChange = (e) => {
        const { name, value } = e.target;
        // 입력된 값이 숫자가 아니거나 비어있으면 빈 문자열로 처리
        const count = value ? parseInt(value) : '';

        setCustomizeConditions(prevState => {
            const updatedConditions = {
                ...prevState,
                [name]: count
            };

            const adult = updatedConditions.adultCount || 0;
            const child = updatedConditions.childCount || 0;
            const totalCount = adult + child;

            if (totalCount < 1) {
                setValidationErrors(prevState => ({
                    ...prevState,
                    personCount: '성인 또는 아동 인원은 1명 이상이어야 합니다.'
                }));
            } else {
                setValidationErrors(prevState => ({
                    ...prevState,
                    personCount: ''
                }));
            }
            return updatedConditions;
        });

        setValidationErrors(prevState => ({
            ...prevState,
            [name]: ''
        }));
    };


    const handleProductTypeChange = (e) => {
        const selectedValue = e.target.value;
        setCustomizeConditions(prevState => ({
            ...prevState,
            productType: selectedValue // 단일 값으로 설정
        }));
        setValidationErrors(prevState => ({
            ...prevState,
            productType: ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        if (!customizeConditions.startDate) errors.startDate = '시작 날짜를 선택해주세요.';
        if (!customizeConditions.endDate) errors.endDate = '종료 날짜를 선택해주세요.';
        if (!customizeConditions.countryId) errors.countryId = '국가를 선택해주세요.';
        if (!customizeConditions.cityId) errors.cityId = '도시를 선택해주세요.'; // 도시 선택 필수 조건 추가
        if (!customizeConditions.themeCode) errors.themeCode = '테마를 선택해주세요.'; // 테마 선택 필수 조건 추가
        if ((customizeConditions.adultCount || 0) + (customizeConditions.childCount || 0) < 1) errors.personCount = '성인 또는 아동 인원은 1명 이상이어야 합니다.'; // 인원수 필수 조건 추가
        if (!customizeConditions.minPrice && customizeConditions.minPrice !== 0) errors.minPrice = '최소 가격을 입력해주세요.'; // 최소 가격 필수 조건 추가 (0도 유효)
        if (!customizeConditions.maxPrice && customizeConditions.maxPrice !== 0) errors.maxPrice = '최대 가격을 입력해주세요.'; // 최대 가격 필수 조건 추가 (0도 유효)
        if (customizeConditions.minPrice > customizeConditions.maxPrice && customizeConditions.maxPrice !== 0) errors.minPrice = '최소 가격은 최대 가격보다 클 수 없습니다.'; // 가격 범위 유효성 검사
        if (!customizeConditions.productType) errors.productType = '여행 타입을 선택해주세요.'; // 여행 타입 필수 조건 추가


        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }


        try {
            const response = await axios.post('http://localhost:8080/customize/search', customizeConditions); // Axios 요청 URL 수정
            console.log('검색 결과:', response.data);
            navigate('/search-results', { state: { searchResults: response.data } }); // 검색 결과 페이지로 이동
        } catch (error) {
            console.error('검색 중 오류 발생:', error);
            // 오류 발생 시 사용자에게 메시지 표시
            if (error.response && error.response.data && error.response.data.message) {
                alert('검색 중 오류가 발생했습니다: ' + error.response.data.message);
            } else {
                alert('검색 중 알 수 없는 오류가 발생했습니다.');
            }
        }
    };



    return(
        <CustomizeCom
            customizeConditions={customizeConditions}
            countries={countries}
            cities={cities}
            validationErrors={validationErrors}
            handleInputChange={handleInputChange}
            handleThemeChange={handleThemeChange}
            handleCountryChange={handleCountryChange}
            handleCityChange={handleCityChange}
            handlePriceChange={handlePriceChange}
            handlePersonCountChange={handlePersonCountChange}
            handleProductTypeChange={handleProductTypeChange}
            handleSubmit={handleSubmit}
        />
    )
}
export default CustomizeCon;
