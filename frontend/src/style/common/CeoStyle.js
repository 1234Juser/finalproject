import styled, { keyframes } from 'styled-components';

// 텍스트 등장 애니메이션
const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const CeoContainer = styled.div`
    display: flex;
    flex-direction: row; // 기본적으로 가로 정렬
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    max-width: 1200px;
    margin: 0 auto;
    gap: 40px; // 이미지와 텍스트 사이 간격

    @media (max-width: 768px) {
        flex-direction: column; // 모바일에서는 세로 정렬
        text-align: center;
    }
`;

export const CeoImageWrapper = styled.div`
    flex-shrink: 0;
    width: 100%;
    max-width: 400px; // 이미지 최대 너비 조정
    height: auto;
    display: flex;
    justify-content: center;
    order: 2; // 이미지의 순서를 뒤로 (오른쪽으로)

    @media (max-width: 768px) {
        order: 1; // 모바일에서는 이미지의 순서를 앞으로
    }
`;

export const CeoTextWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 22px; // 문단 사이 간격
    width: 100%;
    max-width: 700px; // 텍스트 영역의 최대 너비
    order: 1; // 텍스트의 순서를 앞으로 (왼쪽으로)

    @media (max-width: 768px) {
        order: 2; // 모바일에서는 텍스트의 순서를 뒤로
    }
`;

export const CeoParagraph = styled.span`
    font-size: 18px;
    line-height: 1.6;
    color: #555;
    opacity: 0; // 초기 상태를 투명하게 설정
    animation: ${fadeIn} 1s forwards; // 애니메이션 적용
    animation-delay: ${props => props.delay || '0s'}; // 딜레이 속성
`;

export const CeoTitle = styled(CeoParagraph)`
    font-size: 28px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
`;

export const CeoSignature = styled(CeoParagraph)`
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-top: 20px;
    text-align: right;
`;

// 강조 텍스트 스타일 추가
export const HighlightText = styled.span`
    color: #28a745; // 초록색
    font-weight: bold; // 선택적으로 볼드체 추가
`;