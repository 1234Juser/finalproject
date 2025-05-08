import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { MapContainer } from '../../style/product/StyleMapSection';



function MapSection({ location }) {
  const [center, setCenter] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); // LoadScript 로딩 상태 관리

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
        );
        
        const data = await response.json();
        console.log("----지도data확인---->", data);
        const loc = data.results[0]?.geometry?.location;

        if (loc) {
          setCenter({ lat: loc.lat, lng: loc.lng });
          console.log("좌표:", { lat: loc.lat, lng: loc.lng });
        } else {
          console.error("좌표를 찾을 수 없습니다.");
        }
      } catch (e) {
        console.error("Geocoding API 오류:", e);
      }
    };
    
    if (location)
      fetchCoords();
    
  }, [location]);

    // LoadScript 로딩 완료 시 상태 업데이트
    const handleLoad = () => {
      setIsLoaded(true);
      console.log("LoadScript 로딩 완료");
    };

    if (!center) {
        return <p>지도를 불러오는 중입니다...</p>;
    }

  return (
    <MapContainer>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
                  onLoad={handleLoad}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={10}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </MapContainer>
  );
}

export default MapSection;
