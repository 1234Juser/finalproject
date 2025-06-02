import styled, { css } from 'styled-components';

// 알림 목록 전체 컨테이너
export const NotificationListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px; /* 알림 간 간격 */
    border-radius: 8px;
    //box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 은은한 그림자 효과 */
    //max-height: 500px; /* 최대 높이 (스크롤 가능) */
    //overflow-y: auto; /* 내용이 많을 경우 스크롤 */
    //border : 1px solid black;


`;

// 개별 알림 아이템
export const NotificationItem = styled.div`
    padding: 12px 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;
    box-sizing: border-box;

    ${({isRead}) =>
            isRead
                    ? css`
                        background-color: #eef2f7; /* 읽은 알림 배경색 */
                        //border-left-color: #adb5bd; /* 읽은 알림 왼쪽 테두리 */

                        &:hover {
                            background-color: #e2e8f0;
                        }
                    `
                    : css`
                background-color: #ffffff; /* 안 읽은 알림 배경색 */
                //border-left-color: #5d9ae0; /* 안 읽은 알림 왼쪽 테두리 (기존 색상 유지) */
                font-weight: 500; /* 안 읽은 알림은 약간 굵게 */
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

                &:hover {
                    background-color: #f8f9fa;
                    transform: translateY(-1px); /* 살짝 떠오르는 효과 */
                }
            `}
`;

// 알림 메시지 텍스트
export const NotificationMessage = styled.p`
  margin: 0 0 6px 0;
  font-size: 0.9rem;
  color: #333;
  line-height: 1.4;
    font-weight : 400;
    
    color: ${props => props.isRead ? '#999' : '#333'};

`;

// 알림 시간 텍스트
export const NotificationTimestamp = styled.small`
  font-size: 0.75rem;
  color: #777;
    margin-top: 4px; /* 메시지와의 간격 */
    color: ${props => props.isRead ? '#999' : '#666'};

`;

// 알림이 없을 때 표시될 메시지
export const NoNotificationsMessage = styled.p`
  padding: 20px;
  text-align: center;
  color: #868e96;
  font-size: 0.9rem;
`;


export const MarkAllSpanWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid #c5c5c5;
    padding : 10px 12px;
`



// '모두 읽음' 버튼 스타일
export const MarkAllAsReadSpan = styled.span`
    //padding: 8px 16px;
    //margin-bottom: 12px;
    color: #333;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    text-align: right;
    
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;


// *추가된 삭제 버튼 스타일*
export const DeleteSpan = styled.span`
    cursor: pointer;
    font-size: 0.9rem;
    color: #868e96;
    //margin-left: 12px;
    font-weight: 400;
`;


// *추가된 모든 알림 삭제 버튼 스타일*
export const DeleteAllSpan = styled.span`
    cursor: pointer;
    font-size: 0.9rem;
    margin-left: 12px;
    color: #333;
`;


// 알림 액션(읽음, 삭제 버튼)을 감싸는 래퍼
export const NotificationActionsWrapper = styled.div`
    display: flex;
    align-items: center; /* 액션 버튼들을 세로 중앙 정렬 */
    flex-shrink: 0; /* 공간이 부족할 때 액션 버튼 영역이 줄어들지 않도록 함 */
    gap: 12px; /* 액션 버튼들 사이의 간격 (DeleteSpan의 margin-left 대신 사용) */
`;

export const ActionButtonsGroup = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto; /* NotificationTimestamp의 오른쪽으로 이 그룹을 밀어냄 */
    gap: 20px; /* "읽음", "삭제" 버튼 사이의 간격 */
`;

