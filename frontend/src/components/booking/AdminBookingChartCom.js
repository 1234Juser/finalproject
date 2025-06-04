import {containerStyle, mainStyle, sidebarStyle} from "../../style/member/MyPageStyle";
import AdminSideBarPage from "../../pages/common/AdminSideBarPage";
import {
    DivWrap, ListTitle,
    StyleBookingBlock, StyleContentWrap, TitleWrapper
} from "../../style/booking/StyleAdminBooking";

function AdminBookingChartCom() {
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
                            <ListTitle>예약 관리</ListTitle>
                        </TitleWrapper>
                        <DivWrap>
                        </DivWrap>
                    </StyleContentWrap>
                </StyleBookingBlock>
            </main>
        </div>
    </>)
}
export default AdminBookingChartCom