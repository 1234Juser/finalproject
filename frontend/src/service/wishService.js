import axios from "axios";

// const path = "http://localhost:8080"
const path = "https://hellotravelogic.link";

export async function getGroups(accessToken) {
    if (!accessToken) {
        console.error("Missing accessToken in getGroups");
        return;
    }
    const config = {
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };
    try {
        const response = await axios.get(`${path}/wish/groups`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function getItemsInGroup(groupCode, accessToken) {
    if (!accessToken) {
        console.error("Missing accessToken in getItemsInGroup");
        return;
    }
    const config = {
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };
    try {
        const response = await axios.get(`${path}/wish/groups/${groupCode}/items`, config);
        return response.data;
    } catch (error) {
        throw error;
    }

}
export async function deleteWish(wishCode, accessToken) {
    if (!accessToken) {
        console.error("Missing accessToken in getItemsInGroup");
        return;
    }
    const config = {
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };
    try {
        const response = await axios.delete(`${path}/wish/list/${wishCode}`, config);
        return response.data; // 삭제 후 해당 그룹의 새 리스트
    } catch (error) {
        throw error;
    }

}
export async function deleteGroup(groupCode, accessToken) {
    if (!accessToken) {
        console.error("Missing accessToken in getItemsInGroup");
        return;
    }
    const config = {
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };
    try {
        const response = await axios.delete(`${path}/wish/groups/${groupCode}`, config);
        return response.data; // 삭제 후 전체 그룹 리스트 반환
    } catch (error) {
        throw error;
    }
}