import {
    NavContentWrapper, FloatingChatButton,
    DropdownContainer,
    DropdownMenu,
    MyPageWrapper,
    NavCenter,
    NavRight,
    StyledNav
} from "../../style/common/NavStyle";
import {FaComments, FaEllipsisH, FaFlag, FaGift, FaHeart, FaPlaneDeparture, FaStar, FaUserCircle} from "react-icons/fa";
import React from "react";
import {IoNotifications} from "react-icons/io5";
import {Link} from "react-router-dom";





function NavCom({roles = [], toggleChat, chatAnchorRef, toggleNotification, notificationIconRef}) {
    const isAdmin = Array.isArray(roles) && roles.includes("ROLE_ADMIN");

    return (
        <>
        <StyledNav style={{position: 'relative'}}>


            {/* 기존 네비 내용 */}
            <NavContentWrapper>
                {/* 왼쪽: 로고 자리에 남겨둘 공간 (필요시) */}

                {/* 가운데: 주요 메뉴 */}
                <NavCenter>
                    <li>
                        <Link to="/domestic"><FaFlag style={{marginRight:6, color:"#518de0"}} />국내</Link>
                    </li>
                    <li>
                        <Link to="/international"><FaPlaneDeparture style={{marginRight:6, color:"#5aa7d2"}} />해외</Link>
                    </li>
                    <li>
                        <Link to="/event"><FaGift style={{marginRight:6, color:"#fc8b8b"}} />이벤트</Link>
                    </li>
                    <li>
                        <Link to="/customizedtravel"><FaStar style={{marginRight:6, color:"#ffd465"}} />맞춤여행</Link>
                    </li>
                    <li>
                        <Link to="/community/companion"><FaComments style={{marginRight:6, color:"#a785e9"}} />커뮤니티</Link>
                    </li>
                    <DropdownContainer>
                        <span><FaEllipsisH style={{marginRight:6, color:"#bbb"}} />더보기</span>
                        <DropdownMenu>
                            <li><Link to="/about">회사소개</Link></li>
                            <li><Link to="/ceo">ceo 인사말</Link></li>
                            <li><Link to="/faq">자주묻는질문(FAQ)</Link></li>
                        </DropdownMenu>
                    </DropdownContainer>

                </NavCenter>
                <NavRight>
                    <li
                        onClick={toggleNotification}
                        style={{ position: 'relative', cursor: 'pointer', fontWeight: 500, fontSize: '1rem' }}
                        ref={notificationIconRef}
                    >
                        <IoNotifications style={{marginRight:6, color:"#80d369"}} />
                        알림
                    </li>
                    <li>
                        <Link to="/wish/groups">
                            <FaHeart style={{marginRight:6, color:"#f2628e"}} />
                            찜 목록
                        </Link>
                    </li>
                        {isAdmin
                            ? (<li>
                                <Link to="/adminmypage">
                                    <FaUserCircle style={{marginRight:6, color:"#409cff"}} />
                                    관리자 마이페이지
                                </Link>
                                </li>
                            )
                            : (
                                <>
                                    <li>
                                        <MyPageWrapper>
                                            <Link to="/mypage">
                                                <FaUserCircle style={{marginRight:6, color:"#409cff"}} />
                                                마이페이지
                                            </Link>
                                        </MyPageWrapper>
                                    </li>
                                </>)
                        }
                </NavRight>
            </NavContentWrapper>
        </StyledNav>
            {isAdmin ? '' : <>
                {/* 우측 하단에 고정된 채팅 아이콘 */}
                <FloatingChatButton
                    ref={chatAnchorRef} // chatAnchorRef는 버튼 자체에 연결
                    title="1:1 문의 채팅"
                    onClick={toggleChat}
                />
            </>
            }
        </>
);
}
export default NavCom;
