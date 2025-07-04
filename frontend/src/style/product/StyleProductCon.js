import styled from "styled-components";

export const TourPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;

    @media (max-width: 768px) {
        padding: 16px 10px;
    }
`;

export const TourHeader = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 20px;
        margin-bottom: 15px;
    }
`;

export const TourCard = styled.div`
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: row;
  transition: 0.3s;
    width: 100%;
    margin: 15px 0;
    
    &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

    @media (max-width: 768px) {
        //grid-template-columns: 1fr; // 모바일에서는 한 줄에 하나씩
        gap: 15px;
        flex-direction: column; // 모바일에서는 세로로 정렬
        margin: 10px 0;
    }
`;

export const CardImageWrapper = styled.div`
  width: 300px; /* 이미지 영역의 고정 너비 설정 (캡처 이미지 비율을 고려) */
  height: 250px; /* 이미지 높이 유지 */
  flex-shrink: 0; /* 이미지 영역 크기 유지 */
  border-radius: 8px 0 0 8px; /* 왼쪽 상단과 왼쪽 하단 둥글게 */
  overflow: hidden; /* 이미지가 wrapper 밖으로 나가지 않도록 */
    padding: 16px;
    align-content: center;

    @media (max-width: 768px) {
        width: 100%; // 모바일에서는 전체 너비 사용
        height: 200px; // 모바일 이미지 높이 조정
        border-radius: 8px 8px 0 0; // 모바일에서는 상단만 둥글게
        padding: 10px;
    }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
    border-radius: 8px; /* 왼쪽 하단과 왼쪽 상단 둥글게 */
    flex-shrink: 0; /* 이미지 크기 고정 */

    @media (max-width: 768px) {
        border-radius: 8px; // 모바일에서는 모든 모서리 둥글게
    }
`;


export const CardContent = styled.div`
  padding: 16px;
  display: flex;
    flex-direction: column;
    justify-content: center; /* 수직 가운데 정렬 */
    gap: 6px;
    flex-grow: 1; /* 텍스트가 남은 공간을 채움 */

    @media (max-width: 768px) {
        padding: 12px;
        gap: 4px;
    }
`;


export const CardTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
    color: #333;
  margin: 0;

    @media (max-width: 768px) {
        font-size: 15px;
    }
`;

export const CardSubInfo = styled.div`
  font-size: 14px;
  color: #666;
    display: flex;
    align-items: center; /* 아이콘과 텍스트를 세로로 정렬 */
    justify-content: ${(props) => (props.$noSpaceBetween ? "space-between" : "flex-start")}; /* 조건부 설정 */
    gap: 10px;
    margin-top: 8px;

    @media (max-width: 768px) {
        font-size: 13px;
        margin-top: 5px;
        gap: 8px;
    }
`;

export const CardPrice = styled(CardSubInfo)`
  font-weight: bold; /* 글자 진하게 */
  font-size: 25px; /* 약간 더 큰 폰트 크기 */
  color: #000; /* 기본 텍스트보다 조금 더 강조된 색상 */

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;


export const ProductUid = styled.span`
  font-size: 12px;
  color: #999;
  margin-left: auto; /* 오른쪽 끝으로 배치 */

    @media (max-width: 768px) {
        font-size: 11px;
    }
`;


export const ViewDetailButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff; /* 기본 파란색 */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3; /* hover 효과 */
  }

    @media (max-width: 768px) {
        padding: 7px 14px;
        font-size: 13px;
    }
`;

export const CalendarTextContainer = styled.div`
  display: flex;
  flex-direction: column; /* 텍스트를 세로로 배치 */
  align-items: flex-start; /* 텍스트를 왼쪽 정렬 */
  flex-grow: 1; /* 전체 너비를 차지 */
`;

export const CalendarText = styled.span`
  font-size: 14px;
  color: #666;
    
    @media (max-width: 768px) {
        font-size: 13px;
    }
`;

export const FilterSortBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 16px;
    gap: 10px;

    @media (max-width: 768px) {
        align-items: flex-start;
        margin-bottom: 10px;
    }
`;

export const FilterSection = styled.div`
  display: flex;
  align-items: center;
    margin: 0 10px;

    @media (max-width: 768px) {
        margin: 5px 0;
        justify-content: flex-end;
    }
`;

export const FilterResetBtn = styled.button`
  background: none;
  border: 1px solid #ccc;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }

    @media (max-width: 768px) {
        font-size: 13px;
        width: max-content;
    }
`;

export const SortSection = styled.div`
  display: flex;
  gap: 10px;

    @media (max-width: 768px) {
        margin: 10px;
        padding: 1px;
        justify-content: flex-end;
    }
`;

export const SortBtn = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover {
    font-weight: bold;
    text-decoration: underline;
  }


    @media (max-width: 768px) {
        font-size: 13px;
    }
`;

export const WishOneButton = styled.button`
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 24px;
    color: #ff5e5e;
    
    &:hover {
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;



