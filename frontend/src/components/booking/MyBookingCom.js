import MyNavCom from "../common/MyNavCom";
import {StyleContentBlock, StyleContentWrap} from "../style/StyleSet";
import styled from "styled-components";

const StyledListTitle = styled.h3`
    color : black;
    left : 50px;
`

function MyBookingCom(){
    return(
        <>
            <MyNavCom />
            <StyleContentBlock>
                <StyleContentWrap>
                    <StyledListTitle>내 예약 확인하기</StyledListTitle>
                    예정된 여행, 지난 여행, 취소된 여행
                </StyleContentWrap>
            </StyleContentBlock>
        </>
    )
}
export default MyBookingCom;