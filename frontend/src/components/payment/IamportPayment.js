export function requestIamportPayment( orderData, paymentMethod ) {
    // useEffect(() => {
    //     if (!window.IMP) return;
    //     window.IMP.init("imp"); // 아임포트 가맹점 식별코드
    // }, []);
    return new Promise((resolve, reject) => {
    if (!window.IMP) {
        alert("아임포트 객체가 로드되지 않았습니다.");
        return;
    }
        window.IMP.init("imp");

    // const handlePayment = () => {
    const {
        productTitle,
        totalPrice,
        memberName,
        memberEmail,
        memberPhone,
        orderCode,
        bookingUid,
        productThumbnail
    } = orderData;

        const pgMap = {
            CARD: "danal_tpay", // PG사
            KAKAO_PAY: "kakaopay.TC0ONETIME", // 카카오페이 PG사 설정
        };

        if (!pgMap[paymentMethod]) {
            alert("지원하지 않는 결제 수단입니다.");
            return reject("Invalid payment method");
        }

    const data = {
        pg: pgMap[paymentMethod],   // 선택된 결제 수단에 따라 pg 지정
        pay_method: "card",
        merchant_uid: `ORD-${Date.now()}-${orderCode}`, // 고유 주문번호
        name: productTitle || "주문명 없음",
        amount: totalPrice || 1000,
        buyer_name: memberName,
        buyer_email: memberEmail,
        buyer_tel: memberPhone,
        m_redirect_url: "http://localhost:3000/payments/complete"
    };

    // window.IMP.request_pay(data, function (rsp) {
    //     if (rsp.success) {
    //         console.log("✅ 결제 성공:", rsp);
    //         // 서버에 결제 검증 요청 등 추가 가능
    //         window.location.href = "/payments/complete";
    //     } else {
    //         console.error("❌ 결제 실패:", rsp);
    //         alert("결제가 실패했습니다: " + rsp.error_msg);
    //     }
    // });
    window.IMP.request_pay(data, function (rsp) {
        if (rsp.success) {
            resolve({
                // bookingUid,
                bookingUid: rsp.merchant_uid,
                impUid: rsp.imp_uid,
                orderCode: orderData.orderCode,
                orderDate: new Date().toLocaleDateString(),
                productTitle,
                productThumbnail,
                totalPrice
            });
        } else {
            reject(rsp.error_msg);
        }
    });
    });
    // };
}