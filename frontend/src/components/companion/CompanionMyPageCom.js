import React, { useState } from 'react'; // useState 추가
import MyPageSideBarPage from '../../pages/common/MyPageSideBarPage';
import { format } from 'date-fns';
import {FaRegNewspaper, FaRegCommentDots, FaRegCalendarAlt, FaEye, FaThumbtack, FaHeart} from 'react-icons/fa';
import {
    Palette,
    containerStyle,
    sidebarStyle,
    contentStyle,
    tabContainerStyle,
    tabButtonStyle,
    listStyle,
    listItemStyle,
    itemHeaderStyle,
    titleStyle,
    noticeBadgeStyle,
    itemMetaContainerStyle,
    metaInfoStyle,
    commentContentStyle,
    iconStyle,
} from '../../style/companion/CompanionMyPageStyle';
import {useNavigate} from "react-router-dom";

function CompanionMyPageCom({
                                activeTab,
                                posts,
                                comments,
                                likedPosts, // 좋아요한 게시글 상태 추가
                                likedComments, // 좋아요한 댓글 상태 추가
                                postsPageInfo,
                                commentsPageInfo,
                                likedPostsPageInfo, // 좋아요한 게시글 페이지 정보 추가
                                likedCommentsPageInfo, // 좋아요한 댓글 페이지 정보 추가
                                loading,
                                error,
                                handleTabChange,
                                renderPagination
                            }) {

    const navigate= useNavigate();
    const [hoveredPostId, setHoveredPostId] = useState(null); // 게시글 호버 상태
    const [hoveredCommentId, setHoveredCommentId] = useState(null); // 댓글 호버 상태
    const [hoveredTab, setHoveredTab] = useState(null); // 탭 호버 상태

    // 게시글 클릭 시 상세 페이지로 이동하는 함수
    const handlePostClick = (companionId) => {
        navigate(`/community/companion/${companionId}`);
    };

    // 댓글 클릭 시 해당 게시글 상세 페이지로 이동하고 댓글 위치로 스크롤
    const handleCommentClick = (companionId, commentId) => {
        navigate(`/community/companion/${companionId}#comment-${commentId}`);
    };


    return (
        <div style={containerStyle}>
            <aside style={sidebarStyle}>
                <MyPageSideBarPage />
            </aside>
            <main style={contentStyle}>
                <h2>나의 커뮤니티 활동</h2>
                <div style={tabContainerStyle}>
                    <button
                        style={tabButtonStyle(activeTab === 'posts', hoveredTab === 'posts')} // hoveredTab 상태 전달
                        onClick={() => handleTabChange('posts')}
                        onMouseEnter={() => setHoveredTab('posts')} // 호버 시 상태 변경
                        onMouseLeave={() => setHoveredTab(null)} // 호버 해제 시 상태 변경
                        disabled={loading}
                    >
                        내 게시글 ({postsPageInfo.totalElements})
                    </button>
                    <button
                        style={tabButtonStyle(activeTab === 'comments', hoveredTab === 'comments')} // hoveredTab 상태 전달
                        onClick={() => handleTabChange('comments')}
                        onMouseEnter={() => setHoveredTab('comments')} // 호버 시 상태 변경
                        onMouseLeave={() => setHoveredTab(null)} // 호버 해제 시 상태 변경
                        disabled={loading}
                    >
                        내 댓글 ({commentsPageInfo.totalElements})
                    </button>
                    <button // 좋아요한 게시글 탭 추가
                        style={tabButtonStyle(activeTab === 'likedPosts', hoveredTab === 'likedPosts')} // hoveredTab 상태 전달
                        onClick={() => handleTabChange('likedPosts')}
                        onMouseEnter={() => setHoveredTab('likedPosts')} // 호버 시 상태 변경
                        onMouseLeave={() => setHoveredTab(null)} // 호버 해제 시 상태 변경
                        disabled={loading}
                    >
                        좋아요한 게시글 ({likedPostsPageInfo.totalElements})
                    </button>
                    <button // 좋아요한 댓글 탭 추가
                        style={tabButtonStyle(activeTab === 'likedComments', hoveredTab === 'likedComments')} // hoveredTab 상태 전달
                        onClick={() => handleTabChange('likedComments')}
                        onMouseEnter={() => setHoveredTab('likedComments')} // 호버 시 상태 변경
                        onMouseLeave={() => setHoveredTab(null)} // 호버 해제 시 상태 변경
                        disabled={loading}
                    >
                        좋아요한 댓글 ({likedCommentsPageInfo.totalElements})
                    </button>
                </div>

                {loading && <p>로딩 중...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {activeTab === 'posts' && !loading && !error && (
                    <>
                        {posts.length === 0 ? (
                            <p>작성한 게시글이 없습니다.</p>
                        ) : (
                            <ul style={listStyle}>
                                {posts.map(post => (
                                    <li key={post.companionId}
                                        style={listItemStyle(hoveredPostId === post.companionId)} // hoveredPostId 상태 전달
                                        onClick={() => handlePostClick(post.companionId)}
                                        onMouseEnter={() => setHoveredPostId(post.companionId)} // 호버 시 상태 변경
                                        onMouseLeave={() => setHoveredPostId(null)} // 호버 해제 시 상태 변경
                                    >
                                        <div style={itemHeaderStyle}>
                                            <FaRegNewspaper style={iconStyle} />
                                            <div style={titleStyle}>{post.companionTitle}</div>
                                            {post.companionNotice && (
                                                <span style={noticeBadgeStyle}>
                                                    <FaThumbtack style={{...iconStyle, fontSize: '0.9rem', color: Palette.white}} />
                                                    공지
                                                </span>
                                            )}
                                        </div>
                                        <div style={itemMetaContainerStyle}>
                                            <div style={metaInfoStyle}>
                                                <FaRegCalendarAlt style={iconStyle} />
                                                {format(new Date(post.companionCreatedAt), 'yyyy-MM-dd HH:mm')}
                                            </div>
                                            <div style={metaInfoStyle}>
                                                <FaEye style={iconStyle} />
                                                {post.companionViewCount}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {renderPagination(postsPageInfo, 'posts')}
                    </>
                )}

                {activeTab === 'comments' && !loading && !error && (
                    <>
                        {comments.length === 0 ? (
                            <p>작성한 댓글이 없습니다.</p>
                        ) : (
                            <ul style={listStyle}>
                                {comments.map(comment => (
                                    <li key={comment.companionCommentId}
                                        style={listItemStyle(hoveredCommentId === comment.companionCommentId)} // hoveredCommentId 상태 전달
                                        onClick={() => handleCommentClick(comment.companionId, comment.companionCommentId)}
                                        onMouseEnter={() => setHoveredCommentId(comment.companionCommentId)} // 호버 시 상태 변경
                                        onMouseLeave={() => setHoveredCommentId(null)} // 호버 해제 시 상태 변경
                                    >
                                        <div style={itemHeaderStyle}>
                                            <FaRegCommentDots style={iconStyle} />
                                            <div style={titleStyle}>Re: {comment.companionTitle}</div>
                                        </div>
                                        <p style={commentContentStyle}>{comment.companionCommentContent}</p>
                                        <div style={itemMetaContainerStyle}>
                                            <div style={metaInfoStyle}>
                                                <FaRegCalendarAlt style={iconStyle} />
                                                {format(new Date(comment.companionCommentCreatedAt), 'yyyy-MM-dd HH:mm')}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {renderPagination(commentsPageInfo, 'comments')}
                    </>
                )}

                {/* 좋아요한 게시글 목록 표시 */}
                {activeTab === 'likedPosts' && !loading && !error && (
                    <>
                        {likedPosts.length === 0 ? (
                            <p>좋아요한 게시글이 없습니다.</p>
                        ) : (
                            <ul style={listStyle}>
                                {likedPosts.map(post => (
                                    <li key={post.companionId}
                                        style={listItemStyle(hoveredPostId === post.companionId)} // hoveredPostId 상태 전달
                                        onClick={() => handlePostClick(post.companionId)}
                                        onMouseEnter={() => setHoveredPostId(post.companionId)} // 호버 시 상태 변경
                                        onMouseLeave={() => setHoveredPostId(null)} // 호버 해제 시 상태 변경
                                    >
                                        <div style={itemHeaderStyle}>
                                            <FaHeart style={{...iconStyle, color: Palette.heartRed}} /> {/* 좋아요 아이콘 */}
                                            <div style={titleStyle}>{post.companionTitle}</div>
                                        </div>
                                        <div style={itemMetaContainerStyle}>
                                            <div style={metaInfoStyle}>
                                                <FaRegCalendarAlt style={iconStyle} />
                                                {format(new Date(post.companionCreatedAt), 'yyyy-MM-dd HH:mm')}
                                            </div>
                                            <div style={metaInfoStyle}>
                                                <FaEye style={iconStyle} />
                                                {post.companionViewCount}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {renderPagination(likedPostsPageInfo, 'likedPosts')}
                    </>
                )}

                {/* 좋아요한 댓글 목록 표시 */}
                {activeTab === 'likedComments' && !loading && !error && (
                    <>
                        {likedComments.length === 0 ? (
                            <p>좋아요한 댓글이 없습니다.</p>
                        ) : (
                            <ul style={listStyle}>
                                {likedComments.map(comment => (
                                    <li key={comment.companionCommentId}
                                        style={listItemStyle(hoveredCommentId === comment.companionCommentId)} // hoveredCommentId 상태 전달
                                        onClick={() => handleCommentClick(comment.companionId, comment.companionCommentId)}
                                        onMouseEnter={() => setHoveredCommentId(comment.companionCommentId)} // 호버 시 상태 변경
                                        onMouseLeave={() => setHoveredCommentId(null)} // 호버 해제 시 상태 변경
                                    >
                                        <div style={itemHeaderStyle}>
                                            <FaHeart style={{...iconStyle, color: Palette.heartRed}} /> {/* 좋아요 아이콘 */}
                                            <div style={titleStyle}>Re: {comment.companionCommentContent}</div> {/* title -> content로 수정 */}
                                        </div>
                                        <p style={commentContentStyle}>{comment.companionCommentContent}</p>
                                        <div style={itemMetaContainerStyle}>
                                            <div style={metaInfoStyle}>
                                                <FaRegCalendarAlt style={iconStyle} />
                                                {format(new Date(comment.companionCommentCreatedAt), 'yyyy-MM-dd HH:mm')}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {renderPagination(likedCommentsPageInfo, 'likedComments')}
                    </>
                )}
            </main>
        </div>
    );
}
export default CompanionMyPageCom;