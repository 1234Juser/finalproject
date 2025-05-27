import React, {useEffect, useState} from 'react';
import DomesticCom from "../../components/product/DomesticCom";
import {getDomList, getCitiesByRegion} from "../../service/ProductService";
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Title,
    CityList,
    CityButton,
    DomesticCityListContainer
} from '../../style/product/StyleDomestic';


const DomesticCon = () => {

    const [domestic , setDomestic] = useState([]);
    const [koCities, setKoCities] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [cityVisible, setCityVisible] = useState(false); 

    const navigate = useNavigate();

    const getImageByRegion = (regionCode) => {
        const images = {
            1: '/images/asia.jpg',
            2: '/images/europe.jpg',
            3: '/images/america.jpg',
            // ... 필요한 지역코드 이미지 추가 가능
        };
        return images[regionCode] || '/static/img/earth.jpg'; // 매칭이 없는 경우 기본 이미지

    }

    // 자동으로 도시 목록 불러오기
    useEffect(() => {
        getDomList()
            .then( data => {
                console.log("data : ", data)
                setDomestic(data);
            })
            .catch((err) => console.error(err))
    }, []);

    const handleRegionClick = async (RegionCode) => {
        if (selectedRegion === RegionCode && cityVisible) {
            // 동일한 regionCode를 다시 클릭하면, 리스트를 닫는다.
            setCityVisible(false);
            setSelectedRegion(null);
            setKoCities([]); // 국가 데이터 초기화
        } else {
            // 새로운 regionCode가 선택되면 리스트를 열고, API로 데이터 가져옴
            setSelectedRegion(RegionCode);
            setCityVisible(true);
            await getCitiesByRegion(RegionCode)
            .then(data => {
                console.log("city data : ", data)
                setKoCities(data);
                
        })
            .catch((err) => console.error(err))
        }
    }




    return (
        <Container>
            <Title>어디로 떠나시나요?</Title>
                <DomesticCom domestic={domestic} cityVisible={cityVisible}
                onRegionClick={handleRegionClick} selectedRegion={selectedRegion}
                getImageByRegion={getImageByRegion}/>
            {cityVisible && (
                <DomesticCityListContainer>
                <CityList>
                        {koCities.map((c, i) => (
                            <CityButton
                                key={i}
                                onClick={() => navigate(`/products/city?city_id=${c.cityId}`)}>
                                {c.cityNameKR}
                            </CityButton>
                        ))}
                </CityList>
                </DomesticCityListContainer>
            )}
        </Container>
    );
};

export default DomesticCon;