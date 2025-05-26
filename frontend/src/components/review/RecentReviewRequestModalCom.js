import styled from 'styled-components';

function RecentReviewRequestModalCom({ order, onClose, onDoNotShowToday }){
    return(
    <>
        <Overlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ModalBox>
                <DoNotShow onClick={onDoNotShowToday}>오늘은 다시 보지 않기</DoNotShow>
                    <Title>리뷰를 작성해 주세요!</Title>
                    <Content>
                        <p><strong>{order.productTitle}</strong> 여행은 어떠셨나요?</p>
                        <p>고객님의 소중한 리뷰는 다른 여행자에게 큰 도움이 됩니다.</p>
                    </Content>
                    <ButtonGroup>
                        <WriteButton onClick={() => {
                            onClose();
                            window.location.href = `/review/write/${order.orderCode}`; // 리뷰 작성 페이지로 이동
                        }}>
                            리뷰 작성하기
                        </WriteButton>
                        <CancelButton onClick={onClose}>나중에 할게요</CancelButton>
                    </ButtonGroup>
                </ModalBox>
            </ModalContainer>
        </Overlay>
    </>)
}
export default RecentReviewRequestModalCom;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DoNotShow = styled.p`
    position: absolute;
    top: 0.75rem;
    right: 1rem;
    font-size: 0.8rem;
    color: #999;
    cursor: pointer;
    margin: 0;

    &:hover {
        color: #333;
        text-decoration: underline;
    }
`;

const ModalBox = styled.div`
    position: relative;
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    width: 90%;
    max-width: 420px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    z-index: 1001;
`;

const Title = styled.h2`
  margin-top: 0;
  font-size: 1.5rem;
  text-align: center;
`;

const Content = styled.div`
  margin: 1rem 0;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const WriteButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  flex: 1;
`;

const CancelButton = styled.button`
  background-color: #ccc;
  color: #333;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  flex: 1;
`;