import React from 'react';
import { RegionGrid, RegionButton, RegionImage, RegionCard } from '../../style/product/StyleDomestic';

const DomesticCom = ({ domestic, cityVisible, onRegionClick, selectedRegion }) => {
    if (!domestic || !Array.isArray(domestic)) {
        return <div>로딩 중...</div>;
    }

    const imagePaths = [
        "/static/img/product/continent/jungbu.jpg",
        "/static/img/product/continent/nambu.jpg",
        "/static/img/product/continent/jeju.jpg"
    ];

    
    return (
        <RegionGrid>
            {domestic.map((d, idx) => (
                <RegionCard key={idx}>
                    <RegionImage>
                        {/* idx를 이용하여 정해진 이미지 순서대로 매핑 */}
                        <img 
                            src={imagePaths[idx % imagePaths.length]} 
                            alt={`${d.regionName} 이미지`} 
                        />
                    </RegionImage>
                    <RegionButton
                        key={idx}
                        onClick={() => onRegionClick(d.regionCode)}
                        selected={selectedRegion === d.regionCode}
                    >
                        {d.regionName}
                    </RegionButton>
                </RegionCard>
            ))}
        </RegionGrid>
    );
};

export default DomesticCom;