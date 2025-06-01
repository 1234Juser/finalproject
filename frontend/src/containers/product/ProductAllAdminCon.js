import ProductAllAdminCom from "../../components/product/ProductAllAdminCom";
import {getProductsList, ProductDelete} from "../../service/ProductService";
import {useState, useEffect} from "react";
import {PageButton} from "../../style/product/StyledProductAllAdmin";

function ProductAllAdminCon() {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    // 현재 보여지는 페이지 범위 (=버튼 갯수 5개로 설정)
    const [pageRange, setPageRange] = useState({
        start: 1,
        end: 5
    });


    // 페이지가 변경될 때 마다 호출되는 함수
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handlePrev = () => {
        if (pageRange.start > 1) {
            const newStart = pageRange.start - 5;
            const newEnd = pageRange.end - 5;
            setPageRange({
                start: newStart,
                end: newEnd,
            });
            setCurrentPage(newStart);
        }
    };

    const handleNext = () => {
        if (pageRange.end < totalPages) {
            const newStart = pageRange.start + 5;
            const newEnd = Math.min(pageRange.end + 5, totalPages);
            setPageRange({
                start: newStart,
                end: newEnd,
            });
            setCurrentPage(newStart);
        }
    };

    // pageRange에 해당하는 페이지 번호만 버튼으로 생성
    const renderPageButtons = () => {
        const pages = [];
        for (let i = pageRange.start; i <= pageRange.end; i++) {
            pages.push(
                <PageButton
                    key={i}
                    className={currentPage === i ? "active" : ""}
                    onClick={() => handlePageChange(i)}
                    disabled={currentPage === i}
                >
                    {i}
                </PageButton>
            );
        }
        return pages;
    };

    const handleFirst = () => {
        setPageRange({
            start: 1,
            end: Math.min(5, totalPages),
        });
        setCurrentPage(1);
    };

    const handleLast = () => {
        const lastPageGroupStart = Math.floor((totalPages - 1) / 5) * 5 + 1;
        setPageRange({
            start: lastPageGroupStart,
            end: totalPages,
        });
        setCurrentPage(totalPages);
    };





    const fetchProducts = (currentPage) => {
        getProductsList(currentPage)
            .then((data) => {
                setProducts(data.productList || []);
                setCurrentPage(data.currentPage || 1);
                setTotalPages(data.totalPages || 0);
                setTotalItems(data.totalItems || 0);
            })
            .catch((err) => console.error("상품 조회 오류", err));
    };


    useEffect(() => {
        fetchProducts(currentPage)
        setPageRange({
            start: Math.floor((currentPage - 1) / 5) * 5 + 1,
            end: Math.min(Math.floor((currentPage - 1) / 5) * 5 + 5, totalPages),
        });
    }, [currentPage, totalPages]);


    const onDelete = async (productUid) => {
        const confirmDelete = window.confirm("삭제하시겠습니까?");
        if (confirmDelete) {
            try {
                const response = await ProductDelete(productUid);
                if (response.ok) {
                    // console.log('삭제 완료', response.ok);
                    alert("삭제가 완료되었습니다!");
                    // setTimeout(() => {
                    //     fetchProducts(currentPage);
                    // }, 1000);
                    fetchProducts(currentPage);
                }
            } catch (error) {
                console.error("삭제 중 오류 발생: ", error);
            }
        }
    }


    return (
        <>
            <ProductAllAdminCom products={products} handlePrev={handlePrev} handleNext={handleNext} renderPageButtons={renderPageButtons}
                                pageRange={pageRange} onPageChange={handlePageChange} onDelete={onDelete} totalPages={totalPages}
                                handleFirst={handleFirst} handleLast={handleLast} currentPage={currentPage}/>
        </>
    )
}

export  default ProductAllAdminCon