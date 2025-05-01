import {useNavigate} from "react-router-dom";
import styled from "styled-components";

const StyleLikeBlock = styled.div`
    display: flex;
    justify-content: center;
`;
const StyleContentWrap = styled.div`
    width: 70%;
    max-width: 1200px;
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

function WishGroupCom({ groups, onSelect, onDeleteGroup }) {
    const navigate = useNavigate();
    // <ThumbImg />클릭시 해당 그룹에 담긴 위시상품들 리스트 페이지로 이동한다.
    const selectClick = (group) => {
        navigate(`/wish/groups/${group.code}/items`);
    }
    return(
        <>
            <StyleLikeBlock>
                <StyleContentWrap>
                    <div>
                        <ListTitle>찜 그룹</ListTitle>
                    </div>
                    <div>
                        <GridWrap>
                            {groups.map(group => (
                                <div key={group.groupCode} style={{ marginBottom: "1rem" }} className="group-item">
                                    <LikeCard>
                                        <ThumbImg src={group.imageUrl} style={{cursor: 'pointer'}}
                                                  alt="찜 이미지"
                                                  onClick={() => onSelect(group.groupCode)} />
                                    </LikeCard>
                                    <CardTitle>{group.groupTitle}</CardTitle>
                                    <SavedCount>{group.wishCount}개 저장됨</SavedCount>
                                    <button onClick={() => onDeleteGroup(group.groupCode)}>삭제</button>
                                </div>
                            ))}
                        </GridWrap>
                    </div>
                </StyleContentWrap>
            </StyleLikeBlock>
        </>
    )
}
export default WishGroupCom;