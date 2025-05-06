import React, { useState } from "react";
import {
    FaqContainer, FaqHeader, FaqTitle, FaqAddBtn,
    FaqList, FaqItem, QuestionRow, ToggleButton, Answer, Pagination
} from "../../style/faq/FaqListStyle";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// 역할 확인 함수
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

                {/* 숫자 페이지네이션 버튼 추가, EventListStyle과 비슷한 UX */}
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