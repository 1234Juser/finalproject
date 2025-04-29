import React from "react";
import Modal from "../common/Modal";
import {
    ModalWrap, ModalTitle, MethodRow, MethodBtn, Icon1, Icon2, CloseIconBtn, BottomCloseBtn
} from "../../style/member/FindPwMethodSelectStyle";

function FindPwMethodSelectCom({ onSelectMethod, onClose }) {
    return (
        <Modal onClose={onClose}>
            <ModalWrap>
                <CloseIconBtn onClick={onClose} aria-label="닫기"><span aria-hidden>×</span></CloseIconBtn>
                <ModalTitle>비밀번호 찾기 방식 선택</ModalTitle>
                <MethodRow>
                    <MethodBtn onClick={() => onSelectMethod("default")}>
                        <Icon1 />
                        <span>기본 정보로<br/> 찾기</span>
                    </MethodBtn>
                    <MethodBtn onClick={() => onSelectMethod("phone")}>
                        <Icon2 />
                        <span>휴대폰 인증<br/>으로 찾기</span>
                    </MethodBtn>
                </MethodRow>
                <BottomCloseBtn onClick={onClose}>닫기</BottomCloseBtn>
            </ModalWrap>
        </Modal>
    );
}

export default FindPwMethodSelectCom;
