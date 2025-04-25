import styled from 'styled-components';
import {WrapBlock, StyledHeader, StyledTitle} from "../style/StyleSet";
import {Link, useNavigate} from "react-router-dom";
import NavCom from "./NavCom";

const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-left: auto;
`;

function HeaderCom() {
    const navigate = useNavigate();

    return (
        <>
            <WrapBlock>
                <StyledHeader>
                    <StyledTitle>
                        <Link to="/" className="link">Hello, Travelogic!</Link>
                    </StyledTitle>
                    <HeaderRight>
                        <button onClick={() => navigate("/register")}>회원가입</button>
                    </HeaderRight>
                </StyledHeader>
                <NavCom />
            </WrapBlock>

        </>
    )
}
export default HeaderCom;