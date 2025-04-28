import React from 'react';
import DomesticCon from "../../containers/product/DomesticCon";
import HeaderCom from "../common/HeaderCom";

const InternationalCom = ({intl, onRegionClick, selectedRegion, countriesVisible}) => {
    return (
        <>
            <h3> 해외여행 선택 </h3>
            {intl.map((i, index) => (
                <div key={index}>
                    <p>{i.regionName} ({i.regionType})</p>
                    <button onClick={() => onRegionClick(i.regionCode)}>
                        {selectedRegion === i.regionCode && countriesVisible ? "닫기" : "국가 리스트 보기"}
                    </button>
                </div>
            ))}
        </>
    );
};

export default InternationalCom;