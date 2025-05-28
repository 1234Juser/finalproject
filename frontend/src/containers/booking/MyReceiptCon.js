import MyReceiptCom from "../../components/booking/MyReceiptCom";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useReducer, useState} from "react";
import {initialState, reservationReducer} from "../../modules/reservationModule";
import {cancelMyReservation, fetchReservationByBookingUid} from "../../service/reservationService";
import {fetchPaymentByBookingUid} from "../../service/paymentService";
import {productFormReducer} from "../../modules/productReducer";
import {fetchAdProducts, getProductDetail} from "../../service/ProductService";
import {orderInitialState, orderReducer} from "../../modules/orderModule";
import {reducer} from "../../modules/optionModule";

function MyReceiptCon({orderCode, optionCode, accessToken}){
    const [order, setOrder] = useState(null);
    const [option, setOption] = useState(null);
    const [payment, setPayment] = useState(null);
    const {bookingUid} = useParams();
    const { productUid } = useParams();
    const { impUid } = useParams();
    const [product, setProduct] = useState([]);
    const [state, dispatch] = useReducer(reservationReducer, initialState);
    const [productState, productDispatch] = useReducer(productFormReducer, initialState);
    const [orderState, orderDispatch] = useReducer(orderReducer, orderInitialState);
    const [optionState, optionDispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    useEffect(() => {
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
                dispatch({ type: "FETCH_ERROR", payload: error.message });
            }
        };
        loadData();
    }, [bookingUid, productUid, optionCode, impUid, accessToken]);

    useEffect(() => {
        if (!accessToken) {
            alert("로그인이 필요합니다.");
            return;
        }
        if (accessToken) {
            try {
                dispatch({ type: "LOADING" });
                fetchReservationByBookingUid(bookingUid, accessToken)
                    .then(data => {
                        dispatch({ type: "FETCH_SUCCESS", payload: data });
                    })
                    .catch((err) => {
                        dispatch({ type: "FETCH_ERROR", payload: err.message });
                    });
            } catch (e) {
                alert("인증 정보가 잘못되었습니다. 다시 로그인 해주세요.");
            }
        } else {
            alert("로그인이 필요합니다.");
        }
    }, [bookingUid, accessToken]);

    useEffect(() => {
        getProductDetail(productUid, accessToken)
            .then((data) => {
                setProduct(data);
            })
            .catch((err) => console.error("상품 조회 오류 (국가):", err));
    }, [productUid, accessToken])

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
            .catch(err => {
                console.error("광고 상품 로딩 실패:", err);
            });
    }, []);

    const { productTitle, productThumbnail, productCity, productDescription, orderDate } = state;

    const handleCancel = (orderCode) => {
        console.log("취소 요청 들어온 orderCode:", orderCode);
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
                .catch(err => {
                    alert("예약 취소 중 오류가 발생했습니다.");
                });
        }
    }

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
        />
    </>)
}
export default MyReceiptCon;