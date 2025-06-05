import {containerStyle, mainStyle, sidebarStyle} from "../../style/member/MyPageStyle";
import AdminSideBarPage from "../../pages/common/AdminSideBarPage";
import {
    DateFilterWrap, DateInput, DateLabel, GraphDiv, ListTitle, RevenueItem, RevenueList,
    StyleBookingBlock, StyleContentWrap, StyleDiv, TitleWrapper
} from "../../style/booking/StyleAdminBooking";
import {useMemo} from "react";
import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function AdminBookingChartCom({ chartData, loading, error, startDate, endDate, onDateChange }) {
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
                        "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#FFCD56"
                    ],
                    borderWidth: 1,
                },
            ],
        };
    }, [chartData]);

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
        scales: {
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
                                        onChange={(e) => onDateChange("startDate", e.target.value)}
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
                                                <RevenueItem key={item.productCode}>
                                                    <strong>{item.productTitle}</strong>
                                                    <span>총 매출: {item.totalRevenue.toLocaleString()}원</span>
                                                </RevenueItem>
                                            ))}
                                        </RevenueList>
                                        {barData && <Bar data={barData} options={barOptions} />}
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