import {HeaderWrapBlock} from "../../style/components/StyleSet";
import {HeaderButton, HeaderRight, ProfileImg, StyledHeader, StyledTitle} from "../../style/common/HeaderStyle";
import {Link, useNavigate} from "react-router-dom";
import NavPage from "../../pages/common/NavPage";
import SearchInputPage from "../../pages/search/SearchInputPage";
import RealtimeRanking from "../../containers/realtime/RealtimeRanking";

function HeaderCom( {isLoggedIn, profileImg, handleLogout, memberName}) {

    const navigate = useNavigate();

    return (
        <>
            <HeaderWrapBlock>
                <StyledHeader>
                    <StyledTitle>
                        <Link to="/" className="link">Hello, Travelogic!</Link>
                    </StyledTitle>
                    {/*검색어 입력창*/}
                    <div style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}> {/* flexbox 속성 수정 */}
                        <SearchInputPage />
                        <RealtimeRanking /> {/* 실시간 랭킹 컴포넌트 추가 */}
                    </div>

                    {/*로그인버튼*/}
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