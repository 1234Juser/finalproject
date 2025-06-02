import styled from "styled-components";
import {DayPicker} from "react-day-picker";

export const CalendarWrapper = styled.div`
    height: 550px;
    width: 90%;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    margin: 0 auto;
`;

export const Title = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 20px;
    text-align: center;
    color: #333333;
`;

export const SelectedDate = styled.p`
    text-align: center;
    font-weight: bold;
    margin-top: 40px;
`;

export const StyledDayPicker = styled(DayPicker)`
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
        background-color: #f8f9fa;
        border-radius: 12px;
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
    }

    .rdp-nav {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 250px;
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
        cursor: pointer;
        font-weight: bold;
        transform: translateY(-50%);
        transition: background-color 0.3s;
        flex-shrink: 0;
    }
    .rdp-nav_button_previous {
        position: absolute;
        left: 0;
    }

    /* 오른쪽 버튼 */
    .rdp-nav_button_next {
        position: absolute;
        right: 0;
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
        width: 100% !important;
        table-layout: fixed !important; /* 셀 너비 고정 */
        border-collapse: collapse !important;
        border-spacing: 0 !important;
    }

    /* 요일 행 스타일 */
    .rdp-weekdays {
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
        width: 100% !important;
        height: 52px !important;
        display: flex !important;
        flex-direction: column !important;
        line-height: 1.2 !important;
        font-size: 0.9rem !important;
        overflow: visible !important;
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
        color: inherit !important;
        cursor: auto !important;
        opacity: 1 !important;
    }

    .rdp-day_outsideAvailable {
        color: #333 !important;
        opacity: 1 !important;
        pointer-events: auto !important;
        cursor: pointer !important;
    }

    .rdp-day.rdp-day_outside.rdp-day_available {
        color: #333 !important;
        opacity: 1 !important;
        pointer-events: auto !important;
        cursor: pointer !important;
    }

    .rdp-day_available{
        color: #333;
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
export const DayContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px; /* 날짜와 가격 사이 간격 */
    color: ${({ isAvailable, isDisabled, isOutside }) => {
    if (isDisabled) return "#ccc";
    if (isAvailable) {
        return "#000"; // 가용 날짜면 검정
    }
    return "#ddd"; // 불가 날짜면 회색
}};
  
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
  pointer-events: ${({ isDisabled }) => (isDisabled ? "none" : "auto")};
  cursor: ${({ isAvailable, isDisabled }) => {
    if (isDisabled) return "default";
    if (isAvailable) return "pointer";
    return "default";
}};
`;