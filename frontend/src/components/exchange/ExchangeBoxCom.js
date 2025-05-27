import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaDollarSign, FaWonSign, FaEuroSign, FaPoundSign, FaYenSign } from "react-icons/fa";
import {
    ExchangeBoxWrapper,
    ExchangeTitle,
    RateTable,
    RateRow,
    RateIconCell,
    RateNameCell,
    RateValueCell,
    BaseDate
} from "../../style/exchange/ExchangeBoxStyle";

// CNY도 FaYenSign으로 대체
const icons = {
    KRW: <FaWonSign color="#009688" />,
    EUR: <FaEuroSign color="#2b7eb8" />,
    GBP: <FaPoundSign color="#ac6" />,
    CNY: <FaYenSign color="#eb5536" />,      // ★ FaYenSign 활용
    JPY: <FaYenSign color="#ffae00" />
};

function ExchangeBoxCom() {
    const [rates, setRates] = useState(null);
    const currencyKeys = [
        { render: "KRW(원)", code: "KRW" },
        { render: "EUR(유로)", code: "EUR" },
        { render: "GBP(파운드)", code: "GBP" },
        { render: "CNY(위안화)", code: "CNY" },
        { render: "JPY(엔화)", code: "JPY" }
    ];

    useEffect(() => {
        axios.get("/exchange/main").then(res => setRates(res.data));
    }, []);

    if (!rates) return <ExchangeBoxWrapper>환율 정보를 불러오는 중...</ExchangeBoxWrapper>;

    return (
        <ExchangeBoxWrapper>
            <ExchangeTitle>
                <FaDollarSign style={{ marginRight: 8 }} />
                오늘의 환율 <span style={{ fontSize:14, color:"#666", fontWeight:500 }}>(1 USD 기준)</span>
            </ExchangeTitle>
            <RateTable>
                <tbody>
                {currencyKeys.map(({ render, code }) => (
                    <RateRow key={render}>
                        <RateIconCell>{icons[code]}</RateIconCell>
                        <RateNameCell>{render}</RateNameCell>
                        <RateValueCell>
                            {rates.rates[code]?.toFixed?.(6) || rates.rates[code]}
                        </RateValueCell>
                    </RateRow>
                ))}
                </tbody>
            </RateTable>
            <BaseDate>(기준일: {rates.date})</BaseDate>
        </ExchangeBoxWrapper>
    );
}

export default ExchangeBoxCom;