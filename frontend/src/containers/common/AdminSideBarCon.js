import AdminSideBarCom from "../../components/common/AdminSideBarCom";
import React,{useState} from "react";

const adminMenuList = [
    { label: "개인정보조회", path: "/adminmypage" },
    { label: "회원정보조회", path: "/admin/reservations" },
    { label: "상품관리", path: "/admin/contents" },
    { label: "예약관리", path: "/admin/reservations",
    subMenu:[
        {label: "전체조회", path: "/admin/reservations/list"},
        {label: "상품별조회", path: "/admin/reservations/li"}
    ]
    },
    { label: "리뷰관리", path: "/admin/event",
    subMenu:[
            {label: "전체조회", path: "/admin/review/list"},
            {label: "상품별조회", path: "/admin/review/li"}
    ]
    },
    { label: "이벤트관리", path: "/admin/event" },
    { label: "FAQ관리", path: "/admin/event" },
    { label: "1:1문의관리(채팅)", path: "/admin/event" }
];

function AdminSideBarCon() {
    const [activeIdx, setActiveIdx] = useState(0);

    return(
        <>
        <AdminSideBarCom
            menuList={adminMenuList}
            activeIdx={activeIdx}
            setActiveIdx={setActiveIdx}
        />
        </>
    )
}
export default AdminSideBarCon;