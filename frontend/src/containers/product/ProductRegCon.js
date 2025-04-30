import ProductRegCom from "../../components/product/ProductRegCom";
import {useState, useEffect} from "react";
import { ProductRegist, getRegions, getCountryList, getCitiesByRegion } from "../../service/ProductService";
import axios from "axios";

function ProductRegCon() {

    // 오늘 날짜를 'YYYY-MM-DD' 형식으로 가져오기
    const today = new Date().toISOString().split("T")[0];
    // const [startDate, setStartDate] = useState("");
    const [formData, setFormData] = useState({
        productTitle: "",
        productContent: "",
        productAdult: "",
        productChild: "",
        productStartDate: today,
        productEndDate: "",
        productMinParticipants: "",
        productMaxParticipants: "",
        productStatus: "ON_SALE",
        productType: "TOUR",
        countryId: null,
        cityId: null,
        themeCode: null,
    });
    const [regions, setRegions] = useState([]);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [themes, setThemes] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);



    // 권역, 국가, 도시, 테마 데이터 불러오기
    useEffect(() => {
        console.log("regions 확인-------", regions);
        // getRegions();
        // fetchThemes();
    }, [regions]);

    // 권역 데이터 불러오기
  // 국내/해외 데이터를 가져옴
//   const fetchRegions = async (regionType) => {
//     const response = await fetch(`/region/${regionType}`);
//     if (!response.ok) 
//         throw new Error("Failed to fetch regions");
//     const data = await response.json();
//     console.log("data/...." , data);
//     setRegions(data);
//   };

    /*
  // 권역(region)을 선택한 경우 국가 데이터 가져오기
  const fetchCountries = async (regionCode) => {
    const response = await fetch(`/api/countries?regionId=${regionCode}`);
    if (!response.ok) throw new Error("Failed to fetch countries");
    const data = await response.json();
    setCountries(data);
    setSelectedRegion(regionCode);
    setCities([]); // 국가 선택 시 도시 초기화
  };

  // 국가(country)를 선택한 경우 도시 데이터 가져오기
  const fetchCities = async (countryId) => {
    const response = await fetch(`/api/cities/${countryId}`);
    if (!response.ok) throw new Error("Failed to fetch cities");
    const data = await response.json();
    setCities(data);
  };

    // 테마 데이터 불러오기
    const fetchThemes = async () => {
        const response = await axios.get("/api/themes");
        setThemes(response.data);
    };


    // 폼 데이터 state 업데이트
    const handleFormChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value,
        });
        // 선택에 따른 데이터 로딩
        if (key === "regionId") {
            setFormData({ ...formData, countryId: null, cityId: null }); // 관련 항목 초기화
            fetchCountries(value);
        }
        if (key === "countryId") {
            setFormData({ ...formData, cityId: null }); // 도시 초기화
            fetchCities(value);
        }
    };

*/

    // 권역(국내/해외여행) 호출 함수
    const handleRegionTypeChange = async (regionType) => {
        try {
            const data = await getRegions(regionType);
            setRegions(data);
            setCities([]);
            setFormData((prev) => ({
                ...prev,
                regionType,
                regionId: "", // 기존 선택 초기화
                countryId: null,
                cityId: null,
            }));
            console.log("formData 확인------", formData);
        } catch (error) {
            console.error("여행 유형 선택 시 권역 불러오기 실패: ", error);
        }
    };


    // 국내여행의 권역 선택에 따른 도시 호출
    const handleKoCityIdChange = async (regionCode) => {
        console.log("region 선택 시 regionCode 확인", regionCode);
        try {
            const data = await getCitiesByRegion(regionCode);
            console.log("getCitiesByRegion 받아오는 함수 결과", data);
            setCities(data);
            setFormData((prev) => ({
                ...prev,
                regionCode,
                regionId: "", // 기존 선택 초기화
                countryId: "",
                cityId: "",
            }));
            console.log("formData 확인------", formData);
        } catch (error) {
            console.error("여행 유형 선택 시 권역 불러오기 실패: ", error);
        }

    }


    // 해외여행의 권역(대륙) 선택에 따른 국가 호출
    const handleCountryIdChange = async (regionCode) => {
        console.log("region 선택 시 regionCode 확인", regionCode);
        try {
            const data = await getCountryList(regionCode);
            console.log("getCountryList 받아오는 함수 결과", data);
            setCountries(data);
            // setCities([]);
            setFormData((prev) => ({
                ...prev,
                regionCode,
                regionId: "", // 기존 선택 초기화
                countryId: "",
                cityId: "",
            }));
            console.log("formData 확인------", formData);
        } catch (error) {
            console.error("여행 유형 선택 시 권역 불러오기 실패: ", error);
        }

    }

    // 해외여행의 국가 선택에 따른 도시 호출


    // const handleStartDateChange = (e) => {
    //     setStartDate(e.target.value);
    //     console.log("판매 시작일(시스템상 오늘 날짜) : ", e.target.value);
    // };

    const onSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지
        console.log("폼 데이터:", formData);

        try {
            await ProductRegist(formData); // 상품 등록 API 호출
            alert("상품이 등록되었습니다.");
        } catch (error) {
            console.error("상품 등록 실패:", error);
            alert("상품 등록 중 오류가 발생했습니다.");
        }

        /*
                const form = e.target; // 폼 데이터를 다룸
                const formData = {
                    productTitle: form.productTitle.value,
                    productContent: form.productContent.value,
                    productAdult: form.productAdult.value,
                    productChild: form.productChild.value,
                    productStartDate: form.productStartDate.value,
                    productEndDate: form.productEndDate.value,
                    productMinParticipants: form.productMinParticipants.value,
                    productMaxParticipants: form.productMaxParticipants.value,
                    productStatus: form.productStatus.value,
                    productType: form.productType.value,
                    // File 업로드가 포함된 경우 필요 시 처리
                    // productThumbnailFile: form.productThumbnailFile.files[0]
                    countryId: form.countryId.value,
                    cityId: form.cityId.value,
                    themeCode: form.themeCode.value,

                };

                try {
                    // ProductService에 등록 API 호출
                    await ProductRegist(formData);
                } catch (error) {
                    console.error("상품 등록 중 에러 발생: ", error);
                }
        */
    };



    return (
        <>
            <ProductRegCom
                regions={regions}
                countries={countries}
                cities={cities}
                themes={themes}
                formData={formData}
                today={today}
                // onChange={handleFormChange}
                onSubmit={onSubmit}
                onRegionTypeChange={handleRegionTypeChange}
                onCountryIdChange={handleCountryIdChange}
                onKoCityIdChange={handleKoCityIdChange}
            />

            {/*<ProductRegCom onSubmit={onSubmit}*/}
            {/*today={today} startDate={startDate} handleStartDateChange={handleStartDateChange}/>*/}
        </>
    )
}

export default ProductRegCon;