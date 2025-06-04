import {containerStyle, mainStyle, sidebarStyle} from "../../style/member/MyPageStyle";
import AdminSideBarPage from "../../pages/common/AdminSideBarPage";
import {
    DivWrap, ListTitle,
    StyleBookingBlock, StyleContentWrap, TitleWrapper
} from "../../style/booking/StyleAdminBooking";
import {useMemo} from "react";
import {Pie} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function AdminBookingChartCom({ chartData, loading, error, startDate, endDate, onDateChange }) {
    // if (loading) return <div>로딩 중...</div>;
    // if (error) return <div>{error}</div>;
    // if (!chartData || chartData.length === 0) {
    //     return <p>데이터가 없습니다.</p>;
    // }

    const pieData = useMemo(() => {
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

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
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
                            <DivWrap>
                                <div>
                                    <label htmlFor="startDate">시작일:</label><br />
                                    <input
                                        type="date"
                                        id="startDate"
                                        value={startDate}
                                        max={endDate}
                                        onChange={(e) => onDateChange("startDate", e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="endDate">종료일:</label><br />
                                    <input
                                        type="date"
                                        id="endDate"
                                        value={endDate}
                                        min={startDate}
                                        onChange={(e) => onDateChange("endDate", e.target.value)}
                                    />
                                </div>
                            </DivWrap>
                            {loading && <p>로딩 중...</p>}
                            {error && <p style={{ color: "red" }}>{error}</p>}
                            <DivWrap>
                                {chartData.length === 0 ? (
                                    <p>데이터가 없습니다.</p>
                                ) : (
                                    <>
                                        <ul>
                                            {chartData.map((item) => (
                                                <li key={item.productCode}>
                                                    <strong>{item.productTitle}</strong> - 총 매출: {item.totalRevenue.toLocaleString()}원
                                                </li>
                                            ))}
                                        </ul>
                                        {pieData && <Pie data={pieData} options={pieOptions} />}
                                    </>
                                )}
                            </DivWrap>
                        </StyleContentWrap>
                    </StyleBookingBlock>
                </main>
            </div>
        </>)
}
export default AdminBookingChartCom