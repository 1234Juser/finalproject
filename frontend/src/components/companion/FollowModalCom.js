
import React, { useState, useEffect } from 'react'; // useState, useEffect 임포트 추가
import styled from 'styled-components';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 350px; // 너비 약간 증가
    max-height: 500px; // 높이 증가
    overflow-y: auto;
    position: relative;
    display: flex; // Flexbox 레이아웃 적용
    flex-direction: column; // 세로 방향 정렬
`;

const ModalTitle = styled.h2`
    margin-top: 0;
    margin-bottom: 10px; // 탭과의 간격
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    text-align: center; // 제목 중앙 정렬
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
    color: #666; // 색상 변경
`;

const TabContainer = styled.div`
    display: flex;
    justify-content: space-around; // 탭 버튼 사이 공간 분배
    margin-bottom: 15px; // 목록과의 간격
    border-bottom: 1px solid #eee; // 탭 아래 줄
`;

const TabButton = styled.button`
    background: none;
    border: none;
    padding: 10px 0;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
    color: ${({ active }) => (active ? '#198dbb' : '#666')};
    border-bottom: ${({ active }) => (active ? '2px solid #198dbb' : 'none')};
    transition: color 0.2s ease, border-bottom-color 0.2s ease;

    &:hover {
        color: #198dbb;
    }
`;


const FollowList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    flex-grow: 1; // 남은 공간 차지하여 스크롤 가능하게
`;

const FollowItem = styled.li`
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #eee;

    &:last-child {
        border-bottom: none;
    }
`;

const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover; // 이미지 비율 유지
`;

const MemberName = styled.span`
    font-weight: bold;
    color: #333; // 색상 변경
`;

const NoFollowText = styled.p`
    text-align: center;
    color: #666;
    padding: 20px;
`;


// CompanionDetailCom에서 members prop을 { following: [], followers: [] } 형태로 받도록 수정
const FollowModalCom = ({ show, onClose, members }) => {
    const [showFollowingList, setShowFollowingList] = useState(true); // 팔로잉/팔로워 목록 전환 상태

    useEffect(() => {
        // 모달이 열릴 때마다 기본적으로 팔로잉 목록을 보여주도록 설정
        if (show) {
            setShowFollowingList(true);
        }
    }, [show]);


    if (!show) {
        return null;
    }

    const DEFAULT_PROFILE_IMAGE = "/img/default-profile.jpg"; // 기본 이미지 경로

    // 어떤 목록을 보여줄지 결정
    const listToShow = showFollowingList ? (members?.following || []) : (members?.followers || []);
    const currentTitle = showFollowingList ? '팔로잉' : '팔로워';


    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <ModalTitle>팔로우 정보</ModalTitle> {/* 고정된 제목 */}

                <TabContainer>
                    <TabButton
                        active={showFollowingList}
                        onClick={() => setShowFollowingList(true)}
                    >
                        팔로잉 ({members?.following?.length || 0})
                    </TabButton>
                    <TabButton
                        active={!showFollowingList}
                        onClick={() => setShowFollowingList(false)}
                    >
                        팔로워 ({members?.followers?.length || 0})
                    </TabButton>
                </TabContainer>

                {listToShow && listToShow.length > 0 ? (
                    <FollowList>
                        {listToShow.map(member => (
                            <FollowItem key={member.memberCode}>
                                <ProfileImage
                                    src={member.memberProfileImageUrl || DEFAULT_PROFILE_IMAGE}
                                    alt={`${member.memberName} 프로필`}
                                />
                                <MemberName>{member.memberName}</MemberName>
                            </FollowItem>
                        ))}
                    </FollowList>
                ) : (
                    <NoFollowText>{currentTitle}가 없습니다.</NoFollowText>
                )}
            </ModalContent>
        </ModalOverlay>
    );
};

export default FollowModalCom;