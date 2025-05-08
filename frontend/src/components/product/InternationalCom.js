import React from 'react';
import {RegionGrid, RegionButton, RegionImage, RegionCard} from '../../style/product/StyleDomestic';

const InternationalCom = ({intl, onRegionClick, selectedRegion, countriesVisible, getImageByRegion}) => {
    return (
        <RegionGrid>
            {intl.map((i, index) => (
                <RegionCard
                    key={index}>
                    <RegionImage>
                        {/*<img src={getImageByRegion(i.regionCode)} alt={`${i.regionName} 이미지`}/>*/}
                        <img src="/static/img/earth.jpg" alt={`${i.regionName} 이미지`}/>
                    </RegionImage>
                    <RegionButton
                        key = {index}
                        onClick={() => onRegionClick(i.regionCode)}
                        selected={selectedRegion === i.regionCode}
                    >
                        {i.regionName}
                    </RegionButton>
                </RegionCard
                >
            ))}
        </RegionGrid>
    );
};

export default InternationalCom;