import ProductRegCom from "../../components/product/ProductRegCom";
import {useState, useEffect} from "react";
import { ProductRegist, getRegions, getCountryList, getCitiesByRegion, getCitiesByCountry, getThemes } from "../../service/ProductService";

function ProductRegCon() {

    // 오늘 날짜를 'YYYY-MM-DD' 형식으로 가져오기
    const today = new Date().toISOString().split("T")[0];
    
    const [formData, setFormData] = useState({
        productTitle: "",
        productContent: "",
        productAdult: "",
        productChild: "",
        productStartDate: today,
        productEndDate: "",
        productMinParticipants: "",
        productMaxParticipants: "",
        productStatus: null,
        productType: null,
        // regionCode : "",
        // regionId : "",
        countryId: "",
        cityId: "",
        themeCode: "",
    });
    const [regions, setRegions] = useState([]);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [themes, setThemes] = useState([]);


    // 권역, 국가, 도시, 테마 데이터 불러오기
    useEffect(() => {
        // console.log("regions 확인-------", regions);
        console.log("-------formData 변경 확인하기-------", formData);
        getThemes()
        .then( data => {
            // console.log("테마 불러오고 data확인 -----> : ", data)
            setThemes(data);
        })
        .catch((err) => console.error(err))
        // getRegions();
        // fetchThemes();
    }, [formData]);


    // formData 상태 관리
    const handleFormChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    // 권역(국내/해외여행) 호출 함수
    const handleRegionTypeChange = async (regionType) => {
        try {
            const data = await getRegions(regionType);
            setRegions(data);
            setCities([]);
            setFormData((prev) => ({
                ...prev,
                regionType,
                regionId: "",
                countryId: null,
                cityId: null,
            }));
        } catch (error) {
            console.error("여행 유형 선택 시 권역 불러오기 실패: ", error);
        }
    };


    // 국내여행의 권역 선택에 따른 도시 호출
    const handleKoCityIdChange = async (regionCode) => {
        // console.log("region 선택 시 regionCode 확인", regionCode);
        try {
            const data = await getCitiesByRegion(regionCode);
            // console.log("getCitiesByRegion 받아오는 함수 결과", data);
            setCities(data);
            setFormData((prev) => ({
                ...prev,
                regionCode,
                regionId: "",
                countryId: "",
                cityId: "",
            }));
        } catch (error) {
            console.error("권역 선택 시 도시 불러오기 실패: ", error);
        }
    }


    // 해외여행의 권역(대륙) 선택에 따른 국가 호출
    const handleCountryIdChange = async (regionCode) => {
        // console.log("region 선택 시 regionCode 확인", regionCode);
        try {
            const data = await getCountryList(regionCode);
            // console.log("getCountryList 받아오는 함수 결과", data);
            setCountries(data);
            setFormData((prev) => ({
                ...prev,
                regionCode,
                regionId: "",
                countryId: "",
                cityId: "",
            }));
        } catch (error) {
            console.error("대륙 선택 시 국가 불러오기 실패: ", error);
        }
    }


    // 해외여행의 국가 선택에 따른 도시 호출
    const handleIntlCityIdChange = async (countryId) => {
        // console.log("해외국가 선택시 countryId 확인 :", countryId);
        try {
            const data = await getCitiesByCountry(countryId);
            // console.log("getCitiesByCountry 받아오는 함수 결과", data);
            setCities(data);
            setFormData((prev) => ({
                ...prev,
                regionId: "",
                countryId,
                cityId: "",
            }));
        } catch (error) {
            console.error("도시 선택 불러오기 실패: ", error);
        }
    }


    // 도시 선택시 cityId를 formData에 저장
    const handleCityIdChange = (cityId) => {
        // console.log("여기서 cityId 확인...", cityId);
        setFormData((prev) => ({
            ...prev,
            cityId,
        }))
    }


    // 테마 데이터 불러오기
    const handleThemesChange = (themeCode) => {
        // console.log("여기서 themeCode 확인...", themeCode);
        setFormData((prev) => ({
            ...prev,
            themeCode,
        }))
    }


    const onSubmit = async (e) => {
        e.preventDefault(); 

        
        const formData = new FormData(e.target);

        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]); // 이게 다 나와야 정상
        }
    
        
        const file = formData.get("productThumbnail");
        console.log("file 객체 확인...", file);

        if (file && file.name) {
            console.log("업로드한 파일 이름:", file.name);
        } else {
            console.log("파일이 선택되지 않았습니다.");
        }

        console.log("폼 데이터:", formData);
        const res = await ProductRegist(formData);
        console.log("register : ", res);

        if( res.ok) {
            alert(await res.text());
            // navigate("/");
        }else {
            console.error("상품 등록 실패:", res);
        }

        console.log("register : ", res);

        // try {
        //     await ProductRegist(formData);
        // } catch (error) {
        //     console.error("상품 등록 실패:", error);
        // }

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
                onChange={handleFormChange}
                onSubmit={onSubmit}
                onRegionTypeChange={handleRegionTypeChange}
                onCountryIdChange={handleCountryIdChange}
                onKoCityIdChange={handleKoCityIdChange}
                onIntlCityIdChange={handleIntlCityIdChange}
                handleCityIdChange={handleCityIdChange}
                handleThemesChange={handleThemesChange}
            />

            {/*<ProductRegCom onSubmit={onSubmit}*/}
            {/*today={today} startDate={startDate} handleStartDateChange={handleStartDateChange}/>*/}
        </>
    )
}

export default ProductRegCon;