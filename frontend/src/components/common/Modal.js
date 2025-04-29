import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(30, 41, 85, 0.20);  /* 살짝 어두운 오버레이 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

const ModalContainer = styled.div`
    /* 모달 내용이 너무 커지면 전체화면을 침범하지 않도록 max-width/height */
    max-width: 95vw;
    max-height: 95vh;
    overflow-y: auto; /* 내용이 넘치면 스크롤 */
    box-shadow: 0 4px 24px rgba(0,0,0,0.12);
`;


function Modal({ children, onClose }) {
    return (
        <Overlay onClick={onClose}>
            <ModalContainer onClick={e => e.stopPropagation()}>
                {children}
            </ModalContainer>
        </Overlay>
    );
}
export default Modal;
