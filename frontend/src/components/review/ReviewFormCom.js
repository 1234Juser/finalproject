import {
    CenteredContainer,
    HiddenFileInput, PhotoBox, PhotoUpload,
    RemoveButton, ReviewFormWrap,
    StarRating, SubmitButton, TextArea, Title
} from "../../style/review/StyleReviewForm";

function ReviewFormCom({
                           productTitle,
                           selectedRating,
                           setSelectedRating,
                           imagePreview,
                           fileInputRef,
                           handleFileChange,
                           handleFileRemove,
                           handleSubmit,
                           setReviewContent,
                       }) {

    return (
        <>
            <CenteredContainer>
            <ReviewFormWrap>
                <Title>{productTitle ? `[${productTitle}] 어떠셨나요?` : "로딩 중..."}</Title>

                <StarRating>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <span
                            key={num}
                            className={`star ${selectedRating >= num ? "active" : ""}`}
                            onClick={() => setSelectedRating(num)}
                        >★</span>
                    ))}
                </StarRating>

                <label htmlFor="reviewContent">
                    구체적으로 어떤 경험이었나요?
                    <TextArea
                        id="reviewContent"
                        placeholder="이용하기 전에 알기 어려운 사실이나 꿀팁을 알려주세요."
                        onChange={(e) => setReviewContent(e.target.value)}
                    />
                </label>
                <PhotoUpload>
                    <p>사진을 공유해주세요. <span style={{ color: "#888" }}>(선택)</span></p>
                    <PhotoBox onClick={() => fileInputRef.current.click()}>
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="preview"
                                style={{
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                    objectFit: "contain",
                                    display: "block"
                                }} />
                        ) : (
                            <span>사진 업로드 영역</span>
                        )}
                    </PhotoBox>
                    {imagePreview && (
                        <RemoveButton onClick={handleFileRemove}>사진 삭제</RemoveButton>
                    )}
                    <HiddenFileInput
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                </PhotoUpload>
                <SubmitButton onClick={handleSubmit}
                              style={{ marginTop: "2rem",
                                  width: "100%", padding: "0.8rem",
                                  fontWeight: "bold", color: "#fff",
                                  backgroundColor: "#3399ff",
                                  border: "none", borderRadius: "6px",
                                  cursor: "pointer" }}>등록</SubmitButton>
            </ReviewFormWrap>
            </CenteredContainer>
        </>
    );
}

export default ReviewFormCom;