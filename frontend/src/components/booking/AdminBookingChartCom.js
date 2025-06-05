import {containerStyle, mainStyle, sidebarStyle} from "../../style/member/MyPageStyle";
import AdminSideBarPage from "../../pages/common/AdminSideBarPage";
import {
    ColorDot,
    DateFilterWrap, DateInput, DateLabel, GraphDiv, ListTitle, RevenueItem, RevenueList,
    StyleBookingBlock, StyleContentWrap, StyleDiv, TitleWrapper
} from "../../style/booking/StyleAdminBooking";
import {useMemo} from "react";
import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function AdminBookingChartCom({ chartData, loading, error, startDate, endDate, onDateChange, chartRef, chartWrapperRef, onBarFocus }) {
    // if (loading) return <div>로딩 중...</div>;
    // if (error) return <div>{error}</div>;
    // if (!chartData || chartData.length === 0) {
    //     return <p>데이터가 없습니다.</p>;
    // }

    const barData = useMemo(() => {
        if (!chartData || chartData.length === 0) return null;

        const labels = chartData.map(item => item.productTitle);
        const dataValues = chartData.map(item => item.totalRevenue);

        return {
            labels,
            datasets: [
                {
                    label: "상품별 총 매출 (원)",
                    data: dataValues,
                    backgroundColor: [
                        "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
                        "#FF9F40", "#FFCD56", "#8E44AD", "#2ECC71", "#E67E22",
                        "#1ABC9C", "#3498DB", "#9B59B6", "#E74C3C", "#F39C12",
                        "#7F8C8D", "#2C3E50", "#27AE60", "#D35400", "#BDC3C7"
                    ],
                    borderWidth: 1,
                },
            ],
        };
    }, [chartData]);

    const barOptions = {
        responsive: true,
        // maintainAspectRatio: false, // 높이와 관련된 오류 예방
        maintainAspectRatio: true,
        layout: {
            padding: {
                left: 20,
                right: 30, // 오른쪽 잘림 방지
                top: 20,
                bottom: 20,
            },
        },
        plugins: {
            legend: {
                position: "top",
            },
        },
        scales: {
            x: {
                ticks: {
                    display: false, // 그래프 아래에 productTitle라벨 숨기기
                    autoSkip: false,
                    maxRotation: 45,
                    minRotation: 45,
                },
                grid: {
                    drawTicks: false,
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return(
        <>
            <div style={containerStyle}>
                <aside style={sidebarStyle}>
                    <AdminSideBarPage />
                </aside>
                <main style={mainStyle}>
                    <StyleBookingBlock>
                        <StyleContentWrap>
                            <TitleWrapper>
                                <ListTitle>상품별 매출 통계</ListTitle>
                            </TitleWrapper>
                            <StyleDiv>
                                <DateFilterWrap>
                                    <DateLabel htmlFor="startDate">시작일:</DateLabel>
                                    <DateInput
                                        type="date"
                                        id="startDate"
                                        value={startDate}
                                        max={endDate}
                                        onChange={(e) =>
                                            onDateChange("startDate", e.target.value)}
                                    />
                                    <span>~</span>
                                    <DateLabel htmlFor="endDate">종료일:</DateLabel>
                                    <DateInput
                                        type="date"
                                        id="endDate"
                                        value={endDate}
                                        min={startDate}
                                        onChange={(e) => onDateChange("endDate", e.target.value)}
                                    />
                                </DateFilterWrap>
                            </StyleDiv>
                            {loading && <p>로딩 중...</p>}
                            {error && <p style={{ color: "red" }}>{error}</p>}
                            <GraphDiv>
                                {chartData.length === 0 ? (
                                    <p>데이터가 없습니다.</p>
                                ) : (
                                    <>
                                        <RevenueList>
                                            {chartData.map((item) => (
                                                <RevenueItem key={item.productCode} style={{ display: "flex", alignItems: "center" }} onClick={() => onBarFocus(item.productTitle)}>
                                                    <ColorDot color={barData.datasets[0].backgroundColor[index % barData.datasets[0].backgroundColor.length]} />
                                                    <strong>{item.productTitle}</strong>
                                                    <span>총 매출: {item.totalRevenue.toLocaleString()}원</span>
                                                </RevenueItem>
                                            ))}
                                        </RevenueList>
                                        <div ref={chartWrapperRef} style={{ overflowX: "auto" }}>
                                            {barData && <Bar data={barData} options={barOptions} ref={chartRef} />}
                                        </div>
                                    </>
                                )}
                            </GraphDiv>
                        </StyleContentWrap>
                    </StyleBookingBlock>
                </main>
            </div>
        </>)
}
export default AdminBookingChartCom