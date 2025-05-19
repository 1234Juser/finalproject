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
    // display: flex; // 하위 컴포넌트에서 flex 레이아웃 관리
    // align-items: center;
    color: ${Palette.subText};
    font-size: 1rem;
    margin-bottom: 25px; // 메타 정보 아래 여백
    border-bottom: 1px solid ${Palette.borderGray}; // 아래 줄 추가
    padding-bottom: 15px; // 줄과 정보 사이 여백
`;

export const AuthorLine = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px; // 다음 줄과의 간격
    /* 게시글 작성자 이름, 프로필 사진 왼쪽 정렬 */
    justify-content: flex-start;
`;

export const AuthorName = styled.span`
    font-weight: 600;
    margin-right: 15px;
    // display: inline-block; // 필요시 사용 (flex 컨테이너에서는 기본적으로 인라인 블록처럼 동작)
`;

export const PostStatsLine = styled.div`
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 0.9em;
        color: ${Palette.subText};
        
        /* 자식 요소들 (CreatedAt, ModifiedAt, ViewCount, LikeButton, LikeCount) 사이의 간격 설정 */
        & > span, & > button {
            margin-left: 15px;
        }
        /* 첫 번째 자식 요소의 왼쪽 마진 제거 */
        & > span:first-child, & > button:first-child {
            margin-left: 0;
        }
`;



// 좋아요 버튼 스타일 추가
export const LikeButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-right: -8px; /* 좋아요 개수와의 간격 */
    display: flex;
    align-items: center;
    //font-size: 1em;
    color: ${props => props.liked ? 'red' : '#555'}; /* 좋아요 상태에 따라 색상 변경 */

    &:hover {
        color: red;
    }

    svg {
        width: 1em;
        height: 1em;
        vertical-align: middle;
    }
`;

export const OtherLikeButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-right: 5px; /* 좋아요 개수와의 간격 */
    display: flex;
    align-items: center;
    font-size: 1em;
    color: ${props => props.liked ? 'red' : '#555'}; /* 좋아요 상태에 따라 색상 변경 */

    &:hover {
        color: red;
    }

    svg {
        width: 1em;
        height: 1em;
        vertical-align: middle;
    }
`;

// 좋아요 개수 스타일 추가
export const LikeCount = styled.span`
    font-size: 0.9em;
    color: #555;
    display: flex;
    align-items: center;
    margin-left: 0; /* LikeButton에 이미 margin-right가 있으므로 LikeCount의 margin-left를 0으로 설정 */

`;

export const OtherLikeCount = styled.span`
    font-size: 1em;
    color: #555;
    display: flex;
    align-items: center;
    margin-left: 0; 
`;

export const CreatedAt = styled.span`
    // margin-right: 15px; // PostStatsLine에서 관리
`;

export const ModifiedAt = styled.span`
    // margin-right: 15px; // PostStatsLine에서 관리
`;


export const ViewCount = styled.span`
    // margin-left: auto; /* PostStatsLine에서 관리 */
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
    word-break: break-all;

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
    white-space: pre-line;
    word-break: break-all;

`;

export const CommentMeta = styled.div`
    font-size: 0.9rem;
    color: ${Palette.subText};
    display: flex; /* Flexbox 활성화 */
    align-items: center; /* 세로 중앙 정렬 */
    flex-wrap: wrap;
    /* 댓글 작성자 및 프로필 사진 왼쪽 정렬 */
    justify-content: flex-start;
    margin-bottom: 8px; /* 메타 정보와 댓글 내용 사이 간격 추가 */
`;


export const CommentAuthor = styled.span`
    font-weight: 600;
    margin-right: 10px; /* 댓글 작성자와 날짜 그룹 사이의 최소 간격 */
    display: flex; // 프로필 이미지와 이름 정렬 위해 추가
    align-items: center; // 프로필 이미지와 이름 정렬 위해 추가
    font-size: 1rem;
    /* 프로필 이미지와의 간격 조정 */
    img {
        margin-right: 8px; /* 이미 CompanionDetailCom.js에서 인라인 스타일로 적용된 값과 일치 */
    }
`;

export const CommentDates = styled.div`
    display: flex;
    align-items: center;
    & > span {
        margin-left: 10px;
    }
    & > span:first-child {
        margin-left: 0;
    }
    margin-left: auto; /* 댓글 작성자 정보와 날짜 정보를 양쪽으로 분산 */
`;

export const CommentDate = styled.span`
    // margin-right: 15px; // CommentDates에서 관리
`;

export const NoComment = styled.p`
    color: ${Palette.subText};
    text-align: center;
    padding: 20px;
    border: 1px dashed ${Palette.borderGray};
    border-radius: 10px;
`;

// CommentItem에서 이동된 스타일
export const CommentActions = styled.div`
    margin-top: 5px;
    font-size: 0.9rem;
    /* 댓글 수정/삭제 버튼 왼쪽 정렬 */
    text-align: left;
    display: flex; /* Flexbox 활성화 */
    align-items: center; /* 세로 중앙 정렬 */
    justify-content: flex-end; /* 요소들을 오른쪽 끝으로 정렬 */

`;

export const ActionButton = styled.button`
    background: none;
    border: none;
    color: #198dbb;
    cursor: pointer;
    margin-right: 10px;
    padding: 0;
    font-size: 0.9rem;

    &:hover {
        text-decoration: underline;
    }

    &:last-child {
        margin-right: 0;
    }
`;

export const EditForm = styled.form`
    margin-top: 10px;
`;

export const EditTextArea = styled.textarea`
    width: 100%;
    min-height: 80px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
    resize: vertical;
    font-size: 1rem;

`;

export const SaveButton = styled.button`
    background: linear-gradient(90deg, #36abc9, #198dbb);
    color: #fff;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    margin-right: 5px;
`;

export const CancelButton = styled.button`
    background: #ccc;
    color: #333;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
`;
// CommentForm에서 이동된 스타일
export const CommentFormWrapper = styled.div`
    margin-top: 20px;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 10px;
    border: 1px solid #eee;
`;

export const CommentTextArea = styled.textarea`
    width: 100%;
    min-height: 100px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
    resize: vertical;
    font-size: 1rem;
    white-space: pre-line; /* 이 줄을 추가하여 줄바꿈을 유지합니다. */

`;

export const SubmitButton = styled.button`
    background: linear-gradient(90deg, #36abc9, #198dbb);
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s ease;

    &:hover {
        background: linear-gradient(90deg, #198dbb, #36abc9);
    }

    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
`;

export const LoginPrompt = styled.p`
    text-align: center;
    color: #666;
`;

// 페이징 컴포넌트 스타일 추가
export const CommentPagingWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 10px;
`;

export const CommentPagingButton = styled.button`
    background: ${({ active }) => (active ? Palette.mainGradient : "#f2f6f9")};
    color: ${({ active }) => (active ? "#fff" : Palette.blue)};
    font-weight: ${({ active }) => (active ? 600 : 500)};
    font-size: 1.01rem;
    border: none;
    border-radius: 8px;
    padding: 8px 15px;
    cursor: pointer;
    transition: background 0.18s, color 0.18s;
    box-shadow: ${({ active }) => (active ? "0 2px 8px #92c7eb55" : "none")};
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

/* 댓글 작성자 정보와 팔로우 버튼 그룹을 위한 flex 컨테이너 */
export const CommentAuthorInfo = styled.div`
    display: flex;
    align-items: center;
    /* 왼쪽 정렬 유지 */
    justify-content: flex-start; /* 이 줄을 flex-start로 변경 */
    flex-grow: 1; /* 가능한 공간을 모두 차지하여 버튼을 오른쪽으로 밀어냄 */
    flex-wrap: wrap; /* 필요한 경우 줄바꿈 허용 */
    gap: 20px; /* 댓글 작성자 이름과 팔로우 버튼 그룹 사이의 간격 추가 */

`;

/* 댓글 팔로우 버튼 그룹을 위한 flex 컨테이너 */
export const CommentFollowActions = styled.div`
    display: flex;
    align-items: center;
    gap: 8px; /* 버튼 사이 간격 */
`;



/* 게시글 팔로우 버튼 그룹을 위한 flex 컨테이너 */
export const PostFollowActions = styled.div`
    display: flex;
    align-items: center;
    /* 오른쪽 정렬 */
    margin-left: auto; /* 왼쪽에 가능한 모든 공간을 차지하여 오른쪽으로 밀어냄 */
    gap: 10px; /* 버튼 사이 간격 */
`;


export const FollowButton = styled.button`
    background: linear-gradient(90deg, #36abc9, #198dbb);
    color: #fff;
    border: none;
    /* 크기를 비슷하게 조정 */
    padding: 4px 8px; /* FollowInfoButton 크기에 맞춰 조정 */
    border-radius: 18px;
    font-weight: 700;
    font-size: 0.85rem; /* FollowInfoButton 크기에 맞춰 조정 */
    box-shadow: 0 2px 8px #44c0ee26;
    letter-spacing: -0.01em;
    cursor: pointer;
    transition: background .16s, box-shadow .16s, transform .13s;
    margin-left: 10px; /* 댓글 작성자 정보와의 간격 */

    &:hover {
        background: linear-gradient(90deg, #198dbb, #36abc9);
        box-shadow: 0 4px 10px #44c0ee36;
        transform: translateY(-1px);
    }

    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }

    &.unfollow {
        background: linear-gradient(90deg, #e35d83, #ef717a);
        &:hover {
            background: linear-gradient(90deg, #ef717a, #e35d83);
        }
    }
`;




export const FollowInfoButton = styled.button`
    background-color: #007bff; /* 파란색 배경 */
    color: white;
    border: none;
    padding: 5px 10px; /* 패딩 감소 */
    border-radius: 20px; /* 더 둥근 모서리 */
    cursor: pointer;
    font-size: 0.8em; /* 폰트 크기 감소 */
    font-weight: 600; /* 폰트 굵기 */
    transition: background-color 0.2s ease, transform 0.1s ease; /* 색상 및 transform 애니메이션 추가 */
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    margin-left: 6px; /* 댓글 작성자 정보와의 간격 */

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    }
`;


// 모달 관련 스타일 (FollowModalCom에서 사용할 수 있도록 내보내기)
export const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background-color: ${Palette.white};
    padding: 30px;
    border-radius: 15px;
    box-shadow: ${Palette.cardShadow};
    width: 90%;
    max-width: 400px; /* 모달 최대 너비 설정 */
    position: relative;
    max-height: 80vh; /* 모달 최대 높이 설정 */
    overflow-y: auto; /* 내용이 넘칠 경우 스크롤바 표시 */
`;

export const ModalTitle = styled.h4`
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 1.3rem;
    font-weight: 700;
    color: ${Palette.text};
    text-align: center;
`;

export const ModalCloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: ${Palette.subText};
`;

export const ModalMembersList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const ModalMemberItem = styled.li`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid ${Palette.borderGray};
    &:last-child {
        margin-bottom: 0;
        border-bottom: none;
    }
`;

export const ModalProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 15px;
    object-fit: cover; /* 이미지 비율 유지 */
`;

export const ModalMemberName = styled.span`
    font-weight: 600;
    color: ${Palette.text};
    font-size: 1.1rem;
`;

export const FollowToggleButtons = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
    gap: 15px;
`;

export const ToggleButton = styled.button`
    background: none;
    border: none;
    font-size: 1.1rem;
    font-weight: ${props => (props.active ? '700' : '500')};
    color: ${props => (props.active ? Palette.blue : Palette.subText)};
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
        color: ${Palette.blue};
    }
`;