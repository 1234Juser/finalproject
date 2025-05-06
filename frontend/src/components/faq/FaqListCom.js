import React, { useState } from "react";
import {
    FaqContainer, FaqHeader, FaqTitle, FaqAddBtn,
    FaqList, FaqItem, QuestionRow, ToggleButton, Answer, Pagination
} from "../../style/faq/FaqListStyle";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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
                                <button
                                    style={{
                                        marginLeft: 10,
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