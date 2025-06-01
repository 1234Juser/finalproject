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

        // ----------------  숫자 입력 필드에 음수나 정수가 아닌 값이 입력되는 것을 방지
        let valueToDispatch = value; // 실제로 formInput에 저장될 값

        const numericIntegerFields = ["productAdult", "productChild", "productMinParticipants", "productMaxParticipants"];

        if (numericIntegerFields.includes(name)) {
            if (value === "" || value === null || value === undefined) {
                valueToDispatch = ""; // 빈 문자열은 그대로 허용 (필수 입력 여부는 onSubmit에서 체크)
            } else {
                // 숫자 이외의 모든 문자(소수점, 음수 기호 포함)를 제거하여 오직 숫자(정수)만 남김
                let processedValue = String(value).replace(/[^\d]/g, '');

                // 만약 processedValue가 비어있다면 (예: 사용자가 "-"만 입력했거나 "abc" 등을 입력한 경우)
                // valueToDispatch를 빈 문자열로 설정
                if (processedValue === "") {
                    valueToDispatch = "";
                } else {
                    // 남아있는 숫자 문자열을 실제 숫자로 변환했다가 다시 문자열로 변환
                    valueToDispatch = String(Number(processedValue));       // 예 : "05" -> "5" 처리
                }
            }
        }

        // 1. 정제된 valueToDispatch 값을 fromInput 상태에 반영
        dispatch({ type: "SET_FORM_INPUT", payload: { [name]: valueToDispatch } });

        let errorMsg = "";

        // 2. productMinParticipants 또는 productMaxParticipants 필드가 변경되었을 때만 관련 오류 로직 실행
        if (name === "productMinParticipants" || name === "productMaxParticipants") {
            // currentValForLogic 대신 valueToDispatch (현재 필드의 정제된 값)를 사용합니다.
            // 다른 참가자 필드 값은 state.formInput에서 가져옵니다 (이미 SET_FORM_INPUT으로 업데이트 시도됨).

            // 참가자 수 관련 유효성 검사(현재 입력값을 반영해서 min/max 값 계산)
            const minValString = name === "productMinParticipants" ? valueToDispatch : Number(formInput.productMinParticipants);
            const maxValString = name === "productMaxParticipants" ? valueToDispatch : Number(formInput.productMaxParticipants);

            const min = Number(minValString);
            const max = Number(maxValString);

            if (minValString !== "" && maxValString !== "" && min > 0 && max > 0 && min > max) {
                // 두 필드 모두 값이 있고, 양수이며, 최소값이 최대값보다 클 때 오류
                errorMsg = "최소 출발 인원은 최대 출발 인원을 초과할 수 없습니다.";
            } else if (!valueToDispatch.trim()) { // 현재 변경된 참가자 필드가 비워졌다면
                errorMsg = "필수 입력값입니다.";
            }
        }
            // 3. partiError 상태 업데이트
            dispatch({ type: "SET_PARTI_ERROR", payload: { participants: errorMsg } });
    }


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
        // console.log("handleSubmit 함수 호출됨"); // <-- 이 로그가 찍히는지 확인!

        // 모든 필드에 대해 필수 입력값 존재 여부 체크
        const errors = {};
        const requiredFields = [
            "productTitle", "productContent", "regionType", "regionCode", "themeCode", "countryId", "cityId",
            "productAdult", "productChild", "productStartDate", "productEndDate",
            "productMinParticipants", "productMaxParticipants", "productStatus", "productThumbnail"
        ];

        requiredFields.forEach((field) => {
            if (!formInput[field] || formInput[field].toString().trim() === "") {
                errors[field] = "필수 입력값입니다.";
            }
        });

        if (Object.keys(errors).length > 0) {
            // console.log("필수 입력값 오류 발생:", errors); // <-- 추가된 로그: 유효성 검사 에러 객체 확인
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

        console.log("formData 생성 완료. ProductRegist 또는 setProductModify 호출 직전입니다."); // <-- 추가된 로그
        // FormData 내용 확인 (디버깅 시 유용)
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`FormData Entry: ${key} = ${value.name} (File)`);
            } else if (value instanceof Blob) {
                // Blob의 내용을 직접 로깅하기는 어려우므로, 생성 시 사용된 원본 데이터를 로깅하는 것이 더 유용할 수 있습니다.
                // 여기서는 Blob의 타입과 함께 어떤 DTO가 들어갔는지 간접적으로 알 수 있도록 합니다.
                console.log(`FormData Entry: ${key} = Blob (type: ${value.type}), Original DTO:`, JSON.parse(JSON.stringify(formInput)));
            } else {
                console.log(`FormData Entry: ${key} = ${value}`);
            }
        }

        try {
            if (productUid) {
                // 수정
                // console.log("setProductModify 함수를 호출합니다. productUid:", productUid); // <-- 추가된 로그
                await setProductModify(productUid, formData);
                navigate("/admin/productAll");
            } else {
                // 등록
                const res = await ProductRegist(formData)
                // ProductRegist 함수 내부의 console.log('result') 또는 console.error("등록 에러 발생 !!!") 가 이 아래 로그보다 먼저 찍힐 수 있습니다.
                // console.log("ProductRegist 함수 호출이 완료되었습니다. 반환된 값(res):", res); // <-- 추가된 로그
                // console.log("ProductRegist 호출 후 결과:", res); // 이 로그가 안 찍히는 상황이었죠. 바로 위 로그는 찍히는지 확인해보세요.
                if (res && res.message) { // res 객체와 message 속성이 있는지 확인 후 alert
                    alert(res.message);
                } else {
                    console.error("ProductRegist 응답 객체 또는 message 속성이 유효하지 않습니다:", res);
                    alert("응답 처리에 문제가 발생했습니다.");
                }
                navigate("/adminmypage");
            }
        } catch(err) {
            console.error("onSubmit 함수 내 try-catch 블록에서 에러가 발생했습니다:", err); // <-- 추가된 로그 (에러 객체 전체 확인)
            console.error("상품 등록 실패:", err.message)
            // alert("상품 처리 중 오류가 발생했습니다. 문제가 지속되면 관리자에게 문의하세요.");
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