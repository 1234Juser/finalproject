import React from "react";
import {
    FooterContainer,
    FooterContent,
    FooterLinks,
    FooterTextWrapper,
    FooterBrand,
    FooterCreators,
    SocialIcons,
    FooterCopyright,
    FooterLogo,
} from "../../style/common/FooterStyle";
import styled from "styled-components";
import { FaYoutube, FaInstagram, FaFacebookSquare } from "react-icons/fa";
import { SiTistory } from "react-icons/si";
import { SiNaver } from "react-icons/si";

import {useNavigate} from "react-router-dom";

// Hello, Travelogic! / 만든사람 줄
const FooterTop = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
    }
`;

// Footer 상세 정보 수평 정렬(줄바꿈 지원)
const FooterInfoRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 13px;
    margin-bottom: 3px;
    font-size: 0.97rem;
    color: #333;
    font-weight: bold; // 글자를 진하게 설정

    @media (max-width: 900px) {
        flex-direction: column;
        gap: 7px;
    }
`;


// 안내문 영역
const FooterNotice = styled.div`
    width: 100%;
    margin-top: 10px;
    background: #fff; /* 배경을 흰색으로 변경 */
    border-radius: 7px 13px 13px 7px;
    padding: 19px 24px 17px 28px;
    color: #1a1a1a;
    font-size: 1.02rem;
    line-height: 1.79;
    letter-spacing: -0.01em;
    font-weight: 540;
    word-break: keep-all;
    & > span {
        display: block;
        margin-top: 6px;
        margin-left: 6px;
        text-indent: -8px;
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
                    <a href="/privacy">개인정보 보호정책</a>
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

                <FooterTextWrapper>
                    <div style={{ flex: 1 }}>
                        <FooterTop>
                            <FooterBrand>Hello, Travelogic!</FooterBrand>
                            <FooterCreators>만든사람 : 양서진, 이슬기, 정상협</FooterCreators>
                        </FooterTop>
                        <FooterInfoRow>
                            <div>고객센터 : 1588-1234 (평일 09:00~18:00)</div>
                            <div>주소 : 각자 집 어딘가</div>
                            <div>사업자등록번호 : 123-45-78901</div>
                            <div>통신판매업신고번호 : 종로01-1234호</div>
                            <div>관광사업자 등록번호 : 제2025-000001호</div>
                            <div>이메일 : help@travelogic.com</div>
                            <div>대표자 : 정상협</div>
                            <div>설립일 : 2025년 3월 11일</div>
                            <div>팩스 : 02-1234-5678</div>
                        </FooterInfoRow>
                        <FooterNotice>
                            <span>※ 부득이한 사정에 의해 여행일정이 변경되는 경우 사전 동의를 받습니다.</span>
                            <span>※ Hello! Travelogic은 개별 항공권 및 일부 여행상품에 대하여 통신판매중개자의 지위를 가지며, 해당 상품의 정보 및 거래 등에 관한 책임은 판매자에게 있습니다.</span>
                            <span>
                                ※ 예금주 Hello! Travelogic가 아닌 계좌(개인, 대리점 등)로 입금하실 경우 당사에 대한 유효한 지급이 아니며, 당사는 책임지지 않습니다.<br />
                                &nbsp;&nbsp;Hello! Travelogic 가상 계좌가 아닌 다른 계좌(개인, 대리점 등)에 대한 입금 유도가 있는 경우, 반드시 입금 전에 하나투어 고객센터로 문의 / 신고 하여 주시기 바랍니다.
                            </span>
                        </FooterNotice>
                    </div>

                    <SocialIcons>
                        <FooterLogo>
                            <img
                                src="/img/logo/logo.png"
                                alt="로고"
                                onClick={() => navigate("/")}
                            />
                        </FooterLogo>
                        <a href="https://youtube.com" aria-label="Youtube" target="_blank" rel="noopener noreferrer">
                            <FaYoutube />
                        </a>
                        <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                        <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                            <FaFacebookSquare />
                        </a>
                        {/* 티스토리 아이콘 */}
                        <a href="https://www.tistory.com/" aria-label="Tistory" target="_blank" rel="noopener noreferrer">
                            <SiTistory />
                        </a>
                        {/* 네이버블로그 아이콘 */}
                        <a href="https://section.blog.naver.com/BlogHome.naver?directoryNo=0&currentPage=1&groupId=0" aria-label="Naver Blog" target="_blank" rel="noopener noreferrer">
                            <SiNaver />
                        </a>
                    </SocialIcons>
                </FooterTextWrapper>

                <FooterCopyright>
                    ⓒ 2025 Hello, Travelogic!. All rights reserved.
                </FooterCopyright>
            </FooterContent>
        </FooterContainer>
    );
}

export default FooterCom;