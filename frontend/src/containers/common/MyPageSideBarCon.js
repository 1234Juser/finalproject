import MyPageSideBarCom from "../../components/common/MyPageSideBarCom";
import React,{useState} from "react";

const menuList = [
    { label: "개인정보조회", path: "/mypage" },
    { label: "예약내역", path: "/mypage/reservations" },
    { label: "나의 리뷰", path: "/mypage/review" },
    { label: "나의 커뮤니티글", path: "/mypage/community" },
    { label: "이벤트 조회", path: "/mypage/event" },
    { label: "FAQ조회", path: "/mypage/faq" },
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
