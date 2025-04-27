import styled from 'styled-components';

const HeaderWrapBlock = styled.div`
    //top: 0;
    // left: 400px;
    // right: 400px;
    position: relative;
    padding: 0 100px;
    //z-index : 1;    // 스크롤 내렸을 때 메인화면인 헤드 안으로 들어가게
    background-color : white;   // 헤더에 색깔 넣으면 위로 올라간 메인화면은 색깔에 가려져 안보임
    // width: calc(100% - 800px);
    border-bottom : 1px solid rgba( 0, 0, 0, 0.1 );
    @media (max-width: 1440px) {
        left: 300px;  /* 화면이 1440px보다 작으면 좌측 공백을 300px로 줄임 */
        right: 300px; /* 우측 공백을 300px로 줄임 */
        width: calc(100% - 600px); /* 600px만큼 공백을 줄임 */
    }

    @media (max-width: 1024px) {
        left: 150px;  /* 화면이 1024px보다 작으면 좌측 공백을 150px로 줄임 */
        right: 150px; /* 우측 공백을 150px로 줄임 */
        width: calc(100% - 300px); /* 300px만큼 공백을 줄임 */
    }

    @media (max-width: 768px) {
        left: 50px;   /* 화면이 768px보다 작으면 좌측 공백을 50px로 줄임 */
        right: 50px;  /* 우측 공백을 50px로 줄임 */
        width: calc(100% - 100px); /* 100px만큼 공백을 줄임 */
    }

    @media (max-width: 480px) {
        left: 0;      /* 화면이 480px보다 작으면 좌측 공백을 0으로 설정 */
        right: 0;     /* 우측 공백을 0으로 설정 */
        width: 100%;  /* 공백을 완전히 없애고, 너비를 100%로 설정 */
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