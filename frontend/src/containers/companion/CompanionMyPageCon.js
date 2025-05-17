import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CompanionMyPageCom from "../../components/companion/CompanionMyPageCom";
import { pageButtonStyle, activePageButtonStyle, paginationStyle } from '../../style/companion/CompanionMyPageStyle';

function CompanionMyPageCon() {
    const [activeTab, setActiveTab] = useState('posts'); // 'posts' or 'comments'
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [postsPageInfo, setPostsPageInfo] = useState({
        currentPage: 0,
        totalPages: 0,
        totalElements: 0,
    });
    const [commentsPageInfo, setCommentsPageInfo] = useState({
        currentPage: 0,
        totalPages: 0,
        totalElements: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getToken = () => localStorage.getItem('accessToken');

    const fetchMyPosts = useCallback(async (page = 0) => {
        setLoading(true);
        setError(null);
        try {
            const token = getToken();
            if (!token) {
                setError('로그인이 필요합니다.');
                setLoading(false);
                return;
            }
            const response = await axios.get(`/mypage/community/posts?page=${page}&size=10`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPosts(response.data.content);
            setPostsPageInfo({
                currentPage: response.data.number,
                totalPages: response.data.totalPages,
                totalElements: response.data.totalElements,
            });
        } catch (err) {
            setError(err.response?.data?.message || '게시글을 불러오는 중 오류가 발생했습니다.');
            console.error("Error fetching posts:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchMyComments = useCallback(async (page = 0) => {
        setLoading(true);
        setError(null);
        try {
            const token = getToken();
            if (!token) {
                setError('로그인이 필요합니다.');
                setLoading(false);
                return;
            }
            const response = await axios.get(`/mypage/community/comments?page=${page}&size=10`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setComments(response.data.content);
            setCommentsPageInfo({
                currentPage: response.data.number,
                totalPages: response.data.totalPages,
                totalElements: response.data.totalElements,
            });
        } catch (err) {
            setError(err.response?.data?.message || '댓글을 불러오는 중 오류가 발생했습니다.');
            console.error("Error fetching comments:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (activeTab === 'posts') {
            fetchMyPosts();
        } else {
            fetchMyComments();
        }
    }, [activeTab, fetchMyPosts, fetchMyComments]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handlePageChange = (page, tabType) => { // tabType을 인자로 받아 구분
        if (tabType === 'posts') {
            fetchMyPosts(page);
        } else if (tabType === 'comments') {
            fetchMyComments(page);
        }
    };

    const renderPagination = (pageInfo, tabType) => { // tabType을 인자로 받음
        // 항상 페이징 컨트롤이 보이도록 수정
        // if (!pageInfo.totalElements || pageInfo.totalPages <= 1) return null;
        // totalPages가 0일 경우 (데이터가 아예 없을 때) 페이징을 그리지 않도록 조건 추가
        if (pageInfo.totalPages === 0 && pageInfo.totalElements === 0) return null;


        const pages = [];
        // totalPages가 0이면서 totalElements는 있지만, API 응답에서 content가 비어있는 경우 (예: 마지막 페이지 삭제)
        // 이런 경우 pageInfo.totalPages가 0이 될 수 있으므로, 최소 1페이지는 보여주도록 처리
        const totalPagesToRender = Math.max(1, pageInfo.totalPages);

        for (let i = 0; i < totalPagesToRender; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i, tabType)}
                    style={i === pageInfo.currentPage ? activePageButtonStyle : pageButtonStyle}
                    disabled={loading}
                >
                    {i + 1}
                </button>
            );
        }



        return (
            <div style={paginationStyle}>
                <button
                    onClick={() => handlePageChange(pageInfo.currentPage - 1, tabType)}
                    disabled={pageInfo.currentPage === 0 || loading}
                    style={pageButtonStyle}
                >
                    이전
                </button>
                {pages}
                <button
                    onClick={() => handlePageChange(pageInfo.currentPage + 1, tabType)}
                    disabled={pageInfo.currentPage === totalPagesToRender - 1 || loading}
                    style={pageButtonStyle}
                >
                    다음
                </button>
            </div>
        );
    };

    return (
        <CompanionMyPageCom
            activeTab={activeTab}
            posts={posts}
            comments={comments}
            postsPageInfo={postsPageInfo}
            commentsPageInfo={commentsPageInfo}
            loading={loading}
            error={error}
            handleTabChange={handleTabChange}
            handlePageChange={handlePageChange}
            renderPagination={renderPagination}
        />
    );
}

export default CompanionMyPageCon;