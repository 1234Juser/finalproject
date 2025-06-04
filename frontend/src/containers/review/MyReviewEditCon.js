import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getReviewByReviewCode, getReviewImage, updateReview} from "../../service/reviewService";
import MyReviewEditCom from "../../components/review/MyReviewEditCom";

function MyReviewEditCon({ accessToken }) {
    const { reviewCode } = useParams(); // URL에서 reviewCode 가져오기
    const [state, dispatch] = useState({})
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [reviewData, setReviewData] = useState({
        reviewRating: null,
        reviewContent: "",
        reviewPicFile: null,
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    // 기존 리뷰 데이터를 불러오는 함수
    useEffect(() => {
        const fetchReviewData = async () => {
            try {
                const reviewData = await getReviewByReviewCode(reviewCode, accessToken);
                setReviewData({
                    reviewRating: reviewData.reviewRating,
                    reviewContent: reviewData.reviewContent || "",
                    reviewPicFile: null,
                });
                if (reviewData.reviewPic) {
                    // const imageBlob = await fetch(`/review/${reviewData.reviewPic}/image`);
                    const imageBlob = await getReviewImage(reviewData.reviewPic);
                    const imageUrl = URL.createObjectURL(await imageBlob.blob());
                    setImagePreview(imageUrl);
                }
            } catch (e) {
                if (e.response) {
                    if (e.response.status === 403) {
                        alert("리뷰를 수정할 권한이 없습니다.");
                    } else if (e.response.status === 400) {
                        alert("요청이 잘못되었습니다.");
                    } else {
                        alert("리뷰 수정 중 오류가 발생했습니다.");
                    }
                } else {
                    alert("서버와 연결할 수 없습니다.");
                }
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
        setReviewData((prev) => ({
            ...prev,
            reviewPicFile: null,
        }));
    };

    // 리뷰 수정 제출 핸들러
    const handleSubmit = async (reviewData) => {
        try {
            if (reviewData.reviewRating === undefined || reviewData.reviewRating === null || isNaN(reviewData.reviewRating)) {
                alert("평점을 입력해주세요.");
                return;
            }
            if (!reviewData.reviewContent || reviewData.reviewContent.trim() === "") {
                alert("리뷰 내용을 입력해주세요.");
                return;
            }
            const formData = new FormData();
            formData.append("reviewRating", reviewData.reviewRating);
            formData.append("reviewContent", reviewData.reviewContent);
            if (selectedFile) {
                formData.append("reviewPic", selectedFile);
            } else {
                // 파일 삭제 요청을 위해 빈 파일 추가
                formData.append("reviewPic", "");
            }

            const response = await updateReview({
                reviewCode,
                formData,
                accessToken,
            });

            if (response.status === 200) {
                alert("리뷰가 성공적으로 수정되었습니다.");
                navigate(-1);
            }
        } catch (error) {
            alert("리뷰 수정에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <MyReviewEditCom
            review={reviewData}
            imagePreview={imagePreview}
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            handleFileRemove={handleFileRemove}
            handleSubmit={handleSubmit}
        />
    );
}

export default MyReviewEditCon;