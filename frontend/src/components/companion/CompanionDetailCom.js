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
    FollowInfoButton,
    CommentFollowActions, PostFollowActions,
    CommentAuthorInfo,
    LikeButton,
    LikeCount,
    OtherLikeButton,
    OtherLikeCount,
} from "../../style/companion/CompanionDetailStyle";
import { useNavigate } from "react-router-dom";
import FollowModal from "../companion/FollowModalCom";
import axios from "axios";
import { format } from 'date-fns';
import { FaHeart, FaRegHeart } from 'react-icons/fa';


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
                                onCommentDelete,
                                isCompanionLiked,
                                companionLikeCount,
                                commentLikeStatuses, // 각 댓글의 좋아요 상태
                                commentLikeCounts, // 각 댓글의 좋아요 수
                                onToggleCompanionLike, // 게시물 좋아요 토글 핸들러
                                onToggleCommentLike // 댓글 좋아요 토글 핸들러
                            }) {
    const navigate = useNavigate();
    const [commentContent, setCommentContent] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentContent, setEditedCommentContent] = useState('');
    const [currentCommentPage, setCurrentCommentPage] = useState(0);
    const [isFollowing, setIsFollowing] = useState({});

    // 모달 관련 상태 추가
    const [showFollowModal, setShowFollowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMembers, setModalMembers] = useState([]);
    const [showFollowingList, setShowFollowingList] = useState(true); // 팔로잉/팔로워 목록 전환 상태 추가

    useEffect(() => {
        const checkFollowStatus = async () => {
            if (isLoggedIn && currentMemberCode) {
                const membersToCheck = new Set();
                if (companion?.authorMemberCode && currentMemberCode !== companion.authorMemberCode) {
                    membersToCheck.add(companion.authorMemberCode);
                }
                companion?.comments?.forEach(comment => {
                    if (comment.authorMemberCode && currentMemberCode !== comment.authorMemberCode) {
                        membersToCheck.add(comment.authorMemberCode);
                    }
                });

                const followStatuses = {};
                const token = localStorage.getItem("accessToken");

                for (const memberCode of membersToCheck) {
                    try {
                        const response = await axios.get(`https://api.hellotravelogic.link/follow/is-following/${memberCode}`, {
                            headers: { 'Authorization': `Bearer ${token}` }
                        });
                        followStatuses[memberCode] = response.data;
                    } catch (error) {
                        console.error(`멤버 ${memberCode} 팔로우 상태 확인 실패:`, error);
                        followStatuses[memberCode] = false;
                    }
                }
                setIsFollowing(followStatuses);
            } else {
                setIsFollowing({});
            }
        };

        checkFollowStatus();
    }, [isLoggedIn, currentMemberCode, companion?.authorMemberCode, companion?.comments]);


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

    // 팔로우/언팔로우 버튼 클릭 핸들러 (게시글 작성자 및 댓글 작성자 모두 사용)
    const handleFollowClick = async (memberCodeToFollow, isCurrentlyFollowing) => {
        if (!isLoggedIn) {
            alert("로그인 후 팔로우할 수 있습니다.");
            return;
        }

        if (currentMemberCode === memberCodeToFollow) {
            alert("자신을 팔로우할 수 없습니다.");
            return;
        }

        const token = localStorage.getItem("accessToken");

        try {
            if (isCurrentlyFollowing) {
                await axios.delete(`https://api.hellotravelogic.link/follow/${memberCodeToFollow}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                alert("언팔로우 되었습니다.");
            } else {
                await axios.post(`https://api.hellotravelogic.link/follow/${memberCodeToFollow}`, null, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                alert("팔로우 되었습니다.");
            }
            // 해당 멤버의 팔로우 상태만 토글하여 업데이트
            setIsFollowing(prevStatus => ({
                ...prevStatus,
                [memberCodeToFollow]: !isCurrentlyFollowing
            }));
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
            const followingResponse = await axios.get(`https://api.hellotravelogic.link/follow/${memberCode}/following`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            // 팔로워 목록 가져오기
            const followerResponse = await axios.get(`https://api.hellotravelogic.link/follow/${memberCode}/followers`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });


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

    // 게시글 내용에 이미지 태그 삽입 로직 추가
    let processedContent = companion.companionContent;
    if (companion.companionImageUrls && companion.companionImageUrls.length > 0) {
        processedContent = companion.companionContent.replace(/<이미지(\d+)>/g, (match, imageNumberStr) => {
            const imageNumber = parseInt(imageNumberStr, 10);
            const imageIndex = imageNumber - 1; // <이미지1>은 배열의 0번 인덱스에 해당

            // if (companion.companionImageUrls[imageIndex]) {
            //     const url = companion.companionImageUrls[imageIndex];
            //     // PostImage 컴포넌트의 스타일과 유사하게 인라인 스타일을 적용합니다.
            //     // 필요시 PostImage 컴포넌트의 실제 스타일을 확인하고 조정해주세요.
            //     return `<img src="/${url}" alt="게시물 이미지 ${imageNumber}" style="width: 500px; height: 300px; object-fit: cover; display: block; margin-bottom: 20px; margin-left: auto; margin-right: auto;" />`;
            // }
            if (companion.companionImageUrls[imageIndex]) {
                const url = companion.companionImageUrls[imageIndex];
                // src에서 맨 앞의 '/' 를 제거하여 완전한 S3 URL을 그대로 사용합니다.
                return `<img src="${url}" alt="게시물 이미지 ${imageNumber}" style="width: 500px; height: 300px; object-fit: cover; display: block; margin-bottom: 20px; margin-left: auto; margin-right: auto;" />`;
            }
            return match; // 해당 번호의 이미지가 없으면 플레이스홀더 텍스트를 그대로 반환
        });
    }

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
                    {/* 게시글 작성자 정보 (프로필 사진, 이름) */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={companion.authorProfileImageUrl || DEFAULT_PROFILE_IMAGE}
                            alt={`${companion.authorName || '익명'} 프로필`}
                            style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                        />
                        <AuthorName>{companion.authorName || '익명'}</AuthorName>
                    </div>

                    {/* 게시글 팔로우 버튼 그룹 (오른쪽 정렬) */}
                    <PostFollowActions>
                        {isLoggedIn && companion.authorMemberCode && currentMemberCode !== companion.authorMemberCode && (
                            <FollowButton
                                onClick={() => handleFollowClick(companion.authorMemberCode, isFollowing[companion.authorMemberCode])}
                                className={isFollowing[companion.authorMemberCode] ? 'unfollow' : ''} // 언팔로우 상태일 때 unfollow 클래스 추가
                            >
                                {isFollowing[companion.authorMemberCode] ? '언팔로우' : '팔로우'}
                            </FollowButton>
                        )}
                        {companion.authorMemberCode && (
                            <FollowInfoButton onClick={() => handleShowFollowInfo(companion.authorMemberCode)}>
                                팔로우 정보
                            </FollowInfoButton>
                        )}
                    </PostFollowActions>
                </AuthorLine>
                <PostStatsLine>
                    <CreatedAt>작성일: {createdDate}</CreatedAt>
                    {modifiedDateText && (
                        <ModifiedAt>{`(수정됨: ${modifiedDateText})`}</ModifiedAt>
                    )}
                    <ViewCount>조회수: {companion.companionViewCount || 0}</ViewCount>
                    {/* 게시물 좋아요 버튼 및 개수 표시 */}
                    {isLoggedIn && onToggleCompanionLike && (
                        <>
                            <LikeButton onClick={onToggleCompanionLike}>
                                좋아요 {isCompanionLiked ?  <FaHeart color="red" /> : <FaRegHeart />}
                            </LikeButton>
                            <LikeCount>{companionLikeCount}</LikeCount>
                        </>
                    )}
                </PostStatsLine>
            </MetaInfo>


            {/*/!* ================= 중요: 이미지 표시 부분 ================= *!/*/}
            {/*{companion.companionImageUrls && companion.companionImageUrls.length > 0 && (*/}
            {/*    <div style={{ margin: '20px 0', textAlign: 'center' }}> /!* 이미지 컨테이너 스타일 *!/*/}
            {/*        {companion.companionImageUrls.map((url, index) => (*/}
            {/*            <PostImage*/}
            {/*                key={index}*/}
            {/*                src={`/${url}`} // FileUtil에서 반환하는 경로가 'upload/community/...' 이므로 앞에 '/'를 붙여 루트 상대 경로로 만듭니다.*/}
            {/*                alt={`게시물 이미지 ${index + 1}`}*/}
            {/*                // PostImage 스타일 컴포넌트에 이미 스타일이 있다면 아래 style prop은 필요 없을 수 있습니다.*/}
            {/*                // 필요에 따라 스타일을 조정하세요.*/}
            {/*                style={{ maxWidth: '100%', height: 'auto', display: 'block', marginBottom: '10px', marginLeft: 'auto', marginRight: 'auto' }}*/}
            {/*            />*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*)}*/}
            {/*/!* ====================================================== *!/*/}

            {/*<DescArea dangerouslySetInnerHTML={{ __html: companion.companionContent }} />*/}
            <DescArea dangerouslySetInnerHTML={{ __html: processedContent }} />



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
                    {currentComments.length > 0 ? (
                        currentComments.map((comment) => (
                            <CommentItem key={comment.companionCommentId}>
                                <CommentMeta>
                                    {/* 댓글 작성자 정보 (프로필 사진, 이름) 및 날짜 정보 */}
                                    <CommentAuthorInfo>
                                        <CommentAuthor>
                                            <img
                                                src={comment.authorProfileImageUrl || DEFAULT_PROFILE_IMAGE}
                                                alt={`${comment.authorName || '익명'} 프로필`}
                                                style={{ width: '25px', height: '25px', borderRadius: '50%', marginRight: '8px' }}
                                            />
                                            {comment.authorName || '익명'}
                                            {/* 댓글 팔로우 버튼 그룹  */}
                                            {isLoggedIn && comment.authorMemberCode && ( // 조건 단순화 및 괄호 사용
                                                <CommentFollowActions>
                                                    {comment.authorMemberCode && currentMemberCode !== comment.authorMemberCode && (
                                                        <FollowButton
                                                            onClick={() => handleFollowClick(comment.authorMemberCode, isFollowing[comment.authorMemberCode])}
                                                            className={isFollowing[comment.authorMemberCode] ? 'unfollow' : ''} // 언팔로우 상태일 때 unfollow 클래스 추가
                                                        >
                                                            {isFollowing[comment.authorMemberCode] ? '언팔로우' : '팔로우'}
                                                        </FollowButton>
                                                    )}
                                                    {comment.authorMemberCode && (
                                                        <FollowInfoButton onClick={() => handleShowFollowInfo(comment.authorMemberCode)}>
                                                            팔로우 정보
                                                        </FollowInfoButton>
                                                    )}
                                                </CommentFollowActions>

                                            )}
                                        </CommentAuthor>
                                        <CommentDates>
                                            <CommentDate>작성일 : {formatDate(comment.companionCommentCreatedAt)}</CommentDate>
                                            {comment.companionCommentModifiedAt && comment.companionCommentModifiedAt !== comment.companionCommentCreatedAt && (
                                                <ModifiedAt>{`(수정됨: ${formatDate(comment.companionCommentModifiedAt)})`}</ModifiedAt>
                                            )}
                                        </CommentDates>
                                    </CommentAuthorInfo>
                                </CommentMeta>



                                {editingCommentId === comment.companionCommentId ? (
                                    <EditForm onSubmit={(e) => { e.preventDefault(); handleSaveClick(comment.companionCommentId); }}>
                                        <EditTextArea
                                            value={editedCommentContent}
                                            onChange={(e) => setEditedCommentContent(e.target.value)}
                                        />
                                        <SaveButton type="submit">저장</SaveButton>
                                        <CancelButton type="button" onClick={handleCancelClick}>취소</CancelButton>
                                    </EditForm>
                                ) : (
                                    <CommentContent>{comment.companionCommentContent}</CommentContent>
                                )}

                                {isLoggedIn && editingCommentId !== comment.companionCommentId && (
                                    <CommentActions>
                                        {/* 댓글 작성자만 수정 가능 */}
                                        {comment.authorMemberCode === currentMemberCode && (
                                            <ActionButton onClick={() => handleEditClick(comment)}>수정</ActionButton>
                                        )}
                                        {/* 댓글 작성자 또는 관리자만 삭제 가능 */}
                                        {(comment.authorMemberCode === currentMemberCode || currentUserRoles.includes("ROLE_ADMIN")) && (
                                            <ActionButton onClick={() => handleDeleteClick(comment.companionCommentId)}>삭제</ActionButton>
                                        )}

                                        {/* 댓글 좋아요 버튼 및 개수 표시 */}
                                        {isLoggedIn && onToggleCommentLike && (
                                            <>
                                                <OtherLikeButton onClick={() => onToggleCommentLike(comment.companionCommentId)}>
                                                     {commentLikeStatuses[comment.companionCommentId] ? <FaHeart color="red" /> : <FaRegHeart />}
                                                </OtherLikeButton>
                                                <OtherLikeCount>{commentLikeCounts[comment.companionCommentId] || 0}</OtherLikeCount>
                                            </>
                                        )}
                                    </CommentActions>
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