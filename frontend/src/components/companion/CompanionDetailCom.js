import React from "react";
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
    CommentItem,
    CommentContent,
    CommentMeta,
    CommentAuthor,
    CommentDate,
    NoComment,
    ModifiedAt // ModifiedAt 스타일 임포트 추가
} from "../../style/companion/CompanionDetailStyle";
import { useNavigate } from "react-router-dom";

const DEFAULT_PROFILE_IMAGE = "/img/default-profile.jpg";


function CompanionDetailCom({ companion, canEdit, canDelete, onUpdateClick, onDeleteClick }) {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate("/community/companion"); // 목록 페이지 경로로 이동
    };

    if (!companion) {
        return <CompanionDetailWrapper>게시글 정보를 불러올 수 없습니다.</CompanionDetailWrapper>;
    }

    // 최종 수정일 포맷팅
    const modifiedDate = companion.companionModifiedAt ? new Date(companion.companionModifiedAt).toLocaleDateString() : '없음';

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

            {/* 댓글 목록 표시 (CompanionDetailDTO에 comments 필드가 있다면) */}
            {/*<CommentSection>
                <CommentTitle>댓글</CommentTitle>
                {companion.comments && companion.comments.length > 0 ? (
                    <CommentList>
                        {companion.comments.map(comment => (
                            <CommentItem key={comment.commentId}>
                                <CommentContent>{comment.commentContent}</CommentContent>
                                <CommentMeta>
                                    <CommentAuthor>작성자: {comment.authorName || '익명'}</CommentAuthor>
                                    <CommentDate>작성일: {new Date(comment.commentCreatedAt).toLocaleDateString()}</CommentDate>
                                </CommentMeta>
                            </CommentItem>
                        ))}
                    </CommentList>
                ) : (
                    <NoComment>댓글이 없습니다.</NoComment>
                )}
            </CommentSection>*/}

            {/* TODO: 댓글 작성 폼 추가 */}

        </CompanionDetailWrapper>
    );
}

export default CompanionDetailCom;