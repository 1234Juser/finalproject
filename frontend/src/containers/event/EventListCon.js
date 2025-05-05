import EventListCom from "../../components/event/EventListCom";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    PagingWrapper, PagingButton
} from "../../style/event/EventListStyle";

const isAdmin = () => {
    const roles = JSON.parse(localStorage.getItem("roles") || "[]");
    return roles.includes("ROLE_ADMIN");
};

const formatDate = (isoString) => {
    if (!isoString) return "";
    return isoString.substring(0, 10);
};

function EventListCon() {
    // 탭 및 각 탭별 페이지 번호
    const [tab, setTab] = useState("진행중");
    const [ongoingPage, setOngoingPage] = useState(0);
    const [finishedPage, setFinishedPage] = useState(0);

    const [events, setEvents] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    // 탭/페이지 변경 시 이벤트 목록 로딩
    useEffect(() => {
        let api = "";
        let page = 0;
        if (tab === "진행중") {
            api = "/event";
            page = ongoingPage;
        } else {
            api = "/event/finished";
            page = finishedPage;
        }
        axios.get(api, { params: { page, size: 10 }})
            .then(res => {
                const data = res.data;
                // 날짜 포매팅 처리
                const formatted = data.content.map(event => ({
                    ...event,
                    eventStartdate: formatDate(event.eventStartdate),
                    eventEnddate: formatDate(event.eventEnddate),
                }));
                setEvents(formatted);
                setTotalPages(data.totalPages);
            })
            .catch(err => {
                setEvents([]);
                setTotalPages(0);
                console.error(err);
            });
    }, [tab, ongoingPage, finishedPage]);

    // 탭 변경
    const handleTabChange = (newTab) => {
        setTab(newTab);
        // 탭 클릭 시 해당 탭의 페이지가 0이 아닐 경우 0페이지로 초기화
        if (newTab === "진행중" && ongoingPage !== 0) {
            setOngoingPage(0);
        }
        if (newTab === "종료" && finishedPage !== 0) {
            setFinishedPage(0);
        }
        // setTab 이후 useEffect에서 알아서 처리됨
    };

    // 페이지 변경
    const handlePageChange = (newPage) => {
        if (tab === "진행중") {
            setOngoingPage(newPage);
        } else {
            setFinishedPage(newPage);
        }
    };

    // 현재 페이지 번호
    const page = tab === "진행중" ? ongoingPage : finishedPage;

    return (
        <>
            <EventListCom
                events={events}
                tab={tab}
                onTabChange={handleTabChange}
                showRegisterButton={isAdmin()}
            />
            <PagingWrapper>
                <PagingButton onClick={() => handlePageChange(page - 1)} disabled={page === 0}>이전</PagingButton>
                {Array.from({ length: totalPages }, (_, idx) => (
                    <PagingButton
                        key={idx}
                        active={page === idx}
                        onClick={() => handlePageChange(idx)}
                    >
                        {idx + 1}
                    </PagingButton>
                ))}
                <PagingButton onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>다음</PagingButton>
            </PagingWrapper>
        </>
    );
}

export default EventListCon;