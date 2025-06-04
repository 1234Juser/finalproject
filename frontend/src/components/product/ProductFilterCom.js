import React, { useState } from "react";
import styled from "styled-components";

// 스타일 컴포넌트 정의
const FilterContainer = styled.div`
    margin-bottom: 2rem;
    padding: 1.5rem 2rem;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    background-color: #ffffff;
    font-family: 'Arial', sans-serif;
`;

const FilterRow = styled.div`
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 1.25rem;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0.75rem;
    }
`;

const FilterSection = styled.div`
    display: flex;
    flex-direction: column;

    label {
        margin-bottom: 0.4rem;
        font-weight: 600;
        color: #343a40;
        font-size: 0.9rem;
    }

    & > div {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;



// 4. Input / Select 공통 느낌
const inputStyle = `
    padding: 0.65rem 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 6px;
    font-size: 0.95rem;
    background-color: #f9f9f9;
    color: #212529;
    transition: border-color 0.15s ease-in-out;

    &:focus {
        border-color: #339af0;
        outline: none;
    }
`;

const Input = styled.input`${inputStyle}`;
const Select = styled.select`
    ${inputStyle};
    width: 200px;
`;

const DateInput = styled(Input)`
    flex-grow: 1; /* DateInput이 가능한 너비를 차지하도록 */
`;

const Button = styled.button`
    padding: 0.7rem 1.2rem;
    border: none;
    border-radius: 6px;
    background-color: #339af0;
    color: #ffffff;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    height: fit-content;
    align-self: flex-end;
    margin-left: auto;

    &:active {
        transform: translateY(1px);
    }
`;

const PriceRangeSeparator = styled.span`
    margin: 0 0.25rem;
    color: #868e96; /* 구분자 색상 변경 */
    align-self: center; /* 수직 중앙 정렬 */
`;



function ProductFilterCom({ onFilterChange }) {
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [status, setStatus] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleApplyFilter = () => {
        onFilterChange({ minPrice, maxPrice, status, startDate, endDate });
    };

    return (
        <FilterContainer>
            <FilterRow>
                <FilterSection style={{ flexGrow: 1, minWidth: '230px' }}> {/* 가격대 전체의 최소 너비 확보 */}
                    <label>가격대</label>
                    <div>
                        <Input style={{ width: '100px' }} type="number" placeholder="최소" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                        <PriceRangeSeparator>~</PriceRangeSeparator>
                        <Input style={{ width: '100px' }} type="number" placeholder="최대" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                    </div>
                </FilterSection>
                <FilterSection style={{ flexGrow: 1, flexShrink: 0 }}>
                    <label>판매 상태</label>
                    <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">전체</option>
                        <option value="ON_SALE">판매중</option>
                        <option value="CLOSED">판매종료</option>
                        <option value="SOLD_OUT">매진</option>
                    </Select>
                </FilterSection>
                <FilterSection style={{ flexGrow: 1, minWidth: '300px' }}> {/* 출발 기간 전체의 최소 너비 확보 */}
                    <label>출발 기간</label>
                    <div>
                        <DateInput type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <PriceRangeSeparator>~</PriceRangeSeparator>
                        <DateInput type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                </FilterSection>
                <FilterRow style={{ marginBottom : 0 }}>
                    <Button onClick={handleApplyFilter}>필터 적용</Button>
                </FilterRow>
            </FilterRow>
        </FilterContainer>
    );
}

export default ProductFilterCom;
