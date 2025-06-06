import MyReceiptCom from "../../components/booking/MyReceiptCom";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useReducer, useState} from "react";
import {initialState, reservationReducer} from "../../modules/reservationModule";
import {cancelMyReservation, fetchReservationByBookingUid} from "../../service/reservationService";
import {fetchPaymentByBookingUid} from "../../service/paymentService";
import {productFormReducer} from "../../modules/productReducer";
import {fetchAdProducts, getProductDetail} from "../../service/ProductService";

function MyReceiptCon({orderCode, optionCode, accessToken}){
    const {bookingUid} = useParams();
    const { productUid } = useParams();
    const { impUid } = useParams();
    const [state, dispatch] = useReducer(reservationReducer, initialState);
    const [productState, productDispatch] = useReducer(productFormReducer, initialState);
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) {
            alert("로그인이 필요합니다.");
            return;
        }
        const loadData = async () => {
            if (!bookingUid || !accessToken) return;
            dispatch({ type: "LOADING" });

            try {
                const reservation = await fetchReservationByBookingUid(bookingUid, accessToken);
                dispatch({ type: "FETCH_SUCCESS", payload: reservation });

                // 추가로 결제 정보와 상품 정보도 조회
                const payment = await fetchPaymentByBookingUid(bookingUid, accessToken);
                dispatch({ type: "SET_PAYMENT", payload: payment });

                const product = await getProductDetail(reservation.productUid, accessToken);
                dispatch({ type: "SET_PRODUCT", payload: product });

            } catch (error) {
                if (error.response && error.response.status === 403) {
                    alert("접근 권한이 없습니다.");
                    navigate("/");
                } else {
                    dispatch({ type: "FETCH_ERROR", payload: error.message });
                }
            }
        };
        loadData();
    }, [bookingUid, productUid, optionCode, impUid, accessToken]);

    useEffect(() => {
        fetchAdProducts()
            .then(data => {
                if (Array.isArray(data)) {
                    data.forEach((item, index) => {
                    });
                } else {
                }
                productDispatch({ type: "SET_AD_PRODUCTS", payload: data });
            })
            .catch(()=> {
            });
    }, []);

    const handleCancel = (orderCode) => {
        if (!orderCode) {
            alert("취소할 예약이 없습니다.");
            return;
        }
        if (window.confirm("정말 이 예약을 취소하시겠습니까?")) {
            cancelMyReservation(orderCode, accessToken)
                .then(() => {
                    alert("예약이 취소되었습니다.");
                    dispatch({ type: "REMOVE_RESERVATION", payload: orderCode });
                })
                .catch(() => {
                    alert("예약 취소 중 오류가 발생했습니다.");
                });
        }
    }

    const convertToKST = (date) => {
        if (!date) return "시간 정보 없음";
        const localDate = new Date(date);
        return localDate.toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
    };

    return(
        <>
            <MyReceiptCom
                order={state.order}
                option={state.option}
                payment={state.payment}
                product={state.product}
                bookingUid={bookingUid}
                adProducts={productState.adProducts}
                onCancelReservation={handleCancel}
                onBack={() => navigate("/my/reservations")}
                convertToKST={convertToKST}  // KST 변환 함수 전달
            />
        </>)
}
export default MyReceiptCon;