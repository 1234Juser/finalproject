import styled from "styled-components";
import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {getInfoForWriteReview} from "../../service/reviewService";

const ReviewFormWrap = styled.div`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 2rem;
    box-sizing: border-box;
    background-color: #fff;
`;

const Title = styled.h2`
    font-size: 1.3rem;
    margin-bottom: 1rem;
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
    padding: 1rem;
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
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background-color: #3399ff;  //dodgerblue
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        background-color: #267acc;
    }
`;

const HiddenFileInput = styled.input`
    display: none;
`;

function ReviewForm() {
    const { orderCode } = useParams();
    const [productTitle, setProductTitle] = useState("");
    const [selectedRating, setSelectedRating] = useState(0);
    // const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const data = await getInfoForWriteReview(orderCode);
                setProductTitle(data.productTitle);
            } catch (e) {
                console.error("리뷰 작성 정보 로딩 실패", e);
            }
        };
        fetchInfo();
    }, [orderCode]);

    const handlePhotoBoxClick = () => {
        fileInputRef.current?.click(); // 클릭 시 파일 선택 창 열기
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("파일 선택됨:", file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <ReviewFormWrap>
            <Title>[{productTitle}] 어떠셨나요?</Title>

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
                <HiddenFileInput
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
            </PhotoUpload>

            <SubmitButton>등록</SubmitButton>
        </ReviewFormWrap>
    );
}

export default ReviewForm;