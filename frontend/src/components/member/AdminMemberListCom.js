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

function AdminMemberListCom({ memberList, onToggleStatus }) {
    const [hoverIdx, setHoverIdx] = useState(null);

    return (
        <div style={containerStyle}>
            <aside style={sidebarStyle}>
                <AdminSideBarCon />
            </aside>
            <div style={contentStyle}>
                <div style={tableWrapperStyle}>
                    <h2 style={{ margin: "0 0 20px 0", fontWeight: 800, letterSpacing: "0.03em" }}>회원 정보 목록</h2>
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
                        {memberList.map((m, idx) => (
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
                                <td style={tdStyle}>{m.memberRegisterdate}</td>
                                <td style={tdStyle}>{m.socialType}</td>
                                <td style={tdStyle}>{m.socialAccountId}</td>
                                <td style={tdStyle}>{m.memberEnddate}</td>
                                <td style={tdStyle}>{m.memberEndstatus === "Y" ? "탈퇴상태" : "활성상태"}</td>
                                <td style={tdStyle}>
                                    {m.roles?.includes("ROLE_USER") &&!m.roles?.includes("ROLE_ADMIN") && (
                                        <button
                                            onClick={() => onToggleStatus(m.memberId, m.memberEndstatus)}
                                            style={buttonStyle}
                                        >
                                            {m.memberEndstatus === "Y" ? "활성화" : "비활성화"}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminMemberListCom;
