import { DayPicker } from 'react-day-picker';
import "react-day-picker/style.css";
import { ko } from 'date-fns/locale';
import {format} from "date-fns";
import {useEffect, useMemo, useReducer, useState} from "react";
import {fetchOptionsByDateRange} from "../../service/orderService";
import {initialState, reducer} from "../../modules/optionModule";
import {CalendarWrapper, DayContent, SelectedDate, StyledDayPicker, Title} from "../../style/option/StyleCalendar";

function CalendarDisplay({ productUid, selectedDate, onDateSelect, optionData }) {
    const isValidDate = (date) =>  date instanceof Date && !isNaN(date);
    const parseDateSafe = (str, fallback = new Date()) => {
        if (!str) {
            console.warn("⛔ parseDateSafe: str이 비어 있음 → fallback 사용:", fallback);
            return fallback;
        }
        const parsed = new Date(str);
        if (isNaN(parsed.getTime())) {
            console.warn("⛔ parseDateSafe: Invalid Date 발생 →", str, "→ fallback 사용:", fallback);
            return fallback;
        }
        console.log("✅ parseDateSafe: 정상적으로 파싱됨 →", str, "→", parsed);
        return parsed;
    };

    const today = new Date();
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startDate = useMemo(() => {
        const result = parseDateSafe(optionData?.availableStartDate, todayOnly);
        console.log("🟢 startDate 최종:", result);
        return result;
    }, [optionData]);
    const endDate = useMemo(() => {
        const result = parseDateSafe(optionData?.availableEndDate, todayOnly);
        console.log("🟢 endDate 최종:", result);
        return result;
    }, [optionData]);
    const defaultDate = useMemo(() => {
        const result = todayOnly < startDate
            ? startDate
            : todayOnly > endDate
                ? startDate
                : todayOnly;
        console.log("🟡 defaultDate 계산 결과:", result);
        return result;
    }, [startDate, endDate]);

    const [currentDate, setCurrentDate] = useState(() => {
        if (selectedDate) {
            const parsed = new Date(selectedDate);
            if (isNaN(parsed)) {
                console.warn("⛔ selectedDate가 Invalid Date임 → defaultDate 사용:", defaultDate);
                return defaultDate;
            } else {
                console.log("✅ selectedDate 유효:", parsed);
                return parsed;
            }
        }
        console.log("🟢 selectedDate 없음 → defaultDate 사용:", defaultDate);
        return defaultDate;
    });
    const [state, dispatch] = useReducer(reducer, initialState);
    const [priceData, setPriceData] = useState({});
    const [availableDates, setAvailableDates] = useState([]);

    useEffect(() => {
        // optionData 들어오고 reservationDate가 설정 안되어 있을 때만
        if (
            isValidDate(startDate) &&
            isValidDate(endDate) &&
            !selectedDate &&
            currentDate.getTime() === todayOnly.getTime() // fallback 상태일 때만
        ) {
            const correctedDefault = todayOnly < startDate
                ? startDate
                : todayOnly > endDate
                    ? startDate
                    : todayOnly;
            console.log("🛠 currentDate를 fallback에서 재설정:", correctedDefault);
            setCurrentDate(correctedDefault);
        }
    }, [startDate, endDate, selectedDate]);

    useEffect(() => {
        if (
            state.reservationDate === null &&
            state.availableStartDate &&
            state.availableEndDate
        ) {
            const start = new Date(state.availableStartDate);
            const end = new Date(state.availableEndDate);
            const today = new Date();

            const validStart = today < start ? start : today > end ? start : today;
            const formattedInitDate = validStart.toISOString().split("T")[0];
            dispatch({ type: "SET_RESERVATION_DATE", data: formattedInitDate });
            console.log("🟢 예약 날짜 초기화:", formattedInitDate);
        }
    }, [state.availableStartDate, state.availableEndDate]);

    useEffect(() => {
        setCurrentDate(selectedDate ? new Date(selectedDate) : defaultDate);
    }, [optionData, selectedDate]);

    useEffect(() => {
        if (!startDate || !endDate) return;

        // const today = new Date(); // 기준 날짜가 필요한 경우

        fetchOptionsByDateRange(productUid, startDate, endDate)
            .then(data => {
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
            })
            .catch(error => {
                console.error("🔴 옵션 가격 데이터를 불러오는 데 실패했습니다:", error);
            });
    }, [productUid, startDate, endDate]);

    const handleDateSelect = (date) => {
        if (!date || !isValidDate(date)) return;
        const selected = format(date, 'yyyy-MM-dd');
        if (selected < format(startDate, "yyyy-MM-dd") || selected > format(endDate, "yyyy-MM-dd")) {
            alert("이용 가능 기간 외의 날짜입니다.");
            return;
        }
        setCurrentDate(date);
        onDateSelect(selected);
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
                {isAvailable && <span className="dot"></span>}
            </DayContent>
        );
    };

    return(
    <>
        <Title>예약 날짜 선택</Title>
        <CalendarWrapper>
            {startDate && endDate && (
            <StyledDayPicker
                locale={ko}
                mode="single"
                // dateFormat='yyyy.MM.dd'
                // minDate={yesterday}    // minDate 이전 날짜 선택 불가
                selected={currentDate}
                month={currentDate}  // 초기에 보여줄 달
                // selected={new Date(currentDate)}
                onSelect={handleDateSelect}
                // selected={selectedDate ? new Date(selectedDate) : undefined}
                // onSelect={(date) => {
                //     if (date) {
                //         onDateSelect(date.toISOString().split("T")[0]); // YYYY-MM-DD 형식으로 변환
                //     }
                // }}
                // fromDate={new Date()}
                fromDate={startDate}
                toDate={endDate}
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
                    month: "flex flex-col w-full items-center",
                    nav_button_previous: "absolute left-0",
                    nav_button_next: "absolute right-0",
                    // 개별 요일 셀
                    weekday: "flex flex-col w-full",
                }}
                modifiers={{
                    disabled: [{ before: startDate, after: endDate }],
                }}
                modifiersClassNames={{
                    disabled: 'rdp-day_disabled',
                    selected: 'rdp-day_selected',
                    today: 'rdp-day_today',
                    outside: 'rdp-day_outside',
                }}
            />)}
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