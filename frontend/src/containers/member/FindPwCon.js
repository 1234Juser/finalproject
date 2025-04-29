import React, { useState } from "react";
import axios from "axios";
import FindPwCom from "../../components/member/FindPwCom";

function FindPwCon({ onClose }) {
    const [form, setForm] = useState({ name: "", id: "", email: "" });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [error, setError] = useState("");

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResult(""); setError("");
        if (!form.name || !form.email || !form.id) {
            setError("모든 항목을 입력하세요.");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post("/member/find-password", {
                memberName: form.name,
                memberId: form.id,
                memberEmail: form.email,
            });
            if (res.data?.tempPassword) {
                setResult(`임시 비밀번호: ${res.data.tempPassword}`);
            } else {
                setError("일치하는 회원이 없습니다.");
            }
        } catch (err) {
            setError("오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <FindPwCom
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            result={result}
            error={error}
            onClose={onClose}
        />
    );
}

export default FindPwCon;