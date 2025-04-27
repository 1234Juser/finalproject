import styled from "styled-components";

const StyledNav = styled.nav`
    display : flex;
    justify-content : space-between;
    width : 100%;
    ul { display : flex; }
    ul li { margin-right : 30px; }
    .menu li a { font-size : 20px; font-weight : bold; }
    a { color : black; }
    a:hover { color : gray; }
`;

export {StyledNav};