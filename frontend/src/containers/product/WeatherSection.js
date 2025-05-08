import { useEffect, useState } from "react";

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
      <div>
        <h3>{city} 날씨</h3>
        <p>온도: {weatherData?.main?.temp}°C</p>
        <p>날씨: {weatherData?.weather[0]?.description || '정보 없음'}</p>
        <div>
          {iconUrl && <img src={iconUrl} alt={weatherDescription} />}
          </div>
        <p>습도: {weatherData?.main?.humidity}%</p>
        <p>풍속: {weatherData?.wind?.speed || 0} m/s</p>
      </div>
    )
}

export default WeatherSection