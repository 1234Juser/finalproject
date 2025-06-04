import OptionFormCom from "../../components/order/OptionFormCom";
import {useEffect, useReducer} from "react";
import {fetchOptionForm, saveReservation, selectReservationDate} from "../../service/orderService";
import {useNavigate, useParams} from "react-router-dom";
import {initialState, reducer} from "../../modules/optionModule";

function OptionFormCon({ accessToken }){
    const { productUid, optionCode } = useParams();
    const [state, dispatch] = useReducer(reducer, initialState);

    const navigate = useNavigate();

    // 옵션 폼 불러오는건 비회원도 가능
    useEffect(() => {
        const fetchData = async () => {
            try {
                const optionData = await fetchOptionForm(productUid);
                dispatch({
                    type: "SET_PRODUCT_INFO",
                    data: {
                        productTitle: optionData.productTitle || "",
                        productAdult: optionData.productAdult || 0,
                        productChild: optionData.productChild || 0,
                        productMaxParticipants: optionData.productMaxParticipants || 0,
                        availableStartDate: optionData.availableStartDate,
                        availableEndDate: optionData.availableEndDate,
                    },
                });
                const formattedData = {
                    optionCode: optionData.optionCode || undefined,
                    productTitle: optionData.productTitle || "",
                    adultCount: 0,
                    childCount: 0,
                    adultPrice: optionData.productAdult || 0,
                    childPrice: optionData.productChild || 0,
                    price: (optionData.productAdult || 0) * 0 + (optionData.productChild || 0) * 0,
                };
                dispatch({ type: "SET_OPTION_DATA", data: formattedData });
            } catch (error) {
                alert("옵션 데이터를 불러오는 데 실패했습니다.");
                dispatch({ type: "SET_ERROR", data: error.message });
            } finally {
                dispatch({ type: "SET_LOADING", data: false });
            }
        }
        fetchData();
        }, [productUid]);

    // 옵션 폼 로딩 이후에 초기 reservationDate 자동 설정
    useEffect(() => {
        const today = new Date();
        const availableStart = new Date(state.availableStartDate);
        const availableEnd = new Date(state.availableEndDate);

        if (
            state.reservationDate === null &&
            !isNaN(availableStart.getTime()) &&
            !isNaN(availableEnd.getTime())
        ) {
            const initDate = today < availableStart ? availableStart : today > availableEnd ? availableStart : today;
            const formattedInitDate = initDate.toISOString().split("T")[0];
            dispatch({ type: "SET_RESERVATION_DATE", data: formattedInitDate });
        }
    }, [state.availableStartDate, state.availableEndDate, state.reservationDate]);

    useEffect(() => {
        const { adultCount, childCount, productAdult, productChild } = state;
        const total = (adultCount * productAdult) + (childCount * productChild);
        dispatch({ type: "SET_TOTAL_PRICE", data: total });
    }, [state.adultCount, state.childCount, state.productAdult, state.productChild]);

    const handleOptionChange = (key, value) => {
        dispatch({ type: "SET_OPTION_COUNT", key, value });
    };

    const handleAdultCountChange = (index, delta) => {
        dispatch({ type: "UPDATE_ADULT_COUNT", data: { index, delta } });
    };

    // 아동 수 변경
    const handleChildCountChange = (index, delta) => {
        dispatch({ type: "UPDATE_CHILD_COUNT", data: { index, delta } });
    };

    const handleDateSelect = async (date) => {
        try {
            // const formattedDate = date.toISOString().split("T")[0];
            // Date 객체가 아닌 경우 처리
            const formattedDate = (date instanceof Date)
                ? date.toISOString().split("T")[0]
                : date;

            await selectReservationDate(productUid, formattedDate);
            dispatch({ type: "SET_RESERVATION_DATE", data: formattedDate });
            alert("예약 날짜가 성공적으로 선택되었습니다.");
        } catch (error) {
            alert("예약 날짜 선택에 실패했습니다.");
            dispatch({ type: "SET_ERROR", data: error.message });
        }
    };

    // 옵션 저장 : 회원만
    const handleSaveReservation = async () => {
        if (!accessToken) {
            alert("로그인이 필요한 서비스입니다.");
            // 현재 페이지 URL 저장 (옵션 진행 중인 페이지)
            const currentPath = window.location.pathname + window.location.search;
            localStorage.setItem("redirectAfterLogin", currentPath);

            navigate("/login");
            return;
        }

        try {
            const optionData = {
                optionCode: state.options[0].optionCode || undefined,
                productTitle: state.productTitle,
                reservationDate: state.reservationDate,
                adultCount: state.options[0].adultCount || 0,
                childCount: state.options[0].childCount || 0,
                totalPrice: state.options[0].price || 0,
            };
            // 서버에서 생성된 optionCode 가져오기
            const optionCode = await saveReservation(
                productUid,
                optionData.reservationDate,
                optionData.adultCount,
                optionData.childCount,
                accessToken
            );
            // 옵션 코드와 옵션 데이터 저장
            optionData.optionCode = optionCode;
            localStorage.setItem("optionCode", optionCode);
            localStorage.setItem("optionData", JSON.stringify(optionData));
            alert("옵션을 성공적으로 생성했습니다.");
            navigate(`/products/${productUid}/order/create/${optionCode}`);
        } catch (error) {
            alert("옵션 생성에 실패했습니다.");
        }
    };

    if (state.loading) return <p>옵션 정보를 불러오는 중...</p>;
    if (state.error) return <p>{state.error}</p>;

    return(
        <>
            <OptionFormCom
                productUid={productUid}
                options={state.options || []}
                reservationDate={state.reservationDate}
                onOptionChange={handleOptionChange}
                onAdultCountChange={handleAdultCountChange}
                onChildCountChange={handleChildCountChange}
                onDateSelect={handleDateSelect}
                onReserve={handleSaveReservation}
                totalPrice={state.totalPrice}
                optionData={{
                    availableStartDate: state.availableStartDate,
                    availableEndDate: state.availableEndDate,
                }}
            />
        </>
    )
}
export default OptionFormCon;