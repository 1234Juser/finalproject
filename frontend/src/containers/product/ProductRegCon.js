import ProductRegCom from "../../components/product/ProductRegCom";
import {useState, useEffect} from "react";
import { ProductRegist, getRegions, getCountryList, getCitiesByRegion, getCitiesByCountry, getThemes, getProductModify, setProductModify} from "../../service/ProductService";
import {useNavigate, useParams} from "react-router-dom";

function ProductRegCon() {

    // 오늘 날짜를 'YYYY-MM-DD' 형식으로 가져오기
    const today = new Date().toLocaleDateString("sv-SE", {
        timeZone: "Asia/Seoul"
    });
    
    const [formInput, setFormInput] = useState({
        countryId: "",
        cityId: "",
        themeCode: "",
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
        regionType : "",
        cityName : "",
        countryName : "",
        fullLocation : "",
    });
    const [regions, setRegions] = useState([]);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [themes, setThemes] = useState([]);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [partiError, setPartiError] = useState({participants: ""});
    const [formErrors, setFormErrors] = useState("")

    const navigate = useNavigate();
    const {productUid} = useParams();
    const isEditPage = !!productUid;        // 수정 페이지일 경우 true



    useEffect(() => {
        console.log("-------formInput 변경 확인하기-------", formInput);
        
        getThemes()
            .then( data => {
                setThemes(data);
            })
            .catch((err) => console.error(err))

        // 수정 모드
        if(productUid) {
            console.log("isEditPage : ", isEditPage);
            console.log("productUid : ", productUid);
            
            getProductModify(productUid)
            .then( data => {
                console.log("-------수정용 data 확인-------", data);
                setFormInput({
                    ...data,
                    regionType: data.regionType,
                    regionCode: data.regionCode,
                    // regionName: selectedRegion ? selectedRegion.regionName : "", // 권역 이름 추가
                    productThumbnail: data.productThumbnail,
                });
                
                // 권역 리스트 조회
                return getRegions(data.regionType)
            })
            .then((regionData) => {
                setRegions(regionData);
            })
            .catch(err => console.error(err))
        }
    }, []);


    // formInput 상태 관리
    const handleFormChange = (name, value) => {
        // 숫자 입력 제한: 참가자 수 필드에만 적용
        // ----/^\d*$/ ----> "숫자(0~9)로만 이루어진 문자열"을 의미하는 정규식
        if (
            (name === "productMinParticipants" || name === "productMaxParticipants") &&
            !/^\d*$/.test(value)
        ) {
            return;     // 숫자가 아닌 값이 들어오면 아무 일도 안 하고 종료 (숫자 입력 제한)
        }

        const newValue = value;

        // 새로운 입력값을 반영한 formInput 객체 생성
        const updatedForm = {
            ...formInput,
            [name]: newValue,
        };

        let errorMsg = "";

        // 참가자 수 관련 유효성 검사(현재 입력값을 반영해서 min/max 값 계산)
        const min = name === "productMinParticipants" ? Number(newValue) : Number(formInput.productMinParticipants);
        const max = name === "productMaxParticipants" ? Number(newValue) : Number(formInput.productMaxParticipants);

        if (name === "productMinParticipants" || name === "productMaxParticipants") {
            if (min && max && min > max)
                errorMsg = "최소 출발 인원은 최대 출발 인원을 초과할 수 없습니다.";
        }

        setFormInput(updatedForm);
        setPartiError((prev) => ({
            ...prev,
            participants: errorMsg,
        }));
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
        console.log("업로드 파일 확인 : ", file);
    };


    const onSubmit = async (e) => {
        e.preventDefault();

        // '최소 출발 인원 > 최대 출발 인원'일 경우 폼 전송 방지
        const min = Number(formInput.productMinParticipants);
        const max = Number(formInput.productMaxParticipants);
        if (isNaN(min) || isNaN(max)) {
            setFormErrors("최소/최대 인원수는 숫자여야 합니다.");
            return;
        }
        if (min > max) {
            setFormErrors("최소 참가자는 최대 참가자보다 클 수 없습니다.");
            return;
        }
        setFormErrors(""); // 에러 없을 경우 에러 메시지 초기화


        const formData = new FormData();
        formData.append("productDTO", new Blob(
            [JSON.stringify(formInput)],
            {
                type: "application/json"
            })
        );

        if (uploadedFile) {
            formData.append("productThumbnail", uploadedFile);
        } else {
            formData.append("productThumbnail", formInput.productThumbnail);    // 기존 파일 이름만 전송
        }

        // console.log("여기까지 formInput확인 : ", formInput);

       if (productUid) {
            // 수정
           await setProductModify(productUid, formData)
               .then((data) => {
                    navigate("/admin/productAll");
                })
               .catch((err) =>
                   console.error("수정 실패 : " , err.message))
        } else {
            // 등록
           await ProductRegist(formData)
               .then((res) => {
                    console.log("여기서 formData 확인------>", formData);
                    alert(res.message);
                    navigate("/adminmypage");
               })
               .catch((err) =>
                    console.error("상품 등록 실패:", err.message))
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
                isEditPage={isEditPage}
                partiError={partiError}
                formErrors={formErrors}
            />
        </>
    )
}

export default ProductRegCon;