import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 700px;

  @media (max-width: 768px) {
    padding: 30px 16px;
  }

  @media (max-width: 480px) {
    padding: 20px 12px;
  }
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

export const RegionGrid = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
  margin-bottom: 2rem;
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
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 10px;
    min-width: 100px;
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
  max-height: 200px;
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
`;




export const CityList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
  width: max-content;
`;

export const CityButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #eee;
  }
  
  &:focus {
    border-color: #666;
    outline: none;
  }
`;

export const RegionImage = styled.div`
    //width: 100%;
    //height: 100px;
    overflow: hidden;
    border-radius: 30px;
    background-color: #f8f8f8;
  box-shadow: 2px 1px 1px 0px rgb(179 179 179 / 15%);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

