import React, {useEffect, useState} from 'react';
import InternationalCom from "../../components/product/InternationalCom";
import {getCitiesByCountry, getCountryList, getIntlList} from "../../service/ProductService";
import { Link, useNavigate } from 'react-router-dom';
import { getProductsByCity } from "../../service/ProductService";
import {Container, CityList, Title, CityButton, CityListContainer, CountryBox} from '../../style/product/StyleDomestic';

const InternationalCon = () => {

    const [intl, setIntl] = useState([]);
    const [country, setCountry] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [countriesVisible, setCountriesVisible] = useState(false);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);


    const navigate = useNavigate();

    const getImageByRegion = (regionCode) => {
        const images = {
            4: '/images/asia.jpg',
            5: '/images/europe.jpg',
            6: '/images/america.jpg',
            7 : '/images/oceania.jpg',
            8 : '/images/africa.jpg',
            // ... 필요한 지역코드 이미지 추가 가능
        };
        return images[regionCode] || '/static/img/earth.jpg'; // 매칭이 없는 경우 기본 이미지
    }

    // 초기 데이터 로딩 (대륙 리스트)
    useEffect(() => {
        getIntlList()
            .then( data => {
                console.log("대륙 리스트 : ", data)
                setIntl(data);
            })
            .catch((err) => console.error(err))
    }, []);

    const handleRegionClick = async (regionCode) => {
        if (selectedRegion === regionCode && countriesVisible) {
            // 동일한 regionCode를 다시 클릭하면, 리스트를 닫는다.
            setCountriesVisible(false);
            setSelectedRegion(null);
            setCountry([]); // 국가 데이터 초기화
        } else {
            // 새로운 regionCode가 선택되면 리스트를 열고, API로 데이터 가져옴
            setSelectedRegion(regionCode);
            setCountriesVisible(true);
            await getCountryList(regionCode)
            .then(data => {
                console.log("country data : ", data)
                setCountry(data);
                
        })
            .catch((err) => console.error(err))
        }
    }

    const handleCountryClick = async (countryId) => {
        if (selectedCountry === countryId) {
            // 동일한 countryId를 다시 클릭하면 도시 목록을 닫음
            setSelectedCountry(null);
            setCities([]); // 도시 데이터 초기화
        } else {
            // 새로운 countryId를 선택하면 도시 목록을 가져옴
            setSelectedCountry(countryId);
            await getCitiesByCountry(countryId)
                .then(data => {
                    console.log(`${countryId}에 해당하는 도시들: `, data);
                    setCities(data);
                })
                .catch((err) => console.error("도시 조회 오류:", err));
        }
    };


    // 버튼 클릭 시 countryId 불러오는 함수
    const onClickHandler = async (countryId) => {
        console.log("일본 클릭했을 때 countryCode: ", countryId);

        // 해당 countryCode에 포함된 도시들 요청
        await getCitiesByCountry(countryId)
        .then(data => {
            console.log(`${countryId}에 해당하는 도시들: `, data);
            setCities(data); // 도시 리스트 상태 업데이트
        })
        .catch((err) => console.error("도시 조회 오류:", err));

        
    }


    return (
        <Container>
            <Title>어디로 떠나시나요?</Title>
            <InternationalCom intl={intl} onRegionClick={handleRegionClick}
                              selectedRegion={selectedRegion}
                              countriesVisible={countriesVisible}
                              getImageByRegion={getImageByRegion}
                              />
            {countriesVisible && (
                <CityListContainer>
                        {country.map((c, index) => (
                            <div key={index}>
                            <CountryBox
                                onClick={() => {handleCountryClick(c.countryId)}}>
                                     {/*navigate(`/products/country?country_id=${c.countryId}`)}}>*/}
                                {c.countryNameKR}
                            </CountryBox>

                                {/* City List (해당 Country에 속한 도시 목록만 표시) */}
                                {selectedCountry === c.countryId && (
                                    <CityList>
                                    {cities.length > 0 ? (
                                        cities.map((city, idx) => (
                                            <CityButton
                                                key={idx}
                                                onClick={() => navigate(`/products/city?city_id=${city.cityId}`)} // Navigate to city page
                                            >
                                                {city.cityNameKR}
                                            </CityButton>
                                        ))) : (
                                        <p>도시 정보를 가져오는 중...</p>
                                    )}
                                     </CityList>
                                    )}
                            </div>
                        ))}
                </CityListContainer>
            )}
    </Container>
    );
};

export default InternationalCon;