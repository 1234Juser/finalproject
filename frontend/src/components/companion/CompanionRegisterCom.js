import React from 'react';
import {
    FormWrapper,
    Title,
    StyledForm,
    Label,
    StyledInput,
    StyledTextarea,
    SubmitButton,
    CancelButton,
    FormRow,
    ErrorMessage,
    CheckboxWrapper,
    CheckboxInput,
    CheckboxLabel,
    FileInputLabel,
    ImagePreviewContainer, ImagePreview,
    ImagePreviewWrapper, // 이미지 미리보기 wrapper 추가
    RemoveImageButton // 이미지 삭제 버튼 추가

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
                                  images, // 이미지 파일 목록 추가
                                  onImageChange, // 이미지 변경 핸들러 추가
                                  imagePreviews, // 이미지 미리보기 URL 목록 추가
                                  contentTextareaRef, // ref 추가
                                  existingImages = [], // 기존 이미지 목록 추가 (기본값을 빈 배열로 설정)
                                  onRemoveExistingImage, // 기존 이미지 삭제 핸들러 추가
                                  onRemoveNewImage, // 새로 추가된 이미지 삭제 핸들러 추가
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
                        ref={contentTextareaRef} // ref 연결
                    />
                    {contentError && <ErrorMessage>{contentError}</ErrorMessage>}
                </FormRow>

                {/* 이미지 업로드 관련 필드 추가 */}
                <FormRow>
                    <Label htmlFor="images">이미지 첨부</Label>
                    <FileInputLabel htmlFor="images">
                        파일 선택
                        <input
                            type="file"
                            id="images"
                            name="images"
                            accept="image/*"
                            multiple
                            onChange={onImageChange}
                            style={{ display: 'none' }} // 기본 파일 입력 숨기기
                        />
                    </FileInputLabel>
                </FormRow>
                {/* 이미지 미리보기 */}
                {(existingImages?.length > 0 || imagePreviews?.length > 0) && (
                    <FormRow>
                        <ImagePreviewContainer>
                            {/* 기존 이미지 미리보기 */}
                            {existingImages?.map((image, index) => (
                                <ImagePreviewWrapper key={`existing-${image.id}`}>
                                    <ImagePreview src={image.imageUrl} alt={`Existing image ${index + 1}`} />
                                    <RemoveImageButton onClick={() => onRemoveExistingImage(image.id)}>
                                        X
                                    </RemoveImageButton>
                                </ImagePreviewWrapper>
                            ))}
                            {/* 새로 추가된 이미지 미리보기 */}
                            {imagePreviews.filter((preview, index) => index >= (existingImages?.length ?? 0)).map((preview, index) => (
                                <ImagePreviewWrapper key={`new-${index}`}>
                                    <ImagePreview src={preview} alt={`New image preview ${index + 1}`} />
                                    <RemoveImageButton type="button" onClick={() => onRemoveNewImage(index)}>
                                        X
                                    </RemoveImageButton>
                                </ImagePreviewWrapper>
                            ))}
                        </ImagePreviewContainer>
                    </FormRow>
                )}


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