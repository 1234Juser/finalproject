// src/components/common/RealtimeRanking.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const RankingContainer = styled.div`
    margin-left: 20px; // 검색창과의 간격 조절
    font-size: 0.9em;
    color: #555;
    background-color: #fff; // 배경색 추가
    padding: 10px 20px; // 패딩 추가
    border-radius: 20px; // 둥근 모서리
    width: 180px; /* 고정 너비 설정 (필요에 따라 값 조정) */
    min-width: 180px; /* 최소 너비 설정 */
    position: relative; /* 자식 요소의 absolute positioning 기준 */
    z-index: 100; /* 다른 요소 위에 오도록 z-index 설정 */
`;

const RankingHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between; // 제목과 버튼 사이에 공간
    cursor: pointer; // 헤더 클릭 가능하도록
    padding-bottom: 5px;
    border-bottom: 1px solid #eee; // 구분선 추가
    /* 랭킹이 숨겨졌을 때 하단 보더 제거 */
    ${props => !props.$isVisible && `
        border-bottom: none;
        padding-bottom: 0;
    `}
`;

const RankingTitle = styled.strong`
    color: #333; // 글자색 변경
`;

const RankingList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 10px 0 0 0; /* 제목과 도시 이름 간격 조정 */
    overflow: hidden; /* 숨겨진 항목 감추기 */
    height: ${props => props.$isVisible ? 'auto' : 'auto'}; /* 숨김 상태일 때 높이 자동 */


    /* 랭킹이 보일 때만 absolute 스타일 적용 */
    ${props => props.$isVisible && `
        position: absolute; /* 헤더 아래로 오버레이 */
        top: 100%; /* 헤더 바로 아래에 위치 */
        left: 0; /* 컨테이너의 왼쪽 정렬 */
        background-color: #f8f9fa; /* 배경색 유지 */
        border-radius: 0 0 20px 20px; /* 하단 모서리만 둥글게 */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
        width: 100%; /* 부모 컨테이너 너비에 맞춤 */
        padding-top: 5px; /* 펼쳤을 때 상단 여백 */
    `}

        /* 랭킹이 숨겨졌을 때 스타일 */
    ${props => !props.$isVisible && `
        margin-top: 0;
    `}
`;


const RankingItem = styled.li`
    margin-bottom: 8px; // 세로 간격 조절
    &:last-child {
        margin-bottom: 0;
        /* 랭킹이 보일 때만 하단 패딩 추가 */
        ${props => props.$isVisible && `
            padding-bottom: 10px;
        `}
    }
    cursor: pointer; // 클릭 가능한 항목임을 표시
    transition: all 0.3s ease-in-out; // 모든 속성에 애니메이션 적용
    padding: 0 20px; /* 좌우 패딩 추가 (컨테이너 패딩과 맞춤) */


    display: flex;
    align-items: center;

    .rank-number {
        font-weight: bold;
        margin-right: 5px;
        color: #007bff; // 순위 숫자 색상
        min-width: 20px; // 순위 숫자 최소 너비 설정 (정렬을 위해)
        text-align: left; // 순위 숫자 왼쪽 정렬
    }

    .city-name {
        flex-grow: 1; // 남은 공간 채우기
        text-align: left; // 도시 이름 왼쪽 정렬
        overflow: hidden; /* 내용 넘칠 경우 숨김 */
        text-overflow: ellipsis; /* 넘치는 내용 ...으로 표시 */
        white-space: nowrap; /* 줄바꿈 방지 */
    }


    &:hover {
        color: #0056b3; // 호버 시 색상 변경
        transform: translateX(5px); // 호버 시 살짝 오른쪽으로 이동
    }
`;

function RealtimeRanking() {
    const [ranking, setRanking] = useState([]);
    const [error, setError] = useState(null);
    const [isRankingVisible, setIsRankingVisible] = useState(false); // 랭킹 목록 표시/숨김 상태
    const [currentRankingIndex, setCurrentRankingIndex] = useState(0); // 현재 표시할 랭킹 항목의 인덱스

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                // 백엔드 API 엔드포인트 (필요에 따라 URL 수정)
                const response = await axios.get('/city/ranking');
                setRanking(response.data);
            } catch (err) {
                console.error("실시간 랭킹 가져오기 실패:", err);
                setError("실시간 랭킹 로딩 실패"); // 에러 메시지 설정
            }
        };

        fetchRanking();

        // 주기적으로 랭킹 업데이트 (예: 1분마다)
        const intervalId = setInterval(fetchRanking, 60000); // 60초 (1분) 마다 호출

        // 컴포넌트 언마운트 시 인터벌 클리어
        return () => clearInterval(intervalId);

    }, []);

    // 랭킹 목록 자동 슬라이드 효과 (마우스 오버 상태가 아닐 때만 동작)
    useEffect(() => {
        let slideInterval;
        if (!isRankingVisible && ranking.length > 0) { // isRankingVisible이 false일 때만 동작
            slideInterval = setInterval(() => {
                setCurrentRankingIndex(prevIndex =>
                    (prevIndex + 1) % Math.min(ranking.length, 10) // 최대 10개 항목 내에서 순환
                );
            }, 3000); // 3초마다 다음 항목 표시
        }

        // 컴포넌트 언마운트 또는 isRankingVisible, ranking 상태 변경 시 인터벌 클리어
        return () => clearInterval(slideInterval);
    }, [isRankingVisible, ranking]); // isRankingVisible 또는 ranking 상태 변경 시 useEffect 다시 실행

    // 클릭 시 해당 도시 검색 기능 (예시)
    const handleCityClick = (cityName) => {
        // 실제 검색 기능을 구현해야 합니다.
        // 예: 검색 페이지로 이동하며 검색어 전달
        console.log(`${cityName} 검색 기능 실행 (구현 필요)`);
        // navigate(`/search?query=${encodeURIComponent(cityName)}`); // react-router-dom의 useNavigate 사용 시
    };

    if (error) {
        return <RankingContainer>{error}</RankingContainer>;
    }

    if (ranking.length === 0) {
        return <RankingContainer>랭킹 정보 없음</RankingContainer>;
    }

    // 최대 10개 항목만 표시
    const displayedRanking = ranking.slice(0, 10);

    return (
        <RankingContainer
            onMouseEnter={() => setIsRankingVisible(true)} // 마우스 진입 시 랭킹 목록 표시
            onMouseLeave={() => setIsRankingVisible(false)} // 마우스 이탈 시 랭킹 목록 숨김
        >
            <RankingHeader $isVisible={isRankingVisible}> {/* isRankingVisible 상태에 따라 스타일 변경 */}
                <RankingTitle>실시간 인기 도시 순위</RankingTitle>
            </RankingHeader>

            {/* 랭킹 목록 (상태에 따라 조건부 렌더링) */}
            <RankingList $isVisible={isRankingVisible}>
                {isRankingVisible ? (
                    // 펼쳤을 때 전체 목록 표시
                    displayedRanking.map((item, index) => (
                        <RankingItem key={index} onClick={() => handleCityClick(item.cityName)} $isVisible={isRankingVisible}>
                            <span className="rank-number">{index + 1}.</span> {/* 모든 항목에 순위 번호 표시 */}
                            <span className="city-name">{item.cityName}</span>
                        </RankingItem>
                    ))
                ) : (
                    // 접었을 때 현재 인덱스에 해당하는 항목만 표시
                    displayedRanking.length > 0 && (
                        <RankingItem key={currentRankingIndex} onClick={() => handleCityClick(displayedRanking[currentRankingIndex].cityName)} $isVisible={isRankingVisible}>
                            <span className="rank-number">{currentRankingIndex + 1}.</span> {/* 현재 인덱스의 순위 번호 */}
                            <span className="city-name">{displayedRanking[currentRankingIndex].cityName}</span> {/* 현재 인덱스의 도시 이름 */}
                        </RankingItem>
                    )
                )}
            </RankingList>
        </RankingContainer>
    );
}

export default RealtimeRanking;