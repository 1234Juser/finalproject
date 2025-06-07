import React, {useEffect, useState} from 'react';
import InternationalCom from "../../components/product/InternationalCom";
import {getCitiesByCountry, getCountryList, getIntlList} from "../../service/ProductService";
import { useNavigate } from 'react-router-dom';
import {
    Container,
    CityList,
    Title,
    CityButton,
    CityListContainer,
    CountryBox,
    FullWidthDiv
} from '../../style/product/StyleDomestic';

const InternationalCon = () => {

    const [intl, setIntl] = useState([]);
    const [country, setCountry] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [countriesVisible, setCountriesVisible] = useState(false);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);


    const navigate = useNavigate();


    // 초기 데이터 로딩 (대륙 리스트)
    useEffect(() => {
        getIntlList()
            .then( data => {
                setIntl(data);
            })
            .catch((err) => console.error(err))
    }, []);

    const handleRegionClick = async (regionCode) => {
        if (selectedRegion === regionCode && countriesVisible) {
            // 동일한 regionCode를 다시 클릭하면, 리스트를 닫는다.
            setCountriesVisible(false);
            setSelectedRegion(null);
            setCountry([]);
        } else {
            // 새로운 regionCode가 선택되면 리스트를 열고, API로 데이터 가져옴
            setSelectedRegion(regionCode);
            setCountriesVisible(true);
            await getCountryList(regionCode)
            .then(data => {
                setCountry(data);
                
        })
            .catch((err) => console.error(err))
        }
    }

    // 버튼 클릭 시 countryId 불러오는 함수
    const handleCountryClick = async (countryId) => {
        if (selectedCountry === countryId) {
            // 동일한 countryId를 다시 클릭하면 도시 목록을 닫음
            setSelectedCountry(null);
            setCities([]);
        } else {
            // 새로운 countryId를 선택하면 도시 목록을 가져옴
            setSelectedCountry(countryId);
            await getCitiesByCountry(countryId)
                .then(data => {
                    setCities(data);
                })
                .catch((err) => console.error("도시 조회 오류:", err));
        }
    };


    return (
        <Container>
            <Title>어디로 떠나시나요?</Title>
            <InternationalCom intl={intl} onRegionClick={handleRegionClick}
                              selectedRegion={selectedRegion}
                              countriesVisible={countriesVisible}
                              />
            {countriesVisible && (
                <CityListContainer>
                        {country.map((c, index) => (
                            <FullWidthDiv key={index}>
                            <CountryBox
                                onClick={() => {handleCountryClick(c.countryId)}}>
                                {c.countryNameKR}
                            </CountryBox>
                                {/* City List (해당 Country에 속한 도시 목록만 표시) */}
                                {selectedCountry === c.countryId && (
                                    <CityList>
                                    {cities.length > 0 ? (
                                        cities.map((city, idx) => (
                                            <CityButton
                                                key={idx}
                                                onClick={() => navigate(`/products/city?city_id=${city.cityId}`)}
                                            >
                                                {city.cityNameKR}
                                            </CityButton>
                                        ))) : (
                                        <p>Loading...</p>
                                    )}
                                     </CityList>
                                    )}
                            </FullWidthDiv>
                        ))}
                </CityListContainer>
            )}
    </Container>
    );
};

export default InternationalCon;