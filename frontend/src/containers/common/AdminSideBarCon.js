import AdminSideBarCom from "../../components/common/AdminSideBarCom";
import React,{useState} from "react";

const adminMenuList = [
    { label: "개인정보조회", path: "/adminmypage" },
    { label: "회원정보조회", path: "/admin/memberSearch" },
    { label: "전체상품관리",
        subMenu:[
            {label: "전체 상품 목록", path: "/admin/productAll"},
            {label: "상품 신규 등록", path: "/admin/productReg"}
        ]
    },
    { label: "예약관리",
        subMenu:[
            {label: "전체예약관리", path: "/admin/booking"},
            {label: "상품별조회", path: "/admin/booking/by-product"},
            {label: "예약통계", path: "/admin/booking/chart"}
        ]
    },
    { label: "리뷰관리",
        subMenu:[
            {label: "전체리뷰관리", path: "/admin/review"},
            {label: "상품별조회", path: "/admin/review/by-product"}
    ]
    },
    { label: "이벤트관리", path: "/event" },
    { label: "FAQ관리", path: "/faq" },
    { label: "여행커뮤니티관리", path: "/community/companion" },
    { label: "1:1문의관리(채팅)", path: "/admin/inquirychat" },
    { label: "실시간조회수관리", path: "/realtime"}
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