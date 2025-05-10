import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    overflow-y: hidden;
    padding: 20px;
`;

const ModalContent = styled.div`
    width: 600px;
    background-color: #ffffff;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    max-height: 80vh;
    position: relative;
    scrollbar-width: thin;
    scrollbar-color: #ddd #f8f9fa;

    /* 스크롤바 스타일 (크롬, 엣지, 사파리) */
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #ddd;
        border-radius: 16px;
    }

    &::-webkit-scrollbar-track {
        background-color: #f8f9fa;
        border-radius: 16px;
    }

    /* 내부 패딩을 추가하여 스크롤바와 컨텐츠가 겹치지 않게 */
    padding-right: 16px;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #aaa;
    transition: color 0.2s;
    align-self: flex-end;
    margin-bottom: 10px;

    &:hover {
        color: #333;
    }
`;

function AllReviewModal({ children, onClose }) {
    // 스크롤 고정 처리
    React.useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                {children}
            </ModalContent>
        </ModalOverlay>
    );
}

export default AllReviewModal;
