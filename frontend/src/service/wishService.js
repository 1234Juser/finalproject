import axios from "axios";

const path ="http://localhost:8080";

export async function getGroups(memberCode) {
    const response = await axios.get(`/wish/groups/${memberCode}`);
    return response.data;
}
export async function getItemsInGroup(groupCode) {
    const response = await axios.get(`/wish/groups/${groupCode}/items`);
    return response.data;
}
export async function deleteWish(wishCode) {
    const response = await axios.delete(`/wish/list/${wishCode}`);
    return response.data; // 삭제 후 해당 그룹의 새 리스트
}
export async function deleteGroup(groupCode, memberCode) {
    const response = await axios.delete(`/wish/groups/${groupCode}`, {
        params: { memberCode },
    });
    return response.data; // 삭제 후 전체 그룹 리스트 반환
}