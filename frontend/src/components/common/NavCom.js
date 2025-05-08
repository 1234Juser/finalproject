import {StyledNav, NavCenter, NavRight} from "../../style/common/NavStyle";
import {
    FaFlag, FaPlaneDeparture, FaGift, FaStar, FaComments, FaEllipsisH,
    FaHeart, FaUserCircle
} from "react-icons/fa";
import React from "react";
import styled from "styled-components";

// 전체 컨텐츠를 감싸는 래퍼(비디오 위에 올라옴)
const NavContentWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    align-items: center;
`;

function NavCom({roles = []}) {
    const isAdmin = Array.isArray(roles) && roles.includes("ROLE_ADMIN");

    return (
        // 기존 StyledNav는 position:relative 필요! (배경 비디오 위치기준)
        <StyledNav style={{position: 'relative', overflow: 'hidden'}}>


            {/* 기존 네비 내용 */}
            <NavContentWrapper>
                {/* 왼쪽: 로고 자리에 남겨둘 공간 (필요시) */}

                {/* 가운데: 주요 메뉴 */}
                <NavCenter>
                    <li>
                        <a href="/domestic"><FaFlag style={{marginRight:6, color:"#518de0"}} />국내</a>
                    </li>
                    <li>
                        <a href="/international"><FaPlaneDeparture style={{marginRight:6, color:"#5aa7d2"}} />해외</a>
                    </li>
                    <li>
                        <a href="/event"><FaGift style={{marginRight:6, color:"#fc8b8b"}} />이벤트</a>
                    </li>
                    <li>
                        <a href="/theme"><FaStar style={{marginRight:6, color:"#ffd465"}} />테마여행</a>
                    </li>
                    <li>
                        <a href="/community"><FaComments style={{marginRight:6, color:"#a785e9"}} />커뮤니티</a>
                    </li>
                    <li>
                        <span><FaEllipsisH style={{marginRight:6, color:"#bbb"}} />더보기</span>
                    </li>
                </NavCenter>
                <NavRight>
                    <li>
                        <a href="/wish/groups">
                            <FaHeart style={{marginRight:6, color:"#f2628e"}} />
                            찜 목록
                        </a>
                    </li>
                    <li>
                        {isAdmin
                            ? (
                                <a href="/adminmypage">
                                    <FaUserCircle style={{marginRight:6, color:"#409cff"}} />
                                    관리자 마이페이지
                                </a>
                            )
                            : (
                                <a href="/mypage">
                                    <FaUserCircle style={{marginRight:6, color:"#409cff"}} />
                                    마이페이지
                                </a>
                            )
                        }
                    </li>
                </NavRight>
            </NavContentWrapper>
        </StyledNav>
    );
}

export default NavCom;