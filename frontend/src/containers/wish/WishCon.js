import WishGroupCom from "../../components/wish/WishGroupCom";
import React, { useEffect, useReducer } from "react";
import { reducer, initialState } from "../../modules/wishModule";
import WishListCom from "../../components/wish/WishListCom";
import {getGroups, getItemsInGroup, deleteWish, deleteGroup} from "../../service/wishService";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function WishCon({memberCode, groupCode}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { groups, selectedGroupCode, wishList } = state;
    const isGroupView = !groupCode;
    const isListView = !!groupCode && !isNaN(parseInt(groupCode, 10));
    const selectedGroup = groups.find(group => group.groupCode === selectedGroupCode);
    const navigate = useNavigate();
    // <ThumbImg />클릭시 해당 그룹에 담긴 위시상품들 리스트 페이지로 이동한다.
    const handleClickGroup = (groupCode) => {
        navigate(`/wish/groups/${groupCode}/items`);
    };
    const handleClickProduct = (productUid) => {
        navigate(`/products/${productUid}`);
    };

    useEffect(() => {
        if (!memberCode || isNaN(memberCode)) return;
                console.log("WishCon 안에서 memberCode 확인:", memberCode);
        if (memberCode) {
            getGroups(memberCode).then((data) => {
                console.log("받은 그룹 목록:", data);
                dispatch({ type: "SET_GROUPS", data });
            });
        }
    }, [memberCode]);

    useEffect(() => {
        if (groupCode) {
            const groupCodeNum = parseInt(groupCode, 10);
            dispatch({ type: "SET_SELECTED_GROUP", data: groupCodeNum });

            getItemsInGroup(groupCodeNum)
                .then((data) => {
                    dispatch({ type: "SET_WISH_LIST", data });
                })
                .catch((err) => {
                    console.error("위시 리스트 가져오기 실패", err);
                });
        }
    }, [groupCode]);

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

    const handleAddWish = async (productCode) => {
        try {
            await axios.post("/wish/add", {
                productCode,
                memberCode,
            });

            // 그룹 자동 생성됐을 수 있으니, 목록 다시 불러오기
            const groups = await getGroups(memberCode);
            dispatch({ type: "SET_GROUPS", data: groups });

        } catch (e) {
            alert("찜 추가 실패!");
            console.error(e);
        }
    };

    return(
    <>
        {isGroupView && (<WishGroupCom
            groups={groups}
            onClickGroup={handleClickGroup}
            onDeleteGroup={handleDeleteGroup}
        />)}
        {isListView && (<WishListCom
            groups={groups}
            wishList={wishList}
            onDeleteWish={handleDeleteWish}
            selectedGroupCode={selectedGroupCode}
            groupTitle={selectedGroup?.groupTitle}
            onClickProduct={handleClickProduct}
        />)}
    </>
    );
}
export default WishCon;