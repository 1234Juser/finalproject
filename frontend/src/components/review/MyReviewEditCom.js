import {useEffect, useState} from 'react';
import styled from 'styled-components';

const CenteredContainer = styled.div`
    //display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* 화면 중앙에 배치하기 위해 추가 */
`;

const ReviewFormWrap = styled.div`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 2rem;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

const Title = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
`;

const StarRating = styled.div`
    display: flex;
    gap: 0.5rem;
    font-size: 2rem;
    color: #ccc;
    margin-bottom: 1rem;
    .star {
        cursor: pointer;
        transition: color 0.2s;
    }
    .star.active {
        color: #ffd700;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 120px;
    resize: none;
    font-size: 1rem;
    margin-top: 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
`;

const PhotoUpload = styled.div`
    margin-top: 2rem;
`;

const PhotoBox = styled.div`
    width: 100%;
    height: 160px;
    background: #f8f8f8;
    border: 1px dashed #ccc;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #888;
    font-size: 0.95rem;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
        border-color: #999;
        color: #555;
    }
`;

const SubmitButton = styled.button`
    margin-top: 2rem;
    width: 40%;
    padding: 0.8rem;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background-color: #3399ff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    &:hover {
        background-color: #267acc;
    }
`;

const CancelButton = styled.button`
    margin-top: 2rem;
    width: 40%;
    padding: 0.8rem;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background-color: #999;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    &:hover {
        background-color: #777;
    }
`;

const RemoveButton = styled.button`
    margin-top: 0.5rem;
    background-color: #ff6666;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    cursor: pointer;
    &:hover {
        background-color: #cc4444;
    }
`;

const HiddenFileInput = styled.input`
    display: none;
`;

function MyReviewEditCom({ review,
                             imagePreview,
                             fileInputRef,
                             handleFileChange,
                             handleFileRemove,
                             handleSubmit }) {
    const [editData, setEditData] = useState({
        // reviewRating: review.reviewRating || 5,
        // reviewContent: review.reviewContent || '',
        // reviewPicFile: null,
        reviewRating: 5,
        reviewContent: '',
    });

    const [previewUrl, setPreviewUrl] = useState(null);
    //
    // useEffect(() => {
    //     if (review.reviewPic) {
    //         setPreviewUrl(`/upload/path/${review.reviewPic}`);
    //     }
    // }, [review.reviewPic]);
    useEffect(() => {
        if (review) {
            setEditData({
                reviewRating: review.reviewRating,
                reviewContent: review.reviewContent || '',
            });
        }
    }, [review]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "reviewRating") {
            setEditData((prev) => ({
                ...prev,
                [name]: name === "reviewRating" ? Number(value) : value,
            }));
        } else {
            setEditData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
        if (name === 'reviewPicFile') {
            const file = files[0];
            setEditData((prev) => ({
                ...prev,
                reviewPicFile: file,
            }));
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setPreviewUrl(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        } else {
            setEditData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     onSubmit(editData); // 부모(Con)로 수정 데이터 전달
    // };
    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(editData);
    };

    return (
    <CenteredContainer>
        <ReviewFormWrap>
            <Title>리뷰 수정하기</Title>
            {/*<form onSubmit={handleSubmit} encType="multipart/form-data">*/}
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div>
                    <label>평점:</label>
                    <StarRating
                        // name="reviewRating"
                        // value={editData.reviewRating}
                        // onChange={handleChange}
                        // onChange={(e) =>
                        //     dispatch({
                        //         type: "UPDATE_SELECTED_REVIEW",
                        //         data: { reviewRating: Number(e.target.value) },
                        //     })
                        // }
                    >
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <span
                                key={rating}
                                // value={rating}
                                className={`star ${editData.reviewRating >= rating ? "active" : ""}`}
                                onClick={() => setEditData((prev) => ({ ...prev, reviewRating: rating }))}>
                                ★
                            </span>
                        ))}
                    </StarRating>
                </div>
                    <TextArea
                        name="reviewContent"
                        placeholder="리뷰 내용을 입력해주세요."
                        value={editData.reviewContent}
                        onChange={handleChange}
                        rows={5}
                        cols={50}
                    />

                <PhotoUpload>
                    <p>사진을 공유해주세요. <span style={{ color: "#888" }}>(선택)</span></p>
                    <PhotoBox onClick={() => fileInputRef.current.click()}>
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="리뷰 미리보기"
                                style={{
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                    objectFit: "contain",
                                    display: "block",
                                }}
                            />
                        ) : (
                            <span>사진 업로드 영역</span>
                        )}
                    </PhotoBox>
                        {imagePreview && (
                            <RemoveButton onClick={handleFileRemove}>사진 삭제</RemoveButton>
                        )}
                    <HiddenFileInput
                        type="file"
                        // name="reviewPicFile"
                        ref={fileInputRef}
                        accept="image/*"
                        // onChange={handleChange}
                        onChange={handleFileChange}
                    />
                </PhotoUpload>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <SubmitButton type="submit">수정 완료</SubmitButton>
                    <CancelButton type="button" onClick={() => window.history.back()}>취소</CancelButton>
                </div>
            </form>
        </ReviewFormWrap>
    </CenteredContainer>
    );
}

export default MyReviewEditCom;