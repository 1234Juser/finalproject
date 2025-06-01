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

    // 이미지 관련 상태 수정: 기존 이미지와 새로 추가된 이미지를 분리
    const [existingImages, setExistingImages] = useState([]); // 기존 이미지 정보 (예: { id: 'uuid.jpg', url: '/upload/community/uuid.jpg' })
    const [newImages, setNewImages] = useState([]); // 새로 추가할 이미지 파일 (FileList 또는 File 객체 배열)
    const [imagePreviews, setImagePreviews] = useState([]); // 전체 이미지 미리보기 URL (기존 + 새로 추가)
    const [deletedImageUrls, setDeletedImageUrls] = useState([]); // 삭제된 기존 이미지 URL 목록


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
                setTitle(response.data.companionTitle);
                setContent(response.data.companionContent);
                setIsNotice(response.data.companionNotice || false);

                if (response.data.companionImageUrls && Array.isArray(response.data.companionImageUrls) && response.data.companionImageUrls.length > 0) {
                    // console.log("기존 이미지 데이터 수신:", response.data.companionImageUrls);
                    // const existingImageData = response.data.companionImageUrls.map((url) => {
                    //     // url 예시: "upload/community/filename.jpg" 또는 "/upload/community/filename.jpg"
                    //     const imageUrl = url.startsWith('/') ? url : `/${url}`;
                    //     return {
                    //         // id를 URL 자체로 사용하거나, URL에서 파일명만 추출하여 ID로 사용할 수 있습니다.
                    //         // 여기서는 백엔드에서 삭제 시 URL 전체가 필요하므로 URL을 그대로 사용하거나,
                    //         // 백엔드가 식별할 수 있는 형태로 저장합니다.
                    //         // 편의상 URL의 마지막 부분을 ID로 활용하고, 전체 URL도 유지합니다.
                    //         id: imageUrl.substring(imageUrl.lastIndexOf('/') + 1), // 예: "filename.jpg"
                    //         imageUrl: imageUrl, // 예: "/upload/community/filename.jpg"
                    //         isExisting: true
                    //     };
                    // });

                    const existingImageData = response.data.companionImageUrls.map((url) => {
                        const imageUrl = url;
                        return {
                            // id는 파일명으로, imageUrl은 전체 URL로 사용합니다.
                            id: imageUrl.substring(imageUrl.lastIndexOf('/') + 1),
                            imageUrl: imageUrl, // 정상적인 S3 전체 URL이 저장됩니다.
                            isExisting: true
                        };
                    });

                    setExistingImages(existingImageData);
                    setImagePreviews(existingImageData.map(img => img.imageUrl));
                    // console.log("existingImages 설정 완료:", existingImageData);
                    // console.log("imagePreviews 초기 설정 완료 (기존 이미지):", existingImageData.map(img => img.imageUrl));
                } else {
                    setExistingImages([]);
                    setImagePreviews([]);
                    // console.log("수신된 기존 이미지 없음 또는 빈 배열입니다.");
                }

                setInitialDataLoaded(true);


                if (token) {
                    try {
                        const decodedToken = jwtDecode(token);
                        const currentMemberCode = decodedToken.memberCode;
                        const authorMemberCode = response.data.authorMemberCode;
                        const roles = decodedToken.roles || [];

                        if (!roles.includes('ROLE_ADMIN') && authorMemberCode && authorMemberCode !== currentMemberCode) {
                            alert("게시글 수정 권한이 없습니다.");
                            navigate(`/community/companion/${companionId}`);
                        }

                    } catch (decodeError) {
                        alert("인증 정보가 유효하지 않습니다. 다시 로그인해주세요.");
                        navigate('/login');
                    }
                } else {
                    alert("로그인이 필요합니다.");
                    navigate('/login');
                }

            } catch (err) {
                setError("게시글 상세 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.");
                setInitialDataLoaded(true);
            } finally {
                setLoading(false);
            }
        };


        fetchCompanionDetail();

    }, [companionId, navigate]);

    useEffect(() => {
        if (initialDataLoaded) {
            const newImagePreviewUrls = newImages.map(image => URL.createObjectURL(image));
            const allImagePreviewUrls = [...existingImages.map(img => img.imageUrl), ...newImagePreviewUrls];
            setImagePreviews(allImagePreviewUrls);

            return () => {
                newImagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
            };
        }
    }, [existingImages, newImages, initialDataLoaded]);



    const validateForm = () => {
        // ... (기존 유효성 검사 로직)
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

    const reindexImageTagsInContent = (contentToReindex) => {
        // ... (기존 이미지 태그 재조정 로직)
        let reindexedContent = '';
        const imageTagPattern = /<이미지(\d+)>/g;
        const matches = [];
        let match;

        imageTagPattern.lastIndex = 0;
        while ((match = imageTagPattern.exec(contentToReindex)) !== null) {
            matches.push({ tag: match[0], number: parseInt(match[1], 10), index: match.index });
        }

        matches.sort((a, b) => a.index - b.index);

        let lastIndex = 0;
        matches.forEach((matchInfo, newIndex) => {
            const oldTag = matchInfo.tag;
            const newTag = `<이미지${newIndex + 1}>`;
            reindexedContent += contentToReindex.substring(lastIndex, matchInfo.index);
            reindexedContent += newTag;
            lastIndex = matchInfo.index + oldTag.length;
        });

        reindexedContent += contentToReindex.substring(lastIndex);

        return reindexedContent;
    };

    const handleImageChange = (e) => {
        // ... (기존 새 이미지 추가 로직)
        const selectedFiles = Array.from(e.target.files);
        setNewImages(prevImages => [...prevImages, ...selectedFiles]);

        const markdownTags = [];
        let maxImageNumber = 0;
        const contentImageTags = content.match(/<이미지(\d+)>/g) || [];
        contentImageTags.forEach(tag => {
            const num = parseInt(tag.replace('<이미지', '').replace('>', ''), 10);
            if (num > maxImageNumber) {
                maxImageNumber = num;
            }
        });

        selectedFiles.forEach((file, index) => {
            const imageIndex = maxImageNumber + index + 1;
            markdownTags.push(`<이미지${imageIndex}>`);
        });

        const textarea = contentTextareaRef.current;
        if (textarea) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const newContent = content.substring(0, start) + markdownTags.join('') + content.substring(end);
            setContent(newContent);

            const newCursorPosition = start + markdownTags.join('').length;
            setTimeout(() => {
                textarea.selectionStart = newCursorPosition;
                textarea.selectionEnd = newCursorPosition;
                textarea.focus();
            }, 0);
        }
    };


    // 기존 이미지 삭제 핸들러: imageUrl을 받아서 처리
    const handleRemoveExistingImage = (imageUrlToRemove) => {
        // const urlForBackend = imageUrlToRemove.startsWith('/') ? imageUrlToRemove.substring(1) : imageUrlToRemove;
        const urlForBackend = imageUrlToRemove;
        setDeletedImageUrls(prevUrls => [...new Set([...prevUrls, urlForBackend])]);

        // 삭제될 이미지의 원래 인덱스를 imagePreviews에서 찾습니다.
        // imagePreviews는 [기존 이미지 URL ..., 새 이미지 blob URL ...] 순서입니다.
        const imageIndexInPreviews = imagePreviews.findIndex(url => url === imageUrlToRemove);

        if (imageIndexInPreviews !== -1) {
            const tagNumberToRemove = imageIndexInPreviews + 1;
            const tagToRemoveRegex = new RegExp(`<이미지${tagNumberToRemove}>`, 'g');
            const updatedContent = content.replace(tagToRemoveRegex, '');
            setContent(reindexImageTagsInContent(updatedContent));
        }

        setExistingImages(prevImages => prevImages.filter(img => img.imageUrl !== imageUrlToRemove));
    };

    const handleRemoveNewImage = (indexToRemoveInNewImages) => { // indexToRemove는 newImages 배열 내에서의 인덱스
        // 삭제될 새 이미지가 전체 미리보기(imagePreviews)에서 몇 번째인지 계산합니다.
        // imagePreviews = [existing1, existing2, ..., new1, new2, ...]
        // 삭제할 새 이미지의 imagePreviews 인덱스 = existingImages.length + indexToRemoveInNewImages
        const imageIndexInPreviews = existingImages.length + indexToRemoveInNewImages;

        if (imageIndexInPreviews < imagePreviews.length) { // 유효한 인덱스인지 확인
            const tagNumberToRemove = imageIndexInPreviews + 1;
            const tagToRemoveRegex = new RegExp(`<이미지${tagNumberToRemove}>`, 'g');
            const updatedContent = content.replace(tagToRemoveRegex, '');
            setContent(reindexImageTagsInContent(updatedContent));
        }

        setNewImages(prevImages => prevImages.filter((_, index) => index !== indexToRemoveInNewImages));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        let finalContent = content;
        // 기존 이미지 삭제 후 + 새 이미지 추가 후 최종적으로 이미지 태그 번호 재정렬
        if (deletedImageUrls.length > 0 || newImages.length > 0) {
            finalContent = reindexImageTagsInContent(finalContent);
            setContent(finalContent); // 상태도 업데이트
        }


        const formData = new FormData();
        formData.append('companionTitle', title);
        formData.append('companionContent', finalContent); // 재정렬된 내용으로 전송
        if (isAdmin && isNotice !== undefined) {
            formData.append('isNotice', isNotice);
        }

        // 새로 추가된 이미지들만 'images' 파트에 추가
        newImages.forEach(imageFile => {
            formData.append('images', imageFile);
        });

        // 삭제된 기존 이미지 URL 목록을 'deletedImageUrls' 파트에 추가 (List<String> 형태)
        // Spring MVC는 기본적으로 동일한 이름의 파라미터를 List로 받습니다.
        deletedImageUrls.forEach(url => {
            formData.append('deletedImageIds', url); // 파라미터 이름은 Controller와 일치해야 합니다. (deletedImageIds)
        });


        try {
            await axios.put(`/companions/${companionId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            alert('게시글이 성공적으로 수정되었습니다.');
            navigate(`/community/companion/${companionId}`);
        } catch (err) {
            console.error("게시글 수정 실패:", err.response ? err.response.data : err.message);
            setFormError(err.response?.data?.message || "게시글 수정 중 오류가 발생했습니다.");
        }
    };


    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;
    if (!initialDataLoaded) return <div>게시글 정보를 불러오는 중입니다...</div>;


    return (
        <CompanionRegisterCom
            title={title}
            content={content}
            onTitleChange={(e) => setTitle(e.target.value)}
            onContentChange={(e) => setContent(e.target.value)}
            onSubmit={handleSubmit}
            onCancel={() => navigate(`/community/companion/${companionId}`)}
            titleError={titleError}
            contentError={contentError}
            formError={formError}
            isNotice={isNotice}
            onIsNoticeChange={(e) => setIsNotice(e.target.checked)}
            isAdmin={isAdmin}
            // images={newImages} // 이 prop은 CompanionRegisterCom에서 직접 사용되지 않고 handleImageChange로 관리됨
            onImageChange={handleImageChange} // 새 이미지 추가 핸들러
            imagePreviews={imagePreviews} // 모든 미리보기 (기존 + 신규)
            contentTextareaRef={contentTextareaRef}
            existingImages={existingImages} // 기존 이미지 목록
            onRemoveExistingImage={handleRemoveExistingImage} // 기존 이미지 삭제 핸들러 (imageUrl 전달)
            onRemoveNewImage={handleRemoveNewImage} // 새로 추가된 이미지 삭제 핸들러
            isEditMode={true} // 수정 모드임을 명시
        />
    );
}

export default CompanionEditCon;