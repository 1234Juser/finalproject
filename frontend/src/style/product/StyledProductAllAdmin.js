import styled from 'styled-components';

export const TableContainer = styled.div`
    width: 1300px;
    height: 350px;
    white-space: nowrap;  /* 테이블 줄바꿈 방지 */
    margin: 20px 0;
    border: 1px solid #ddd;
    overflow-x: scroll;
    mid-width: 1300px;

    @media (max-width: 768px) {
        //width: 100%;
        overflow-x: scroll;
    }
`;


export const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 20px 0;
`;

export const PageButton = styled.button`
    margin: 0 5px;
    padding: 5px 10px;
    background-color: ${(props) => (props.active ? 'rgba(211,211,211,0.2)' : 'white')};
    border: none;
    cursor: ${(props) => (props.active ? 'not-allowed' : 'pointer')};
    color : ${(props) => (props.active ? 'blue' : 'black')};

    &:disabled {
        cursor: not-allowed;
        background-color: rgba(190, 190, 190, 0.45);
    }
`;

export const NavButton = styled.button`
    margin: 0 5px;
    padding: 5px 10px;
    background-color: white;
    border: none;
    cursor: pointer;
    color : ${(props) => (props.active ? 'black' : 'light-gray')};

    &:disabled {
        cursor: not-allowed;
        //background-color: rgba(211, 211, 211, 0.75);
    }
`;




export const StyledTable = styled.table`
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    text-align: left;
    font-size: 12px;
    table-layout: fixed;        // 테이블 레이아웃 고정


    thead {
        background-color: #f4f4f4;
    }

    th, td {
        padding: 5px;
        border: 1px solid #ddd;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
    }

    th {
        position: sticky;
        top: 0;
    }

    tbody tr {
        &:hover {
            background-color: #f1f1f1;
        }
    }

    td {
        text-align: left;
    }

    /* Product Title 칼럼 너비 확장 */
    th:nth-child(1), td:nth-child(1), th:nth-child(4), td:nth-child(4),th:nth-child(5), td:nth-child(5) {
        width: 50px;
    }

    th:nth-child(2), td:nth-child(2) {
        width: 120px;
    }

    th:nth-child(3), td:nth-child(3) {
        width: 72px;
    }

    th:nth-child(6), td:nth-child(6) {
        width: 400px !important;
        max-width: 400px; /* 최대 너비 설정 */
        min-width: 400px; /* 최소 너비 설정 */
    }

    th:nth-child(7), td:nth-child(7),th:nth-child(8), td:nth-child(8), th:nth-child(15), td:nth-child(15) {
        width: 55px;
    }

    th:nth-child(9), td:nth-child(9),th:nth-child(10), td:nth-child(10) {
        width: 75px;
    }

    th:nth-child(11), td:nth-child(11),th:nth-child(12), td:nth-child(12) {
        width: 40px;
    }

    th:nth-child(13), td:nth-child(13) {
        width:68px;
    }
`;

