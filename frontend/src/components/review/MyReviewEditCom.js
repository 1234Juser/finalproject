import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {
    CenteredContainer, HiddenFileInput, PhotoBox, PhotoUpload, RemoveButton,
    ReviewFormWrap, StarRating, TextArea, Title
} from "../../style/review/StyleReviewForm";

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

function MyReviewEditCom({ review,
                             imagePreview,
                             fileInputRef,
                             handleFileChange,
                             handleFileRemove,
                             handleSubmit }) {
    const [editData, setEditData] = useState({
        reviewRating: 5,
        reviewContent: '',
    });

    const [previewUrl, setPreviewUrl] = useState(null);

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

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(editData);
    };

    return (
    <CenteredContainer>
        <ReviewFormWrap>
            <Title>리뷰 수정하기</Title>
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div>
                    <label>평점:</label>
                    <StarRating
                    >
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <span
                                key={rating}
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
                        ref={fileInputRef}
                        accept="image/*"
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