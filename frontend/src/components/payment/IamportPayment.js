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
        memberCode,
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
        VBANK: "html5_inicis"   // 무통장입금
    };

    if (!pgMap[paymentMethod]) {
        alert("지원하지 않는 결제 수단입니다.");
        return reject("Invalid payment method");
    }

    const merchantUid = `ORD-${Date.now()}-${orderCode}`;// 고유 주문번호
    const data = {
        pg: pgMap[paymentMethod],   // 선택된 결제 수단에 따라 pg 지정
        // pay_method: "card",
        // merchant_uid: `ORD-${Date.now()}-${orderCode}`, // 고유 주문번호
        merchant_uid: merchantUid,
        name: productTitle || "주문명 없음",
        amount: totalPrice || 1000,
        buyer_name: memberName,
        buyer_email: memberEmail,
        buyer_tel: memberPhone,
        m_redirect_url: "http://localhost:3000/payments/complete"
    };

        if (paymentMethod === "CARD") {
            data.pay_method = "card";
        } else if (paymentMethod === "KAKAO_PAY") {
            data.pay_method = "card";
        } else if (paymentMethod === "BANK_TRANSFER") {
            data.pay_method = "vbank";
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(23, 59, 0, 0);
            const vbank_due = tomorrow
                .toISOString()
                .replace(/[-T:]/g, "")
                .substring(0, 14);
            data.vbank_due = vbank_due;
        }

        window.IMP.request_pay(data, function (rsp) {
            if (rsp.success) {
                // 백엔드로 넘겨주는 정보들
                resolve({
                    bookingUid: rsp.merchant_uid,
                    impUid: rsp.imp_uid,
                    receiptUrl: rsp.receipt_url,
                    pay_method: rsp.pay_method,
                    paymentBrand: rsp.card_name || rsp.vbank_name || "기타",
                    orderCode: orderData.orderCode,
                    memberCode: orderData.memberCode,
                    orderDate: new Date().toLocaleDateString(),
                    productTitle,
                    productThumbnail,
                    totalPrice,
                    paymentAmount: totalPrice,
                });
            } else {
                reject(rsp.error_msg);
            }
        });
    });
}