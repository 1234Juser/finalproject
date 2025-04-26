import styled from 'styled-components';
import {WrapBlock, StyledHeader, StyledTitle} from "../../style/StyleSet";
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
            <video
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', height: 'auto' }}
            >
                <source src="http://localhost:8080/img/logo/finalvideo.mp4" type="video/mp4" />
                브라우저가 video 태그를 지원하지 않습니다.
            </video>
        </>
    )
}
export default HeaderCom;