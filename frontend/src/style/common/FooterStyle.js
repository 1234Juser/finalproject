import styled from "styled-components";

export const FooterContainer = styled.footer`
    width: 100%;
    background: #fff;
    padding: 32px 0 22px 0;
    border-radius: 0 0 18px 18px;
    box-shadow: 0 -6px 23px #cccccc11;
    color: #111;
`;

export const FooterContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
`;

export const FooterLinks = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    margin-bottom: 10px;

    a {
        color: #1a1a1a;
        font-weight: 500;
        font-size: 1.01rem;
        transition: color 0.18s;
        text-decoration: none;
        &:hover {
            color: #333;
            text-decoration: underline;
        }
    }
`;

export const FooterTextWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
`;

export const FooterText = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 14px;
    font-size: 1.01rem;
    color: #222;
`;

export const FooterBrand = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: #000;
`;

export const FooterCreators = styled.div`
    font-size: 1.1rem;
    font-weight: bold;
    color: #222;
`;

export const SocialIcons = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 15px;
    width: 100%; /* 추가: 항상 오른쪽 끝 정렬 */
    a {
        color: #111;
        font-size: 1.7rem;
        transition: color 0.18s;
        &:hover {
            color: #e94057;
        }
    }
`;


export const FooterCopyright = styled.div`
    width: 100%;
    text-align: center;
    font-size: 1.21rem;
    font-weight: bold;
    margin-top: 25px;
    margin-bottom: 5px;
    color: #000;
    letter-spacing: 0.03em;
`;

// 로고 부분(왼쪽)
export const FooterLogo = styled.div`
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    margin-right: 7px;
    img {
        height: 85px;           
        max-height: 260px;       
        width: 400px;
        cursor: pointer;
        display: block;
        margin-right: 12px;     
    }
`;