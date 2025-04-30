import WishGroupCom from "../../components/wish/WishGroupCom";
import React, { useEffect, useReducer } from "react";
import { reducer, initialState } from "../../modules/wishModule";
import WishListCom from "../../components/wish/WishListCom";
import {getGroups, getItemsInGroup, deleteWish, deleteGroup} from "../../service/wishService";

function WishCon({memberCode}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { groups, selectedGroupCode, wishList } = state;

    useEffect(() => {
        if (memberCode) {
            getGroups(memberCode).then((data) => {
                dispatch({ type: "SET_GROUPS", data });
            });
        }
    }, [memberCode]);

    if (!memberCode) {
        return <p style={{ padding: "2rem" }}>로그인 후 이용해주세요.</p>;
    }

    const handleGroupClick = (groupCode) => {
        dispatch({ type: "SET_SELECTED_GROUP", data: groupCode });
        getItemsInGroup(groupCode).then((data) => {
            dispatch({ type: "SET_WISH_LIST", data });
        });
    };

    const handleDeleteWish = (wishCode) => {
        deleteWish(wishCode).then((data) => {
            dispatch({ type: "SET_WISH_LIST", data });
        });
    };

    const handleDeleteGroup = (groupCode) => {
        deleteGroup(groupCode, memberCode).then((data) => {
            dispatch({ type: "SET_GROUPS", data });
            dispatch({ type: "SET_WISH_LIST", data: [] });
            dispatch({ type: "SET_SELECTED_GROUP", data: null });
        });
    };

    return(
    <>
        <WishGroupCom
            groups={groups}
            onSelect={handleGroupClick}
            onDeleteGroup={handleDeleteGroup}
        />
        <WishListCom
            wishList={wishList}
            onDeleteWish={handleDeleteWish}
            selectedGroupCode={selectedGroupCode}
        />
    </>
    );
}
export default WishCon;