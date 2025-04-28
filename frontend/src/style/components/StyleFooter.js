import styled from 'styled-components';

// 푸터 영역 컨테이너
const FooterContainer = styled.footer`
  background-color: #333; /* 푸터 배경색 */
  color: #fff; /* 텍스트 색상 */
  padding: 20px 10px; /* 내부 여백 */
  text-align: center; /* 텍스트 가운데 정렬 */
  position: relative; 
  bottom: 0;
  width: 100%;
  margin-top: 48px;

`;

// 푸터 내용 Wrapper (가로 정렬 및 여백 설정)
const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px; /* 최대 너비 */
  margin: 0 auto; /* 중앙 정렬 */
  flex-wrap: wrap; /* 화면 크기 작아지면 개행 */
  gap: 10px;
`;

// 푸터 텍스트 섹션
const FooterText = styled.p`
  font-size: 14px; /* 텍스트 크기 */
  margin: 0;
`;

// 푸터 링크 섹션
const FooterLinks = styled.div`
  display: flex;
  gap: 15px;

  a {
    color: #fff; /* 링크 색상 */
    text-decoration: none; /* 밑줄 제거 */
    font-size: 14px;

    &:hover {
      text-decoration: underline; /* 호버 시 밑줄 추가 */
    }
  }
`;

export { FooterContainer, FooterContent, FooterText, FooterLinks };