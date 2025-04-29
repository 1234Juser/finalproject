import React from 'react';

const DomesticCom = ({domestic}) => {
    if (!domestic || !Array.isArray(domestic)) {
        return <div>로딩 중...</div>;
    }


    return (
        <>
            <h3> 전체 투어 상품 목록 조회 </h3>
            {/*<HeaderCom/>*/}
            {domestic.map((d, index) => (
                <div key={index}>
                    {d.regionName} ({d.regionType})
                </div>
            ))}
        </>
    );
};

export default DomesticCom;