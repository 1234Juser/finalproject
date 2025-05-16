import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import CompanionRegisterCom from '../../components/companion/CompanionRegisterCom'; // 등록 폼 컴포넌트 재사용
import { jwtDecode } from 'jwt-decode';

function CompanionEditCon() {
    const { companionId } = useParams(); // URL에서 companionId를 가져옵니다.
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isNotice, setIsNotice] = useState(false); // 공지사항 상태 추가
    const [isAdmin, setIsAdmin] = useState(false); // 관리자 여부 상태 추가
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const [formError, setFormError] = useState(''); // 폼 전체 에러 메시지
    const [initialDataLoaded, setInitialDataLoaded] = useState(false); // 초기 데이터 로드 여부

    useEffect(() => {

        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const roles = decodedToken.roles || []; // 토큰에 역할 정보가 있다고 가정
                if (roles.includes('ROLE_ADMIN')) {
                    setIsAdmin(true);
                }
            } catch (e) {
                console.error("Error decoding token for role check:", e);
            }
        }

        const fetchCompanionDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/companions/${companionId}`);
                console.log('응답확인:', response.data);
                setTitle(response.data.companionTitle);
                setContent(response.data.companionContent);
                setIsNotice(response.data.companionNotice || false);
                setInitialDataLoaded(true); // 데이터 로드 완료 표시

                // 현재 로그인된 사용자가 작성자인지 확인하여 수정 권한 부여
                // const token = localStorage.getItem("accessToken");
                if (token) {
                    try {
                        const decodedToken = jwtDecode(token); //사용자가 맞는지 토큰
                        const currentMemberCode = decodedToken.memberCode;
                        const authorMemberCode = response.data.authorMemberCode;
                        const roles = decodedToken.roles || [];

                        if (!roles.includes('ROLE_ADMIN') && authorMemberCode && authorMemberCode !== currentMemberCode) {
                            alert("게시글 수정 권한이 없습니다.");
                            navigate(`/community/companion/${companionId}`);
                        }

                    } catch (decodeError) {
                        console.error("토큰 디코딩 실패:", decodeError);
                        alert("인증 정보가 유효하지 않습니다. 다시 로그인해주세요.");
                        navigate('/login'); // 로그인 페이지로 이동
                    }
                } else {
                    alert("로그인이 필요합니다.");
                    navigate('/login'); // 로그인 페이지로 이동
                }

            } catch (err) {
                console.error("게시글 상세 정보를 불러오는데 실패 했습니다.", err);
                setError("게시글 상세 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.");
            } finally {
                setLoading(false);
            }
        };

        fetchCompanionDetail();
    }, [companionId, navigate]); // companionId와 navigate가 변경될 때마다 effect 실행

    const validateForm = () => {
        let isValid = true;
        setTitleError('');
        setContentError('');
        setFormError('');

        if (!title.trim()) {
            setTitleError('제목을 입력해주세요.');
            isValid = false;
        } else if (title.length > 50) {
            setTitleError('제목은 50자를 초과할 수 없습니다.');
            isValid = false;
        }

        if (!content.trim()) {
            setContentError('내용을 입력해주세요.');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const token = localStorage.getItem('accessToken');
        if (!token) {
            setFormError('로그인이 필요합니다.');
            return;
        }

        const params = new URLSearchParams();
        params.append('companionTitle', title);
        params.append('companionContent', content);
        // 관리자인 경우 또는 공지사항 상태가 변경된 경우에만 isNotice 파라미터 추가
        if (isAdmin) {
            params.append('isNotice', isNotice);
        }

        try {
            await axios.put(
                `/companions/${companionId}`,
                params,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }
            );
            alert('게시글이 성공적으로 수정되었습니다.');
            navigate(`/community/companion/${companionId}`); // 수정된 상세 페이지로 이동
        } catch (err) {
            console.error('게시글 수정 실패:', err.response?.data || err.message);
            if (err.response && err.response.status === 401) {
                setFormError('인증되지 않은 사용자입니다. 다시 로그인해주세요.');
            } else if (err.response && err.response.status === 403) {
                setFormError('게시글 수정 권한이 없습니다.');
            } else if (err.response && err.response.data && err.response.data.message) {
                if(err.response.data.errors) {
                    const errors = err.response.data.errors;
                    errors.forEach(error => {
                        if (error.field === 'companionTitle') setTitleError(error.defaultMessage);
                        if (error.field === 'companionContent') setContentError(error.defaultMessage);
                    });
                } else {
                    setFormError(err.response.data.message);
                }
            } else {
                setFormError('게시글 수정 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            }
        }
    };

    const handleCancel = () => {
        navigate(`/community/companion/${companionId}`); // 상세 페이지로 돌아가기
    };

    const handleIsNoticeChange = (e) => {
        setIsNotice(e.target.checked);
    };

    // 로딩 또는 에러 상태 처리
    if (loading) return <div>게시글 정보를 불러오는 중...</div>;
    if (error) return <div>{error}</div>;
    if (!initialDataLoaded) return null; // 초기 데이터 로드 전에는 아무것도 표시하지 않음

    // 데이터가 로드되면 등록 폼 컴포넌트를 재사용하여 수정 폼으로 표시
    return (
        <CompanionRegisterCom
            title={title}
            content={content}
            onTitleChange={(e) => {
                setTitle(e.target.value);
                if (titleError) setTitleError('');
                if (formError) setFormError('');
            }}
            onContentChange={(e) => {
                setContent(e.target.value);
                if (contentError) setContentError('');
                if (formError) setFormError('');
            }}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            titleError={titleError}
            contentError={contentError}
            formError={formError}
            isNotice={isNotice} // 공지사항 상태 전달
            onIsNoticeChange={handleIsNoticeChange} // 공지사항 변경 핸들러 전달
            isAdmin={isAdmin} // 관리자 여부 전달

        />
    );
}

export default CompanionEditCon;