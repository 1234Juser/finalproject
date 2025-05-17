import React from 'react';
import MyPageSideBarPage from '../../pages/common/MyPageSideBarPage';
import { format } from 'date-fns';
import { FaRegNewspaper, FaRegCommentDots, FaRegCalendarAlt, FaEye, FaThumbtack } from 'react-icons/fa'; // 아이콘 import
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

function CompanionMyPageCom({
                                activeTab,
                                posts,
                                comments,
                                postsPageInfo,
                                commentsPageInfo,
                                loading,
                                error,
                                handleTabChange,
                                renderPagination
                            }) {
    return (
        <div style={containerStyle}>
            <aside style={sidebarStyle}>
                <MyPageSideBarPage />
            </aside>
            <main style={contentStyle}>
                <h2>나의 커뮤니티 활동</h2>
                <div style={tabContainerStyle}>
                    <button
                        style={tabButtonStyle(activeTab === 'posts')}
                        onClick={() => handleTabChange('posts')}
                        disabled={loading}
                    >
                        내 게시글 ({postsPageInfo.totalElements})
                    </button>
                    <button
                        style={tabButtonStyle(activeTab === 'comments')}
                        onClick={() => handleTabChange('comments')}
                        disabled={loading}
                    >
                        내 댓글 ({commentsPageInfo.totalElements})
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
                                    <li key={post.companionId} style={listItemStyle}>
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
                                    <li key={comment.companionCommentId} style={listItemStyle}>
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
            </main>
        </div>
    );
}

export default CompanionMyPageCom;