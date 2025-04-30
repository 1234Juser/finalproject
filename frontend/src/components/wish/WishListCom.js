import React from "react";

function WishListCom({ wishList, onDeleteWish, selectedGroupCode }) {
    if (!selectedGroupCode) {
        return <p style={{ padding: "2rem" }}>선택된 그룹이 없어요. 먼저 그룹을 선택해주세요.</p>;
    }
    if (wishList.length === 0) {
        return <p style={{ padding: "2rem" }}>이 그룹에는 찜한 상품이 없어요.</p>;
    }

    if (wishList.length === 0) {
        return <p style={{ padding: "2rem" }}>이 그룹에는 찜한 상품이 없어요.</p>;
    }
    return(
    <>
        <div style={{ flex: 1 }}>
            <h3>위시 리스트</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {wishList.map(item => (
                    <li key={item.wishCode} style={{ marginBottom: "1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>상품 코드: {item.productCode}</span>
                            <button onClick={() => onDeleteWish(item.wishCode)}>삭제</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </>
    )
}
export default WishListCom;