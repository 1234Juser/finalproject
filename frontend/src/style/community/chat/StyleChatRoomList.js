import styled from "styled-components";

export const Container = styled.div`
    max-width: 720px;
    margin: 48px auto;
    padding: 28px 32px;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0 14px 36px rgba(0, 0, 0, 0.15);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const Header = styled.h2`
    font-size: 2.2rem;
    margin-bottom: 32px;
    color: #1e293b;
    text-align: center;
    font-weight: 700;
    letter-spacing: 0.03em;
`;

export const RoomList = styled.ul`
    list-style: none;
    padding: 0;
    margin-bottom: 40px;
`;

export const RoomItem = styled.li`
    background-color: #fafafa;
    padding: 18px 28px;
    margin-bottom: 14px;
    border-radius: 14px;
    border: 1.5px solid #e2e8f0;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.04);

    &:hover {
        background-color: #e0f2fe;
        border-color: #38bdf8;
        box-shadow: 0 12px 24px rgba(56, 189, 248, 0.3);
    }

    > div p,
    > div small {
        margin: 5px 0;
        color: #334155;
        font-size: 0.95rem;
        line-height: 1.35;
    }

    > div strong {
        display: block;
        color: #0f172a;
        font-size: 1.18rem;
        margin-bottom: 8px;
        font-weight: 700;
    }
`;

export const CreateButton = styled.button`
    display: block;
    width: 160px;
    margin: 0 auto;
    padding: 14px 0;
    background: linear-gradient(90deg, #3b82f6, #2563eb);
    color: white;
    font-weight: 700;
    font-size: 1.1rem;
    border: none;
    border-radius: 28px;
    cursor: pointer;
    box-shadow: 0 8px 18px rgba(37, 99, 235, 0.55);
    transition: background 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        background: linear-gradient(90deg, #2563eb, #1d4ed8);
        box-shadow: 0 10px 22px rgba(29, 78, 216, 0.75);
    }
`;

// 모달 배경
export const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(15, 23, 42, 0.45);
    z-index: 1200;
`;

// 모달 본체
export const ModalContent = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 440px;
    padding: 36px 40px;
    background: white;
    border-radius: 24px;
    transform: translate(-50%, -50%);
    z-index: 1201;
    box-shadow: 0 14px 38px rgba(0, 0, 0, 0.24);
`;

export const ModalHeader = styled.h3`
    margin-bottom: 28px;
    color: #1e293b;
    font-weight: 700;
    font-size: 1.7rem;
    text-align: center;
`;

export const Input = styled.input`
    width: 100%;
    padding: 14px 18px;
    font-size: 1.1rem;
    margin-bottom: 30px;
    border: 1.8px solid #cbd5e1;
    border-radius: 14px;
    box-sizing: border-box;
    font-weight: 500;
    color: #1e293b;
    transition: border-color 0.3s ease;

    &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
    }

    &::placeholder {
        color: #94a3b8;
        font-weight: 400;
    }
`;

export const ModalButtons = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 18px;
`;

export const Button = styled.button`
    flex: 1;
    padding: 14px 0;
    font-size: 1.1rem;
    font-weight: 700;
    border-radius: 28px;
    border: none;
    cursor: pointer;
    color: white;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

    &:first-child {
        background-color: #3b82f6;
        box-shadow: 0 8px 18px rgba(59, 130, 246, 0.7);

        &:hover {
            background-color: #2563eb;
            box-shadow: 0 10px 22px rgba(37, 99, 235, 0.8);
        }
    }

    &:last-child {
        background-color: #9ca3af;
        color: #334155;

        &:hover {
            background-color: #6b7280;
            color: white;
        }
    }
`;

export const ErrorMessage = styled.div`
    color: #ef4444;
    font-size: 0.9rem;
    margin-top: -18px;
    margin-bottom: 24px;
    font-weight: 600;
    text-align: center;
`;