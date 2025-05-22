import React, { useEffect, useRef } from 'react';
import {
    CompanyContainer,
    LogoWrapper,
    CompanyTextWrapper,
    CompanyTitle,
    CompanyParagraph,
    HighlightText,
    HelloText,
    SecondPageContainer,
    HelloLogoWrapper,
    GlobalStyle
} from '../../style/common/CompanyStyle';

function CompanyCom(){
    const companyContainerRef = useRef(null);
    const secondPageContainerRef = useRef(null);

    useEffect(() => {
        const observerOptions = {
            root: null, // 뷰포트를 기준으로
            rootMargin: '0px',
            threshold: 0.1 // 10% 이상 보이면 콜백 실행
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target); // 한 번 애니메이션 실행 후 관찰 중지
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // ref.current 값을 지역 변수에 저장
        const currentCompanyContainer = companyContainerRef.current;
        const currentSecondPageContainer = secondPageContainerRef.current;

        if (currentCompanyContainer) {
            observer.observe(currentCompanyContainer);
        }
        if (currentSecondPageContainer) {
            observer.observe(currentSecondPageContainer);
        }

        return () => {
            if (currentCompanyContainer) {
                observer.unobserve(currentCompanyContainer);
            }
            if (currentSecondPageContainer) {
                observer.unobserve(currentSecondPageContainer);
            }
        };
    }, []); // 의존성 배열이 비어있으므로 컴포넌트가 마운트될 때 한 번만 실행됩니다.

    return(
        <>
            <GlobalStyle />
            <CompanyContainer ref={companyContainerRef}>
                <LogoWrapper>
                    <img src="/static/img/logo/logo.png" alt="Company Logo" style={{ width: '100%' }} />
                </LogoWrapper>
                <CompanyTextWrapper>
                    <CompanyTitle className="CompanyTitle">
                        여행의 시작을 알리는 인사와 <br></br>여행로직을 짜는 개발자들
                    </CompanyTitle>
                    <CompanyParagraph className="CompanyParagraph">
                        <HighlightText>단순한 여행이 아닌, 여행을 기획하고 떠나는 모든 여정</HighlightText>을<br></br> 체계적이고 감성적으로 풀어내기 위해 탄생한 이름입니다.
                    </CompanyParagraph>
                    <CompanyParagraph className="CompanyParagraph">
                        <HighlightText>Hello</HighlightText>는 여행의 시작을 알리는 인사이며, <br></br><HighlightText>Travleogic</HighlightText>은 ‘Travel’과 ‘Logic’의 조합으로
                        <br></br><HighlightText>여행을 보다 체계적으로 설계</HighlightText>하고, <br></br><HighlightText>사용자의 감성과 니즈를 반영</HighlightText>
                        한 맞춤형 여행 플랫폼을 지향합니다.
                    </CompanyParagraph>
                </CompanyTextWrapper>
            </CompanyContainer>

            {/* 스크롤 시 나타나는 다음 페이지 섹션 */}
            <SecondPageContainer ref={secondPageContainerRef}>
                <HelloLogoWrapper className="HelloLogoWrapper">
                    <img src="/static/img/logo/Hello.png" alt="Company Logo" style={{ width: '100%' }} />
                </HelloLogoWrapper>
                <CompanyTextWrapper>
                    <CompanyParagraph className="CompanyParagraph">
                        여행의 복잡함은 우리가 해결합니다. <br></br>당신은 그냥 여행을 하는 설레는 마음으로 <HelloText className="HelloText">“Hello”</HelloText>만 해주세요.
                    </CompanyParagraph>
                </CompanyTextWrapper>
            </SecondPageContainer>
        </>
    )
}
export default CompanyCom;