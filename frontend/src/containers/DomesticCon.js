import React, {useEffect, useState} from 'react';
import DomesticCom from "../components/DomesticCom";
import {getProductsList} from "../service/ProductService";

const DomesticCon = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductsList()
            .then( data => {
                console.log("data : ", data)
                setProducts(data);
            })
            .catch((err) => console.error(err))
    }, []);


    return (
        <>
          <DomesticCom products={products}/>
        </>
    );
};

export default DomesticCon;