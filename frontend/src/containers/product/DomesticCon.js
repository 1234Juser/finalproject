import React, {useEffect, useState} from 'react';
import DomesticCom from "../../components/product/DomesticCom";
import {getDomList, getProductsList} from "../../service/ProductService";

const DomesticCon = () => {

    const [domestic , setDomestic] = useState([]);

    useEffect(() => {
        getDomList()
            .then( data => {
                console.log("data : ", data)
                setDomestic(data);
            })
            .catch((err) => console.error(err))
    }, []);


    return (
        <>
          <DomesticCom domestic={domestic}/>
        </>
    );
};

export default DomesticCon;