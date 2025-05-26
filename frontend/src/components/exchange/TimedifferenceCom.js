import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaClock } from "react-icons/fa";

export const TimeBoxWrapper = styled.div`
    background: linear-gradient(135deg, #e3f0ff 0%, #f9f9ff 100%);
    border-radius: 18px;
    width:600px;
    box-shadow: 0 4px 16px rgba(46, 120, 220, 0.07), 0 1.5px 6px rgba(46, 120, 220, 0.06);
    padding: 10px 26px 8px 26px; /* 상하 padding을 15px/10px에서 10px/8px로 더 줄였습니다. */
    border: 1px solid #e3ebfb;
    transition: box-shadow 0.2s;

    @media (max-width: 570px) {
        padding: 8px 7vw 6px 7vw; /* 모바일 뷰에서도 padding 조정 */
        font-size: 15.5px;
    }
`;

export const TimeTitle = styled.h3`
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 12px; /* 22px에서 12px로 줄였습니다. */
    color: #2562ac;
    display: flex;
    align-items: center;
`;

export const TimeTable = styled.table`
    width: 100%;
    border-spacing: 0 6px;
`;

export const TimeRow = styled.tr`
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(74, 145, 255, 0.03);
    transition: background 0.2s;
    &:hover {
        background: #f0f7ff;
    }
`;

export const TimeIconCell = styled.td`
    padding: 2px 0 2px 4px; /* 7px에서 2px로 줄였습니다. */
    width: 22px;
    font-size: 18px;
    vertical-align: middle;
`;

export const TimeNameCell = styled.td`
    padding: 2px 0 2px 8px; /* 7px에서 2px로 줄였습니다. */
    font-weight: 600;
    color: #124b74;
`;

export const TimeValueCell = styled.td`
    text-align: right;
    padding: 2px 0 2px 12px; /* 7px에서 2px로 줄였습니다. */
    font-family: 'Roboto Mono', 'Consolas', monospace;
    font-size: 1.01rem;
    letter-spacing: 0.4px;
    color: #09769e;
`;


function TimedifferenceCom() {
    const [times, setTimes] = useState({});

    useEffect(() => {
        const updateTimes = () => {
            const now = new Date();
            const options = {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };

            setTimes({
                korea: now.toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul', ...options }),
                usaNY: now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', ...options }), // 미국 동부 시간 (뉴욕 기준)
                usaLA: now.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', ...options }), // 미국 서부 시간 (LA 기준)
                uk: now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', ...options }),
                germany: now.toLocaleTimeString('de-DE', { timeZone: 'Europe/Berlin', ...options }),
                china: now.toLocaleTimeString('zh-CN', { timeZone: 'Asia/Shanghai', ...options }),
                dubai: now.toLocaleTimeString('ar-AE', { timeZone: 'Asia/Dubai', ...options }), // 두바이
                thailand: now.toLocaleTimeString('th-TH', { timeZone: 'Asia/Bangkok', ...options }), // 태국
            });
        };

        updateTimes(); // 컴포넌트 마운트 시 한 번 실행
        const intervalId = setInterval(updateTimes, 1000); // 1초마다 업데이트

        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
    }, []);

    return (
        <TimeBoxWrapper>
            <TimeTitle>
                <FaClock style={{ marginRight: 8 }} />
                주요 도시 현재 시간
            </TimeTitle>
            <TimeTable>
                <tbody>
                <TimeRow>
                    <TimeIconCell><FaClock color="#009688" /></TimeIconCell>
                    <TimeNameCell>한국</TimeNameCell>
                    <TimeValueCell>{times.korea}</TimeValueCell>
                </TimeRow>
                <TimeRow>
                    <TimeIconCell><FaClock color="#2b7eb8" /></TimeIconCell>
                    <TimeNameCell>미국 (뉴욕)</TimeNameCell>
                    <TimeValueCell>{times.usaNY}</TimeValueCell>
                </TimeRow>
                <TimeRow>
                    <TimeIconCell><FaClock color="#ac6" /></TimeIconCell>
                    <TimeNameCell>미국 (LA)</TimeNameCell>
                    <TimeValueCell>{times.usaLA}</TimeValueCell>
                </TimeRow>
                <TimeRow>
                    <TimeIconCell><FaClock color="#eb5536" /></TimeIconCell>
                    <TimeNameCell>영국</TimeNameCell>
                    <TimeValueCell>{times.uk}</TimeValueCell>
                </TimeRow>
                <TimeRow>
                    <TimeIconCell><FaClock color="#ffae00" /></TimeIconCell>
                    <TimeNameCell>독일</TimeNameCell>
                    <TimeValueCell>{times.germany}</TimeValueCell>
                </TimeRow>
                <TimeRow>
                    <TimeIconCell><FaClock color="#009688" /></TimeIconCell>
                    <TimeNameCell>중국</TimeNameCell>
                    <TimeValueCell>{times.china}</TimeValueCell>
                </TimeRow>
                <TimeRow>
                    <TimeIconCell><FaClock color="#2b7eb8" /></TimeIconCell>
                    <TimeNameCell>두바이</TimeNameCell>
                    <TimeValueCell>{times.dubai}</TimeValueCell>
                </TimeRow>
                <TimeRow>
                    <TimeIconCell><FaClock color="#ac6" /></TimeIconCell>
                    <TimeNameCell>태국</TimeNameCell>
                    <TimeValueCell>{times.thailand}</TimeValueCell>
                </TimeRow>
                </tbody>
            </TimeTable>
        </TimeBoxWrapper>
    );
}

export default TimedifferenceCom;