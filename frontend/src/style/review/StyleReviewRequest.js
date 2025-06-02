import styled from "styled-components";

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
`;

export const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const DoNotShow = styled.p`
    position: absolute;
    top: 0.75rem;
    right: 1rem;
    font-size: 0.8rem;
    color: #999;
    cursor: pointer;
    margin: 0;

    &:hover {
        color: #333;
        text-decoration: underline;
    }
`;

export const ModalBox = styled.div`
    position: relative;
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    width: 90%;
    max-width: 420px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    z-index: 1001;
`;

export const Title = styled.h2`
    margin-top: 0;
    font-size: 1.5rem;
    text-align: center;
`;

export const Content = styled.div`
    margin: 1rem 0;
    text-align: center;
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
`;

export const WriteButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.7rem 1.2rem;
    border-radius: 8px;
    cursor: pointer;
    flex: 1;
`;

export const CancelButton = styled.button`
    background-color: #ccc;
    color: #333;
    border: none;
    padding: 0.7rem 1.2rem;
    border-radius: 8px;
    cursor: pointer;
    flex: 1;
`;