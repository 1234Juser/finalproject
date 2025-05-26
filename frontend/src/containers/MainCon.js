import React, {useReducer} from "react";
import MainCom from "../components/MainCom";
import { initialState, reducer } from "../modules/reviewModule";

function MainCon({accessToken}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <>
        <MainCom
            accessToken={accessToken}
            state={state}
            dispatch={dispatch}/>
        </>
    )
}
export default MainCon;
