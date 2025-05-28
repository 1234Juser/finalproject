import styled from "styled-components";

// 테이블 컨테이너 스타일
export const TableContainer = styled.div`
  width: 90%; /* 전체 너비를 조정 */
  max-height: 500px; /* 최대 높이 설정 */
  margin: 20px auto; /* 가운데 정렬 */
  overflow-x: auto; /* 가로 스크롤 추가 */
  overflow-y: auto; /* 세로 스크롤 추가 */
  background-color: #f9f9f9; /* 약간 밝은 배경색 */
  border-radius: 15px; /* 테두리에 둥근 모서리 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 테이블에 그림자 추가 */
  padding: 10px; /* 내부 패딩 */
`;

// 페이지네이션 컨테이너 스타일
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center; /* 페이지 버튼을 가운데 정렬 */
  align-items: center;
  margin: 20px 0;
  gap: 10px; /* 버튼 사이의 간격 */
`;

// 페이지 버튼 스타일
export const PageButton = styled.button`
  padding: 8px 12px; /* 버튼 크기 조정 */
  background-color: ${(props) =>
    props.active ? "#007bff" : "white"}; /* 활성화된 버튼 강조 */
  border: 1px solid ${(props) => (props.active ? "#007bff" : "#ccc")}; /* 활성화된 버튼 테두리 강조 */
  border-radius: 5px; /* 버튼 모서리를 둥글게 */
  cursor: ${(props) => (props.active ? "not-allowed" : "pointer")};
  color: ${(props) => (props.active ? "white" : "#333")}; /* 버튼 글자색 설정 */
  font-weight: ${(props) => (props.active ? "bold" : "normal")}; /* 활성 버튼은 굵게 */
  transition: all 0.2s ease; /* 버튼 이동 효과 */

  &:hover {
    background-color: ${(props) =>
      props.active ? "#007bff" : "#f1f1f1"}; /* 활성과 비활성 hover 색상 */
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7; /* 비활성 버튼 투명도 */
  }
`;

export const NavButton = styled.button`
  padding: 8px 12px;
  background-color: #fff;
  border: 1px solid #ccc; /* 버튼 테두리 추가 */
  border-radius: 5px;
  cursor: pointer;
  color: #333;

  &:hover {
    background-color: #f1f1f1; /* hover 효과 */
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5; /* 비활성 버튼 투명도 */
  }
`;

// 테이블 스타일(정돈 및 깔끔한 디자인)
export const StyledTable = styled.table`
  width: 100%; /* 테이블 전체 너비 */
  border-collapse: collapse; /* 테두리 겹침 제거 */
  font-family: Arial, sans-serif;
  background-color: white; /* 테이블 배경색 */
  border-radius: 10px;
  overflow: hidden;

  thead {
    background-color: #003874; /* 헤더 배경색 */
    color: white; /* 헤더 글자색 */
    font-size: 16px;
  }

  th, 
  td {
    padding: 10px;
    border: 1px solid #ddd; /* 셀 테두리 */
    text-align: left;
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    overflow: hidden; /* 넘치는 텍스트 숨기기 */
    text-overflow: ellipsis; /* 넘어간 텍스트 처리 */
  }

  th {
    font-weight: 500;
  }

  tbody tr {
    transition: background-color 0.2s ease; /* hover 효과 추가 */
    &:hover {
      background-color: #f4f4f4; /* hover 시 배경색 */
    }
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9; /* 홀/짝 색상 차이를 줌 */
  }
`;

// 모달 오버레이 스타일
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 모달 컨텐츠 스타일
export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  color: #007bff;

  &:hover {
    color: red;
  }
`;

// 이미지 버튼 스타일링
export const ImageButton = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

// 버튼과 내용 영역을 조화롭게 정렬
export const DivContainer = styled.div`
  display: flex;
  justify-content: space-between; /* 좌우로 정렬 */
  align-items: center; /* 세로 정렬 */
  margin: 20px auto;
  padding: 10px;
  border-radius: 8px;
  background-color: #f9f9f9; /* 배경색 추가 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 약간의 그림자 효과 */
    width: 90%;
`;