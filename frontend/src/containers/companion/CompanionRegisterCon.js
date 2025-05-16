import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CompanionRegisterCom from '../../components/companion/CompanionRegisterCom';

function CompanionRegisterCon() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isNotice, setIsNotice] = useState(false); // 공지사항 상태 추가
    const [isAdmin, setIsAdmin] = useState(false); // 관리자 여부 상태 추가
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const [formError, setFormError] = useState(''); // 폼 전체 에러 메시지
    const navigate = useNavigate();

    useEffect(() => {
        // 사용자 역할 확인 (예: localStorage 사용)
        const roles = JSON.parse(localStorage.getItem('roles') || '[]');
        if (roles.includes('ROLE_ADMIN')) {
            setIsAdmin(true);
        }
    }, []);

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

        // URLSearchParams를 사용하여 데이터를 application/x-www-form-urlencoded 형식으로 준비
        const params = new URLSearchParams();
        params.append('companionTitle', title);
        params.append('companionContent', content);
        if (isAdmin) { // 관리자인 경우에만 isNotice 파라미터 추가
            params.append('isNotice', isNotice);
        }


        // 추가: 전송 직전 값 확인
        console.log('Submitting data:', { title, content, token });
        console.log('URLSearchParams:', params.toString());


        try {
            await axios.post(
                '/companions',
                params, // 수정된 데이터 형식
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // URLSearchParams를 사용할 경우 Axios가 Content-Type을 자동으로 설정해주는 경우가 많지만,
                        // 명시적으로 'Content-Type': 'application/x-www-form-urlencoded'를 추가할 수도 있습니다.
                    },
                }
            );
            alert('게시글이 성공적으로 등록되었습니다.');
            navigate('/community/companion');
        } catch (err) {
            console.error('게시글 등록 실패:', err.response?.data || err.message);
            if (err.response && err.response.status === 401) {
                setFormError('인증되지 않은 사용자입니다. 다시 로그인해주세요.');
            } else if (err.response && err.response.status === 403) {
                setFormError('게시글을 등록할 권한이 없습니다.');
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
            }
            else {
                setFormError('게시글 등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            }
        }
    };

    const handleCancel = () => {
        navigate('/community/companion');
    };

    const handleIsNoticeChange = (e) => {
        setIsNotice(e.target.checked);
    };


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
            isNotice={isNotice}
            onIsNoticeChange={handleIsNoticeChange}
            isAdmin={isAdmin}
        />
    );
}

export default CompanionRegisterCon;