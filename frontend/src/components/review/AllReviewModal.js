import React from "react";
import {CloseButton, ModalContent,
    ModalOverlay, ScrollWrapper
} from "../../style/review/StyleProductReview";

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
                <ScrollWrapper>
                    {children}
                </ScrollWrapper>
            </ModalContent>
        </ModalOverlay>
    );
}

export default AllReviewModal;
