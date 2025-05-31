import {FaHeart} from "react-icons/fa6";
import { FaArrowLeft } from 'react-icons/fa6';
import { FaAngleLeft } from 'react-icons/fa6';
import emptyImage from "../../style/empty/empty-list.jpeg";
import {
    BackButton, Card, CardBody, Center, DeleteBtn,
    GridWrap, Left, ListTitle, Right, StyleContentWrap,
    StyleLikeBlock, ThumbImg, Title, TitleWrapper
} from "../../style/wish/StyleWishList";

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
                            <FaAngleLeft size={20} />
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
                                                <ThumbImg
                                                    src={item.productThumbnail || "/img/empty/empty-list.jpeg"} alt="썸네일"
                                                    onClick={() => onClickProduct(item.productUid)}
                                                    style={{ cursor: "pointer" }}
                                                />
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