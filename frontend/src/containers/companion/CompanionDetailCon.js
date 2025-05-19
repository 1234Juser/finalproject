import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CompanionDetailCom from '../../components/companion/CompanionDetailCom';
import { jwtDecode } from 'jwt-decode'; // 기본 임포트 대신 명명된 임포트 사용

function CompanionDetailCon() {
    const { companionId } = useParams(); // URL에서 companionId를 가져옵니다.
    const navigate = useNavigate();
    const [companion, setCompanion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [canEdit, setCanEdit] = useState(false); // 수정 권한
    const [canDelete, setCanDelete] = useState(false); // 삭제 권한
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
    const [currentMemberCode, setCurrentMemberCode] = useState(null); // 현재 사용자 memberCode
    const [currentUserRoles, setCurrentUserRoles] = useState([]); // 현재 사용자 역할

    // 좋아요 관련 상태 추가
    const [isCompanionLiked, setIsCompanionLiked] = useState(false); // 게시물 좋아요 상태
    const [companionLikeCount, setCompanionLikeCount] = useState(0); // 게시물 좋아요 수
    const [commentLikeStatuses, setCommentLikeStatuses] = useState({}); // 각 댓글의 좋아요 상태 (commentId -> boolean)
    const [commentLikeCounts, setCommentLikeCounts] = useState({}); // 각 댓글의 좋아요 수 (commentId -> int)



    // 게시글 상세 정보를 불러오는 함수를 useCallback으로 감싸서 메모이제이션
    const fetchCompanionDetail = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/companions/${companionId}`);
            setCompanion(response.data);

            // 현재 로그인된 사용자 정보 가져오기
            const token = localStorage.getItem("accessToken");
            if (token) {
                console.log("토큰 존재:", token); // 이 줄을 추가

                setIsLoggedIn(true);
                console.log("로그인 상태 설정: true"); // 이 줄을 추가

                try {
                    const decodedToken = jwtDecode(token);
                    const memberCode = decodedToken.memberCode;
                    const userRoles = decodedToken.roles || [];

                    setCurrentMemberCode(memberCode);
                    setCurrentUserRoles(userRoles);

                    const authorMemberCode = response.data.authorMemberCode;
                    if (authorMemberCode && authorMemberCode === memberCode) {
                        setCanEdit(true);
                        setCanDelete(true);
                    }

                    // 관리자 여부 확인
                    const isAdmin = userRoles.includes("ROLE_ADMIN");
                    if (isAdmin) {
                        setCanDelete(true);
                    }
                    console.log("현재 사용자 코드:", memberCode, "역할:", userRoles);

                    // 게시물 좋아요 상태 및 개수 가져오기 (로그인 상태일 경우)
                    const likeStatusResponse = await axios.get(`/likes/companion/${companionId}/status`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    setIsCompanionLiked(likeStatusResponse.data);


                } catch (decodeError) {
                    console.error("토큰 디코딩 실패:", decodeError);
                    // 토큰이 유효하지 않으면 권한 없음 및 로그인 상태 false
                    setIsLoggedIn(false);
                    setCurrentMemberCode(null);
                    setCurrentUserRoles([]);
                    setCanEdit(false);
                    setCanDelete(false);
                    setIsCompanionLiked(false); // 좋아요 상태 초기화
                    console.log("로그인 상태 설정: false (토큰 디코딩 실패)");
                }
            } else {
                // 토큰이 없으면 권한 없음 및 로그인 상태 false
                setIsLoggedIn(false);
                setCurrentMemberCode(null);
                setCurrentUserRoles([]);
                setCanEdit(false);
                setCanDelete(false);
                setIsCompanionLiked(false); // 좋아요 상태 초기화
                console.log("로그인 상태 설정: false (토큰 없음)");
            }
            // 게시물 좋아요 개수 가져오기 (로그인 상태와 무관)
            const likeCountResponse = await axios.get(`/likes/companion/${companionId}/count`);
            setCompanionLikeCount(likeCountResponse.data);

            // 댓글 좋아요 상태 및 개수 가져오기
            const comments = response.data.comments || [];
            const commentStatuses = {};
            const commentCounts = {};

            for (const comment of comments) {
                // 댓글 좋아요 개수 가져오기
                const commentCountResponse = await axios.get(`/likes/comment/${comment.companionCommentId}/count`);
                commentCounts[comment.companionCommentId] = commentCountResponse.data;

                // 로그인 상태일 경우 댓글 좋아요 상태 가져오기
                if (isLoggedIn) {
                    try {
                        const token = localStorage.getItem("accessToken");
                        const commentStatusResponse = await axios.get(`/likes/comment/${comment.companionCommentId}/status`, {
                            headers: { 'Authorization': `Bearer ${token}` }
                        });
                        commentStatuses[comment.companionCommentId] = commentStatusResponse.data;
                    } catch (statusError) {
                        console.error(`댓글 ${comment.companionCommentId} 좋아요 상태 확인 실패:`, statusError);
                        commentStatuses[comment.companionCommentId] = false; // 실패 시 false로 처리
                    }
                } else {
                    commentStatuses[comment.companionCommentId] = false; // 로그인 상태가 아니면 false
                }
            }
            setCommentLikeStatuses(commentStatuses);
            setCommentLikeCounts(commentCounts);


        } catch (err) {
            console.error("게시글 상세 정보를 불러오는데 실패 했습니다.", err);
            setError("게시글 상세 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.");
            // 게시글 로드 실패 시에도 권한 없음 처리
            setCanEdit(false);
            setCanDelete(false);
            setIsCompanionLiked(false);
            setCompanionLikeCount(0);
            setCommentLikeStatuses({});
            setCommentLikeCounts({});

        } finally {
            setLoading(false);
        }
    }, [companionId, isLoggedIn]); // companionId 또는 isLoggedIn 상태가 변경될 때만 함수 재생성

    useEffect(() => {
        fetchCompanionDetail();
    }, [fetchCompanionDetail]); // fetchCompanionDetail 함수가 변경될 때마다 useEffect 실행

    const handleUpdateClick = () => {
        navigate(`/community/companion/edit/${companionId}`);
    };

    const handleDeleteClick = async () => {
        if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
            try {
                const token = localStorage.getItem("accessToken");
                await axios.delete(`/companions/${companionId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                alert("게시글이 삭제되었습니다.");
                navigate("/community/companion");
            } catch (err) {
                console.error("게시글 삭제에 실패 했습니다.", err);
                // 에러 메시지 상세화
                if (err.response && err.response.status === 403) {
                    alert("게시글 삭제 권한이 없습니다.");
                } else {
                    alert("게시글 삭제에 실패 했습니다. 잠시 후 다시 시도해주세요.");
                }
            }
        }
    };

    //댓글 등록 핸들러
    const handleCommentSubmit = async (content) =>{
        try{
            const token = localStorage.getItem("accessToken");
            // content를 params 대신 요청 본문에 직접 전달
             await axios.post(`/companions/${companionId}/comments`, null ,{ // null 또는 빈 객체 {}를 본문으로 사용
                params: { content: content },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log("댓글 등록 API 호출 성공"); // 이 줄을 추가

            //댓글 등록 성공 후 댓글 목록 새로고침 (게시글 정보 재조회)
            fetchCompanionDetail(); // 이제 fetchCompanionDetail 호출 가능
            alert("댓글이 등록되었습니다.");
        }catch(err){
            console.error("댓글 등록에 실패 했습니다.", err);
            if(err.response && err.response.status === 401){
                alert("로그인 후 댓글을 작성할 수 있습니다.")
            }else{
                alert("댓글 등록에 실패 했습니다. 잠시 후 다시 시도해주세요.");
            }
        }
    };

    //댓글 수정 핸들러
    const handleCommentUpdate = async(commentId, content)=>{
        try{
            const token = localStorage.getItem("accessToken");
            await axios.put(`/companions/${companionId}/comments/${commentId}`, null, {
                params: {content: content},
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            //댓글 수정 성공 후 댓글 목록 새로고침 (게시글 정보 재조회)
            fetchCompanionDetail(); // 이제 fetchCompanionDetail 호출 가능
            alert("댓글이 수정되었습니다.");
        }catch(err){
            console.error("댓글 수정에 실패 했습니다.", err);
            if(err.response && err.response.status === 403){
                alert("댓글 수정 권한이 없습니다.");
            }else{
                alert("댓글 수정에 실패했습니다. 잠시 후 다시 시도해주세요.");
            }
        }
    };

    // 댓글 삭제 핸들러
    const handleCommentDelete = async (commentId) => {
        if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
            try {
                const token = localStorage.getItem("accessToken");
                await axios.delete(`/companions/${companionId}/comments/${commentId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                // 댓글 삭제 성공 후 댓글 목록 새로고침 (게시글 정보 재조회)
                fetchCompanionDetail(); // 이제 fetchCompanionDetail 호출 가능
                alert("댓글이 삭제되었습니다.");
            } catch (err) {
                console.error("댓글 삭제에 실패 했습니다.", err);
                if (err.response && err.response.status === 403) {
                    alert("댓글 삭제 권한이 없습니다.");
                } else {
                    alert("댓글 삭제에 실패 했습니다. 잠시 후 다시 시도해주세요.");
                }
            }
        }
    };

    // 게시물 좋아요 토글 핸들러
    const handleToggleCompanionLike = async () => {
        if (!isLoggedIn) {
            alert("로그인 후 좋아요를 누를 수 있습니다.");
            return;
        }
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(`/likes/companion/${companionId}`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const liked = response.data; // true면 좋아요 추가, false면 좋아요 취소

            setIsCompanionLiked(liked);
            // 좋아요 수 업데이트 (API 호출하여 최신 상태 반영)
            const likeCountResponse = await axios.get(`/likes/companion/${companionId}/count`);
            setCompanionLikeCount(likeCountResponse.data);

        } catch (err) {
            console.error("게시물 좋아요 토글 실패:", err);
            if (err.response && err.response.status === 401) {
                alert("로그인이 필요합니다.");
            } else {
                alert("게시물 좋아요 기능 처리 중 오류가 발생했습니다.");
            }
        }
    };

    // 댓글 좋아요 토글 핸들러
    const handleToggleCommentLike = async (commentId) => {
        if (!isLoggedIn) {
            alert("로그인 후 좋아요를 누를 수 있습니다.");
            return;
        }
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(`/likes/comment/${commentId}`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const liked = response.data; // true면 좋아요 추가, false면 좋아요 취소

            // 해당 댓글의 좋아요 상태 업데이트
            setCommentLikeStatuses(prevStatuses => ({
                ...prevStatuses,
                [commentId]: liked
            }));

            // 해당 댓글의 좋아요 수 업데이트 (API 호출하여 최신 상태 반영)
            const likeCountResponse = await axios.get(`/likes/comment/${commentId}/count`);
            setCommentLikeCounts(prevCounts => ({
                ...prevCounts,
                [commentId]: likeCountResponse.data
            }));

        } catch (err) {
            console.error(`댓글 ${commentId} 좋아요 토글 실패:`, err);
            if (err.response && err.response.status === 401) {
                alert("로그인이 필요합니다.");
            } else {
                alert("댓글 좋아요 기능 처리 중 오류가 발생했습니다.");
            }
        }
    };

    // 로딩, 에러, 게시글 없음 상태 처리
    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;
    if (!companion) return <div>게시글을 찾을 수 없습니다.</div>;

    // 데이터가 성공적으로 로드되면 컴포넌트에 props로 전달
    return (
        <CompanionDetailCom
            companion={companion}
            canEdit={canEdit}
            canDelete={canDelete}
            onUpdateClick={handleUpdateClick}
            onDeleteClick={handleDeleteClick}
            isLoggedIn={isLoggedIn} // 로그인 상태 전달
            currentMemberCode={currentMemberCode} // 현재 사용자 memberCode 전달
            currentUserRoles={currentUserRoles} // 현재 사용자 역할 전달
            onCommentSubmit={handleCommentSubmit} // 댓글 등록 핸들러 전달
            onCommentUpdate={handleCommentUpdate} // 댓글 수정 핸들러 전달
            onCommentDelete={handleCommentDelete} // 댓글 삭제 핸들러 전달
            isCompanionLiked={isCompanionLiked}
            companionLikeCount={companionLikeCount}
            commentLikeStatuses={commentLikeStatuses}
            commentLikeCounts={commentLikeCounts}
            onToggleCompanionLike={handleToggleCompanionLike}
            onToggleCommentLike={handleToggleCommentLike}
        />
    );
}

export default CompanionDetailCon;