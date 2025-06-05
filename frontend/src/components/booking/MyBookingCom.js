import MyCancelCom from "./MyCancelCom";
import MyScheduleCom from "./MyScheduleCom";
import MyCompleteCom from "./MyCompleteCom";
import emptyImage from "../../style/empty/empty-list.jpeg";
import {TabButton, TabWrapperStyle} from "../../style/booking/StyleMyBooking"

function MyBookingCom({selectedTab, onChangeTab, reservations = [],
                        onCancelReservation,
                        onLoadOldReservationsForSchedule,
                        onLoadOldReservationsForComplete,
                        onLoadOldReservationsForCancel,
                        showMoreSchedule, showMoreComplete, showMoreCancel,
                        openReviewModal,
                        autoLoadingDone,
                        cityIdMap={}}){

    const filtered = {
        0: reservations.filter(r =>
            ["SCHEDULED", "WAITING_BANK_TRANSFER"].includes(r.orderStatus?.toUpperCase())
        ),
        1: reservations.filter(r => r.orderStatus.toUpperCase() === "COMPLETED"),
        2: reservations.filter(r => r.orderStatus.toUpperCase() === "CANCELED"),
    };

    if (selectedTab < 0 || selectedTab > 2) return null;

    const tabLabels = ["예정된 여행", "지난 여행", "취소된 여행"];
    const EmptyState = ({ message }) => (
        <div style={{ textAlign: "center", padding: "40px" }}>
            <img src={emptyImage} alt="비어 있음" style={{ width: "500px"}} />
            <p style={{ marginTop: "1rem", fontSize: "18px", color: "#555" }}>
                {message}
            </p>
        </div>
    );

    return(
        <>
            {/* 탭 UI */}
            <TabWrapperStyle>
                {tabLabels && tabLabels.map((label, index) => {
                    const isActive = selectedTab === index;
                    return (
                        <TabButton
                            key={index}
                            onClick={() => onChangeTab(index)}
                            $active={isActive}
                        >
                            {label}
                        </TabButton>
                    )
                })}
            </TabWrapperStyle>


            {!autoLoadingDone ? null : (filtered[selectedTab].length > 0 ? (
                    <>
                        {selectedTab === 0 && (
                            <MyScheduleCom
                                reservations={filtered[0]}
                                onCancelReservation={onCancelReservation}
                                onLoadOldReservations={onLoadOldReservationsForSchedule}
                                showMoreSchedule={showMoreSchedule}
                                cityIdMap={cityIdMap}
                            />
                        )}
                        {selectedTab === 1 && (
                            <MyCompleteCom
                                reservations={filtered[1]}
                                onLoadOldReservations={onLoadOldReservationsForComplete}
                                showMoreComplete={showMoreComplete}
                                openReviewModal={openReviewModal}
                                cityIdMap={cityIdMap}
                            />
                        )}
                        {selectedTab === 2 &&
                            <MyCancelCom reservations={filtered[2]}
                                         onLoadOldReservations={onLoadOldReservationsForCancel}
                                         showMoreCancel={showMoreCancel}
                                         cityIdMap={cityIdMap}
                            />}
                    </>
                ) : (
                    <EmptyState message={`${tabLabels[selectedTab]}이 없습니다.`} />
                )
            )}
        </>
    )
}
export default MyBookingCom;