import styled from 'styled-components';
import CalendarDisplay from "./CalendarDisplay";

function OptionFormCom({ options = [], totalPrice = 0, onAdultCountChange, onChildCountChange, onReserve, onOptionChange }) {
    // const { productTitle, adultCount, childCount, totalPrice, productAdult, productChild } = options;
    console.log("🟡 렌더링된 옵션 데이터:", options);


    return (
        <FormWrapper>
            {/* 달력 컴포넌트 */}
            <CalendarWrapper>
                <CalendarDisplay />
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
                            <CounterValue>{option.adultCount}</CounterValue>
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
            <ReserveButton disabled={totalPrice === 0} onClick={onReserve}>
                예약하기
            </ReserveButton>
        </FormWrapper>
    );
}

export default OptionFormCom;

const FormWrapper = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
`;

const CalendarWrapper = styled.div`
    margin-bottom: 2rem;
`;

const OptionsSection = styled.div`
    margin-bottom: 2rem;
`;

const OptionItem = styled.div`
    margin-bottom: 1.5rem;
    padding: 1rem;
    border-bottom: 1px solid #e0e0e0;
`;

const OptionTitle = styled.h3`
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

const OptionDescription = styled.p`
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
`;

const OptionPrice = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

const OptionCounter = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const CounterButton = styled.button`
    background-color: #f0f0f0;
    color: #333;
    border: none;
    border-radius: 4px;
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #ddd;
    }
`;

const CounterValue = styled.span`
    font-size: 1.2rem;
    font-weight: bold;
`;

const TotalPriceSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

const TotalLabel = styled.span`
    font-size: 1.5rem;
    font-weight: bold;
`;

const TotalPrice = styled.span`
    font-size: 1.5rem;
    font-weight: bold;
    color: #3399ff;
`;

const ReserveButton = styled.button`
    width: 100%;
    padding: 1rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: #fff;
    background-color: #3399ff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #2672c9;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;