import React, { useEffect, useState } from "react";
import FaqListCom from "../../components/faq/FaqListCom";
import axios from "axios";

function FaqListCon() {
    const [faqs, setFaqs] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        axios.get(`https://api.hellotravelogic.link/faq?page=${page}`)
            .then(res => {
                setFaqs(res.data.content);
                setTotalPages(res.data.totalPages);
            })
            .catch(console.error);
    }, [page]);

    return (
        <FaqListCom
            faqs={faqs}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
        />
    );
}
export default FaqListCon;