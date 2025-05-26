import styled from "styled-components";

export const WeatherCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  width: 100%;
  max-width: 300px; /* 카드 최대 너비 설정 */
`;

export const CityName = styled.span`
  font-size: 26px;
  font-weight: 600;
  color: #34495e;
`;

export const Temperature = styled.p`
  font-size: 3rem; /* 크게 표시되는 온도 */
  font-weight: bold;
  color: #e67e22; /* 주황색 계열 */
  margin-top: 14px;
`;

export const TemperatureSpan = styled.p`
    font-size : 40px;
    margin-top: 14px;
    color: #e67e22; /* 주황색 계열 */
`;


export const WeatherDescription = styled.p`
  font-size: 18px;
  color: #7f8c8d;
  margin-top: 5px;
`;

export const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 5px 0;
  border-top: 1px dashed #ecf0f1; /* 구분선 */
  font-size: 16px;
  color: #555;

  &:first-of-type {
    border-top: none; /* 첫 번째 줄에는 구분선 없음 */
  }
`;


// 새로운 TemperatureRow 컴포넌트 추가: 최저와 최고 기온을 한 줄에 배치
export const TemperatureRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* 기온 사이의 간격 조절 */
`;

// 새로운 WeatherInfoContainer 컴포넌트 추가: 최저/최고 기온과 상세 정보를 한 줄에 배치
export const WeatherInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px; /* 최저/최고 기온과 상세 정보 사이의 간격 */
    width: 100%;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`


// 새로운 DetailContainer 컴포넌트 추가: 습도와 풍속을 세로로 배치
export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px; /* 습도와 풍속 사이의 간격 */
    width: 80%;
`;
