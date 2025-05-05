import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import EventDetailCom from "../../components/event/EventDetailCom"; // 경로에 맞게 조정

function EventDetailCon() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/event/${id}`)
            .then(res => setEvent(res.data))
            .catch(() => setEvent(null));
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleEdit = () =>{
        //event 데이터와 함께 수정폼
        //eventRegister/edit/123 과같이 id와 stat전달
        navigate(`/event/edit/${id}`, { state: { event } });
    };

    return (
        <EventDetailCom
            event={event}
            onBack={handleBack}
            onEdit={handleEdit}
        />
    );
}

export default EventDetailCon;