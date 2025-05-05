// containers/event/EventRegisterCon.js
import {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import EventRegisterCom from "../../components/event/EventRegisterCom";

function EventRegisterCon() {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const isEdit = !!id; // /event/edit/:id면 수정

    const [form, setForm] = useState({
        eventTitle: "",
        eventContent: "",
        eventImg: null,
        eventStartdate: "",
        eventEnddate: "",
        eventStatus: "",
    });

    useEffect(() => {
        if (isEdit) {
            if (state?.event) {
                // location.state에서 바로 데이터 세팅
                setForm({
                    ...state.event,
                    eventImg: state.event.eventImg || null,
                    eventStartdate: state.event.eventStartdate?.slice(0,10) || "",
                    eventEnddate: state.event.eventEnddate?.slice(0,10) || "",
                });
            } else {
                // 새로고침 시 state가 사라져버릴 수 있으므로 다시 조회
                axios.get(`/event/${id}`)
                    .then(res => {
                        const event = res.data;
                        setForm({
                            ...event,
                            eventImg: event.eventImg || null,
                            eventStartdate: event.eventStartdate?.slice(0,10) || "",
                            eventEnddate: event.eventEnddate?.slice(0,10) || "",
                        });
                    })
                    .catch(() => {});
            }
        }
    }, [id, state, isEdit]);


    const handleChange = e => {
        const { name, value, files } = e.target;
        setForm(prev =>
            name === "eventImg"
                ? { ...prev, eventImg: files[0] }
                : { ...prev, [name]: value }
        );
    };

    const handleSubmit = e => {
        e.preventDefault();

        const data = new FormData();
        data.append("eventTitle", form.eventTitle);
        data.append("eventContent", form.eventContent);
        if (form.eventImg instanceof File) {
            data.append("eventImg", form.eventImg);
        }
        data.append("eventStartdate", form.eventStartdate);
        data.append("eventEnddate", form.eventEnddate);
        data.append("eventStatus", form.eventStatus);


        if (isEdit) {
            // 수정(put): id 필요
            axios.put(`/event/${id}`, data, {
                headers: { "Content-Type": "multipart/form-data" }
            })
                .then(() => {
                    alert("이벤트가 수정되었습니다.");
                    navigate("/event");
                })
                .catch(() => alert("수정 중 오류 발생"));
        } else {
            // 등록(post)
            axios.post("/event", data, {
                headers: {"Content-Type": "multipart/form-data"}
            })
                .then(() => {
                    alert("이벤트가 등록되었습니다.");
                    navigate("/event");
                })
                .catch(() => alert("등록 중 오류 발생"));
        }
    };

    return (
        <EventRegisterCom
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
}
export default EventRegisterCon;