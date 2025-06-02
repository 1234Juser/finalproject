import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import EventDetailCom from "../../components/event/EventDetailCom"; // 경로에 맞게 조정

function EventDetailCon() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://api.hellotravelogic.link/event/${id}`)
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

    const handleDelete = async () => {
        if (window.confirm("이벤트를 정말 삭제하시겠습니까?")) {
            try {
                await axios.delete(`https://api.hellotravelogic.link/event/${id}`);
                alert("이벤트가 삭제되었습니다.");
                navigate("/event"); // 목록 페이지 등으로 이동
            } catch (e) {
                alert("삭제에 실패했습니다.");
            }
        }
    };

    return (
        <EventDetailCom
            event={event}
            onBack={handleBack}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    );
}

export default EventDetailCon;