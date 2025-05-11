// src/components/realtime/AdminRealTimeCom.js
import React from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
    contentStyle,
    statsContainerStyle,
    tableContainerStyle,
    chartContainerStyle,
    tableStyle,
    thStyle,
    tdStyle,
    evenRowStyle,
    oddRowStyle,
    tableTitleStyle,
    chartTitleStyle,
    tableScrollStyle,
    contentWrapperStyle // 새로 추가된 스타일 임포트
} from "../../style/realtime/AdminRealTimeStyle";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
    '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796',
    '#f0a5a5', '#a4f0a5', '#a5a5f0', '#f0d1a5', '#a5d1f0', '#d1a5f0',
    '#a5f0d1', '#d1f0a5', '#f0a5d1', '#a5d1f0', '#f0a5a5', '#a4f0a5'
];

function AdminRealTimeCom({ cityViewCounts }) {
    const topCitiesLimit = 11;
    const topCities = cityViewCounts.slice(0, topCitiesLimit);
    const otherCities = cityViewCounts.slice(topCitiesLimit);

    let processedCityViewCounts = topCities;
    let otherViewCount = 0;

    if (otherCities.length > 0) {
        otherViewCount = otherCities.reduce((sum, city) => sum + city.viewCount, 0);
        processedCityViewCounts = [...topCities, { cityNameKR: "기타", cityName: "Other", viewCount: otherViewCount }];
    }

    const totalViewCount = processedCityViewCounts.reduce((sum, city) => sum + city.viewCount, 0);

    const chartData = {
        labels: processedCityViewCounts.map(city => city.cityNameKR),
        datasets: [
            {
                data: processedCityViewCounts.map(city => city.viewCount),
                backgroundColor: COLORS.slice(0, processedCityViewCounts.length),
                hoverBackgroundColor: COLORS.slice(0, processedCityViewCounts.length),
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 20,
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.raw;
                        const percentage = totalViewCount > 0 ? ((value / totalViewCount) * 100).toFixed(2) : 0;
                        return `${label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div style={contentStyle}>
            <div style={contentWrapperStyle}> {/* 흰색 테두리 컨테이너 적용 */}
                <h2 style={{ margin: "0 0 20px 0", fontWeight: 800, letterSpacing: "0.03em" }}>도시별 조회수 통계</h2> {/* 제목 스타일 조정 */}
                <div style={statsContainerStyle}>
                    <div style={tableContainerStyle}>
                        <h3 style={tableTitleStyle}>도시별 조회수 (상위 {topCitiesLimit}{otherCities.length > 0 ? ' + 기타' : ''})</h3>
                        <div style={tableScrollStyle}> {/* 새로 추가된 스크롤 스타일 적용 */}
                            <table style={tableStyle}>
                                <thead>
                                <tr>
                                    <th style={thStyle}>도시 이름</th>
                                    <th style={thStyle}>조회수</th>
                                </tr>
                                </thead>
                                <tbody>
                                {processedCityViewCounts.map((city, index) => (
                                    <tr key={index} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
                                        <td style={tdStyle}>{city.cityNameKR}</td>
                                        <td style={tdStyle}>{city.viewCount}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div style={chartContainerStyle}>
                        <h3 style={chartTitleStyle}>도시별 조회수 비율</h3>
                        {totalViewCount > 0 ? (
                            <div style={{ width: '100%', height: 'calc(100% - 40px)' }}> {/* 제목 높이 고려하여 그래프 높이 설정 */}
                                <Pie data={chartData} options={chartOptions} />
                            </div>
                        ) : (
                            <p style={{ textAlign: 'center' }}>표시할 데이터가 없습니다.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminRealTimeCom;