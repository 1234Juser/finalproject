import {registerOrCancelWish} from "../../containers/wish/WishCon";
import {useState} from "react";

const ProductWishCom = ({ productCode, memberUsername }) => {
    const [liked, setLiked] = useState(false); // 기본은 빈 하트

    const toggleWish = async () => {
        const result = await registerOrCancelWish(productCode, memberUsername);
        setLiked(result === "LIKED");
    };

    return (
        <button onClick={toggleWish}>
            {liked ? "❤️" : "🤍"}
        </button>
    );
};

export default ProductWishCom;

// function ProductWishcom() {
//     const WishCon = ({productCode, groupCode}) => {
//         const [isWished, setIsWished] = useState(false);  // 찜 상태
//         const [message, setMessage] = useState('');  // 상태 메시지
//
//         // 찜 버튼 클릭 시 실행될 함수
//         const handleWishClick = async () => {
//             try {
//                 // 찜 등록/취소 요청
//                 const response = await axios.post('/product/detail', {
//                     productCode: productCode,
//                     groupCode: groupCode
//                 });
//
//                 // 응답에 따른 처리
//                 if (response.data === '좋아요 누르셨습니다.') {
//                     setIsWished(true);  // 찜 등록
//                     setMessage('찜이 등록되었습니다!');
//                 } else if (response.data === '좋아요 취소하셨습니다.') {
//                     setIsWished(false);  // 찜 취소
//                     setMessage('찜이 취소되었습니다!');
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//                 setMessage('오류가 발생했습니다. 다시 시도해주세요.');
//             }
//         };
//         return (
//             <div className="wish-container">
//                 {/* 상품 상세 내용 */}
//                 <div className="product-info">
//                     <h3>상품 코드: {productCode}</h3>
//                     {/* 추가적인 상품 정보들 여기에 출력 */}
//                 </div>
//
//                 {/* 찜 버튼 */}
//                 <button onClick={handleWishClick} className="wish-btn">
//                     {isWished ? '❤️ 찜한 상품' : '🤍 찜하기'}
//                 </button>
//
//                 {/* 찜 상태 메시지 */}
//                 {message && <div className="wish-message">{message}</div>}
//             </div>
//         )
//     }
// }
