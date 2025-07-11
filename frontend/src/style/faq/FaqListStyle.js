import styled from "styled-components";

// EventListStyle.js의 팔레트 참고 및 동일 느낌
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

export const FaqContainer = styled.div`
    max-width: 620px;
    margin: 40px auto;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 20px rgba(0,0,0,0.06);
    padding: 36px 28px;
`;

export const FaqHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
`;

export const FaqTitle = styled.h2`
    font-weight: 700;
    font-size: 2rem;
    color: #263765;
    margin: 0;
`;

export const FaqAddBtn = styled.button`
    /* Event 등록 버튼 색 적용 */
    background: ${Palette.mainGradient};
    color: #fff;
    border: none;
    border-radius: 18px;
    padding: 10px 28px;
    font-size: 1.08rem;
    font-weight: 700;
    cursor: pointer;
    margin-left: 9px;
    box-shadow: 0 2px 14px 0 #36abc940;
    transition: background 0.3s, box-shadow 0.12s;
    &:hover { background: linear-gradient(90deg, #198dbb, #36abc9); }
`;

export const FaqList = styled.ul`
    list-style: none;
    padding: 0;
`;

export const FaqItem = styled.li`
    border-bottom: 1px solid #e3e8ee;
    padding: 0.6rem 0;
`;

export const QuestionRow = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    font-weight: 600;
    color: #192029;
    font-size: 1.1rem;
    justify-content: space-between;
    transition: color 0.15s;
    &:hover {
        color: #324eea;
    }
`;

export const ToggleButton = styled.span`
    font-size: 1.3rem;
    margin-left: 8px;
    user-select: none;
`;

export const Answer = styled.div`
    padding-left: 10px;
    margin-top: 10px;
    color: #425167;
    font-size: 1rem;
    line-height: 1.6;
    animation: fadeDown 0.25s;

    /* 자동 줄바꿈 */
    word-break: break-word;
    white-space: pre-line;

    /* 너무 길 때 세로 스크롤 */
    max-height: 320px; /* 원하는 높이로 조절 */
    overflow-y: auto;

    @keyframes fadeDown {
        from { opacity: 0; transform: translateY(-12px);}
        to { opacity: 1; transform: translateY(0);}
    }
`;

// 추가: FAQ 수정/삭제 버튼 - EventDetail 버튼 스타일 맞춤
export const FaqEditButton = styled.button`
    background: linear-gradient(90deg, #36abc9, #198dbb);
    color: #fff;
    border: none;
    padding: 6px 18px;
    border-radius: 16px;
    font-weight: 700;
    font-size: 0.97rem;
    box-shadow: 0 2px 8px #44c0ee26;
    letter-spacing: -0.01em;
    cursor: pointer;
    transition: background .16s, box-shadow .16s, transform .13s;
    margin-left: 8px;
    &:hover {
        background: linear-gradient(90deg, #198dbb, #36abc9);
        box-shadow: 0 4px 14px #44c0ee36;
        transform: translateY(-1px) scale(1.03);
    }
`;

export const FaqDeleteButton = styled.button`
    background: linear-gradient(90deg, #e35d83, #ef717a);
    color: #fff;
    border: none;
    padding: 6px 18px;
    border-radius: 16px;
    font-weight: 700;
    font-size: 0.97rem;
    box-shadow: 0 2px 8px #e47a9226;
    letter-spacing: -0.01em;
    cursor: pointer;
    transition: background .16s, box-shadow .16s, transform .13s;
    margin-left: 6px;
    &:hover {
        background: linear-gradient(90deg, #ef717a, #e35d83);
        box-shadow: 0 4px 14px #e47a9236;
        transform: translateY(-1px) scale(1.03);
    }
`;

export const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 38px;
    margin-bottom: 40px;
    gap: 10px;

    button {
        background: ${({ active }) => (active ? Palette.mainGradient : "#f2f6f9")};
        color: ${({ active }) => (active ? "#fff" : Palette.blue)};
        font-weight: ${({ active }) => (active ? 600 : 500)};
        font-size: 1.01rem;
        border: none;
        border-radius: 8px;
        padding: 8px 20px;
        cursor: pointer;
        transition: background 0.18s, color 0.18s;
        box-shadow: ${({ active }) => (active ? Palette.tabShadow : "none")};
        letter-spacing: -0.5px;

        &:hover {
            background: ${Palette.mainGradient};
            color: #fff;
        }
        &:disabled {
            opacity: .5;
            cursor: not-allowed;
            /* FaqListStyle.js에만 있던 disabled 배경/글자색 제거 */
        }
    }

    .active-page {
        background: ${Palette.mainGradient};
        color: #fff;
        font-weight: 600;
        box-shadow: ${({ active }) => (active ? Palette.tabShadow : "none")};
    }

    span {
        font-size: 1rem;
        margin: 0 5px;
        color: #263765;
    }
`;