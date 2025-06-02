import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FaqRegisterCom from "../../components/faq/FaqRegisterCom";

function FaqRegisterCon() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://api.hellotravelogic.link/faq", {
                faqTitle: title,
                faqContent: content,
            });
            navigate("/faq");
        } catch (err) {
            alert("등록에 실패했습니다.");
        }
    };

    const handleCancel = () => {
        navigate("/faq");
    };

    return (
        <FaqRegisterCom
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        />
    );
}

export default FaqRegisterCon;