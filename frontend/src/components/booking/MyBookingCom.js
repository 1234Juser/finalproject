import MyCancelCom from "./MyCancelCom";
import MyScheduleCom from "./MyScheduleCom";
import MyCompleteCom from "./MyCompleteCom";
import emptyImage from "../../style/empty/empty-list.jpeg";
import styled from "styled-components";

const TabWrapperStyle = styled.div`
    display: flex;
    border-bottom: 2px solid #ddd;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto 20px;
    gap: 12px;
`;

const TabButton = styled.button`
    padding: 12px 0;
    margin-right: 30px;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
    border-bottom: ${({ active }) => (active ? '4px solid black' : 'none')};
`;

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
            <TabWrapperStyle>
                {/*{["예정된 여행", "지난 여행", "취소된 여행"].map((label, index) => (*/}
                {tabLabels && tabLabels.map((label, index) => {
                    const isActive = selectedTab === index;
                    return (
                        <TabButton
                            key={index}
                            onClick={() => onChangeTab(index)}
                            active={isActive}
                        >
                            {label}
                        </TabButton>
                    )
                })}
            </TabWrapperStyle>

            {filtered[selectedTab].length > 0 ? (
                <>
                    {selectedTab === 0 && (
                        <MyScheduleCom
                            reservations={filtered[0]}
                            onCancelReservation={onCancelReservation}
                            onLoadOldReservations={onLoadOldReservationsForSchedule}
                            showMoreSchedule={showMoreSchedule}
                        />
                    )}
                    {selectedTab === 1 && (
                        <MyCompleteCom
                            reservations={filtered[1]}
                            onLoadOldReservations={onLoadOldReservationsForComplete}
                            showMoreComplete={showMoreComplete}
                        />
                    )}
                    {selectedTab === 2 &&
                        <MyCancelCom reservations={filtered[2]}
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