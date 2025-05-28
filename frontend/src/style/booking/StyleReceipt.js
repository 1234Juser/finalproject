import styled from "styled-components";

export const BackButton = styled.button`
    background: none;
    border: none;
    color: #333;
    font-size: 18px;
    cursor: pointer;
    margin-right: 5px;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease-in-out;
`;

export const Wrapper = styled.div`
    width: 100%;
    max-width: 800px;
    padding: 2rem;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    flex-direction: column;
    //align-items: center;
    box-sizing: border-box;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`;

export const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 12px; // 버튼과 예약번호 사이 간격
`;

export const BookingNumber = styled.div`
    font-size: 0.95rem;
    font-weight: bold;
`;

export const CopyButton = styled.button`
    margin-left: 10px;
    background: none;
    border: none;
    cursor: pointer;
    color: #888;
`;

export const CreatedDate = styled.div`
    text-align: right;
    div:first-child {
        font-size: 0.85rem;
        color: #666;
        font-weight: 500;
    }

    div:last-child {
        font-size: 0.9rem;
        font-weight: bold;
        color: #333;
    }
`;

export const ContentCard = styled.div`
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 1.5rem 1.5rem 1.7rem;  // 위, 좌/우, 아래
    background: #fff;
    margin-bottom: 2rem;
`;

export const StatusTag = styled.div`
    display: inline-block;
    padding: 0.2rem 0.5rem;
    border-radius: 8px;
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
    background-color: ${({ status }) => {
    switch (status) {
        case "SCHEDULED":
            return "#d3f5f0"; // 청록
        case "COMPLETED":
            return "#e6f4ff"; // 연파랑
        case "CANCELED":
            return "#ffe6e6"; // 연빨강
        default:
            return "#eee";
    }
}};

    color: ${({ status }) => {
    switch (status) {
        case "SCHEDULED":
            return "#008080";
        case "COMPLETED":
            return "#0072c6";
        case "CANCELED":
            return "#d9534f";
        default:
            return "#555";
    }
}};
`;

export const Title = styled.h2`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
`;

export const ProductSection = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
`;

export const ProductImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 10px;
    object-fit: cover;
`;

export const ProductInfo = styled.div`
    flex-grow: 1;
`;

export const ProductTitle = styled.h3`
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
    white-space: nowrap;    // 줄바꿈 예방. 한줄 표시
    overflow: hidden;       // 박스를 넘치는 텍스트 숨기기
    text-overflow: ellipsis;    // 넘친 텍스트 ...줄임표 사용
`;

export const ProductLocation = styled.p`
    font-size: 0.9rem;
    color: #666;
`;

export const Inquiry = styled.div`
    color: #007aff;
    cursor: pointer;
    font-size: 0.9rem;
`;

export const CancelSection = styled.div`
    padding: 1.5rem;
    background-color: #fafafa;
    border-radius: 12px;
`;

export const CancelTitle = styled.h4`
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

export const CancelPolicy = styled.div`
    font-size: 0.85rem;
    color: #555;
    line-height: 1.5;
    margin-bottom: 1rem;
`;

export const CancelButtonWrapper = styled.div`
    text-align: right;
`;

export const CancelButton = styled.button`
    width: 50%;
    max-width: 400px;
    padding: 10px 16px;
    background: #fbeff1;
    border: 1px solid #fbeff1;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    letter-spacing: 0.04em;
    margin: 0 2px;
    transition: all 0.2s ease;
    box-sizing: border-box;
    text-align: center;

    &:hover {
        background: #f8dbe1;
    }
`;

export const DetailWrapper = styled.div`
    padding: 2rem;
`;

export const Section = styled.div`
    margin-bottom: 1rem;
`;

export const SectionTitle = styled.h3`
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 1rem;
    margin-top: 2rem;
`;

export const Label = styled.div`
    color: #666;
    font-weight: 500;
    margin-bottom: 0.2rem;
`;

export const Value = styled.div`
    font-weight: bold;
    color: ${props => props.blue ? "#007aff" : "#333"};
`;

export const MapWrap = styled.div`
    display: flex;
    gap: 1.5rem;
    width: 100%;
    height: 250px;
    //overflow: hidden;
    border: 1px solid #ffffff;
    padding-bottom: 7rem;

    img {
        width: 240px;
        height: 120px;
        object-fit: cover;
    }
`;

export const Rules = styled.div`
    font-size: 0.9rem;
    color: #444;
    line-height: 1.5;
`;

export const AdSection = styled.div`
    margin-top: 3rem;
`;

export const InfoCard = styled.div`
    //background-color: #f9f9fb;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 0.1rem;
`;

export const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.55rem;
    margin-top: 0.55rem;
`;

export const InfoLabel = styled.div`
    color: #666;
    font-weight: 500;
`;

export const InfoValue = styled.div`
    font-weight: bold;
    color: #333;
`;

export const PaymentCard = styled(InfoCard)`  // 기존 InfoCard 재사용
    background-color: #fffefc;
    border: 1px solid #fae1dd;
`;

export const PaymentHighlight = styled.div`
    font-weight: bold;
    color: #d9534f;
`;