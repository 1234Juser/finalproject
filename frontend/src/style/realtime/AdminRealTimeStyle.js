// src/style/realtime/AdminRealTimeStyle.js

// 콘텐츠 영역의 기본 스타일
export const contentStyle = {
    flexGrow: 1,
    padding: '24px 20px 40px 20px', // AdminMemberListStyle의 padding과 유사하게 조정
};

// 표와 그래프를 감싸는 흰색 테두리 컨테이너 스타일
export const contentWrapperStyle = {
    width: "100%", // 필요에 따라 조절 가능
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 2px 16px 0 rgba(0,0,0,0.09)",
    padding: "28px 24px", // 내부 여백 설정
    marginBottom: '20px', // 섹션 간 간격
};


export const statsContainerStyle = {
    display: 'flex',
    gap: '15px', // 간격을 유지하거나 필요에 따라 조정
    flexWrap: 'wrap',
    marginTop: '20px',
    justifyContent: 'center', // 중앙 정렬 (필요에 따라 flex-start, flex-end 등 변경)
    alignItems: 'flex-start', // 상단 정렬 (필요에 따라 center 등 변경)
};

export const tableContainerStyle = {
    flex: 1,
    minWidth: '250px',
    maxWidth: '400px',
    backgroundColor: '#fff', // contentWrapperStyle에서 배경색을 설정하므로 여기서는 제거하거나 주석 처리
    padding: '0', // contentWrapperStyle에서 내부 여백을 설정하므로 여기서는 0
    borderRadius: '8px', // contentWrapperStyle에서 테두리 반경을 설정하므로 여기서는 제거하거나 주석 처리
    boxShadow: 'none', // contentWrapperStyle에서 그림자를 설정하므로 여기서는 none
    height: '400px', // 표 컨테이너 높이 설정
    display: 'flex', // 내부 요소 정렬을 위해 flexbox 사용
    flexDirection: 'column', // 세로 방향 정렬
    marginLeft: 'auto', // 왼쪽 여백을 자동으로 설정하여 오른쪽으로 이동
    marginRight: 'auto', // 오른쪽 여백을 자동으로 설정하여 중앙 정렬에 도움
};

export const chartContainerStyle = {
    width: '350px',
    minWidth: '300px',
    margin: '0 auto',
    backgroundColor: '#fff', // contentWrapperStyle에서 배경색을 설정하므로 여기서는 제거하거나 주석 처리
    padding: '0', // contentWrapperStyle에서 내부 여백을 설정하므로 여기서는 0
    borderRadius: '8px', // contentWrapperStyle에서 테두리 반경을 설정하므로 여기서는 제거하거나 주석 처리
    boxShadow: 'none', // contentWrapperStyle에서 그림자를 설정하므로 여기서는 none
    height: '400px', // 그래프 컨테이너 높이 설정
    display: 'flex', // 내부 요소 정렬을 위해 flexbox 사용
    flexDirection: 'column', // 세로 방향 정렬
    justifyContent: 'center', // 그래프를 세로 가운데 정렬
};

export const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
};

export const thStyle = {
    backgroundColor: '#f7c873', // AdminMemberListStyle의 th 배경색과 유사하게 변경
    color: '#222', // 글자색 변경
    fontWeight: 700, // fontWeight 변경
    padding: "14px 8px", // padding 변경
    borderBottom: "2.5px solid #f0e2c5", // borderBottom 변경
    borderTop: "2.5px solid #f0e2c5", // borderTop 변경
    textAlign: "center" // 텍스트 중앙 정렬
};

export const tdStyle = {
    padding: "12px 8px", // padding 변경
    borderBottom: "1.5px solid #f2e9da", // borderBottom 변경
    textAlign: "center", // 텍스트 중앙 정렬
    background: "#fff", // 배경색
    fontSize: '0.9rem',
};

export const evenRowStyle = {
    backgroundColor: '#f8f9fa', // 이전 배경색 유지
};

export const oddRowStyle = {
    backgroundColor: '#ffffff', // 이전 배경색 유지
};

// 표 제목 스타일
export const tableTitleStyle = {
    fontSize: '1.1rem', // 이전 스타일 유지
    marginBottom: '15px', // 이전 스타일 유지
    fontWeight: '600', // 이전 스타일 유지
    color: '#333', // 이전 스타일 유지
    textAlign: 'center', // 중앙 정렬 추가
};

// 그래프 제목 스타일
export const chartTitleStyle = {
    fontSize: '1.1rem', // 이전 스타일 유지
    marginBottom: '15px', // 이전 스타일 유지
    fontWeight: '600', // 이전 스타일 유지
    color: '#333', // 이전 스타일 유지
    textAlign: 'center', // 중앙 정렬 유지
};


// 표 스크롤 영역 스타일 추가
export const tableScrollStyle = {
    maxHeight: 'calc(100% - 40px)', // 제목 높이 고려하여 스크롤 영역 높이 설정
    overflowY: 'auto',
};
