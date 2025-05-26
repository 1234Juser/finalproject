// EventListStyle.js에서 사용된 색상 및 스타일 값 참고
export const Palette = {
    mainGradient: "linear-gradient(95deg, #36abc9 0%, #198dbb 100%)",
    blue: "#198dbb",
    lightBlue: "#70c7e0", // 연한 파란색 추가
    white: "#fff",
    inactiveButtonBackground: "#f2f6f9", // EventList PagingButton 비활성 배경색과 동일
    tabShadow: "0 2px 8px #92c7eb55", // EventList PagingButton 활성 box-shadow와 동일
    listItemShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // 리스트 아이템 그림자
    textColor: "#333", // 기본 텍스트 색상
    secondaryTextColor: "#555", // 보조 텍스트 색상
    iconColor: "#198dbb", // 아이콘 색상
    heartRed: "#ff6347", // 빨간색 하트 색상 추가 (Tomato 색상 사용)
};

export const contentStyle = {
    flexGrow: 1,
    padding: '25px 30px', // 패딩 조정
    borderLeft: '1px solid #e0e0e0', // 테두리 색상 변경
    marginLeft: '20px',
    backgroundColor: Palette.white, // 콘텐츠 영역 배경색
};

export const tabContainerStyle = {
    display: 'flex',
    marginBottom: '25px', // 마진 조정
    borderBottom: `1px solid #e0e0e0`, // 탭 컨테이너 하단 라인
};

export const tabButtonStyle = (isActive, isHovered) => ({
    padding: '12px 25px',
    cursor: 'pointer',
    border: 'none',
    borderBottom: isActive ? `3px solid ${Palette.blue}` : (isHovered ? `3px solid ${Palette.lightBlue}` : '3px solid transparent'), // 호버 시 테두리 색상 변경
    backgroundColor: isHovered ? Palette.inactiveButtonBackground : Palette.white,
    color: isActive ? Palette.blue : (isHovered ? Palette.blue : Palette.secondaryTextColor), // 호버 시 텍스트 색상 변경
    fontWeight: isActive ? '600' : (isHovered ? '600' : '500'), // 호버 시 폰트 굵기 변경
    marginRight: '10px',
    transition: 'all 0.2s ease-in-out',
    fontSize: '1.05rem',
});


export const listStyle = {
    listStyleType: 'none',
    padding: 0,
};

export const listItemStyle = (isHovered) => ({
    backgroundColor: isHovered ? Palette.lightBlue : Palette.white, // 호버 시 배경색 변경 (더 밝은 색)
    border: isHovered ? `1px solid ${Palette.hoverBorder}` : '1px solid #e8e8e8', // 호버 시 테두리 색상 변경
    padding: '20px',
    marginBottom: '15px',
    borderRadius: '8px',
    boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.15)' : Palette.listItemShadow,
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out, border 0.2s ease-in-out, color 0.2s ease-in-out', // 전환 효과에 border, color 추가
    display: 'flex',
    cursor: 'pointer',
    flexDirection: 'column',
    gap: '10px',
    transform: isHovered ? 'translateY(-3px) scale(1.005)' : 'translateY(0) scale(1)', // 살짝 위로 이동 + 미세하게 확대
    color: isHovered ? Palette.textColor : Palette.textColor, // 호버 시 텍스트 색상 변경 (필요에 따라)
});


export const itemHeaderStyle = { // 게시글/댓글 제목 및 공지 뱃지 컨테이너
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
};

export const titleStyle = {
    fontSize: '1.25rem', // 폰트 크기 증가
    fontWeight: '600', // 폰트 두께 증가
    color: Palette.textColor, // 텍스트 색상 적용
    // marginBottom: '8px', // listItemStyle gap으로 대체
    display: 'flex', // 아이콘과 정렬을 위해 flex 사용
    alignItems: 'center', // 아이콘과 정렬
    gap: '8px', // 아이콘과 제목 텍스트 간 간격
};

export const noticeBadgeStyle = { // 공지 뱃지 스타일
    backgroundColor: Palette.lightBlue,
    color: Palette.white,
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: '600',
    marginLeft: 'auto', // 오른쪽으로 밀기
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
};

export const itemMetaContainerStyle = { // 작성일, 조회수, 댓글 작성일 컨테이너
    display: 'flex',
    alignItems: 'center',
    gap: '15px', // 각 메타 정보 간 간격
    marginTop: '5px',
};

export const metaInfoStyle = { // 개별 메타 정보 (아이콘 + 텍스트)
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '0.9rem',
    color: Palette.secondaryTextColor,
};

export const dateStyle = { // 이제 사용되지 않음, metaInfoStyle로 통합
    // fontSize: '0.9rem',
    // color: Palette.secondaryTextColor,
    // marginBottom: '8px',
};

export const countStyle = { // 이제 사용되지 않음, metaInfoStyle로 통합
    // fontSize: '0.9rem',
    // color: Palette.secondaryTextColor,
    // marginBottom: '10px',
};

export const commentContentStyle = { // 댓글 내용 스타일 추가
    fontSize: '1rem',
    color: Palette.textColor,
    lineHeight: '1.6',
    marginTop: '5px',
    paddingLeft: '25px', // 아이콘이 있다면 들여쓰기 효과
};

export const iconStyle = { // 기본 아이콘 스타일
    color: Palette.iconColor,
    fontSize: '1.1rem', // 아이콘 크기 통일
};


// --- 페이징 스타일 수정 ---
// EventListStyle.js의 PagingWrapper 스타일과 동일하게 수정
export const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '38px',
    marginBottom: '40px',
    gap: '10px',
};

// EventListStyle.js의 PagingButton 스타일 (비활성 상태)과 동일하게 수정
export const pageButtonStyle = {
    background: Palette.inactiveButtonBackground, // "#f2f6f9"
    color: Palette.blue,
    fontWeight: 500,
    fontSize: '1.01rem',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 20px',
    cursor: 'pointer',
    transition: 'background 0.18s, color 0.18s',
    boxShadow: 'none',
    letterSpacing: '-0.5px',
    ':hover': {
        background: Palette.mainGradient,
        color: Palette.white,
    }
};

// EventListStyle.js의 PagingButton 스타일 (활성 상태)과 동일하게 수정
export const activePageButtonStyle = {
    background: Palette.mainGradient,
    color: Palette.white,
    fontWeight: 600,
    fontSize: '1.01rem',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 20px',
    cursor: 'pointer',
    transition: 'background 0.18s, color 0.18s',
    boxShadow: Palette.tabShadow, // "0 2px 8px #92c7eb55"
    letterSpacing: '-0.5px',
    ':hover': {
        background: Palette.mainGradient,
        color: Palette.white,
    }
};

export { containerStyle, sidebarStyle } from '../../style/member/WithdrawlStyle';