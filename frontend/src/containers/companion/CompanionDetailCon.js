import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CompanionDetailCom from '../../components/companion/CompanionDetailCom'; // 컴포넌트 임포트 확인
import { jwtDecode } from 'jwt-decode'; // 기본 임포트 대신 명명된 임포트 사용

function CompanionDetailCon() {
    const { companionId } = useParams(); // URL에서 companionId를 가져옵니다.
    const navigate = useNavigate();
    const [companion, setCompanion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // 세미콜론 추가
    const [canEdit, setCanEdit] = useState(false); // 수정 권한
    const [canDelete, setCanDelete] = useState(false); // 삭제 권한

    useEffect(() => {
        const fetchCompanionDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/companions/${companionId}`);
                setCompanion(response.data);

                // 현재 로그인된 사용자 정보 가져오기
                const token = localStorage.getItem("accessToken");
                if (token) {
                    try {
                        const decodedToken = jwtDecode(token);
                        const currentMemberCode = decodedToken.memberCode;
                        const currentUserRoles = decodedToken.roles || [];

                        const authorMemberCode = response.data.authorMemberCode;
                        if (authorMemberCode && authorMemberCode === currentMemberCode) {
                            setCanEdit(true);
                            setCanDelete(true);
                        }

                        // 관리자 여부 확인
                        const isAdmin = currentUserRoles.includes("ROLE_ADMIN");
                        if (isAdmin) {
                            setCanDelete(true);
                        }

                    } catch (decodeError) {
                        console.error("토큰 디코딩 실패:", decodeError);
                        // 토큰이 유효하지 않으면 권한 없음
                        setCanEdit(false);
                        setCanDelete(false);
                    }
                } else {
                    // 토큰이 없으면 권한 없음
                    setCanEdit(false);
                    setCanDelete(false);
                }

            } catch (err) {
                console.error("게시글 상세 정보를 불러오는데 실패 했습니다.", err);
                setError("게시글 상세 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.");
                // 게시글 로드 실패 시에도 권한 없음 처리
                setCanEdit(false);
                setCanDelete(false);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanionDetail();
    }, [companionId]);

    const handleUpdateClick = () => {
        // TODO: 수정 페이지로 이동하는 로직 구현
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
        />
    );
}

export default CompanionDetailCon; // 이 라인을 추가하여 기본 내보내기 설정