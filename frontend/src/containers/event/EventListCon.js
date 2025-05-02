import EventListCom from "../../components/event/EventListCom";
import axios from "axios";
import {useEffect, useState} from "react";


function EventListCon() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get("/event")
            .then(res => setEvents(res.data))
            .catch(err => console.error(err));
    }, []);

    return <EventListCom events={events} />;
}

export default EventListCon;
