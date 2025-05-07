import styled from "styled-components";
import AdminBookingCom from "./AdminBookingCom";

const FilterWrap = styled.div`
  text-align: right;
  margin-bottom: 1rem;
`;

const SelectBox = styled.select`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const FilterAndActionWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
`;

const RightBox = styled.div`
  text-align: right;
`;

const StyleBookingBlock = styled.div`
    display: flex;
    justify-content: center;
`;
const StyleContentWrap = styled.div`
    width: 90%;
    max-width: 1400px;
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
    //box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    background-color: #fff;
    transition: transform 0.2s ease-in-out;
`;
const StyledTable = styled.table`
    width: 100%;font-size: 0.95rem;
    border-radius: 12px;
    border-collapse: collapse;
    border: 1px solid #e0e0e0;
    overflow: hidden;
    th, td {
        padding: 14px 16px;
        border: none;
        text-align: center;
    }
    thead {
        background-color: #f5f5f5;
        color: #333;
        font-weight: bold;
    }
    tbody tr {
        border-bottom: 1px solid #eee; // 행 간 경계만
    }

    tbody tr:last-child {
        border-bottom: none;
    }
    tbody tr:hover {
        background-color: #f5faff;
        transition: background-color 0.2s ease-in-out;
    }

    tbody td {
        color: #555;
    }

    td:first-child input[type="checkbox"] {
        transform: scale(1.2);
        cursor: pointer;
    }
`;
const StyledActionButton = styled.button`
  background-color: #fbeff1;
  color: #333;
  padding: 8px 14px;
  border: 1px solid #f8dbe1;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8dbe1;
  }
`;
const StyledStatusBadge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ status }) =>
    status === "SCHEDULED" ? "#00796b" :
        status === "COMPLETED" ? "#2e7d32" :
            status === "CANCELED" ? "#c62828" : "#555"};
  background-color: ${({ status }) =>
    status === "SCHEDULED" ? "#e0f2f1" :
        status === "COMPLETED" ? "#e8f5e9" :
            status === "CANCELED" ? "#ffebee" : "#eee"};
`;
const DivWrap = styled.div`
    margin : auto;
    width : 70%;
`;
// 페이지 버튼들이 모인 구역
const DivPage = styled.div`
    margin-top : 20px;
    text-align : center;
`;
// 페이지 버튼 낱개들
const SpanPage = styled.span`
    width : 30px;
    display : inline-block;
    cursor : pointer;
`;

function AdminBookingByProductCom({
                                      products,
                                      selectedProductCode,
                                      onProductChange,
                                      reservations,
                                      loading,
                                      currentPage,
                                      totalPages,
                                      selectedOrders,
                                      onCheck,
                                      onSubmit,
                                      onClick
                                      // {children} 해도 되긴하지만 그냥
                                  }) {
    const statusLabel = {
        SCHEDULED: "예약확정",
        COMPLETED: "여행완료",
        CANCELED: "예약취소",
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
            <StyleBookingBlock>
                <StyleContentWrap>
                    <TitleWrapper>
                        <ListTitle>상품별 예약 관리</ListTitle>
                    </TitleWrapper>
                    <DivWrap>
                        <StyledForm onSubmit={onSubmit}>
                            <FilterAndActionWrap>
                                <LeftBox>
                                    <label htmlFor="productFilter" style={{ marginRight: "0.5rem" }}>
                                        상품 필터:
                                    </label>
                                    <SelectBox
                                        id="productFilter"
                                        // 선택된 상품코드가 없다면 전체, 그렇지 않다면 선택된 상품코드로
                                        value={selectedProductCode === null ? "all" : selectedProductCode}
                                        onChange={onProductChange}
                                    >
                                        <option value="all">전체</option>
                                        {Array.isArray(products) &&
                                            products.map((p) => (
                                                <option key={p.productCode} value={p.productCode}>
                                                    {p.productTitle}
                                                </option>
                                            ))}
                                    </SelectBox>
                                </LeftBox>

                                <RightBox>
                                    <StyledActionButton type="submit">선택한 예약 취소</StyledActionButton>
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
                                                    // checked={Array.isArray(selectedOrders) && selectedOrders.includes(res.orderCode)}
                                                    // null 방지 버전
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
                                                    {/*{res.orderStatus === "SCHEDULED" && "예약확정"}*/}
                                                    {/*{res.orderStatus === "COMPLETED" && "여행완료"}*/}
                                                    {/*{res.orderStatus === "CANCELED" && "예약취소"}*/}
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
        </>
    );
}

export default AdminBookingByProductCom;
