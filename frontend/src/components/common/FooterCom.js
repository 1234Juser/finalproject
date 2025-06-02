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

    @media (max-width: 767px) { // 모바일 공통 패딩 조정
        padding: 30px 15px 15px;
    }
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
        font-size: 1rem; // 데스크톱 폰트 크기
        transition: color 0.3s ease;
        &:hover {
            color: #0077ff;
        }
    }

    @media (max-width: 767px) { // 모바일
        gap: 10px; // 링크 간 간격 줄임
        margin-bottom: 20px;
        a {
            font-size: 0.875rem; // 모바일 폰트 크기 줄임
        }
    }
`;

const FooterMain = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 30px; // 데스크톱 InfoSection과 SocialSection 사이 간격
    flex-wrap: wrap;
    border-top: 1px solid #ddd;
    padding-top: 30px;

    @media (max-width: 1023px) { // 태블릿 및 작은 데스크톱
        gap: 20px; // 간격 약간 줄임
    }

    @media (max-width: 700px) { // 기존 분기점: InfoSection과 SocialSection 세로 쌓임 시작
        flex-direction: column;
        align-items: center; // 세로로 쌓일 때 중앙 정렬
        gap: 30px; // 세로 간격 유지 또는 조정
    }
`;


const InfoSection = styled.div`
    flex: 2;
    min-width: 280px; // 최소 너비 유지

    @media (max-width: 700px) {
        width: 100%; // FooterMain이 column이 되면 너비 100% 사용
        max-width: 500px; // 너무 넓어지지 않도록 최대 너비 설정 (선택적)
    }
`;

const BrandRow = styled.div`
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 15px;

    @media (max-width: 767px) { // 일반 모바일
        gap: 12px; // 브랜드명과 제작자 사이 간격 줄임
    }

    @media (max-width: 480px) { // 기존 분기점: 매우 작은 화면에서 세로 쌓임
        flex-direction: column;
        align-items: flex-start;
        gap: 8px; // 세로로 쌓였을 때 간격
    }
`;

const FooterBrand = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    color: #000000;

    @media (max-width: 767px) {
        font-size: 1.3rem; // 모바일에서 브랜드 폰트 크기 줄임
    }
`;

const FooterCreators = styled.p`
    font-weight: 500;
    font-size: 1rem;
    color: #333;

    @media (max-width: 767px) {
        font-size: 0.9rem; // 모바일에서 제작자 폰트 크기 줄임
    }
`;

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); // 이 부분은 이미 반응형
    gap: 10px;
    font-size: 0.85rem;
    color: #666;
    margin-bottom: 25px;

    & > span {
        display: block;
        white-space: normal;
        word-break: keep-all;
        min-height: 2.2em;
        line-height: 1.1em;
    }

    @media (max-width: 767px) { // 모바일
        font-size: 0.8rem; // 정보 텍스트 폰트 크기 줄임
        gap: 8px; // 정보들 간의 간격 줄임
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); // 모바일에서 최소 너비 약간 줄임
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

    @media (max-width: 767px) { // 모바일
        font-size: 0.8rem; // 공지사항 폰트 크기 줄임
        line-height: 1.4;
    }
`;

const SocialSection = styled.div`
    flex: 1;
    min-width: 220px; // 최소 너비 유지
    display: flex;
    flex-direction: column; // 데스크톱: 로고 위, 아이콘 아래
    align-items: center;
    gap: 22px; // 데스크톱: 로고와 아이콘 그룹 사이 간격

    @media (max-width: 700px) { // 기존 분기점: InfoSection과 함께 세로로 쌓이면서, SocialSection 내부는 가로로 변경
        flex-direction: row; // 로고와 아이콘 그룹을 가로로 배치
        justify-content: center; // 중앙 정렬
        align-items: center; // 세로 중앙 정렬
        gap: 20px; // 로고와 아이콘 그룹 사이 간격 (가로 배치 시)
        width: 100%; // 전체 너비 사용
    }
    @media (max-width: 480px) { // 매우 작은 화면
        flex-direction: column; // 다시 세로로 쌓아 공간 확보
        gap: 15px;
    }
`;

const FooterLogo = styled.div`
    cursor: pointer;
    img {
        width: 200px; // 데스크톱 로고 크기
        height: auto;
        object-fit: contain;
    }

    @media (max-width: 767px) { // 모바일 (SocialSection이 row일 때 적용)
        img {
            width: 120px; // 모바일에서 로고 크기 줄임
        }
    }
    @media (max-width: 480px) { // 매우 작은 화면 (SocialSection이 column일 때)
        img {
            width: 150px; // 약간 더 크게 해도 괜찮음
        }
    }
`;

const SocialIcons = styled.div`
    display: flex;
    gap: 16px; // 데스크톱 아이콘 간 간격

    a {
        color: #555;
        font-size: 1.6rem; // 데스크톱 아이콘 크기
        transition: color 0.3s ease;

        &:hover {
            color: #0077ff;
        }
    }

    @media (max-width: 767px) { // 모바일
        gap: 12px; // 아이콘 간 간격 줄임
        a {
            font-size: 1.4rem; // 모바일 아이콘 크기 줄임
        }
    }
`;

const FooterCopyright = styled.div`
    text-align: center;
    margin-top: 30px;
    font-size: 0.8rem;
    color: #aaa;
    user-select: none;

    @media (max-width: 767px) { // 모바일
        font-size: 0.75rem; // 저작권 텍스트 폰트 크기 줄임
        margin-top: 20px;
    }
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
