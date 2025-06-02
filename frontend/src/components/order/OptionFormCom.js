import CalendarDisplay from "./CalendarDisplay";
import {
    CalendarWrapper, CounterButton, CounterValue,
    FormWrapper, OptionCounter,
    OptionItem, OptionPrice,
    OptionsSection,
    OptionTitle, ReserveButton,
    TotalLabel, TotalPrice, TotalPriceSection
} from "../../style/option/StyleOptionForm";

function OptionFormCom({ productUid,
                        options = [],
                        reservationDate,
                        totalPrice = 0,
                        onAdultCountChange,
                        onChildCountChange,
                        onDateSelect,
                        onReserve,
                        onOptionChange,
                        optionData}) {

    return (
        <FormWrapper>
            {/* 달력 컴포넌트 */}
            <CalendarWrapper>
                <CalendarDisplay
                    productUid={productUid}
                    selectedDate={reservationDate}
                    onDateSelect={onDateSelect}
                    optionData={optionData} />
            </CalendarWrapper>

            {/* 옵션 선택 영역 */}
            <OptionsSection>
                <h2>옵션</h2>
                {Array.isArray(options) && options.length > 0 ? (
                    options && options.map((option, index) => {
                        const price = option.price !== undefined ? option.price : 0;
                        return (
                    <OptionItem key={index}>
                        <OptionTitle>{option.productTitle ? `[${option.productTitle}] 옵션선택` : "로딩 중..."}</OptionTitle>
                        <OptionPrice>{price.toLocaleString()}원</OptionPrice>
                        <OptionCounter>
                            <span>일반</span>
                            <CounterButton onClick={() => onAdultCountChange(index, -1)}>-</CounterButton>
                            <CounterValue>{option.adultCount || 0}</CounterValue>
                            <CounterButton onClick={() => onAdultCountChange(index, 1)}>+</CounterButton>
                        </OptionCounter>
                        {option.childPrice !== null && option.childPrice !== undefined && option.childPrice > 0 && (
                            <OptionCounter>
                                <span>아동</span>
                                <CounterButton onClick={() => onChildCountChange(index, -1)}>-</CounterButton>
                                <CounterValue>{option.childCount || 0}</CounterValue>
                                <CounterButton onClick={() => onChildCountChange(index, 1)}>+</CounterButton>
                            </OptionCounter>
                        )}
                    </OptionItem>
                    )})
                ) : (
                    <p>옵션이 없습니다.</p>
                    )}
            </OptionsSection>

            {/* 총 결제 금액 */}
            <TotalPriceSection>
                <TotalLabel>총</TotalLabel>
                <TotalPrice>{totalPrice.toLocaleString()}원</TotalPrice>
            </TotalPriceSection>

            {/* 예약 버튼 */}
            <ReserveButton disabled={!reservationDate || totalPrice === 0} onClick={onReserve} >
                예약하기
            </ReserveButton>
        </FormWrapper>
    );
}

export default OptionFormCom;