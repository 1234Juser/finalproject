import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import emptyImage from "../../style/empty/empty-list.jpeg"

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
const ListTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
`;
const GridWrap = styled.div`
    display: grid;
    //grid-template-columns: repeat(4, 1fr); // ← 한 줄에 4개
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    max-width: 1100px; // 200px * 4 + 여유 간격 정도
    margin: 0 auto;
    gap: 40px 20px;
`;
const LikeCard = styled.div`
    aspect-ratio: 1 / 1; // 정사각형 만들기
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    background-color: #fff;
    transition: transform 0.2s ease-in-out;
    &:hover {
        transform: translateY(-5px);
    }
`;
const ThumbImg = styled.img`
    width: 100%;
    height: 140px;
    object-fit: cover;
`;
const CardTitle = styled.p`
    font-size: 16px;
    font-weight: bold;
    margin: 10px;
`;
const SavedCount = styled.p`
    font-size: 14px;
    color: #666;
    margin: 0 10px 10px 10px;
`;

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
                                    <SavedCount>{group.wishCount}개 저장됨</SavedCount>
                                    <button onClick={() => onDeleteGroup(group.groupCode)}>삭제</button>
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