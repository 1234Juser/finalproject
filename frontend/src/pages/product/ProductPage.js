import React, {Suspense, useEffect, useState} from "react";
import Loading from "../../style/product/StyleLoading";

const ProductCon = React.lazy(() => import("../../containers/product/ProductCon"));


function ProductPage() {
    const [minLoadingTimePassed, setMinLoadingTimePassed] = useState(false);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setMinLoadingTimePassed(true);
        }, 2000);

        return () => {
            clearTimeout(timerId); // 타이머 정리
        };
    }, []);

    // 2초 동안 Loading 컴포넌트 렌더링
    if (!minLoadingTimePassed) {
        return (
            <>
                <Loading />
            </>
        );
    }

    // 2초 경과시 Loading 컴포넌트 렌더링 후 DomesticCon 컴포넌트 렌더링
    return (
        <>
            <Suspense fallback={<Loading />}>
                <ProductCon />
            </Suspense>
        </>
    );
}

export default ProductPage;