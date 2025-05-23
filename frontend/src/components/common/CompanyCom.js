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
    ThirdPageContainer,
    GlobalStyle,
    LogoWrapper2,
    CompanyParagraph2,
    FirstParagraphOfThirdPage // FirstParagraphOfThirdPage 임포트
} from '../../style/common/CompanyStyle';

function CompanyCom(){
    const companyContainerRef = useRef(null);
    const secondPageContainerRef = useRef(null);
    const thirdPageContainerRef = useRef(null); // 세 번째 페이지 참조 추가

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
        const currentThirdPageContainer = thirdPageContainerRef.current; // 세 번째 페이지 참조 가져오기

        if (currentCompanyContainer) {
            observer.observe(currentCompanyContainer);
        }
        if (currentSecondPageContainer) {
            observer.observe(currentSecondPageContainer);
        }
        if (currentThirdPageContainer) { // 세 번째 페이지 관찰 시작
            observer.observe(currentThirdPageContainer);
        }

        return () => {
            if (currentCompanyContainer) {
                observer.unobserve(currentCompanyContainer);
            }
            if (currentSecondPageContainer) {
                observer.unobserve(currentSecondPageContainer);
            }
            if (currentThirdPageContainer) { // 세 번째 페이지 관찰 중지
                observer.unobserve(currentThirdPageContainer);
            }
        };
    }, []);

    return(
        <>
            <GlobalStyle />
            <CompanyContainer ref={companyContainerRef}>
                <LogoWrapper>
                    <img src="/static/img/logo/logo.png" alt="Company Logo" style={{ width: '100%', maxWidth: '800px', height: 'auto' }} />
                </LogoWrapper>
                <CompanyTextWrapper style={{ marginTop: '-100px' }}>
                    <CompanyTitle className="CompanyTitle">
                        여행의 시작을 알리는 인사와 <br></br>여행로직을 짜는 개발자들
                    </CompanyTitle>
                    <CompanyParagraph className="CompanyParagraph">
                        단순한 여행이 아닌, 여행을 기획하고 떠나는 <HighlightText>모든 여정을<br></br> 체계적이고 감성적으로 풀어내기 위해 탄생한 이름</HighlightText>입니다.
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
                    <CompanyParagraph className="CompanyParagraph">
                        당신의 <HelloText className="HelloText">"Hello"</HelloText> 한마디에 담긴 꿈을 현실로 만들어 줄, 가장 완벽한 여행 파트너가 여기 있습니다.
                    </CompanyParagraph>
                </CompanyTextWrapper>
            </SecondPageContainer>

            {/* 새로 추가된 세 번째 페이지 섹션 */}
            <ThirdPageContainer ref={thirdPageContainerRef}>
                <LogoWrapper2 className="ThirdPageImage">
                    <img src="/static/img/logo/companylogo.png" alt="Company Logo" style={{ width: '100%', maxWidth: '800px', height: 'auto' }} />
                </LogoWrapper2>
                <CompanyTextWrapper className="ThirdPageText" style={{ marginTop: '-150px' }}>
                    <FirstParagraphOfThirdPage className="CompanyParagraph">
                        우리가 제공하는 것
                    </FirstParagraphOfThirdPage>
                    <CompanyParagraph2 className="CompanyParagraph">
                        여행의 복잡함과 막막함은 이제 과거의 이야기입니다. <br></br><br></br>
                        <br></br><HighlightText>Hello Travleogic</HighlightText>은 <HighlightText>치밀한 시스템</HighlightText>으로 당신의 모든 여행 고민을
                        <br></br><br></br>해결합니다.
                    </CompanyParagraph2>
                    <CompanyParagraph2 className="CompanyParagraph">
                        <HighlightText>여행서비스</HighlightText> : 꿈꾸는 모든 여행이 이루어질 수 있도록 언제나 고객 중심의 여행
                        <br></br><br></br>서비스를 제공
                    </CompanyParagraph2>
                    <CompanyParagraph2 className="CompanyParagraph">
                        <HighlightText>커뮤니티</HighlightText> : 여행을 즐기는 다양한 사람들이 모여 교류 할 수 있는 커뮤니티 제공
                    </CompanyParagraph2>
                    <CompanyParagraph2 className="CompanyParagraph">
                        <HighlightText>맞춤여행</HighlightText> : 여행을 즐기는 타입에 따라 맞춤형 상품 제공
                    </CompanyParagraph2>

                </CompanyTextWrapper>
            </ThirdPageContainer>
        </>
    )
}

export default CompanyCom;