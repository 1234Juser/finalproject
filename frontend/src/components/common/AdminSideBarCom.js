import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {activeStyle, linkHoverStyle, linkStyle, navStyle, sidebarStyle} from "../../style/common/SideBarStyle";

function AdminSideBarCom({ menuList, activeIdx, setActiveIdx }) {
    const [hoverIdx, setHoverIdx] = useState(null);
    const [openedIdx, setOpenedIdx] = useState(null);
    const location = useLocation();

    const handleMenuClick = (i, hasSub) => {
        if (hasSub) {
            setOpenedIdx(openedIdx === i ? null : i);
        }
        setActiveIdx(i);
    };

    return (
        <aside style={sidebarStyle}>
            <nav style={navStyle}>
                {menuList.map((menu, i) => {
                    const isActive = location.pathname === menu.path;
                    const hasSub = !!menu.subMenu;
                    return (
                        <div key={i}>
                            <div // 메인 메뉴
                                style={{
                                    ...linkStyle,
                                    ...(isActive ? activeStyle : {}),
                                    ...(hoverIdx === i ? linkHoverStyle : {})
                                }}
                                onMouseEnter={() => setHoverIdx(i)}
                                onMouseLeave={() => setHoverIdx(null)}
                                onClick={() => handleMenuClick(i, hasSub)}
                            >
                                {hasSub && (
                                    <span style={{marginRight: 6}}>
                                        {openedIdx === i ? "▼" : "▶"}
                                    </span>
                                )}
                                <Link
                                    to={menu.path}
                                    style={{
                                        color: "inherit",
                                        textDecoration: "none"
                                    }}
                                >
                                    {menu.label}
                                </Link>
                            </div>
                            {hasSub && openedIdx === i && (
                                <div style={{marginLeft: 20}}>
                                    {menu.subMenu.map((sub, subIdx) => (
                                        <Link
                                            to={sub.path}
                                            key={sub.path}
                                            style={{
                                                ...linkStyle,
                                                fontSize: "14px",
                                                ...(location.pathname === sub.path ? activeStyle : {})
                                            }}
                                            onClick={() => setActiveIdx(null)}
                                        >
                                            {sub.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}

export default AdminSideBarCom;