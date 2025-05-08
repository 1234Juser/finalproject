import {HeaderWrapBlock} from "../../style/components/StyleSet";
import {ProfileImg, StyledHeader, HeaderRight, StyledTitle, HeaderButton} from "../../style/common/HeaderStyle";
import { Link, useNavigate } from "react-router-dom";
import NavPage from "../../pages/common/NavPage";

function HeaderCom( {isLoggedIn, profileImg, handleLogout, memberName}) {

    const navigate = useNavigate();

    return (
        <>
            <HeaderWrapBlock>
                <StyledHeader>
                    <StyledTitle>
                        <Link to="/" className="link">Hello, Travelogic!</Link>
                    </StyledTitle>
                    <HeaderRight>
                        {isLoggedIn ? (
                            <>
                                <ProfileImg src={profileImg} alt="프로필" />
                                <span style={{fontWeight:600}}>{memberName}</span>
                                <HeaderButton onClick={handleLogout}>로그아웃</HeaderButton>
                            </>
                        ) : (
                            <>
                                <HeaderButton onClick={()=>navigate("/login")}>로그인</HeaderButton>
                                <HeaderButton onClick={() => navigate("/registerselect")}>회원가입</HeaderButton>
                            </>
                        )}
                    </HeaderRight>
                </StyledHeader>
                <NavPage />
            </HeaderWrapBlock>
        </>
    )
}
export default HeaderCom;