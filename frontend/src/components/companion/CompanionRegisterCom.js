
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
                                  //   images, // 이 prop은 직접 사용되지 않음
                                  onImageChange, // 이미지 변경 핸들러 추가
                                  imagePreviews, // 이미지 미리보기 URL 목록 추가
                                  contentTextareaRef, // ref 추가
                                  existingImages = [], // 기존 이미지 목록 추가 (기본값을 빈 배열로 설정)
                                  onRemoveExistingImage, // 기존 이미지 삭제 핸들러 추가
                                  onRemoveNewImage, // 새로 추가된 이미지 삭제 핸들러 추가
                                  isEditMode = false // 수정 모드 여부 (기본값 false)
                              }) {

    // 새로 추가된 이미지에 대한 미리보기만 필터링
    // existingImages의 길이를 기준으로 imagePreviews 배열을 슬라이스합니다.
    const newImagePreviews = imagePreviews.slice(existingImages?.length ?? 0);

    return (
        <FormWrapper>
            <Title>{isEditMode ? '게시글 수정' : '새 게시글 작성'}</Title>
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
                {(existingImages?.length > 0 || newImagePreviews?.length > 0) && (
                    <FormRow>
                        <ImagePreviewContainer>
                            {/* 기존 이미지 미리보기 */}
                            {existingImages?.map((image) => ( // image 객체 전체를 받음
                                <ImagePreviewWrapper key={`existing-${image.id}`}> {/* image.id는 파일명 등 고유값 */}
                                    <ImagePreview src={image.imageUrl} alt={`Existing image ${image.id}`} />
                                    <RemoveImageButton type="button" onClick={() => onRemoveExistingImage(image.imageUrl)}> {/* image.imageUrl 전달 */}
                                        X
                                    </RemoveImageButton>
                                </ImagePreviewWrapper>
                            ))}
                            {/* 새로 추가된 이미지 미리보기 */}
                            {newImagePreviews.map((previewUrl, index) => (
                                <ImagePreviewWrapper key={`new-preview-${index}`}>
                                    <ImagePreview src={previewUrl} alt={`New image preview ${index + 1}`} />
                                    {/*
                                        새로 추가된 이미지를 삭제할 때는 'newImages' FileList에서의 인덱스가 필요.
                                        현재 onRemoveNewImage는 해당 인덱스를 받고 있음.
                                    */}
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
                        {isEditMode ? '수정하기' : '등록하기'}
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