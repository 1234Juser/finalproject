import {  navStyle, linkStyle, sidebarStyle, linkHoverStyle, activeStyle} from "../../style/common/SideBarStyle";
import React, { useState } from "react";
import {Link, useLocation} from "react-router-dom";

function MyPageSideBarCom({ menuList, activeIdx, setActiveIdx }) {
    const [hoverIdx, setHoverIdx] = useState(null);
    const location = useLocation();

    return (
        <aside style={sidebarStyle}>
            <nav style={navStyle}>
                {menuList.map((menu, i) => {
                    // 실제 라우터 경로가 현재 경로와 같으면 active로 처리
                    const isActive = location.pathname === menu.path;
                    return (
                        <Link
                            to={menu.path}
                            key={menu.path}
                            style={{
                                ...linkStyle,
                                ...(isActive ? activeStyle : {}),
                                ...(hoverIdx === i ? linkHoverStyle : {})
                            }}
                            onMouseEnter={() => setHoverIdx(i)}
                            onMouseLeave={() => setHoverIdx(null)}
                            onClick={() => setActiveIdx(i)}
                        >
                            {menu.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}

export default MyPageSideBarCom;



