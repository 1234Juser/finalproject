import React from "react";

function LoginCom({   memberId,
                      memberPassword,
                      onChangeId,
                      onChangePassword,
                      onSubmit,
                      errorMsg
                  }) {
    return (
        <div className="login-form-container" style={{ maxWidth: 340, margin: "48px auto", padding: 20, border: "1px solid #eee", borderRadius: 10 }}>
            <h2 style={{ textAlign: "center" }}>로그인</h2>
            <form onSubmit={onSubmit}>
                <div style={{ margin: "16px 0" }}>
                    <label>아이디</label>
                    <input type="text" value={memberId} onChange={onChangeId} required style={{ width: "100%", padding: "8px" }}
                        autoComplete="username"
                    />
                </div>
                <div style={{ margin: "16px 0" }}>
                    <label>비밀번호</label>
                    <input type="password" value={memberPassword} onChange={onChangePassword} required style={{ width: "100%", padding: "8px" }}
                        autoComplete="current-password"
                    />
                </div>
                {errorMsg && <div style={{ color: "red", marginBottom: 12 }}>{errorMsg}</div>}
                <button type="submit" style={{ width: "100%", padding: "10px", background: "#1976d2", color: "#fff", border: "none", borderRadius: 6 }}>로그인</button>
            </form>
        </div>
    );
}

export default LoginCom;
