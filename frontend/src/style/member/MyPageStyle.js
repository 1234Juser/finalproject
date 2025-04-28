// MyPageStyle.js
export const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#fef9f4',
};

export const sidebarStyle = {
    width: '250px',
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
    fontSize: '12px',
    padding: '4px 8px',
    marginTop: '5px',
    border: '1px solid #ccc',
    backgroundColor: 'transparent',
    borderRadius: '4px',
    cursor: 'pointer',
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
    backgroundColor: '#fff',
};

export const infoBoxStyle = {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
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