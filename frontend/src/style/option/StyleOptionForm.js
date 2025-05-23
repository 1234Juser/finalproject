import styled from "styled-components";

export const FormWrapper = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
`;

export const CalendarWrapper = styled.div`
    margin-bottom: 2rem;
`;

export const OptionsSection = styled.div`
    margin-bottom: 2rem;
`;

export const OptionItem = styled.div`
    margin-bottom: 1.5rem;
    padding: 1rem;
    border-bottom: 1px solid #e0e0e0;
`;

export const OptionTitle = styled.h3`
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

export const OptionDescription = styled.p`
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
`;

export const OptionPrice = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

export const OptionCounter = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const CounterButton = styled.button`
    background-color: #f0f0f0;
    color: #333;
    border: none;
    border-radius: 4px;
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #ddd;
    }
`;

export const CounterValue = styled.span`
    font-size: 1.2rem;
    font-weight: bold;
`;

export const TotalPriceSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

export const TotalLabel = styled.span`
    font-size: 1.5rem;
    font-weight: bold;
`;

export const TotalPrice = styled.span`
    font-size: 1.5rem;
    font-weight: bold;
    color: #3399ff;
`;

export const ReserveButton = styled.button`
    width: 100%;
    padding: 1rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: #fff;
    background-color: #3399ff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #2672c9;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;