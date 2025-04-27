import {StyledNav} from "../../style/StyleSet";
import {Link} from "react-router-dom";



function NavCom() {
    return (
        <>
            <StyledNav>
                <ul className="nav">
                    <li><Link to="/domestic">국내</Link></li>
                    <li>해외</li>
                    <li>투어/티켓</li>
                    <li>이심</li>
                    <li>더보기</li>
                </ul>
                <ul className="nav">
                    <li><Link to="/like">찜 목록</Link></li>
                    <li><Link to="/mypage">마이페이지</Link></li>
                </ul>
            </StyledNav>
        </>
    )
}
export default NavCom;