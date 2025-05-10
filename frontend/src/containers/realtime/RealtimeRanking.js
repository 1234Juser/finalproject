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
    width: fit-content; // 내용물 크기에 맞게 너비 조절
    position: relative; /* 자식 요소의 absolute positioning 기준 */
    z-index: 100; /* 다른 요소 위에 오도록 z-index 설정 */

    /* 마우스 오버 시 랭킹 목록을 보이도록 설정 */
    &:hover .ranking-list {
        display: block; /* 랭킹 목록 보이도록 설정 */
    }
`;

const RankingHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between; // 제목과 버튼 사이에 공간
    cursor: pointer; // 헤더 클릭 가능하도록
    padding-bottom: 5px;
    border-bottom: 1px solid #eee; // 구분선 추가
`;

const RankingTitle = styled.strong`
    color: #333; // 글자색 변경
`;

const RankingList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 5px 0 0 0; // 위쪽에 마진 추가
    overflow: hidden; /* 숨겨진 항목 감추기 */
    display: none; /* 기본적으로 숨김 */

    position: absolute; /* 헤더 아래로 오버레이 */
    top: 100%; /* 헤더 바로 아래에 위치 */
    left: 0; /* 컨테이너의 왼쪽 정렬 */
    background-color: #f8f9fa; /* 배경색 유지 */
    border-radius: 0 0 20px 20px; /* 하단 모서리만 둥글게 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
    width: 100%; /* 부모 컨테이너 너비에 맞춤 */
    padding-top: 5px; /* 펼쳤을 때 상단 여백 */
`;


const RankingItem = styled.li`
    margin-bottom: 8px; // 세로 간격 조절
    &:last-child {
        margin-bottom: 0;
        padding-bottom: 10px; /* 하단 패딩 추가 */
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
    }

    &:hover {
        color: #0056b3; // 호버 시 색상 변경
        transform: translateX(5px); // 호버 시 살짝 오른쪽으로 이동
    }
`;

function RealtimeRanking() {
    const [ranking, setRanking] = useState([]);
    const [error, setError] = useState(null);

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
        <RankingContainer>
            <RankingHeader>
                <RankingTitle>실시간 인기 도시 순위</RankingTitle>
            </RankingHeader>

            {/* 랭킹 목록 (기본적으로 숨김, 마우스 오버 시 표시) */}
            <RankingList className="ranking-list"> {/* 클래스 이름 추가 */}
                {displayedRanking.map((item, index) => (
                    <RankingItem key={index} onClick={() => handleCityClick(item.cityName)}>
                        <span className="rank-number">{index + 1}.</span>
                        <span className="city-name">{item.cityName}</span>
                    </RankingItem>
                ))}
            </RankingList>
        </RankingContainer>
    );
}

export default RealtimeRanking;