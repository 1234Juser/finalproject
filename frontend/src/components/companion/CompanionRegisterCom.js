import React from 'react';
import {
    FormWrapper, Title, StyledForm, Label, StyledInput, StyledTextarea,
    SubmitButton, CancelButton, FormRow, ErrorMessage, CheckboxWrapper, CheckboxInput, CheckboxLabel
} from '../../style/companion/CompanionRegisterStyle'; // Checkbox 관련 스타일 컴포넌트 import 가정

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
                                  isNotice, // 공지사항 상태
                                  onIsNoticeChange, // 공지사항 변경 핸들러
                                  isAdmin, // 관리자 여부
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

                {isAdmin && ( // 관리자일 경우에만 공지사항 체크박스 표시
                    <FormRow>
                        <CheckboxWrapper>
                            <CheckboxInput
                                type="checkbox"
                                id="isNotice"
                                checked={isNotice}
                                onChange={onIsNoticeChange}
                            />
                            <CheckboxLabel htmlFor="isNotice">공지사항으로 등록</CheckboxLabel>
                        </CheckboxWrapper>
                    </FormRow>
                )}

                <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
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