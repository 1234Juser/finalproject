import OptionFormCom from "../../components/order/OptionFormCom";
import {useEffect, useReducer, useState} from "react";
import {
    calculateTotalPrice,
    createOrder,
    fetchOptionForm,
    fetchOptionsByDate,
    fetchProduct, saveReservation, selectReservationDate
} from "../../service/orderService";
import {useNavigate, useParams} from "react-router-dom";
import {initialState, reducer} from "../../modules/optionModule";



function OptionFormCon({ accessToken }){
    const { productUid, optionCode } = useParams();
    const [state, dispatch] = useReducer(reducer, initialState);
    // const [optionData, setOptionData] = useState(null);
    //
    // const [productTitle, setProductTitle] = useState("");
    // const [selectedDate, setSelectedDate] = useState(null);
    // const [adultCount, setAdultCount] = useState(1);
    // const [childCount, setChildCount] = useState(0);
    // const [totalPrice, setTotalPrice] = useState(0);

    // const [options, setOptions] = useState([]);

    const navigate = useNavigate();

    // 옵션 폼 불러오는건 비회원도 가능
    useEffect(() => {
        const fetchData = async () => {
            try {
                const optionData = await fetchOptionForm(productUid);
                console.log("🟢 옵션 데이터:", optionData);

                const formattedData = {
                    optionCode: optionData.optionCode || 0,
                    productTitle: optionData.productTitle || "",
                    adultCount: 0,
                    childCount: 0,
                    adultPrice: optionData.productAdult || 0,
                    childPrice: optionData.productChild || 0,
                    price: (optionData.productAdult || 0) * 0 + (optionData.productChild || 0) * 0,
                };

                // dispatch({ type: "SET_OPTIONS", data: [formattedData] });
                dispatch({ type: "SET_OPTION_DATA", data: formattedData });
            } catch (error) {
                console.error("옵션 데이터를 불러오는 데 실패했습니다:", error);
                alert("옵션 데이터를 불러오는 데 실패했습니다.");
                dispatch({ type: "SET_ERROR", data: error.message });
            } finally {
                dispatch({ type: "SET_LOADING", data: false });
            }
        }
        fetchData();
        }, [productUid]);

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
            await selectReservationDate(productUid, date);
            dispatch({ type: "SET_RESERVATION_DATE", data: date });
            // alert("예약 날짜가 성공적으로 선택되었습니다.");
        } catch (error) {
            console.error("🔴 예약 날짜 선택 실패:", error);
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
            const optionCode = await saveReservation(productUid, state.reservationDate, accessToken);
            const optionData = {
                optionCode,
                productTitle: state.productTitle,
                reservationDate: state.reservationDate,
                adultCount: state.adultCount,
                childCount: state.childCount,
                totalPrice: state.totalPrice
            };
            localStorage.setItem("optionCode", optionCode);
            localStorage.setItem("optionData", JSON.stringify(optionData));
            alert("옵션이 성공적으로 저장되었습니다.");
            navigate(`/products/${productUid}/order/create/${optionCode}`);
        } catch (error) {
            console.error("🔴 옵션 저장 실패:", error);
            alert("옵션 저장에 실패했습니다.");
        }
    };

    if (state.loading) return <p>옵션 정보를 불러오는 중...</p>;
    if (state.error) return <p>{state.error}</p>;

    return(
        <>
            <OptionFormCom
                options={state.options || []}
                reservationDate={state.reservationDate}
                onOptionChange={handleOptionChange}
                // onOptionChange={(key, value) => dispatch({ type: "SET_OPTION_COUNT", key, value })}
                onAdultCountChange={handleAdultCountChange}
                onChildCountChange={handleChildCountChange}
                // onReserve={() => {}}
                onDateSelect={handleDateSelect}
                onReserve={handleSaveReservation}
                totalPrice={state.totalPrice}
            />
        </>
    )
}
export default OptionFormCon;