import React, { useState } from "react";
import styled from "styled-components";

// 스타일 컴포넌트 정의
const FilterContainer = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FilterSection = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  label {
    margin-right: 0.5rem;
    font-weight: 500;
    color: #333;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
  font-size: 0.9rem;
  width: 120px; /* 입력창 너비 고정 또는 필요에 따라 조절 */

  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield; /* Firefox */
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: white;
`;

const DateInput = styled(Input)`
  width: 150px; /* 날짜 입력창 너비 조절 */
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const PriceRangeSeparator = styled.span`
  margin: 0 0.5rem;
  color: #555;
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
            <FilterSection>
                <label>가격대:</label>
                <Input type="number" placeholder="최소" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                <PriceRangeSeparator>~</PriceRangeSeparator>
                <Input type="number" placeholder="최대" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </FilterSection>
            <FilterSection>
                <label>판매 상태:</label>
                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">전체</option>
                    <option value="ON_SALE">판매중</option>
                    <option value="CLOSED">판매종료</option>
                    <option value="SOLD_OUT">매진</option>
                </Select>
            </FilterSection>
            <FilterSection>
                <label>출발 기간:</label>
                <DateInput type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <PriceRangeSeparator>~</PriceRangeSeparator>
                <DateInput type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </FilterSection>
            <Button onClick={handleApplyFilter}>필터 적용</Button>
        </FilterContainer>
    );
}

export default ProductFilterCom;
