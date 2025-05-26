import {useEffect, useState} from "react";
import {
    CityName,
    DetailContainer,
    DetailRow,
    Temperature,
    TemperatureRow, TemperatureSpan,
    WeatherCard,
    WeatherIcon,
    WeatherInfoContainer
} from "../../style/product/StyleWeatherSection";

function WeatherSection({city}) {
    
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(false);
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`
                );
                const data = await response.json();

                if (data.cod === "404") {
                  setError(true);
                  console.warn("해당 도시가 없어 데이터를 제공할 수 없습니다.");
                  return;
                } else {
                  setWeatherData(data);
                  console.log("날씨 데이터 정보 확인----", data);
                }

            } catch (error) {
                console.error('날씨 정보를 불러오는 데 실패했습니다.', error);
                setWeatherData(null);
                setError(true);
            }
        };
      
        if (city) {
          fetchWeather();
        } else {
          setError(true);
        }

      }, [city, apiKey]);

      if (error) 
        return (
          <p>🌧️ 해당 도시의 날씨 정보를 제공하는 데이터가 없어서 보여줄 수 없어요 😭</p>
        );

      const iconCode = weatherData?.weather?.[0]?.icon;
      const iconUrl = iconCode ? `http://openweathermap.org/img/wn/${iconCode}@2x.png` : '';
      const weatherDescription = weatherData?.weather?.[0]?.description || '정보 없음';

      
    return (
        <WeatherCard>
            <CityName>{city}</CityName>
            <WeatherInfoContainer>
                <TemperatureRow>
                    {iconUrl && <WeatherIcon src={iconUrl} alt={weatherDescription} />}
                    <Temperature>{Math.round(weatherData?.main?.temp_min)}°C</Temperature>
                    <TemperatureSpan>/</TemperatureSpan>
                    <Temperature>{Math.round(weatherData?.main?.temp_max)}°C</Temperature>
                </TemperatureRow>
                <DetailContainer>
                    <DetailRow>
                        <span>습도</span>
                        <span>{weatherData?.main?.humidity}%</span>
                    </DetailRow>
                    <DetailRow>
                        <span>풍속</span>
                        <span>{weatherData?.wind?.speed || 0} m/s</span>
                    </DetailRow>
                </DetailContainer>
            </WeatherInfoContainer>
        </WeatherCard>
    )
}

export default WeatherSection