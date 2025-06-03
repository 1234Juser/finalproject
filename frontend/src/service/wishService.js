import axios from "axios";

// const path = "http://localhost:8080"
const path = "https://api.hellotravelogic.link";

export async function getGroups(accessToken) {
    if (!accessToken) {
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

// 찜 추가/삭제 API 호출 함수 수정
export async function toggleWish(productCode, accessToken) {
    if (!accessToken) {
        throw new Error("로그인이 필요합니다.");
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };

    try {
        // RequestBody 없이 productCode만 PathVariable로 전달
        const response = await axios.post(`${path}/wish/toggle/${productCode}`, null, config); // RequestBody를 null로 설정
        return response.data; // "LIKED" 또는 "UNLIKED" 문자열 반환 예상
    } catch (error) {
        throw error;
    }
}

