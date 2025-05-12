import {useEffect, useState} from 'react';

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
                reviewRating: review.reviewRating || 5,
                reviewContent: review.reviewContent || '',
            });
        }
    }, [review]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "reviewRating") {
            setEditData((prev) => ({
                ...prev,
                reviewRating: Number(value),
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
        <div className="review-edit-page">
            <h2>리뷰 수정하기</h2>
            {/*<form onSubmit={handleSubmit} encType="multipart/form-data">*/}
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div>
                    <label>평점:</label>
                    <select
                        name="reviewRating"
                        value={editData.reviewRating || 5}
                        onChange={handleChange}
                        // onChange={(e) =>
                        //     dispatch({
                        //         type: "UPDATE_SELECTED_REVIEW",
                        //         data: { reviewRating: Number(e.target.value) },
                        //     })
                        // }
                    >
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <option key={rating} value={rating}>
                                {rating}점
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>리뷰 내용:</label>
                    <textarea
                        name="reviewContent"
                        value={editData.reviewContent}
                        onChange={handleChange}
                        rows={5}
                        cols={50}
                    />
                </div>

                {/*{previewUrl && (*/}
                {/*    <div style={{ marginTop: '20px' }}>*/}
                {/*        <img*/}
                {/*            src={previewUrl}*/}
                {/*            alt="리뷰 미리보기"*/}
                {/*            style={{ maxWidth: '400px', width: '100%', height: 'auto', borderRadius: '10px' }}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*)}*/}
                {imagePreview && (
                    <div style={{ marginTop: '20px' }}>
                        <img
                            src={imagePreview}
                            alt="리뷰 미리보기"
                            style={{ maxWidth: '400px', width: '100%', height: 'auto', borderRadius: '10px' }}
                        />
                        <button type="button" onClick={handleFileRemove}>사진 삭제</button>
                    </div>
                )}

                <div>
                    <label>사진 첨부 (선택):</label>
                    <input
                        type="file"
                        // name="reviewPicFile"
                        ref={fileInputRef}
                        accept="image/*"
                        // onChange={handleChange}
                        onChange={handleFileChange}
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <button type="submit">수정 완료</button>
                    <button type="button" onClick={() => window.history.back()}>취소</button>
                </div>
            </form>
        </div>
    );
}

export default MyReviewEditCom;