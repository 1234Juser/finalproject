import styled from 'styled-components';

const StyledMyNav = styled.nav`
    position: relative;
    flex-direction: column;
    top : 320px;
    width: 200px;
    min-width: 200px;
    height: calc(100vh - 320px);
    background-color: #f0f4f8;
    z-index: 1000;
    ul.menu {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    ul li { margin-right : 30px; }
    .menu li a { font-size : 20px; }
    a { color : black; }
    a:hover { 
        color: #0077cc;
        font-weight: bold;
    }
`;

function MyNavCom(){
    return(
        <>
            <StyledMyNav>
                <ul className="menu">
                    <li><a href="/myreservation">내 예약</a></li>
                    <li><a href="/myreview">내 리뷰</a></li>
                </ul>
            </StyledMyNav>
        </>
    )
}
export default MyNavCom;