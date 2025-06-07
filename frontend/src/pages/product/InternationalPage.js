// import InternationalCon from "../../containers/product/InternationalCon";
import React, {Suspense, useEffect, useState} from "react";
import Loading from "../../style/product/StyleLoading";

const InternationalCon = React.lazy(() => import("../../containers/product/InternationalCon"));


function InternationalPage() {
    const [minLoadingTimePassed, setMinLoadingTimePassed] = useState(false);
    const accessToken = localStorage.getItem("accessToken");

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



    return (
        <>
            <Suspense fallback={<Loading/>}>
                <InternationalCon accessToken={accessToken}/>
            </Suspense>
        </>
    )
}

export default InternationalPage