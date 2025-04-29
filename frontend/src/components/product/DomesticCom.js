import React from 'react';
import { useNavigate } from 'react-router-dom';

const DomesticCom = ({domestic, cityVisible, onRegionClick, selectedRegion}) => {
    if (!domestic || !Array.isArray(domestic)) {
        return <div>로딩 중...</div>;
    }

    // const navigate = useNavigate();


    return (
        <>
            <h3> 전체 투어 상품 목록 조회 </h3>
            {/*<HeaderCom/>*/}
            {domestic.map((d, index) => (
                <div key={index}>
            
                        {d.regionName} ({d.regionType})
                        <br/>
                    <button onClick={() => onRegionClick(d.regionCode)}>
                        {selectedRegion === d.regionCode && cityVisible ? "닫기" : "국가 리스트 보기"}
                        </button>
                </div>
            ))}
        </>
    );
};

export default DomesticCom;