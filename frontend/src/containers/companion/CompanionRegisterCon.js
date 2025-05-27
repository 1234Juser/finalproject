import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CompanionRegisterCom from '../../components/companion/CompanionRegisterCom';

function CompanionRegisterCon() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isNotice, setIsNotice] = useState(false); // 공지사항 상태 추가
    const [isAdmin, setIsAdmin] = useState(false); // 관리자 여부 상태 추가
    const [images, setImages] = useState([]); // 이미지 파일 상태 추가
    const [imagePreviews, setImagePreviews] = useState([]); // 이미지 미리보기 URL 상태 추가

    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const [formError, setFormError] = useState(''); // 폼 전체 에러 메시지
    const navigate = useNavigate();

    const contentTextareaRef = useRef(null); // StyledTextarea에 대한 ref


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

    // 이미지 파일 선택 시 호출되는 핸들러
    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        // 기존 이미지에 추가
        setImages(prevImages => [...prevImages, ...selectedFiles]);

        const previews = [];
        const markdownTags = [];

        // 새 이미지 파일들에 대한 미리보기 및 마크다운 태그 생성
        selectedFiles.forEach((file, index) => {
            // 기존 이미지 개수 + 새 이미지 인덱스를 사용하여 고유한 마크다운 태그 생성
            const imageIndex = images.length + index + 1;
            previews.push(URL.createObjectURL(file));
            markdownTags.push(`<이미지${imageIndex}>`);
        });

        // 기존 미리보기에 새 미리보기 추가
        setImagePreviews(prevPreviews => [...prevPreviews, ...previews]);

        // 내용에 이미지 마크다운 태그 삽입 및 커서 이동
        const textarea = contentTextareaRef.current;
        if (textarea) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const newContent = content.substring(0, start) + markdownTags.join('') + content.substring(end);
            setContent(newContent);

            // 이미지 태그 뒤로 커서 이동
            const newCursorPosition = start + markdownTags.join('').length;
            // 상태 업데이트 후 커서 위치를 설정하기 위해 setTimeout 사용
            setTimeout(() => {
                textarea.selectionStart = newCursorPosition;
                textarea.selectionEnd = newCursorPosition;
                textarea.focus(); // 커서가 보이도록 포커스
            }, 0);
        }

        // 기존 미리보기 URL 해제 (메모리 누수 방지)
        // 이 부분은 useEffect에서 관리하는 것이 더 좋습니다.
        // cleanup 함수는 컴포넌트 언마운트 시 또는 의존성 배열이 변경될 때 실행됩니다.
        // handleImageChange 내부에서는 바로 직전 상태의 URL만 해제하게 되므로 적합하지 않습니다.
    };

    // 새로 추가된 이미지 삭제 핸들러
    const handleRemoveNewImage = (indexToRemove) => {
        // 기존 이미지 파일 목록에서 해당 인덱스의 요소를 제거하여 업데이트
        const updatedImages = images.filter((_, index) => index !== indexToRemove);

        // 이미지 파일 목록 상태 업데이트
        setImages(updatedImages);

        // 내용에서 이미지 마크다운 태그를 재조정합니다.
        // 1. 현재 내용에서 모든 이미지 마크다운 태그를 찾습니다.
        const imageTagPattern = /<이미지(\d+)>/g;
        let currentContent = content;
        const matches = [];
        let match;
        while ((match = imageTagPattern.exec(currentContent)) !== null) {
            matches.push({ tag: match[0], number: parseInt(match[1], 10), index: match.index });
        }

        // 2. 제거된 이미지에 해당하는 마크다운 태그를 내용에서 제거합니다.
        const tagToRemove = `<이미지${indexToRemove + 1}>`;
        let contentAfterRemoval = currentContent.replace(tagToRemove, '');

        // 3. 남아있는 이미지 태그의 번호를 순서대로 재조정하고 내용에 반영합니다.
        // 남아있는 이미지 미리보기 URL의 개수를 기준으로 새로운 태그 번호를 부여합니다.
        let updatedContentWithCorrectTags = contentAfterRemoval.replace(/<이미지(\d+)>/g, (match, numberStr) => {
            const originalNumber = parseInt(numberStr, 10);
            if (originalNumber > indexToRemove + 1) {
                return `<이미지${originalNumber - 1}>`;
            }
            return match;
        });

        // 업데이트된 내용으로 상태 설정
        setContent(updatedContentWithCorrectTags);
        // imagePreviews 상태는 images 상태 변경에 따라 useEffect에서 자동으로 업데이트됩니다.
    };

    // images 배열이 변경될 때마다 이미지 미리보기 URL을 재생성하고 이전 URL을 해제합니다.
    useEffect(() => {
        // 현재 imagePreviews에 있는 URL들을 모두 해제합니다.
        imagePreviews.forEach(preview => URL.revokeObjectURL(preview));

        // 새로운 images 배열을 기반으로 새로운 미리보기 URL을 생성합니다.
        const newImagePreviews = images.map(image => URL.createObjectURL(image));

        // imagePreviews 상태를 새로운 URL 목록으로 업데이트합니다.
        setImagePreviews(newImagePreviews);

        // 컴포넌트 언마운트 시 또는 images가 다시 변경될 때 cleanup 함수가 실행되어 현재 URL들을 해제합니다.
        return () => {
            newImagePreviews.forEach(preview => URL.revokeObjectURL(preview));
        };
    }, [images]); // images 배열이 변경될 때마다 이 useEffect 훅이 실행됩니다.


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
        // // URLSearchParams를 사용하여 데이터를 application/x-www-form-urlencoded 형식으로 준비
        // const params = new URLSearchParams();
        // params.append('companionTitle', title);
        // params.append('companionContent', content);
        // if (isAdmin) { // 관리자인 경우에만 isNotice 파라미터 추가
        //     params.append('isNotice', isNotice);
        // }
        //
        //
        // // 추가: 전송 직전 값 확인
        // console.log('Submitting data:', { title, content, token });
        // console.log('URLSearchParams:', params.toString());

        // FormData를 사용하여 파일과 데이터를 함께 전송
        const formData = new FormData();
        formData.append('companionTitle', title);
        formData.append('companionContent', content);
        if (isAdmin) {
            formData.append('isNotice', isNotice);
        }
        // 이미지 파일들을 FormData에 추가
        images.forEach(image => {
            formData.append('images', image);
        });

        // 추가: 전송 직전 값 확인
        // console.log('Submitting data:', { title, content, token, images });
        // console.log('FormData entries:');
        // for (let pair of formData.entries()) {
        //     console.log(pair[0]+ ', '+ pair[1]);
        // }

        try {
            await axios.post(
                '/companions',
                // params, // 수정된 데이터 형식
                formData, // FormData 전송
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // URLSearchParams를 사용할 경우 Axios가 Content-Type을 자동으로 설정해주는 경우가 많지만,
                        // 명시적으로 'Content-Type': 'application/x-www-form-urlencoded'를 추가할 수도 있습니다.
                        'Content-Type': 'multipart/form-data', // FormData를 사용할 때는 명시적으로 지정
                    },
                }
            );
            alert('게시글이 성공적으로 등록되었습니다.');
            navigate('/community/companion');
        } catch (err) {
            // console.error('게시글 등록 실패:', err.response?.data || err.message);
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
            images={images} // 이미지 파일 목록 전달
            onImageChange={handleImageChange} // 이미지 변경 핸들러 전달
            imagePreviews={imagePreviews} // 이미지 미리보기 URL 목록 전달
            contentTextareaRef={contentTextareaRef} // ref 전달
            onRemoveNewImage={handleRemoveNewImage} // 새로 추가된 이미지 삭제 핸들러 전달
        />
    );
}

export default CompanionRegisterCon;