import {
    BottomInput,
    ChatWrapper,
    Description,
    Header,
    IconButton,
    IconList, InputField,
    MessageBox, Message, SendButton,
    Title
} from "../../style/common/InquiryChatStyle";

const InquiryChatCom = () => {
    return (
        <ChatWrapper>
            <Header>
                <Title>마이리얼트립에 문의하기</Title>
                <Description>운영시간 보기</Description>
            </Header>

            <MessageBox>
                <Message isSystem>
                    <strong>Travel Everyday, 마이리얼트립</strong> 입니다.<br />
                    도움이 필요한 문의를 선택해주세요.<br /><br />
                    💬 채팅상담 연중무휴 24시간<br />
                    📞 유선상담 평일 09:00~18:00<br />
                    ✈️ 항공 변경/환불 접수: 연중무휴 24시간<br />
                    (접수 후 1~3일 이내에 별도 안내 예정이에요.)<br />
                    🧳 마이팩 문의 운영시간<br />
                    평일 09:00~18:00 (주말, 공휴일 휴무)
                </Message>
            </MessageBox>

            <IconList>
                <IconButton>✈️ 항공권</IconButton>
                <IconButton>🏨 숙박</IconButton>
                <IconButton>🎟️ 여행상품</IconButton>
                <IconButton>🧳 마이팩</IconButton>
            </IconList>

            <BottomInput>
                <InputField placeholder="메시지를 입력하세요" />
                <SendButton>전송</SendButton>
            </BottomInput>
        </ChatWrapper>
    );
};

export default InquiryChatCom;
