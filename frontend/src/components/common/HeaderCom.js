import {HeaderWrapBlock} from "../../style/components/StyleSet";
import {
    AsideMenu, AsideNavWrap, AsideProfileWrap,
    Backdrop, CloseButton,
    HamburgerButton,
    HeaderButton,
    HeaderRight,
    ProfileImg,
    SearchContainer,
    StyledHeader,
    StyledTitle
} from "../../style/common/HeaderStyle";
import {Link, useNavigate} from "react-router-dom";
import NavPage from "../../pages/common/NavPage";
import SearchInputPage from "../../pages/search/SearchInputPage";
import RealtimeRanking from "../../containers/realtime/RealtimeRanking";
import {useEffect, useState} from "react";
import {FiMenu} from "react-icons/fi";

function HeaderCom( {isLoggedIn, profileImg, handleLogout, memberName}) {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [showAside, setShowAside] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            const mobileCheck = window.innerWidth <= 768;
            setIsMobile(mobileCheck);
            if (!mobileCheck) {
                setShowAside(false); // 데스크탑 전환 시 메뉴 닫기
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    // 네비게이션 링크 클릭 시 사이드 메뉴를 닫는 함수
    const handleNavLinkClick = (e) => {
        // 클릭된 요소(e.target) 또는 그 부모 요소 중에 <a> 태그가 있는지 확인합니다.
        // React Router의 Link 컴포넌트는 기본적으로 <a> 태그로 렌더링됩니다.
        let targetElement = e.target;
        while (targetElement && targetElement !== e.currentTarget) {
            if (targetElement.tagName === 'A') {
                setShowAside(false); // <a> 태그 클릭 시 Aside 메뉴를 닫습니다.
                break;
            }
            targetElement = targetElement.parentElement;
        }
    };


    return (
        <>
            <HeaderWrapBlock>
                <StyledHeader>
                    <StyledTitle>
                        <Link to="/" className="link">Hello, Travelogic!</Link>
                    </StyledTitle>
                    {/*검색어 입력창*/}
                    <SearchContainer>
                        <SearchInputPage />
                        <RealtimeRanking /> {/* 실시간 랭킹 컴포넌트 추가 */}
                    </SearchContainer>

                    {isMobile && (
                        <>
                            <HamburgerButton onClick={() => setShowAside(true)} >
                                <FiMenu/>
                            </HamburgerButton>
                            {showAside && (
                                <>
                                    <Backdrop onClick={() => setShowAside(false)} isOpen={showAside}/>
                                    <AsideMenu isOpen={showAside}>
                                        <CloseButton onClick={() => setShowAside(false)}>×</CloseButton> {/* 요거 추가 */}

                                        <AsideProfileWrap>
                                            <HeaderRight>
                                                {isLoggedIn ? (
                                                    <>
                                                        <ProfileImg src={profileImg} alt="프로필" />
                                                        <span style={{fontWeight:600, whiteSpace: "nowrap"}}>{memberName}</span>
                                                        <HeaderButton onClick={handleLogout}>로그아웃</HeaderButton>
                                                    </>
                                                ) : (
                                                    <>
                                                        <HeaderButton onClick={()=>navigate("/login")}>로그인</HeaderButton>
                                                        <HeaderButton onClick={() => navigate("/registerselect")}>회원가입</HeaderButton>
                                                    </>
                                                )}
                                            </HeaderRight>
                                        </AsideProfileWrap>

                                        <AsideNavWrap onClick={handleNavLinkClick}>
                                            <NavPage />
                                        </AsideNavWrap>

                                    </AsideMenu>
                                </>
                            )}
                        </>
                    )}

                    {/* 데스크탑용 로그인/회원가입 버튼 (isMobile이 false일 때) - 필요시 추가 */}
                    {!isMobile && (
                        <HeaderRight>
                            {isLoggedIn ? (
                                <>
                                    <ProfileImg src={profileImg} alt="프로필" />
                                    <span>{memberName}</span>
                                    <HeaderButton onClick={handleLogout}>로그아웃</HeaderButton>
                                </>
                            ) : (
                                <>
                                    <HeaderButton onClick={()=>navigate("/login")}>로그인</HeaderButton>
                                    <HeaderButton onClick={() => navigate("/registerselect")}>회원가입</HeaderButton>
                                </>
                            )}
                        </HeaderRight>
                    )}


                </StyledHeader>
                {!isMobile && <NavPage/> }
            </HeaderWrapBlock>
        </>
    )
}

export default HeaderCom;