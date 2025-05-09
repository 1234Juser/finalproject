import WishGroupCom from "../../components/wish/WishGroupCom";
import React, { useEffect, useReducer } from "react";
import { reducer, initialState } from "../../modules/wishModule";
import WishListCom from "../../components/wish/WishListCom";
import {getGroups, getItemsInGroup, deleteWish, deleteGroup} from "../../service/wishService";
import {useNavigate} from "react-router-dom";
import axios from "axios";

// accessToken prop 추가
function WishCon({groupCode, accessToken}) {
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
        // props로 받은 accessToken 사용
        if (!accessToken) {
            return;
        }
        console.log("사용 중인 token: ", accessToken); // accessToken 로그 출력
        getGroups(accessToken)
            .then((data) => {
                console.log("받은 그룹 목록:", data);
                dispatch({ type: "SET_GROUPS", data });
            })
            .catch((err) => {
                console.error("위시 그룹 가져오기 실패", err);
            });
    }, [accessToken]); // 의존성 배열에 accessToken 추가

    useEffect(() => {
        if (groupCode && accessToken) { // accessToken이 있을 때만 호출
            const groupCodeNum = parseInt(groupCode, 10);
            dispatch({ type: "SET_SELECTED_GROUP", data: groupCodeNum });

            getItemsInGroup(groupCodeNum, accessToken)
                .then((data) => {
                    dispatch({ type: "SET_WISH_LIST", data });
                })
                .catch((err) => {
                    console.error("위시 리스트 가져오기 실패", err);
                });
        }
    }, [groupCode, accessToken]); // 의존성 배열에 accessToken 추가

    const handleGroupClick = (groupCode) => {
        dispatch({ type: "SET_SELECTED_GROUP", data: groupCode });
        getItemsInGroup(groupCode, accessToken)
            .then((data) => {
                dispatch({ type: "SET_WISH_LIST", data });
            })
            .catch((err) => {
                console.error("리스트 조회 실패", err);
            });
    };

    const handleDeleteWish = (wishCode) => {
        deleteWish(wishCode, accessToken)
            .then((data) => {
                dispatch({ type: "SET_WISH_LIST", data });
            })
            .catch((err) => {
                console.error("찜 삭제 실패", err);
            });
    };

    const handleDeleteGroup = (groupCode) => {
        deleteGroup(groupCode, accessToken)
            .then((data) => {
                dispatch({ type: "SET_GROUPS", data });
                dispatch({ type: "SET_WISH_LIST", data: [] });
                dispatch({ type: "SET_SELECTED_GROUP", data: null });
            })
            .catch((err) => {
                console.error("그룹 삭제 실패", err);
            });
    };

    const handleAddWish = async (productCode) => {
        try {
            const response = await axios.post(`/wish/toggle/${productCode}`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // props로 받은 accessToken 사용
                },
            });

            // 그룹 자동 생성됐을 수 있으니, 목록 다시 불러오기
            // getGroups 호출 시 accessToken 전달
            const groups = await getGroups(accessToken);
            console.log("getGroups 결과:", groups);
            dispatch({ type: "SET_GROUPS", data: groups });

            const status = response.data;
            if (status === "LIKED") {
                console.log("찜 등록 완료");
            } else if (status === "UNLIKED") {
                console.log("찜 취소 완료");
            }

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