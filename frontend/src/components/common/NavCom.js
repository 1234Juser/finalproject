import {StyledNav} from "../../style/components/StyleNav";



function NavCom({roles = []}) {
    const isAdmin = Array.isArray(roles) && roles.includes("ROLE_ADMIN");
    return(
        <StyledNav>
            <ul className="nav">
                <li><a href="/domestic">국내</a></li>
                <li><a href="/international">해외</a></li>
                <li>투어/티켓</li>
                <li>이심</li>
                <li>더보기</li>
            </ul>
            <ul className="nav">
                <li><a href="/like">찜 목록</a></li>
                <li>
                    {isAdmin ? (
                        <a href="/adminmypage">관리자 마이페이지</a>
                    ) : (
                        <a href="/mypage">마이페이지</a>
                    )}
                </li>
            </ul>
        </StyledNav>
    );
}

export default NavCom;
