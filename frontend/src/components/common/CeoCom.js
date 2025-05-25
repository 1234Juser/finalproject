import React from "react";
import {
    CeoContainer,
    CeoImageWrapper,
    CeoTextWrapper,
    CeoTitle,
    CeoParagraph,
    CeoSignature,
    HighlightText
} from '../../style/common/CeoStyle'; // CeoStyle에서 필요한 컴포넌트들을 임포트

function CeoCom(){
    return(
        <CeoContainer>
            <CeoImageWrapper>
                <img src="/static/img/logo/ceo.png" alt="Company Logo" style={{ width: '100%', maxWidth: '800px', height: 'auto' }} />
            </CeoImageWrapper>

            <CeoTextWrapper>
                <CeoTitle delay="0.5s">CEO 한마디</CeoTitle>
                <CeoParagraph delay="0.7s">여러나라를 여행을 하며 여행의 즐거움을 혼자 간직하기보다, <HighlightText>누군가와 여행의 즐거움을 공유</HighlightText>했을때
                    그것이 저에게는 더 큰 즐거움으로 다가왔습니다.</CeoParagraph>
                <CeoParagraph delay="0.9s">사람들이 좋아하는 여행 사이트, 여행 커뮤니티를 만들고,  그곳에서 <HighlightText>고객들에게 더 나은 대안과 감성적인 여행후기, 다양한 경험을 제공하며,
                    고객들이 공감하고 기뻐했을때</HighlightText> 그것이 저에게는 큰 행복으로 느껴졌습니다.</CeoParagraph>
                <CeoParagraph delay="1.1s">경제적인 자유보다 이러한 가치가 실현될때 더 큰 즐거움과 삶의 의미를 느끼기에,
                     <HighlightText> 단순한 여행이 아닌 여행을 기획하고 떠나는 모든 여정을 체계적이면서도 감성적으로 풀어내어,
                        그 과정을 고객의 삶과 함께하여 행복을 만들어가는 동반자 역할</HighlightText>을 하도록 하겠습니다.</CeoParagraph>
                <CeoSignature delay="1.3s">CEO J</CeoSignature>
            </CeoTextWrapper>
        </CeoContainer>
    )
}
export default CeoCom;