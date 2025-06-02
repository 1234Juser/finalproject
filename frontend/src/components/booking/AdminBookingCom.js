import {
    DivPage, DivWrap, FilterAndActionWrap,
    LeftBox, ListTitle, RightBox, SelectBox, SpanPage,
    StyleBookingBlock, StyleContentWrap, StyledActionButton,
    StyledForm, StyledStatusBadge, StyledTable, TitleWrapper
} from "../../style/booking/StyleAdminBooking";
import {containerStyle, mainStyle, sidebarStyle} from "../../style/member/MyPageStyle";
import AdminSideBarPage from "../../pages/common/AdminSideBarPage";

function AdminBookingCom({ reservations, loading, currentPage, totalPages,
                             selectedOrders, onCheck, onSubmit, onClick,
                             selectedStatus, onStatusChange}){
    const statusLabel = {
        SCHEDULED: "예약확정",
        COMPLETED: "여행완료",
        CANCELED: "예약취소",
        WAITING_BANK_TRANSFER: "무통장 입금대기"
    };
    console.log("reservations", reservations);
    const isEmpty = !Array.isArray(reservations) || reservations.length === 0;
    let number = []

    if (totalPages > 0) {
        for(let i = 1; i <= totalPages; i++) {
            number.push(
                <SpanPage
                    key={i}
                    onClick={() => onClick(i)}
                    style={{ fontWeight: currentPage === i ? "bold" : "normal" }}
                >
                    {i}
                </SpanPage>
            )
        }
        number.push(<b key={totalPages + 1}>({currentPage}/{totalPages})</b>);
    }

    return (
        <>
            <div style={containerStyle}>
                <aside style={sidebarStyle}>
                    <AdminSideBarPage />
                </aside>
                <main style={mainStyle}>
            <StyleBookingBlock>
                <StyleContentWrap>
                    <TitleWrapper>
                        <ListTitle>예약 관리</ListTitle>
                    </TitleWrapper>
                    <DivWrap>
                        <StyledForm onSubmit={onSubmit}>
                            <FilterAndActionWrap>
                                <LeftBox>
                                    <label htmlFor="statusFilter" style={{ marginLeft: "1rem", marginRight: "0.5rem" }}>
                                        상태 필터:
                                    </label>
                                    <SelectBox
                                        id="statusFilter"
                                        value={selectedStatus}
                                        onChange={onStatusChange}
                                    >
                                        <option value="all">전체</option>
                                        <option value="SCHEDULED">예약확정</option>
                                        <option value="WAITING_BANK_TRANSFER">무통장 입금대기</option>
                                        <option value="COMPLETED">여행완료</option>
                                        <option value="CANCELED">예약취소</option>
                                    </SelectBox>
                                </LeftBox>

                                <RightBox>
                                    <div style={{ textAlign: "right", marginBottom: "10px" }}>
                                        <StyledActionButton type="submit">선택한 예약 취소</StyledActionButton>
                                    </div>
                                </RightBox>
                            </FilterAndActionWrap>
                            <StyledTable >
                                <thead>
                                <tr>
                                    <th>선택</th>
                                    <th>주문일시</th>
                                    <th>고객명</th>
                                    <th>상품명</th>
                                    <th>기본 수량</th>
                                    <th>아동 수량</th>
                                    <th>상품 실행일</th>
                                    <th>총결제금액</th>
                                    <th>예약상태</th>
                                </tr>
                                </thead>
                                <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" style={{textAlign: "center"}}>로딩 중...</td>
                                    </tr>
                                ) : isEmpty ? (
                                    <tr>
                                        <td colSpan="6" style={{textAlign: "center"}}>예약이 없습니다.</td>
                                    </tr>
                                ) : (
                                    reservations && reservations.map(res => (
                                        <tr key={res.orderCode}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedOrders?.includes(res.orderCode)}
                                                    onChange={() => {console.log("체크 이벤트 발생:", res.orderCode);
                                                        onCheck(res.orderCode)}}
                                                />
                                            </td>
                                            <td>{res.orderDate?.slice(0, 16).replace("T", " ")}</td>
                                            <td>{res.memberName}</td>
                                            <td>{res.productTitle}</td>
                                            <td>{res.adultCount}</td>
                                            <td>{res.childCount ?? "-"}</td>
                                            <td>{res.reservationDate}</td>
                                            <td>{res.totalPrice?.toLocaleString()}원</td>
                                            <td>
                                                <StyledStatusBadge status={res.orderStatus}>
                                                    {statusLabel[res.orderStatus] || res.orderStatus}
                                                </StyledStatusBadge>
                                            </td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </StyledTable>
                        </StyledForm>
                        {!loading && reservations && reservations.length > 0 && (
                            <>
                                <div style={{marginTop: "1rem"}}>
                                    페이지: {currentPage} / {totalPages}
                                </div>
                                <DivPage>{number}</DivPage>
                            </>
                        )}
                    </DivWrap>
                </StyleContentWrap>
            </StyleBookingBlock>
                </main>
            </div>
        </>)
}
export default AdminBookingCom;