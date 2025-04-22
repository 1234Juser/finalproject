import styled from 'styled-components';
import {WrapBlock, StyledHeader, StyledTitle} from "../style/StyleSet";
import {Link} from "react-router-dom";
import NavCom from "./NavCom";

function HeaderCom() {
    return (
        <>
            <WrapBlock>
                <StyledHeader>
                    <StyledTitle>
                        <Link to="/" className="link">Hello, Travelogic!</Link>
                    </StyledTitle>
                </StyledHeader>
                <NavCom />
            </WrapBlock>
        </>
    )
}
export default HeaderCom;