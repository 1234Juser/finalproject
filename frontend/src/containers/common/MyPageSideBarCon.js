import MyPageSideBarCom from "../../components/common/MyPageSideBarCom";
import React,{useState} from "react";

const menuList = [
    { label: "개인정보조회", path: "/mypage" },
    { label: "예약내역", path: "/my/reservations" },
    { label: "나의 커뮤니티글", path: "/mypage/community" },
    { label: "이벤트 조회", path: "/event" },
    { label: "FAQ조회", path: "/faq" },
    { label: "회원탈퇴", path: "/mypage/withdrawl" }
];

function MyPageSideBarCon() {
    const [activeIdx, setActiveIdx] = useState(0);

    return (
        <MyPageSideBarCom
            menuList={menuList}
            activeIdx={activeIdx}
            setActiveIdx={setActiveIdx}
        />
    );
}

export default MyPageSideBarCon;
