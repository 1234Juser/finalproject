import React from 'react';
import DomesticCon from "../containers/DomesticCon";
import HeaderCom from "./common/HeaderCom";

const DomesticCom = ({products}) => {
    return (
        <>
            <h3> 전체 투어 상품 목록 조회 </h3>
            {/*<HeaderCom/>*/}
            {products.map((product, index) => (
                <li key={product.productCode}>
                    <h4>{product.productTitle}</h4>
                    <p>{product.productContent}</p>
                    <span>가격: {product.productAdult}원</span>
                    <p><span>가격 (성인): </span>{product.productAdult}원</p>
                    <p><span>가격 (어린이): </span>{product.productChild}원</p>
                    <p><span>출발일: </span>{product.productStartDate}</p>
                    <p><span>종료일: </span>{product.productEndDate}</p>
                    <p><span>최소 인원: </span>{product.productMinParticipants}</p>
                    <p><span>최대 인원: </span>{product.productMaxParticipants}</p>
                    <p><span>상품 상태: </span>{product.productStatus}</p>
                    <p><span>상품 코드: </span>{product.productUid}</p>
                    <p><span>테마 코드: </span>{product.themeCode}</p>
                </li>
            ))}
        </>
    );
};

export default DomesticCom;