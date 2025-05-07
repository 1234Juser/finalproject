import React from 'react';
import {RegionGrid, RegionButton, RegionImage} from '../../style/product/StyleDomestic';

const DomesticCom = ({domestic, cityVisible, onRegionClick, selectedRegion}) => {
    if (!domestic || !Array.isArray(domestic)) {
        return <div>로딩 중...</div>;
    }

    // const navigate = useNavigate();

    return (
        <RegionGrid>
        {domestic.map((d, idx) => (
            <div key={idx}>
                <RegionImage>
                    {/*<img src={getImageByRegion(i.regionCode)} alt={`${i.regionName} 이미지`}/>*/}
                    <img src="/static/img/earth.jpg" alt={`${d.regionName} 이미지`}/>
                </RegionImage>
                <RegionButton
                    key={idx}
                    onClick={() => onRegionClick(d.regionCode)}
                    selected={selectedRegion === d.regionCode}
                >
                    {d.regionName}
                </RegionButton>
            </div>
        ))}
      </RegionGrid>
    );
};

export default DomesticCom;