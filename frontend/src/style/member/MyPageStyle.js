// MyPageStyle.js
export const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#fef9f4',
};

export const sidebarStyle = {
    width: '270px',
    backgroundColor: '#f8f2e9',
    padding: '20px',
    boxSizing: 'border-box',
};

export const profileBoxStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
};

export const profileInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
};

export const profileImageStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#ddd',
    marginRight: '10px',
    objectFit: 'cover',
};

export const greetingText = {
    fontWeight: 'bold',
};

export const profileButton = {
    fontSize: '13px',
    padding: '7px 18px',
    marginTop: '7px',
    border: 'none',
    background: 'linear-gradient(92deg, #7b5cf5 56%, #cbaaff 100%)',
    color: '#fff',
    fontWeight: 600,
    borderRadius: '18px',
    boxShadow: '0 2px 10px rgba(95, 83, 180, 0.12)',
    cursor: 'pointer',
    letterSpacing: '0.03em',
    transition: 'background 0.21s, transform 0.15s, box-shadow 0.19s',
    outline: 'none',
};

export const profileStats = {
    display: 'flex',
    justifyContent: 'space-between',
};

export const statItem = {
    textAlign: 'center',
};

export const mainStyle = {
    flex: 1,
    padding: '30px',
    backgroundColor: '#fff', // main 전체 배경색을 흰색으로 유지
};

export const infoBoxStyle = {
    backgroundColor: '#f9f9f9', // 개인 정보 섹션 배경색
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px', // 팔로우 정보 섹션과의 간격
};

// 팔로우 정보 섹션 스타일 추가
export const followInfoBoxStyle = {
    backgroundColor: '#f9f9f9', // 개인 정보 섹션과 유사한 배경색
    padding: '20px',
    borderRadius: '8px',
    marginTop: '20px', // 개인 정보 섹션과의 간격
};

export const followSectionTitleStyle = {
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '16px',
    color: '#333', // 제목 색상
};

export const followListContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between', // 팔로잉, 팔로워 목록을 양쪽에 배치
    gap: '20px', // 목록 사이 간격
};

export const followListWrapperStyle = {
    flex: 1, // 각 목록이 동일한 너비를 가지도록 설정
    background: '#fff', // 목록 배경색 추가
    borderRadius: '8px', // 모서리 둥글게
    padding: '15px', // 내부 여백
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)', // 은은한 그림자 효과
};

export const followListTitleStyle = {
    fontWeight: '600',
    fontSize: '17px', // 글씨 크기 살짝 키움
    marginBottom: '12px', // 여백 조정
    color: '#444', // 색상 변경
    paddingBottom: '8px', // 하단 구분선 위한 여백
    borderBottom: '1px solid #eee' // 구분선 추가
};

export const followListStyle = {
    listStyle: 'none',
    padding: '0px 5px', // 좌우 패딩 추가
    margin: '0',
    maxHeight: '285px', // 5개 아이템 높이 (5 * (36px + 10px*2 + 1px))
    overflowY: 'auto',

    // maxHeight 및 overflowY는 MyPageCom.js에서 동적으로 제어
};

export const followItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 5px', // 패딩 조정
    borderBottom: '1px solid #f5f5f5', // 아이템 구분선 연하게
    transition: 'background-color 0.2s ease',
};

export const followItemImageStyle = {
    width: '36px', // 이미지 크기 증가
    height: '36px', // 이미지 크기 증가
    borderRadius: '50%',
    marginRight: '12px', // 여백 증가
    objectFit: 'cover',
    border: '1px solid #eee', // 이미지 테두리 연하게
};

export const followItemNameStyle = {
    fontSize: '15px', // 이름 폰트 크기
    color: '#333',
    fontWeight: '500', // 폰트 두께
};

export const noFollowDataStyle = {
    fontSize: '14px',
    color: '#888', // 색상 변경
    textAlign: 'center',
    padding: '30px 0', // 여백 증가
    background: '#fafafa', // 배경색 살짝 추가
    borderRadius: '6px',
};


export const popupOverlay = {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.25)",
    zIndex: 100,
    backdropFilter: 'blur(2.5px)'
};

export const editPopupCard = {
    maxWidth: "410px",
    margin: "80px auto",
    padding: "34px 38px 26px 38px",
    background: "#fff",
    borderRadius: "18px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.17)",
    position: "relative",
    zIndex: 110,
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    animation: "scaleUp .22s ease"
};

export const closeEditBtn = {
    position: "absolute",
    top: "15px",
    right: "18px",
    background: "none",
    border: "none",
    fontSize: "1.45rem",
    color: "#bc4444",
    cursor: "pointer"
};

export const fieldLabel = {
    fontWeight: 600,
    fontSize: "16px",
    marginBottom: "2px",
    display: "block"
};

export const fieldRow = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px"
};

export const editInput = {
    flex: 1,
    width: "310px",
    fontSize: "15px",
    padding: "8px 32px 8px 12px",
    borderRadius: "7px",
    border: "1.5px solid #e4e4e4",
    outline: "none",
    transition: "border .2s",
    background: "#fcfcfc"
};

export const editInputFocus = {
    border: "1.5px solid #7747e8",
    background: "#f8f3ff"
};

export const editErrorTxt = {
    color: "#f14949",
    fontSize: "13px",
    margin: "4px 0 0 7px",
};

export const saveBtn = {
    background: "linear-gradient(93deg, #7747e8 60%, #c68fef)",
    color: "white",
    fontWeight: 600,
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    marginRight: "8px",
    padding: "11px 30px",
    boxShadow: "0 3px 8px #e3dcf7",
    cursor: "pointer",
    transition: "background .17s"
};

export const cancelBtn = {
    background: "#eee",
    border: "none",
    borderRadius: "6px",
    fontWeight: 500,
    color: "#333",
    fontSize: "16px",
    padding: "11px 24px",
    cursor: "pointer",
    transition: "background .17s"
};

export const infoFieldsGrid = {
    display: "flex",
    flexWrap: "wrap",
    gap: "18px",
    marginBottom: "16px"
};
export const infoFieldCard = {
    flex: "1 1 180px",
    minWidth: "170px",
    maxWidth: "240px",
    background: "white",
    borderRadius: "13px",
    padding: "16px 20px",
    boxShadow: "0 3px 12px rgba(156,64,214,0.06)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
};
export const infoFieldLabelRow = {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    color: "#7747e8",
    fontWeight: 600,
    fontSize: "14px",
    marginBottom: "6px",
    letterSpacing: "-0.5px"
};
export const infoFieldValue = {
    fontSize: "16px",
    fontWeight: 500,
    color: "#262052",
    wordBreak: "break-all"
};

export const iconWrapper = {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px'
};