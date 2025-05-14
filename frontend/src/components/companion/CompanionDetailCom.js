import React, { useState } from "react"; // useState 추가
import {
    CompanionDetailWrapper,
    BackButton,
    DetailTitle,
    MetaInfo,
    AuthorName,
    CreatedAt,
    ViewCount,
    DescArea,
    EditButton,
    DeleteButton,
    CommentSection,
    CommentTitle,
    CommentList,
    CommentItem as StyledCommentItem, // StyledComponent 이름 변경
    CommentContent as StyledCommentContent, // StyledComponent 이름 변경
    CommentMeta as StyledCommentMeta, // StyledComponent 이름 변경
    CommentAuthor as StyledCommentAuthor, // StyledComponent 이름 변경
    CommentDate as StyledCommentDate, // StyledComponent 이름 변경
    NoComment,
    ModifiedAt,
    CommentFormWrapper, // 댓글 폼 wrapper 임포트
    CommentTextArea,    // 댓글 입력 필드 임포트
    SubmitButton,       // 댓글 등록 버튼 임포트
    LoginPrompt,        // 로그인 안내 메시지 임포트
    CommentActions,     // 댓글 액션 버튼 wrapper 임포트
    ActionButton,       // 댓글 액션 버튼 임포트
    EditForm,           // 댓글 수정 폼 임포트
    EditTextArea,       // 댓글 수정 입력 필드 임포트
    SaveButton,         // 댓글 수정 저장 버튼 임포트
    CancelButton,        // 댓글 수정 취소 버튼 임포트
    CommentPagingWrapper, // 페이징 Wrapper 임포트
    CommentPagingButton // 페이징 버튼 임포트
} from "../../style/companion/CompanionDetailStyle";
import { useNavigate } from "react-router-dom";

const DEFAULT_PROFILE_IMAGE = "/img/default-profile.jpg";
const COMMENTS_PER_PAGE = 10; // 페이지당 댓글 수 상수 정의


function CompanionDetailCom({
                                companion,
                                canEdit,
                                canDelete,
                                onUpdateClick,
                                onDeleteClick,
                                isLoggedIn,
                                currentMemberCode,
                                currentUserRoles,
                                onCommentSubmit,
                                onCommentUpdate,
                                onCommentDelete
                            }) {
    const navigate = useNavigate();
    const [commentContent, setCommentContent] = useState(''); // 댓글 작성 폼 상태
    const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글 ID 상태
    const [editedCommentContent, setEditedCommentContent] = useState(''); // 수정 중인 댓글 내용 상태
    const [currentCommentPage, setCurrentCommentPage] = useState(0); // 현재 댓글 페이지 상태 추가


    const handleBackClick = () => {
        navigate("/community/companion"); // 목록 페이지 경로로 이동
    };

    const handleCommentFormSubmit = (e) => {
        e.preventDefault();
        if (commentContent.trim() === '') {
            alert('댓글 내용을 입력해주세요.');
            return;
        }
        onCommentSubmit(commentContent);
        setCommentContent(''); // 입력 필드 초기화
    };

    const handleEditClick = (comment) => {
        setEditingCommentId(comment.companionCommentId);
        setEditedCommentContent(comment.companionCommentContent);
    };

    const handleCancelClick = () => {
        setEditingCommentId(null);
        setEditedCommentContent('');
    };

    const handleSaveClick = (commentId) => {
        if (editedCommentContent.trim() === '') {
            alert('댓글 내용은 비어 있을 수 없습니다.');
            return;
        }
        onCommentUpdate(commentId, editedCommentContent);
        setEditingCommentId(null); // 수정 완료 후 폼 닫기
        setEditedCommentContent('');
    };

    const handleDeleteClick = (commentId) => {
        onCommentDelete(commentId);
    };


    if (!companion) {
        return <CompanionDetailWrapper>게시글 정보를 불러올 수 없습니다.</CompanionDetailWrapper>;
    }

    // 최종 수정일 포맷팅
    const modifiedDate = companion.companionModifiedAt ? new Date(companion.companionModifiedAt).toLocaleDateString() : '없음';

    // 댓글 페이징 로직
    const totalComments = companion.comments ? companion.comments.length : 0;
    const totalCommentPages = Math.ceil(totalComments / COMMENTS_PER_PAGE);
    const startIndex = currentCommentPage * COMMENTS_PER_PAGE;
    const endIndex = startIndex + COMMENTS_PER_PAGE;
    const currentComments = companion.comments ? companion.comments.slice(startIndex, endIndex) : [];

    const handleCommentPageChange = (pageNumber) => {
        setCurrentCommentPage(pageNumber);
    };

    const renderCommentPagination = () => {
        // if (totalCommentPages <= 1) return null; // 페이지가 1개 이하일 경우 페이징 숨김
        const pages = [];
        for (let i = 0; i < totalCommentPages; i++) {
            pages.push(
                <CommentPagingButton
                    key={i}
                    onClick={() => handleCommentPageChange(i)}
                    active={currentCommentPage === i}
                >
                    {i + 1}
                </CommentPagingButton>
            );
        }
        return (
            <CommentPagingWrapper>
                <CommentPagingButton onClick={() => handleCommentPageChange(currentCommentPage - 1)} disabled={currentCommentPage === 0}>
                    이전
                </CommentPagingButton>
                {pages}
                <CommentPagingButton onClick={() => handleCommentPageChange(currentCommentPage + 1)} disabled={currentCommentPage === totalCommentPages - 1}>
                    다음
                </CommentPagingButton>
            </CommentPagingWrapper>
        );
    };


    return (
        <CompanionDetailWrapper>
            {/* 뒤로가기 버튼 */}
            <BackButton onClick={handleBackClick}>{"< 목록으로"}</BackButton>

            {/* 수정/삭제 버튼 (권한에 따라 표시) */}
            {(canEdit || canDelete) && (
                <>
                    {canEdit && <EditButton onClick={onUpdateClick}>수정</EditButton>}
                    {canDelete && <DeleteButton onClick={onDeleteClick}>삭제</DeleteButton>}
                </>
            )}

            {/* 게시물 제목 */}
            <DetailTitle>{companion.companionTitle}</DetailTitle>

            {/* 작성자, 작성일, 조회수 정보 */}
            <MetaInfo>
                {/* 프로필 이미지를 작성자 이름보다 먼저 위치 */}
                <img
                    src={companion.authorProfileImageUrl || DEFAULT_PROFILE_IMAGE}
                    alt={`${companion.authorName || '익명'} 프로필`}
                    style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                />
                <AuthorName> {companion.authorName || '익명'}</AuthorName>
                <CreatedAt>작성일: {new Date(companion.companionCreatedAt).toLocaleDateString()}</CreatedAt>
                <ModifiedAt>최종 수정일: {modifiedDate}</ModifiedAt>{/* 최종 수정일 표시 */}
                <ViewCount>조회수: {companion.companionViewCount}</ViewCount>
            </MetaInfo>


            {/* 게시물 내용 */}
            <DescArea>{companion.companionContent}</DescArea>

            {/* 댓글 섹션 */}
            <CommentSection>
                <CommentTitle>댓글</CommentTitle>

                {/* 댓글 작성 폼 */}
                <CommentFormWrapper>
                    {isLoggedIn ? (
                        <form onSubmit={handleCommentFormSubmit}>
                            <CommentTextArea
                                placeholder="댓글을 입력하세요..."
                                value={commentContent}
                                onChange={(e) => setCommentContent(e.target.value)}
                            />
                            <SubmitButton type="submit">댓글 등록</SubmitButton>
                        </form>
                    ) : (
                        <LoginPrompt>댓글을 작성하려면 로그인해주세요.</LoginPrompt>
                    )}
                </CommentFormWrapper>

                {/* 댓글 목록 표시 */}
                {currentComments.length > 0 ? ( // currentComments를 사용
                    <CommentList>
                        {currentComments.map(comment => {
                            // 수정/삭제 권한 확인
                            const isAuthor = isLoggedIn && comment.authorMemberCode === currentMemberCode;
                            const isAdmin = isLoggedIn && currentUserRoles.includes("ROLE_ADMIN");
                            const canCommentEdit = isAuthor; // 댓글 수정은 작성자만 가능
                            const canCommentDelete = isAuthor || isAdmin; // 댓글 삭제는 작성자 또는 관리자만 가능

                            // 댓글 최종 수정일 포맷팅
                            const commentModifiedDate = comment.companionCommentModifiedAt ? new Date(comment.companionCommentModifiedAt).toLocaleDateString() : '없음';

                            return (
                                <StyledCommentItem key={comment.companionCommentId}>
                                    {/* 프로필 이미지, 작성자 이름, 최종 수정일, 작성일 */}
                                    <StyledCommentMeta>
                                        <img
                                            src={comment.authorProfileImageUrl || DEFAULT_PROFILE_IMAGE} // 댓글 작성자의 프로필 이미지 사용
                                            alt={`${comment.authorName || '익명'} 프로필`}
                                            style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                                        />
                                        <StyledCommentAuthor> {comment.authorName || '익명'}</StyledCommentAuthor>
                                        <StyledCommentDate>작성일: {new Date(comment.companionCommentCreatedAt).toLocaleDateString()}</StyledCommentDate> {/* 댓글 작성일 표시 */}
                                        <StyledCommentDate>최종 수정일: {commentModifiedDate}</StyledCommentDate> {/* 댓글 최종 수정일 표시 */}
                                    </StyledCommentMeta>
                                    {/* 댓글 내용 */}
                                    {editingCommentId === comment.companionCommentId ? (
                                        <EditForm onSubmit={(e) => {
                                            e.preventDefault();
                                            handleSaveClick(comment.companionCommentId);
                                        }}>
                                            <EditTextArea
                                                value={editedCommentContent}
                                                onChange={(e) => setEditedCommentContent(e.target.value)}
                                            />
                                            <SaveButton type="submit">저장</SaveButton>
                                            <CancelButton type="button" onClick={handleCancelClick}>취소</CancelButton>
                                        </EditForm>
                                    ) : (
                                        <StyledCommentContent>{comment.companionCommentContent}</StyledCommentContent>
                                    )}

                                    {/* 댓글 수정/삭제 버튼 */}
                                    {(canCommentEdit || canCommentDelete) && (
                                        <CommentActions>
                                            {/* 수정 버튼을 삭제 버튼 왼쪽에 배치하고 작성자에게만 보이도록 조건 추가 */}
                                            {canCommentEdit && <ActionButton onClick={() => handleEditClick(comment)}>수정</ActionButton>}
                                            {canCommentDelete && <ActionButton onClick={() => handleDeleteClick(comment.companionCommentId)}>삭제</ActionButton>}
                                        </CommentActions>
                                    )}
                                </StyledCommentItem>
                            );
                        })}
                    </CommentList>
                ) : (
                    <NoComment>댓글이 없습니다.</NoComment>
                )}
                {/* 댓글 페이징 */}
                {renderCommentPagination()}
            </CommentSection>
        </CompanionDetailWrapper>
    );
}
export default CompanionDetailCom;