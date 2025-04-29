import React, {useEffect, useState} from 'react';
import DomesticCom from "../../components/product/DomesticCom";
import {getDomList, getCitiesByRegion} from "../../service/ProductService";
import { useNavigate } from 'react-router-dom';

const DomesticCon = () => {

    const [domestic , setDomestic] = useState([]);
    const [koCities, setKoCities] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null); // 선택된 regionCode 상태
    const [cityVisible, setCityVisible] = useState(false);  // 도시 리스트 visibility 상태

    const navigate = useNavigate();

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
        <>
          <DomesticCom domestic={domestic} cityVisible={cityVisible}
          onRegionClick={handleRegionClick} selectedRegion={selectedRegion}/>
          {cityVisible && (
            <>
                <h3>각 권역별 도시 리스트</h3>
                    <ul>
                        {koCities.map((c, index) => (
                            <li key={index}>
                                {/* <Link to="/products"> */}
                                {/* <Link to={`/product/city?citycode=${cityCode}`}> */}
                                <button onClick={() => {
                                    // onClickHandler(c.countryCode)
                                    navigate(`/products/city?cityCode=${c.cityCode}`)
                                }}
                                >
                                    {c.cityName}
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

export default DomesticCon;