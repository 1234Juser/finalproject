// 마이페이지용 사이드바 스타일

export const sidebarStyle = {
    background: '#f8f2e9',
    padding: '28px 16px',
    borderRadius: '16px',
    minWidth: '210px',
    boxShadow: '0 2px 10px rgba(180,140,90,0.06)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
};

export const navStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
};

export const linkStyle = {
    textDecoration: 'none',
    color: '#684600',
    fontSize: '17px',
    fontWeight: '500',
    padding: '10px 18px',
    borderRadius: '8px',
    transition: 'background 0.18s, color 0.18s, font-weight 0.2s',
    display: 'block',
    // 임시 호버 스타일 직접 적용 (컴포넌트에서 JS로 처리 가능)
};

// 참고: 호버 효과는 JS로 아래처럼 적용해야 합니다
// <a href="#" style={{ ...linkStyle, ...(isActive ? activeStyle : {}), ...(isHovered? hoverStyle:{}) }}>

export const linkHoverStyle = {
    background: '#ffeacc',  // 연한 포인트 색
    color: '#bf7f14',
    fontWeight: 'bold'
};

export const activeStyle = {
    background: '#ffdb99',
    color: '#b07412',
    fontWeight: 'bold'
};
