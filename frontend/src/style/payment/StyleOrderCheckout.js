import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 2rem;
    background-color: #f9f9f9;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    border-radius: 12px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
`;

export const Section = styled.div`
    flex: 2;
    margin-right: 2rem;
`;

export const Sidebar = styled.div`
    flex: 1;
    min-width: 300px;
    max-width: 250px;
    flex-shrink: 0;
    align-self: flex-start;
    height: auto;
    vertical-align: top;
    overflow-y: visible;
    background-color: #fff;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
    font-size: 1.8rem;
    margin-bottom: 1rem;
`;

export const ProductInfo = styled.div`
    display: flex;
    margin-bottom: 2rem;
`;

export const ProductImage = styled.img`
    width: 100%;
    max-width: 400px;
    max-height: 400px;
    aspect-ratio: auto;
    object-fit: contain;
    border-radius: 8px;
    margin-right: 1rem;
    align-self: flex-start;
`;

export const ProductDetails = styled.div`
    flex: 1;
`;

export const ProductTitleText = styled.h3`
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
`;

export const ReservationDate = styled.div`
    color: #666;
    margin-bottom: 0.5rem;
`;

export const TotalPrice = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
`;

export const BuyerInfoContainer = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
`;

export const BuyerInfoTitle = styled.h3`
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: #333;
    border-bottom: 2px solid #007bff;
    padding-bottom: 5px;
`;

export const BuyerInfoList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    font-size: 1rem;
    color: #555;
`;

export const BuyerInfoItem = styled.li`
    margin-bottom: 10px;
`;

export const PaymentContainer = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const PaymentTitle = styled.h3`
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: #333;
    border-bottom: 2px solid #007bff;
    padding-bottom: 5px;
`;

export const PaymentSelect = styled.select`
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
    background-color: #ffffff;
    transition: border-color 0.3s;

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

export const PaymentOption = styled.option`
    font-size: 1rem;
    color: #333;
`;

export const PaymentInfo = styled.div`
    margin-bottom: 1.5rem;
`;

export const PriceTitle = styled.h3`
    font-size: 1.4rem;
    margin-bottom: 1rem;
`;

export const PriceRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
`;

export const TotalAmount = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    font-size: 1.6rem;
    font-weight: bold;
    color: #3399ff;
`;

export const Amount = styled.span`
    color: #3399ff;
`;

export const Terms = styled.div`
    margin-bottom: 1.5rem;
`;

export const TermTitle = styled.h4`
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
`;

export const TermItem = styled.div`
    margin-bottom: 0.3rem;
    color: #666;
`;

export const CancelPolicy = styled.div`
    margin-bottom: 1.5rem;
    ul {
        padding-left: 0;
        margin-left: 0;
        list-style-position: inside;
    }

    li {
        margin-bottom: 0.2rem;
        font-size: 0.9rem;
    }
`;

export const CancelTitle = styled.h4`
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
`;

export const EditButton = styled.button`
    width: 100%;
    padding: 1rem;
    background-color: #ff7875;
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        background-color: #ff4d4f;
    }
`;

export const PaymentButton = styled.button`
    width: 100%;
    padding: 1rem;
    background-color: #3399ff;
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        background-color: #287ac6;
    }
`;