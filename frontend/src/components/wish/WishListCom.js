import styled from "styled-components";
import {FaHeart} from "react-icons/fa6";
import { FaArrowLeft } from 'react-icons/fa6';
import emptyImage from "../../style/empty/empty-list.jpeg";

const StyleLikeBlock = styled.div`
    display: flex;
    justify-content: center;
`;
const StyleContentWrap = styled.div`
    width: 70%;
    max-width: 1200px;
`;
const TitleWrapper = styled.div`
    height: 100px;               // 원하는 높이
    display: flex;
    justify-content: center;    // 가로 중앙
    align-items: center;        // 세로 중앙
`;
const BackButton = styled.button`
    background: none;
    border: none;
    color: #333;
    font-size: 18px;
    cursor: pointer;
    margin-right: 10px;
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #f0f0f0;
    }
`;
const ListTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
    height: 60px;               // 세로 높이 지정
    display: flex;
    align-items: center;
    justify-content: center;
`;
const GridWrap = styled.div`
    //display: grid;
    display: flex;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 2rem;
`;

const Card = styled.div`
    width: 800px;
    height: 140px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    background: #fff;
    overflow: hidden;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: translateY(-5px);
    }
`;

const ThumbImg = styled.img`
    width: 100%;
    height: 110px;
    object-fit: cover;
    border-radius: 8px;
`;

const CardBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem;
`;

const Title = styled.h4`
    font-size: 1rem;
    margin-bottom: 0.5rem;
`;

const DeleteBtn = styled.button`
    background: transparent;
    border: none;
    color: red;
    //padding: 0.4rem 0.8rem;
    border-radius: 6px;
    padding: 0;
    font-size: 20px;
    cursor: pointer;

    &:hover {
        transform: scale(1.2);
    }
`;
const Left = styled.div`
    flex: 1;
    max-width: 33%;
`;

const Center = styled.div`
    flex: 1;
    max-width: 33%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Right = styled.div`
    flex: 1;
    max-width: 33%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

function WishListCom({ wishList, onDeleteWish, selectedGroupCode, groupTitle, onClickProduct, onBack }) {
    if (!selectedGroupCode) {
        return <p style={{ padding: "2rem" }}>선택된 그룹이 없어요. 먼저 그룹을 선택해주세요.</p>;
    }
    // if (wishList.length === 0) {
    //     return <p style={{ padding: "2rem" }}>이 그룹에는 찜한 상품이 없어요.</p>;
    // }
    const hasNoLists = !wishList || wishList.length === 0;

    return(
    <>
        <StyleLikeBlock>
            <StyleContentWrap>
                <TitleWrapper>
                    <BackButton onClick={onBack}>
                        <FaArrowLeft size={20} />
                    </BackButton>
                    <ListTitle>{groupTitle}의 위시리스트</ListTitle>
                </TitleWrapper>
                {hasNoLists ? (
                    <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                        <img
                            src={emptyImage}
                            alt="찜 상품 없음"
                            style={{ width: "480px", marginBottom: "1.5rem", opacity: 0.7 }}
                        />
                        <p style={{ padding: "2rem", color: "#888", textAlign: "center" }}>
                            아직 좋아요가 눌린 상품이 없어요.<br />
                        </p>
                    </div>
                ) : (
                    <GridWrap>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {wishList && wishList.map(item => (
                                <Card key={item.wishCode} style={{ marginBottom: "1rem" }}>
                                    <CardBody style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Left>
                                            <ThumbImg src={item.productThumbnail || "/img/empty/empty-list.jpeg"} alt="썸네일" />
                                        </Left>
                                        <Center>
                                            <div>
                                                <Title onClick={() => onClickProduct(item.productUid)}
                                                        style={{ cursor: "pointer" }}>
                                                    {item.productTitle || `상품코드 ${item.productCode}`}
                                                </Title>
                                                <p style={{ fontSize: "13px", color: "#999", marginTop: "0.3rem" }}>
                                                    ⭐ {item.reviewAvg?.toFixed(1) || "0.0"}점 ({item.reviewCount ?? 0}개)
                                                </p>
                                                <p style={{ fontSize: "14px", color: "#666", marginTop: "0.2rem" }}>
                                                    {item.productAdult?.toLocaleString()}원
                                                </p>
                                            </div>
                                        </Center>
                                        <Right>
                                            <DeleteBtn onClick={() => onDeleteWish(item.wishCode)}><FaHeart color="red" /></DeleteBtn>
                                        </Right>
                                    </CardBody>
                                </Card>
                            ))}
                        </ul>
                    </GridWrap>
                )}
            </StyleContentWrap>
        </StyleLikeBlock>
    </>
    )
}
export default WishListCom;