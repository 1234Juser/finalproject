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
    const [existingImages, setExistingImages] = useState([]); // 기존 이미지 정보 (예: { id: 1, url: '...' })
    const [newImages, setNewImages] = useState([]); // 새로 추가할 이미지 파일 (FileList 또는 File 객체 배열)
    const [imagePreviews, setImagePreviews] = useState([]); // 전체 이미지 미리보기 URL (기존 + 새로 추가)
    const [deletedImageIds, setDeletedImageIds] = useState([]); // 삭제된 기존 이미지 ID 목록


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
                // console.log('응답확인:', response.data);
                setTitle(response.data.companionTitle);
                setContent(response.data.companionContent);
                setIsNotice(response.data.companionNotice || false);
                setInitialDataLoaded(true); // 데이터 로드 완료 표시

                // 기존 이미지 정보 설정
                if (response.data.images) {
                    // 기존 이미지 정보에 'isExisting: true' 플래그 추가
                    const existingImageData = response.data.images.map(img => ({ ...img, isExisting: true }));
                    setExistingImages(existingImageData);

                    // 초기 로드 시 기존 이미지 미리보기를 설정
                    setImagePreviews(existingImageData.map(img => img.imageUrl));
                } else {
                    setExistingImages([]);
                    setImagePreviews([]);
                }
                setInitialDataLoaded(true); // 데이터 로드 완료 표시


                // 현재 로그인된 사용자가 작성자인지 확인하여 수정 권한 부여
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
                        // console.error("토큰 디코딩 실패:", decodeError);
                        alert("인증 정보가 유효하지 않습니다. 다시 로그인해주세요.");
                        navigate('/login'); // 로그인 페이지로 이동
                    }
                } else {
                    alert("로그인이 필요합니다.");
                    navigate('/login'); // 로그인 페이지로 이동
                }

            } catch (err) {
                // console.error("게시글 상세 정보를 불러오는데 실패 했습니다.", err);
                setError("게시글 상세 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.");
            } finally {
                setLoading(false);
            }
        };

        fetchCompanionDetail();

    }, [companionId, navigate]); // companionId, navigate가 변경될 때마다 effect 실행

    // existingImages 또는 newImages 배열이 변경될 때마다 이미지 미리보기 URL을 재생성하고 이전 URL을 해제합니다.
    useEffect(() => {
        // 초기 데이터 로드가 완료된 후에만 실행
        if (initialDataLoaded) {
            // 새로 추가된 이미지 파일(newImages)을 기반으로 새로운 미리보기 URL 생성
            const newImagePreviewUrls = newImages.map(image => URL.createObjectURL(image));

            // 전체 이미지 미리보기 URL 생성 (기존 이미지 URL + 새로 추가된 이미지 URL)
            const allImagePreviewUrls = [...existingImages.map(img => img.imageUrl), ...newImagePreviewUrls];
            setImagePreviews(allImagePreviewUrls);

            // cleanup 함수: 컴포넌트 언마운트 시 또는 existingImages/newImages가 다시 변경될 때 실행되어
            // 새로 생성된 URL들만 해제합니다.
            return () => {
                newImagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
            };
        }
    }, [existingImages, newImages, initialDataLoaded]); // existingImages, newImages, initialDataLoaded 배열이 변경될 때마다 이 effect 실행



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

    // 내용의 이미지 마크다운 태그 번호를 재조정하는 함수 (기존 로직 유지)
    const reindexImageTagsInContent = (contentToReindex) => {
        let reindexedContent = '';
        const imageTagPattern = /<이미지(\d+)>/g;
        const matches = [];
        let match;

        // 현재 내용에서 모든 이미지 태그를 찾습니다.
        imageTagPattern.lastIndex = 0; // 정규식의 lastIndex를 초기화해야 반복 검색이 제대로 동작합니다.
        while ((match = imageTagPattern.exec(contentToReindex)) !== null) {
            matches.push({ tag: match[0], number: parseInt(match[1], 10), index: match.index });
        }

        // 태그 인덱스를 기반으로 오름차순 정렬
        matches.sort((a, b) => a.index - b.index);

        let lastIndex = 0;
        matches.forEach((matchInfo, newIndex) => {
            const oldTag = matchInfo.tag;
            const newTag = `<이미지${newIndex + 1}>`; // 1부터 시작하는 새 번호 부여
            reindexedContent += contentToReindex.substring(lastIndex, matchInfo.index);
            reindexedContent += newTag;
            lastIndex = matchInfo.index + oldTag.length;
        });

        reindexedContent += contentToReindex.substring(lastIndex);

        return reindexedContent;
    };

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        // 새로 선택된 파일들을 newImages 상태에 추가
        setNewImages(prevImages => [...prevImages, ...selectedFiles]);

        const markdownTags = [];

        // 현재 내용에서 <이미지N> 형태의 태그 중 가장 큰 숫자를 찾습니다.
        let maxImageNumber = 0;
        const contentImageTags = content.match(/<이미지(\d+)>/g) || [];
        contentImageTags.forEach(tag => {
            const num = parseInt(tag.replace('<이미지', '').replace('>', ''), 10);
            if (num > maxImageNumber) {
                maxImageNumber = num;
            }
        });

        // 새로 추가된 이미지 파일들에 대한 마크다운 태그 생성
        selectedFiles.forEach((file, index) => {
            // 기존 내용의 가장 큰 이미지 번호 + 새로 추가될 이미지의 순서
            const imageIndex = maxImageNumber + index + 1;
            markdownTags.push(`<이미지${imageIndex}>`);
        });

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
    const handleRemoveExistingImage = (imageId) => {
        // 삭제된 이미지 ID 목록에 추가 (중복 방지)
        setDeletedImageIds(prevIds => [...new Set([...prevIds, imageId])]);

        // existingImages 상태에서 해당 이미지 제거
        setExistingImages(prevImages => prevImages.filter(image => image.id !== imageId));

        // 내용에서 해당 이미지 태그를 제거하고, 남은 이미지 태그의 번호를 재조정합니다.
        const imageUrlToRemove = existingImages.find(img => img.id === imageId)?.imageUrl;
        if (imageUrlToRemove) {
            const imageIndex = existingImages.findIndex(img => img.id === imageId) + 1; // 기존 이미지의 순서 (1부터 시작)
            const tagToRemove = `<이미지${imageIndex}>`;

            let updatedContent = content.replace(tagToRemove, '');

            // 이미지 태그 번호 재조정
            updatedContent = reindexImageTagsInContent(updatedContent);
            setContent(updatedContent);
        }
    };

    // 새로 추가된 이미지 삭제 핸들러
    const handleRemoveNewImage = (indexToRemove) => {
        // newImages 상태에서 해당 이미지 파일 제거
        setNewImages(prevImages => prevImages.filter((_, idx) => idx !== indexToRemove));

        // imagePreviews에서 해당 미리보기 URL 제거 (자동 업데이트)

        // 내용에서 해당 이미지 태그를 제거하고, 남은 이미지 태그의 번호를 재조정합니다.
        // 현재 내용에서 모든 이미지 태그를 다시 파싱하여 인덱스를 재조정합니다.
        const imageTagPattern = /<이미지(\d+)>/g;
        let currentImageTagsInContent = [];
        let match;
        while ((match = imageTagPattern.exec(content)) !== null) {
            currentImageTagsInContent.push({ tag: match[0], number: parseInt(match[1], 10), index: match.index });
        }

        // 삭제하려는 이미지 태그를 찾습니다.
        // 이 부분은 기존 로직과 충돌할 수 있으므로, 전체 이미지 태그를 다시 파싱하여 처리하는 것이 안전합니다.
        // (existingImages + newImages) 배열의 순서와 내용의 태그 순서를 일치시켜야 합니다.

        // 전체 이미지(기존 + 새로 추가)의 현재 순서를 기준으로 삭제할 태그를 찾습니다.
        const allCurrentImages = [...existingImages.map(img => img.imageUrl), ...newImages.map(img => URL.createObjectURL(img))];
        let tagToDelete = null;

        // 삭제하려는 이미지의 실제 인덱스 (전체 이미지 배열 기준)
        const realIndexToRemove = existingImages.length + indexToRemove;

        if (realIndexToRemove < allCurrentImages.length) {
            // 내용에서 해당 인덱스의 이미지 태그를 제거합니다.
            // 여기서는 실제 이미지 파일의 인덱스를 기반으로, 내용에서 해당 태그를 찾는 로직이 필요합니다.
            // 가장 간단한 방법은, 내용에서 모든 이미지 태그를 추출하고, 삭제할 태그를 식별하여 제거한 후 재조정하는 것입니다.

            let updatedContent = content;
            const contentTags = [];
            const regex = /<이미지(\d+)>/g;
            let currentMatch;
            while ((currentMatch = regex.exec(content)) !== null) {
                contentTags.push({ fullTag: currentMatch[0], number: parseInt(currentMatch[1]), index: currentMatch.index });
            }

            // contentTags를 번호 순서대로 정렬 (불필요할 수 있지만 안전을 위해)
            contentTags.sort((a, b) => a.number - b.number);

            if (contentTags.length > realIndexToRemove) {
                const tagToRemoveFromContent = contentTags[realIndexToRemove].fullTag;
                updatedContent = updatedContent.replace(tagToRemoveFromContent, '');
            }

            // 이미지 태그 번호 재조정
            updatedContent = reindexImageTagsInContent(updatedContent);
            setContent(updatedContent);
        }

    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setFormError('입력 필드를 모두 올바르게 작성해주세요.');
            return;
        }

        setLoading(true);
        setError(null);
        setFormError('');

        try {
            const formData = new FormData();
            formData.append('companionTitle', title);
            // content를 reindexImageTagsInContent를 통해 재조정된 내용으로 설정
            formData.append('companionContent', content);
            formData.append('isNotice', isNotice);

            newImages.forEach(image => {
                formData.append('images', image);
            });

            // deletedImageIds가 존재하면 추가
            if (deletedImageIds.length > 0) {
                // 각 ID를 별도의 파라미터로 추가 (Spring Boot의 @RequestParam List<Long>에 매핑)
                deletedImageIds.forEach(id => {
                    formData.append('deletedImageIds', id);
                });
            }

            const token = localStorage.getItem("accessToken");
            if (!token) {
                alert("로그인이 필요합니다.");
                navigate('/login');
                return;
            }

            await axios.put(`/companions/${companionId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            alert("게시글이 성공적으로 수정되었습니다.");
            navigate(`/community/companion/${companionId}`);
        } catch (err) {
            console.error("게시글 수정 실패:", err);
            if (err.response && err.response.status === 403) {
                setFormError("게시글을 수정할 권한이 없습니다.");
            } else if (err.response && err.response.data) {
                setFormError(`게시글 수정 실패: ${err.response.data.message || err.response.data}`);
            } else {
                setFormError("게시글 수정 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate(`/community/companion/${companionId}`);
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>오류: {error}</div>;
    }

    return (
        <CompanionRegisterCom
            title={title}
            content={content}
            onTitleChange={(e) => setTitle(e.target.value)}
            onContentChange={(e) => setContent(e.target.value)}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            titleError={titleError}
            contentError={contentError}
            formError={formError}
            isNotice={isNotice}
            onIsNoticeChange={(e) => setIsNotice(e.target.checked)}
            isAdmin={isAdmin}
            images={newImages} // 새로 추가될 이미지 파일 목록
            onImageChange={handleImageChange}
            imagePreviews={imagePreviews} // 전체 이미지 미리보기 URL
            contentTextareaRef={contentTextareaRef}
            existingImages={existingImages} // 기존 이미지 목록
            onRemoveExistingImage={handleRemoveExistingImage} // 기존 이미지 삭제 핸들러
            onRemoveNewImage={handleRemoveNewImage} // 새로 추가된 이미지 삭제 핸들러
        />
    );
}

export default CompanionEditCon;