import ProductRegCom from "../../components/product/ProductRegCom";
import {useState, useEffect} from "react";
import { ProductRegist, getRegions, getCountryList, getCitiesByRegion, getCitiesByCountry, getThemes } from "../../service/ProductService";
import { useNavigate } from "react-router-dom";

function ProductRegCon() {

    // 오늘 날짜를 'YYYY-MM-DD' 형식으로 가져오기
    const today = new Date().toISOString().split("T")[0];
    
    const [formInput, setFormInput] = useState({
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
        productThumbnail : null,
        regionCode : "",
        countryId: "",
        cityId: "",
        themeCode: "",
    });
    const [regions, setRegions] = useState([]);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [themes, setThemes] = useState([]);
    const [uploadedFile, setUploadedFile] = useState(null);

    const navigate = useNavigate();


    // 권역, 국가, 도시, 테마 데이터 불러오기
    useEffect(() => {
        console.log("-------formInput 변경 확인하기-------", formInput);
        getThemes()
        .then( data => {
            setThemes(data);
        })
        .catch((err) => console.error(err))
    }, [formInput]);


    // formInput 상태 관리
    const handleFormChange = (name, value) => {
        setFormInput({
            ...formInput,
            [name]: value,
        });
    };


    // 권역(국내/해외여행) 호출 함수
    const handleRegionTypeChange = async (regionType) => {
        try {
            const data = await getRegions(regionType);
            setRegions(data);
            setCities([]);
            setFormInput((prev) => ({
                ...prev,
                regionType,
                countryId: "",
                cityId: "",
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
            setFormInput((prev) => ({
                ...prev,
                regionCode,
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
            setFormInput((prev) => ({
                ...prev,
                regionCode,
                // regionId: "",
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
            setFormInput((prev) => ({
                ...prev,
                // regionId: "",
                countryId,
                cityId: "",
            }));
        } catch (error) {
            console.error("도시 선택 불러오기 실패: ", error);
        }
    }


    // 도시 선택시 cityId를 formInput에 저장
    const handleCityIdChange = (cityId) => {
        // console.log("여기서 cityId 확인...", cityId);
        if (formInput.regionType === "DOMESTIC") {
        setFormInput((prev) => ({
            ...prev,
            countryId : 1,  // 대한민국
            cityId,
        }))
        } else {
            setFormInput((prev) => ({
                ...prev,
                cityId,
            }));
        }
    }


    // 테마 데이터 불러오기
    const handleThemesChange = (themeCode) => {
        // console.log("여기서 themeCode 확인...", themeCode);
        setFormInput((prev) => ({
            ...prev,
            themeCode,
        }))
    }


    // 파일 업로드 시 파일 이름은 formInput에, 실제 파일은 uploadedFile로 분리 저장
    const handleFileSelect = (file) => {
        // file : >>File 객체<< 그 자체임
        if (file) {
        setUploadedFile(file);
        setFormInput((prev) => ({
            ...prev,
            productThumbnail: file.name,
        }));
        }
    };


    const onSubmit = async (e) => {
        e.preventDefault(); 

        const formData = new FormData();
        formData.append("productDTO", new Blob(
            [JSON.stringify(formInput)], 
            { 
                type: "application/json" 
            })
        );

        console.log("여기까지 formInput확인 : ", formInput);

        if (uploadedFile) {
            formData.append("productThumbnail", uploadedFile);
        } else {
            console.warn("파일이 선택되지 않았어요!");
        }

        const res = await ProductRegist(formData);

        if( res.ok) {
            alert(res.message);
            navigate("/adminmypage");
        }else {
            console.error("상품 등록 실패:", res.message);
        }
    };


    return (
        <>
            <ProductRegCom
                regions={regions}
                countries={countries}
                cities={cities}
                themes={themes}
                formInput={formInput}
                today={today}
                handleFormChange={handleFormChange}
                onSubmit={onSubmit}
                onRegionTypeChange={handleRegionTypeChange}
                onCountryIdChange={handleCountryIdChange}
                onKoCityIdChange={handleKoCityIdChange}
                onIntlCityIdChange={handleIntlCityIdChange}
                handleCityIdChange={handleCityIdChange}
                handleThemesChange={handleThemesChange}
                handleFileSelect ={handleFileSelect}
                
            />

            {/*<ProductRegCom onSubmit={onSubmit}*/}
            {/*today={today} startDate={startDate} handleStartDateChange={handleStartDateChange}/>*/}
        </>
    )
}

export default ProductRegCon;