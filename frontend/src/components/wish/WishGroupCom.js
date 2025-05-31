import emptyImage from "../../style/empty/empty-list.jpeg"
import { FaRegTrashCan } from "react-icons/fa6";
import {
    CardTitle,
    GridWrap, GroupActionWrap, GroupDeleteBtn,
    LikeCard,
    ListTitle, SavedCount,
    StyleContentWrap,
    StyleLikeBlock, ThumbImg,
    TitleWrapper
} from "../../style/wish/StyleWishGroup";

function WishGroupCom({ groups, onClickGroup, onDeleteGroup }) {
    const hasNoGroups = !groups || groups.length === 0;

    return(
        <>
            <StyleLikeBlock>
                <StyleContentWrap>
                    <TitleWrapper>
                        <ListTitle>찜 그룹</ListTitle>
                    </TitleWrapper>
                        {hasNoGroups ? (
                            <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                                <img
                                    src={emptyImage}
                                    alt="찜 그룹 없음"
                                    style={{ width: "180px", marginBottom: "1.5rem", opacity: 0.7 }}
                                />
                                <p style={{ padding: "2rem", color: "#888", textAlign: "center" }}>
                                    아직 생성된 찜 그룹이 없어요.<br />
                                    상품을 찜하면 자동으로 그룹이 생겨요!
                                </p>
                            </div>
                        ) : (
                        <GridWrap>
                            {groups && groups.map(group => (
                                <div key={group.groupCode} style={{ marginBottom: "1rem" }} className="group-item">
                                    <LikeCard>
                                        <ThumbImg src={group.imageUrl}
                                                  style={{cursor: 'pointer'}}
                                                  alt="찜 이미지"
                                                  onClick={() => onClickGroup(group.groupCode)}
                                        />
                                    </LikeCard>
                                    <CardTitle>{group.groupTitle}</CardTitle>
                                    <GroupActionWrap>
                                        <SavedCount>{group.wishCount}개 저장됨</SavedCount>
                                        <GroupDeleteBtn onClick={() => onDeleteGroup(group.groupCode)}>
                                            <FaRegTrashCan size={20} />
                                        </GroupDeleteBtn>
                                    </GroupActionWrap>
                                </div>
                            ))}
                        </GridWrap>
                            )}
                </StyleContentWrap>
            </StyleLikeBlock>
        </>
    )
}
export default WishGroupCom;