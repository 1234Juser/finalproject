import ChatRoomCon from "../../../containers/community/chat/ChatRoomCon";
import {useParams} from "react-router-dom";

function ChatRoomPage() {

    const {roomUid} = useParams()

    return (
        <>
            <ChatRoomCon roomUid={roomUid}/>
        </>
    )
}

export default ChatRoomPage;