import React from 'react';
import { RegionGrid, RegionButton, RegionImage } from '../../style/product/StyleDomestic';

const InternationalCom = ({intl, onRegionClick, selectedRegion, countriesVisible, getImageByRegion}) => {
    return (
        <RegionGrid>
            {intl.map((i, index) => (
                <div key={index}>
                    <RegionImage>
                        {/*<img src={getImageByRegion(i.regionCode)} alt={`${i.regionName} 이미지`}/>*/}
                        <img src="/static/img/earth.jpg" alt={`${i.regionName} 이미지`}/>
                    </RegionImage>
                    <RegionButton
                        key = {index}
                        onClick={() => onRegionClick(i.regionCode)}
                        selected={selectedRegion === i.regionCode}
                    >
                        {i.regionName} ({i.regionType})
                    </RegionButton>
                </div>
            ))}
        </RegionGrid>
    );
};

export default InternationalCom;