import React, {useEffect, useState} from 'react';
import InternationalCom from "../../components/product/InternationalCom";
import {getCitiesByCountry, getCountryList, getIntlList} from "../../service/ProductService";
import { Link, useNavigate } from 'react-router-dom';
import { getProductsByCity } from "../../service/ProductService";

const InternationalCon = () => {

    const [intl, setIntl] = useState([]);
    const [country, setCountry] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null); // 선택된 regionCode 상태
    const [countriesVisible, setCountriesVisible] = useState(false); // 국가 리스트 visibility 상태
    const [cities, setCities] = useState([]); // 도시 조회용 useState

    const navigate = useNavigate();

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

    // console.log("country 확인---->", country);

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

    // const handleCityOnClick = async (cityCode) => {
    //     console.log("일본 클릭했는ㄷ ㅔ ", cityCode);
    //     await getProductsByCity(cityCode)
    //     .then(data => {
    //         console.log("cityCode 받기 : ", cityCode);
    //         console.log("도시별 투어 목록 리스트 : ", data);
    //         setProducts(data);
    //     })
    //     .catch((err) => console.log(err));
    // }

    return (
        <>
            <InternationalCom intl={intl} onRegionClick={handleRegionClick}
                              selectedRegion={selectedRegion}
                              countriesVisible={countriesVisible}
            />
            {countriesVisible && (
                <>
                    <h3>해당 Region의 국가 리스트</h3>
                    <ul>
                        {country.map((c, index) => (
                            <li key={index}>
                                {/* <Link to="/products"> */}
                                {/* <Link to={`/product/city?citycode=${cityCode}`}> */}
                                <button onClick={() => {
                                    onClickHandler(c.countryId)
                                    navigate(`/products/country?country_id=${c.countryId}`)
                                }}
                                >
                                    {c.countryName}
                                </button>
                                {/* </Link> */}
                                </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
};

export default InternationalCon;