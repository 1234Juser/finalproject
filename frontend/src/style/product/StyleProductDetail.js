// /style/product/StyleProductDetail.js
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  gap: 40px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);

    @media (max-width: 768px) {
        padding: 20px;
        gap: 20px;
    }
`;

export const MainSectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  width: 100%;
  align-items: flex-start;

    @media (max-width: 768px) {
        flex-direction: column; // 모바일에서는 세로로 정렬
        gap: 20px;
    }
`;


export const ImageSection = styled.div`
  flex: 2;
  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    object-fit: cover;
    border: 1px solid #e0e0e0;

      @media (max-width: 768px) {
          flex: none; // 모바일에서는 flex 속성 해제
          width: 100%;
      }
  }
`;

export const InfoSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;

    @media (max-width: 768px) {
        flex: none; // 모바일에서는 flex 속성 해제
        width: 100%;
        gap: 10px;
    }
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #222;
  margin-bottom: 10px;

    @media (max-width: 768px) {
        font-size: 22px;
        margin-bottom: 5px;
    }
`;

export const PriceWrapper = styled.div`
  font-size: 38px;
  font-weight: bold;
  color: #222;

  .discount {
    color: #f73434;
    font-size: 24px;
    font-weight: bold;
    margin-right: 10px;
  }

  .original {
    text-decoration: line-through;
    color: #888;
    font-size: 18px;
    margin-left: 10px;
  }

    @media (max-width: 768px) {
        font-size: 28px;

        .discount {
            font-size: 20px;
        }

        .original {
            font-size: 16px;
        }
    }
`;

export const BadgeWrapper = styled.div`
  display: flex;
  gap: 8px;  // 배지 사이 간격 조절
  align-items: center;  // 세로 중앙 정렬

    @media (max-width: 768px) {
        gap: 6px;
    }
`;


export const Badge = styled.div`
  display: inline-block;
  background-color: #ffeded;
  color: #ff5e5e;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 20px;
  margin-bottom: 10px;
  width: fit-content;

    @media (max-width: 768px) {
        font-size: 12px;
        padding: 5px 10px;
        margin-bottom: 8px;
    }
`;

export const ConditionBadge = styled.div`
  display: inline-block;
  background-color: #e0f7ff;
  color: #007acc;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 20px;
  margin-bottom: 10px;
  width: fit-content;

    @media (max-width: 768px) {
        font-size: 12px;
        padding: 5px 10px;
        margin-bottom: 8px;
    }
`;

export const DetailText = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #444;

  strong {
    font-weight: 600;
    color: #222;
    margin-right: 6px;
  }

    @media (max-width: 768px) {
        font-size: 14px;
        line-height: 1.5;
    }
`;

export const WishButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
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

// PaymentButton 수정: 상태에 따라 색상과 텍스트 변경
export const PaymentButton = styled.button`
    background-color: ${({ status }) => {
        switch (status) {
            case 'ON_SALE':
                return '#00b6ff'; // 파란색
            case 'CLOSED':
            case 'SOLD_OUT':
                return '#ccc'; // 회색
            default:
                return '#00b6ff';
        }
    }};
    color: #FFFFFF;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: ${({ status }) => (status === 'ON_SALE' ? 'pointer' : 'not-allowed')};
    transition: background-color 0.3s ease;
    width: 200px;

    &:hover {
        background-color: ${({ status }) => {
            if (status === 'ON_SALE') return '#009ae6';
            return '#ccc';
        }};
    }

    @media (max-width: 768px) {
        width: 100%; // 모바일에서는 전체 너비 사용
        padding: 12px 15px;
        font-size: 0.9rem;
    }
`;



export const DetailTabWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 40px;
  border-bottom: 2px solid #eee;
  top: 0;
  font-size : 20px;
   position: sticky;
   background-color: white; /* 필요에 따라 배경색 설정 */
  z-index: 10; /* 다른 요소 위에 표시하기 위해 z-index 설정 (다른 콘텐츠 위에 나타나도록) */

    @media (max-width: 768px) {
        gap: 10px;
        margin-top: 20px;
        font-size: 16px;
        justify-content: space-around; // 탭들을 균등하게 배치
    }
`;

export const DetailTab = styled.button`
  padding: 12px 18px;
  font-size: 20px;
  font-weight: 400;
  background: none;
  border: none;
  border-bottom: ${({ active }) => (active ? '3px solid #000' : 'none')};
  color: #2a2a2a;
  cursor: pointer;
  text-decoration: none; /* 링크 밑줄 제거 */

  &:hover {
    color: #000;
    background-color: #f0f0f0; /* 호버 시 회색 배경 */
  }
  /* active 상태일 때 색상 유지 */
  &.active-tab {
    color: black;
    background-color: #f0f0f0; /* 클릭 시 회색 배경 */
  }

    @media (max-width: 768px) {
        padding: 10px 12px;
        font-size: 14px;
    }
`;

export const DetailContentWrapper = styled.div`
  padding: 30px 0;
  line-height: 1.8;
  font-size: 16px;
  color: #333;

  p {
    margin-bottom: 14px;
  }

  strong {
    display: block;
    margin: 20px 0 10px;
    font-size: 18px;
    font-weight: bold;
    color: #111;
  }

  .highlight {
    color: #e60023;
    font-weight: 600;
  }

  .emoji {
    margin-right: 6px;
  }


    @media (max-width: 768px) {
        padding: 20px 0;
        font-size: 14px;

        p {
            margin-bottom: 10px;
        }

        strong {
            margin: 15px 0 8px;
            font-size: 16px;
        }
    }
`;

export const SectionWrapper = styled.section`
  padding: 40px 0;
  // border-bottom: ${({ active }) => (active ? '3px solid black' : 'none')};
  transition: border-bottom 0.3s ease;

    @media (max-width: 768px) {
        padding: 20px 0;
    }
`;


export const SubTitle = styled.h3`
    font-size: 20px;
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 10px;

    @media (max-width: 768px) {
        font-size: 18px;
        margin-top: 20px;
        margin-bottom: 8px;
    }
`;

export const LeftAlignedSubTitle = styled(SubTitle)`
  align-self: flex-start;
  margin-left: 10px;

    @media (max-width: 768px) {
        margin-left: 0; // 모바일에서는 왼쪽 정렬 유지
    }
`;


export const Divider = styled.hr`
  margin: 30px 0;
  border: none;
  border-top: 1px solid #eee;


    @media (max-width: 768px) {
        margin: 20px 0;
    }
`;

export const NoMarginDivider = styled(Divider)`
  margin-left: 10px;
    margin: 0;
    width: 50%;

    @media (max-width: 768px) {
        width: 80%; // 모바일에서 너비 조정
        margin-left: 0;
    }
`;



export const FlexSectionWrapper = styled(SectionWrapper)`
  display: flex;
  gap: 20px; /* 필요에 따라 gap 속성 추가 */

    @media (max-width: 768px) {
        flex-direction: column; // 모바일에서는 세로로 정렬
        gap: 20px;
    }
`;

export const MapWrapper = styled.div`
  flex: 1; /* 남은 공간을 모두 차지하도록 설정 */


    @media (max-width: 768px) {
        width: 100%; // 모바일에서는 전체 너비
        height: 250px; // 지도 높이 조정
    }
`;

export const WeatherWrapper = styled.div`
  flex: 0.5; /* 남은 공간을 모두 차지하도록 설정 */
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  gap: 10px; /* 텍스트와 이모티콘 사이의 간격 */
  border-left : 1px solid #eee;
    flex-direction: column;

    @media (max-width: 768px) {
        flex: none; // 모바일에서는 flex 속성 해제
        width: 100%;
        border-left: none; // 모바일에서는 왼쪽 보더 제거
        border-top: 1px solid #eee; // 상단 보더 추가
        padding-top: 20px;
        margin-top: 20px;
    }
`;


export const SaleStatus = styled.span`
    display: inline-block;
    padding: 4px 8px;
    border-radius: 12px;
    background-color: ${({ status }) => {
        switch (status) {
            case 'ON_SALE':
                return '#97d7bf'; // 녹색
            case 'CLOSED':
                return '#ccc'; // 회색
            case 'SOLD_OUT':
                return '#2967ec'; // 빨간색
            default:
                return '#000'; // 기본 색상
        }
    }};
    color: white;
    font-size: 14px;
    font-weight: 300;

    @media (max-width: 768px) {
        font-size: 12px;
        padding: 3px 6px;
    }
`;

