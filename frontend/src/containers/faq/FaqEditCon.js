import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import FaqRegisterCom from "../../components/faq/FaqRegisterCom";

function FaqEditCon() {
    const { faqCode } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://api.hellotravelogic.link/faq/${faqCode}`)
            .then(res => {
                setTitle(res.data.faqTitle);
                setContent(res.data.faqContent);
            })
            .catch(() => {
                alert("FAQ 정보를 불러오는 데 실패했습니다.");
                navigate("/faq");
            });
    }, [faqCode, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://api.hellotravelogic.link/faq/${faqCode}`, {
                faqTitle: title,
                faqContent: content,
            });
            navigate("/faq");
        } catch (err) {
            alert("FAQ 수정에 실패했습니다.");
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

export default FaqEditCon;