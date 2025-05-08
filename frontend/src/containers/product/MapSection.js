import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { MapContainer } from '../../style/product/StyleMapSection';


const cityCoordinates = {
    101: { lat: 51.5074, lng: -0.1278, name: "런던" },
    102: { lat: 35.6895, lng: 139.6917, name: "도쿄" },
    103: { lat: 48.8566, lng: 2.3522, name: "파리" },
    // ...필요한 도시 추가
  };


function MapSection({ cityId }) {
  const [center, setCenter] = useState(null);

  const location = cityCoordinates[cityId];

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${cityId}&key=YOUR_GOOGLE_API_KEY`
        );
        const data = await response.json();
        const location = data.results[0]?.geometry?.location;

        if (location) {
          setCenter({ lat: location.lat, lng: location.lng });
        } else {
          console.error("좌표를 찾을 수 없습니다.");
        }
      } catch (e) {
        console.error("Geocoding API 오류:", e);
      }
    };

    if (cityId) fetchCoords();
    }, [cityId]);

    if (!location) {
        return <p>지도를 불러올 수 없습니다. (알 수 없는 도시)</p>;
    }

  return (
    <MapContainer>
<LoadScript googleMapsApiKey="YOUR_GOOGLE_API_KEY">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={{ lat: location.lat, lng: location.lng }}
          zoom={10}
        >
          <Marker position={{ lat: location.lat, lng: location.lng }} />
        </GoogleMap>
      </LoadScript>
      </MapContainer>
  );
}

export default MapSection;
