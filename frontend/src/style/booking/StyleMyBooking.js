import styled from 'styled-components';

export const TabWrapperStyle = styled.div`
    display: flex;
    border-bottom: 2px solid #ddd;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto 20px;
    gap: 12px;
`;

export const TabButton = styled.button`
    padding: 12px 0;
    margin-right: 30px;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
    border-bottom: ${({ $active }) => ($active ? '4px solid black' : 'none')};
`;

export const activeTabStyle = {
    fontWeight: "bold",
    borderBottom: "4px solid black"
};

export const inactiveTabStyle = {
    fontWeight: "normal",
    // borderBottom: "2px solid transparent"
    borderBottom: "none"
};