import styled from 'styled-components';

const HeaderWrapBlock = styled.div`
    position: relative; // 내부 absolute 요소들의 기준점 역할 유지 가능
    background-color: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%; // 항상 전체 가로 너비를 차지하도록 설정
    box-sizing: border-box; // padding과 border가 width 계산에 포함되도록 함

    // 기본 데스크톱 패딩 (1440px 초과 시)
    // 기존 padding: 0 100px; 을 사용하거나, 가장 큰 화면 기준으로 설정합니다.
    // 여기서는 1440px 분기점 바로 위를 기준으로 설정하거나, 일관된 값을 사용합니다.
    // 예시로, 가장 넓은 화면에서는 양쪽 100px 패딩을 기본으로 가정하겠습니다.
    padding: 0 100px;

    // z-index: 1; // 필요에 따라 주석 해제하여 사용 (예: 스크롤 시 다른 요소와의 관계)

    @media (max-width: 1440px) {
        // 화면 너비 1440px 이하: 기존 left/right 300px은 매우 넓은 여백입니다.
        // SearchContainer 등 내부 요소 패딩과 중복되지 않도록 적절히 조정합니다.
        // 여기서는 기존 의도(양쪽 큰 여백)를 살리되, 과도하지 않게 설정합니다.
        // 예: 양쪽 80px 패딩 (데스크톱 헤더/네비 패딩보다 넓게 설정)
        padding: 0 80px;
    }

    @media (max-width: 1024px) {
        // 화면 너비 1024px 이하 (태블릿 및 작은 데스크톱): 기존 left/right 150px 참고
        // 헤더/네비의 패딩(24px~32px)을 고려하여 일관성 있게 또는 약간 더 넓게 설정합니다.
        padding: 0 40px;
    }

    @media (max-width: 767px) { // 기존 768px 분기점과 거의 동일 (모바일)
        // 화면 너비 767px 이하 (모바일): 기존 left/right 50px 참고
        // 헤더/네비의 모바일 패딩(16px)과 유사하게 설정합니다.
        padding: 0 20px;
    }

    @media (max-width: 480px) {
        // 화면 너비 480px 이하 (작은 모바일): 기존 left/right 0, width 100% 참고
        // 거의 화면 끝까지 콘텐츠가 오도록 패딩을 최소화합니다.
        padding: 0 15px;
    }
`;


const StyledWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: calc(100%);  // 좌우 400px씩 공백
    margin: 0 auto;             // 중앙 정렬
    position: relative;
    background-color : #fbeff1;
`;


const StyleContentBlock = styled.div`
    width: calc(100% - 1000px);
    position : absolute;
    top : 320px;
    background-color : #fbeff1;
    flex: 1; // 가변 너비
    padding: 20px;
    display: flex;
    flex-direction: column;
`;
const StyleContentWrap = styled.div`
    width : 1100px;
    margin : 0 auto;
`;
const ProductTitle = styled.h2`
    text-align : center;
    color : chocolate;
`;
const ProductList = styled.div`
    display : flex;
    flex-wrap : wrap;  // 해당 태그에 대한 길이 보장 가능
`;
// (총길이 - 여백수 * 여백사이즈) / 이미지 수 = 각각의 이미지 width값
// (110 - 3 *30) / 4 = 260px
const ProductListBox = styled.div`
    width : 252.5px;
    margin-right : 30px;
    // 마지막 요소에 대해서만 한정하여 조건걸기
    &:nth-child(4n) {margin-right : 0;}
    margin-top : 30px;
    border : 1px solid #ccc;
    border-radius : 5px;
    box-shadow : 0 0 5px rgba(0, 0, 0, 0.1);    // 음영효과
`;
const ProductImg = styled.img`
    width : 100%;
`;
const ProductName = styled.h3`
    font-size : 20px;
    text-align : center;
    width : 50%;
    margin : auto;
    padding : 10px 0;
    border-bottom : 1px solid gray;
`;
const ProductContext = styled.p`
    font-size : 15px;
    margin-left : 5px;
    margin-right : 5px;
`;
const ProductPrice = styled.p`
    font-size : 15px;
    margin-right : 5px;
    color : #007bff;
    text-align : right;
`;
export { HeaderWrapBlock, StyledWrapper, StyleContentBlock, StyleContentWrap, ProductTitle, ProductList, ProductListBox, ProductImg, ProductName, ProductContext, ProductPrice };