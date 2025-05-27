import styled from "styled-components";

// EventListStyle.js에서 가져온 컬러 팔레트 (필요하다면 수정)
const Palette = {
    mainGradient: "linear-gradient(95deg, #36abc9 0%, #198dbb 100%)",
    blue: "#198dbb",
    blueLight: "#36abc9",
    borderGray: "#e4e9f1",
    shadow: "0 2px 18px 0 rgba(30,70,160,0.09)",
    cardShadow: "0 4px 16px 0 rgba(30,70,160,0.13)",
    bg: "#f4f8fd",
    text: "#273a69",
    subText: "#6a87a9",
    white: "#fff",
    tabShadow: "0 2px 8px #92c7eb55"
};

export const TourPageContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px 16px;
`;


export const TourHeader = styled.h3`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
`;


export const TourCard = styled.div`
    border-radius: 12px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: row;
    transition: 0.3s;
    gap: 16px;
    width: 100%;
    margin-bottom: 16px; /* 카드 간 간격 추가 */


    &:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
`;

export const CardImageWrapper = styled.div`
    width: 250px; /* 이미지 영역의 고정 너비 설정 (캡처 이미지 비율을 고려) */
    height: 200px; /* 이미지 높이 유지 */
    flex-shrink: 0; /* 이미지 영역 크기 유지 */
    border-radius: 8px 0 0 8px; /* 왼쪽 상단과 왼쪽 하단 둥글게 */
    overflow: hidden; /* 이미지가 wrapper 밖으로 나가지 않도록 */
`;

export const CardImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px; /* 왼쪽 하단과 왼쪽 상단 둥글게 */
    flex-shrink: 0; /* 이미지 크기 고정 */
`;


export const CardContent = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center; /* 수직 가운데 정렬 */
    gap: 6px;
    flex-grow: 1; /* 텍스트가 남은 공간을 채움 */
`;


export const CardTitle = styled.h4`
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0;
`;

export const CardSubInfo = styled.div`
    font-size: 14px;
    color: #666;
    display: flex;
    align-items: center; /* 아이콘과 텍스트를 세로로 정렬 */
    justify-content: ${(props) => (props.$noSpaceBetween ? "space-between" : "flex-start")}; /* 조건부 설정 */
    gap: 10px;
    margin-top: 8px;

    // CardSubInfo 내부에 있는 모든 SVG 아이콘에 파란색 적용
    svg {
        color: #007bff; /* 파란색 */
        fill: #007bff; /* SVG fill 색상도 파란색으로 설정 */
    }
`;

export const CardPrice = styled(CardSubInfo)`
    font-weight: bold; /* 글자 진하게 */
    font-size: 25px; /* 약간 더 큰 폰트 크기 */
    color: #000; /* 기본 텍스트보다 조금 더 강조된 색상 */
`;


export const ProductUid = styled.span`
    font-size: 12px;
    color: #999;
    margin-left: auto; /* 오른쪽 끝으로 배치 */
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
`;

export const FilterSortBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

export const FilterSection = styled.div`
    display: flex;
    align-items: center;
`;

export const FilterLabel = styled.span`
    font-size: 16px;
    font-weight: 600;
    margin-right: 10px;
    // FilterLabel 내부에 있는 SVG 아이콘에 파란색 적용
    svg {
        color: #007bff; /* 파란색 */
        fill: #007bff; /* SVG fill 색상도 파란색으로 설정 */
        margin-right: 5px; // 아이콘과 텍스트 간 간격
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
`;

export const SortSection = styled.div`
    display: flex;
    gap: 10px;
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
`;

// EventListStyle.js에서 복사한 페이징 스타일
export const PagingWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 38px;
    gap: 10px;
`;

export const PagingButton = styled.button`
  background: ${({active}) => (active ? Palette.mainGradient : "#f2f6f9")};
  color: ${({active}) => (active ? "#fff" : Palette.blue)};
  font-weight: ${({active}) => (active ? 600 : 500)};
  font-size: 1.01rem;
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  box-shadow: ${({active}) => (active ? Palette.tabShadow : "none")};
  letter-spacing: -0.5px;
  &:hover {
    background: ${Palette.mainGradient};
    color: #fff;
  }
  &:disabled {
    opacity: .5;
    cursor: not-allowed;
  }
`;