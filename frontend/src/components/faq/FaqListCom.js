import React, { useState } from "react";
import {
    FaqContainer, FaqHeader, FaqTitle, FaqAddBtn,
    FaqList, FaqItem, QuestionRow, ToggleButton, Answer, Pagination
} from "../../style/faq/FaqListStyle";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";

function isAdmin() {
    const roles = JSON.parse(localStorage.getItem("roles") || "[]");
    return roles.includes("ROLE_ADMIN");
}

function FaqListCom({ faqs, page, setPage, totalPages }) {
    const [openIndex, setOpenIndex] = useState(null);
    const navigate = useNavigate();

    const handleToggle = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    // FAQ 삭제
    const handleDelete = (faqCode) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            axios.delete(`/faq/${faqCode}`)
                .then(() => {
                    alert("삭제되었습니다.");
                    window.location.reload(); // 새로고침 또는 setPage(page) 호출하여 목록 갱신
                })
                .catch(e => {
                    alert("삭제 실패: " + (e.response?.data?.message || e.message));
                });
        }
    };

    return (
        <FaqContainer>
            <FaqHeader>
                <FaqTitle>FAQ</FaqTitle>
                {isAdmin() && (
                    <FaqAddBtn onClick={() => navigate("/faq/register")}>FAQ 등록</FaqAddBtn>
                )}
            </FaqHeader>
            <FaqList>
                {faqs.map((faq, idx) => (
                    <FaqItem key={faq.faqCode}>
                        <QuestionRow onClick={() => handleToggle(idx)}>
                            <span>{faq.faqTitle}</span>
                            {isAdmin() && (
                                <>
                                <button
                                    style={{
                                        marginLeft: 4,
                                        padding: "2px 8px",
                                        fontSize: 12,
                                        border: "1px solid #398",
                                        borderRadius: 6,
                                        background: "#fff",
                                        color: "#398",
                                        cursor: "pointer"
                                    }}
                                    onClick={e => {
                                        e.stopPropagation();
                                        // 수정페이지로 이동, faqCode를 넘김
                                        navigate(`/faq/edit/${faq.faqCode}`);
                                    }}
                                >
                                    수정
                                </button>
                                <button
                                style={{
                                marginLeft: 2,
                                padding: "2px 8px",
                                fontSize: 12,
                                border: "1px solid #e33",
                                borderRadius: 6,
                                background: "#fff",
                                color: "#e33",
                                cursor: "pointer"
                            }}
                            onClick={e => {
                                e.stopPropagation();
                                handleDelete(faq.faqCode);
                            }}
                        >
                            삭제
                        </button>
                    </>
                )}
                            <ToggleButton>
                                {openIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
                            </ToggleButton>
                        </QuestionRow>
                        {openIndex === idx && (
                            <Answer>{faq.faqContent}</Answer>
                        )}
                    </FaqItem>
                ))}
            </FaqList>
            <Pagination>
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 0}
                >이전</button>
                {Array.from({ length: totalPages }, (_, idx) => (
                    <button
                        key={idx}
                        className={page === idx ? "active-page" : ""}
                        onClick={() => setPage(idx)}
                        disabled={page === idx}
                    >
                        {idx + 1}
                    </button>
                ))}
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page + 1 >= totalPages}
                >다음</button>
            </Pagination>
        </FaqContainer>
    );
}

export default FaqListCom;