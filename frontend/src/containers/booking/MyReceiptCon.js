import MyReceiptCom from "../../components/booking/MyReceiptCom";
import {useParams} from "react-router-dom";
import {useEffect, useReducer} from "react";
import {initialState, reservationReducer} from "../../modules/reservationModule";
import {fetchReservationByBookingUid} from "../../service/reservationService";
import {fetchPaymentByBookingUid} from "../../service/paymentService";
import {productFormReducer} from "../../modules/productReducer";
import {fetchAdProducts} from "../../service/ProductService";
import AdSlider from "../../components/ad/AdSlider";

function MyReceiptCon({accessToken}){
    const {bookingUid} = useParams();
    const [state, dispatch] = useReducer(reservationReducer, initialState);
    const [productState, productDispatch] = useReducer(productFormReducer, initialState);

    useEffect(() => {
        console.log("✅ 예약 조회 요청: bookingUid =", bookingUid);
        console.log("✅ 예약 조회 요청: accessToken =", accessToken);
        if (!accessToken) {
            alert("로그인이 필요합니다.");
            return;
        }
        if (accessToken) {
            try {
                dispatch({ type: "LOADING" });
                fetchReservationByBookingUid(accessToken, bookingUid)
                    .then(data => {
                        console.log("📦 예약 조회 성공:", data);
                        dispatch({ type: "FETCH_SUCCESS", payload: data });
                    })
                    .catch((err) => {
                        console.error("예약 조회 실패:", err.message);
                        dispatch({ type: "FETCH_ERROR", payload: err.message });
                    });
            } catch (e) {
                console.error("토큰 파싱 실패", e);
                alert("인증 정보가 잘못되었습니다. 다시 로그인 해주세요.");
            }
        } else {
            alert("로그인이 필요합니다.");
        }
    }, [accessToken, bookingUid]);

    useEffect(() => {
        fetchAdProducts()
            .then(data => {
                console.log("📦 광고 상품 목록:", data);

                if (Array.isArray(data)) {
                    data.forEach((item, index) => {
                        console.log(`🔍 [${index}] productThumbnail:`, item.productThumbnail);
                    });
                } else {
                    console.warn("❌ 예상한 배열 형태가 아닙니다:", data);
                }

                productDispatch({ type: "SET_AD_PRODUCTS", payload: data });
            })
            .catch(err => {
                console.error("광고 상품 로딩 실패:", err);
            });
    }, []);

    const { productTitle, productThumbnail, productCity, productDescription, orderDateTime, mapUrl } = state;

    const onCheckPayment = () => {
        if (!bookingUid) return;
        fetchPaymentByBookingUid(bookingUid, accessToken)
            .then(data => {
                const { paymentTime, paymentStatus, paymentBrand, paymentAmount } = data;
                alert(
                    `🧾 결제 정보\n\n결제시간: ${paymentTime}\n결제상태: ${paymentStatus}\n카드사: ${paymentBrand}\n결제금액: ${paymentAmount.toLocaleString()}원`
                );
            })
            .catch(err => {
                alert("결제 정보를 불러오지 못했습니다.");
                console.error("결제 조회 실패", err);
            });
    };


    return(
    <>
        <MyReceiptCom
            bookingUid={bookingUid}
            adProducts={productState.adProducts}
            productTitle={productTitle}
            productThumbnail={productThumbnail}
            productCity={productCity}
            productDescription={productDescription}
            orderDateTime={orderDateTime}
            mapUrl={mapUrl}
            onCheckPayment={onCheckPayment}
        />
        {/*<AdSlider adProducts={productState.adProducts} />*/}
    </>)

}
export default MyReceiptCon;