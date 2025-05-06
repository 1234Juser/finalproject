import React from "react";
import {
    RegisterContainer,
    RegisterTitle,
    Label,
    Input,
    Textarea,
    BtnRow,
    MainBtn,
    CancelBtn,
    FieldWrap
} from "../../style/faq/FagRegisterStyle";

function FaqRegisterCom({ title, setTitle, content, setContent, onSubmit, onCancel }) {
    return (
        <RegisterContainer>
            <RegisterTitle>FAQ 등록</RegisterTitle>
            <form onSubmit={onSubmit} autoComplete="off">
                <FieldWrap>
                    <Label htmlFor="faq-title">제목</Label>
                    <Input
                        type="text"
                        id="faq-title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        placeholder="자주 묻는 질문의 제목을 입력하세요."
                        maxLength={60}
                    />
                </FieldWrap>
                <FieldWrap>
                    <Label htmlFor="faq-content">내용</Label>
                    <Textarea
                        id="faq-content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        required
                        rows={6}
                        placeholder="여기에 답변 및 안내 내용을 입력해 주세요."
                        maxLength={1000}
                    />
                </FieldWrap>
                <BtnRow>
                    <MainBtn type="submit">등록하기</MainBtn>
                    <CancelBtn type="button" onClick={onCancel}>취소</CancelBtn>
                </BtnRow>
            </form>
        </RegisterContainer>
    );
}

export default FaqRegisterCom;