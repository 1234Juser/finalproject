import { DayPicker } from 'react-day-picker';
import "react-day-picker/style.css";
import { ko } from 'date-fns/locale';
import styled from 'styled-components';
import {format, parseISO} from "date-fns";
import {useEffect, useState} from "react";
import {fetchOptionsByDate} from "../../service/orderService";

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
//
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
function CalendarDisplay({ productUid, selectedDate, onDateSelect }) {
    // return <div style={{ height: "300px", backgroundColor: "#f8f9fa" }}>달력 자리</div>;
    const [priceData, setPriceData] = useState({});
    const [currentDate, setCurrentDate] = useState(selectedDate ? new Date(selectedDate) : new Date());
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);


    // useEffect(() => {
    //     const loadPriceData = async () => {
    //         try {
    //             const data = await fetchOptionsByDate(productUid);
    //             const formattedPrices = {};
    //             data.forEach(option => {
    //                 formattedPrices[option.reservationDate] = option.totalPrice.toLocaleString();
    //             });
    //             setPriceData(formattedPrices);
    //         } catch (error) {
    //             console.error("🔴 옵션 가격 데이터를 불러오는 데 실패했습니다:", error);
    //         }
    //     };
    //
    //     loadPriceData();
    // }, [productUid]);
    // useEffect(() => {
    //     if (selectedDate) {
    //         const dateString = selectedDate.toISOString().split("T")[0];
    //         const loadPriceData = async () => {
    //             try {
    //                 const data = await fetchOptionsByDate(productUid, dateString);
    //                 const formattedPrices = {};
    //                 data.forEach(option => {
    //                     formattedPrices[option.reservationDate] = option.totalPrice.toLocaleString();
    //                 });
    //                 setPriceData(formattedPrices);
    //             } catch (error) {
    //                 console.error("🔴 옵션 가격 데이터를 불러오는 데 실패했습니다:", error);
    //             }
    //         };
    //
    //         loadPriceData();
    //     }
    // }, [productUid, selectedDate]);
    useEffect(() => {
        // const dateString = currentDate instanceof Date
        //     ? currentDate.toISOString().split("T")[0]
        //     : currentDate;
        const dateString = format(currentDate, 'yyyy-MM-dd');

        if (dateString) {
            const loadPriceData = async () => {
                try {
                    const data = await fetchOptionsByDate(productUid, dateString);
                    const formattedPrices = {};
                    data.forEach(option => {
                        formattedPrices[option.reservationDate] = option.totalPrice.toLocaleString();
                    });
                    setPriceData(formattedPrices);
                } catch (error) {
                    console.error("🔴 옵션 가격 데이터를 불러오는 데 실패했습니다:", error);
                }
            };

            loadPriceData();
        }
    }, [productUid, currentDate]);

    const handleDateSelect = (date) => {
        // const formattedDate = date instanceof Date ? date.toISOString().split("T")[0] : date;
        // setCurrentDate(formattedDate);
        // onDateSelect(formattedDate);
        if (date instanceof Date) {
            // const formattedDate = date.toISOString().split("T")[0];
            const formattedDate = format(date, 'yyyy-MM-dd');
            setCurrentDate(date);
            onDateSelect(formattedDate);
        }
    };

    const renderDay = (date) => {
        // const key = date.toISOString().split("T")[0];
        const key = format(date, 'yyyy-MM-dd');
        const price = priceData[key] || null;
        return (
            <DayContent>
                <span>{date.getDate()}</span>
                {price && <span className="price">{price}원</span>}
                {price && <span className="dot"></span>}
            </DayContent>
        );
    };

    return(
    <>
            <Title>예약 날짜 선택</Title>
        <CalendarWrapper>
            <StyledDayPicker
                locale={ko}
                mode="single"
                dateFormat='yyyy.MM.dd'
                minDate={yesterday}    // minDate 이전 날짜 선택 불가
                selected={currentDate}
                // selected={new Date(currentDate)}
                onSelect={handleDateSelect}
                // selected={selectedDate ? new Date(selectedDate) : undefined}
                // onSelect={(date) => {
                //     if (date) {
                //         onDateSelect(date.toISOString().split("T")[0]); // YYYY-MM-DD 형식으로 변환
                //     }
                // }}
                fromDate={new Date()}
                showOutsideDays={true}  // 현재 월에 포함되지 않은 날짜도 표시
                onChange={(date) => setCurrentDate(date)}
                components={{
                    DayContent: ({ date }) => renderDay(date),
                }}
                formatters={{
                    formatCaption: (month) => format(month, 'yyyy년 MM월', { locale: ko }),
                    formatWeekdayName: (date) => format(date, 'EEE', { locale: ko }),
                }}
                classNames={{
                    // months: "flex flex-col w-full", // 월 컨테이너
                    // month: "flex flex-col space-y-[18px] inset-0 absolute justify-center items-center",
                    // caption: "flex w-full mt-[22px] relative justify-center items-center",
                    // caption_label: "text-2xl font-bold text-gray-800",
                    // nav: "space-x-1 flex items-center",
                    // nav_button: "bg-transparent text-gray-800 hover:text-blue-500",
                    nav_button_previous: "absolute left-0",
                    nav_button_next: "absolute right-0",
                    // weekday: "text-center text-gray-600 font-semibold",
                }}
                modifiersClassNames={{
                    selected: 'rdp-day_selected',
                    today: 'rdp-day_today',
                    outside: 'rdp-day_outside',
                }}
            />
            {selectedDate && (
                <SelectedDate>
                    {/*선택된 날짜: {selectedDate.toLocaleDateString()}*/}
                    선택된 날짜: {new Date(selectedDate).toLocaleDateString("ko-KR")}
                </SelectedDate>
            )}
        </CalendarWrapper>
    </>)
}

export default CalendarDisplay;

const CalendarWrapper = styled.div`
    height: 500px;
    width: 90%;
    //max-width: 800px;
    //margin: 20px;
    padding: 20px;
    //padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 10px;
    //overflow: hidden;
    //max-width: 100%;
    margin: 0 auto;
`;

const Title = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 20px;
    text-align: center;
    color: #333333;
`;

const SelectedDate = styled.p`
    text-align: center;
    font-weight: bold;
    margin-top: 70px;
`;

const StyledDayPicker = styled(DayPicker)`
    .CalendarWrapper {
        width: 90%;
        max-width: 1200px;
        //padding: 20px;
        background-color: #f8f9fa;
        border-radius: 12px;
        //margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .rdp {
        width: 100%;
        max-width: 100%;
        margin: 0 auto;
        font-family: Arial, sans-serif;
        display: inline-block;
        --rdp-background-color: #ffffff;
        --rdp-accent-color: #000000;
        --rdp-accent-background-color: #f8f9fa;
        --rdp-today-color: #3399ff;
        --rdp-day-height: 60px;
        --rdp-day-width: 60px;
        --rdp-nav_button-disabled-opacity: 0.3;
        --rdp-nav_button-color: #000000;
        --rdp-nav_button-background: transparent;
        --rdp-nav_button-border-radius: 50%;
        --rdp-day-radius: 12px;
        --rdp-cell-radius: 12px;
        --rdp-selected-color: #ffffff;
        --rdp-selected-background-color: #000000;
        --rdp-selected-border-color: #000000;
        --rdp-disabled-opacity: 0.3;
        --rdp-weekday-text-align: center; /* 요일 중앙 정렬 */
        --rdp-weekday-padding: 0.5rem;
        --rdp-weekday-opacity: 1;
    }

    .rdp-caption {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;
        position: relative;
        width: 100%;
    }
    /* 연-월 표기 */
    .rdp-caption_label {
        text-align: center;
        font-size: 1.2rem;
        color: #333;
        margin: 0 auto;
        //flex-shrink: 0;
    }

    .rdp-nav {
        display: flex;
        //position: relative;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 1rem;
        color: #ffffff;
        font-weight: bold;
    }
    .rdp-nav_button {
        position: absolute;
        background-color: #007bff;
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: none;
        padding: 0.5rem 1rem;
        border-bottom: 1px solid #e5e5e5;
        border-radius: 8px 8px 0 0;
        //border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        transform: translateY(-50%);
        transition: background-color 0.3s;
        flex-shrink: 0;
    }
    .rdp-nav_button_previous {
        position: absolute;
        left: 0;
        //margin-right: auto;
    }

    /* 오른쪽 버튼 */
    .rdp-nav_button_next {
        position: absolute;
        right: 0;
        //margin-left: auto;
    }

    .rdp-nav_button:hover {
        background-color: #0056b3;
    }
    .rdp-month {
        width: 100%; /* 캘린더 한 달의 너비를 100%로 설정 */
    }
    .rdp-month {
        width: 100%;
    }

    .rdp-table {
        width: 100%;
        margin: 0 auto;
        border-collapse: collapse;
        //border-collapse: separate;
        border-spacing: 0;
        //margin-top: 1rem;
    }
    /* 요일 행 스타일 */
    .rdp-weekdays {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        //display: flex;
        text-align: center;  /* 요일 중앙 정렬 */
        width: 100%;
        gap: 0;
        //padding: 10px;
        font-weight: bold;
        color: #333;
        background-color: #f8f9fa;
        border-radius: 8px;
    }
    .rdp-weekday {
        flex: 1;
        text-align: center;
        font-weight: bold;
        color: #333;
        padding: 0.5rem 0;
        background-color: #f8f9fa;
        border-radius: 8px;
    }
    .rdp-tbody {
        display: grid;
        grid-template-columns: repeat(7, 1fr);/* 7개 열로 나누기 */
        gap: 20px;
        padding: 0.5rem;
    }
    
    .rdp-head {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        margin-bottom: 8px;
    }

    .rdp-head_row {
        //display: contents;
        display: grid;
        grid-template-columns: repeat(7, 1fr); /* 7개의 열로 균등 분할 */
        gap: 10px;
    }
    
    /* 날짜버튼을 고르게 펼침 */
    .rdp-head_cell {
        text-align: center;
        padding: 0.5rem 0;
        font-weight: 500;
        color: #555;
        background-color: #f8f9fa;
        border-radius: 8px;
    }

    /* 요일 간격 조정 */
    .rdp-week {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 10px;
    }

    // 날짜(숫자) 아이콘 낱개
    .rdp-day {
        width: 52px;
        height: 52px;
        display: flex;
        //display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 0.2rem;
        //border-radius: 50%;
        border-radius: 12px;
        transition: background-color 0.3s, color 0.3s;
        border: none; /* 테두리 제거 */
        font-size: 0.9rem;
        position: relative;
        background-color: #ffffff;
        color: #333333;
    }

    .rdp-day:hover {
        background-color: #007bff;
        color: #ffffff;
    }

    .rdp-day_today {
        background-color: #e7f3ff;
        color: #007bff;
        font-weight: bold;
    }

    .rdp-day_selected {
        background-color: #007bff;
        color: #ffffff;
        font-weight: bold;
    }

    .rdp-day_outside {
        color: #ddd;
        cursor: not-allowed;
    }

    .rdp-day_disabled {
        color: #ccc;
        background-color: #f9f9f9;
        cursor: not-allowed;
    }

    //.rdp-footer {
    //    padding: 0.5rem;
    //    text-align: center;
    //    background-color: #f8f9fa;
    //    border-radius: 0 0 12px 12px;
    //}
    .price {
        font-size: 0.8rem;
        color: #666;
        margin-top: 2px;
    }

    .dot {
        width: 6px;
        height: 6px;
        background-color: #1abc9c;
        border-radius: 50%;
        position: absolute;
        top: 5px;
        right: 5px;
    }
`;
const DayContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px; /* 날짜와 가격 사이 간격 */
`;