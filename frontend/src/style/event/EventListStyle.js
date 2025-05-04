import styled from "styled-components";

// 컬러 팔레트
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
    white: "#fff",
    tabShadow: "0 2px 8px #92c7eb55"
};

// 래퍼
export const EventListWrapper = styled.div`
    max-width: 1000px;
    min-height: 540px;
    margin: 55px auto 0 auto;
    padding: 32px 28px 38px 28px;
    background: ${Palette.white};
    border-radius: 26px;
    box-shadow: ${Palette.shadow};
    border: 1.5px solid ${Palette.borderGray};
    position: relative;
    @media (max-width: 1080px) { padding: 24px 7vw; }
    @media (max-width: 650px) { padding: 18px 2vw; }
`;

// 헤더영역
export const HeaderArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 34px;
    padding-bottom: 18px;
    border-bottom: 2.5px solid #eef4fb;
    box-shadow: 0px 6px 32px -16px #bdddfa11;
    background: transparent;
`;


// 카드 목록
export const ListGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 34px;
    justify-items: center;
    justify-content: center;
    @media (max-width: 900px) { gap: 24px; }
`;

export const EventCard = styled.div`
    background: ${Palette.bg};
    border-radius: 20px;
    box-shadow: ${Palette.cardShadow};
    overflow: hidden;
    transition: transform 0.21s, box-shadow 0.21s;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 19px;
    min-width: 258px;
    max-width: 360px;
    width: 100%;
    border: 1px solid #e2effb;
    position: relative;

    &:hover {
        transform: translateY(-7px) scale(1.028);
        box-shadow: 0 8px 28px -8px #36abc970;
        border-color: #b2e3fa;
    }
`;

export const EventImg = styled.img`
    width: 100%;
    height: 180px;
    object-fit: cover;
    background: #cde3f7;
    border-bottom: 1px solid #e5edfb;
    @media (max-width: 460px) { height: 130px; }
`;

export const Title = styled.h3`
    margin: 21px 0 8px 0;
    font-size: 1.15rem;
    color: ${Palette.text};
    font-weight: 700;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 240px;
`;

export const Period = styled.div`
    font-size: 1.01rem;
    color: ${Palette.subText};
    margin-bottom: 7px;
    letter-spacing: -0.5px;
`;

export const RegisterButton = styled.button`
    background: ${Palette.mainGradient};
    color: #fff;
    padding: 10px 28px;
    border: none;
    border-radius: 18px;
    font-weight: 700;
    font-size: 1.08rem;
    cursor: pointer;
    margin-bottom: 24px;
    margin-left: 9px;
    box-shadow: 0 2px 14px 0 #36abc940;
    transition: background 0.3s, box-shadow 0.12s;
    &:hover { background: linear-gradient(90deg, #198dbb, #36abc9); }
`;

// 페이징
export const PagingWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 38px;
    gap: 10px;
`;

export const PagingButton = styled.button`
  background: ${({active}) => (active ? Palette.mainGradient : "#f2f6f9")};
  color: ${({active}) => (active ? "#fff" : Palette.blue)};
  font-weight: ${({active}) => (active ? 600 : 500)};
  font-size: 1.01rem;
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  box-shadow: ${({active}) => (active ? Palette.tabShadow : "none")};
  letter-spacing: -0.5px;
  &:hover {
    background: ${Palette.mainGradient};
    color: #fff;
  }
  &:disabled {
    opacity: .5;
    cursor: not-allowed;
  }
`;

// 탭 영역
export const Tabs = styled.div`
    display: flex;
    gap: 15px;
    margin-left: 24px;
`;

export const TabButton = styled.button`
    font-size: 1.12rem;
    padding: 10px 30px;
    border: none;
    border-radius: 18px;
    background: ${({active}) => active ? "linear-gradient(95deg,#0268aff9 0%,#45d5e9e9 100%)" : "#f1f6fb"};
    color: ${({active}) => active ? "#fff" : Palette.blue};
    cursor: pointer;
    font-weight: ${({active}) => active ? 800 : 500};
    box-shadow: ${({active}) => active ? "0 2.5px 8px #53bbef77" : "none"};
    letter-spacing: -0.6px;
    border: 1.5px solid ${({active}) => active ? "#198dbb33" : "#e4e9f1"};
    transition: background 0.17s, color 0.17s, box-shadow 0.15s, border 0.22s;
    &:hover {
        background: ${Palette.mainGradient};
        color: #fff;
        box-shadow: 0 3px 15px -7px #53bbef92;
        border: 1.5px solid #198dbb55;
    }
`;

