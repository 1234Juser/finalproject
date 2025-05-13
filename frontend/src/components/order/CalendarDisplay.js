import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import {parseISO} from "date-fns";
import {useEffect, useState} from "react";

// export default function Calendar({ proreservationDate }: { reservationDate: string }) {
//     // 사용할 날짜
//     const partyDate = parseISO(reservationDate)
//     return (
//         <>
//             <div>
//                 <DayPicker locale={ko} month={partyDate} selected={partyDate} />
//             </div>
//         </>
//     )
// }

// function MyDatePicker({ productCode, setSelectedDate, setProductPrices, accessToken }) {
//     const [product, setProduct] = useState(null);
//     const [selected, setSelected] = useState<Date>();
//     const [prices, setPrices] = useState([]);
//
//     useEffect(() => {
//         const loadProduct = async () => {
//             const productData = await fetchProduct(productCode);
//             setProduct(productData);
//             setProductPrices({
//                 adultPrice: productData.productAdult,
//                 childPrice: productData.productChild,
//             });
//         };
//
//         loadProduct();
//     }, [productCode, setProductPrices]);
//
//     return (
//     <CalendarWrapper>
//         <DayPicker
//             locale={ko}
//             animate
//             mode="single"
//             selected={selected}
//             onSelect={setSelected}
//             footer={
//                 selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
//             }
//         />
//     {product && (
//         <PriceInfo>
//             <p>성인 가격: {product.productAdult.toLocaleString()}원</p>
//             <p>아동 가격: {product.productChild.toLocaleString()}원</p>
//         </PriceInfo>
//     )}
//     </CalendarWrapper>
//     );
// }
function CalendarDisplay() {
    return <div style={{ height: "300px", backgroundColor: "#f8f9fa" }}>달력 자리</div>;
}

export default CalendarDisplay;