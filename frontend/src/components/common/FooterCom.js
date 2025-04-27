import React from "react";
import {
  FooterContainer,
  FooterContent,
  FooterText,
  FooterLinks,
} from "../../style/components/StyleFooter";

function FooterCom() {
  return (
    <FooterContainer>
      <FooterContent>

        <FooterLinks>
          <a href="/about">회사 소개</a>
          <a href="/terms">이용 약관</a>
          <a href="/privacy">개인정보 보호정책</a>
            <a href="/faq">자주 묻는 질문 (FAQ)</a>
            <a href="/support">고객 지원</a>
            <a href="/contact">문의하기</a>
            <a href="/careers">채용 정보</a>
            <a href="/blog">블로그</a>
            <a href="/sitemap">사이트맵</a>

        </FooterLinks>
        <FooterText>
            <span>Hello, Travelogic!</span>
            <span>만든사람 : 양서진, 이슬기, 정상협</span>
            <span>주소 : 각자 집 어딘가</span>
            <span>사업자등록번호 : 123-45-78901</span>
            <span>통신판매업신고번호 : 종로01-1234호</span>
            <span>관광사업자 등록번호 : 제2025-000001호</span>

            <span>
            ⓒ 2025 Hello, Travelogic!. All rights reserved.
            </span>
        </FooterText>
      </FooterContent>
    </FooterContainer>
  );
}

export default FooterCom;