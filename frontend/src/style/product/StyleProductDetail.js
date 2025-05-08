// /style/product/StyleProductDetail.js
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  gap: 40px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
`;

export const MainSectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  width: 100%;
  align-items: flex-start;
`;


export const ImageSection = styled.div`
  flex: 1;
  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    object-fit: cover;
    border: 1px solid #e0e0e0;
  }
`;

export const InfoSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #222;
  margin-bottom: 10px;
`;

export const PriceWrapper = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #000;

  .discount {
    color: #f73434;
    font-size: 24px;
    font-weight: bold;
    margin-right: 10px;
  }

  .original {
    text-decoration: line-through;
    color: #888;
    font-size: 18px;
    margin-left: 10px;
  }
`;

export const Badge = styled.div`
  display: inline-block;
  background-color: #ffeded;
  color: #ff5e5e;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 20px;
  margin-bottom: 10px;
  width: fit-content;
`;

export const DetailText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #444;

  strong {
    font-weight: 600;
    color: #222;
    margin-right: 6px;
  }
`;

export const WishButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 24px;
  color: #ff5e5e;

  &:hover {
    transform: scale(1.1);
  }
`;

export const DetailTabWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 40px;
  border-bottom: 2px solid #eee;
`;

export const DetailTab = styled.button`
  padding: 12px 18px;
  font-size: 16px;
  font-weight: 600;
  background: none;
  border: none;
  border-bottom: ${({ active }) => (active ? '3px solid #000' : 'none')};
  color: ${({ active }) => (active ? '#000' : '#888')};
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

export const DetailContentWrapper = styled.div`
  padding: 30px 0;
  line-height: 1.8;
  font-size: 16px;
  color: #333;

  p {
    margin-bottom: 14px;
  }

  strong {
    display: block;
    margin: 20px 0 10px;
    font-size: 18px;
    font-weight: bold;
    color: #111;
  }

  .highlight {
    color: #e60023;
    font-weight: 600;
  }

  .emoji {
    margin-right: 6px;
  }
`;

export const SubTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 10px;
  color: #222;
`;

export const Divider = styled.hr`
  margin: 30px 0;
  border: none;
  border-top: 1px solid #eee;
`;