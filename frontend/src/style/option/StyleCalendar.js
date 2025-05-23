import styled from "styled-components";
import {DayPicker} from "react-day-picker";

export const CalendarWrapper = styled.div`
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
`;