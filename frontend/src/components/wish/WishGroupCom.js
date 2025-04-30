import React from "react";
import {useNavigate} from "react-router-dom";

function WishGroupCom({ groups, onSelect, onDeleteGroup }) {
    const navigate = useNavigate();
    // <ThumbImg />클릭시 해당 그룹에 담긴 위시상품들 리스트 페이지로 이동한다.
    const selectClick = (group) => {
        navigate(`/wish/${group.code}`);
    }
    return(
    <>
        <div style={{ width: "300px" }}>
            <h3>찜 그룹</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {groups.map(group => (
                    <li key={group.groupCode} style={{ marginBottom: "1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span
                                style={{ cursor: "pointer", color: "blue" }}
                                onClick={() => onSelect(group.groupCode)}
                            >
                                {group.groupTitle} ({group.wishCount})
                            </span>
                            <button onClick={() => onDeleteGroup(group.groupCode)}>삭제</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </>
    )
}
export default WishGroupCom;