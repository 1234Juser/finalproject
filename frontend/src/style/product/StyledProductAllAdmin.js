import styled from 'styled-components';

export const TableContainer = styled.div`
    width: 100%;
    max-width: 100%; /* 부모 요소의 너비를 초과하지 않도록 설정 */
    overflow-x: auto; /* 테이블 내용이 길다면 가로 스크롤 활성화 */
    margin: 20px 0;
    border: 1px solid #ddd;

  @media (max-width: 768px) {
    //width: 100%;
    overflow-x: scroll;
  }
`;

export const StyledTable = styled.table`
  min-width: 1200px;
    width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  text-align: left;
    font-size: 12px;

  thead {
    background-color: #f4f4f4;
  }

  th {
    padding: 5px;
    border: 1px solid #ddd;
      position: sticky;
      top: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
      overflow: hidden;

  }

  tbody tr {

    &:hover {
      background-color: #f1f1f1;
    }
  }

  td {
    padding: 5px;
    border: 1px solid #ddd;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

  }
`;

