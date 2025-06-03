import styled from "styled-components";

export const StyleReviewBlock = styled.div`
    //display: flex;
    justify-content: center;
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

export const StyleContentWrap = styled.div`
    width: 90%;
    max-width: 2000px;
`;

export const TitleWrapper = styled.div`
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ListTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
`;

export const StyledTable = styled.table`
    width: 100%;
    border-radius: 12px;
    border-collapse: collapse;
    border: 1px solid #e0e0e0;
    overflow: hidden;
    font-size: 0.95rem;

    th, td {
        //width: 30px;
        padding: 20px 5px;
        border: none;
        text-align: center;
    }

    thead {
        background-color: #f5f5f5;
        color: #333;
        font-weight: bold;
    }

    tbody tr {
        border-bottom: 1px solid #eee;
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
    .title {
        width: 200px;
    }
    .rating {
        width: 30px;
    }
    .name {
        width: 80px;
    }
    .content {
        width: 380px;
    }
    .use {
        width: 100px;
    }
    .create {
        width: 200px;
    }
    .status {
        width: 30px;
    }
`;

export const ProductTitleCell = styled.td`
    cursor: pointer;

    &:hover {
        text-decoration: underline;
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
    status === "ACTIVE" ? "#00796b" :
        status === "DELETE_BY_ADMIN" ? "#c62828" :
            "#555"};
    background-color: ${({ status }) =>
    status === "ACTIVE" ? "#e0f2f1" :
        status === "DELETE_BY_ADMIN" ? "#ffebee" :
            "#eee"};
`;

export const DivWrap = styled.div`
    margin: auto;
    width : 90%;
    padding-bottom : 8rem;
    min-height : 80vh;
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