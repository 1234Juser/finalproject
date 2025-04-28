import React, { useState } from "react";
import MyPageSideBarPage from "../../pages/common/MyPageSideBarPage";
import {
    containerStyle,
    sidebarStyle,
    contentStyle,
    withdrawCardStyle,
    titleStyle,
    warningBoxStyle,
    emotionStyle,
    inputStyle,
    withdrawButtonStyle,
    withdrawFormStyle,
    formRowStyle,
    formLabelStyle,

} from "../../style/member/WithdrawlStyle";

function WithdrawlCom({ onWithdraw, loading }) {
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!password) {
            alert("비밀번호를 입력하세요.");
            return;
        }
        onWithdraw(password);
    };

    return (
        <div style={containerStyle}>
            <aside style={sidebarStyle}>
                <MyPageSideBarPage />
            </aside>
            <div style={contentStyle}>
                <div style={withdrawCardStyle}>
                    <h2 style={titleStyle}>회원 탈퇴</h2>
                    <div style={warningBoxStyle}>
                        <strong>⚠️ 주의: 탈퇴 시 복구할 수 없습니다!</strong><br />
                    </div>
                    <div style={emotionStyle}>
                        이용해주셔서 감사했습니다.<br />
                        언젠가 다시 만날 그 날까지, 건강하세요!
                    </div>
                    <form onSubmit={handleSubmit} style={withdrawFormStyle}>
                        <div style={formRowStyle}>
                            <label htmlFor="withdrawPwd" style={formLabelStyle}>
                                비밀번호 확인
                            </label>
                            <input
                                id="withdrawPwd"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                autoFocus
                                placeholder="비밀번호를 입력하세요"
                                style={inputStyle}
                            />
                        </div>
                        <div style={formRowStyle}>
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    ...withdrawButtonStyle,
                                    ...(loading && { opacity: 0.65, cursor: "not-allowed" })
                                }}
                            >
                                {loading ? "처리 중..." : "정말 탈퇴할래요"}
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    );
}

export default WithdrawlCom;
