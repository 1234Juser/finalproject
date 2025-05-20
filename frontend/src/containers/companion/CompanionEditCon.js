import React, {useState, useEffect, useRef} from 'react';
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

    // 이미지 관련 상태 추가
    const [images, setImages] = useState([]); // 새로 추가/수정할 이미지 파일 (FileList 또는 File 객체 배열)
    const [imagePreviews, setImagePreviews] = useState([]); // 새로 추가/수정할 이미지 미리보기 URL
    const [existingImages, setExistingImages] = useState([]); // 기존 이미지 정보 (예: { id: 1, url: '...' })

    const contentTextareaRef = useRef(null); // StyledTextarea에 대한 ref 추가


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

                // 기존 이미지 정보 설정
                if (response.data.images) {
                    setExistingImages(response.data.images);
                }

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

        // 컴포넌트 언마운트 시 이미지 미리보기 URL 해제
        return () => {
            imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
        };

    }, [companionId, navigate, imagePreviews]); // companionId, navigate, imagePreviews가 변경될 때마다 effect 실행

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
        // 새로 선택된 파일들을 images 상태에 추가
        setImages(prevImages => [...prevImages, ...selectedFiles]);

        const previews = [];
        const markdownTags = [];

        // 기존 이미지 개수와 새로 추가될 이미지 개수를 합하여 마크다운 태그 인덱스 계산
        const totalExistingImagesCount = existingImages.length;
        const totalNewImagesCount = images.length;

        // 새로 추가된 이미지 파일들에 대한 미리보기 및 마크다운 태그 생성
        selectedFiles.forEach((file, index) => {
            // 기존 이미지 개수 + 현재 images 상태의 새 이미지 개수 + 새로 선택된 파일의 인덱스 + 1
            const imageIndex = totalExistingImagesCount + totalNewImagesCount + index + 1;
            previews.push(URL.createObjectURL(file));
            markdownTags.push(`<이미지${imageIndex}>`);
        });

        // 기존 미리보기에 새 미리보기 추가 (새로 추가된 이미지에 대한 미리보기만 관리)
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
    };

    // 기존 이미지 삭제 핸들러
    const handleRemoveExistingImage = (imageId, imageUrl, index) => {
        // 내용에서 해당 이미지 마크다운 태그 제거
        // 기존 이미지 인덱스는 0부터 시작한다고 가정
        const tagToRemove = `<이미지${index + 1}>`;
        setContent(prevContent => prevContent.replace(tagToRemove, ''));

        // 기존 이미지 목록에서 해당 이미지 제거
        setExistingImages(existingImages.filter(img => img.id !== imageId));


        // TODO: 필요한 경우 백엔드에 이미지 삭제 요청을 보내는 로직 추가
        // 백엔드 API에 따라 이미지 삭제 로직 구현 필요
        // 예: axios.delete(`/companions/images/${imageId}`)
        console.log(`기존 이미지 삭제 요청: Image ID = ${imageId}, URL = ${imageUrl}`);
    };

    // 새로 추가된 이미지 삭제 핸들러
    const handleRemoveNewImage = (indexToRemove) => {
        // images 상태에서 해당 인덱스의 파일 제거
        const newImages = images.filter((_, index) => index !== indexToRemove);
        setImages(newImages);

        // imagePreviews 상태에서 해당 인덱스의 미리보기 URL 제거 및 해제
        URL.revokeObjectURL(imagePreviews[indexToRemove]);
        const newImagePreviews = imagePreviews.filter((_, index) => index !== indexToRemove);
        setImagePreviews(newImagePreviews);

        // 내용에서 해당 이미지 마크다운 태그 제거
        // 새로 추가된 이미지 인덱스는 existingImages.length부터 시작한다고 가정
        const tagIndexInContent = existingImages.length + indexToRemove + 1;
        const tagToRemove = `<이미지${tagIndexInContent}>`;
        setContent(prevContent => prevContent.replace(tagToRemove, ''));
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

        // FormData를 사용하여 파일과 데이터를 함께 전송
        const formData = new FormData();
        formData.append('companionTitle', title);
        formData.append('companionContent', content);
        if (isAdmin) { // 관리자인 경우에만 isNotice 파라미터 추가
            formData.append('isNotice', isNotice);
        }
        // 새로 추가된 이미지 파일들을 FormData에 추가
        images.forEach(image => {
            formData.append('images', image);
        });
        // 삭제된 기존 이미지 ID 목록을 백엔드로 전송 (필요에 따라 구현)
        // 예: 삭제할 이미지 ID 목록을 별도의 파라미터로 추가
        // const deletedImageIds = existingImages.map(img => img.id).filter(id => !newExistingImages.some(newImg => newImg.id === id));
        // formData.append('deletedImageIds', JSON.stringify(deletedImageIds));


        try {
            await axios.put(
                `/companions/${companionId}`,
                formData, // FormData 전송
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // FormData를 사용할 때는 'Content-Type': 'multipart/form-data' 명시
                        'Content-Type': 'multipart/form-data'
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
            images={images} // 새로 추가된 이미지 파일 목록 전달
            onImageChange={handleImageChange} // 이미지 변경 핸들러 전달
            imagePreviews={imagePreviews} // 새로 추가된 이미지 미리보기 URL 목록 전달
            existingImages={existingImages} // 기존 이미지 목록 전달
            onRemoveExistingImage={handleRemoveExistingImage} // 기존 이미지 삭제 핸들러 전달
            onRemoveNewImage={handleRemoveNewImage} // 새로 추가된 이미지 삭제 핸들러 전달
            contentTextareaRef={contentTextareaRef} // ref 전달

        />
    );
}

export default CompanionEditCon;