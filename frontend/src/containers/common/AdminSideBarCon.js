import AdminSideBarCom from "../../components/common/AdminSideBarCom";
import React,{useState} from "react";

const adminMenuList = [
    { label: "개인정보조회", path: "/adminmypage" },
    { label: "회원정보조회", path: "/admin/reservations" },
    { label: "상품관리", path: "/adminmypage/product" },
    { label: "예약관리", path: "/admin/manage/order/all",
    subMenu:[
        {label: "전체조회", path: "/admin/order/all"},
        {label: "상품별조회", path: "/admin/order/by-product"}
    ]
    },
    { label: "리뷰관리", path: "/admin/manage/review/all",
    subMenu:[
            {label: "전체조회", path: "/admin/manage/review/all"},
            {label: "상품별조회", path: "/admin/manage/review/by-product"}
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