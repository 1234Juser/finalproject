import styled from "styled-components";

// 컬러 팔레트: EventListStyle과 동일하게 복사
const Palette = {
    mainGradient: "linear-gradient(95deg, #36abc9 0%, #198dbb 100%)",
    blue: "#198dbb",
    blueLight: "#36abc9",
    borderGray: "#e4e9f1",
    shadow: "0 2px 18px 0 rgba(30,70,160,0.09)",
    cardShadow: "0 4px 16px 0 rgba(30,70,160,0.13)",
    bg: "#f4f8fd",
    text: "#273a69",
    subText: "#6a87a9",
    white: "#fff"
};

export const EventDetailWrapper = styled.div`
    max-width: 700px;
    margin: 54px auto 44px auto;
    padding: 48px 38px 40px 38px;
    background: ${Palette.white};
    border-radius: 26px;
    box-shadow: ${Palette.shadow};
    border: 1.5px solid ${Palette.borderGray};
    position: relative;
    animation: fade-in 0.8s;
    @media (max-width: 900px) { padding: 30px 2vw 24px 2vw; }
`;

export const BackButton = styled.button`
    display: inline-block;
    background: none;
    border: none;
    color: ${Palette.blue};
    font-weight: 800;
    font-size: 17px;
    cursor: pointer;
    margin-bottom: 18px;
    transition: color .21s;
    letter-spacing: -0.02em;
    &:hover { color: #198dbbdd; }
`;

export const DetailTitle = styled.h2`
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 2.1rem;
    font-weight: 800;
    color: ${Palette.text};
    text-shadow: 0 2px 18px #e5ecf8cc;
    letter-spacing: -0.04em;
`;

export const StatusBadge = styled.span`
    display: inline-block;
    font-size: 14.5px;
    font-weight: 700;
    color: ${({type}) =>
    type === "진행중" ? "#fff" :
        type === "예정" ? "#fff" :
            "#b7cad8"
};
    padding: 7px 21px;
    margin-right: 12px;
    margin-top: 2px;
    margin-bottom: 6px;
    border-radius: 30px;
    background: ${({type}) =>
    type === "진행중" ? Palette.mainGradient :
        type === "예정" ? "linear-gradient(90deg,#68d6fc,#36abc9)" :
            "linear-gradient(90deg,#e5edfb,#c2dae7)"};
    box-shadow: 0 2px 8px #b3e7fc55;
`;

export const Period = styled.span`
    color: ${Palette.subText};
    font-size: 1.01rem;
    font-weight: 600;
`;

export const DetailImage = styled.img`
    width: 100%;
    max-height: 350px;
    border-radius: 15px;
    object-fit: cover;
    margin: 30px 0 16px 0;
    box-shadow: 0 5px 26px 0 #62c6ef22;
    background: #cde3f7;
`;

export const DescArea = styled.pre`
    width: 100%;
    margin-top: 20px;
    background: linear-gradient(120deg,#e5f6fd1f 0%, #eef8fb96 100%);
    padding: 26px 24px 28px 24px;
    font-size: 1.09rem;
    font-weight: 460;
    color: #28567e;
    border-radius: 13px;
    line-height: 1.78;
    white-space: pre-line;
    box-shadow: 0 2px 23px 0 #6abceb1b;
`;
