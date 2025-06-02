import React, { useState } from "react";
import {
    FaqContainer, FaqHeader, FaqTitle, FaqAddBtn,
    FaqList, FaqItem, QuestionRow, ToggleButton, Answer, Pagination,
    FaqEditButton, FaqDeleteButton
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
            axios.delete(`https://api.hellotravelogic.link/faq/${faqCode}`)
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
                        <QuestionRow>
                            {/* 질문 텍스트는 왼쪽, 토글+관리 버튼 묶음은 오른쪽에*/}
                            <span
                                style={{ flex: 1, minWidth: 0, cursor: "pointer" }}
                                onClick={() => handleToggle(idx)}
                            >
                                {faq.faqTitle}
                            </span>
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <ToggleButton
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleToggle(idx)}
                                >
                                    {openIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
                                </ToggleButton>
                                {isAdmin() && (
                                    <>
                                        <FaqEditButton
                                            onClick={e => {
                                                e.stopPropagation();
                                                navigate(`/faq/edit/${faq.faqCode}`);
                                            }}
                                        >
                                            수정
                                        </FaqEditButton>
                                        <FaqDeleteButton
                                            onClick={e => {
                                                e.stopPropagation();
                                                handleDelete(faq.faqCode);
                                            }}
                                        >
                                            삭제
                                        </FaqDeleteButton>
                                    </>
                                )}
                            </div>
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