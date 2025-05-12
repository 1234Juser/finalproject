import React from "react";

function CompanionDetailCom({ companion, canEdit, canDelete, onUpdateClick, onDeleteClick }) {
    return (
        <div>
            <h2>{companion.companionTitle}</h2>
            <p>작성자: {companion.authorName || '익명'}</p>
            <p>작성일: {new Date(companion.companionCreatedAt).toLocaleDateString()}</p>
            <p>조회수: {companion.companionViewCount}</p>
            <div>{companion.companionContent}</div> {/* 내용을 div로 감싸서 줄바꿈 등이 적용되도록 */}

            {/* 댓글 목록 표시 (CompanionDetailDTO에 comments 필드가 있다면) */}
            {/* <h3>댓글</h3>
            {companion.comments && companion.comments.length > 0 ? (
                <ul>
                    {companion.comments.map(comment => (
                        <li key={comment.commentId}>
                            <p>{comment.commentContent}</p>
                            <p>작성자: {comment.authorName || '익명'}</p>
                            <p>작성일: {new Date(comment.commentCreatedAt).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>댓글이 없습니다.</p>
            )} */}

            {/* 수정/삭제 버튼 (권한에 따라 표시) */}
            {(canEdit || canDelete) && ( // 수정 또는 삭제 권한이 있으면 버튼 컨테이너 표시
                <div>
                    {canEdit && <button onClick={onUpdateClick}>수정</button>}
                    {canDelete && <button onClick={onDeleteClick}>삭제</button>}
                </div>
            )}

            {/* TODO: 댓글 작성 폼 추가 */}

        </div>
    );
}

export default CompanionDetailCom;