import styled from 'styled-components';
import reviewThanksImage from '../../style/empty/review_thanks.jpeg';

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

const ModalContent = styled.div`
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    min-width: 300px;
`;

const ModalImage = styled.img`
    max-width: 100px;
    height: auto;
    margin-bottom: 1rem;
    border-radius: 8px;
    user-select: none;
    cursor: default;
`;

const ConfirmButton = styled.button`
    margin-top: 1.5rem;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background-color: #3399ff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #267acc;
    }
`;

function SimpleModal({ message, onConfirm }) {
    return (
        <ModalBackground>
            <ModalContent>
                <ModalImage src={reviewThanksImage} alt="느긋캣" />
                <p>{message}</p>
                <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
            </ModalContent>
        </ModalBackground>
    );
}

export default SimpleModal;