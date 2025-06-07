import React, {useEffect, useReducer} from "react";
import MainCom from "../components/MainCom";
import { initialState, reducer } from "../modules/reviewModule";
import {fetchAdProducts} from "../service/ProductService";
import {productFormReducer} from "../modules/productReducer";

function MainCon({accessToken}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [productState, productDispatch] = useReducer(productFormReducer, initialState);

    useEffect(() => {
        fetchAdProducts()
            .then(data => {
                if (Array.isArray(data)) {
                    data.forEach((item, index) => {
                    });
                } else {
                }
                productDispatch({ type: "SET_AD_PRODUCTS", payload: data });
            })
            .catch(()=> {
            });
    }, []);


    return(
        <>
        <MainCom
            accessToken={accessToken}
            state={state}
            dispatch={dispatch}
            adProducts={productState.adProducts}/>
        </>
    )
}
export default MainCon;
