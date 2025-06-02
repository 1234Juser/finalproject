import { format } from "date-fns";

export function requestIamportPayment( orderData, paymentMethod ) {
    return new Promise((resolve, reject) => {
        if (!window.IMP) {
            alert("아임포트 객체가 로드되지 않았습니다.");
            return;
        }
        window.IMP.init("imp71405518");

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
            CARD: "html5_inicis", // PG사
            KAKAO_PAY: "kakaopay.TC0ONETIME", // 카카오페이 PG사 설정
            BANK_TRANSFER: "html5_inicis",   // 무통장입금
        };

        if (!pgMap[paymentMethod]) {
            alert("지원하지 않는 결제 수단입니다.");
            return reject("Invalid payment method");
        }

        const merchantUid = `ORD-${Date.now()}-${orderCode}`;// 고유 주문번호
        const data = {
            pg: pgMap[paymentMethod],   // 선택된 결제 수단에 따라 pg 지정
            merchant_uid: merchantUid,
            name: productTitle || "주문명 없음",
            amount: totalPrice || 1000,
            buyer_name: memberName,
            buyer_email: memberEmail,
            buyer_tel: memberPhone,
            m_redirect_url: "http://localhost:3000/payments/complete"
            // m_redirect_url: "http://https://hellotravelogic.link/payments/complete"
        };

        if (paymentMethod === "CARD") {
            data.pay_method = "card";
        } else if (paymentMethod === "KAKAO_PAY") {
            data.pay_method = "card";
        } else if (paymentMethod === "BANK_TRANSFER") {
            data.pay_method = "vbank";

            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(23, 59, 59, 0);
            const vbankDue = format(tomorrow, "yyyy-MM-dd HH:mm:ss");
            data.vbank_due = vbankDue;
        }

        window.IMP.request_pay(data, function (rsp) {
            if (rsp.success) {
                // 백엔드로 넘겨주는 정보들
                resolve({
                    bookingUid: rsp.merchant_uid,
                    merchantUid,
                    impUid: rsp.imp_uid,
                    receiptUrl: rsp.receipt_url,
                    pay_method: rsp.pay_method,
                    paymentMethod: paymentMethod,
                    paymentBrand: rsp.card_name || rsp.vbank_name || "기타",
                    orderCode: orderData.orderCode,
                    memberCode: orderData.memberCode,
                    orderDate: new Date().toLocaleDateString(),
                    productTitle,
                    productThumbnail: productThumbnail || "/img/empty/empty-list.jpeg",
                    totalPrice,
                    paymentAmount: totalPrice,
                    vbankNum: rsp.vbank_num || null,
                    vbankName: rsp.vbank_name || null,
                    vbankHolder: rsp.vbank_holder || null,
                    vbankDue: data.vbank_due,
                });
            } else {
                reject(rsp.error_msg);
            }
        });
    });
}