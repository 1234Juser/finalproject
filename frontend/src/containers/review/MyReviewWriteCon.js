import {useEffect, useRef, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {getInfoForWriteReview, submitReview} from '../../service/reviewService';
import SimpleModal from '../../components/common/SimpleModal';
import ReviewFormCom from "../../components/review/ReviewFormCom";

function MyReviewWriteCon({ memberCode }) {
    const { orderCode } = useParams();
    const [productTitle, setProductTitle] = useState("");
    const [selectedRating, setSelectedRating] = useState(0);
    const [reviewContent, setReviewContent] = useState("");
    // const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const selectedFileRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 수정용
    const [reviewData, setReviewData] = useState({
        reviewRating: 5,
        reviewContent: '',
        reviewPicFile: null,
    });
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const data = await getInfoForWriteReview(orderCode);
                console.log("상품명 로드 성공:", data.productTitle);
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
            selectedFileRef.current = file;
            console.log("파일 선택됨:", file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // 업로드 하려고 선택한 사진 삭제 기능
    const handleFileRemove = () => {
        selectedFileRef.current = null;
        setImagePreview(null);
        fileInputRef.current.value = "";  // 파일 선택 초기화
        console.log("파일 선택이 취소되었습니다.");
    };

    const handleSubmit = async () => {
        try {
            if (selectedRating === 0) {
                alert("별점을 선택해주세요.");
                return;
            }

            if (!reviewContent.trim()) {
                alert("리뷰 내용을 작성해주세요.");
                return;
            }

            const trimmedContent = reviewContent.trim();

            if (trimmedContent.length < 10) {
                alert("리뷰는 10자 이상 500자 이하로 작성해주세요.");
                return;
            }

            if (trimmedContent.length > 500) {
                alert("리뷰는 500자 이하로 작성해주세요.");
                return;
            }

            await submitReview(orderCode, selectedRating, reviewContent, selectedFileRef.current);
            setIsModalOpen(true);
        } catch (e) {
            console.error("리뷰 전송 실패:", e);
            alert("리뷰 등록에 실패했습니다. 다시 시도해주세요.");
        }
    };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //
    //     const contentLength = reviewData.reviewContent.trim().length;
    //     if (contentLength < 10 || contentLength > 500) {
    //         alert('리뷰는 10자 이상 500자 이하로 작성해주세요.');
    //         return;
    //     }

    const handleModalConfirm = () => {
        setIsModalOpen(false);
        navigate("/my/reservations"); // 예약 목록 페이지로 이동
    };

    return (
        <>
            <ReviewFormCom
                productTitle={productTitle}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                imagePreview={imagePreview}
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
                handleFileRemove={handleFileRemove}
                handleSubmit={async () => await handleSubmit()}
                setReviewContent={setReviewContent}
            />
            {isModalOpen && (
                <SimpleModal
                    message="감사합니다! 리뷰가 성공적으로 등록되었습니다."
                    onConfirm={handleModalConfirm}
                />
            )}
        </>
    );
}
export default MyReviewWriteCon;