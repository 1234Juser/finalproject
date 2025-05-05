import axios from "axios";

const path ="http://localhost:8080";

export async function getGroups() {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        console.error("Token does not exist in localStorage");
        return;
    }
    const config = {
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.get(`${path}/wish/groups`, config);
        return response.data;
    } catch (error) {
        console.error("GetGroups Failed", error.response?.data || error.message);
        throw error;
    }
}
export async function getItemsInGroup(groupCode) {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        console.error("Token does not exist in localStorage");
        return;
    }
    const config = {
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.get(`${path}/wish/groups/${groupCode}/items`, config);
        return response.data;
    } catch (error) {
        console.error("GetItems Failed", error.response?.data || error.message);
        throw error;
    }

}
export async function deleteWish(wishCode) {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        console.error("Token does not exist in localStorage");
        return;
    }
    const config = {
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.delete(`${path}/wish/list/${wishCode}`, config);
        return response.data; // 삭제 후 해당 그룹의 새 리스트
    } catch (error) {
        console.error("WishDelete Failed", error.response?.data || error.message);
        throw error;
    }

}
export async function deleteGroup(groupCode) {
    const token = localStorage.getItem("accessToken");
    // const token = sessionStorage.getItem("token"); // 로그인 시 저장한 JWT 토큰
    if (!token) {
        console.error("Token does not exist in localStorage");
        return;
    }
    const config = {
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.delete(`${path}/wish/groups/${groupCode}`, config);
        return response.data; // 삭제 후 전체 그룹 리스트 반환
    } catch (error) {
        console.error("GroupDelete Failed", error.response?.data || error.message);
        throw error;
    }
}