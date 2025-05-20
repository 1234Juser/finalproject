export function requestIamportPayment( orderData ) {
    // useEffect(() => {
    //     if (!window.IMP) return;
    //     window.IMP.init("imp"); // 아임포트 가맹점 식별코드
    // }, []);
    if (!window.IMP) {
        alert("아임포트 객체가 로드되지 않았습니다.");
        return;
    }
    window.IMP.init("imp숫자비밀");

    // const handlePayment = () => {
        const { productTitle, totalPrice, memberName, memberEmail, memberPhone, orderCode } = orderData;

        const data = {
            pg: "danal_tpay", // PG사
            pay_method: "card",
            merchant_uid: `ORD-${orderCode}-${Date.now()}`, // 고유 주문번호
            name: productTitle || "주문명 없음",
            amount: totalPrice || 1000,
            buyer_name: memberName,
            buyer_email: memberEmail,
            buyer_tel: memberPhone,
            m_redirect_url: "http://localhost:3000/payments/complete"
        };

        window.IMP.request_pay(data, function (rsp) {
            if (rsp.success) {
                console.log("✅ 결제 성공:", rsp);
                // 서버에 결제 검증 요청 등 추가 가능
                window.location.href = "/payments/complete";
            } else {
                console.error("❌ 결제 실패:", rsp);
                alert("결제가 실패했습니다: " + rsp.error_msg);
            }
        });
    // };
}