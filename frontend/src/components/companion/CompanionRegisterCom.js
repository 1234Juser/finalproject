import React from 'react';
import {
    FormWrapper, Title, StyledForm, Label, StyledInput, StyledTextarea,
    SubmitButton, CancelButton, FormRow, ErrorMessage
} from '../../style/companion/CompanionRegisterStyle';

function CompanionRegisterCom({
                                  title,
                                  content,
                                  onTitleChange,
                                  onContentChange,
                                  onSubmit,
                                  onCancel,
                                  titleError,
                                  contentError,
                                  formError,
                              }) {

    return (
        <FormWrapper>
            <Title>새 게시글 작성</Title>
            {formError && <ErrorMessage>{formError}</ErrorMessage>}
            <StyledForm onSubmit={onSubmit} autoComplete="off">
                <FormRow>
                    <Label htmlFor="title">제목</Label>
                    <StyledInput
                        type="text"
                        id="title"
                        name="companionTitle"
                        value={title}
                        onChange={onTitleChange}
                        placeholder="제목을 입력하세요"
                        maxLength={50}
                        required
                    />
                    {titleError && <ErrorMessage>{titleError}</ErrorMessage>}
                </FormRow>
                <FormRow>
                    <Label htmlFor="content">내용</Label>
                    <StyledTextarea
                        id="content"
                        name="companionContent"
                        value={content}
                        onChange={onContentChange}
                        placeholder="내용을 입력하세요"
                        required
                    />
                    {contentError && <ErrorMessage>{contentError}</ErrorMessage>}
                </FormRow>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <SubmitButton type="submit" style={{ marginTop: 0, width: "50%" }}>
                        등록하기
                    </SubmitButton>
                    <CancelButton type="button" style={{ width: "50%" }} onClick={onCancel}>
                        취소하기
                    </CancelButton>
                </div>
            </StyledForm>
        </FormWrapper>
    );
}
export default CompanionRegisterCom;