import styled from "styled-components";

export const ExchangeBoxWrapper = styled.div`
    background: linear-gradient(135deg, #e3f0ff 0%, #f9f9ff 100%);
    border-radius: 18px;
    width:600px;
    box-shadow: 0 4px 16px rgba(46, 120, 220, 0.07), 0 1.5px 6px rgba(46, 120, 220, 0.06);
    padding: 10px 26px 5px 26px; /* 상하 padding을 10px, 5px로 더 줄였습니다. */
    border: 1px solid #e3ebfb;
    transition: box-shadow 0.2s;

    @media (max-width: 570px) {
        padding: 8px 7vw 6px 7vw; /* 모바일 뷰에서도 padding 조정 */
        font-size: 15.5px;
    }
`;

export const ExchangeTitle = styled.h3`
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 10px; /* 22px에서 10px로 줄였습니다. */
    color: #2562ac;
    display: flex;
    align-items: center;
`;

export const RateTable = styled.table`
    width: 100%;
    border-spacing: 0 16px;
`;

export const RateRow = styled.tr`
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(74, 145, 255, 0.03);
    transition: background 0.2s;
    &:hover {
        background: #f0f7ff;
    }
`;

export const RateIconCell = styled.td`
    padding: 2px 0 2px 4px; /* 7px에서 2px로 줄였습니다. */
    width: 22px;
    font-size: 18px;
    vertical-align: middle;
`;

export const RateNameCell = styled.td`
    padding: 2px 0 2px 8px; /* 7px에서 2px로 줄였습니다. */
    font-weight: 600;
    color: #124b74;
`;

export const RateValueCell = styled.td`
    text-align: right;
    padding: 2px 0 2px 12px; /* 7px에서 2px로 줄였습니다. */
    font-family: 'Roboto Mono', 'Consolas', monospace;
    font-size: 1.01rem;
    letter-spacing: 0.4px;
    color: #09769e;
`;

export const BaseDate = styled.div`
    font-size: 13px;
    color: #8a99b2;
    margin-top: 13px;
    text-align: right;
`;