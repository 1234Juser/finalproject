import styled from "styled-components";

export const Wrapper = styled.div`
    max-width: 800px;
    margin: 4rem auto;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 16px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.02);
    text-align: center;
    font-family: 'Pretendard', sans-serif;
`;

export const Earth = styled.div`
    font-size: 5rem;
    color: #001F3F;
    margin-bottom: 1.5rem;
`;

export const Title = styled.h2`
    font-size: 1.8rem;
    color: #001F3F;
    margin-bottom: 1.5rem;
`;

export const InfoText = styled.p`
    display: flex;
    justify-content: space-between;
    font-size: 1.6rem;
    color: #333;
    margin: 0.5rem 6rem;
    gap: 0.5rem;

    strong {
        color: #555;
        margin-right: 0.8rem;
    }
`;

export const ProductBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 430px;
    gap: 2rem;
    background-color: white;
    padding: 1rem;
    margin: 2rem 0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

    /* 마스크 적용 */
    -webkit-mask-image: url('/img/stamp-mask.svg');
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-image: url('/img/stamp-mask.svg');
    mask-repeat: no-repeat;
    mask-size: 100% 100%;
`;

export const BoxTitle = styled.h3`
    font-size: 1.2rem;
    font-weight: bold;
    //margin-bottom: 1rem;
    margin-top: 3rem;
    text-align: left;
    align-self: flex-start;
    margin-left: 5rem;
    margin-right: 5rem;
    width: 80%;
    color: #001F3F;
    padding-bottom: 0.8rem;
    border-bottom: 4px solid #003153;
`;

export const OrderInfo = styled.div`
    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    //height: 100%;
    height: auto;
`;

export const ProductInfo = styled.div`
    flex: 1;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
`;

export const ProductTitle = styled.div`
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

export const ProductPrice = styled.div`
    font-size: 0.95rem;
    color: #555;
`;

export const ConfirmButton = styled.button`
    background-color: #6ba4d8;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #3f5974;
    }
`;

export const VbankInfo = styled.div`
    background-color: #e8f0fb;
    padding: 2rem;
    border-radius: 16px;
    width: 90%;
    max-width: 700px;
    margin: 2rem auto;  // 위아래, 양옆
    text-align: left;
    font-size: 1.05rem;
    color: #003153;
    box-shadow: 0 4px 12px rgba(0, 31, 63, 0.08);

    h3 {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 1rem;
        color: #001F3F;
    }

    p {
        margin: 0.3rem 0;
        line-height: 1.6;
        strong {
            font-weight: 600;
            margin-right: 0.5rem;
            color: #001F3F;
        }
    }
`;