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
            return fallback;
        }
        const parsed = new Date(str);
        if (isNaN(parsed.getTime())) {
            return fallback;
        }
        return parsed;
    };

    const stripTime = (date) =>
        new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const today = new Date();
    const todayOnly = stripTime(new Date());
    const startDate = useMemo(() => stripTime(parseDateSafe(optionData?.availableStartDate, todayOnly)), [optionData]);
    const endDate = useMemo(() => stripTime(parseDateSafe(optionData?.availableEndDate, todayOnly)), [optionData]);
    const defaultDate = useMemo(() => {
        const result = todayOnly < startDate
            ? startDate
            : todayOnly > endDate
                ? startDate
                : todayOnly;
        return result;
    }, [startDate, endDate]);

    const [currentDate, setCurrentDate] = useState(() => {
        if (selectedDate) {
            const parsed = new Date(selectedDate);
            if (isNaN(parsed)) {
                return defaultDate;
            } else {
                return parsed;
            }
        }
        return defaultDate;
    });
    const [state, dispatch] = useReducer(reducer, initialState);
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
            setCurrentDate(correctedDefault);;
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
        }
    }, [state.availableStartDate, state.availableEndDate]);

    const defaultMonth = useMemo(() => {
        if (!isValidDate(startDate)) return todayOnly;
        return todayOnly < startDate ? startDate : todayOnly;
    }, [startDate]);

    useEffect(() => {
        setCurrentDate(selectedDate ? new Date(selectedDate) : defaultDate);
    }, [optionData, selectedDate]);

    useEffect(() => {
        if (!startDate || !endDate) return;

        fetchOptionsByDateRange(productUid, startDate, endDate)
            .then(data => {
                const available = [];

                data.forEach(option => {
                    const dateKey = option.reservationDate;
                    if (dateKey) {
                        available.push(new Date(dateKey));
                    }
                });
                setAvailableDates(data.map(option => stripTime(new Date(option.reservationDate))));
            })
            .catch(error => {
                alert("예약 가능한 날짜 정보를 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.");
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
        const key = format(date, 'yyyy-MM-dd');
        const isOutside = date.getMonth() !== currentDate.getMonth();
        const isBeforeToday = date < todayOnly;
        const isBeforeStart = date < startDate;
        const isAfterEnd = date > endDate;
        const isAvailable = availableDates.some(d => d.getTime() === date.getTime());
        const isDisabled = isBeforeToday || isBeforeStart || isAfterEnd;

        return (
            <DayContent isAvailable={isAvailable} isDisabled={isDisabled} isOutside={isOutside}>
                <span>{date.getDate()}</span>
                {isAvailable && <span className="dot"></span>}
            </DayContent>
        );
    };
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
        return <div>달력 정보를 불러오는 중입니다...</div>;  // or null
    }

    return(
        <>
            <Title>예약 날짜 선택</Title>
            <CalendarWrapper>
                {startDate && endDate && (
                    <StyledDayPicker
                        key={defaultMonth.toString()}
                        locale={ko}
                        mode="single"
                        selected={currentDate}
                        defaultMonth={defaultMonth}
                        onSelect={handleDateSelect}
                        fromDate={startDate}
                        toDate={endDate}
                        fromMonth={startDate}
                        toMonth={endDate}
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
                            disabled: (date) => {
                                const d = stripTime(date);
                                return d < todayOnly || d < startDate || d > endDate;
                            },
                            available: (date) =>
                                availableDates.some(d => d.getTime() === date.getTime()),
                            outsideAvailable: (date) =>
                                availableDates.some(d => d.getTime() === date.getTime()) &&
                                date.getMonth() !== currentDate.getMonth(),
                        }}
                        modifiersClassNames={{
                            outsideAvailable: 'rdp-day_outsideAvailable',
                            available: 'rdp-day_available',
                            disabled: 'rdp-day_disabled',
                            selected: 'rdp-day_selected',
                            today: 'rdp-day_today',
                            outside: 'rdp-day_outside',
                        }}
                    />)}
                {selectedDate && (
                    <SelectedDate>
                        선택된 날짜: {new Date(selectedDate).toLocaleDateString("ko-KR")}
                    </SelectedDate>
                )}
            </CalendarWrapper>
        </>)
}

export default CalendarDisplay;