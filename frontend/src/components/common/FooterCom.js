import React from "react";
import styled from "styled-components";
import { FaYoutube, FaInstagram, FaFacebookSquare } from "react-icons/fa";
import { SiTistory, SiNaver } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const FooterContainer = styled.footer`
  padding: 40px 20px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #555;
  border-top: 1px solid #ddd;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterLinks = styled.nav`
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    justify-content: center;
    margin-bottom: 30px;

    a {
        color: #555;
        text-decoration: none;
        font-weight: 300;
        font-size: 1rem;
    }
`;

const FooterMain = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 30px;
    flex-wrap: wrap;
    border-top: 1px solid #ddd;
    padding-top: 30px;

    @media (max-width: 700px) {
        flex-direction: column;
    }
`;

const InfoSection = styled.div`
    flex: 2;
    min-width: 280px;
`;

const BrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 15px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FooterBrand = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    color: #000000;
`;

const FooterCreators = styled.p`
  font-weight: 500;
  font-size: 1rem;
  color: #333;
`;

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
    font-size: 0.85rem;
    color: #666;
    margin-bottom: 25px;

    /* InfoGrid의 각 span 자식 요소에 스타일 적용 */
    & > span { /* <--- div 대신 span으로 셀렉터 변경 */
        display: block; /* <--- span을 블록 레벨 요소처럼 만들어 줄바꿈이 되도록 함 */

        white-space: normal;
        word-break: keep-all; /* 한국어는 보통 단어 단위로 줄바꿈 */

        min-height: 2.2em; /* 폰트 사이즈에 따라 대략 두 줄 높이 확보 */
        line-height: 1.1em; /* 줄 간격 조절 */
    }
`;

const FooterNotice = styled.div`
  margin: 16px 0px;
  border-radius: 10px;
  font-size: 0.9rem;
  color: #1a1a1a;
  line-height: 1.5;
  letter-spacing: -0.02em;

  span {
    display: block;
    margin-bottom: 8px;
  }
`;

const SocialSection = styled.div`
  flex: 1;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;

  @media (max-width: 700px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const FooterLogo = styled.div`
  cursor: pointer;
  img {
    width: 200px;
    height: auto;
    object-fit: contain;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 16px;

  a {
    color: #555;
    font-size: 1.6rem;
    transition: color 0.3s ease;

    &:hover {
      color: #0077ff;
    }
  }
`;

const FooterCopyright = styled.div`
  text-align: center;
  margin-top: 30px;
  font-size: 0.8rem;
  color: #aaa;
  user-select: none;
`;

function FooterCom() {
    const navigate = useNavigate();

    return (
        <FooterContainer>
            <FooterContent>
                <FooterLinks>
                    <a href="/about">회사 소개</a>
                    <a href="/terms">이용 약관</a>
                    <a href="/privacy">
                        <span style={{ fontWeight: 'bold' }}>개인정보 보호정책</span>
                    </a>
                    <a href="/faq">자주 묻는 질문(FAQ)</a>
                    <a href="/support">고객 지원</a>
                    <a href="/contact">문의하기</a>
                    <a href="/careers">채용 정보</a>
                    <a href="/tour-info">여행 정보</a>
                    <a href="/visa">비자 안내</a>
                    <a href="/package">패키지 투어</a>
                    <a href="/insurance">여행자 보험</a>
                    <a href="/partners">제휴 문의</a>
                    <a href="/emergency">긴급연락처</a>
                </FooterLinks>

                <FooterMain>
                    <InfoSection>
                        <BrandRow>
                            <FooterBrand>Hello, Travelogic!</FooterBrand>
                            <FooterCreators>만든사람 : 양서진, 이슬기, 정상협</FooterCreators>
                        </BrandRow>
                        <InfoGrid>
                            <span>고객센터 : 1588-1234 <br/>(평일 09:00~18:00)</span>
                            <span>주소 : 각자 집 어딘가</span>
                            <span>사업자등록번호 :<br/>123-45-78901</span>
                            <span>통신판매업신고번호 :<br/>종로01-1234호</span>
                            <span>관광사업자 등록번호 : 제2025-000001호</span>
                            <span>이메일 : help@travelogic.com</span>
                            <span>대표자 : 정상협</span>
                            <span>설립일 : 2025년 3월 11일</span>
                            <span>팩스 : 02-1234-5678</span>
                        </InfoGrid>
                        <FooterNotice>
                            <span>※ 부득이한 사정에 의해 여행일정이 변경되는 경우 사전 동의를 받습니다.</span>
                            <span>※ Hello! Travelogic은 개별 항공권 및 일부 여행상품에 대하여 통신판매중개자의 지위를 가지며, 해당 상품의 정보 및 거래 등에 관한 책임은 판매자에게 있습니다.</span>
                            <span>※ 예금주 Hello! Travelogic가 아닌 계좌(개인, 대리점 등)로 입금하실 경우 당사에 대한 유효한 지급이 아니며, 당사는 책임지지 않습니다.<br />
                                    Hello! Travelogic 가상 계좌가 아닌 다른 계좌(개인, 대리점 등)에 대한 입금 유도가 있는 경우, 반드시 입금 전에 하나투어 고객센터로 문의 / 신고 하여 주시기 바랍니다.
                            </span>
                        </FooterNotice>
                    </InfoSection>

                    <SocialSection>
                        <FooterLogo onClick={() => navigate("/")}>
                            <img src="/img/logo/logo.png" alt="로고" />
                        </FooterLogo>
                        <SocialIcons>
                            <a href="https://youtube.com" aria-label="Youtube" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebookSquare /></a>
                            <a href="https://www.tistory.com/" aria-label="Tistory" target="_blank" rel="noopener noreferrer"><SiTistory /></a>
                            <a href="https://section.blog.naver.com/BlogHome.naver?directoryNo=0&currentPage=1&groupId=0" aria-label="Naver Blog" target="_blank" rel="noopener noreferrer"><SiNaver /></a>
                        </SocialIcons>
                    </SocialSection>
                </FooterMain>

                <FooterCopyright>
                    ⓒ 2025 Hello, Travelogic!. All rights reserved.
                </FooterCopyright>
            </FooterContent>
        </FooterContainer>
    );
}

export default FooterCom;
