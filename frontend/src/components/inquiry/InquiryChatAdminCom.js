import { containerStyle, mainStyle, sidebarStyle } from "../../style/member/AdminMyPageStyle";
import { tableHeaderStyle, tableRowStyle, tableCellStyle } from "../../style/inquiry/StyleInquiryChatAdmin";
import AdminSideBarPage from "../../pages/common/AdminSideBarPage";
import { useNavigate } from "react-router-dom"; // React Router의 useNavigate 훅 임포트

function InquiryChatAdminCom({ chatList, onStatusChange, onSortChange, currentStatus, currentSort, error, loading }) {
    const navigate = useNavigate(); // navigate 함수 사용

    const handleRowClick = (inquiryChatId) => {
        navigate(`/admin/inquiryChat/${inquiryChatId}`);
        console.log("해당 문의글의 id : ", inquiryChatId)
    };

    return (
        <div style={containerStyle}>
            {/* 사이드바 */}
            <aside style={sidebarStyle}>
                <AdminSideBarPage />
            </aside>
            <main style={mainStyle}>
                <h2>관리자 채팅 전체 목록 조회</h2>

                {/* 필터링 및 정렬 컨트롤 */}
                <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="statusFilter" style={{ marginRight: "10px" }}>상태:</label>
                    <select id="statusFilter" value={currentStatus} onChange={onStatusChange}>
                        <option value="">모든 상태</option>
                        <option value="WAITING">대기 중</option>
                        <option value="ACTIVE">활성</option>
                        <option value="CLOSED">종료됨</option>
                    </select>

                    <label htmlFor="sortOrder" style={{ marginLeft: "20px", marginRight: "10px" }}>정렬:</label>
                    <select id="sortOrder" value={currentSort} onChange={onSortChange}>
                        <option value="desc">최근 생성순</option>
                        <option value="asc">오래된 순</option>
                    </select>
                </div>

                {/* 오류 메시지 표시 */}
                {error && <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>}

                {/* 로딩 메시지 표시 */}
                {loading ? (
                    <div>로딩 중...</div>
                ) : (
                    /* 채팅방 목록 테이블 */
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={tableHeaderStyle}>채팅방 ID</th>
                                <th style={tableHeaderStyle}>회원 ID</th>
                                <th style={tableHeaderStyle}>상태</th>
                                <th style={tableHeaderStyle}>시작일</th>
                                <th style={tableHeaderStyle}>종료일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chatList.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>채팅방이 존재하지 않습니다.</td>
                                </tr>
                            ) : (
                                chatList.map(chat => (
                                    <tr
                                        key={chat.inquiryChatId}
                                        style={{ ...tableRowStyle, cursor: "pointer" }} // 커서를 포인터로 변경
                                        onClick={() => handleRowClick(chat.inquiryChatId)} // 클릭 시 이벤트 핸들러 호출
                                    >
                                        <td style={tableCellStyle}>{chat.inquiryChatId}</td>
                                        <td style={tableCellStyle}>{chat.memberId}</td>
                                        <td style={tableCellStyle}>{chat.inquiryChatStatus}</td>
                                        <td style={tableCellStyle}>{new Date(chat.inquiryChatStartDate).toLocaleString()}</td>
                                        <td style={tableCellStyle}>{chat.inquiryChatEndDate ? new Date(chat.inquiryChatEndDate).toLocaleString() : "미종료"}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </main>
        </div>
    );
}

export default InquiryChatAdminCom;