import MyCancelCom from "./MyCancelCom";
import MyScheduleCom from "./MyScheduleCom";
import MyCompleteCom from "./MyCompleteCom";
import emptyImage from "../../style/empty/empty-list.jpeg";

const tabWrapperStyle = {
    display: "flex",
    borderBottom: "2px solid #ddd",
    marginBottom: "20px",
    gap: "12px"
};
// return내부에 컴포넌트스타일로 있을 땐 간격이 떨어져있지만 외부로 나오면 margin설정을 다해줘야한다..
// style={{
//     padding: "10px 20px",
//         borderBottom: selectedTab === index ? "4px solid black" : "none",
//         // borderBottom: selectedTab === index ? "4px solid black" : "2px solid transparent",
//         fontWeight: selectedTab === index ? "bold" : "normal",
// }}
const tabButtonStyle = {
    // flex: 1,
    padding: "12px 0",
    marginRight: "30px",
    background: "none",
    border: "none",
    // borderTop: "none",
    // borderLeft: "none",
    // borderRight: "none",
    cursor: "pointer",
    // fontSize: "16px"
};

const activeTabStyle = {
    fontWeight: "bold",
    borderBottom: "4px solid black"
};

const inactiveTabStyle = {
    fontWeight: "normal",
    // borderBottom: "2px solid transparent"
    borderBottom: "none"
};

function MyBookingCom({selectedTab, onChangeTab, reservations = [],
                          onCancelReservation,
                          onLoadOldReservationsForSchedule,
                          onLoadOldReservationsForComplete,
                          onLoadOldReservationsForCancel,
                          showMoreSchedule, showMoreComplete, showMoreCancel}){
    const filtered = {
        0: reservations.filter(r => r.orderStatus.toUpperCase() === "SCHEDULED"),
        1: reservations.filter(r => r.orderStatus.toUpperCase() === "COMPLETED"),
        2: reservations.filter(r => r.orderStatus.toUpperCase() === "CANCELED"),
    };

    const tabLabels = ["예정된 여행", "지난 여행", "취소된 여행"];
    const EmptyState = ({ message }) => (
        <div style={{ textAlign: "center", padding: "40px" }}>
            {/*<img src={emptyImage} alt="비어 있음" style={{ width: "150px", opacity: 0.6 }} />*/}
            <img src={emptyImage} alt="비어 있음" style={{ width: "500px"}} />
            <p style={{ marginTop: "1rem", fontSize: "18px", color: "#555" }}>
                {message}
            </p>
        </div>
    );
    // 상태 나누면서 필요없어짐
    // const shouldShowLoadOldButton = showMoreAvailable;
    // reservations.some(res => res.orderStatus === "SCHEDULED")
    console.log("예약 상태들:", reservations.map(r => r.orderStatus));
    console.log("전달받은 reservations:", reservations);
    console.log("탭별 분류:", {
        SCHEDULED: filtered[0].length,
        COMPLETED: filtered[1].length,
        CANCELED: filtered[2].length
    });

    return(
    <>
        {/* 탭 UI */}
        <div style={tabWrapperStyle}>
            {/*{["예정된 여행", "지난 여행", "취소된 여행"].map((label, index) => (*/}
            {tabLabels && tabLabels.map((label, index) => {
                const isActive = selectedTab === index;
                return (
                <button
                    key={index}
                    onClick={() => onChangeTab(index)}
                    style={{
                        ...tabButtonStyle,
                        ...(isActive ? activeTabStyle : inactiveTabStyle)
                    }}
                >
                    {label}
                </button>
        )
        })}
        </div>

        {/* 탭에 따라 컴포넌트 조건부 렌더링 */}
        {/*{selectedTab === 0 && (*/}
        {/*    reservations.some(res => res.orderStatus === "SCHEDULED")*/}
        {/*        ? <MyScheduleCom reservations={reservations} />*/}
        {/*        : <EmptyState message="예정된 여행이 없습니다." />*/}
        {/*)}*/}
        {/*{selectedTab === 1 && (*/}
        {/*    reservations.some(res => res.orderStatus === "COMPLETED")*/}
        {/*        ? <MyCompleteCom reservations={reservations} />*/}
        {/*        : <EmptyState message="지난 여행이 없습니다." />*/}
        {/*)}*/}
        {/*{selectedTab === 2 && (*/}
        {/*    reservations.some(res => res.orderStatus === "CANCELED")*/}
        {/*        ? <MyCancelCom reservations={reservations} />*/}
        {/*        : <EmptyState message="취소된 여행이 없습니다." />*/}
        {/*)}*/}

        {/*{filtered[selectedTab].length > 0 ? (*/}
        {/*    selectedTab === 0 ? (*/}
        {/*        <MyScheduleCom reservations={filtered[0]}*/}
        {/*                       onCancelReservation={onCancelReservation}*/}
        {/*        />*/}
        {/*    ) : selectedTab === 1 ? (*/}
        {/*        <MyCompleteCom reservations={filtered[1]}*/}
        {/*                       onPageClick={onPageClick}*/}
        {/*        />*/}
        {/*    ) : (*/}
        {/*        <MyCancelCom reservations={filtered[2]} />*/}
        {/*    )*/}
        {/*) : (*/}
        {/*    <EmptyState message={`${tabLabels[selectedTab]}이 없습니다.`} />*/}
        {/*)}*/}

        {filtered[selectedTab].length > 0 ? (
            <>
                {selectedTab === 0 && (
                    <MyScheduleCom
                        reservations={filtered[0]}
                        onCancelReservation={onCancelReservation}
                        // onLoadOldReservations={onLoadOldReservations}
                        onLoadOldReservations={onLoadOldReservationsForSchedule}
                        showMoreSchedule={showMoreSchedule}
                    />
                )}
                {selectedTab === 1 && (
                    <MyCompleteCom
                        reservations={filtered[1]}
                        // onLoadOldReservations={onLoadOldReservations}
                        onLoadOldReservations={onLoadOldReservationsForComplete}
                        showMoreComplete={showMoreComplete}
                    />
                )}
                {selectedTab === 2 &&
                    <MyCancelCom reservations={filtered[2]}
                                 // onLoadOldReservations={onLoadOldReservations}
                                 onLoadOldReservations={onLoadOldReservationsForCancel}
                                 showMoreCancel={showMoreCancel}
                    />}
            </>
        ) : (
            <EmptyState message={`${tabLabels[selectedTab]}이 없습니다.`} />
        )}
    </>
    )
}
export default MyBookingCom;