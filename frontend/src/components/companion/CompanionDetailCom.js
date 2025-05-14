import React, { useState, useEffect } from "react";
import {
    CompanionDetailWrapper,
    BackButton,
    DetailTitle,
    MetaInfo,
    AuthorLine,
    AuthorName,
    PostStatsLine,
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
    CommentDates,
    NoComment,
    ModifiedAt,
    CommentFormWrapper,
    CommentTextArea,
    SubmitButton,
    LoginPrompt,
    CommentActions,
    ActionButton,
    EditForm,
    EditTextArea,
    SaveButton,
    CancelButton,
    CommentPagingWrapper,
    CommentPagingButton,
    FollowButton,
    FollowToggleArea,
    FollowInfoButton // FollowInfoButton 임포트
} from "../../style/companion/CompanionDetailStyle";
import { useNavigate } from "react-router-dom";
import FollowModal from "../companion/FollowModalCom";
import axios from "axios";
import { format } from 'date-fns';

const DEFAULT_PROFILE_IMAGE = "/img/default-profile.jpg";
const COMMENTS_PER_PAGE = 10;

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
    const [commentContent, setCommentContent] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentContent, setEditedCommentContent] = useState('');
    const [currentCommentPage, setCurrentCommentPage] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);

    // 모달 관련 상태 추가
    const [showFollowModal, setShowFollowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMembers, setModalMembers] = useState([]);
    const [showFollowingList, setShowFollowingList] = useState(true); // 팔로잉/팔로워 목록 전환 상태 추가

    // 게시물 작성자 팔로우 정보 토글 상태 제거
    // const [showAuthorFollowInfo, setShowAuthorFollowInfo] = useState(false);
    // 댓글 작성자 팔로우 정보 토글 상태 제거
    // const [showCommentFollowInfo, setShowCommentFollowInfo] = useState({});
    // 댓글 팔로우 상태 제거
    // const [commentFollowStatus, setCommentFollowStatus] = useState({});


    useEffect(() => {
        const checkFollowStatus = async () => {
            if (isLoggedIn && companion?.authorMemberCode && currentMemberCode !== companion.authorMemberCode) {
                try {
                    const token = localStorage.getItem("accessToken");
                    const response = await axios.get(`/follow/is-following/${companion.authorMemberCode}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    setIsFollowing(response.data);
                } catch (error) {
                    console.error("팔로우 상태 확인 실패:", error);
                    setIsFollowing(false);
                }
            } else {
                setIsFollowing(false);
            }
        };

        checkFollowStatus();
    }, [isLoggedIn, companion?.authorMemberCode, currentMemberCode]);


    const handleBackClick = () => {
        navigate("/community/companion");
    };

    const handleCommentFormSubmit = (e) => {
        e.preventDefault();
        if (commentContent.trim() === '') {
            alert('댓글 내용을 입력해주세요.');
            return;
        }
        onCommentSubmit(commentContent);
        setCommentContent('');
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
        setEditingCommentId(null);
        setEditedCommentContent('');
    };

    const handleDeleteClick = (commentId) => {
        onCommentDelete(commentId);
    };

    if (!companion) {
        return <CompanionDetailWrapper>게시글 정보를 불러올 수 없습니다.</CompanionDetailWrapper>;
    }

    const formatDate = (dateString) => {
        if (!dateString) return '알 수 없음';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return '유효하지 않은 날짜';
            }
            return format(date, 'yyyy-MM-dd HH:mm:ss');
        } catch (e) {
            console.error("날짜 형식 변환 오류:", e);
            return '날짜 형식 오류';
        }
    };

    const createdDate = formatDate(companion.companionCreatedAt);
    const modifiedDateText = companion.companionModifiedAt ? formatDate(companion.companionModifiedAt) : null;

    const totalComments = companion.comments ? companion.comments.length : 0;
    const totalCommentPages = Math.ceil(totalComments / COMMENTS_PER_PAGE);
    const startIndex = currentCommentPage * COMMENTS_PER_PAGE;
    const endIndex = startIndex + COMMENTS_PER_PAGE;
    const currentComments = companion.comments ? companion.comments.slice(startIndex, endIndex) : [];

    const handleCommentPageChange = (pageNumber) => {
        setCurrentCommentPage(pageNumber);
    };

    const renderCommentPagination = () => {
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
                <CommentPagingButton onClick={() => handleCommentPageChange(Math.max(0, currentCommentPage - 1))} disabled={currentCommentPage === 0 || totalCommentPages === 0}>
                    이전
                </CommentPagingButton>
                {pages}
                <CommentPagingButton onClick={() => handleCommentPageChange(Math.min(totalCommentPages - 1, currentCommentPage + 1))} disabled={currentCommentPage === totalCommentPages - 1 || totalCommentPages === 0}>
                    다음
                </CommentPagingButton>
            </CommentPagingWrapper>
        );
    };

    const handleFollowClick = async () => {
        if (!isLoggedIn) {
            alert("로그인 후 팔로우할 수 있습니다.");
            return;
        }

        const token = localStorage.getItem("accessToken");
        const followingMemberCode = companion.authorMemberCode;

        try {
            if (isFollowing) {
                await axios.delete(`/follow/${followingMemberCode}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                alert("언팔로우 되었습니다.");
            } else {
                await axios.post(`/follow/${followingMemberCode}`, null, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                alert("팔로우 되었습니다.");
            }
            setIsFollowing(!isFollowing); // 팔로우/언팔로우 상태를 바로 토글하여 버튼 상태 업데이트
        } catch (error) {
            console.error("팔로우/언팔로우 실패:", error);
            if (error.response?.status === 400 || error.response?.status === 409) {
                alert(error.response.data);
            } else {
                alert("팔로우/언팔로우 중 오류가 발생했습니다.");
            }
        }
    };

    // '팔로우 정보' 버튼 클릭 핸들러
    const handleShowFollowInfo = async (memberCode) => {
        if (!isLoggedIn) {
            alert("로그인 후 팔로우/팔로워 정보를 볼 수 있습니다.");
            return;
        }
        try {
            const token = localStorage.getItem("accessToken");
            // 팔로잉 목록 먼저 가져오기
            const followingResponse = await axios.get(`/follow/${memberCode}/following`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            // 팔로워 목록 가져오기
            const followerResponse = await axios.get(`/follow/${memberCode}/followers`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            // FollowModalCom에서 팔로잉 목록과 팔로워 목록을 모두 받아서 처리하도록 수정 필요
            // 여기서는 간단히 모달에 두 목록을 모두 전달하거나,
            // FollowModalCom 내부에서 목록 종류에 따라 탭 등으로 분리하는 로직 추가
            // 현재 FollowModalCom은 하나의 목록만 받으므로,
            // 임시로 팔로잉 목록만 먼저 보여주도록 설정하고, FollowModalCom 수정 필요.

            // FollowModalCom 수정 전 임시 로직: 팔로잉 목록 먼저 보여주기
            setModalTitle('팔로우 정보');
            // 모달 컴포넌트에 팔로잉 및 팔로워 목록을 모두 전달하도록 구조 변경 고려
            setModalMembers({ // 객체 형태로 팔로잉과 팔로워 목록을 함께 전달
                following: followingResponse.data,
                followers: followerResponse.data
            });
            setShowFollowingList(true); // 기본으로 팔로잉 목록을 보여주도록 설정
            setShowFollowModal(true);

        } catch (error) {
            console.error("팔로우/팔로워 목록 불러오기 실패:", error);
            alert("팔로우/팔로워 목록을 불러오는데 실패했습니다.");
        }
    };

    // 모달 닫기 핸들러
    const handleCloseFollowModal = () => {
        setShowFollowModal(false);
        setModalMembers([]); // 모달 닫을 때 데이터 초기화
    };


    return (
        <CompanionDetailWrapper>
            <BackButton onClick={handleBackClick}>{"< 목록으로"}</BackButton>

            {(canEdit || canDelete) && (
                <div style={{ position: 'absolute', top: '40px', right: '40px', display: 'flex', gap: '10px' }}>
                    {canEdit && <EditButton style={{ position: 'static'}} onClick={onUpdateClick}>수정</EditButton>}
                    {canDelete && <DeleteButton style={{ position: 'static'}} onClick={onDeleteClick}>삭제</DeleteButton>}
                </div>
            )}

            <DetailTitle>{companion.companionTitle}</DetailTitle>

            <MetaInfo>
                <AuthorLine>
                    <img
                        src={companion.authorProfileImageUrl || DEFAULT_PROFILE_IMAGE}
                        alt={`${companion.authorName || '익명'} 프로필`}
                        style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                    />
                    <AuthorName>{companion.authorName || '익명'}</AuthorName>
                    {/* 게시물 작성자와 현재 로그인한 사용자가 다를 경우에만 팔로우 관련 버튼 표시 */}
                    {isLoggedIn && companion?.authorMemberCode && currentMemberCode !== companion.authorMemberCode && (
                        <FollowToggleArea>
                            {/* 팔로우/언팔로우 버튼 유지 */}
                            <FollowButton onClick={handleFollowClick} isFollowing={isFollowing}>
                                {isFollowing ? '언팔로우' : '팔로우'}
                            </FollowButton>
                            {/* '팔로우 정보' 버튼 추가 */}
                            <FollowInfoButton onClick={() => handleShowFollowInfo(companion.authorMemberCode)}>
                                팔로우 정보
                            </FollowInfoButton>
                        </FollowToggleArea>
                    )}
                </AuthorLine>
                <PostStatsLine>
                    <CreatedAt>작성일: {createdDate}</CreatedAt>
                    {modifiedDateText && <ModifiedAt>최종수정일: {modifiedDateText}</ModifiedAt>}
                    <ViewCount>조회수: {companion.companionViewCount}</ViewCount>
                </PostStatsLine>
            </MetaInfo>

            <DescArea>
                {companion.companionContent}
            </DescArea>

            {/* 댓글 섹션 */}
            <CommentSection>
                <CommentTitle>댓글 ({totalComments})</CommentTitle>
                {isLoggedIn ? (
                    <CommentFormWrapper>
                        <CommentTextArea
                            placeholder="댓글을 작성해주세요."
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                        />
                        <SubmitButton onClick={handleCommentFormSubmit}>등록</SubmitButton>
                    </CommentFormWrapper>
                ) : (
                    <LoginPrompt>댓글을 작성하려면 <a href="/login">로그인</a> 해주세요.</LoginPrompt>
                )}

                <CommentList>
                    {totalComments > 0 ? (
                        currentComments.map(comment => (
                            <CommentItem key={comment.companionCommentId}>
                                {editingCommentId === comment.companionCommentId ? (
                                    // 수정 모드
                                    <EditForm onSubmit={(e) => { e.preventDefault(); handleSaveClick(comment.companionCommentId); }}>
                                        <EditTextArea
                                            value={editedCommentContent}
                                            onChange={(e) => setEditedCommentContent(e.target.value)}
                                        />
                                        <SaveButton type="submit">저장</SaveButton>
                                        <CancelButton type="button" onClick={handleCancelClick}>취소</CancelButton>
                                    </EditForm>
                                ) : (
                                    // 일반 댓글 보기 모드
                                    <>
                                        <CommentMeta>
                                            <CommentAuthor>
                                                <img
                                                    src={comment.authorProfileImageUrl || DEFAULT_PROFILE_IMAGE}
                                                    alt={`${comment.authorName || '익명'} 프로필`}
                                                    style={{ width: '20px', height: '20px', borderRadius: '50%', marginRight: '5px' }}
                                                />
                                                {comment.authorName || '익명'}
                                                {/* 댓글 작성자와 현재 로그인한 사용자가 다를 경우에만 팔로우 관련 버튼 표시 */}
                                                {isLoggedIn && comment?.authorMemberCode && currentMemberCode !== comment.authorMemberCode && (
                                                    <FollowToggleArea style={{ marginLeft: '10px' }}> {/* 댓글 작성자 이름 옆에 공간 확보 */}
                                                        {/* 댓글 작성자 팔로우/언팔로우 버튼 (필요시 추가) */}
                                                        {/* 현재는 게시물 작성자에게만 팔로우 버튼이 있습니다. 필요에 따라 추가하세요. */}
                                                        {/* '팔로우 정보' 버튼 추가 */}
                                                        <FollowInfoButton onClick={() => handleShowFollowInfo(comment.authorMemberCode)}>
                                                            팔로우 정보
                                                        </FollowInfoButton>
                                                    </FollowToggleArea>
                                                )}
                                            </CommentAuthor>
                                            <CommentDates>
                                                <CommentDate>작성일 : {formatDate(comment.companionCommentCreatedAt)}</CommentDate>
                                                {comment.companionCommentModifiedAt && (
                                                    <ModifiedAt>(최종수정일: {formatDate(comment.companionCommentModifiedAt)})</ModifiedAt>
                                                    )}
                                            </CommentDates>
                                        </CommentMeta>
                                        <CommentContent>{comment.companionCommentContent}</CommentContent>

                                        {(comment.authorMemberCode === currentMemberCode || currentUserRoles.includes("ROLE_ADMIN")) && (
                                            <CommentActions>
                                                <ActionButton onClick={() => handleEditClick(comment)}>수정</ActionButton>
                                                <ActionButton onClick={() => handleDeleteClick(comment.companionCommentId)}>삭제</ActionButton>
                                            </CommentActions>
                                        )}
                                    </>
                                )}
                            </CommentItem>
                        ))
                    ) : (
                        <NoComment>아직 댓글이 없습니다.</NoComment>
                    )}
                </CommentList>

                {renderCommentPagination()} {/* 페이징 컴포넌트 렌더링 */}

            </CommentSection>

            {/* Follow Modal */}
            <FollowModal
                show={showFollowModal}
                onClose={handleCloseFollowModal}
                title={modalTitle}
                members={modalMembers} // 수정된 modalMembers 구조 전달
                showFollowingList={showFollowingList} // 어떤 목록을 보여줄지 상태 전달
                setShowFollowingList={setShowFollowingList} // 목록 전환 함수 전달
            />

        </CompanionDetailWrapper>
    );
}

export default CompanionDetailCom;