import {StyledNav, NavCenter, NavRight} from "../../style/common/NavStyle";
import { FaFlag, FaPlaneDeparture, FaGift, FaStar, FaComments, FaEllipsisH } from "react-icons/fa";

function NavCom({roles = []}) {
    const isAdmin = Array.isArray(roles) && roles.includes("ROLE_ADMIN");

    return (
        <StyledNav>
            {/* 왼쪽: 로고 */}


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

            {/* 오른쪽: 찜목록, 마이페이지 */}
            <NavRight>
                <li><a href="/wish/groups">찜 목록</a></li>
                <li>
                    {isAdmin
                        ? <a href="/adminmypage">관리자 마이페이지</a>
                        : <a href="/mypage">마이페이지</a>
                    }
                </li>
            </NavRight>
        </StyledNav>
    );
}

export default NavCom;