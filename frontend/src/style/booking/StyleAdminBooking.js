import styled from "styled-components";

export const FilterWrap = styled.div`
    text-align: right;
    margin-bottom: 1rem;
`;

export const DivWrap = styled.div`
    margin : auto;
    width : 90%;
    padding-bottom : 8rem;
    min-height : 80vh;
`;

export const StyleBookingBlock = styled.div`
    //display: flex;
    justify-content: center;
`;
export const StyleContentWrap = styled.div`
    width: 90%;
    max-width: 2000px;
    //max-width: 1400px;
    //margin: 0 auto;
`;
export const TitleWrapper = styled.div`
    height: 100px;               // 원하는 높이
    display: flex;
    justify-content: center;    // 가로 중앙
    align-items: center;        // 세로 중앙
    width: 100%;
`;
export const ListTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
    width: 100%;
    text-align: center;
`;

export const SelectBox = styled.select`
    padding: 6px 12px;
    border-radius: 6px;
    border: 1px solid #ccc;
`;

export const FilterAndActionWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

export const LeftBox = styled.div`
    display: flex;
    align-items: center;
`;

export const RightBox = styled.div`
    text-align: right;
`;

export const StyledForm = styled.form`
    //border-radius: 12px;
    overflow: hidden;
    //box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    background-color: #fff;
    transition: transform 0.2s ease-in-out;
`;
export const StyledTable = styled.table`
    width: 100%;font-size: 0.95rem;
    border-radius: 12px;
    border-collapse: collapse;
    border: 1px solid #e0e0e0;
    overflow: hidden;
    th, td {
        padding: 14px 16px;
        border: none;
        text-align: center;
    }
    thead {
        background-color: #f5f5f5;
        color: #333;
        font-weight: bold;
    }
    tbody tr {
        border-bottom: 1px solid #eee; // 행 간 경계만
    }

    tbody tr:last-child {
        border-bottom: none;
    }
    tbody tr:hover {
        background-color: #f5faff;
        transition: background-color 0.2s ease-in-out;
    }

    tbody td {
        color: #555;
    }

    td:first-child input[type="checkbox"] {
        transform: scale(1.2);
        cursor: pointer;
    }
`;
export const StyledActionButton = styled.button`
    background-color: #fbeff1;
    color: #333;
    padding: 8px 14px;
    border: 1px solid #f8dbe1;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: #f8dbe1;
    }
`;
export const StyledStatusBadge = styled.span`
    display: inline-block;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
    color: ${({ status }) =>
        status === "SCHEDULED" ? "#00796b" :
            status === "COMPLETED" ? "#2e7d32" :
                status === "CANCELED" ? "#c62828" : "#555"};
    background-color: ${({ status }) =>
        status === "SCHEDULED" ? "#e0f2f1" :
            status === "COMPLETED" ? "#e8f5e9" :
                status === "CANCELED" ? "#ffebee" : "#eee"};
`;
// 페이지 버튼들이 모인 구역
export const DivPage = styled.div`
    margin-top : 20px;
    text-align : center;
`;
// 페이지 버튼 낱개들
export const SpanPage = styled.span`
    width : 30px;
    display : inline-block;
    cursor : pointer;
`;

// 통계페이지용
export const StyleDiv = styled.div`
    margin : auto;
    //width : 100%;
    width : 90%;
    padding-bottom : 8rem;
    min-height : 80vh;
`;
export const DateFilterWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 1.5rem 0;
    padding: 1rem;
    background-color: #f5f5f5;
    border-radius: 12px;
    //box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    font-size: 1rem;
`;
export const DateLabel = styled.label`
    font-weight: 600;
    margin-right: 0.5rem;
    color: #333;
`;
export const DateInput = styled.input`
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 0.95rem;
    background-color: #fff;

    &:focus {
        outline: none;
        border-color: #4d90fe;
        box-shadow: 0 0 0 2px rgba(77, 144, 254, 0.2);
    }
`;
export const GraphDiv = styled.div`
    overflow-x: auto;
    overflow-y: hidden;
    //margin: 2rem auto;
    padding: 2rem;
    width: 100%;
    max-width: 1000px;
    background-color: #ffffff;
    border-radius: 12px;
    //box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;

    ul {
        list-style: none;
        padding: 0;
        width: 100%;
    }

    li {
        font-size: 1rem;
        margin-bottom: 0.5rem;
        color: #333;
    }

    canvas {
        max-width: 100%;
    }
`;
export const RevenueList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    background-color: #fafafa;
`;
export const RevenueItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 20px;
    border-bottom: 1px solid #e0e0e0;
    font-size: 0.95rem;
    color: #333;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: #f0f8ff;
        transition: background-color 0.2s ease-in-out;
    }

    .left {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .right {
        text-align: right;
        color: #666;
    }
    
    strong {
        font-weight: 600;
        color: #2b3e5c;
    }

    span {
        color: #666;
    }
`;
export const ColorDot = styled.span`
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 10px;
    background-color: ${({ color }) => color || "#ccc"};
`;