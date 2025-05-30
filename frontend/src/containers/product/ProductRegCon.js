import ProductRegCom from "../../components/product/ProductRegCom";
import {useEffect, useReducer} from "react";
import { ProductRegist, getRegions, getCountryList, getCitiesByRegion, getCitiesByCountry, getThemes, getProductModify, setProductModify} from "../../service/ProductService";
import {useNavigate, useParams} from "react-router-dom";
import {productFormReducer, initialState} from "../../modules/productReducer";


function ProductRegCon() {

    const [state, dispatch] = useReducer(productFormReducer, initialState);
    const { formInput, regions, countries, cities, themes, uploadedFile, partiError, formErrors } = state;
    const today = state.formInput.productStartDate;

    const navigate = useNavigate();
    const {productUid} = useParams();
    const isEditPage = !!productUid;        // 수정 페이지일 경우 true



    useEffect(() => {
        getThemes()
            .then( data => dispatch({ type: "SET_THEMES", payload: data }))
            .catch((err) => console.error(err))

        // 수정 모드
        if(productUid) {
            getProductModify(productUid)
            .then( data => {
                dispatch({
                    type: "INIT_FORM",
                    payload: {
                        ...data,
                        regionType: data.regionType,
                        regionCode: data.regionCode,
                        productThumbnail: data.productThumbnail,
                    },
                });
                // 권역 리스트 조회
                return getRegions(data.regionType)
            })
            .then((regionData) => dispatch({ type: "SET_REGIONS", payload: regionData }))
            .catch(err => console.error(err))
        }
    }, [productUid]);


/*
    // formInput 로그용
    useEffect(() => {
        console.log("-------formInput 변경 확인하기-------", formInput);
    }, [formInput]);
*/


    // formInput 상태 관리
    const handleFormChange = (name, value) => {
        dispatch({ type: "SET_FORM_INPUT", payload: { [name]: value } });

        let errorMsg = "";

        // 숫자 입력이 필요한 필드에 대해 유효성 검사 (/^\d*$/ : "숫자(0~9)로만 이루어진 문자열"을 의미하는 정규식)
        if (
            (name === "productMinParticipants" || name === "productMaxParticipants") &&
            !/^\d*$/.test(value)
        ) {
            errorMsg = "숫자만 입력 가능합니다.";
        } else {
            // 참가자 수 관련 유효성 검사(현재 입력값을 반영해서 min/max 값 계산)
            const min = name === "productMinParticipants" ? Number(value) : Number(formInput.productMinParticipants);
            const max = name === "productMaxParticipants" ? Number(value) : Number(formInput.productMaxParticipants);

            if (name === "productMinParticipants" || name === "productMaxParticipants") {
                if (min && max && min > max)
                    errorMsg = "최소 출발 인원은 최대 출발 인원을 초과할 수 없습니다.";
            }
        }
        // 필수 입력값에 대한 유효성 검사
        if (!value.trim()) {
            errorMsg = "필수 입력값입니다.";
        }

        dispatch({ type: "SET_PARTI_ERROR", payload: { participants: errorMsg } });
    };


    // 권역(국내/해외여행) 호출 함수
    const handleRegionTypeChange = async (regionType) => {
        try {
            const data = await getRegions(regionType);
            dispatch({ type: "SET_REGIONS", payload: data });
            dispatch({ type: "SET_CITIES", payload: [] });
            dispatch({
                type: "SET_FORM_INPUT",
                payload: { regionType, countryId: "", cityId: "" },
            });
        } catch (error) {
            console.error("여행 유형 선택 시 권역 불러오기 실패: ", error);
        }
    };


    // 국내여행의 권역 선택에 따른 도시 호출
    const handleKoCityIdChange = async (regionCode) => {
        try {
            const data = await getCitiesByRegion(regionCode);
            dispatch({ type: "SET_CITIES", payload: data });
            dispatch({
                type: "SET_FORM_INPUT",
                payload: { regionCode, countryId: "", cityId: "" },
            });
        } catch (error) {
            console.error("권역 선택 시 도시 불러오기 실패: ", error);
        }
    }


    // 해외여행의 권역(대륙) 선택에 따른 국가 호출
    const handleCountryIdChange = async (regionCode) => {
        try {
            const data = await getCountryList(regionCode);
            dispatch({ type: "SET_COUNTRIES", payload: data });
            dispatch({
                type: "SET_FORM_INPUT",
                payload: { regionCode, countryId: "", cityId: "" },
            });
        } catch (error) {
            console.error("대륙 선택 시 국가 불러오기 실패: ", error);
        }
    }


    // 해외여행의 국가 선택에 따른 도시 호출
    const handleIntlCityIdChange = async (countryId) => {
        try {
            const data = await getCitiesByCountry(countryId);
            dispatch({ type: "SET_CITIES", payload: data });
            dispatch({
                type: "SET_FORM_INPUT",
                payload: { countryId, cityId: "" },
            });
        } catch (error) {
            console.error("도시 선택 불러오기 실패: ", error);
        }
    }


    // 도시 선택시 cityId를 formInput에 저장
    const handleCityIdChange = (cityId) => {
        if (formInput.regionType === "DOMESTIC") {
            dispatch({
                type: "SET_FORM_INPUT",
                payload: { countryId : 1, cityId },     // 1 : 대한민국
            });
        } else {
            dispatch({
                type: "SET_FORM_INPUT",
                payload: { cityId }
            });

        }
    }


    // 테마 데이터 불러오기
    const handleThemesChange = (themeCode) => {
        dispatch({
            type: "SET_FORM_INPUT",
            payload: { themeCode }
        });
    }


    // 파일 업로드 시 파일 이름은 formInput에, 실제 파일은 uploadedFile로 분리 저장
    const handleFileSelect = (file) => {
        // file : >>File 객체<< 그 자체임
        if (file) {
        dispatch({ type: "SET_FILE", payload : file});
        dispatch({ type: "SET_FORM_INPUT", payload: { productThumbnail: file.name } });
        }
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit 함수 호출됨"); // <-- 이 로그가 찍히는지 확인!

        // 모든 필드에 대해 필수 입력값 존재 여부 체크
        const errors = {};
        const requiredFields = [
            "productTitle", "productContent", "regionType", "regionCode", "themeCode", "countryId", "cityId",
            "productAdult", "productChild", "productStartDate", "productEndDate",
            "productMinParticipants", "productMaxParticipants", "productStatus", "productType", "productThumbnail"
        ];

        requiredFields.forEach((field) => {
            if (!formInput[field] || formInput[field].toString().trim() === "") {
                errors[field] = "필수 입력값입니다.";
            }
        });

        if (Object.keys(errors).length > 0) {
            dispatch({ type: "SET_FORM_ERRORS", payload: errors });
            return;
        }


        // 확인창 표시
        const confirmSubmit = window.confirm("등록하시겠습니까?");
        if (!confirmSubmit) {
            return;
        }


        // '최소 출발 인원 > 최대 출발 인원'일 경우 폼 전송 방지
        const min = Number(formInput.productMinParticipants);
        const max = Number(formInput.productMaxParticipants);
        if (isNaN(min) || isNaN(max)) {
            dispatch({ type: "SET_FORM_ERRORS", payload: "최소/최대 인원수는 숫자여야 합니다." });
            return;
        }
        if (min > max) {
            dispatch({ type: "SET_FORM_ERRORS", payload: "최소 참가자는 최대 참가자보다 클 수 없습니다." });
            return;
        }
        dispatch({ type: "SET_FORM_ERRORS", payload: "" });


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

        try {
            if (productUid) {
                // 수정
                await setProductModify(productUid, formData);
                navigate("/admin/productAll");
            } else {
                // 등록
                const res = await ProductRegist(formData)
                console.log("ProductRegist 호출 후 결과:", res);
                alert(res.message);
                navigate("/adminmypage");
            }
        } catch(err) {
            console.error("상품 등록 실패:", err.message)
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