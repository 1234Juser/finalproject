// src/components/common/RealtimeRanking.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";

const RankingContainer = styled.div`
    /* margin-left: 20px; // 부모 SearchContainer에서 gap으로 간격 조절하므로 제거 */
    font-size: 0.9em; // 기본 폰트 크기
    color: #555;
    background-color: #fff;
    padding: 10px 15px; // 기본 패딩 (데스크톱)
    border-radius: 20px;

    width: auto; // 내용에 따라 너비 결정
    min-width: 140px; // 최소 너비 (데스크톱에서 너무 작아지지 않도록)
    max-width: 180px; // 최대 너비 (데스크톱)
    box-sizing: border-box;

    position: relative;
    z-index: 100; // 드롭다운 목록이 다른 요소 위에 오도록

    @media (max-width: 1024px) { // 1024px 이하 (태블릿 등)
        font-size: 0.85em;
        padding: 8px 12px;
        min-width: 120px;
        max-width: 160px;
    }

    @media (max-width: 767px) { // 모바일
        font-size: 0.8em;
        padding: 6px 10px;
        min-width: 100px; // 모바일에서 최소 너비
        max-width: 140px; // 모바일에서 최대 너비
        // 모바일에서 공간이 부족할 경우, SearchContainer 설정에 따라 이 컴포넌트가 안보이거나 더 작아질 수 있습니다.
        // 또는 여기서 display: none 처리를 할 수도 있습니다. 현재는 보이도록 유지.
    }
`;

const RankingHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding-bottom: 5px; // 기본값
    border-bottom: 1px solid #eee;

    ${props => !props.$isVisible && `
        border-bottom: none;
        padding-bottom: 0; // isVisible이 false일 때 padding-bottom을 0으로 명확히 설정
    `}
`;

const RankingTitle = styled.strong`
    color: #333;
    white-space: nowrap; // 타이틀 줄바꿈 방지

    @media (max-width: 767px) {
        font-size: 0.95em; // RankingContainer의 font-size에 상대적
    }
`;

const RankingList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0; // isVisible 상태에 따라 아래에서 margin-top 조절
    overflow: hidden;
    height: auto; // 항상 auto로 두고, display 여부로 제어하는 것이 더 간단할 수 있음

    ${props => props.$isVisible && `
        position: absolute;
        top: calc(100% - 1px); // border-bottom 두께 고려하여 살짝 올림
        left: 0;
        background-color: #f8f9fa;
        border-radius: 0 0 20px 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        width: 100%; // RankingContainer 너비에 맞춤
        padding-top: 10px; // 펼쳤을 때 상단 목록과 헤더 사이 간격
        margin-top: 1px; // border-bottom 위로 올라가도록
    `}

    ${props => !props.$isVisible && `
        margin-top: 5px; // 기본 상태에서 헤더와 첫 아이템 간격 (펼쳐지지 않았을 때)
    `}
`;


const RankingItem = styled.li`
    margin-bottom: 8px;
    &:last-child {
        margin-bottom: 0;
        ${props => props.$isVisible && `
            padding-bottom: 10px; // 펼쳐졌을 때 마지막 아이템 하단 여백
        `}
    }
    cursor: pointer;
    transition: color 0.2s ease-in-out, transform 0.2s ease-in-out; // color 추가
    padding: 0 15px; // RankingContainer의 좌우 패딩과 일치시킴 (데스크톱)

    display: flex;
    align-items: center;

    .rank-number {
        font-weight: bold;
        margin-right: 5px;
        color: #007bff;
        min-width: 20px;
        text-align: left;
    }

    .city-name {
        flex-grow: 1;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &:hover {
        color: #0056b3;
        transform: translateX(3px); // 호버 효과 약간 줄임
    }

    @media (max-width: 1024px) { // 1024px 이하
        padding: 0 12px; // RankingContainer 패딩과 일치
        margin-bottom: 7px;
    }
    @media (max-width: 767px) { // 모바일
        padding: 0 10px; // RankingContainer 패딩과 일치
        margin-bottom: 6px;
        .rank-number {
            min-width: 15px; // 폰트 크기 작아짐에 따라 조절
            margin-right: 4px;
        }
    }
`;

function RealtimeRanking() {
    const [ranking, setRanking] = useState([]);
    const [error, setError] = useState(null);
    const [isRankingVisible, setIsRankingVisible] = useState(false); // 랭킹 목록 표시/숨김 상태
    const [currentRankingIndex, setCurrentRankingIndex] = useState(0); // 현재 표시할 랭킹 항목의 인덱스
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                // 백엔드 API 엔드포인트 (필요에 따라 URL 수정)
                const response = await axios.get('/city/ranking');
                setRanking(response.data);
            } catch (err) {
                // console.error("실시간 랭킹 가져오기 실패:", err);
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

    // 클릭 시 해당 도시 검색 기능
    const handleCityClick = (cityId) => {
        if (cityId) { // cityId가 유효한 값일 경우에만 이동
            // console.log(`${cityId} 검색 기능 실행`);
            navigate(`/products/city?city_id=${cityId}`); // 도시 상세 페이지로 이동
        } else {
            // console.log("유효하지 않은 cityId:", cityId);
        }
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
                        <RankingItem key={index} onClick={() => handleCityClick(item.cityId)} $isVisible={isRankingVisible}>
                            <span className="rank-number">{index + 1}.</span> {/* 모든 항목에 순위 번호 표시 */}
                            <span className="city-name">{item.cityNameKR}</span>
                        </RankingItem>
                    ))
                ) : (
                    // 접었을 때 현재 인덱스에 해당하는 항목만 표시
                    displayedRanking.length > 0 && (
                        <RankingItem key={currentRankingIndex} onClick={() => handleCityClick(displayedRanking[currentRankingIndex].cityId)} $isVisible={isRankingVisible}>
                            <span className="rank-number">{currentRankingIndex + 1}.</span> {/* 현재 인덱스의 순위 번호 */}
                            <span className="city-name">{displayedRanking[currentRankingIndex].cityNameKR}</span> {/* 현재 인덱스의 도시 이름 */}
                        </RankingItem>
                    )
                )}
            </RankingList>
        </RankingContainer>
    );
}

export default RealtimeRanking;