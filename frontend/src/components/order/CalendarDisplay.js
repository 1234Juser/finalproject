import { DayPicker } from 'react-day-picker';
import "react-day-picker/style.css";
import { ko } from 'date-fns/locale';
import styled from 'styled-components';
import {format, parseISO} from "date-fns";
import {useEffect, useReducer, useState} from "react";
import {fetchOptionsByDate, fetchOptionsByDateRange} from "../../service/orderService";
import {initialState, reducer} from "../../modules/optionModule";

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
    const [state, dispatch] = useReducer(reducer, initialState);
    const [priceData, setPriceData] = useState({});
    const [availableDates, setAvailableDates] = useState([]);
    const [currentDate, setCurrentDate] = useState(selectedDate ? new Date(selectedDate) : new Date());
    // const today = new Date();
    // today.setHours(0, 0, 0, 0);
    // const localToday = new Date(today.toLocaleDateString("en-US"));
    // const yesterday = new Date(today);
    // yesterday.setDate(today.getDate() - 1);


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

    // useEffect(() => {
    //     const today = new Date();
    //     today.setHours(0, 0, 0, 0);
    //     dispatch({ type: "SET_FROM_DATE", data: today });
    // }, []);

    useEffect(() => {
        // const dateString = currentDate instanceof Date
        //     ? currentDate.toISOString().split("T")[0]
        //     : currentDate;
        const today = new Date();
    //     today.setHours(0, 0, 0, 0);
    //     dispatch({ type: "SET_FROM_DATE", data: today });
    //
    //     const dateString = format(currentDate, 'yyyy-MM-dd');
    //
    //     if (dateString) {
    //         const loadPriceData = async () => {
    //             try {
    //                 const data = await fetchOptionsByDate(productUid, dateString);
    //                 const formattedPrices = {};
    //                 const available = [];
    //                 data.forEach(option => {
    //                     // formattedPrices[option.reservationDate] = option.totalPrice.toLocaleString();
    //                     // available.push(new Date(option.reservationDate));
    //                     // formattedPrices[dateKey] = option.totalPrice.toLocaleString();
    //                     const dateKey = option.reservationDate || option.reservation_date || option.date;
    //                     if (dateKey) {
    //                         const [year, month, day] = dateKey.split("-");
    //                         const parsedDate = new Date(year, month - 1, day);
    //                         formattedPrices[dateKey] = option.totalPrice?.toLocaleString() || "0";
    //                         // available.push(new Date(dateKey));
    //                         if (parsedDate >= today) {
    //                             available.push(parsedDate);
    //                         }
    //                     }});
    //                 setPriceData(formattedPrices);
    //                 setAvailableDates(available);
    //                 console.log("🟢 예약 가능 날짜들:", available);
    //             } catch (error) {
    //                 console.error("🔴 옵션 가격 데이터를 불러오는 데 실패했습니다:", error);
    //             }
    //         };
    //         loadPriceData();
    //     }
    // }, [productUid, currentDate]);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const startDate = today.toISOString().split("T")[0];
        const endDate = endOfMonth.toISOString().split("T")[0];

        const loadPriceData = async () => {
            try {
                const data = await fetchOptionsByDateRange(productUid, startDate, endDate);
                const formattedPrices = {};
                const available = [];

                data.forEach(option => {
                    const dateKey = option.reservationDate;
                    if (dateKey) {
                        formattedPrices[dateKey] = option.totalPrice?.toLocaleString() || "0";
                        available.push(new Date(dateKey));
                    }
                });

                setPriceData(formattedPrices);
                setAvailableDates(available);
                console.log("🟢 예약 가능 날짜들:", available);
            } catch (error) {
                console.error("🔴 옵션 가격 데이터를 불러오는 데 실패했습니다:", error);
            }
        };

        loadPriceData();
    }, [productUid]);

    const handleDateSelect = (date) => {
        // const formattedDate = date instanceof Date ? date.toISOString().split("T")[0] : date;
        // setCurrentDate(formattedDate);
        // onDateSelect(formattedDate);
        const fromDate = state.fromDate;
        if (date < fromDate) {
            alert("오늘 이전의 날짜는 선택할 수 없습니다.");
            return;
        }
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
        // const isAvailable = availableDates.some(d => d.toISOString().split("T")[0] === key);
        const isAvailable = availableDates.some(d => format(d, 'yyyy-MM-dd') === key);


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
                // dateFormat='yyyy.MM.dd'
                // minDate={yesterday}    // minDate 이전 날짜 선택 불가
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
                // fromDate={today}
                // fromDate={new Date(today)}  // 시간 제거된 오늘 날짜.
                // fromDate={localToday}   // 오늘 이전의 날짜 선택 불가
                // fromDate={state.fromDate}
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
                    months: "flex flex-col w-full", // 월 컨테이너
                    // month: "flex flex-col space-y-[18px] inset-0 absolute justify-center items-center",
                    month: "flex flex-col w-full items-center",
                    // caption: "flex w-full mt-[22px] relative justify-center items-center",
                    // caption_label: "text-2xl font-bold text-gray-800",
                    // nav: "space-x-1 flex items-center",
                    // nav_button: "bg-transparent text-gray-800 hover:text-blue-500",
                    nav_button_previous: "absolute left-0",
                    nav_button_next: "absolute right-0",
                    // 요일 헤더
                    // weekdays: "grid grid-cols-7 w-full gap-0 text-center font-bold text-gray-800 bg-gray-100 rounded-md",
                    // weekdays: "grid grid-cols-7 w-full text-center font-bold bg-gray-100 rounded-md",
                    // weekdays: "grid grid-cols-7 w-full text-center font-bold bg-gray-100 rounded-md",
                    // weekdays: "flex w-full justify-between",
                    // day: "flex justify-center items-center w-10 h-10 rounded-full",
                    // today: "bg-blue-200 text-blue-700 font-bold",
                    // selected: "bg-blue-500 text-white rounded-full",
                    // 개별 요일 셀
                    weekday: "flex flex-col w-full",
                    // weekday: "flex justify-center items-center w-10",
                    // weekday: "text-center text-gray-600 font-semibold",
                    // weekday: "flex justify-center items-center py-2 text-gray-600 font-semibold",
                    // weekday: "py-2 text-gray-600 font-semibold",
                    // weekday: "flex justify-center items-center py-2 bg-gray-100 font-semibold",
                    // 날짜 테이블
                    // tbody: "grid grid-cols-7 gap-2 w-full", // 7개 열로 균등 분할
                    // 날짜(숫자) 버튼
                    // day: "flex justify-center items-center w-full aspect-square bg-white rounded-md cursor-pointer hover:bg-blue-100 transition-all",
                    // day: "flex justify-center items-center w-full h-16 bg-white rounded-md cursor-pointer hover:bg-blue-100 transition-all",
                    // day: "flex justify-center items-center w-full h-[60px] bg-white rounded-md cursor-pointer hover:bg-blue-100 transition-all",
                    // 오늘 날짜 스타일
                    // day_today: "bg-blue-50 text-blue-700 font-bold",
                    // 선택된 날짜 스타일
                    // day_selected: "bg-blue-500 text-white font-bold",
                    // 현재 월이 아닌 날짜 스타일
                    // day_outside: "text-gray-400 cursor-not-allowed"
                }}
                modifiers={{
                    // disabled: { before: state.fromDate },
                    disabled: { before: new Date() },
                }}
                modifiersClassNames={{
                    disabled: 'rdp-day_disabled',
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
    height: 550px;
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
    margin-top: 40px;
`;

const StyledDayPicker = styled(DayPicker)`
    .StyledDayPicker {
        width: 100%;
        max-width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
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
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 auto !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        font-family: Arial, sans-serif;
        //display: inline-block;
        //--rdp-background-color: #ffffff;
        //--rdp-accent-color: #000000;
        //--rdp-accent-background-color: #f8f9fa;
        //--rdp-today-color: #3399ff;
        //--rdp-day-height: 60px;
        //--rdp-day-width: 60px;
        //--rdp-nav_button-disabled-opacity: 0.3;
        //--rdp-nav_button-color: #000000;
        //--rdp-nav_button-background: transparent;
        //--rdp-nav_button-border-radius: 50%;
        //--rdp-day-radius: 12px;
        //--rdp-cell-radius: 12px;
        //--rdp-selected-color: #ffffff;
        //--rdp-selected-background-color: #000000;
        //--rdp-selected-border-color: #000000;
        //--rdp-disabled-opacity: 0.3;
        //--rdp-weekday-text-align: center; /* 요일 중앙 정렬 */
        //--rdp-weekday-padding: 0.5rem;
        //--rdp-weekday-opacity: 1;
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
        margin-bottom: 250px;
        //padding: 0.5rem 1rem;
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
        //width: 100%;
        //margin: 0 auto;
        //border-collapse: collapse;
        ////border-collapse: separate;
        //border-spacing: 0;
        ////margin-top: 1rem;
        width: 100% !important;
        table-layout: fixed !important; /* 셀 너비 고정 */
        //margin: 0 auto !important;
        border-collapse: collapse !important;
        border-spacing: 0 !important;
    }

    /* 요일 행 스타일 */
    .rdp-weekdays {
        //display: grid;
        //grid-template-columns: repeat(7, 1fr);
        ////display: flex;
        //text-align: center;  /* 요일 중앙 정렬 */
        //width: 100%;
        //gap: 0;
        ////padding: 10px;
        //font-weight: bold;
        //color: #333;
        //background-color: #f8f9fa;
        //border-radius: 8px;
        display: grid !important;
        grid-template-columns: repeat(7, 1fr) !important;
        width: 100% !important;
        text-align: center !important;
        gap: 70px !important;
        //font-weight: bold !important;
        color: #333 !important;
        background-color: #f8f9fa !important;
        border-radius: 8px !important;
    }
    .rdp-weekday {
        //flex: 1;
        //text-align: center;
        //font-weight: bold;
        //color: #333;
        //padding: 0.5rem 0;
        //background-color: #f8f9fa;
        //border-radius: 8px;
        flex: 1 1 0 !important;
        text-align: center !important;
        padding: 0.5rem 0 !important;
        font-weight: bold !important;
        color: #333 !important;
        background-color: #f8f9fa !important;
        border-radius: 8px !important;
        margin-top: 10px !important;
    }
    .rdp-tbody {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(7, 1fr);/* 7개 열로 나누기 */
        gap: 20px;
        padding: 0.5rem;
    }
    
    .rdp-head {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        margin-bottom: 8px;
        gap: 0 !important;
        width: 100% !important;
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
        gap: 70px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    // 날짜(숫자) 아이콘 낱개
    .rdp-day {
        //width: 52px;
        //height: 52px;
        //display: flex;
        ////display: inline-flex;
        //flex-direction: column;
        //justify-content: center;
        //align-items: center;
        //cursor: pointer;
        //margin: 0.2rem;
        ////border-radius: 50%;
        //border-radius: 12px;
        //transition: background-color 0.3s, color 0.3s;
        //border: none; /* 테두리 제거 */
        //font-size: 0.9rem;
        //position: relative;
        //background-color: #ffffff;
        //color: #333333;
        width: 100% !important;
        height: 52px !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        margin: 0.2rem !important;
        border-radius: 12px !important;
        transition: background-color 0.3s, color 0.3s !important;
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
        color: #ccc !important;
        background-color: #f9f9f9 !important;
        cursor: not-allowed !important;
        pointer-events: none !important;
        opacity: 0.6 !important;
    }

    .rdp-footer {
        padding: 0.5rem;
        text-align: center;
        background-color: #f8f9fa;
        border-radius: 0 0 12px 12px;
    }
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

    //.rd-day-picker .rdp-weekdays {
    //    display: flex !important;
    //    justify-content: space-around !important;
    //    width: 100% !important;
    //}
    //
    //.rd-day-picker .rdp-weekday {
    //    flex: 1 1 0 !important;
    //    text-align: center !important;
    //    width: auto !important;
    //    padding: 0.5rem 0 !important;
    //}

    .StyledDayPicker .rdp {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 auto !important;
    }

    .StyledDayPicker .rdp-table {
        width: 100% !important;
        table-layout: fixed !important; /* 셀 너비 고정 */
        margin: 0 auto !important;
        border-collapse: collapse !important;
        border-spacing: 0 !important;
    }
    /* 요일 (Sun, Mon, ...) */
    .StyledDayPicker .rdp-weekdays {
        display: grid !important;
        grid-template-columns: repeat(7, 1fr) !important;
        width: 100% !important;
        text-align: center !important;
        gap: 80px !important;
    }

    /* 요일 개별 아이템 */
    .StyledDayPicker .rdp-weekday {
        flex: 1 1 0 !important;
        text-align: center !important;
        width: auto !important;
        padding: 0.5rem 0 !important;
        //font-weight: bold !important;
        color: #333 !important;
        background-color: #f8f9fa !important;
        border-radius: 8px !important;
    }

    /* 날짜 셀 */
    .StyledDayPicker .rdp-day {
        width: 52px !important;
        height: 52px !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        margin: 0.2rem !important;
        border-radius: 12px !important;
        transition: background-color 0.3s, color 0.3s !important;
    }

    /* 현재 날짜 */
    .StyledDayPicker .rdp-day_today {
        background-color: #e7f3ff !important;
        color: #007bff !important;
        font-weight: bold !important;
    }

    /* 선택된 날짜 */
    .StyledDayPicker .rdp-day_selected {
        background-color: #007bff !important;
        color: #ffffff !important;
        font-weight: bold !important;
    }

    /* 외부 날짜 */
    .StyledDayPicker .rdp-day_outside {
        color: #ddd !important;
        cursor: not-allowed !important;
    }
`;
const DayContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px; /* 날짜와 가격 사이 간격 */
`;