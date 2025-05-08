import React, { useEffect, useState } from "react";
import SearchProductCom from "../../components/search/SearchProductCom";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function SearchProductCon() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("q") || "";

    useEffect(() => {
        if (!keyword) {
            setProducts([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        axios.get(`/search?query=${encodeURIComponent(keyword)}`)
            .then((res) => setProducts(res.data))
            .catch(() => setProducts([]))
            .finally(() => setLoading(false));
    }, [keyword]);

    return (
        <SearchProductCom products={products} loading={loading} keyword={keyword} />
    );
}

export default SearchProductCon;