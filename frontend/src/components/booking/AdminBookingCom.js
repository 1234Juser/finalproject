import styled from "styled-components";

const StyleBookingBlock = styled.div`
    display: flex;
    justify-content: center;
`;
const StyleContentWrap = styled.div`
    width: 70%;
    max-width: 1200px;
`;
const TitleWrapper = styled.div`
    height: 100px;               // 원하는 높이
    display: flex;
    justify-content: center;    // 가로 중앙
    align-items: center;        // 세로 중앙
`;
const ListTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
`;
const StyledForm = styled.form`
    //border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    background-color: #fff;
    transition: transform 0.2s ease-in-out;
`;
const StyledTable = styled.table`
    width: 100%;
    border-radius: 12px;
    border-collapse: collapse;
    border: 1px solid #ddd;
    th, td {
        padding: 8px;
        border: 1px solid #ddd;
        text-align: center;
    }
    thead {
        background-color: #f5f5f5;
    }
`;

function AdminBookingCom({ reservations, loading, currentPage, totalPages, selectedOrders, onCheck, onSubmit }){

    console.log("reservations", reservations);
    const isEmpty = !Array.isArray(reservations) || reservations.length === 0;
        return (
            <>
                <StyleBookingBlock>
                    <StyleContentWrap>
                        <TitleWrapper>
                            <ListTitle>예약 관리</ListTitle>
                        </TitleWrapper>
                        <StyledForm onSubmit={onSubmit}>
                        <div style={{ textAlign: "right", marginBottom: "10px" }}>
                            <button type="submit">선택한 예약 취소</button>
                        </div>
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
                                                checked={Array.isArray(selectedOrders) && selectedOrders.includes(res.orderCode)}
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
                                        <td>{res.orderStatus}</td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </StyledTable>
                        </StyledForm>
                        {!loading && reservations && reservations.length > 0 && (
                            <div style={{marginTop: "1rem"}}>
                                페이지: {currentPage} / {totalPages}
                            </div>
                        )}
                    </StyleContentWrap>
                </StyleBookingBlock>
            </>)
}
export default AdminBookingCom;