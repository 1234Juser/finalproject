import AdminBookingChartCom from "../../components/booking/AdminBookingChartCom";
import {useEffect, useRef, useState} from "react";
import {fetchProductRevenueStats} from "../../service/bookingChartService";

function AdminBookingChartCon({accessToken}) {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1); // 1월은 0번째 달

    // 기간 고정
    // const defaultStartDate = startOfYear.toISOString().split("T")[0]; // 'YYYY-MM-DD'
    // const defaultEndDate = today.toISOString().split("T")[0];         // 'YYYY-MM-DD'
    // 기간 유동
    const [startDate, setStartDate] = useState(startOfYear.toISOString().split("T")[0]);
    const [endDate, setEndDate] = useState(today.toISOString().split("T")[0]);

    const chartRef = useRef(null);
    const chartWrapperRef = useRef(null);

    useEffect(() => {
        const loadChartData = async (start, end) => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchProductRevenueStats(start, end, accessToken);
                setChartData(data);
            } catch (err) {
                setError("데이터를 불러오는데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        loadChartData(startDate, endDate);
    }, [startDate, endDate]);

    const handleDateChange = (field, value) => {
        if (field === "startDate") setStartDate(value);
        if (field === "endDate") setEndDate(value);
        if (field === "startDate" && value > endDate) return alert("시작일은 종료일보다 앞서야 합니다.");
    };

    const handleHighLightBar = (productTitle) => {
        const chart = chartRef.current;
        if (!chartRef.current) return;

        const chartInstance = chart.chartInstance || chart; // 일부 버전 호환

        const datasetIndex = 0;
        const index = chartData.findIndex(item => item.productTitle === productTitle);

        if (index === -1) return;

        // bar 강조 효과: activeElements 설정 후 update
        chartInstance.setActiveElements([
            { datasetIndex, index }
        ]);
        chartInstance.update();

        const wrapper = chartWrapperRef.current;
        if (wrapper && chartInstance.scales.x) {
            const xScale = chartInstance.scales.x;
            const bar = xScale.getPixelForValue(index); // 막대의 x 위치
            wrapper.scrollTo({
                left: bar - 100, // 약간 왼쪽 여유 주기
                behavior: "smooth",
            });
        }
    };

    return(
        <>
            <AdminBookingChartCom
                chartData={chartData}
                loading={loading}
                error={error}
                startDate={startDate}
                endDate={endDate}
                onDateChange={handleDateChange}
                chartRef={chartRef}
                chartWrapperRef={chartWrapperRef}
                onBarFocus={handleHighLightBar}
            />
        </>)
}
export default AdminBookingChartCon;