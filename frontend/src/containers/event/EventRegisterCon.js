// containers/event/EventRegisterCon.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EventRegisterCom from "../../components/event/EventRegisterCom";

function EventRegisterCon() {
    const [form, setForm] = useState({
        eventTitle: "",
        eventContent: "",
        eventImg: null,
        eventStartdate: "",
        eventEnddate: "",
        eventStatus: "",
    });
    const navigate = useNavigate();

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
        data.append("eventImg", form.eventImg);
        data.append("eventStartdate", form.eventStartdate);
        data.append("eventEnddate", form.eventEnddate);
        data.append("eventStatus", form.eventStatus);

        axios.post("/event", data, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(() => {
                alert("이벤트가 등록되었습니다.");
                navigate("/event");
            })
            .catch(() => alert("등록 중 오류 발생"));
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