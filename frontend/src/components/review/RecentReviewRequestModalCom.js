import {
    ButtonGroup, CancelButton, Content,
    DoNotShow, ModalBox, ModalContainer,
    Overlay, Title, WriteButton
} from "../../style/review/StyleReviewRequest";

function RecentReviewRequestModalCom({ order, onClose, onDoNotShowToday, onDoNotShowThisOrder }){
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
                        <CancelButton onClick={onDoNotShowThisOrder}>다신 안보기</CancelButton>
                    </ButtonGroup>
                </ModalBox>
            </ModalContainer>
        </Overlay>
    </>)
}
export default RecentReviewRequestModalCom;