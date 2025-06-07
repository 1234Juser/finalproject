import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  //height: 700px;
  min-height: calc(100vh - 100px);

  @media (max-width: 768px) {
    padding: 30px 16px;
    height: auto; /* 모바일에서는 높이 자동 조절 */
  }

  @media (max-width: 480px) {
    padding: 20px 12px;
  }
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 0.6rem;
  }
`;

export const RegionGrid = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
  margin-bottom: 2rem;

  overflow-x: auto; /* 가로 스크롤 허용 */
  -webkit-overflow-scrolling: touch; /* iOS 부드러운 스크롤 */
  width: 100%; /* 부모 컨테이너 너비에 맞춤 */
  justify-content: center; /* 가로 중앙 정렬 */

  /* 스크롤바 숨기기 (기능은 유지) */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  
  @media (max-width: 768px) {
    gap: 0.8rem;
    margin-bottom: 1.5rem;
    justify-content: flex-start; /* 스크롤 시 왼쪽부터 시작 */
  }

  @media (max-width: 480px) {
    gap: 0.6rem;
    margin-bottom: 1rem;
  }
`;

export const RegionCard = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
  flex-direction: column;
  gap: 10px;

  flex-shrink: 0; /* flex item이 줄어들지 않도록 함 (가로 스크롤 위함) */

  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
    margin: 0.3rem;
    gap: 8px;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
    margin: 0.2rem;
    gap: 6px;
  }
`;


export const RegionButton = styled.button`
  padding: 12px 20px;
  background-color: ${({ selected }) => (selected ? '#333' : '#eee')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  white-space: nowrap;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ selected }) => (selected ? '#444' : '#ddd')};
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 16px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 8px 14px;
  }
`;


export const FullWidthDiv = styled.div`
  display: inline-block;  // 핵심: 줄바꿈 방지
  vertical-align: top;    // 위 정렬
  margin: 6px;            // 기존 CountryBox margin과 동일하게
  width: 152px; /* 핵심: 한 줄 전체 차지하지 않도록 */
  flex-direction: column;

  @media (max-width: 768px) {
    width: 120px; /* 태블릿에서 너비 조정 */
    margin: 4px;
  }

  @media (max-width: 480px) {
    width: 90px; /* 모바일에서 너비 조정 */
    margin: 3px;
  }
`;


export const CountryBox = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  padding: 10px 16px;
  margin: 6px;
  font-size: 14px;
  font-weight: 500;
  background-color: #fff;
  border: 1.5px solid #ddd;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;

  // ✨ 추가된 부분 시작
  color: #000; // 텍스트 색상을 검정색으로 강제 (또는 원하는 색상)
  -webkit-text-size-adjust: none; // 자동 텍스트 크기 조절 방지
  -webkit-touch-callout: none; // 길게 눌렀을 때 팝업 메뉴 방지
  -webkit-tap-highlight-color: rgba(0,0,0,0); // 탭 시 배경 하이라이트 제거
  // ✨ 추가된 부분 끝

  &:hover {
    border-color: #aaa;
    background-color: #f8f8f8;
  }

  svg {
    margin-left: 8px;
    transition: transform 0.2s ease-in-out;
  }

  ${({ selected }) =>
    selected &&
    `
    border-color: #000;
    font-weight: 600;
  `};

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 8px 12px;
    min-width: 120px;
    margin: 4px;
  }

  @media (max-width: 480px) {
    font-size: 0.65rem;
    padding: 6px 10px;
    min-width: 100%;
    margin: 3px;
    white-space: nowrap;
  }
`;


export const CityListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 12px 0;
  margin-top: 6px;
  background-color: #f9f9f9;
  border-radius: 16px;
  min-height: 56px;
  width: 900px;

  @media (max-width: 768px) {
    width: 100%; /* 너비를 100%로 설정 */
    padding: 10px 0;
    margin-top: 5px;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px 0;
    margin-top: 4px;
    border-radius: 10px;
  }
`;

// DomesticCon 전용 CityListContainer
export const DomesticCityListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; /* 가운데 정렬 */
    justify-content: center; /* 수직 중앙 정렬 (필요 시) */
    width: 600px;
    height: max-content;
    gap: 10px;
    /* 추가적인 스타일이 필요하면 여기에 작성 */
    background-color: #f9f9f9;
  padding-bottom: 15px;

  @media (max-width: 768px) {
    width: 100%; /* 너비를 100%로 설정 */
    gap: 8px;
    padding-bottom: 10px;
  }

  @media (max-width: 480px) {
    gap: 6px;
    padding-bottom: 8px;
  }
`;




export const CityList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
  width: max-content;
  padding: 0 6px;

  @media (max-width: 768px) {
    gap: 0.6rem;
    margin-top: 0.8rem;
    width: 100%; /* 너비를 100%로 설정하여 유연하게 만듬 */
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    margin-top: 0.6rem;
    padding: 0 3px;
  }
`;

export const CityButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.2s ease;

  // ✨ 추가된 부분 시작
  color: #000; // 텍스트 색상을 검정색으로 강제 (또는 원하는 색상)
  -webkit-text-size-adjust: none; // 자동 텍스트 크기 조절 방지
  -webkit-touch-callout: none; // 길게 눌렀을 때 팝업 메뉴 방지
  -webkit-tap-highlight-color: rgba(0,0,0,0); // 탭 시 배경 하이라이트 제거
  // ✨ 추가된 부분 끝

  &:hover {
    background-color: #eee;
  }
  
  &:focus {
    border-color: #666;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.65rem;
    padding: 0.35rem 0.7rem;
  }
`;

export const RegionImage = styled.div`
    //width: 100%;
    //height: 100px;
    overflow: hidden;
    border-radius: 30px;
    background-color: #f8f8f8;
  box-shadow:  0px 0 8px 3px rgb(179 179 179 / 15%);
  height: 100%; // RegionCard의 200px/160px/120px에 맞춰 100% 사용

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      // object-fit: contain; // 이미지가 잘리지 않고 전체가 보이도록 하려면 이 속성을 사용해보세요.
      // 이 경우, 이미지의 가로세로 비율에 따라 빈 공간이 생길 수 있습니다.
      // flex-shrink: 0; // 이미지가 줄어들지 않도록 설정 (RegionCard 내에서 필요할 수 있음)
    }

  @media (max-width: 768px) {
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    border-radius: 15px;
  }
`;

