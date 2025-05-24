import React, {useState} from "react";
import AdminSideBarCon from "../../containers/common/AdminSideBarCon";
import {containerStyle,
    sidebarStyle,
    contentStyle,
    tableWrapperStyle,
    tableStyle,
    thStyle,
    tdStyle,
    trHoverStyle,
    buttonStyle,
    activeRowStyle
} from "../../style/member/AdminMemberListStyle";

function AdminMemberListCom({ memberList, onToggleStatus, currentPage, totalPages, totalElements, onPageChange }) {
    const [hoverIdx, setHoverIdx] = useState(null);

    // 페이지 번호 배열 생성
    const pageNumbers = [];
    for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
    }


    return (
        <div style={containerStyle}>
            <aside style={sidebarStyle}>
                <AdminSideBarCon />
            </aside>
            <div style={contentStyle}>
                <div style={tableWrapperStyle}>
                    <h2 style={{ margin: "0 0 20px 0", fontWeight: 800, letterSpacing: "0.03em" }}>회원 정보 목록 ({totalElements}명)</h2>
                    <table style={tableStyle}>
                        <thead>
                        <tr>
                            <th style={thStyle}>멤버코드</th>
                            <th style={thStyle}>이름</th>
                            <th style={thStyle}>아이디</th>
                            <th style={thStyle}>이메일</th>
                            <th style={thStyle}>전화번호</th>
                            <th style={thStyle}>가입날짜</th>
                            <th style={thStyle}>소셜타입</th>
                            <th style={thStyle}>소셜계정ID</th>
                            <th style={thStyle}>탈퇴날짜</th>
                            <th style={thStyle}>회원상태</th>
                            <th style={thStyle}>관리</th>
                        </tr>
                        </thead>
                        <tbody>
                        {memberList.length > 0 ? (
                            memberList.map((m, idx) => (
                                <tr
                                    key={m.memberId}
                                    style={{
                                        ...trHoverStyle,
                                        ...(hoverIdx === idx ? activeRowStyle : {})
                                    }}
                                    onMouseEnter={() => setHoverIdx(idx)}
                                    onMouseLeave={() => setHoverIdx(null)}
                                >
                                    <td style={tdStyle}>{m.memberCode}</td>
                                    <td style={tdStyle}>{m.memberName}</td>
                                    <td style={tdStyle}>{m.memberId}</td>
                                    <td style={tdStyle}>{m.memberEmail}</td>
                                    <td style={tdStyle}>{m.memberPhone}</td>
                                    <td style={tdStyle}>{new Date(m.memberRegisterdate).toLocaleDateString()}</td>
                                    <td style={tdStyle}>{m.socialType}</td>
                                    <td style={tdStyle}>{m.socialAccountId}</td>
                                    <td style={tdStyle}>{m.memberEnddate ? new Date(m.memberEnddate).toLocaleDateString() : '-'}</td>
                                    <td style={tdStyle}>{m.memberEndstatus === "Y" ? "탈퇴상태" : "활성상태"}</td>
                                    <td style={tdStyle}>
                                        {m.roles?.includes("ROLE_USER") && !m.roles?.includes("ROLE_ADMIN") && (
                                            <button
                                                onClick={() => onToggleStatus(m.memberId, m.memberEndstatus)}
                                                style={buttonStyle}
                                            >
                                                {m.memberEndstatus === "Y" ? "활성화" : "비활성화"}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" style={{ textAlign: "center", padding: "20px" }}>
                                    회원 정보가 없습니다.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 0}
                            style={{ margin: '0 5px', padding: '8px 16px', cursor: 'pointer' }}
                        >
                            이전
                        </button>
                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => onPageChange(number)}
                                style={{
                                    margin: '0 5px',
                                    padding: '8px 16px',
                                    cursor: 'pointer',
                                    backgroundColor: currentPage === number ? '#007bff' : '#f8f9fa',
                                    color: currentPage === number ? 'white' : 'black',
                                    border: '1px solid #ddd'
                                }}
                            >
                                {number + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages - 1}
                            style={{ margin: '0 5px', padding: '8px 16px', cursor: 'pointer' }}
                        >
                            다음
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminMemberListCom;