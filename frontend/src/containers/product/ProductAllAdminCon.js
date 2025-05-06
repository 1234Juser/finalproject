import ProductAllAdminCom from "../../components/product/ProductAllAdminCom";
import {getProductsList, ProductDelete} from "../../service/ProductService";
import {useState, useEffect} from "react";

function ProductAllAdminCon() {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);


    const fetchProducts = (currentPage) => {
        getProductsList(currentPage)
            .then((data) => {
                console.log("data 확인:", data);
                setProducts(data.productList || []);
                setCurrentPage(data.currentPage || 1);
                setTotalPages(data.totalPages || 0);
                setTotalItems(data.totalItems || 0);
            })
            .catch((err) => console.error("상품 조회 오류", err));
    };


    useEffect(() => {
        fetchProducts(currentPage)
    }, [currentPage]);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const onDelete = async (productUid) => {
        const confirmDelete = window.confirm("삭제하시겠습니까?");
        if (confirmDelete) {
            try {
                const response = await ProductDelete(productUid);
                if (response.ok) {
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
            <ProductAllAdminCom products={products} currentPage={currentPage} totalPages={totalPages} totalItems={totalItems}
                                                onPageChange={handlePageChange} onDelete={onDelete}/>
        </>
    )
}

export  default ProductAllAdminCon