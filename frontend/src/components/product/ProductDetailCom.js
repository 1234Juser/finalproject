import {FaHeart, FaRegHeart} from "react-icons/fa6";
import styled from "styled-components";

// 찜버튼(하트)
const WishButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #f44336;
`;

function ProductDetailCom({product, isWished, onToggleWish}) {

    console.log("받은 isWished 상태:", isWished);

    return (
        <>
            <h3>상품 상세 페이지</h3>
            <hr/>
            {!product 
            ? (<p>로딩중...</p>) 
            : ( <div>
<h4>{product.productTitle}</h4>
                    <p><strong>상품 설명:</strong> {product.productContent}</p>
                    <p><strong>성인 가격:</strong> {product.productAdult}원</p>
                    <p><strong>아동 가격:</strong> {product.productChild}원</p>
                    <p><strong>최소 참가자:</strong> {product.productMinParticipants}명</p>
                    <p><strong>최대 참가자:</strong> {product.productMaxParticipants}명</p>
                    <p><strong>판매 상태:</strong> {product.productStatus}</p>
                    <p><strong>여행 기간:</strong> {product.productStartDate} ~ {product.productEndDate}</p>
                    <p><strong>상품 타입:</strong> {product.productType}</p>
                    <p><strong>도시 코드:</strong> {product.cityId}</p>
                    <p><strong>국가 코드:</strong> {product.countryId}</p>
                    <p><strong>테마 코드:</strong> {product.themeCode}</p>
                    {/* <p><strong>상품 썸네일:</strong> <img src={product.productThumbnail} alt="썸네일" style={{ width: '200px' }} /></p> */}
                        <WishButton onClick={onToggleWish} aria-label="찜 토글">
                            {isWished ? <FaHeart /> : <FaRegHeart />}
                        </WishButton>
                </div>
             )}
        </>
    )
}

export default ProductDetailCom;