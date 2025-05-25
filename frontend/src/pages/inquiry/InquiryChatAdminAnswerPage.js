import InquiryChatAdminAnswerCon from "../../containers/inquiry/InquiryChatAdminAnswerCon";
import {useParams} from "react-router-dom";

function InquiryChatAdminAnswerPage() {
    const {inquiryChatId} = useParams()

    return (
        <>
            <InquiryChatAdminAnswerCon inquiryChatId={inquiryChatId}/>
        </>
    )
}

export default InquiryChatAdminAnswerPage;