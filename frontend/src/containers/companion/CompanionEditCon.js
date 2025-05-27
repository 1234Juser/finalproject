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
                // console.error("Error decoding token for role check:", e);
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

                    // 기존 이미지 URL을 imagePreviews 상태에 추가하여 미리보기 표시
                    // const existingImageUrls = existingImageData.map(img => img.imageUrl);
                    // 초기 로드 시 기존 이미지 미리보기를 설정
                    // setImagePreviews(existingImageUrls);
                } else {
                    setExistingImages([]);
                    // setImagePreviews([]);
                }
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

            // 기존 이미지 미리보기 URL은 그대로 유지하고, 새로 추가된 이미지 미리보기 URL만 뒤에 추가합니다.
            // imagePreviews 상태를 기존 이미지 URL과 새로 추가된 이미지 URL을 합쳐서 업데이트합니다.
            setImagePreviews([...existingImages.map(img => img.imageUrl), ...newImagePreviewUrls]);

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

    // 내용의 이미지 마크다운 태그 번호를 재조정하는 함수
    const reindexImageTagsInContent = (contentToReindex) => {
        let reindexedContent = '';
        const imageTagPattern = /<이미지(\d+)>/g;
        const matches = [];
        let match;

        // 현재 내용에서 모든 이미지 태그를 찾습니다.
        // 정규식의 lastIndex를 초기화해야 반복 검색이 제대로 동작합니다.
        imageTagPattern.lastIndex = 0;
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

        // 기존 이미지 개수와 현재 newImages 상태의 새 이미지 개수를 합하여 마크다운 태그 인덱스 계산
        const totalExistingImagesCount = existingImages.length;
        const totalNewImagesCount = newImages.length; // handleImageChange 호출 시점의 newImages 상태

        // 새로 추가된 이미지 파일들에 대한 마크다운 태그 생성
        selectedFiles.forEach((file, index) => {
            // 기존 이미지 개수 + 현재 newImages 상태의 새 이미지 개수 + 새로 선택된 파일의 인덱스 + 1
            const imageIndex = totalExistingImagesCount + totalNewImagesCount + index + 1;
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

        // imagePreviews 상태는 existingImages와 newImages 변경에 따라 하단의 useEffect에서 자동으로 업데이트됩니다.
        // 내용의 이미지 마크다운 태그 재조정은 하단의 useEffect에서 처리됩니다.
    };

    // existingImages 또는 newImages 배열이 변경될 때마다 이미지 미리보기 URL을 재생성하고 내용의 마크다운 태그를 재조정합니다.
    useEffect(() => {
        // 초기 데이터 로드가 완료된 후에만 실행
        if (initialDataLoaded) {
            // 새로 추가된 이미지 파일(newImages)을 기반으로 새로운 미리보기 URL 생성
            const newImagePreviewUrls = newImages.map(image => URL.createObjectURL(image));

            // 전체 이미지 미리보기 URL 생성 (기존 이미지 URL + 새로 추가된 이미지 URL)
            const allImagePreviewUrls = [...existingImages.map(img => img.imageUrl), ...newImagePreviewUrls];
            setImagePreviews(allImagePreviewUrls);

            // 전체 이미지 목록(existingImages + newImages)을 기반으로 내용의 마크다운 태그를 재조정합니다.
            // 이 로직은 이미지의 순서가 변경되거나 이미지가 삭제/추가될 때마다 내용의 <이미지N> 태그 번호를 업데이트합니다.
            setContent(prevContent => {
                let currentContent = prevContent;
                const imageTagPattern = /<이미지(\d+)>/g; // 마크다운 태그 패턴

                // 현재 내용에서 모든 이미지 태그를 찾습니다.
                // 정규식의 lastIndex를 초기화해야 반복 검색이 제대로 동작합니다.
                let match;
                const matches = [];
                imageTagPattern.lastIndex = 0;
                while ((match = imageTagPattern.exec(currentContent)) !== null) {
                    matches.push({ tag: match[0], number: parseInt(match[1], 10), index: match.index });
                }

                // 태그 인덱스를 기반으로 오름차순 정렬
                matches.sort((a, b) => a.index - b.index);

                let reindexedContent = '';
                let lastIndex = 0;
                let imageIndex = 1;

                // 내용에서 이미지 태그를 순회하며 새로운 번호로 대체합니다.
                matches.forEach(matchInfo => {
                    reindexedContent += currentContent.substring(lastIndex, matchInfo.index);
                    reindexedContent += `<이미지${imageIndex}>`; // 1부터 시작하는 새 번호 부여
                    lastIndex = matchInfo.index + matchInfo.tag.length;
                    imageIndex++;
                });

                reindexedContent += currentContent.substring(lastIndex);

                return reindexedContent;
            });


            // cleanup 함수: 컴포넌트 언마운트 시 또는 existingImages/newImages가 다시 변경될 때 실행되어
            // 새로 생성된 URL들만 해제합니다.
            return () => {
                newImagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
            };
        }
    }, [existingImages, newImages, initialDataLoaded]); // existingImages, newImages, initialDataLoaded 배열이 변경될 때마다 이 effect 실행


    // 새로 추가된 이미지 삭제 핸들러
    const handleRemoveNewImage = (indexToRemove) => {
        // newImages 배열에서 해당 인덱스의 요소를 제거하여 업데이트
        const updatedNewImages = newImages.filter((_, index) => index !== indexToRemove);
        setNewImages(updatedNewImages);

        // imagePreviews 상태는 existingImages와 updatedNewImages 변경에 따라 useEffect에서 자동으로 업데이트됩니다.

        // 내용에서 이미지 마크다운 태그를 재조정합니다.
        // 이 부분도 existingImages와 updatedNewImages의 최종 순서를 기반으로
        // 내용의 마크다운 태그를 재조정하는 방식으로 변경해야 정확합니다.
        // 일단 여기서는 간단히 해당 태그만 제거하는 예시를 보여줍니다. 실제 구현에서는 좀 더 정교한 로직이 필요합니다.
        setContent(prevContent => {
            // 삭제될 이미지의 마크다운 태그 번호를 찾기 위해 현재 imagePreviews를 사용합니다.
            // 새로 추가된 이미지의 인덱스는 기존 이미지 개수 뒤에 옵니다.
            const totalExistingImagesCount = existingImages.length;
            const tagIndexInContent = totalExistingImagesCount + indexToRemove + 1; // 1부터 시작하는 태그 번호
            const tagPattern = new RegExp(`<이미지${tagIndexInContent}>`, 'g');
            let contentAfterRemoval = prevContent.replace(tagPattern, '');

            // 태그 번호 재조정
            return reindexImageTagsInContent(contentAfterRemoval);
        });
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

        const formData = new FormData();
        formData.append('companionTitle', title);
        formData.append('companionContent', content);
        if (isAdmin) {
            formData.append('isNotice', isNotice);
        }
        // 새로 추가된 이미지 파일들을 FormData에 추가
        newImages.forEach(image => {
            formData.append('images', image); // 서버에서는 images 라는 이름으로 받을 예정
        });
        // 삭제된 기존 이미지 ID 목록을 FormData에 추가 (서버에서 리스트로 받을 수 있도록 반복 추가)
        deletedImageIds.forEach(id => {
            formData.append('deletedImageIds', id); // 서버에서는 deletedImageIds 라는 이름으로 받을 예정
        });


        // 추가: 전송 직전 값 확인
        // console.log('Submitting data:', { title, content, token, newImages, deletedImageIds });
        // console.log('FormData entries:');
        // for (let pair of formData.entries()) {
        //     console.log(pair[0]+ ', '+ pair[1]);
        // }

        try {
            await axios.put(
                `/companions/${companionId}`, // PUT 요청으로 변경
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            alert('게시글이 성공적으로 수정되었습니다.');
            navigate(`/community/companion/${companionId}`); // 수정된 게시글 상세 페이지로 이동
        } catch (err) {
            // console.error('게시글 수정 실패:', err.response?.data || err.message);
            if (err.response && err.response.status === 401) {
                setFormError('인증되지 않은 사용자입니다. 다시 로그인해주세요.');
            } else if (err.response && err.response.status === 403) {
                setFormError('게시글을 수정할 권한이 없습니다.');
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
                setFormError('게시글 수정 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            }
        }
    };


    const handleCancel = () => {
        navigate(`/community/companion/${companionId}`);
    };

    const handleIsNoticeChange = (e) => {
        setIsNotice(e.target.checked);
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
            images={newImages} // 새로 추가된 이미지만 전달 (컴포넌트 내부에서 imagePreviews를 사용하도록 변경 필요)
            onImageChange={handleImageChange}
            imagePreviews={imagePreviews} // 전체 이미지 미리보기 전달
            contentTextareaRef={contentTextareaRef}
            existingImages={existingImages} // 기존 이미지 목록 전달
            onRemoveExistingImage={handleRemoveExistingImage} // 기존 이미지 삭제 핸들러 전달
            onRemoveNewImage={handleRemoveNewImage} // 새로 추가된 이미지 삭제 핸들러 전달
        />
    );
}

export default CompanionEditCon;