import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ReviewFormCom from "../../components/review/ReviewFormCom";
import {getReviewByOrderCode} from "../../service/reviewService";

function MyReviewEditCon({ accessToken }) {
    const { reviewCode } = useParams(); // URL에서 reviewCode 가져오기
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [selectedRating, setSelectedRating] = useState(0);
    const [reviewContent, setReviewContent] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [productTitle, setProductTitle] = useState("");

    // 기존 리뷰 데이터를 불러오는 함수
    useEffect(() => {
        const fetchReviewData = async () => {
            try {
                const reviewData = await getReviewByOrderCode(reviewCode, accessToken);
                setSelectedRating(reviewData.reviewRating);
                setReviewContent(reviewData.reviewContent);
                setProductTitle(reviewData.productTitle);

                if (reviewData.reviewPic) {
                    const imageBlob = await fetch(`/review/${reviewData.reviewPic}/image`);
                    const imageUrl = URL.createObjectURL(await imageBlob.blob());
                    setImagePreview(imageUrl);
                }
            } catch (error) {
                console.error("리뷰 데이터 로드 실패:", error);
                alert("리뷰를 불러오는 중 오류가 발생했습니다.");
                navigate(-1);
            }
        };

        fetchReviewData();
    }, [reviewCode, accessToken, navigate]);

    // 파일 선택 핸들러
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // 파일 삭제 핸들러
    const handleFileRemove = () => {
        setSelectedFile(null);
        setImagePreview(null);
    };

    // 리뷰 수정 제출 핸들러
    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("reviewRating", selectedRating);
            formData.append("reviewContent", reviewContent);
            if (selectedFile) {
                formData.append("file", selectedFile);
            }

            const response = await updateReview({
                reviewCode,
                formData,
                accessToken,
            });

            if (response.status === 200) {
                alert("리뷰가 성공적으로 수정되었습니다.");
                navigate(-1); // 이전 페이지로 돌아가기
            }
        } catch (error) {
            console.error("리뷰 수정 실패:", error);
            alert("리뷰 수정에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <ReviewFormCom
            productTitle={productTitle}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            imagePreview={imagePreview}
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            handleFileRemove={handleFileRemove}
            handleSubmit={handleSubmit}
            setReviewContent={setReviewContent}
        />
    );
}

export default MyReviewEditCon;