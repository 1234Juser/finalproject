import ProductAllAdminCom from "../../components/product/ProductAllAdminCom";
import {getProductsList} from "../../service/ProductService";
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


    return (
        <>
            <ProductAllAdminCom products={products} currentPage={currentPage} totalPages={totalPages} totalItems={totalItems}
                                                onPageChange={handlePageChange}/>
        </>
    )
}

export  default ProductAllAdminCon