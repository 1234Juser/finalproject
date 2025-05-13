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

export const CompanionDetailWrapper = styled.div`
    max-width: 800px; // 여행 게시물은 조금 더 넓게 설정
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
    margin-bottom: 10px; // 제목 아래 여백 줄임
    font-size: 2.3rem; // 제목 크기 키움
    font-weight: 800;
    color: ${Palette.text};
    text-shadow: 0 2px 18px #e5ecf8cc;
    letter-spacing: -0.04em;
    word-break: break-word; // 긴 제목 자동 줄바꿈
`;

export const MetaInfo = styled.div`
    display: flex; // 자식 요소들을 가로로 정렬
    align-items: center; // 자식 요소들을 세로 중앙 정렬
    color: ${Palette.subText};
    font-size: 1rem;
    margin-bottom: 25px; // 메타 정보 아래 여백
    border-bottom: 1px solid ${Palette.borderGray}; // 아래 줄 추가
    padding-bottom: 15px; // 줄과 정보 사이 여백
`;

export const AuthorName = styled.span`
    font-weight: 600;
    margin-right: 15px;
    // display: inline-block; // 필요시 사용 (flex 컨테이너에서는 기본적으로 인라인 블록처럼 동작)
`;


export const CreatedAt = styled.span`
    margin-right: 15px;
`;

export const ModifiedAt = styled.span`
    margin-right: 15px;
`;


export const ViewCount = styled.span`
    margin-left: auto; /* 오른쪽 정렬 */
    // 추가 스타일 필요 시 정의
`;


export const DescArea = styled.div` // pre 대신 div 사용
    width: 100%;
    margin-top: 20px;
    background: linear-gradient(120deg,#e5f6fd1f 0%, #eef8fb96 100%);
    padding: 26px -5px 28px 24px;
    font-size: 1.09rem;
    font-weight: 460;
    color: #28567e;
    border-radius: 13px;
    line-height: 1.78;
    white-space: pre-line; // 줄바꿈 유지
    box-shadow: 0 2px 10px 0 #6abceb1b;
    min-height: 200px; // 최소 높이 설정
`;


export const EditButton = styled.button`
    position: absolute;
    top: 40px;
    right: 120px;
    background: linear-gradient(90deg, #36abc9, #198dbb);
    color: #fff;
    border: none;
    padding: 9px 20px;
    border-radius: 22px;
    font-weight: 780;
    font-size: 1rem;
    box-shadow: 0 3px 16px #44c0ee26;
    letter-spacing: -0.02em;
    cursor: pointer;
    transition: background .16s, box-shadow .16s, transform .13s;
    z-index: 10;
    &:hover {
        background: linear-gradient(90deg, #198dbb, #36abc9);
        box-shadow: 0 6px 18px #44c0ee36;
        transform: translateY(-2px) scale(1.05);
    }
    @media (max-width: 600px) {
        right: 88px;
        top: 20px;
        padding: 7px 12px;
        font-size: 0.97rem;
    }
`;

export const DeleteButton = styled.button`
    position: absolute;
    top: 40px;
    right: 40px;
    background: linear-gradient(90deg, #e35d83, #ef717a);
    color: #fff;
    border: none;
    padding: 9px 20px;
    border-radius: 22px;
    font-weight: 780;
    font-size: 1rem;
    box-shadow: 0 3px 16px #e47a9226;
    letter-spacing: -0.02em;
    cursor: pointer;
    transition: background .16s, box-shadow .16s, transform .13s;
    z-index: 10;
    &:hover {
        background: linear-gradient(90deg, #ef717a, #e35d83);
        box-shadow: 0 6px 18px #e47a9236;
        transform: translateY(-2px) scale(1.05);
    }
    @media (max-width: 600px) {
        right: 16px;
        top: 20px;
        padding: 7px 12px;
        font-size: 0.97rem;
    }
`;

// 댓글 섹션 스타일 (선택 사항)
export const CommentSection = styled.div`
    margin-top: 40px;
    padding-top: 30px;
    border-top: 1px solid ${Palette.borderGray};
`;

export const CommentTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${Palette.text};
    margin-bottom: 20px;
`;

export const CommentList = styled.ul`
    list-style: none;
    padding: 0;
`;

export const CommentItem = styled.li`
    background: ${Palette.bg};
    padding: 15px 20px;
    border-radius: 10px;
    margin-bottom: 15px;
    border: 1px solid ${Palette.borderGray};
`;

export const CommentContent = styled.p`
    margin-bottom: 8px;
    font-size: 1rem;
    color: ${Palette.text};
    line-height: 1.6;
`;

export const CommentMeta = styled.div`
    font-size: 0.9rem;
    color: ${Palette.subText};
`;

export const CommentAuthor = styled.span`
    font-weight: 600;
    margin-right: 10px;
`;

export const CommentDate = styled.span`
    // 추가 스타일 필요 시 정의
`;

export const NoComment = styled.p`
    color: ${Palette.subText};
    text-align: center;
    padding: 20px;
    border: 1px dashed ${Palette.borderGray};
    border-radius: 10px;
`;