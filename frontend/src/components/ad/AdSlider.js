import styled, {keyframes} from "styled-components";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";

function AdSlider({ adProducts = [], hideTitle = false, isMainPage = false }) {
    const [index, setIndex] = useState(0);
    const delay = 2000;

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % adProducts.length);
        }, delay);
        return () => clearInterval(interval);
    }, [adProducts]);

    return (
        <SlideWrapper $isMainPage={isMainPage}>
            {!hideTitle && <h4>다른 상품은 어때요?</h4>}
            <SliderTrack $index={index}>
                {adProducts.concat(adProducts).map((product, index) => (
                    <SlideItem key={index}>
                        <Link to={`/products/${product.productUid}`}>
                            <ImageBox>
                                <img
                                    src={product.productThumbnail || "/style/empty/empty-list.jpeg"}
                                    alt={product.productTitle}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/img/default-product.jpg";
                                    }}
                                />
                                <OverlayText>{product.productTitle}</OverlayText>
                                <DotWrapper>
                                    {adProducts.map((_, dotIndex) => (
                                        <Dot key={dotIndex} $active={dotIndex === index} />
                                    ))}
                                </DotWrapper>
                            </ImageBox>
                        </Link>
                    </SlideItem>
                ))}
            </SliderTrack>
        </SlideWrapper>
    );
}
export default AdSlider;

const scroll = keyframes`
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
`;

const SlideWrapper = styled.div`
    // isMainPage prop에 따라 width를 조건부로 설정합니다.
    width: ${({ $isMainPage }) => ($isMainPage ? '1000px' : '100%')};
  //  width: 100%;
  //  height: 180px;
    overflow: hidden;
    border-radius: 12px;
    margin: 0 auto;

    h4 {
        font-size: 1.1rem;
        font-weight: bold;
        margin-bottom: 0.5rem; /* 기존 간격보다 확 줄임 */
    }

    /* 모바일 반응형 웹 디자인 추가 */
    @media (max-width: 1024px) { /* 태블릿 가로 / 작은 데스크탑 */
        width: 90%; /* 1000px 대신 90%로 줄여서 여백 확보 */
    }

    @media (max-width: 768px) { /* 태블릿 세로 / 모바일 가로 */
        width: 100%; /* 부모 컨테이너에 꽉 차도록 */
        border-radius: 8px; /* 모바일에서 더 작은 둥근 모서리 */
    }

    @media (max-width: 480px) { /* 모바일 세로 */
        width: 100%;
        border-radius: 6px;
        h4 { /* 모바일에서 제목 글자 크기 조정 */
            font-size: 1rem;
            margin-bottom: 0.3rem;
        }
    }
`;

const SliderTrack = styled.div`
    display: flex;
    //width: calc(200%);
    width: ${props => `${props.$count * 100}%`}; /* 전체 넓이 = 이미지 수 x 100% */
    //animation: ${scroll} 20s linear infinite;
    transition: transform 0.6s ease-in-out;
    transform: translateX(${props => `-${props.$index * 100}%`});
    //transform: translateX(${props => `-${props.$index * (100 / props.$count)}%`});
`;

const SlideItem = styled.div`
    //flex: 0 0 300px;
    //margin-right: 1rem;
    //margin: 0 auto;
    flex: 0 0 100%;
    // flex: 0 0 ${props => `${100 / props.$count}%`}; /* 1장만 보이게 */
    
`;

const ImageBox = styled.div`
    position: relative;
    //width: 800px;
    width: 100%;
    height: 180px;
    overflow: hidden;
    //object-fit: contain;
    border-radius: 12px;
    margin: 0 auto;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        //object-fit: contain;
        display: block;
        border-radius: 12px;
        background-color: #f0f0f0;
    }

    /* ImageBox 모바일 반응형 */
    @media (max-width: 768px) {
        height: 200px; /* 태블릿/모바일에서 높이 줄임 */
        border-radius: 8px;
    }

    @media (max-width: 480px) {
        height: 180px; /* 모바일에서 추가적으로 높이 줄임 */
        border-radius: 6px;
    }
`;

const OverlayText = styled.div`
    position: absolute;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    width: 100%;
    padding: 0.5rem;
    font-weight: bold;
    font-size: 1rem;
    text-align: center;

    /* OverlayText 모바일 반응형 */
    @media (max-width: 768px) {
        font-size: 0.9rem;
        padding: 0.4rem;
    }

    @media (max-width: 480px) {
        font-size: 0.8rem;
        padding: 0.3rem;
    }
`;

const DotWrapper = styled.div`
    position: absolute;
    top: 8px;
    right: 12px;
    display: flex;
    gap: 0.4rem;
    z-index: 2;

    /* DotWrapper 모바일 반응형 */
    @media (max-width: 768px) {
        top: 6px;
        right: 10px;
        gap: 0.3rem;
    }

    @media (max-width: 480px) {
        top: 5px;
        right: 8px;
        gap: 0.2rem;
    }
`;

const Dot = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${props => (props.$active ? '#007aff' : '#ccc')};
    transition: background-color 0.3s ease;

    /* Dot 모바일 반응형 */
    @media (max-width: 768px) {
        width: 6px;
        height: 6px;
    }

    @media (max-width: 480px) {
        width: 5px;
        height: 5px;
    }
`;