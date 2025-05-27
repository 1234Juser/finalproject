INSERT IGNORE INTO tbl_member (member_name, member_id, member_password, member_email, member_phone,member_profile_image_url, member_registerdate, member_enddate, member_endstatus, social_type, social_account_id, admin_active)
VALUES
('관리자1', 'user01', '$2a$10$8ygMfWX3HMqordLnpduoNOHD049O.rJCWbNJpbctoVdWVnjpKIuRq', 'user01@gmail.com', '010-1234-5678',null, '2025-04-27 21:41:01', NULL, 'N', NULL, NULL,'Y'),
('관리자2', 'user02', '$2a$10$W1NEKHPHdPx8F4Cx6BqWXe/BPGBFLz/ZieDKXxcKUpieDdaKMZs2q', 'user02@gmail.com', '010-1234-5678',null, '2025-04-27 21:41:21', NULL, 'N', NULL, NULL,'Y'),
('관리자3', 'user03', '$2a$10$1K6C8wBhLf1M8p2EeSB61.MagmzTz7EQugD9VtkStJBv7Sjbr2nqS', 'user03@gmail.com', '010-1234-5678',null, '2025-04-27 21:41:37', NULL, 'N', NULL, NULL,'Y'),
('유저테스트용', 'user04', '$2a$10$oeEYhmRfa3bxZhSSGPAElei6l1ya0KgsRUAaRmBduD8c1EIOIpLU2', 'user04@gmail.com', '010-1234-5678',null, '2025-04-27 21:42:46', NULL, 'N', NULL, NULL,'Y'),
('유저테스트1', 'user05', '$2a$10$7hjrnBTQVe1wpysxUtD.W.FGZXmYj5oSOU4LpL6HvYt.f0d39bwLy', 'user05@gmail.com', '010-1234-5678',null, '2025-05-26 17:09:36', NULL, 'N', NULL, NULL,'Y'),
('유저테스트2', 'user06', '$2a$10$ucJEwEQ8rufXz1AIXb5oZOE7UXyC4SCyVJZ8iHPdNEJHAmZ2iqgnq', 'user06@gmail.com', '010-1234-5678',null, '2025-05-26 17:09:55', NULL, 'N', NULL, NULL,'Y');



INSERT IGNORE INTO tbl_authority (authority_name)
VALUES ('ROLE_ADMIN'), ('ROLE_USER');

INSERT IGNORE INTO tbl_member_role (member_code, authority_code)
VALUES
((SELECT member_code FROM tbl_member WHERE member_id = 'user01'), 1),  -- user01: ADMIN
((SELECT member_code FROM tbl_member WHERE member_id = 'user01'), 2),  -- user01: USER
((SELECT member_code FROM tbl_member WHERE member_id = 'user02'), 1),  -- user02: ADMIN
((SELECT member_code FROM tbl_member WHERE member_id = 'user02'), 2),  -- user02: USER
((SELECT member_code FROM tbl_member WHERE member_id = 'user03'), 1),  -- user03: ADMIN
((SELECT member_code FROM tbl_member WHERE member_id = 'user03'), 2),  -- user03: USER
((SELECT member_code FROM tbl_member WHERE member_id = 'user04'), 2),  -- user04: USER
((SELECT member_code FROM tbl_member WHERE member_id = 'user05'), 2),  -- user05: USER
((SELECT member_code FROM tbl_member WHERE member_id = 'user06'), 2);  -- user06: USER


-- 이벤트 데이터 중복삭제
DELETE FROM tbl_event;
INSERT INTO tbl_event (event_title, event_content, event_img, event_status, event_startdate, event_enddate)
VALUES
    -- 진행중인 이벤트 (종료 날짜가 미래)
    ('초특가! 도쿄 3박 4일 자유여행', '지금 예약하면 항공권 할인! 아사쿠사, 시부야, 신주쿠를 내맘대로 즐기는 도쿄 핵심투어.', 'event/event4.png', '진행중', NOW() - INTERVAL 7 DAY, DATE_ADD(NOW(), INTERVAL 20 DAY)),
    ('낭만가득! 파리&스위스 7박 9일', '에펠탑 야경과 알프스 설산을 한번에! 유럽 베스트셀러 상품, 로맨틱 허니문으로도 강력 추천!', 'event/event11.png', '진행중', NOW() - INTERVAL 3 DAY, DATE_ADD(NOW(), INTERVAL 30 DAY)),
    ('여름휴가 추천! 다낭 3박 5일 호캉스', '미케비치 해변과 5성급 리조트에서 즐기는 완벽한 휴식. 바나힐 투어 포함 특별 프로모션 진행중!', 'event/event6.png', '진행중', NOW(), DATE_ADD(NOW(), INTERVAL 45 DAY)),
    ('제주도 완전정복! 렌터카+숙소 패키지', '푸른 제주 바다와 맛집 탐방! 항공권만 준비하세요. 가성비 최고의 제주 여행 상품.', 'event/event2.png', '진행중', NOW() - INTERVAL 1 DAY, DATE_ADD(NOW(), INTERVAL 30 DAY)),
    ('지금 아니면 언제? 방콕 파타야 5일 특가', '활기 넘치는 방콕 시내와 아름다운 파타야 해변을 동시에! 알찬 일정과 쇼핑 찬스까지!', 'event/event5.png', '진행중', NOW(), DATE_ADD(NOW(), INTERVAL 25 DAY)),
    ('온가족 해외여행! 싱가포르 4일 유니버셜', '유니버셜 스튜디오 입장권 포함! 멀라이언 파크, 가든스 바이더 베이 등 핵심 관광지와 함께 즐거운 가족여행!', 'event/event7.png', '진행중', NOW() - INTERVAL 5 DAY, DATE_ADD(NOW(), INTERVAL 25 DAY)),
    -- 종료된 이벤트 (종료 날짜가 과거)
    ('[종료] 봄맞이 경주 벚꽃여행 1박 2일', '아름다운 벚꽃과 함께한 천년고도 경주 여행, 많은 사랑 감사드립니다. 다음 시즌을 기대해주세요!', 'event/event1.png', '종료', NOW() - INTERVAL 60 DAY, NOW() - INTERVAL 45 DAY),
    ('[종료] 겨울왕국 삿포로 눈꽃축제 4일', '환상적인 설경과 함께한 삿포로 눈꽃축제! 잊지 못할 추억을 선사해드렸기를 바랍니다.', 'event/event9.png', '종료', NOW() - INTERVAL 120 DAY, NOW() - INTERVAL 100 DAY),
    ('[종료] 추석연휴 한정! 홍콩 마카오 3박4일', '황금연휴에 떠났던 미식과 쇼핑의 천국! 뜨거운 성원에 감사드립니다.', 'event/event3.png', '종료', NOW() - INTERVAL 90 DAY, NOW() - INTERVAL 80 DAY),
    ('[종료] 부산 불꽃축제 명당 패키지', '화려한 불꽃과 함께한 가을밤의 추억! 내년에도 더 좋은 상품으로 찾아뵙겠습니다.', 'event/event4.png', '종료', NOW() - INTERVAL 75 DAY, NOW() - INTERVAL 70 DAY),
    ('[종료] 이탈리아 완전일주 10일', '로마, 피렌체, 베네치아를 포함한 이탈리아 핵심 도시 완전 정복! 고객님의 만족이 저희의 기쁨입니다.', 'event/event12.png', '종료', NOW() - INTERVAL 150 DAY, NOW() - INTERVAL 140 DAY),
    ('[종료] 코타키나발루 선셋투어 5일', '세계 3대 선셋을 감상했던 코타키나발루! 아름다운 추억과 함께해주셔서 감사합니다.', 'event/event10.png', '종료', NOW() - INTERVAL 80 DAY, NOW() - INTERVAL 75 DAY),
    ('[종료] 괌 PIC 골드카드 특가', '가족여행의 성지, 괌 PIC 리조트에서의 즐거운 시간! 다음에도 특별한 혜택으로 만나요.', 'event/event8.png', '종료', NOW() - INTERVAL 100 DAY, NOW() - INTERVAL 90 DAY);

-- faq테이블 중복삭제
DELETE FROM tbl_faq;
INSERT INTO tbl_faq (faq_title, faq_content)
VALUES
    ('예약은 어떻게 하나요?', '저희 웹사이트에서 원하는 여행 상품을 선택하신 후, 예약하기 버튼을 클릭하여 안내에 따라 정보를 입력하시면 됩니다. 궁금한 점이 있으시면 고객센터로 문의해주세요.'),
    ('결제는 어떤 방법으로 가능한가요?', '신용카드(Visa, MasterCard, American Express), 계좌 이체, 그리고 페이팔을 통해 결제가 가능합니다. 일부 상품의 경우 무통장 입금도 지원합니다.'),
    ('예약 취소 및 환불 규정은 어떻게 되나요?', '예약 취소 및 환불 규정은 상품별로 상이합니다. 일반적으로 출발일로부터 며칠 전까지는 전액 환불이 가능하며, 그 이후에는 위약금이 발생할 수 있습니다. 자세한 내용은 예약 시 상품 페이지를 참고하시거나 고객센터로 문의해주세요.'),
    ('항공권은 어떻게 수령하나요?', '예약 및 결제가 완료되면, 등록하신 이메일 주소로 전자 항공권(e-ticket)이 발송됩니다. 해당 전자 항공권을 출력하시거나 모바일 기기에 저장하여 공항에서 사용하시면 됩니다.'),
    ('수하물 규정은 어떻게 되나요?', '수하물 규정은 이용하시는 항공사 및 항공권 종류에 따라 다릅니다. 일반적으로 위탁 수하물과 기내 수하물의 무게 및 크기 제한이 있으니, 예약하신 항공사의 홈페이지를 통해 확인하시거나 고객센터로 문의해주세요.'),
    ('단체 여행도 가능한가요?', '네, 단체 여행도 가능합니다. 10인 이상의 단체 여행의 경우, 별도의 맞춤형 견적 및 특별 할인을 제공해 드립니다. 고객센터로 문의하시면 자세한 상담을 받으실 수 있습니다.'),
    ('여행자 보험 가입은 필수인가요?', '여행자 보험은 필수는 아니지만, 만약의 사태에 대비하여 가입하시는 것을 강력히 권장합니다. 저희는 다양한 여행자 보험 상품을 제휴하고 있으니, 필요하시면 안내해 드릴 수 있습니다.'),
    ('현지에서 비상 상황 발생 시 어떻게 해야 하나요?', '현지에서 비상 상황이 발생하면, 즉시 저희 고객센터 비상 연락처로 연락 주십시오. 24시간 운영되는 비상 연락망을 통해 도움을 드릴 것입니다.'),
    ('어린이와 함께하는 여행 시 주의사항은 무엇인가요?', '어린이와 함께하는 여행은 특별한 준비가 필요합니다. 유아용 카시트, 유모차 대여 가능 여부, 어린이 메뉴 제공 여부 등을 미리 확인하시고, 여권 유효기간과 비자 필요 여부를 꼭 확인해주세요.'),
    ('맞춤형 여행 상품 개발도 가능한가요?', '네, 고객님의 취향과 예산에 맞춰 맞춤형 여행 상품 개발도 가능합니다. 원하시는 목적지, 예산, 여행 기간 등을 알려주시면 전문가가 최적의 여행 계획을 설계해 드립니다.'),
    ('여행 중 현지 통화는 어떻게 준비해야 하나요?', '여행 국가의 현지 통화는 출발 전 국내 은행에서 환전하시거나, 현지 공항 또는 시내 환전소에서 환전하실 수 있습니다. 일부 지역에서는 신용카드 사용이 편리합니다.'),
    ('비자 발급에 대한 도움을 받을 수 있나요?', '네, 여행하시려는 국가에 따라 비자가 필요한 경우, 비자 발급에 필요한 정보나 절차에 대해 안내해 드릴 수 있습니다. 다만, 비자 발급은 개인의 책임이므로 미리 준비하시는 것이 좋습니다.');

-- 게시물테이블 중복삭제
DELETE FROM tbl_like;
DELETE FROM tbl_companion_comment;
DELETE FROM tbl_companion;
INSERT INTO tbl_companion (companion_id, member_code, companion_title, companion_content, companion_created_at, companion_modified_at, companion_view_count,companion_notice) VALUES
                                                                                                                                                                                  (1, (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), '제주도 2박 3일 동행 구해요! (렌트카 필수)', '다음주 제주도 여행 계획 중인데, 같이 동행하실 분 찾아요! 렌트카 같이 빌려서 나눠내면 좋을 것 같아요. 맛집 탐방 좋아하시면 더 환영입니다!', NOW() - INTERVAL 10 DAY, NULL, 12, true),
                                                                                                                                                                                  (2, (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), '오사카 맛집 투어 동행 구합니다!', '5월 황금연휴에 오사카 맛집 투어 계획 중이에요. 현지 맛집 잘 아시는 분이나 같이 찾아다닐 분 계시면 연락 주세요! 식비 N빵으로 즐겁게 먹방 찍어요~', NOW() - INTERVAL 9 DAY, NULL, 34, false),
                                                                                                                                                                                  (3, (SELECT member_code FROM tbl_member WHERE member_id = 'user03'), '유럽 배낭여행 1달 동행 구합니다 (체력 필수!)', '7월 한 달간 유럽 배낭여행 동행자를 찾습니다! 스페인-이탈리아-프랑스 루트 예상하고 있어요. 걷는 거 좋아하고 즉흥적인 여행 즐기시는 분이면 좋겠습니다.', NOW() - INTERVAL 8 DAY, NULL, 56, false),
                                                                                                                                                                                  (4, (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), '강릉 서핑 같이 타러 가실 분?', '이번 주말 강릉에서 서핑 배우러 가려고 하는데, 같이 가실 분 계신가요? 초보도 환영입니다! 끝나고 맛있는 회 한 접시 같이 하실 분 구해요.', NOW() - INTERVAL 7 DAY, NULL, 21, false),
                                                                                                                                                                                  (5, (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), '도쿄 디즈니랜드 같이 갈 파티원 모집!', '다음 달 도쿄 디즈니랜드 갈 예정인데, 혼자 가는 것보다 같이 가면 더 재밌을 것 같아서 동행 구합니다! 어트랙션 위주로 빠르게 돌고 싶어요.', NOW() - INTERVAL 6 DAY, NULL, 0, false),
                                                                                                                                                                                  (6, (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), '부산 해운대 요트 투어 동행하실 분?', '이번 여름 부산 해운대에서 요트 투어 계획 중이에요. 선셋 보면서 힐링하고 싶으신 분들 같이 가요! 사진 찍는 거 좋아하시면 더 좋아요.', NOW() - INTERVAL 5 DAY, NULL, 13, false),
                                                                                                                                                                                  (7, (SELECT member_code FROM tbl_member WHERE member_id = 'user03'), '제주 한라산 등반 동행 구합니다 (성판악 코스)', '이번 주말 한라산 성판악 코스 등반 계획 중입니다. 혼자보단 같이 오르면서 힘이 되어줄 동행 구해요! 정상에서 김밥 같이 먹어요.', NOW() - INTERVAL 4 DAY, NULL, 88, false),
                                                                                                                                                                                  (8, (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), '경주 한복 체험 같이 하실 분?', '경주 여행 가서 예쁜 한복 입고 사진 남기고 싶은데, 혼자서는 좀 민망해서 동행 구해요! 사진 예쁘게 찍어주실 분이면 더 좋아요!', NOW() - INTERVAL 3 DAY, NULL, 45, false),
                                                                                                                                                                                  (9, (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), '내일로 기차여행 동행자 구함 (자유로운 영혼 환영)', '이번 여름 내일로 기차여행 계획 중인데, 자유롭게 떠날 수 있는 동행자를 찾습니다. 즉흥적인 여행 스타일 선호하고, 새로운 사람 만나는 거 좋아하는 분 연락 주세요!', NOW() - INTERVAL 2 DAY, NULL, 7, false),
                                                                                                                                                                                  (10, (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), '태국 방콕 야시장 투어 동행 구합니다', '다음 달 방콕 여행 가는데, 짜뚜짝 시장이랑 딸랏롯파이 야시장 같이 구경하고 맛있는 거 먹을 동행 찾아요! 흥정의 달인 환영합니다!', NOW() - INTERVAL 1 DAY, NULL, 99, false),
                                                                                                                                                                                  (11, (SELECT member_code FROM tbl_member WHERE member_id = 'user03'), '싱가포르 가든스 바이 더 베이 야경 감상 동행', '싱가포르 가든스 바이 더 베이 슈퍼트리 쇼 같이 볼 동행 구합니다. 멋진 야경 보면서 맥주 한 잔 하실 분이면 더 좋을 것 같아요!', NOW(), NULL, 3, false);

-- 여행커뮤니티댓글테이블
INSERT INTO tbl_companion_comment (companion_comment_id, member_code, companion_id, companion_comment_content, companion_comment_created_at, companion_comment_modified_at)
VALUES
    (1, (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), 1, '오 저도 제주도 가려고 했는데 혹시 날짜가 어떻게 되시나요? 렌트카 동행 딱 좋네요!', NOW() - INTERVAL 10 DAY, NULL),
    (2, (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), 1, '렌트카 비용 아끼기 좋겠네요! 맛집 탐방이라니 저랑 딱이에요. 자세한 일정 알 수 있을까요?', NOW() - INTERVAL 10 DAY, NULL),
    (3, (SELECT member_code FROM tbl_member WHERE member_id = 'user03'), 1, '혼자 렌트하기 부담스러웠는데 좋은 기회네요! 면허는 있습니다. 혹시 출발지가 어디신가요?', NOW() - INTERVAL 9 DAY, NULL),
    (4, (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), 1, '제주도 맛집리스트 제가 짜드릴 수 있어요! 혹시 몇 분 정도 구하고 계신가요?', NOW() - INTERVAL 8 DAY, NULL),
    (5, (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), 1, '댓글 달아주신 분들 모두 감사해요! 쪽지 보내드릴게요.', NOW() - INTERVAL 7 DAY, NULL),
    (6, (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), 1, '제주도 혼자 여행가려다가 심심할 것 같았는데 잘됐네요! 저도 차 몰 수 있습니다. 합류하고 싶어요.', NOW() - INTERVAL 6 DAY, NULL),
    (7, (SELECT member_code FROM tbl_member WHERE member_id = 'user03'), 1, '렌트카 동행이라니 완전 끌리네요! 저도 다음 주 제주도 가요. 혹시 감성 카페 투어도 좋아하시나요?', NOW() - INTERVAL 5 DAY, NULL),
    (8, (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), 1, '제주도민입니다! 혹시 현지 맛집 추천 필요하시면 제가 리스트 보내드릴게요 :)', NOW() - INTERVAL 4 DAY, NULL),
    (9, (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), 2, '오사카 맛집투어라니! 저도 5월에 오사카 가는데 같이 다니면 좋겠어요. 특히 현지인 맛집 궁금하네요.', NOW() - INTERVAL 9 DAY, NULL),
    (10, (SELECT member_code FROM tbl_member WHERE member_id = 'user03'), 2, '와 저 진짜 오사카 맛집 박사에요! 같이 다니면 후회 안 하실 겁니다. 언제 가세요?', NOW() - INTERVAL 8 DAY, NULL),
    (11, (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), 2, '도톤보리에서 먹방 찍으실 분 찾고 있었는데! 저도 끼워주세요!', NOW() - INTERVAL 7 DAY, NULL),
    (12, (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), 3, '유럽 배낭여행! 1달이라니 대단하시네요. 저는 한 달까지는 어렵고 2주 정도 스페인만 동행 가능할 것 같아요.', NOW() - INTERVAL 8 DAY, NULL),
    (13, (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), 3, '저 체력 하나는 자신 있습니다! 유럽 배낭여행 로망이었는데, 혹시 영국 쪽은 생각 없으신가요?', NOW() - INTERVAL 7 DAY, NULL),
    (14, (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), 4, '강릉 서핑 저도 초보인데 같이 배울래요? 끝나고 회는 제가 쏩니다!', NOW() - INTERVAL 7 DAY, NULL),
    (15, (SELECT member_code FROM tbl_member WHERE member_id = 'user03'), 4, '강릉 서핑이라니 시원하겠네요! 저 장비는 있는데 초보에요! 같이 가요!', NOW() - INTERVAL 6 DAY, NULL),
    (16, (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), 5, '도쿄 디즈니랜드 저도 다음 달 계획 중인데, 어트랙션 위주 좋네요! 같이 오픈런 하실 분?', NOW() - INTERVAL 6 DAY, NULL),
    (17, (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), 5, '디즈니랜드 완전 좋아해요! 혼자 가면 심심한데 같이 가실 분이라니 완전 환영입니다!', NOW() - INTERVAL 5 DAY, NULL),
    (18, (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), 6, '부산 요트 투어 정말 낭만적이겠네요! 사진 찍는 거 자신 있습니다. 저랑 같이 가요!', NOW() - INTERVAL 5 DAY, NULL),
    (19, (SELECT member_code FROM tbl_member WHERE member_id = 'user03'), 6, '선셋 요트라니 환상이네요! 혹시 해운대 근처에서 숙소도 같이 잡으실 분 계신가요?', NOW() - INTERVAL 4 DAY, NULL),
    (20, (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), 7, '한라산 성판악 코스 힘든데, 같이 올라가면 더 힘낼 수 있을 것 같아요! 정상 김밥 꿀맛이죠.', NOW() - INTERVAL 4 DAY, NULL),
    (21, (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), 7, '와 한라산 등반이라니 멋있네요! 저도 같이 가고 싶어요. 등산 장비는 다 있습니다!', NOW() - INTERVAL 3 DAY, NULL),
    (22, (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), 8, '경주 한복 체험 저도 해보고 싶었어요! 같이 예쁜 한복 입고 사진 찍어요!', NOW() - INTERVAL 3 DAY, NULL),
    (23, (SELECT member_code FROM tbl_member WHERE member_id = 'user03'), 8, '저는 사진 찍는 거 전문입니다! 인생샷 많이 남겨드릴게요. 같이 가요!', NOW() - INTERVAL 2 DAY, NULL),
    (24, (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), 9, '내일로 기차여행이라니 완전 로망이에요! 저 자유로운 영혼인데, 같이 떠날 수 있을까요?', NOW() - INTERVAL 2 DAY, NULL),
    (25, (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), 9, '저도 즉흥 여행 좋아해요! 내일로 계획 중이었는데 같이 가면 좋을 것 같아요.', NOW() - INTERVAL 1 DAY, NULL),
    (26, (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), 10, '태국 야시장 좋아요! 같이 가서 흥정으로 다 쓸어올 자신 있습니다 ㅋㅋㅋ', NOW() - INTERVAL 1 DAY, NULL),
    (27, (SELECT member_code FROM tbl_member WHERE member_id = 'user03'), 10, '방콕 야시장 먹거리 최고죠! 저도 동행하고 싶어요. 맛집 정보 많이 압니다!', NOW() - INTERVAL 1 DAY, NULL),
    (28, (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), 11, '싱가포르 야경은 진짜 최고죠! 저도 마침 싱가포르 갈 예정인데, 같이 가든스 바이 더 베이에서 인생샷 남겨요!', NOW(), NULL),
    (29, (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), 11, '슈퍼트리 쇼 보면서 맥주라니 완벽하네요! 저도 합류하고 싶습니다.', NOW(), NULL),
    (30, (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), 1, '제주도 멋있어요?', NOW(), NULL),
    (31, (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), 1, '제주도 여행 재미있을꺼 같아요?', NOW(), NULL),
    (32, (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), 1, '제주도 흑돼지 삼겹살 먹고 싶어요', NOW(), NULL);


-- tbl_like 테이블 더미 데이터 삽입
INSERT INTO tbl_like (member_code, companion_id, companion_comment_id, created_at)
VALUES
    -- 게시글 좋아요 (companion_id만 NULL이 아님)
    ((SELECT member_code FROM tbl_member WHERE member_id = 'user01'), 1, NULL, NOW() - INTERVAL 5 DAY),
    ((SELECT member_code FROM tbl_member WHERE member_id = 'user02'), 1, NULL, NOW() - INTERVAL 4 DAY),
    ((SELECT member_code FROM tbl_member WHERE member_id = 'user03'), 1, NULL, NOW() - INTERVAL 3 DAY),
    ((SELECT member_code FROM tbl_member WHERE member_id = 'user04'), 1, NULL, NOW() - INTERVAL 2 DAY),
    ((SELECT member_code FROM tbl_member WHERE member_id = 'user01'), 2, NULL, NOW() - INTERVAL 6 DAY),
    ((SELECT member_code FROM tbl_member WHERE member_id = 'user02'), 2, NULL, NOW() - INTERVAL 5 DAY),
    ((SELECT member_code FROM tbl_member WHERE member_id = 'user03'), 3, NULL, NOW() - INTERVAL 7 DAY),
    ((SELECT member_code FROM tbl_member WHERE member_id = 'user04'), 4, NULL, NOW() - INTERVAL 8 DAY),
    ((SELECT member_code FROM tbl_member WHERE member_id = 'user01'), 5, NULL, NOW() - INTERVAL 9 DAY),
    ((SELECT member_code FROM tbl_member WHERE member_id = 'user02'), 6, NULL, NOW() - INTERVAL 10 DAY),
    -- 댓글 좋아요 (companion_comment_id만 NULL이 아님)
    ((SELECT member_code FROM tbl_member WHERE member_id = 'user01'), NULL, 1, NOW() - INTERVAL 5 DAY),
    ((SELECT member_code FROM tbl_member WHERE member_id = 'user02'), NULL, 1, NOW() - INTERVAL 4 DAY),
    ((SELECT member_code FROM tbl_member WHERE member_id = 'user03'), NULL, 2, NOW() - INTERVAL 3 DAY),
    ((SELECT member_code FROM tbl_member WHERE member_id = 'user04'), NULL, 2, NOW() - INTERVAL 2 DAY),
    ((SELECT member_code FROM tbl_member WHERE member_id = 'user01'), NULL, 3, NOW() - INTERVAL 6 DAY),
    ((SELECT member_code FROM tbl_member WHERE member_id = 'user02'), NULL, 4, NOW() - INTERVAL 5 DAY),
    ((SELECT member_code FROM tbl_member WHERE member_id = 'user03'), NULL, 5, NOW() - INTERVAL 7 DAY),
    ((SELECT member_code FROM tbl_member WHERE member_id = 'user04'), NULL, 6, NOW() - INTERVAL 8 DAY),
    ((SELECT member_code FROM tbl_member WHERE member_id = 'user01'), NULL, 7, NOW() - INTERVAL 9 DAY),
    ((SELECT member_code FROM tbl_member WHERE member_id = 'user02'), NULL, 8, NOW() - INTERVAL 10 DAY);

DELETE FROM tbl_follow;
INSERT INTO tbl_follow (follower_member_code, following_member_code, followed_at) VALUES
                                                                                      -- user04의 팔로잉 (user04가 다른 사람을 팔로우) - 3개
                                                                                      ((SELECT member_code FROM tbl_member WHERE member_id = 'user04'), (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), NOW() - INTERVAL 20 DAY),
                                                                                      ((SELECT member_code FROM tbl_member WHERE member_id = 'user04'), (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), NOW() - INTERVAL 18 DAY),
                                                                                      ((SELECT member_code FROM tbl_member WHERE member_id = 'user04'), (SELECT member_code FROM tbl_member WHERE member_id = 'user03'), NOW() - INTERVAL 15 DAY),
                                                                                      ((SELECT member_code FROM tbl_member WHERE member_id = 'user04'), (SELECT member_code FROM tbl_member WHERE member_id = 'user05'), NOW() - INTERVAL 14 DAY),
                                                                                      ((SELECT member_code FROM tbl_member WHERE member_id = 'user04'), (SELECT member_code FROM tbl_member WHERE member_id = 'user06'), NOW() - INTERVAL 13 DAY),

                                                                                      -- user04의 팔로워 (다른 사람이 user04를 팔로우) - 3개
                                                                                      ((SELECT member_code FROM tbl_member WHERE member_id = 'user01'), (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), NOW() - INTERVAL 19 DAY),
                                                                                      ((SELECT member_code FROM tbl_member WHERE member_id = 'user02'), (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), NOW() - INTERVAL 17 DAY),
                                                                                      ((SELECT member_code FROM tbl_member WHERE member_id = 'user03'), (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), NOW() - INTERVAL 14 DAY),
                                                                                      ((SELECT member_code FROM tbl_member WHERE member_id = 'user05'), (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), NOW() - INTERVAL 13 DAY),
                                                                                      ((SELECT member_code FROM tbl_member WHERE member_id = 'user06'), (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), NOW() - INTERVAL 12 DAY),

                                                                                      ((SELECT member_code FROM tbl_member WHERE member_id = 'user01'), (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), NOW() - INTERVAL 25 DAY),
                                                                                      ((SELECT member_code FROM tbl_member WHERE member_id = 'user02'), (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), NOW() - INTERVAL 24 DAY),
                                                                                      ((SELECT member_code FROM tbl_member WHERE member_id = 'user03'), (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), NOW() - INTERVAL 22 DAY),
                                                                                      ((SELECT member_code FROM tbl_member WHERE member_id = 'user01'), (SELECT member_code FROM tbl_member WHERE member_id = 'user03'), NOW() - INTERVAL 21 DAY);


INSERT IGNORE INTO tbl_region (region_code, region_uid, region_name, region_type)
VALUES
(1,'SEOULGYEONGGI', '서울/경기/강원/충청', 'DOMESTIC'),
(2,'BUSANGYEONGSANG', '부산/경상/전라', 'DOMESTIC'),
(3,'JEJU', '제주', 'DOMESTIC'),
(4,'ASIA', '아시아', 'INTERNATIONAL'),
(5,'EUROPE', '유럽', 'INTERNATIONAL'),
(6,'AMERICAS', '아메리카', 'INTERNATIONAL'),
(7,'OCEANIA', '오세아니아', 'INTERNATIONAL'),
(8,'AFRICA', '아프리카', 'INTERNATIONAL');


INSERT IGNORE INTO tbl_country (country_code, region_code, country_uid, country_name, country_name_kr) VALUES
                                                                                                           (01, 4, 'KR01', 'South Korea', '대한민국'),
                                                                                                           (02, 4, 'JP02', 'Japan', '일본'),
                                                                                                           (03, 4, 'TH03', 'Thailand', '태국'),
                                                                                                           (04, 5, 'FR04', 'France', '프랑스'),
                                                                                                           (05, 5, 'IT05', 'Italy', '이탈리아'),
                                                                                                           (06, 6, 'US06', 'United States', '미국'),
                                                                                                           (07, 4, 'MV07', 'Maldives', '몰디브'),
                                                                                                           (08, 7, 'AU08', 'Australia', '호주'),
                                                                                                           (09, 4, 'AE09', 'United Arab Emirates', '아랍에미리트'),
                                                                                                           (10, 8, 'ZA10', 'South Africa', '남아프리카공화국'),
                                                                                                           (11, 6, 'CA11', 'Canada', '캐나다'),
                                                                                                           (12, 4, 'CN12', 'China', '중국'),
                                                                                                           (13, 5, 'ES13', 'Spain', '스페인'),
                                                                                                           (14, 4, 'VN14', 'Vietnam', '베트남'),
                                                                                                           (15, 5, 'DE15', 'Germany', '독일'),
                                                                                                           (16, 8, 'EG16', 'Egypt', '이집트'),
                                                                                                           (17, 7, 'NZ17', 'New Zealand', '뉴질랜드'),
                                                                                                           (18, 6, 'BR18', 'Brazil', '브라질'),
                                                                                                           (19, 4, 'ID19', 'Indonesia', '인도네시아'),
                                                                                                           (20, 5, 'GB20', 'United Kingdom', '영국'),
                                                                                                           (21, 6, 'MX23', 'Mexico', '멕시코'),
                                                                                                           (22, 4, 'PH24', 'Philippines', '필리핀'),
                                                                                                           (23, 5, 'SE25', 'Sweden', '스웨덴'),
                                                                                                           (24, 6, 'AR28', 'Argentina', '아르헨티나'),
                                                                                                           (25, 4, 'SG29', 'Singapore', '싱가포르'),
                                                                                                           (26, 5, 'CH30', 'Switzerland', '스위스');


INSERT IGNORE INTO tbl_city (city_code, country_id, city_uid, city_name, city_name_kr, region_code) VALUES
                                                                                                        (0101, 01, 'SEOUL0101', 'SEOUL', '서울', 1),
                                                                                                        (0102, 01, 'BUSAN0102', 'BUSAN', '부산', 2),
                                                                                                        (0103, 01, 'JEJU0103', 'JEJU', '제주', 3),
                                                                                                        (0104, 01, 'GANGNEUNG0104', 'GANGNEUNG', '강릉', 1),
                                                                                                        (0105, 01, 'DAEJEON0105', 'DAEJEON', '대전', 1),
                                                                                                        (0106, 01, 'INCHEON0106', 'INCHEON', '인천', 1),
                                                                                                        (0107, 01, 'CHUNCHEON0107', 'CHUNCHEON', '춘천', 1),
                                                                                                        (0108, 01, 'SUWON0108', 'SUWON', '수원', 1),
                                                                                                        (0109, 01, 'CHEONGJU0109', 'CHEONGJU', '청주', 1),
                                                                                                        (0110, 01, 'DAEGU0110', 'DAEGU', '대구', 2),
                                                                                                        (0111, 01, 'JEONJU0111', 'JEONJU', '전주', 2),
                                                                                                        (0112, 01, 'GYEONGJU0112', 'GYEONGJU', '경주', 2),
                                                                                                        (0113, 01, 'GWANGJU0113', 'GWANGJU', '광주', 2),
                                                                                                        (0114, 01, 'ULSAN0114', 'ULSAN', '울산', 2),
                                                                                                        (0201, 02, 'TOKYO0201', 'TOKYO', '도쿄', 4),
                                                                                                        (0202, 02, 'OSAKA0202', 'OSAKA', '오사카', 4),
                                                                                                        (0301, 03, 'BANGKOK0301', 'BANGKOK', '방콕', 4),
                                                                                                        (0401, 04, 'PARIS0401', 'PARIS', '파리', 5),
                                                                                                        (0501, 05, 'ROME0501', 'ROME', '로마', 5),
                                                                                                        (0601, 06, 'NEWYORK0601', 'NEWYORK', '뉴욕', 6),
                                                                                                        (0701, 07, 'MALE0701', 'MALE', '말레', 7),
                                                                                                        (0801, 08, 'SYDNEY0801', 'SYDNEY', '시드니', 7),
                                                                                                        (0901, 09, 'DUBAI0901', 'DUBAI', '두바이', 4),
                                                                                                        (1001, 10, 'CAPE_TOWN1001', 'CAPETOWN', '케이프타운', 8),
                                                                                                        (1101, 11, 'TORONTO1101', 'TORONTO', '토론토', 6),
                                                                                                        (1201, 12, 'BEIJING1201', 'BEIJING', '베이징', 4),
                                                                                                        (1202, 12, 'SHANGHAI1202', 'SHANGHAI', '상하이', 4),
                                                                                                        (1203, 12, 'GUANGZHOU1203', 'GUANGZHOU', '광저우', 4),
                                                                                                        (1301, 13, 'MADRID1301', 'MADRID', '마드리드', 5),
                                                                                                        (1302, 13, 'BARCELONA1301', 'BARCELONA', '바르셀로나', 5),
                                                                                                        (1401, 14, 'HANOI1401', 'HANOI', '하노이', 4),
                                                                                                        (1402, 14, 'HOCHIMINH1402', 'HOCHIMINH', '호치민', 4),
                                                                                                        (1501, 15, 'BERLIN1501', 'BERLIN', '베를린', 5),
                                                                                                        (1502, 15, 'HAMBURG1502', 'HAMBURG', '함부르크', 5),
                                                                                                        (1503, 15, 'MUNICH1503', 'MUNICH', '뮌헨', 5),
                                                                                                        (1601, 16, 'CAIRO1601', 'CAIRO', '카이로', 8),
                                                                                                        (1701, 17, 'AUCKLAND1701', 'AUCKLAND', '오클랜드', 7),
                                                                                                        (1801, 18, 'RIO_DE_JANEIRO1801', 'RIO DE JANEIRO', '리우데자네이루', 6),
                                                                                                        (1802, 18, 'SAO_PAULO1802', 'SAO PAULO', '상파울루', 6),
                                                                                                        (1901, 19, 'JAKARTA1901', 'JAKARTA', '자카르타', 4),
                                                                                                        (2001, 20, 'LONDON2001', 'LONDON', '런던', 5),
                                                                                                        (2002, 20, 'MANCHESTER2002', 'MANCHESTER', '맨체스터', 5),
                                                                                                        (2101, 21, 'MEXICO_CITY2301', 'MEXICO CITY', '멕시코시티', 6),
                                                                                                        (2201, 22, 'MANILA2401', 'MANILA', '마닐라', 4),
                                                                                                        (2202, 22, 'CEBU2402', 'CEBU', '세부', 4),
                                                                                                        (2301, 23, 'STOCKHOLM2501', 'STOCKHOLM', '스톡홀름', 5),
                                                                                                        (2401, 24, 'BUENOS_AIRES2801', 'BUENOS AIRES', '부에노스아이레스', 6),
                                                                                                        (2501, 25, 'SINGAPORE2901', 'SINGAPORE', '싱가포르', 4),
                                                                                                        (2601, 26, 'ZURICH3001', 'ZURICH', '취리히', 5);


INSERT IGNORE INTO tbl_theme (theme_code, theme_uid, theme_name, theme_condition) VALUES
(1,'THEME_001', '투어', '가이드동반'),
(2,'THEME_002', '골프', '단독여행'),
(3,'THEME_003', '크루즈', '자유일정포함'),
(4,'THEME_004', '키즈', '가이드동반'),
(5,'THEME_005', '허니문','단독여행'),
(6,'THEME_006', '실버', '자유일정포함'),
(7,'THEME_007', '트레킹', '가이드동반'),
(8,'THEME_008', '페스티벌','단독여행'),
(9,'THEME_009', '쇼핑', '자유일정포함'),
(10,'THEME_010', '음식', '가이드동반'),
(11,'THEME_011', '힐링','단독여행'),
(12,'THEME_012', '모험', '자유일정포함'),
(13,'THEME_013', '역사', '가이드동반'),
(14,'THEME_014', '예술','단독여행'),
(15,'THEME_015', '공연', '자유일정포함');



INSERT INTO tbl_product_detail (
    product_Info,
    product_meeting_info,
    product_course_info,
    product_notice
) VALUES (
-- 1 서울
             '활기 넘치는 서울의 심장을 느껴보세요! 경복궁의 웅장함부터 북촌 한옥마을의 고즈넉함, 남산타워에서 바라보는 환상적인 야경까지, 서울 도심의 매력을 한 번에 경험할 수 있는 특별한 투어입니다. 전문 가이드의 친절하고 재미있는 해설과 함께 숨겨진 이야기와 놓칠 수 없는 포토 스팟을 Discover 해보세요.<p><span className="emoji">🚶‍♀️</span>도보와 대중교통을 이용하여 서울의 구석구석을 탐험합니다.</p><p><span className="emoji">📸</span>인생샷 보장! 아름다운 서울의 명소에서 잊지 못할 추억을 남겨보세요.</p><p><span className="emoji">🇰🇷</span>한국의 역사와 문화를 깊이 있게 이해하는 시간이 될 것입니다.</p><h3>✨ 서울 도심 투어만의 특별한 경험</h3><p>단순히 눈으로 보는 관광이 아닌, 서울의 역사, 문화, 그리고 현재를 생생하게 느낄 수 있도록 전문 가이드가 흥미로운 이야기를 들려줍니다. 숨겨진 골목길을 걸으며 현지인들의 삶을 엿보고, 맛있는 길거리 음식을 맛보는 즐거움도 놓치지 마세요!</p><h3>📍 주요 방문 장소</h3><ul><li>경복궁: 조선 시대의 웅장한 정궁에서 한국 전통 건축의 아름다움을 느껴보세요.</li><li>북촌 한옥마을: 고즈넉한 한옥들이 옹기종기 모여있는 아름다운 마을에서 전통 문화를 체험해보세요.</li><li>남산타워: 서울의 아름다운 스카이라인을 한눈에 담을 수 있는 서울의 랜드마크입니다.</li><li>명동: 한국 패션과 뷰티의 중심지에서 활기 넘치는 쇼핑을 즐겨보세요. (선택 사항)</li><li>광장시장: 다양한 길거리 음식과 전통 상품을 경험할 수 있는 한국적인 시장입니다. (선택 사항)</li></ul>',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 서울 지하철 3호선 경복궁역 3번 출구 앞</p><p><strong>미팅 시간:</strong> 오전 9시 30분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 생수, 개인 상비약, 카메라</p><p><strong>참고사항:</strong></p><ul><li>미팅 시간에 늦을 경우 투어 참여가 어려울 수 있습니다.</li><li>개인 이어폰을 지참하시면 가이드의 설명을 더욱 잘 들을 수 있습니다.</li><li>우천 시에도 투어는 정상적으로 진행됩니다. (우비 제공)</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:30</strong> - 경복궁역 3번 출구에서 가이드 미팅 및 간단한 오리엔테이션</li><li><strong>10:00 - 12:00</strong> - 경복궁 내부 관람 (전문 가이드 해설 포함)</li><li><strong>12:00 - 13:00</strong> - 북촌 한옥마을로 이동 및 자유 시간 (점심 식사 개별)</li><li><strong>13:00 - 15:00</strong> - 북촌 한옥마을 골목길 투어 및 사진 촬영</li><li><strong>15:00 - 16:00</strong> - 남산으로 이동 및 남산 케이블카 탑승 (선택 사항)</li><li><strong>16:00 - 17:30</strong> - 남산타워 전망대 관람 및 서울 야경 감상</li><li><strong>17:30</strong> - 명동역 또는 서울역에서 투어 종료 (선택 사항에 따라 변동 가능)</li></ol><p><strong>총 소요 시간:</strong> 약 8시간</p><p><strong>이동 방법:</strong> 도보, 지하철, 버스 (남산 케이블카는 선택 사항)</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>천재지변 또는 예기치 못한 상황 발생 시 투어 일정이 변경될 수 있습니다.</li><li>개인 부주의로 인한 사고 발생 시 책임지지 않습니다.</li><li>투어 중 귀중품 분실에 유의해 주시기 바랍니다.</li><li>사진 촬영은 자유롭게 가능하나, 일부 장소에서는 제한될 수 있습니다.</li><li>쓰레기는 반드시 지정된 장소에 버려주세요.</li><li>가이드에게 궁금한 점이 있으면 언제든지 문의해주세요.</li></ul>'
         ),

-- 2 부산
         (
             '활기찬 해양 도시 부산의 매력을 경험해보세요! 해운대의 아름다운 백사장부터 감천문화마을의 다채로운 풍경, 자갈치시장의 활기찬 분위기까지, 부산의 모든 것을 만끽할 수 있는 특별한 투어입니다. 현지 가이드와 함께 숨겨진 맛집과 포토 스팟을 찾아보세요!',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 부산 지하철 2호선 해운대역 5번 출구 앞</p><p><strong>미팅 시간:</strong> 오전 9시 00분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 복장, 선크림, 모자, 개인 상비약</p><p><strong>참고사항:</strong><ul><li>투어는 해변가와 시장을 포함하므로 편안한 신발을 착용해주세요.</li><li>날씨 변화에 대비하여 얇은 겉옷을 준비하는 것이 좋습니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:00</strong> - 해운대역 5번 출구 미팅 및 투어 시작</li><li><strong>09:30 - 11:00</strong> - 해운대 해변 및 동백섬 산책</li><li><strong>11:30 - 13:00</strong> - 감천문화마을 탐방 및 자유시간 (점심 식사 개별)</li><li><strong>13:30 - 15:00</strong> - 자갈치시장 및 국제시장 구경</li><li><strong>15:30 - 17:00</strong> - 용두산 공원 및 부산타워 방문</li><li><strong>17:30</strong> - 남포동역에서 투어 종료</li></ol><p><strong>총 소요 시간:</strong> 약 8시간 30분</p><p><strong>이동 방법:</strong> 도보, 지하철, 버스</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>시장 방문 시 개인 소지품 관리에 유의해주세요.</li><li>현지 상황에 따라 코스 순서가 변경될 수 있습니다.</li></ul>'
         ),

-- 3 제주
         (
             '아름다운 섬 제주에서 자연의 신비로움을 만끽하세요! 한라산의 웅장함부터 성산일출봉의 일출, 에메랄드빛 해변까지 제주의 모든 것을 경험할 수 있습니다. 자연을 사랑하는 당신을 위한 완벽한 투어입니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 제주국제공항 1층 도착장 3번 게이트 앞</p><p><strong>미팅 시간:</strong> 오전 8시 30분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 복장, 등산화(한라산 선택 시), 선크림, 모자, 카메라</p><p><strong>참고사항:</strong><ul><li>제주도는 날씨 변화가 심하므로 여벌 옷을 준비해주세요.</li><li>일부 코스는 경사가 있으니 편안한 신발을 착용하는 것이 좋습니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>08:30</strong> - 제주국제공항 미팅 및 투어 시작</li><li><strong>09:30 - 12:00</strong> - 성산일출봉 등반 및 주변 탐방</li><li><strong>12:30 - 13:30</strong> - 점심 식사 (현지 특산물)</li><li><strong>14:00 - 16:00</strong> - 섭지코지 및 동백 군락지 방문</li><li><strong>16:30 - 18:00</strong> - 함덕 해변 자유시간 및 해안도로 드라이브</li><li><strong>18:30</strong> - 제주국제공항 또는 제주시내 호텔에서 투어 종료</li></ol><p><strong>총 소요 시간:</strong> 약 10시간</p><p><strong>이동 방법:</strong> 전용 차량</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 3인 이상 모객 시 출발 가능합니다.</li><li>한라산 등반 코스는 기상 상황에 따라 변경될 수 있습니다.</li><li>개인 쓰레기는 반드시 되가져가주세요.</li></ul>'
         ),

-- 4 강릉
         (
             '동해의 푸른 바다와 커피 향 가득한 도시, 강릉에서 힐링 여행을 즐겨보세요! 경포대의 아름다운 해변부터 오죽헌의 역사, 강릉 커피 거리의 여유까지 강릉의 매력을 만끽할 수 있는 투어입니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 강릉역 KTX 출구 앞</p><p><strong>미팅 시간:</strong> 오전 9시 30분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 선크림, 모자, 개인 상비약, 카메라</p><p><strong>참고사항:</strong><ul><li>강릉은 해변가와 관광지 간 이동이 있으니 편안한 신발을 착용해주세요.</li><li>날씨 변화에 대비하여 얇은 겉옷을 준비하는 것이 좋습니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:30</strong> - 강릉역 미팅 및 투어 시작</li><li><strong>10:00 - 11:30</strong> - 경포대 해변 및 경포호수 산책</li><li><strong>11:30 - 12:30</strong> - 오죽헌 방문 및 신사임당, 율곡 이이의 흔적 탐방</li><li><strong>12:30 - 13:30</strong> - 점심 식사 (초당 순두부 또는 꼬막 비빔밥)</li><li><strong>14:00 - 15:30</strong> - 강릉 커피 거리 (안목 해변)에서 커피 한 잔의 여유</li><li><strong>16:00 - 17:00</strong> - 주문진 항구 및 영진해변 도깨비 촬영지 방문</li><li><strong>17:30</strong> - 강릉역에서 투어 종료</li></ol><p><strong>총 소요 시간:</strong> 약 8시간</p><p><strong>이동 방법:</strong> 전용 차량 또는 시내버스</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>주말에는 교통 혼잡이 예상되니 여유롭게 일정을 계획해주세요.</li><li>현지 상황에 따라 코스 순서가 변경될 수 있습니다.</li></ul>'
         ),


-- 5 대전
         (
             '역사와 과학이 만나는 도시, 대전 투어! 대전엑스포과학공원에서의 신나는 체험부터 유성온천의 여유, 한밭수목원의 평화로움까지 대전만의 매력을 한껏 느껴보세요.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 대전역 광장 앞</p><p><strong>미팅 시간:</strong> 오전 10시</p><p><strong>준비물:</strong> 편한 복장, 개인 물병, 카메라</p>',
             '<h3>🗺️ 코스 안내</h3><ol><li>대전엑스포과학공원</li><li>국립중앙과학관</li><li>한밭수목원 산책</li><li>유성온천 거리 탐방</li></ol>',
             '<h3>📝 안내사항</h3><ul><li>우천 시 일정이 일부 조정될 수 있습니다.</li><li>온천 이용 시 수건 및 여벌 옷 준비 바랍니다.</li></ul>'
         ),

-- 6 인천
         (
             '역사와 현대가 공존하는 인천! 차이나타운의 이국적인 풍경과 송월동 동화마을의 감성적인 거리, 월미도에서의 신나는 시간까지 모두 담은 완벽한 하루 투어!',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 인천역 1번 출구</p><p><strong>미팅 시간:</strong> 오전 9시 30분</p>',
             '<h3>🗺️ 코스 안내</h3><ol><li>차이나타운</li><li>송월동 동화마을</li><li>자유공원</li><li>월미도 유원지</li></ol>',
             '<h3>📝 안내사항</h3><ul><li>유원지 놀이기구는 개별 결제입니다.</li><li>편한 신발 착용을 권장드립니다.</li></ul>'
         ),

-- 7 춘천
         (
             '자연과 낭만이 흐르는 춘천 여행! 소양강 스카이워크에서의 풍경 감상부터 남이섬의 로맨틱한 산책, 닭갈비 골목까지 춘천의 모든 것을 담았습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 춘천역 광장</p><p><strong>미팅 시간:</strong> 오전 10시</p>',
             '<h3>🗺️ 코스 안내</h3><ol><li>소양강 스카이워크</li><li>남이섬</li><li>중앙시장</li><li>명동 닭갈비 골목</li></ol>',
             '<h3>📝 안내사항</h3><ul><li>남이섬 입장료는 포함되어 있습니다.</li><li>계절별로 방문지 운영 시간이 달라질 수 있습니다.</li></ul>'
         ),

-- 8 수원
         (
             '유네스코 세계문화유산 수원 화성을 중심으로 한 역사 탐방! 전통과 현대가 어우러진 수원에서의 하루는 잊지 못할 경험이 될 것입니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 수원역 6번 출구</p><p><strong>미팅 시간:</strong> 오전 9시</p>',
             '<h3>🗺️ 코스 안내</h3><ol><li>수원 화성</li><li>화성행궁</li><li>팔달문 시장</li><li>수원천 산책</li></ol>',
             '<h3>📝 안내사항</h3><ul><li>도보 이동이 많으므로 편한 신발을 준비해주세요.</li></ul>'
         ),

-- 9 청주
         (
             '중부 내륙의 숨은 보석, 청주 여행! 국립청주박물관의 문화 탐방과 청남대의 고즈넉한 자연 속 산책을 즐기며 여유롭고 깊이 있는 시간을 보내보세요.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 청주터미널 정문 앞</p><p><strong>미팅 시간:</strong> 오전 10시</p>',
             '<h3>🗺️ 코스 안내</h3><ol><li>국립청주박물관</li><li>청남대 (구 대통령 별장)</li><li>상당산성</li><li>성안길 거리 산책</li></ol>',
             '<h3>📝 안내사항</h3><ul><li>청남대 입장 시 신분증 지참 바랍니다.</li><li>박물관은 매주 월요일 휴관입니다.</li></ul>'
         ),

-- 10 대구
         (
             '뜨거운 열정의 도시, 대구에서 즐기는 트렌디한 시티 투어! 근대골목, 김광석 거리, 동성로 쇼핑까지 도심 속 다채로운 매력을 느껴보세요.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 동대구역 2번 출구</p><p><strong>미팅 시간:</strong> 오전 9시 30분</p>',
             '<h3>🗺️ 코스 안내</h3><ol><li>대구 근대골목</li><li>김광석 다시 그리기 길</li><li>83타워 (외부 관람)</li><li>동성로 쇼핑거리</li></ol>',
             '<h3>📝 안내사항</h3><ul><li>날씨가 더울 경우 모자, 선크림 준비를 권장합니다.</li><li>83타워 입장은 선택사항입니다.</li></ul>'
         ),

-- 11 전주
         (
             '한옥의 정취와 전통의 맛이 살아있는 전주! 전주한옥마을 산책과 전통문화 체험, 풍년제과에서의 추억까지 한국의 멋을 가득 담은 여행입니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 전주고속버스터미널 앞</p><p><strong>미팅 시간:</strong> 오전 10시</p>',
             '<h3>🗺️ 코스 안내</h3><ol><li>전주한옥마을</li><li>경기전 & 전동성당</li><li>풍년제과 초코파이 체험</li><li>남부시장 야시장(야간 일정 시)</li></ol>',
             '<h3>📝 안내사항</h3><ul><li>한복 대여는 별도이며, 자유 시간 중 선택 가능합니다.</li><li>야시장 운영 여부는 요일에 따라 다를 수 있습니다.</li></ul>'
         ),

-- 12 경주
         (
             '천년 고도 경주에서의 역사 산책! 불국사와 석굴암, 첨성대와 동궁과 월지까지 유네스코가 인정한 한국의 고대 문화를 만나보세요.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 경주역 앞 광장</p><p><strong>미팅 시간:</strong> 오전 9시</p>',
             '<h3>🗺️ 코스 안내</h3><ol><li>불국사</li><li>석굴암</li><li>첨성대</li><li>동궁과 월지 (야간 조명 포함)</li></ol>',
             '<h3>📝 안내사항</h3><ul><li>입장료 포함 상품입니다.</li><li>야간 일정은 계절 및 날씨에 따라 조정될 수 있습니다.</li></ul>'
         ),

-- 13 광주
         (
             '예술과 민주주의의 도시 광주! 아시아문화전당과 양림동 예술 마을에서의 감성 여행으로 특별한 하루를 경험하세요.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 광주송정역 출구 앞</p><p><strong>미팅 시간:</strong> 오전 10시</p>',
             '<h3>🗺️ 코스 안내</h3><ol><li>5·18 민주광장</li><li>국립아시아문화전당</li><li>양림동 예술 마을</li><li>송정 떡갈비 거리</li></ol>',
             '<h3>📝 안내사항</h3><ul><li>문화 전시 일정은 월별로 변동될 수 있습니다.</li><li>편안한 복장과 걷기 좋은 신발을 착용해주세요.</li></ul>'
         ),

-- 14 울산
         (
             '바다와 자연이 어우러진 울산 여행! 대왕암공원에서의 해안 산책, 장생포 고래문화마을에서의 체험까지 가족 단위 관광객에게 딱 좋은 일정입니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 울산역 버스환승센터 앞</p><p><strong>미팅 시간:</strong> 오전 10시</p>',
             '<h3>🗺️ 코스 안내</h3><ol><li>대왕암공원</li><li>장생포 고래문화마을</li><li>태화강 국가정원</li><li>울산대공원 산책</li></ol>',
             '<h3>📝 안내사항</h3><ul><li>고래박물관은 매주 월요일 휴관입니다.</li><li>우천 시 실내 코스로 대체될 수 있습니다.</li></ul>'
         ),

-- 15 도쿄
         (
             '첨단 기술과 전통 문화가 공존하는 도시, 도쿄를 탐험하세요! 시부야의 번화한 거리부터 아사쿠사의 고즈넉한 사찰, 신주쿠의 화려한 야경까지 도쿄의 다채로운 매력을 느낄 수 있습니다. 일본 문화에 흠뻑 빠져들 준비를 하세요!',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 도쿄 JR 시부야역 하치코 동상 앞</p><p><strong>미팅 시간:</strong> 오전 9시 30분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 교통카드(SUICA/PASMO), 카메라</p><p><strong>참고사항:</strong><ul><li>도쿄의 대중교통은 매우 복잡하므로 가이드의 안내를 잘 따라주세요.</li><li>일부 쇼핑 구역은 인파가 많으니 개인 소지품에 유의해주세요.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:30</strong> - 시부야역 미팅 및 스크램블 교차로 체험</li><li><strong>10:30 - 12:30</strong> - 아사쿠사 센소지 사찰 및 나카미세 상점가 구경</li><li><strong>12:30 - 13:30</strong> - 점심 식사 (오코노미야끼 또는 몬자야끼)</li><li><strong>14:30 - 16:00</strong> - 우에노 공원 및 도쿄 국립박물관 (외부 관람)</li><li><strong>16:30 - 18:00</strong> - 신주쿠 번화가 자유시간 및 쇼핑</li><li><strong>18:30</strong> - 신주쿠 가부키초 입구에서 투어 종료</li></ol><p><strong>총 소요 시간:</strong> 약 9시간</p><p><strong>이동 방법:</strong> 지하철, 도보</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>특정 상점이나 레스토랑은 예약이 필요할 수 있습니다.</li><li>일본의 문화와 예절을 존중해주세요.</li></ul>'
         ),

-- 16 오사카
         (
             '미식의 도시 오사카에서 맛과 멋을 동시에 즐기세요! 도톤보리의 화려한 네온사인, 오사카성의 웅장함, 유니버설 스튜디오 재팬의 짜릿함까지 오사카만의 특별한 경험을 선사합니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 오사카 JR 난바역 25번 출구 앞 (도톤보리 방면)</p><p><strong>미팅 시간:</strong> 오전 10시 00분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 카메라, 엔화 현금 (일부 상점), 우산 (날씨 변화 대비)</p><p><strong>참고사항:</strong><ul><li>오사카는 먹거리가 많으니 가벼운 복장으로 오시는 것을 추천합니다.</li><li>유니버설 스튜디오 재팬 입장권은 투어 비용에 포함되지 않습니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>10:00</strong> - 난바역 미팅 및 도톤보리 탐방</li><li><strong>10:30 - 12:00</strong> - 신사이바시 쇼핑 아케이드 구경</li><li><strong>12:00 - 13:00</strong> - 점심 식사 (타코야끼, 오코노미야끼 등)</li><li><strong>13:30 - 15:30</strong> - 오사카성 및 니시노마루 정원 방문</li><li><strong>16:00 - 17:30</strong> - 우메다 공중정원 전망대에서 야경 감상 (선택 사항)</li><li><strong>18:00</strong> - 난바역 주변에서 투어 종료</li></ol><p><strong>총 소요 시간:</strong> 약 8시간</p><p><strong>이동 방법:</strong> 도보, 지하철</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>자유시간 동안에는 개별적으로 쇼핑이나 식사를 즐길 수 있습니다.</li><li>오사카는 밤문화가 발달되어 있으니 개인 안전에 유의해주세요.</li></ul>'
         ),

-- 17 방콕
         (
             '매혹적인 태국의 수도 방콕에서 이국적인 매력을 느껴보세요! 왓 아룬의 황홀한 야경부터 카오산 로드의 활기찬 밤거리, 짜뚜짝 주말 시장의 다양한 볼거리까지, 오감을 만족시키는 투어입니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> BTS 아속(Asok)역 5번 출구 앞</p><p><strong>미팅 시간:</strong> 오전 9시 00분 (정시 출발)</p><p><strong>준비물:</strong> 가벼운 복장, 편안한 신발, 모자, 선글라스, 물, 여벌 옷 (사원 방문 시 단정한 복장 필요)</p><p><strong>참고사항:</strong><ul><li>태국은 습하고 더우니 수분 보충을 충분히 해주세요.</li><li>사원 방문 시 반바지나 민소매는 피하고 어깨와 무릎을 가리는 복장을 준비해야 합니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:00</strong> - BTS 아속역 미팅 및 투어 시작</li><li><strong>10:00 - 12:00</strong> - 왓 아룬(새벽 사원) 및 왓 포(와불상) 방문</li><li><strong>12:30 - 13:30</strong> - 점심 식사 (태국 현지 음식)</li><li><strong>14:00 - 15:30</strong> - 왕궁 및 에메랄드 사원 (외부 관람)</li><li><strong>16:00 - 17:30</strong> - 짜오프라야 강 보트 투어 및 왓 사켓 (골든 마운트)</li><li><strong>18:00</strong> - 카오산 로드에서 투어 종료 및 자유시간</li></ol><p><strong>총 소요 시간:</strong> 약 9시간</p><p><strong>이동 방법:</strong> 대중교통, 보트, 도보</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>현지 교통 상황에 따라 일정이 지연될 수 있습니다.</li><li>흥정 문화를 경험해보세요!</li></ul>'
         ),

-- 18 파리
         (
             '사랑과 낭만의 도시, 파리에서 꿈같은 시간을 보내세요! 에펠탑의 아름다움부터 루브르 박물관의 예술, 샹젤리제 거리의 활기찬 분위기까지 파리만의 우아함과 역사를 만끽할 수 있는 투어입니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 에펠탑 근처 트로카데로 광장 (Trocadéro Square)</p><p><strong>미팅 시간:</strong> 오전 9시 00분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 카메라, 소매치기 방지 가방</p><p><strong>참고사항:</strong><ul><li>파리는 도보 이동이 많으므로 편안한 신발을 착용해주세요.</li><li>개인 소지품 관리에 각별히 유의해야 합니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:00</strong> - 트로카데로 광장 미팅 및 에펠탑 배경 사진 촬영</li><li><strong>10:00 - 12:00</strong> - 루브르 박물관 하이라이트 투어 (모나리자, 비너스 등)</li><li><strong>12:00 - 13:00</strong> - 점심 식사 (프랑스식 샌드위치 또는 간단한 브런치)</li><li><strong>13:30 - 15:00</strong> - 샹젤리제 거리 및 개선문 방문</li><li><strong>15:30 - 17:00</strong> - 센 강 유람선 탑승 (선택 사항)</li><li><strong>17:30</strong> - 노트르담 대성당 (외부 관람) 주변에서 투어 종료</li></ol><p><strong>총 소요 시간:</strong> 약 8시간 30분</p><p><strong>이동 방법:</strong> 지하철, 도보, 유람선 (선택 사항)</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>박물관 입장 시 사전 예약이 필요할 수 있습니다.</li><li>파리의 밤은 아름다우니 저녁 시간을 활용하여 에펠탑 야경을 감상하는 것을 추천합니다.</li></ul>'
         ),

-- 19 로마
         (
             '영원한 도시 로마에서 고대 문명의 숨결을 느껴보세요! 콜로세움의 웅장함, 포로 로마노의 역사, 바티칸 시국의 성스러움까지, 로마의 모든 곳에서 역사가 살아 숨 쉬는 것을 느낄 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 콜로세움 지하철역 (Colosseo) 출구 앞</p><p><strong>미팅 시간:</strong> 오전 9시 00분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 선글라스, 모자, 물, 카메라</p><p><strong>참고사항:</strong><ul><li>로마는 여름에 매우 더우니 모자나 선글라스, 충분한 물을 준비해주세요.</li><li>바티칸 방문 시 어깨와 무릎을 가리는 단정한 복장을 착용해야 합니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:00</strong> - 콜로세움역 미팅 및 콜로세움 외부 관람</li><li><strong>10:00 - 12:00</strong> - 포로 로마노 및 팔라티노 언덕 탐방</li><li><strong>12:00 - 13:00</strong> - 점심 식사 (이탈리아 현지 파스타 또는 피자)</li><li><strong>14:00 - 16:00</strong> - 바티칸 시국 (성 베드로 대성당, 바티칸 박물관 선택)</li><li><strong>16:30 - 17:30</strong> - 트레비 분수 및 판테온 방문</li><li><strong>18:00</strong> - 스페인 광장 주변에서 투어 종료</li></ol><p><strong>총 소요 시간:</strong> 약 9시간</p><p><strong>이동 방법:</strong> 도보, 지하철, 버스</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>관광지 입장은 별도 비용이 발생할 수 있습니다.</li><li>트레비 분수에 동전을 던져 로마에 다시 올 수 있기를 기원해보세요!</li></ul>'
         ),

-- 20 뉴욕
         (
             '잠들지 않는 도시 뉴욕에서 짜릿한 경험을 만끽하세요! 타임스퀘어의 화려한 불빛부터 센트럴 파크의 평화로움, 자유의 여신상의 웅장함까지 뉴욕의 모든 것을 담은 투어입니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 타임스퀘어 M&M World 앞</p><p><strong>미팅 시간:</strong> 오전 9시 00분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 카메라, 우산 (날씨 변화 대비), 충전기</p><p><strong>참고사항:</strong><ul><li>뉴욕은 도보 이동이 많으므로 편안한 신발을 착용하는 것이 중요합니다.</li><li>메트로 카드를 미리 구매해두면 편리합니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:00</strong> - 타임스퀘어 미팅 및 주변 탐방</li><li><strong>10:00 - 12:00</strong> - 센트럴 파크 산책 및 존 레논 추모 공간 (Strawberry Fields)</li><li><strong>12:00 - 13:00</strong> - 점심 식사 (뉴욕 피자 또는 핫도그)</li><li><strong>13:30 - 15:00</strong> - 자유의 여신상 페리 탑승 및 자유의 여신상/엘리스 아일랜드 조망</li><li><strong>15:30 - 17:00</strong> - 월스트리트 황소 동상 및 9/11 메모리얼</li><li><strong>17:30</strong> - 브루클린 브릿지에서 투어 종료</li></ol><p><strong>총 소요 시간:</strong> 약 9시간</p><p><strong>이동 방법:</strong> 도보, 지하철, 페리</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>자유의 여신상 페리는 혼잡할 수 있으니 시간을 여유롭게 계획해주세요.</li><li>밤에는 브로드웨이 뮤지컬 관람을 추천합니다.</li></ul>'
         ),

-- 21 말레
         (
             '지상 낙원 몰디브의 수도 말레에서 이색적인 도시 탐험을 시작하세요! 작은 섬 도시의 매력을 느끼고 현지인들의 삶을 엿볼 수 있는 특별한 경험을 선사합니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 벨라나 국제공항 (MLE) 도착 후 선착장 미팅 포인트</p><p><strong>미팅 시간:</strong> 항공편 도착 시간에 맞춰 조율</p><p><strong>준비물:</strong> 가벼운 복장, 편안한 샌들, 모자, 선글라스, 선크림, 여권 사본</p><p><strong>참고사항:</strong><ul><li>몰디브는 이슬람 국가이므로 공공장소에서 단정한 복장을 착용해야 합니다.</li><li>강한 햇볕에 대비하여 선크림을 자주 발라주세요.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>도착 후</strong> - 벨라나 국제공항 미팅 및 페리 탑승하여 말레 시내 이동</li><li><strong>오전</strong> - 말레 시내 투어 (대통령궁, 술탄 공원, 금요 사원 등 주요 명소)</li><li><strong>점심</strong> - 현지 레스토랑에서 신선한 해산물 요리 즐기기</li><li><strong>오후</strong> - 현지 시장 방문 및 기념품 쇼핑</li><li><strong>저녁</strong> - 말레 시내 야경 감상 및 자유시간</li><li><strong>종료</strong> - 벨라나 국제공항 또는 리조트 이동</li></ol><p><strong>총 소요 시간:</strong> 약 6시간 (공항 이동 시간 제외)</p><p><strong>이동 방법:</strong> 도보, 택시, 페리</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 1인 이상 출발 가능합니다.</li><li>사원 방문 시에는 신발을 벗어야 하며, 어깨와 무릎을 가리는 복장을 착용해야 합니다.</li><li>음주 및 돼지고기 섭취는 제한될 수 있습니다.</li></ul>'
         ),

-- 22 시드니
         (
             '활기찬 호주의 도시 시드니에서 잊지 못할 추억을 만드세요! 오페라 하우스의 웅장함부터 하버 브릿지의 스릴, 본다이 비치의 여유로움까지 시드니의 상징들을 경험할 수 있는 투어입니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 시드니 오페라 하우스 입구 앞</p><p><strong>미팅 시간:</strong> 오전 9시 30분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 모자, 선글라스, 선크림, 카메라</p><p><strong>참고사항:</strong><ul><li>호주는 햇볕이 강하니 선크림을 충분히 바르고 모자를 착용해주세요.</li><li>본다이 비치 방문 시 수영복을 준비하면 좋습니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:30</strong> - 오페라 하우스 미팅 및 주변 탐방</li><li><strong>10:30 - 12:00</strong> - 서큘러 키 (Circular Quay) 및 록스(The Rocks) 지역 산책</li><li><strong>12:00 - 13:00</strong> - 점심 식사 (해산물 또는 스테이크)</li><li><strong>13:30 - 15:00</strong> - 달링 하버 (Darling Harbour) 및 시드니 아쿠아리움 (선택 사항)</li><li><strong>15:30 - 17:00</strong> - 본다이 비치 (Bondi Beach) 방문 및 자유시간</li><li><strong>17:30</strong> - 시드니 타워 눈(Sydney Tower Eye) 주변에서 투어 종료</li></ol><p><strong>총 소요 시간:</strong> 약 9시간</p><p><strong>이동 방법:</strong> 도보, 페리, 버스</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>하버 브릿지 클라이밍은 별도 예약 및 비용이 필요합니다.</li><li>자연을 존중하고 환경 보호에 동참해주세요.</li></ul>'
         ),

-- 23 두바이
         (
             '사막 위에 세워진 현대적인 도시, 두바이에서 초호화 경험을 만끽하세요! 버즈 칼리파의 압도적인 높이, 팜 주메이라의 인공 섬, 사막 사파리의 짜릿함까지 두바이만의 특별한 매력을 느낄 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 두바이 몰 (The Dubai Mall) 입구 (분수쇼 근처)</p><p><strong>미팅 시간:</strong> 오전 9시 00분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 복장, 선글라스, 모자, 카메라, 사막 사파리 시 샌들 대신 운동화</p><p><strong>참고사항:</strong><ul><li>두바이는 매우 더우니 가벼운 복장과 충분한 물을 준비해주세요.</li><li>종교적인 장소 방문 시에는 단정한 복장을 착용해야 합니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:00</strong> - 두바이 몰 미팅 및 버즈 칼리파 (At the Top) 방문 (사전 예약 권장)</li><li><strong>11:00 - 12:30</strong> - 두바이 분수쇼 감상 및 두바이 아쿠아리움 & 수중 동물원</li><li><strong>12:30 - 13:30</strong> - 점심 식사 (쇼핑몰 내 레스토랑)</li><li><strong>14:00 - 16:00</strong> - 팜 주메이라 모노레일 탑승 및 아틀란티스 더 팜 리조트 조망</li><li><strong>16:30 - 18:00</strong> - 골드 수크 & 스파이스 수크 탐방 및 아브라 탑승</li><li><strong>18:30</strong> - 저녁 식사 및 사막 사파리 투어 (선택 사항)</li></ol><p><strong>총 소요 시간:</strong> 약 10시간 (사막 사파리 포함 시)</p><p><strong>이동 방법:</strong> 택시, 지하철, 모노레일, 아브라, 사막 사파리 차량</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>라마단 기간에는 식사 및 음주에 제한이 있을 수 있습니다.</li><li>현지 문화와 관습을 존중해주세요.</li></ul>'
         ),

-- 24 케이프타운
         (
             '남아프리카의 보석, 케이프타운에서 자연의 아름다움과 역사를 동시에 느껴보세요! 테이블 마운틴의 웅장함부터 희망봉의 절경, 시그널 힐의 파노라마 뷰까지 케이프타운의 모든 것을 만끽할 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 빅토리아 & 알프레드 워터프론트 (V&A Waterfront) 메인 입구</p><p><strong>미팅 시간:</strong> 오전 9시 00분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 따뜻한 옷 (산 정상은 추울 수 있음), 선크림, 카메라</p><p><strong>참고사항:</strong><ul><li>테이블 마운틴 케이블카는 날씨에 따라 운행이 중단될 수 있습니다.</li><li>희망봉은 바람이 강할 수 있으니 옷을 따뜻하게 입는 것이 좋습니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:00</strong> - 워터프론트 미팅 및 투어 시작</li><li><strong>09:30 - 12:00</strong> - 테이블 마운틴 케이블카 탑승 및 정상 탐방 (날씨 상황에 따라)</li><li><strong>12:00 - 13:00</strong> - 점심 식사 (현지 해산물 요리)</li><li><strong>13:30 - 15:00</strong> - 보캅(Bo-Kaap) 마을 및 시그널 힐 드라이브</li><li><strong>15:30 - 17:00</strong> - 희망봉 (Cape Point) 방문 및 케이프 포인트 등대</li><li><strong>17:30</strong> - 볼더스 비치 (Boulders Beach) 펭귄 서식지 방문</li><li><strong>18:30</strong> - 워터프론트에서 투어 종료</li></ol><p><strong>총 소요 시간:</strong> 약 9시간 30분</p><p><strong>이동 방법:</strong> 전용 차량</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>현지 상황에 따라 일정이 변경될 수 있습니다.</li><li>야생 동물을 보호하고 멀리서 관찰해주세요.</li></ul>'
         ),

-- 25 토론토
         (
             '다문화 도시 토론토에서 캐나다의 활기찬 에너지를 느껴보세요! CN 타워의 압도적인 높이, 카사 로마의 고풍스러운 아름다움, 켄싱턴 마켓의 독특한 분위기까지 토론토의 모든 것을 만끽할 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 유니온 스테이션 (Union Station) 메인 출구 앞</p><p><strong>미팅 시간:</strong> 오전 9시 30분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 카메라, 날씨 변화에 대비한 옷</p><p><strong>참고사항:</strong><ul><li>토론토는 사계절이 뚜렷하니 방문 시기에 맞는 옷을 준비해주세요.</li><li>나이아가라 폭포 투어는 별도 일정을 추천합니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:30</strong> - 유니온 스테이션 미팅 및 투어 시작</li><li><strong>10:00 - 12:00</strong> - CN 타워 (에지워크 선택 가능) 및 리플리 아쿠아리움 (외부 관람)</li><li><strong>12:00 - 13:00</strong> - 점심 식사 (현지 음식)</li><li><strong>13:30 - 15:00</strong> - 카사 로마 (Casa Loma) 내부 관람</li><li><strong>15:30 - 17:00</strong> - 켄싱턴 마켓 (Kensington Market) 및 차이나타운 탐방</li><li><strong>17:30</strong> - 이튼 센터 (Eaton Centre) 주변에서 투어 종료</li></ol><p><strong>총 소요 시간:</strong> 약 8시간</p><p><strong>이동 방법:</strong> 도보, 스트리트카, 지하철</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>박물관 및 타워 입장권은 별도 구매입니다.</li><li>캐나다의 친절한 문화를 경험해보세요.</li></ul>'
         ),

-- 26 베이징
         (
             '중국의 수도 베이징에서 고대와 현대의 조화를 경험하세요! 만리장성의 웅장함부터 자금성의 위엄, 톈안먼 광장의 역사적인 순간까지 베이징의 모든 것을 느낄 수 있습니다. 중국의 깊은 역사와 문화를 탐험할 준비를 하세요!',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 베이징 지하철 톈안먼 서역 (Tiananmen West) 출구 앞</p><p><strong>미팅 시간:</strong> 오전 8시 30분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 여권, 물, 모자, 선글라스 (햇볕 대비)</p><p><strong>참고사항:</strong><ul><li>베이징은 매우 넓으므로 이동 거리가 길 수 있습니다.</li><li>만리장성은 기온 변화가 있을 수 있으니 가벼운 겉옷을 준비해주세요.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>08:30</strong> - 톈안먼 서역 미팅 및 톈안먼 광장, 인민대회당 조망</li><li><strong>09:30 - 12:30</strong> - 자금성 (고궁 박물관) 내부 관람</li><li><strong>12:30 - 13:30</strong> - 점심 식사 (베이징 오리 요리 또는 현지 음식)</li><li><strong>14:30 - 17:00</strong> - 만리장성 (바다링 또는 무톈위 구간 선택) 투어</li><li><strong>17:30 - 18:30</strong> - 이화원 (Summer Palace) 조망 및 주변 산책</li><li><strong>19:00</strong> - 왕푸징 거리에서 투어 종료 및 자유시간</li></ol><p><strong>총 소요 시간:</strong> 약 10시간</p><p><strong>이동 방법:</strong> 전용 차량, 도보</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 3인 이상 모객 시 출발 가능합니다.</li><li>만리장성은 구간에 따라 난이도가 다를 수 있습니다.</li><li>현지 가이드의 안내에 따라 이동해주세요.</li></ul>'
         ),

-- 27 상하이
         (
             '동양의 파리, 상하이에서 과거와 미래가 공존하는 도시의 매력을 느껴보세요! 와이탄의 아름다운 야경부터 예원의 고즈넉함, 동방명주 타워의 현대적인 모습까지 상하이의 모든 것을 만끽할 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 지하철 2호선 난징동루역 (Nanjing East Road) 3번 출구 앞</p><p><strong>미팅 시간:</strong> 오전 9시 30분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 카메라, 우산 (날씨 변화 대비)</p><p><strong>참고사항:</strong><ul><li>상하이는 대중교통이 잘 되어 있으니 지하철 이용이 편리합니다.</li><li>야경을 감상할 때는 강바람이 다소 쌀쌀할 수 있습니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:30</strong> - 난징동루역 미팅 및 난징동루 보행자 거리 탐방</li><li><strong>10:30 - 12:00</strong> - 와이탄 (The Bund)에서 푸동 스카이라인 감상</li><li><strong>12:00 - 13:00</strong> - 점심 식사 (상하이 현지 음식)</li><li><strong>13:30 - 15:00</strong> - 예원 (Yu Garden) 및 위위안 상점가 구경</li><li><strong>15:30 - 17:00</strong> - 동방명주 타워 또는 상하이 타워 (전망대 선택)</li><li><strong>17:30</strong> - 신천지 (Xintiandi)에서 투어 종료 및 자유시간</li></ol><p><strong>총 소요 시간:</strong> 약 8시간 30분</p><p><strong>이동 방법:</strong> 도보, 지하철</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>전망대 입장권은 별도 구매입니다.</li><li>현지에서 흥정을 시도할 수 있는 상점도 있습니다.</li></ul>'
         ),

-- 28 광저우
         (
             '중국 남부의 활기찬 도시 광저우에서 미식과 무역의 중심지를 경험하세요! 광저우 타워의 야경부터 진씨 서원의 전통, 상하구 상업 보행자 거리의 활기찬 분위기까지 광저우만의 매력을 느낄 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 광저우 타워 (Canton Tower) 지하철역 출구 앞</p><p><strong>미팅 시간:</strong> 오전 9시 00분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 카메라, 가벼운 복장 (습하고 더운 날씨 대비)</p><p><strong>참고사항:</strong><ul><li>광저우는 아열대 기후로 습하고 더운 편이니 시원한 복장으로 오시는 것을 추천합니다.</li><li>광저우 타워 전망대는 인기가 많으니 일찍 방문하는 것이 좋습니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:00</strong> - 광저우 타워역 미팅 및 광저우 타워 외부 조망</li><li><strong>10:00 - 12:00</strong> - 진씨 서원 (Chen Clan Ancestral Hall) 방문</li><li><strong>12:00 - 13:00</strong> - 점심 식사 (광동 요리, 딤섬)</li><li><strong>13:30 - 15:00</strong> - 상하구 상업 보행자 거리 (Shangxiajiu Pedestrian Street) 구경</li><li><strong>15:30 - 17:00</strong> - 위에슈 공원 (Yuexiu Park) 및 오양루 (Five Rams Sculpture)</li><li><strong>17:30</strong> - 주강 (Pearl River) 야경 크루즈 (선택 사항)</li></ol><p><strong>총 소요 시간:</strong> 약 9시간</p><p><strong>이동 방법:</strong> 지하철, 도보, 크루즈 (선택 사항)</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>미식의 도시인만큼 다양한 현지 음식을 맛보는 것을 추천합니다.</li><li>대중교통 이용 시 피크 타임을 피하는 것이 좋습니다.</li></ul>'
         ),

-- 29 마드리드
         (
             '열정의 도시 마드리드에서 스페인의 활기찬 분위기를 느껴보세요! 프라도 미술관의 예술 작품부터 마요르 광장의 활기, 레티로 공원의 여유로움까지 마드리드만의 매력을 만끽할 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 솔 광장 (Puerta del Sol) 곰 동상 앞</p><p><strong>미팅 시간:</strong> 오전 9시 30분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 카메라, 작은 가방 (소매치기 방지)</p><p><strong>참고사항:</strong><ul><li>마드리드는 햇볕이 강하니 모자나 선글라스를 준비해주세요.</li><li>점심 식사는 스페인 전통 타파스를 추천합니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:30</strong> - 솔 광장 미팅 및 주변 탐방</li><li><strong>10:30 - 12:30</strong> - 프라도 미술관 (Museo del Prado) 하이라이트 투어</li><li><strong>12:30 - 13:30</strong> - 점심 식사 (타파스 바)</li><li><strong>14:00 - 15:30</strong> - 레티로 공원 (Parque del Retiro) 산책 및 크리스탈 궁전</li><li><strong>16:00 - 17:30</strong> - 마요르 광장 (Plaza Mayor) 및 산 미구엘 시장 (Mercado de San Miguel)</li><li><strong>18:00</strong> - 그란 비아 (Gran Vía) 주변에서 투어 종료</li></ol><p><strong>총 소요 시간:</strong> 약 8시간 30분</p><p><strong>이동 방법:</strong> 도보, 지하철</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>미술관 입장 시 사전 예약이 필요할 수 있습니다.</li><li>저녁에는 플라멩코 쇼를 관람하는 것을 추천합니다.</li></ul>'
         ),

         -- 30 바르셀로나
         (
             '가우디의 도시 바르셀로나에서 예술과 건축의 향연을 즐기세요! 사그라다 파밀리아의 웅장함부터 구엘 공원의 독특함, 고딕 지구의 역사까지 바르셀로나만의 독창적인 매력을 만끽할 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 사그라다 파밀리아 (Sagrada Família) 앞 (나심 입구 기준)</p><p><strong>미팅 시간:</strong> 오전 9시 00분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 카메라, 가방 (소매치기 방지)</p><p><strong>참고사항:</strong><ul><li>사그라다 파밀리아 및 구엘 공원은 입장권 사전 예약이 필수입니다.</li><li>람블라스 거리는 항상 북적이니 소지품 관리에 유의해주세요.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:00</strong> - 사그라다 파밀리아 미팅 및 외부/내부 관람 (사전 예약)</li><li><strong>11:00 - 12:30</strong> - 구엘 공원 (Park Güell) 탐방 (사전 예약)</li><li><strong>12:30 - 13:30</strong> - 점심 식사 (스페인 파에야 또는 타파스)</li><li><strong>14:00 - 15:30</strong> - 람블라스 거리 (La Rambla) 및 보케리아 시장 (Mercat de la Boqueria)</li><li><strong>16:00 - 17:30</strong> - 고딕 지구 (Gothic Quarter) 및 바르셀로나 대성당</li><li><strong>18:00</strong> - 바르셀로네타 해변에서 투어 종료 및 자유시간</li></ol><p><strong>총 소요 시간:</strong> 약 9시간</p><p><strong>이동 방법:</strong> 도보, 지하철, 버스</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>가우디 건축물은 입장권이 비싸니 효율적인 동선을 계획하세요.</li><li>저녁에는 현지 분위기를 느낄 수 있는 바르셀로나 야경을 추천합니다.</li></ul>'
         ),

         -- 31 하노이
         (
             '천 년의 역사를 지닌 베트남의 수도 하노이에서 동양의 신비로움을 발견하세요! 호안끼엠 호수의 평화로움부터 구시가지의 활기찬 거리, 호찌민 묘소의 역사적인 순간까지 하노이의 다채로운 매력을 느낄 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 호안끼엠 호수 (Hoan Kiem Lake) 거북탑 앞</p><p><strong>미팅 시간:</strong> 오전 9시 00분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 모자, 선글라스, 물, 카메라</p><p><strong>참고사항:</strong><ul><li>하노이 구시가지는 오토바이가 많으니 이동 시 주의해주세요.</li><li>호찌민 묘소 방문 시 단정한 복장을 착용해야 합니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:00</strong> - 호안끼엠 호수 미팅 및 거북탑 조망</li><li><strong>09:30 - 11:00</strong> - 구시가지 (Old Quarter) 36거리 탐방 및 현지 시장 구경</li><li><strong>11:30 - 12:30</strong> - 점심 식사 (베트남 쌀국수, 분짜 등)</li><li><strong>13:00 - 14:30</strong> - 호찌민 묘소 및 주석궁 (외부 관람)</li><li><strong>15:00 - 16:00</strong> - 한기둥 사원 (One Pillar Pagoda) 및 문묘 국자감 (Temple of Literature)</li><li><strong>16:30</strong> - 수상 인형극 관람 (선택 사항)</li><li><strong>18:00</strong> - 동쑤언 시장 (Dong Xuan Market) 주변에서 투어 종료</li></ol><p><strong>총 소요 시간:</strong> 약 9시간</p><p><strong>이동 방법:</strong> 도보, 시클로, 택시</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>현지에서 흥정 문화를 경험할 수 있습니다.</li><li>수상 인형극은 미리 예약하는 것이 좋습니다.</li></ul>'
         ),

-- 32 호치민
         (
             '베트남의 활기찬 경제 중심지 호치민에서 역동적인 도시의 매력을 느껴보세요! 통일궁의 역사적인 의미부터 노트르담 대성당의 아름다움, 벤탄 시장의 활기찬 분위기까지 호치민의 모든 것을 만끽할 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 통일궁 (Independence Palace) 정문 앞</p><p><strong>미팅 시간:</strong> 오전 9시 00분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 카메라, 모자, 선글라스, 물</p><p><strong>참고사항:</strong><ul><li>호치민은 오토바이 교통량이 많으니 이동 시 주의해주세요.</li><li>벤탄 시장은 소매치기에 주의해야 합니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:00</strong> - 통일궁 미팅 및 내부 관람</li><li><strong>10:30 - 11:30</strong> - 노트르담 대성당 및 중앙 우체국 방문</li><li><strong>11:30 - 12:30</strong> - 점심 식사 (베트남 반미, 월남쌈 등)</li><li><strong>13:00 - 14:30</strong> - 전쟁 박물관 (War Remnants Museum) 방문</li><li><strong>15:00 - 16:30</strong> - 벤탄 시장 (Ben Thanh Market) 구경 및 쇼핑</li><li><strong>17:00</strong> - 사이공 강변에서 투어 종료 및 자유시간</li></ol><p><strong>총 소요 시간:</strong> 약 8시간</p><p><strong>이동 방법:</strong> 도보, 택시, 그랩 바이크</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>시장에서는 흥정을 통해 더 좋은 가격으로 물건을 구매할 수 있습니다.</li><li>베트남 커피를 꼭 맛보세요!</li></ul>'
         ),

-- 33 베를린
         (
             '역사와 예술이 살아 숨 쉬는 베를린에서 현대와 과거를 넘나드는 여행을 경험하세요! 브란덴부르크 문, 베를린 장벽의 흔적, 박물관 섬의 예술 작품까지 베를린의 모든 것을 만끽할 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 브란덴부르크 문 (Brandenburg Gate) 앞</p><p><strong>미팅 시간:</strong> 오전 9시 30분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 카메라, 우산 (날씨 변화 대비)</p><p><strong>참고사항:</strong><ul><li>베를린은 도시 규모가 크니 대중교통 이용이 필수입니다.</li><li>베를린 장벽 유적지는 경건한 마음으로 방문해주세요.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:30</strong> - 브란덴부르크 문 미팅 및 주변 탐방</li><li><strong>10:30 - 12:00</strong> - 국회의사당 (Reichstag Building) 외부 조망 및 유대인 학살 추모비</li><li><strong>12:00 - 13:00</strong> - 점심 식사 (커리부어스트 또는 되너 케밥)</li><li><strong>13:30 - 15:00</strong> - 베를린 장벽 이스트 사이드 갤러리 (East Side Gallery)</li><li><strong>15:30 - 17:00</strong> - 박물관 섬 (Museum Island) 및 베를린 대성당 (Berliner Dom)</li><li><strong>17:30</strong> - 체크포인트 찰리 (Checkpoint Charlie) 주변에서 투어 종료</li></ol><p><strong>총 소요 시간:</strong> 약 8시간</p><p><strong>이동 방법:</strong> 도보, 대중교통 (지하철, 트램)</li></p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>박물관 관람 시에는 충분한 시간을 할애하는 것이 좋습니다.</li><li>독일 맥주를 꼭 맛보세요!</li></ul>'
         ),

-- 34 함부르크
         (
             '독일의 항구 도시 함부르크에서 북독일의 매력을 느껴보세요! 엘프필하모니 콘서트홀의 웅장함부터 슈파이허슈타트의 유네스코 유산, 레퍼반의 활기찬 밤거리까지 함부르크만의 독특한 분위기를 만끽할 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 함부르크 중앙역 (Hamburg Hauptbahnhof) 메인 홀</p><p><strong>미팅 시간:</strong> 오전 9시 00분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 카메라, 비 오는 날씨 대비 우산 또는 방수 재킷</p><p><strong>참고사항:</strong><ul><li>함부르크는 비가 자주 오는 편이니 우산을 준비해주세요.</li><li>미니어처 원더랜드는 사전 예약이 필수입니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:00</strong> - 함부르크 중앙역 미팅 및 투어 시작</li><li><strong>09:30 - 11:00</strong> - 슈파이허슈타트 (Speicherstadt) 및 하펜시티 (HafenCity) 탐방</li><li><strong>11:30 - 12:30</strong> - 미니어처 원더랜드 (Miniatur Wunderland) 관람 (선택 사항)</li><li><strong>12:30 - 13:30</strong> - 점심 식사 (피쉬 브뢰첸 또는 현지 음식)</li><li><strong>14:00 - 15:30</strong> - 엘프필하모니 콘서트홀 (Elbphilharmonie) 외부 조망 및 플라자 방문</li><li><strong>16:00 - 17:30</strong> - 시청 (Rathaus) 및 시내 중심가 구경</li><li><strong>18:00</strong> - 레퍼반 (Reeperbahn) 주변에서 투어 종료 및 자유시간</li></ol><p><strong>총 소요 시간:</strong> 약 9시간</p><p><strong>이동 방법:</strong> 도보, 대중교통 (지하철, 버스)</li></p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>레퍼반은 저녁 시간 이후 방문을 추천합니다.</li><li>항구 도시의 신선한 해산물 요리를 맛보세요.</li></ul>'
         ),

-- 35 뮌헨
         (
             '바이에른의 주도 뮌헨에서 독일의 전통과 현대의 조화를 경험하세요! 마리엔 광장의 활기찬 분위기부터 님펜부르크 궁전의 아름다움, 옥토버페스트의 열기까지 뮌헨만의 특별한 매력을 느낄 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 마리엔 광장 (Marienplatz) 신 시청사 시계탑 앞</p><p><strong>미팅 시간:</strong> 오전 9시 30분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 카메라, 날씨 변화에 대비한 옷</p><p><strong>참고사항:</strong><ul><li>옥토버페스트 기간에는 숙소 예약이 매우 어려우니 미리 계획해주세요.</li><li>뮌헨은 맥주 문화가 발달되어 있으니 관심 있다면 현지 브루어리를 방문해보세요.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:30</strong> - 마리엔 광장 미팅 및 신 시청사 글록켄슈필 감상</li><li><strong>10:30 - 12:00</strong> - 프라우엔키르헤 (Frauenkirche) 및 빅투알리엔 시장 (Viktualienmarkt)</li><li><strong>12:00 - 13:00</strong> - 점심 식사 (슈바인학센 또는 바이스부어스트)</li><li><strong>13:30 - 15:00</strong> - 님펜부르크 궁전 (Nymphenburg Palace) 및 정원</li><li><strong>15:30 - 17:00</strong> - 영국식 정원 (Englischer Garten) 산책 및 서핑 구경</li><li><strong>17:30</strong> - 호프브로이하우스 (Hofbräuhaus) 주변에서 투어 종료 및 자유시간</li></ol><p><strong>총 소요 시간:</strong> 약 8시간</p><p><strong>이동 방법:</strong> 도보, 지하철, 트램</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>님펜부르크 궁전 내부 관람은 별도 비용이 발생합니다.</li><li>뮌헨의 맥주 축제 기간에는 더욱 활기찬 분위기를 느낄 수 있습니다.</li></ul>'
         ),

-- 36 카이로
         (
             '고대 문명의 보고, 카이로에서 이집트의 신비로운 역사를 탐험하세요! 기자의 피라미드와 스핑크스의 웅장함, 이집트 박물관의 보물, 칸 엘 칼릴리 시장의 활기찬 분위기까지 카이로의 모든 것을 만끽할 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 이집트 박물관 (Egyptian Museum) 정문 앞</p><p><strong>미팅 시간:</strong> 오전 8시 00분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 모자, 선글라스, 물, 카메라, 자외선 차단제, 현금</p><p><strong>참고사항:</strong><ul><li>이집트는 매우 더우니 가벼운 복장과 충분한 물을 준비해주세요.</li><li>현지에서 팁 문화가 발달되어 있으니 소액의 현금을 준비하는 것이 좋습니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>08:00</strong> - 이집트 박물관 미팅 및 내부 관람 (투탕카멘 보물)</li><li><strong>10:30 - 13:00</strong> - 기자 피라미드 및 스핑크스 방문 (낙타 체험 선택 가능)</li><li><strong>13:00 - 14:00</strong> - 점심 식사 (현지 이집트 음식)</li><li><strong>14:30 - 16:00</strong> - 살라딘 요새 (Citadel of Salah al-Din) 및 무함마드 알리 모스크</li><li><strong>16:30 - 18:00</strong> - 칸 엘 칼릴리 시장 (Khan el-Khalili Bazaar) 탐방 및 쇼핑</li><li><strong>18:30</strong> - 나일 강 유람선 탑승 (선택 사항)</li></ol><p><strong>총 소요 시간:</strong> 약 10시간</p><p><strong>이동 방법:</strong> 전용 차량, 도보</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 3인 이상 모객 시 출발 가능합니다.</li><li>관광지 입장 시 카메라 사용료가 부과될 수 있습니다.</li><li>현지인들과의 교류 시 존중하는 태도를 보여주세요.</li></ul>'
         ),

-- 37 오클랜드
         (
             '항해의 도시 오클랜드에서 뉴질랜드의 아름다운 자연과 도시의 활기를 느껴보세요! 스카이 타워의 멋진 전망부터 와이헤케 섬의 포도밭, 데본포트의 평화로운 분위기까지 오클랜드의 모든 것을 만끽할 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 스카이 타워 (Sky Tower) 입구 앞</p><p><strong>미팅 시간:</strong> 오전 9시 30분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 카메라, 가벼운 외투 (날씨 변화 대비)</p><p><strong>참고사항:</strong><ul><li>오클랜드는 바람이 많이 불 수 있으니 따뜻한 옷을 준비해주세요.</li><li>와이헤케 섬 투어는 페리 탑승이 필요합니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:30</strong> - 스카이 타워 미팅 및 전망대 관람</li><li><strong>11:00 - 12:30</strong> - 오클랜드 박물관 (Auckland War Memorial Museum) 방문</li><li><strong>12:30 - 13:30</strong> - 점심 식사 (현지 해산물 또는 퓨전 요리)</li><li><strong>14:00 - 16:00</strong> - 데본포트 (Devonport) 페리 탑승 및 마을 탐방</li><li><strong>16:30 - 18:00</strong> - 와이헤케 섬 (Waiheke Island) 와이너리 투어 (선택 사항)</li><li><strong>18:30</strong> - 오클랜드 페리 터미널에서 투어 종료</li></ol><p><strong>총 소요 시간:</strong> 약 9시간</p><p><strong>이동 방법:</strong> 도보, 버스, 페리</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>와이헤케 섬 와이너리 투어는 별도 예약 및 비용이 발생합니다.</li><li>뉴질랜드의 청정한 자연을 보호해주세요.</li></ul>'
         ),

-- 38 리우데자네이루
         (
             '열정의 도시 리우데자네이루에서 브라질의 활기찬 매력을 느껴보세요! 예수상(Christ the Redeemer)의 웅장함부터 코파카바나 해변의 아름다움, 슈가로프 산의 파노라마 뷰까지 리우의 모든 것을 만끽할 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 코파카바나 해변 (Copacabana Beach) 포스트 6 (Posto 6) 앞</p><p><strong>미팅 시간:</strong> 오전 8시 30분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 복장, 수영복, 선크림, 모자, 카메라, 작은 가방 (소매치기 방지)</p><p><strong>참고사항:</strong><ul><li>리우는 햇볕이 강하니 자외선 차단에 신경 써주세요.</li><li>일부 지역은 치안에 주의해야 합니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>08:30</strong> - 코파카바나 해변 미팅 및 해변 산책</li><li><strong>09:30 - 11:30</strong> - 예수상 (Christ the Redeemer) 방문 (코르코바도 열차 탑승)</li><li><strong>12:00 - 13:00</strong> - 점심 식사 (브라질 슈하스코 또는 현지 음식)</li><li><strong>13:30 - 15:00</strong> - 슈가로프 산 (Sugarloaf Mountain) 케이블카 탑승 및 전망 감상</li><li><strong>15:30 - 17:00</strong> - 이파네마 해변 (Ipanema Beach) 및 레블론 지역 탐방</li><li><strong>17:30</strong> - 셀라론 계단 (Escadaria Selarón) 주변에서 투어 종료</li></ol><p><strong>총 소요 시간:</strong> 약 9시간 30분</p><p><strong>이동 방법:</strong> 도보, 택시, 열차, 케이블카</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>유명 관광지는 입장권이 비싸니 미리 예매하는 것이 좋습니다.</li><li>삼바의 본고장에서 음악과 춤을 즐겨보세요!</li></ul>'
         ),

-- 39 상파울루
         (
             '남미 최대의 도시 상파울루에서 문화와 미식의 다양성을 경험하세요! 상파울루 미술관의 예술 작품부터 빌라 마달레나의 거리 예술, 리베르다지 지구의 이국적인 분위기까지 상파울루만의 다채로운 매력을 느낄 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 아베니다 파울리스타 (Avenida Paulista) MASP 미술관 앞</p><p><strong>미팅 시간:</strong> 오전 9시 30분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 카메라, 작은 가방 (소매치기 방지)</p><p><strong>참고사항:</strong><ul><li>상파울루는 대중교통이 잘 되어 있지만, 혼잡할 수 있으니 주의해주세요.</li><li>일부 지역은 치안에 유의해야 합니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:30</strong> - 아베니다 파울리스타 미팅 및 MASP 미술관 외부 조망</li><li><strong>10:30 - 12:00</strong> - 이비라푸에라 공원 (Ibirapuera Park) 산책</li><li><strong>12:00 - 13:00</strong> - 점심 식사 (다양한 세계 음식)</li><li><strong>13:30 - 15:00</strong> - 빌라 마달레나 (Vila Madalena) 골목길 및 거리 예술 구경</li><li><strong>15:30 - 17:00</strong> - 리베르다지 (Liberdade) 지구 (일본인 거리) 탐방</li><li><strong>17:30</strong> - 상파울루 대성당 (Catedral da Sé) 주변에서 투어 종료</li></ol><p><strong>총 소요 시간:</strong> 약 8시간</p><p><strong>이동 방법:</strong> 도보, 지하철, 버스</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>미술관 입장 시 특정 요일은 무료일 수 있습니다.</li><li>상파울루의 다양한 이민자 문화를 경험해보세요.</li></ul>'
         ),

-- 40 자카르타
         (
             '인도네시아의 수도 자카르타에서 동남아시아의 활기찬 대도시를 경험하세요! 모나스 타워의 웅장함부터 올드 시티의 역사적인 건물, 타만 미니 인도네시아 인다의 다양한 문화까지 자카르타의 모든 것을 만끽할 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 모나스 (Monas - National Monument) 광장 입구</p><p><strong>미팅 시간:</strong> 오전 8시 30분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 가벼운 복장, 모자, 선글라스, 물</p><p><strong>참고사항:</strong><ul><li>자카르타는 교통 체증이 심할 수 있으니 시간을 여유롭게 계획해주세요.</li><li>습하고 더운 날씨에 대비하여 충분한 수분 섭취가 필요합니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>08:30</strong> - 모나스 광장 미팅 및 모나스 타워 방문</li><li><strong>10:30 - 12:00</strong> - 올드 시티 (Kota Tua) 및 파타힐라 광장 (Fatahillah Square) 탐방</li><li><strong>12:00 - 13:00</strong> - 점심 식사 (인도네시아 전통 음식)</li><li><strong>13:30 - 15:00</strong> - 이스티클랄 모스크 (Istiqlal Mosque) 및 자카르타 대성당 (Jakarta Cathedral)</li><li><strong>15:30 - 17:00</strong> - 타만 미니 인도네시아 인다 (Taman Mini Indonesia Indah) (선택 사항)</li><li><strong>17:30</strong> - 쇼핑몰 (Grand Indonesia 또는 Plaza Indonesia) 주변에서 투어 종료</li></ol><p><strong>총 소요 시간:</strong> 약 9시간</p><p><strong>이동 방법:</strong> 택시, 트랜스자카르타 (BRT), 도보</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>타만 미니는 넓으니 충분한 시간을 할애하거나 일부 지역만 선택하여 방문하는 것이 좋습니다.</li><li>현지 길거리 음식을 맛보는 것을 추천합니다.</li></ul>'
         ),

-- 41 런던
         (
             '역사와 문화의 도시 런던에서 유럽의 정수를 경험하세요! 빅 벤과 웨스트민스터 사원의 웅장함부터 대영 박물관의 보물, 런던 아이의 멋진 전망까지 런던의 모든 것을 만끽할 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 웨스트민스터 지하철역 (Westminster Station) 출구 앞</p><p><strong>미팅 시간:</strong> 오전 9시 00분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 카메라, 우산 (날씨 변화 대비), 오이스터 카드 또는 비접촉 결제 카드</p><p><strong>참고사항:</strong><ul><li>런던은 날씨 변화가 심하니 우산을 꼭 챙겨주세요.</li><li>대중교통 이용이 편리하며 오이스터 카드 또는 비접촉 카드 사용을 권장합니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:00</strong> - 웨스트민스터역 미팅 및 빅 벤, 웨스트민스터 사원 외부 조망</li><li><strong>10:00 - 12:00</strong> - 버킹엄 궁전 (외부 관람) 및 근위병 교대식 (시간 확인 필요)</li><li><strong>12:00 - 13:00</strong> - 점심 식사 (피쉬 앤 칩스 또는 샌드위치)</li><li><strong>13:30 - 15:30</strong> - 대영 박물관 (British Museum) 주요 소장품 관람</li><li><strong>16:00 - 17:30</strong> - 런던 아이 (London Eye) 탑승 및 템즈 강변 산책</li><li><strong>18:00</strong> - 타워 브릿지 (Tower Bridge) 주변에서 투어 종료</li></ol><p><strong>총 소요 시간:</strong> 약 9시간</p><p><strong>이동 방법:</strong> 도보, 지하철 (Tube), 버스</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>박물관 입장료는 무료이지만, 특별 전시는 유료일 수 있습니다.</li><li>저녁에는 웨스트엔드 뮤지컬 관람을 추천합니다.</li></ul>'
         ),

-- 42 멘체스터
         (
             '잉글랜드 북부의 중심, 맨체스터에서 산업 혁명의 역사와 현대 문화의 활기를 느껴보세요! 맨체스터 유나이티드 경기장의 열기부터 존 라이랜즈 도서관의 웅장함, 북부 쿼터의 독특한 분위기까지 맨체스터만의 매력을 만끽할 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 맨체스터 피카딜리 역 (Manchester Piccadilly Station) 메인 출구 앞</p><p><strong>미팅 시간:</strong> 오전 9시 30분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 카메라, 비 오는 날씨 대비 우산 또는 방수 재킷</p><p><strong>참고사항:</strong><ul><li>맨체스터는 축구의 도시이니 관심 있다면 경기장 투어를 추천합니다.</li><li>북부 쿼터는 독특한 상점과 카페가 많으니 여유롭게 둘러보세요.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:30</strong> - 맨체스터 피카딜리 역 미팅 및 투어 시작</li><li><strong>10:00 - 11:30</strong> - 맨체스터 대성당 (Manchester Cathedral) 및 주변 시청 조망</li><li><strong>12:00 - 13:00</strong> - 점심 식사 (영국식 파이 또는 샌드위치)</li><li><strong>13:30 - 15:00</strong> - 존 라이랜즈 도서관 (John Rylands Library) 및 맨체스터 박물관 (The Manchester Museum)</li><li><strong>15:30 - 17:00</strong> - 북부 쿼터 (Northern Quarter) 탐방 및 스트리트 아트 감상</li><li><strong>17:30</strong> - 올드 트래포드 (Old Trafford) 경기장 외부 조망 (선택 사항)</li></ol><p><strong>총 소요 시간:</strong> 약 8시간</p><p><strong>이동 방법:</strong> 도보, 트램, 버스</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>맨체스터 유나이티드 또는 맨체스터 시티 경기가 있는 날은 도시가 매우 혼잡할 수 있습니다.</li><li>현지 펍에서 영국 전통 에일을 맛보세요.</li></ul>'
         ),

-- 43 멕시코시티
         (
             '활기찬 멕시코의 수도 멕시코시티에서 고대 문명과 현대 문화의 융합을 경험하세요! 소칼로 광장의 역사적인 건물부터 프라다 칼로 박물관의 예술, 테오티우아칸 피라미드의 신비로움까지 멕시코시티의 모든 것을 만끽할 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 소칼로 (Zócalo) 광장 중앙 국기탑 앞</p><p><strong>미팅 시간:</strong> 오전 8시 00분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 카메라, 모자, 선글라스, 물, 현금</p><p><strong>참고사항:</strong><ul><li>멕시코시티는 고도가 높으니 고산병에 대비해주세요.</li><li>소매치기에 주의하고 귀중품은 숙소에 보관하는 것이 좋습니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>08:00</strong> - 소칼로 광장 미팅 및 국립 궁전 (외부), 메트로폴리탄 대성당 방문</li><li><strong>09:30 - 12:30</strong> - 테오티우아칸 피라미드 (Teotihuacan Pyramids) 탐방 (태양의 피라미드, 달의 피라미드)</li><li><strong>12:30 - 13:30</strong> - 점심 식사 (멕시코 전통 타코, 퀘사디아)</li><li><strong>14:30 - 16:00</strong> - 국립 인류학 박물관 (National Museum of Anthropology) 관람</li><li><strong>16:30 - 18:00</strong> - 프라다 칼로 박물관 (Museo Frida Kahlo) 방문 (사전 예약 권장)</li><li><strong>18:30</strong> - 코요아칸 (Coyoacán) 지역에서 투어 종료 및 자유시간</li></ol><p><strong>총 소요 시간:</strong> 약 10시간</p><p><strong>이동 방법:</strong> 전용 차량 (테오티우아칸), 지하철, 도보</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 3인 이상 모객 시 출발 가능합니다.</li><li>박물관 입장 시 사전 예약이 필요할 수 있습니다.</li><li>현지 시장에서 다양한 길거리 음식을 맛보는 것을 추천합니다.</li></ul>'
         ),

-- 44 마닐라
         (
             '필리핀의 수도 마닐라에서 동서양 문화가 융합된 매력을 느껴보세요! 인트라무로스의 역사적인 요새, 산티아고 요새의 감동, 리잘 공원의 평화로움까지 마닐라의 모든 것을 만끽할 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 리잘 공원 (Rizal Park) 중앙 분수대 앞</p><p><strong>미팅 시간:</strong> 오전 9시 00분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 모자, 선글라스, 물, 카메라</p><p><strong>참고사항:</strong><ul><li>마닐라는 매우 덥고 습하니 가벼운 복장과 충분한 수분 섭취가 필요합니다.</li><li>교통 체증이 심할 수 있으니 시간을 여유롭게 계획해주세요.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:00</strong> - 리잘 공원 미팅 및 주변 탐방</li><li><strong>10:00 - 12:00</strong> - 인트라무로스 (Intramuros) 투어 (산티아고 요새, 산 아구스틴 교회)</li><li><strong>12:00 - 13:00</strong> - 점심 식사 (필리핀 전통 음식)</li><li><strong>13:30 - 15:00</strong> - 차이나타운 (Binondo) 탐방 및 현지 음식 체험</li><li><strong>15:30 - 17:00</strong> - 국립 박물관 (National Museum of the Philippines) (선택 사항)</li><li><strong>17:30</strong> - 몰 오브 아시아 (Mall of Asia) 주변에서 투어 종료 및 자유시간</li></ol><p><strong>총 소요 시간:</strong> 약 8시간 30분</p><p><strong>이동 방법:</strong> 도보, 지프니, 택시</li></p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>박물관 입장 시 일부 비용이 발생할 수 있습니다.</li><li>현지에서 지프니를 타보는 이색적인 경험을 해보세요!</li></ul>'
         ),

-- 45 세부
         (
             '필리핀의 휴양 도시 세부에서 아름다운 자연과 해양 액티비티를 즐기세요! 막탄 섬의 해변부터 오슬롭 고래상어 투어, 카와산 캐녀닝의 스릴까지 세부만의 특별한 경험을 만끽할 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 막탄 세부 국제공항 (Mactan-Cebu International Airport) 도착장</p><p><strong>미팅 시간:</strong> 항공편 도착 시간에 맞춰 조율</p><p><strong>준비물:</strong> 수영복, 아쿠아 슈즈, 선크림, 모자, 선글라스, 카메라, 여벌 옷</p><p><strong>참고사항:</strong><ul><li>오슬롭 고래상어 투어는 이른 아침에 출발하니 전날 충분한 휴식을 취해주세요.</li><li>캐녀닝은 체력 소모가 크므로 컨디션 조절이 필요합니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>새벽/아침</strong> - 공항 미팅 후 오슬롭으로 이동 (고래상어 투어)</li><li><strong>오전</strong> - 고래상어 투어 및 캐녀닝 (카와산 폭포)</li><li><strong>점심</strong> - 현지 레스토랑에서 바비큐 또는 해산물 요리</li><li><strong>오후</strong> - 모알보알 (Moalboal) 스노클링 또는 다이빙 (정어리 떼 감상)</li><li><strong>저녁</strong> - 세부 시티로 이동 및 저녁 식사</li><li><strong>종료</strong> - 숙소 드롭 또는 공항 이동</li></ol><p><strong>총 소요 시간:</strong> 약 12시간 이상 (오슬롭/캐녀닝 포함 시)</p><p><strong>이동 방법:</strong> 전용 차량, 보트</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>해양 액티비티는 날씨에 따라 변동될 수 있습니다.</li><li>현지인들과의 교류 시 친절한 태도를 보여주세요.</li></ul>'
         ),

-- 46 스톡홀름
         (
             '북유럽의 아름다운 수도 스톡홀름에서 동화 같은 풍경을 경험하세요! 감라스탄의 고풍스러운 골목길부터 바사 박물관의 웅장함, 시청사의 노벨상 만찬장까지 스톡홀름의 매력을 만끽할 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 스톡홀름 중앙역 (Stockholm Central Station) 메인 출구 앞</p><p><strong>미팅 시간:</strong> 오전 9시 30분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 따뜻한 옷 (북유럽 날씨 대비), 카메라</p><p><strong>참고사항:</strong><ul><li>스톡홀름은 겨울이 길고 추우니 방한 용품을 잘 준비해주세요.</li><li>대중교통 이용이 편리하며 교통권 구매를 추천합니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:30</strong> - 스톡홀름 중앙역 미팅 및 투어 시작</li><li><strong>10:00 - 12:00</strong> - 감라스탄 (Gamla Stan - Old Town) 탐방 및 왕궁 (Royal Palace)</li><li><strong>12:00 - 13:00</strong> - 점심 식사 (스웨덴 미트볼 또는 현지 음식)</li><li><strong>13:30 - 15:00</strong> - 바사 박물관 (Vasa Museum) 관람</li><li><strong>15:30 - 17:00</strong> - 시청사 (Stockholm City Hall) 방문 및 노벨상 만찬장</li><li><strong>17:30</strong> - 쇠데르말름 (Södermalm) 지역에서 시내 전경 감상</li></ol><p><strong>총 소요 시간:</strong> 약 8시간</p><p><strong>이동 방법:</strong> 도보, 지하철, 페리</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>박물관 입장료는 별도입니다.</li><li>스웨덴의 디자인 문화를 경험해보세요.</li></ul>'
         ),

-- 47 부에노스아이레스
         (
             '남미의 파리, 부에노스아이레스에서 탱고의 열정과 유럽의 우아함을 동시에 느껴보세요! 레콜레타 공동묘지의 예술적인 묘비, 라 보카의 다채로운 건물, 탱고 쇼의 열기까지 부에노스아이레스의 모든 것을 만끽할 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 오벨리스코 (Obelisco de Buenos Aires) 앞</p><p><strong>미팅 시간:</strong> 오전 9시 00분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 카메라, 작은 가방 (소매치기 방지)</p><p><strong>참고사항:</strong><ul><li>부에노스아이레스는 소매치기가 잦으니 개인 소지품 관리에 유의해주세요.</li><li>탱고 쇼는 저녁에 진행되므로 별도 계획이 필요합니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:00</strong> - 오벨리스코 미팅 및 9 de Julio 대로 탐방</li><li><strong>10:00 - 12:00</strong> - 레콜레타 공동묘지 (Recoleta Cemetery) 방문 및 에바 페론 묘비</li><li><strong>12:00 - 13:00</strong> - 점심 식사 (아르헨티나 스테이크 또는 엠파나다)</li><li><strong>13:30 - 15:00</strong> - 라 보카 (La Boca) 지역 및 카미니토 (Caminito) 거리 구경</li><li><strong>15:30 - 17:00</strong> - 산 텔모 (San Telmo) 지역 (일요일 벼룩시장 추천)</li><li><strong>17:30</strong> - 콜론 극장 (Teatro Colón) 주변에서 투어 종료</li></ol><p><strong>총 소요 시간:</strong> 약 8시간 30분</p><p><strong>이동 방법:</strong> 도보, 택시, 버스</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>현지에서 탱고 레슨을 받아보는 것도 좋은 경험입니다.</li><li>아르헨티나의 와인을 꼭 맛보세요.</li></ul>'
         ),

-- 48 싱가포르
         (
             '청정하고 현대적인 도시국가 싱가포르에서 미래 도시의 매력을 느껴보세요! 마리나 베이 샌즈의 스카이 라인부터 가든스 바이 더 베이의 초현실적인 풍경, 센토사 섬의 휴양지까지 싱가포르의 모든 것을 만끽할 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 마리나 베이 샌즈 (Marina Bay Sands) 호텔 로비 (타워 1)</p><p><strong>미팅 시간:</strong> 오전 9시 00분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 가벼운 복장, 모자, 선글라스, 물, 카메라</p><p><strong>참고사항:</strong><ul><li>싱가포르는 매우 덥고 습하니 시원한 복장과 충분한 수분 섭취가 필요합니다.</li><li>대중교통이 매우 잘 되어 있습니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:00</strong> - 마리나 베이 샌즈 미팅 및 스카이파크 전망대 (선택 사항)</li><li><strong>10:30 - 12:00</strong> - 가든스 바이 더 베이 (Gardens by the Bay) 슈퍼트리 그로브 및 클라우드 포레스트 (입장권 별도)</li><li><strong>12:00 - 13:00</strong> - 점심 식사 (칠리 크랩 또는 현지 호커 센터 음식)</li><li><strong>13:30 - 15:00</strong> - 머라이언 공원 (Merlion Park) 및 에스플러네이드 (Esplanade)</li><li><strong>15:30 - 17:00</strong> - 센토사 섬 (Sentosa Island) 이동 및 유니버설 스튜디오 (외부 관람) 또는 실로소 비치</li><li><strong>17:30</strong> - 클락 키 (Clarke Quay) 주변에서 투어 종료 및 자유시간</li></ol><p><strong>총 소요 시간:</strong> 약 9시간</p><p><strong>이동 방법:</strong> 도보, MRT (지하철), 모노레일</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>식사 후 풍선껌을 씹거나 길거리에 쓰레기를 버리는 것은 금지되어 있습니다.</li><li>매너 있는 여행을 즐겨주세요.</li></ul>'
         ),

-- 49 취리히
         (
             '스위스의 금융 중심지 취리히에서 아름다운 자연과 도시의 매력을 동시에 느껴보세요! 취리히 호수의 평화로움부터 구시가지의 고풍스러움, 린덴호프 언덕의 전망까지 취리히의 모든 것을 만끽할 수 있습니다.',
             '<h3>🤝 미팅 정보</h3><p><strong>미팅 장소:</strong> 취리히 중앙역 (Zürich Hauptbahnhof) 메인 홀</p><p><strong>미팅 시간:</strong> 오전 9시 30분 (정시 출발)</p><p><strong>준비물:</strong> 편안한 신발, 카메라, 가벼운 외투 (날씨 변화 대비)</p><p><strong>참고사항:</strong><ul><li>스위스는 물가가 비싸니 예산을 잘 계획해주세요.</li><li>날씨가 좋으면 취리히 호수 유람선 탑승을 추천합니다.</li></ul>',
             '<h3>🗺️ 코스 안내</h3><ol><li><strong>09:30</strong> - 취리히 중앙역 미팅 및 투어 시작</li><li><strong>10:00 - 11:30</strong> - 반호프슈트라세 (Bahnhofstrasse) 쇼핑 거리 및 성 피터 교회 (St. Peterskirche)</li><li><strong>11:30 - 12:30</strong> - 린덴호프 언덕 (Lindenhof Hill)에서 구시가지 전경 감상</li><li><strong>12:30 - 13:30</strong> - 점심 식사 (스위스 퐁듀 또는 뢰스티)</li><li><strong>14:00 - 15:30</strong> - 그로스뮌스터 (Grossmünster) 및 프라우뮌스터 (Fraumünster) 교회 방문</li><li><strong>16:00 - 17:30</strong> - 취리히 호수 유람선 탑승 (선택 사항) 또는 호숫가 산책</li><li><strong>18:00</strong> - 니더도르프 (Niederdorf) 지역에서 투어 종료 및 자유시간</li></ol><p><strong>총 소요 시간:</strong> 약 8시간</p><p><strong>이동 방법:</strong> 도보, 트램, 보트 (선택 사항)</p>',
             '<h3>📝 안내사항</h3><ul><li>본 투어는 최소 2인 이상 모객 시 출발 가능합니다.</li><li>스위스 초콜릿과 치즈를 꼭 맛보세요.</li><li>현지 대중교통 시스템은 매우 효율적입니다.</li></ul>'
         );






INSERT IGNORE INTO tbl_product (
    product_uid, country_id, city_id, theme_code,
    product_title, product_content, product_adult_price, product_child_price,
    product_start_date, product_end_date, product_min_participants,
    product_max_participants, product_status, product_thumbnail, review_count, region_code, region_type,
    city_name, country_name, full_location, product_detail_code) VALUES
                                                                     ('SEOUL001', 01, 1, 1, '결제용테스트', '결제용테스트', 500, 100, '2025-05-01', '2025-05-31', 1, 30, 'ON_SALE', '/static/img/earth.jpg',  0, 1, 'DOMESTIC', 'SEOUL', 'South Korea', 'SEOUL, South Korea', 1),
                                                                     ('SEOUL002', 01, 1, 7, '서울 트레킹 명소 투어', '서울의 아름다운 산과 숲길을 따라 걷는 힐링 트레킹 투어', 500, 100, '2025-05-01', '2025-05-31', 1, 30, 'ON_SALE', '/static/img/product/region1/seoul.jpg', 0, 1, 'DOMESTIC', 'SEOUL', 'South Korea', 'SEOUL, South Korea', 1),
                                                                     ('SEOUL003', 01, 1, 1, '서울 시티 투어', '서울 시내 관광 투어', 101880, 51020, '2025-05-01', '2025-05-25', 1, 30, 'ON_SALE', '/static/img/product/region1/seoul.jpg',  0, 1, 'DOMESTIC', 'SEOUL', 'South Korea', 'SEOUL, South Korea', 1),
                                                                     ('SEOUL004', 01, 1, 11, '서울 힐링 & 전통 문화 체험', '북촌 한옥마을과 남산골 한옥마을에서 즐기는 전통 체험', 71950, 36040, '2025-09-05', '2025-09-07', 2, 10, 'CLOSED', '/static/img/product/region1/seoul.jpg',  0, 1, 'DOMESTIC', 'SEOUL', 'South Korea', 'SEOUL, South Korea', 1),
                                                                     ('SEOUL005', 01, 1, 15, '서울 야경 명소 버스 투어', '서울의 아름다운 야경을 편안하게 감상하는 투어', 67900, 33870, '2025-05-20', '2025-05-20', 5, 30, 'CLOSED', '/static/img/product/region1/seoul.jpg',  0, 1, 'DOMESTIC', 'SEOUL', 'South Korea', 'SEOUL, South Korea', 1),
                                                                     ('SEOUL006', 01, 1, 4, '서울 놀이공원 & 벚꽃 축제 투어', '신나는 놀이기구와 아름다운 벚꽃을 만끽하는 봄 시즌 한정 투어', 91880, 45910, '2025-04-05', '2025-04-07', 5, 30, 'CLOSED', '/static/img/product/region1/seoul.jpg',  0, 1, 'DOMESTIC', 'SEOUL', 'South Korea', 'SEOUL, South Korea', 1),

                                                                     ('BUSAN001', 01, 2, 2, '부산 골프 리조트 투어', '부산 최고의 골프 리조트를 즐기는 패키지', 254870, 149650, '2025-06-01', '2025-06-30', 2, 20, 'ON_SALE', '/static/img/product/region2/busan.jpg', 0, 2, 'DOMESTIC', 'BUSAN', 'South Korea', 'BUSAN, South Korea', 2),
                                                                     ('BUSAN002', 01, 2, 8, '부산 불꽃 축제 & 야경 투어', '부산의 화려한 불꽃 축제와 아름다운 야경을 즐기는 특별한 투어', 127900, 69880, '2025-08-15', '2025-08-15', 2, 20, 'ON_SALE', '/static/img/product/region2/busan.jpg',  0, 2, 'DOMESTIC', 'BUSAN', 'South Korea', 'BUSAN, South Korea', 2),

                                                                     ('JEJU001', 01, 3, 3, '제주 크루즈 투어', '제주 해안을 따라 즐기는 럭셔리 크루즈', 304880, 34910, '2025-07-01', '2025-07-31', 10, 100, 'ON_SALE', '/static/img/product/region3/jeju.jpg',  0, 3, 'DOMESTIC', 'JEJU', 'South Korea', 'JEJU, South Korea', 3),
                                                                     ('JEJU002', 01, 3, 9, '제주 면세점 쇼핑 & 맛집 투어', '제주 면세점에서 쇼핑을 즐기고 현지인 추천 맛집을 탐방하는 투어', 95950, 17880, '2025-07-05', '2025-07-10', 10, 100, 'ON_SALE', '/static/img/product/region3/jeju.jpg',  0, 3, 'DOMESTIC', 'JEJU', 'South Korea', 'JEJU, South Korea', 3),
                                                                     ('JEJU003', 01, 3, 7, '제주 한라산 영실 코스 트레킹 투어', '한라산 영실 코스를 따라 아름다운 기암괴석과 풍경을 감상하는 트레킹 투어', 71880, 39930, '2025-08-01', '2025-08-01', 5, 15, 'ON_SALE', '/static/img/product/region3/jeju.jpg',  0, 3, 'DOMESTIC', 'JEJU', 'South Korea', 'JEJU, South Korea', 3),
                                                                     ('JEJU004', 01, 3, 11, '제주 서부 해안 & 오설록 힐링 투어', '곽지과물 해변, 협재 해변 등 아름다운 서부 해안을 따라 오설록 티 뮤지엄에서 차를 즐기는 힐링 여행', 86900, 21870, '2025-08-20', '2025-08-20', 3, 12, 'ON_SALE', '/static/img/product/region3/jeju.jpg', 0, 3, 'DOMESTIC', 'JEJU', 'South Korea', 'JEJU, South Korea', 3),
                                                                     ('JEJU005', 01, 3, 13, '제주 동굴 & 화산 지형 탐험 투어', '만장굴, 성산일출봉 등 제주의 독특한 화산 지형과 동굴을 탐험하며 자연 역사를 배우는 투어', 91880, 47950, '2025-09-10', '2025-09-10', 4, 18, 'ON_SALE', '/static/img/product/region3/jeju.jpg',  0, 3, 'DOMESTIC', 'JEJU', 'South Korea', 'JEJU, South Korea', 3),


                                                                     ('GANGNEUNG001', 01, 4, 4, '강릉 키즈 체험 투어', '아이들과 함께하는 해변 체험 프로그램', 91950, 44880, '2025-06-15', '2025-06-30', 2, 25, 'ON_SALE', '/static/img/product/region1/gangneung.jpg',  0, 1, 'DOMESTIC', 'GANGNEUNG', 'South Korea', 'GANGNEUNG, South Korea', 4),
                                                                     ('GANGNEUNG003', 01, 4, 4, '강릉 바다 열차 & 회 센터 즐기기', '낭만적인 동해 바다를 따라 달리는 기차 여행', 77880, 39930, '2025-06-25', '2025-06-25', 2, 20, 'CLOSED', '/static/img/product/region1/gangneung.jpg',  0, 1, 'DOMESTIC', 'GANGNEUNG', 'South Korea', 'GANGNEUNG, South Korea', 4),
                                                                     ('GANGNEUNG002', 01, 4, 10, '강릉 커피 축제 & 해변 드라이브', '향긋한 커피 축제와 함께 아름다운 강릉 해안 도로를 따라 드라이브하는 투어', 70900, 34870, '2025-10-01', '2025-10-03', 2, 25, 'ON_SALE', '/static/img/product/region1/gangneung.jpg',  0, 1, 'DOMESTIC', 'GANGNEUNG', 'South Korea', 'GANGNEUNG, South Korea', 4),

                                                                     ('DAEJEON001', 01, 5, 5, '대전 허니문 스페셜', '신혼부부를 위한 럭셔리 과학 도시 체험', 184880, 99870, '2025-07-01', '2025-07-15', 2, 10, 'ON_SALE', '/static/img/product/region1/daejeon.jpg',  0, 1, 'DOMESTIC', 'DAEJEON', 'South Korea', 'DAEJEON, South Korea', 5),
                                                                     ('DAEJEON002', 01, 5, 11, '대전 과학관 탐험 & 족욕 체험', '다양한 과학 전시관을 탐험하고 유성 온천에서 피로를 푸는 힐링 투어', 52900, 27910, '2025-09-10', '2025-09-12', 2, 10, 'ON_SALE', '/static/img/product/region1/daejeon.jpg',  0, 1, 'DOMESTIC', 'DAEJEON', 'South Korea', 'DAEJEON, South Korea', 5),
                                                                     ('DAEJEON003', 01, 5, 4, '대전 과학 기술 신나는 체험', '아이들과 함께 즐거운 과학 체험 학습', 61880, 31950, '2025-07-08', '2025-07-08', 3, 25, 'CLOSED', '/static/img/product/region1/daejeon.jpg',  0, 1, 'DOMESTIC', 'DAEJEON', 'South Korea', 'DAEJEON, South Korea', 5),

                                                                     ('INCHEON001', 01, 6, 13, '인천 강화도 역사 탐방 투어', '고려 시대부터 근현대까지, 강화도의 유서 깊은 역사를 따라가는 투어', 67950, 40110, '2025-07-05', '2025-07-06', 2, 15, 'ON_SALE', '/static/img/product/region1/incheon.jpg',  0, 1, 'DOMESTIC', 'INCHEON', 'South Korea', 'INCHEON, South Korea', 6),
                                                                     ('INCHEON002', 01, 6, 10, '인천 차이나타운 & 신포시장 먹방 투어', '인천의 명물 차이나타운과 신포시장에서 다양한 길거리 음식을 맛보는 미식 투어', 41880, 17930, '2025-08-15', '2025-08-15', 1, 10, 'ON_SALE', '/static/img/product/region1/incheon.jpg',  0, 1, 'DOMESTIC', 'INCHEON', 'South Korea', 'INCHEON, South Korea', 6),
                                                                     ('INCHEON003', 01, 6, 4, '월미도 테마파크 & 해양 생태 체험 투어', '아이들과 함께 월미도에서 놀이기구도 타고, 해양 생태도 배우는 신나는 투어', 57900, 43150, '2025-09-01', '2025-09-01', 2, 20, 'ON_SALE', '/static/img/product/region1/incheon.jpg',  0, 1, 'DOMESTIC', 'INCHEON', 'South Korea', 'INCHEON, South Korea', 6),

                                                                     ('CHUNCHEON001', 01, 7, 4, '춘천 가족 여행', '춘천의 아름다운 자연을 담은 가족 여행', 89770, 49880, '2025-05-01', '2025-05-31', 3, 20, 'ON_SALE', '/static/img/product/region1/chuncheon.jpg',  0, 1, 'DOMESTIC', 'CHUNCHEON', 'South Korea', 'CHUNCHEON, South Korea', 7),
                                                                     ('CHUNCHEON002', 01, 7, 8, '춘천 닭갈비 & 호수 유람선 투어', '춘천의 명물 닭갈비를 맛보고 아름다운 호수에서 유람선을 타는 낭만 투어', 52910, 27950, '2025-05-15', '2025-05-17', 3, 20, 'ON_SALE', '/static/img/product/region1/chuncheon.jpg',  0, 1, 'DOMESTIC', 'CHUNCHEON', 'South Korea', 'CHUNCHEON, South Korea', 7),
                                                                     ('CHUNCHEON003', 01, 7, 4, '춘천 닭갈비 맛집 & 소양호 유람', '춘천의 명물과 아름다운 호수를 만끽하는 여행', 81880, 43040, '2025-05-18', '2025-05-18', 4, 15, 'CLOSED', '/static/img/product/region1/chuncheon.jpg',  0, 1, 'DOMESTIC', 'CHUNCHEON', 'South Korea', 'CHUNCHEON, South Korea', 7),

                                                                     ('SUWON001', 01, 8, 13, '수원 역사 탐방', '수원화성을 중심으로 한 역사 여행', 52950, 27880, '2025-06-01', '2025-06-30', 2, 15, 'ON_SALE', '/static/img/product/region1/suwon.jpg',  0, 1, 'DOMESTIC', 'SUWON', 'South Korea', 'SUWON, South Korea', 8),
                                                                     ('SUWON002', 01, 8, 11, '수원 화성 야간 달빛 투어', '밤에 더욱 아름다운 수원 화성을 거닐며 역사 이야기를 듣는 특별한 투어', 91880, 71910, '2025-06-10', '2025-06-10', 2, 15, 'ON_SALE', '/static/img/product/region1/suwon.jpg',  0, 1, 'DOMESTIC', 'SUWON', 'South Korea', 'SUWON, South Korea', 8),
                                                                     ('SUWON003', 01, 8, 11, '수원 화성 달빛 아래 특별한 산책', '밤의 고즈넉한 수원 화성을 걷는 특별한 경험', 57910, 30150, '2025-06-12', '2025-06-12', 2, 18, 'CLOSED', '/static/img/product/region1/suwon.jpg',  0, 1, 'DOMESTIC', 'SUWON', 'South Korea', 'SUWON, South Korea', 8),

                                                                     ('CHEONGJU001', 01, 9, 11, '청주 힐링 여행', '청주의 자연과 문화를 느낄 수 있는 힐링 여행', 34900, 17870, '2025-07-01', '2025-07-31', 1, 10, 'ON_SALE', '/static/img/product/region1/cheongju.jpg',  0, 1, 'DOMESTIC', 'CHEONGJU', 'South Korea', 'CHEONGJU, South Korea', 9),
                                                                     ('CHEONGJU002', 01, 9, 10, '청주 농촌 체험 & 전통 음식 만들기', '청주의 농촌에서 다양한 체험 활동을 하고 전통 음식을 만들어보는 투어', 50330, 24980, '2025-07-20', '2025-07-22', 1, 10, 'ON_SALE', '/static/img/product/region1/cheongju.jpg',  0, 1, 'DOMESTIC', 'CHEONGJU', 'South Korea', 'CHEONGJU, South Korea', 9),
                                                                     ('CHEONGJU003', 01, 9, 13, '청주 직지 & 상당산성 역사 탐방', '청주의 역사와 문화를 탐방하는 여행', 47950, 25110, '2025-07-25', '2025-07-25', 1, 10, 'CLOSED', '/static/img/product/region1/cheongju.jpg',  0, 1, 'DOMESTIC', 'CHEONGJU', 'South Korea', 'CHEONGJU, South Korea', 9),

                                                                     ('DAEGU001', 01, 10, 10, '대구 미식 투어', '대구의 다양한 먹거리를 탐방하는 미식 여행', 71880, 39930, '2025-08-01', '2025-08-31', 2, 20, 'ON_SALE', '/static/img/product/region2/daegu.jpg',  0, 2, 'DOMESTIC', 'DAEGU', 'South Korea', 'DAEGU, South Korea', 10),
                                                                     ('DAEGU002', 01, 10, 11, '대구 근대 골목길 & 서문시장 투어', '대구의 역사적인 골목길을 탐방하고 활기 넘치는 전통 시장을 방문하는 투어', 32900, 14880, '2025-08-05', '2025-08-07', 2, 20, 'ON_SALE', '/static/img/product/region2/daegu.jpg',  0, 2, 'DOMESTIC', 'DAEGU', 'South Korea', 'DAEGU, South Korea', 10),
                                                                     ('DAEGU003', 01, 10, 1, '대구 서문시장 야경 & 근대 골목길 투어', '활기찬 야시장과 역사적인 골목을 둘러보는 여행', 67950, 34910, '2025-08-10', '2025-08-10', 3, 22, 'CLOSED', '/static/img/product/region2/daegu.jpg',  0, 2, 'DOMESTIC', 'DAEGU', 'South Korea', 'DAEGU, South Korea', 10),

                                                                     ('JEONJU001', 01, 11, 1, '전주 한옥마을 투어', '전주 한옥마을의 전통과 멋을 느낄 수 있는 여행', 61880, 34950, '2025-09-01', '2025-09-30', 3, 18, 'ON_SALE', '/static/img/product/region2/jeonju.jpg',  0, 2, 'DOMESTIC', 'JEONJU', 'South Korea', 'JEONJU, South Korea', 11),
                                                                     ('JEONJU002', 01, 11, 12, '전주 한복 체험 & 경기전 관람', '전주 한옥마을에서 아름다운 한복을 입고 경기전을 관람하는 특별한 경험', 47900, 24870, '2025-09-15', '2025-09-17', 3, 18, 'ON_SALE', '/static/img/product/region2/jeonju.jpg',  0, 2, 'DOMESTIC', 'JEONJU', 'South Korea', 'JEONJU, South Korea', 11),
                                                                     ('JEONJU003', 01, 11, 11, '전주 한옥마을에서의 특별한 하룻밤', '전통 한옥에서의 특별한 하룻밤과 다채로운 체험', 97950, 50110, '2025-09-20', '2025-09-21', 2, 16, 'CLOSED', '/static/img/product/region2/jeonju.jpg',  0, 2, 'DOMESTIC', 'JEONJU', 'South Korea', 'JEONJU, South Korea', 11),

                                                                     ('GYEONGJU001', 01, 12, 13, '경주 신라 역사 투어', '신라 천년의 역사를 따라가는 경주 여행', 30250, 9810, '2025-10-01 00:00:00', '2025-10-31', 1, 12, 'ON_SALE', '/static/img/product/region2/gyeongju.jpg',  0, 2, 'DOMESTIC', 'GYEONGJU', 'South Korea', 'GYEONGJU, South Korea', 12),
                                                                     ('GYEONGJU002', 01, 12, 13, '경주 불국사 & 첨성대 역사 투어', '신라의 대표적인 유적인 불국사와 첨성대를 방문하여 역사를 배우는 투어', 45180, 14930, '2025-10-05', '2025-11-15', 1, 12, 'ON_SALE', '/static/img/product/region2/gyeongju.jpg',  0, 2, 'DOMESTIC', 'GYEONGJU', 'South Korea', 'GYEONGJU, South Korea', 12),
                                                                     ('GYEONGJU003', 01, 12, 11, '경주 불국사의 고즈넉한 아침 산책', '조용한 아침, 불국사의 아름다움을 느껴보는 힐링 투어', 39880, 20150, '2025-10-20 07:00:00', '2025-10-20', 1, 10, 'CLOSED', '/static/img/product/region2/gyeongju.jpg',  0, 2, 'DOMESTIC', 'GYEONGJU', 'South Korea', 'GYEONGJU, South Korea', 12),

                                                                     ('GWANGJU001', 01, 13, 14, '광주 예술 여행', '광주의 예술과 문화를 체험하는 특별한 여행', 64920, 35040, '2025-11-01 00:00:00', '2025-11-30', 2, 15, 'ON_SALE', '/static/img/product/region2/gwangju.jpg',  0, 2, 'DOMESTIC', 'GWANGJU', 'South Korea', 'GWANGJU, South Korea', 13),
                                                                     ('GWANGJU002', 01, 13, 14, '광주 비엔날레 & 예술의 거리 투어', '광주 비엔날레 전시를 관람하고 예술가들의 혼이 담긴 거리를 둘러보는 투어', 59870, 30110, '2025-11-01', '2025-11-03', 2, 15, 'ON_SALE', '/static/img/product/region2/gwangju.jpg',  0, 2, 'DOMESTIC', 'GWANGJU', 'South Korea', 'GWANGJU, South Korea', 13),
                                                                     ('GWANGJU003', 01, 13, 10, '광주 떡갈비 & 남광주 야시장 투어', '광주 송정리 떡갈비 골목에서 맛있는 떡갈비를 맛보고, 활기찬 남광주 야시장을 즐기는 투어', 65100, 40330, '2025-11-15', '2025-11-15', 2, 12, 'ON_SALE', '/static/img/product/region2/gwangju.jpg',  0, 2, 'DOMESTIC', 'GWANGJU', 'South Korea', 'GWANGJU, South Korea', 13),

                                                                     ('ULSAN001', 01, 14, 4, '울산 산업 탐방', '울산의 자동차, 조선 산업 현장을 견학하는 투어', 49880, 24950, '2025-12-01 00:00:00', '2025-12-31', 5, 25, 'ON_SALE', '/static/img/product/region2/ulsan.jpg', 0, 2, 'DOMESTIC', 'ULSAN', 'South Korea', 'ULSAN, South Korea', 14),
                                                                     ('ULSAN002', 01, 14, 1, '울산 조선소 & 태화강 국가정원 투어', '한국의 산업 중심지 울산의 조선소를 견학하고 아름다운 태화강 국가정원을 산책하는 투어', 54910, 30080, '2025-12-01', '2025-12-03', 5, 25, 'ON_SALE', '/static/img/product/region2/ulsan.jpg',  0, 2, 'DOMESTIC', 'ULSAN', 'South Korea', 'ULSAN, South Korea', 14),
                                                                     ('ULSAN003', 01, 14, 7, '울산 대왕암공원 & 간절곶 해안 트레킹', '울산의 아름다운 해안선을 따라 대왕암공원과 간절곶을 걷는 힐링 트레킹 투어', 50340, 27870, '2025-11-10', '2025-11-10', 3, 20, 'ON_SALE', '/static/img/product/region2/ulsan.jpg', 0, 2, 'DOMESTIC', 'ULSAN', 'South Korea', 'ULSAN, South Korea', 14),

                                                                     ('TOKYO001', 02, 15, 6, '도쿄 시니어 문화 투어', '실버 세대를 위한 편안한 도쿄 여행', 79660, 49880, '2025-06-01', '2025-06-30', 1, 20, 'ON_SALE', '/static/img/product/region4/tokyo.jpg',  0, 4, 'INTERNATIONAL', 'TOKYO', 'Japan', 'TOKYO, Japan', 15),
                                                                     ('TOKYO002', 02, 15, 12, '도쿄 애니메이션 & 피규어 쇼핑 투어', '도쿄의 유명 애니메이션 거리에서 쇼핑을 즐기는 덕후 투어', 59800, 35190, '2025-06-05', '2025-06-08', 1, 20, 'ON_SALE', '/static/img/product/region4/tokyo.jpg',  0, 4, 'INTERNATIONAL', 'TOKYO', 'Japan', 'TOKYO, Japan', 15),
                                                                     ('TOKYO003', 02, 15, 7, '도쿄 근교 온천 & 자연 감상 투어', '도쿄 근교의 유명 온천에서 휴식을 취하고 아름다운 자연을 만끽하는 힐링 투어', 37910, 31880, '2025-05-20', '2025-05-22', 1, 10, 'ON_SALE', '/static/img/product/region4/tokyo.jpg',  0, 4, 'INTERNATIONAL', 'TOKYO', 'Japan', 'TOKYO, Japan', 15),
                                                                     ('TOKYO004', 02, 15, 15, '도쿄 디즈니랜드 & 디즈니씨 투어', '꿈과 환상의 세계, 도쿄 디즈니랜드와 디즈니씨를 하루에 모두 즐기는 특별한 투어', 149880, 100150, '2025-07-01', '2025-07-01', 1, 10, 'ON_SALE', '/static/img/product/region4/tokyo.jpg',  0, 4, 'INTERNATIONAL', 'TOKYO', 'Japan', 'TOKYO, Japan', 15),
                                                                     ('TOKYO005', 02, 15, 12, '도쿄 애니메이션 성지 순례 투어', '유명 애니메이션 배경지를 방문하는 특별한 투어', 69750, 39900, '2025-10-10', '2025-10-12', 1, 8, 'SOLD_OUT', '/static/img/product/region4/tokyo.jpg',  0, 4, 'INTERNATIONAL', 'TOKYO', 'Japan', 'TOKYO, Japan', 15),
                                                                     ('TOKYO006', 02, 15, 1, '도쿄 스카이트리 & 아사쿠사 센소지 투어', '도쿄의 랜드마크와 전통적인 사찰 방문', 54930, 30120, '2025-06-15', '2025-06-17', 2, 16, 'SOLD_OUT', '/static/img/product/region4/tokyo.jpg',  0, 4, 'INTERNATIONAL', 'TOKYO', 'Japan', 'TOKYO, Japan', 15),
                                                                     ('TOKYO007', 02, 15, 1, '도쿄 타워 & 오다이바 야경 투어', '도쿄의 상징적인 타워와 아름다운 해변 지역의 야경 감상', 49770, 24880, '2025-09-20', '2025-09-20', 3, 15, 'SOLD_OUT', '/static/img/product/region4/tokyo.jpg',  0, 4, 'INTERNATIONAL', 'TOKYO', 'Japan', 'TOKYO, Japan', 15),
                                                                     ('TOKYO008', 02, 15, 11, '도쿄 이자카야 & 골목길 탐방 투어', '도쿄 현지인처럼 즐기는 이자카야 체험과 숨겨진 골목길 탐험', 49890, 27930, '2025-08-10', '2025-08-10', 2, 8, 'ON_SALE', '/static/img/product/region4/tokyo.jpg',  0, 4, 'INTERNATIONAL', 'TOKYO', 'Japan', 'TOKYO, Japan', 15),

                                                                     ('OSAKA001', 02, 16, 10, '오사카 도톤보리 & 신사이바시 먹방 투어', '오사카의 대표적인 번화가에서 맛있는 음식을 즐기는 미식 투어', 54880, 30250, '2025-06-05', '2025-06-05', 1, 12, 'ON_SALE', '/static/img/product/region4/osaka.jpg',  0, 4, 'INTERNATIONAL', 'OSAKA', 'Japan', 'OSAKA, Japan', 16),
                                                                     ('OSAKA002', 02, 16, 13, '오사카 성 & 주택박물관 역사 투어', '오사카의 상징 오사카 성과 옛 오사카의 생활상을 엿볼 수 있는 주택박물관 방문', 49910, 25080, '2025-07-20', '2025-07-20', 2, 18, 'ON_SALE', '/static/img/product/region4/osaka.jpg',  0, 4, 'INTERNATIONAL', 'OSAKA', 'Japan', 'OSAKA, Japan', 16),
                                                                     ('OSAKA003', 02, 16, 9, '오사카 난바 & 신사이바시 쇼핑 투어', '오사카 최대 번화가에서 최신 유행 아이템을 쇼핑하는 투어', 59750, 35160, '2025-06-10', '2025-06-10', 1, 10, 'ON_SALE', '/static/img/product/region4/osaka.jpg',  0, 4, 'INTERNATIONAL', 'OSAKA', 'Japan', 'OSAKA, Japan', 16),

                                                                     ('BANGKOK001', 03, 17, 1, '방콕 시내 투어', '방콕의 주요 명소를 둘러보는 시내 투어', 79870, 45110, '2025-06-01', '2025-06-30', 1, 25, 'ON_SALE', '/static/img/product/region4/bangkok.jpg',  0, 4, 'INTERNATIONAL', 'BANGKOK', 'Thailand', 'BANGKOK, Thailand', 17),
                                                                     ('BANGKOK002', 03, 17, 13, '방콕 왕궁 및 사원 투어', '방콕의 화려한 왕궁과 사원을 탐방하는 투어', 84920, 50330, '2025-06-01', '2025-06-30', 2, 18, 'ON_SALE', '/static/img/product/region4/bangkok.jpg',  0, 4, 'INTERNATIONAL', 'BANGKOK', 'Thailand', 'BANGKOK, Thailand', 17),
                                                                     ('BANGKOK003', 03, 17, 13, '방콕 역사 유적지 심층 탐방 투어', '방콕의 왕궁, 사원 등 역사적인 유적지를 깊이 있게 둘러보는 투어', 89750, 55600, '2025-07-15', '2025-07-18', 1, 25, 'ON_SALE', '/static/img/product/region4/bangkok.jpg',  0, 4, 'INTERNATIONAL', 'BANGKOK', 'Thailand', 'BANGKOK, Thailand', 17),
                                                                     ('BANGKOK004', 03, 17, 8, '방콕 루프탑 바 & 야경 감상 투어', '방콕의 핫한 루프탑 바에서 멋진 야경을 감상하는 로맨틱 투어', 59800, 35170, '2025-06-15', '2025-06-15', 2, 18, 'ON_SALE', '/static/img/product/region4/bangkok.jpg',  0, 4, 'INTERNATIONAL', 'BANGKOK', 'Thailand', 'BANGKOK, Thailand', 17),
                                                                     ('BANGKOK005', 03, 17, 1, '방콕 짜뚜짝 시장 & 활기찬 수상 시장', '활기 넘치는 방콕의 대표 시장들을 둘러보는 투어', 44910, 25040, '2025-06-10', '2025-06-10', 5, 30, 'SOLD_OUT', '/static/img/product/region4/bangkok.jpg',  0, 4, 'INTERNATIONAL', 'BANGKOK', 'Thailand', 'BANGKOK, Thailand', 17),
                                                                     ('BANGKOK006', 03, 17, 10, '방콕 쿠킹 클래스 & 현지 시장 투어', '태국 전통 음식을 배우고 현지 시장을 체험하는 특별한 투어', 70330, 39880, '2025-02-01', '2026-02-01', 2, 10, 'ON_SALE', '/static/img/product/region4/bangkok.jpg',  0, 4, 'INTERNATIONAL', 'BANGKOK', 'Thailand', 'BANGKOK, Thailand', 17),
                                                                     ('BANGKOK007', 03, 17, 11, '방콕 수상 보트 투어 & 사원 탐방', '짜오프라야 강을 따라 보트를 타고 주요 사원들을 둘러보는 투어', 64950, 38120, '2025-08-01', '2025-08-01', 3, 22, 'ON_SALE', '/static/img/product/region4/bangkok.jpg',  0, 4, 'INTERNATIONAL', 'BANGKOK', 'Thailand', 'BANGKOK, Thailand', 17),
                                                                     ('BANGKOK008', 03, 17, 1, '방콕 전통 마사지 & 짐 톰슨 하우스 투어', '태국 전통 마사지로 피로를 풀고 아름다운 짐 톰슨 하우스를 방문하는 힐링 투어', 54890, 30210, '2025-01-15', '2026-01-15', 2, 10, 'ON_SALE', '/static/img/product/region4/bangkok.jpg',  0, 4, 'INTERNATIONAL', 'BANGKOK', 'Thailand', 'BANGKOK, Thailand', 17),

                                                                     ('PARIS001', 04, 18, 1, '파리 근교 프리미엄 골프 투어', '파리 근교의 프리미엄 골프 코스를 즐기는 투어', 249700, 150150, '2025-07-01', '2025-07-15', 2, 12, 'ON_SALE', '/static/img/product/region5/paris.jpg',  0, 5, 'INTERNATIONAL', 'PARIS', 'France', 'PARIS, France', 18),
                                                                     ('PARIS002', 04, 18, 14, '파리 주요 미술관 탐방 투어', '세계적인 파리 미술관을 방문하는 예술 투어', 119650, 70380, '2025-07-01', '2025-07-31', 1, 8, 'ON_SALE', '/static/img/product/region5/paris.jpg',  0, 5, 'INTERNATIONAL', 'PARIS', 'France', 'PARIS, France', 18),
                                                                     ('PARIS003', 04, 18, 14, '파리 루브르 박물관 & 몽마르뜨 투어', '파리의 대표적인 미술관과 낭만적인 예술가 언덕을 방문하는 투어', 100400, 59890, '2025-08-01', '2025-08-04', 2, 12, 'ON_SALE', '/static/img/product/region5/paris.jpg',  0, 5, 'INTERNATIONAL', 'PARIS', 'France', 'PARIS, France', 18),
                                                                     ('PARIS004', 04, 18, 13, '파리 베르사유 궁전 & 정원 투어', '화려함의 극치 베르사유 궁전과 아름다운 정원을 둘러보는 럭셔리 투어', 129880, 75110, '2025-07-10', '2025-07-12', 1, 8, 'ON_SALE', '/static/img/product/region5/paris.jpg',  0, 5, 'INTERNATIONAL', 'PARIS', 'France', 'PARIS, France', 18),
                                                                     ('PARIS005', 04, 18, 1, '파리 에펠탑 & 센 강 유람선 투어', '파리의 상징 에펠탑을 방문하고 낭만적인 센 강을 따라 유람선을 타는 투어', 89770, 50030, '2025-09-01', '2025-09-01', 2, 10, 'ON_SALE', '/static/img/product/region5/paris.jpg',  0, 5, 'INTERNATIONAL', 'PARIS', 'France', 'PARIS, France', 18),
                                                                     ('PARIS006', 04, 18, 14, '파리 몽마르뜨 언덕 & 화가 체험 투어', '예술가의 거리 몽마르뜨를 거닐고 직접 그림을 그려보는 특별한 체험', 70120, 40350, '2025-10-10', '2025-10-10', 1, 8, 'ON_SALE', '/static/img/product/region5/paris.jpg',  0, 5, 'INTERNATIONAL', 'PARIS', 'France', 'PARIS, France', 18),

                                                                     ('ROME001', 05, 19, 5, '로마 허니문 투어', '역사와 낭만이 가득한 로마에서의 허니문', 129800, 70190, '2025-08-01', '2025-08-31', 2, 8, 'ON_SALE', '/static/img/product/region5/rome.jpg',  0, 5, 'INTERNATIONAL', 'ROME', 'Italy', 'ROME, Italy', 19),
                                                                     ('ROME002', 05, 19, 1, '로마 고대 유적 투어', '로마의 콜로세움, 포로 로마노 등 고대 유적을 탐험', 89750, 45310, '2025-08-01', '2025-08-31', 3, 12, 'ON_SALE', '/static/img/product/region5/rome.jpg',  0, 5, 'INTERNATIONAL', 'ROME', 'Italy', 'ROME, Italy', 19),
                                                                     ('ROME003', 05, 19, 15, '로마 오페라 관람 & 야경 투어', '로마에서 유명 오페라를 감상하고 아름다운 야경 명소를 방문하는 투어', 199660, 150440, '2025-09-05', '2025-09-08', 2, 8, 'ON_SALE', '/static/img/product/region5/rome.jpg',  0, 5, 'INTERNATIONAL', 'ROME', 'Italy', 'ROME, Italy', 19),
                                                                     ('ROME004', 05, 19, 13, '로마 바티칸 & 천사의 성 투어', '카톨릭의 중심지 바티칸과 웅장한 천사의 성을 방문하는 역사 투어', 110500, 64920, '2025-08-10', '2025-08-12', 3, 12, 'ON_SALE', '/static/img/product/region5/rome.jpg',  0, 5, 'INTERNATIONAL', 'ROME', 'Italy', 'ROME, Italy', 19),
                                                                     ('ROME005', 05, 19, 13, '로마 콜로세움 & 포로 로마노 심층 투어', '고대 로마의 중심지 콜로세움과 포로 로마노를 깊이 있게 탐험하는 역사 투어', 129910, 75630, '2025-10-01', '2025-10-01', 3, 15, 'ON_SALE', '/static/img/product/region5/rome.jpg',  0, 5, 'INTERNATIONAL', 'ROME', 'Italy', 'ROME, Italy', 19),
                                                                     ('ROME006', 05, 19, 1, '로마 트레비 분수 & 아름다운 스페인 광장', '로마의 아름다운 명소들을 걸으며 감상하는 투어', 79880, 40150, '2025-08-18', '2025-08-18', 2, 15, 'SOLD_OUT', '/static/img/product/region5/rome.jpg',  0, 5, 'INTERNATIONAL', 'ROME', 'Italy', 'ROME, Italy', 19),
                                                                     ('ROME007', 05, 19, 14, '로마 바티칸 박물관 & 시스티나 성당 투어', '미켈란젤로의 걸작이 있는 시스티나 성당과 바티칸 박물관을 관람하는 예술 투어', 110300, 65080, '2025-11-15', '2025-11-15', 2, 12, 'ON_SALE', '/static/img/product/region5/rome.jpg',  0, 5, 'INTERNATIONAL', 'ROME', 'Italy', 'ROME, Italy', 19),

                                                                     ('NEWYORK001', 06, 20, 6, '뉴욕 실버 시티 투어', '편안하게 즐기는 뉴욕의 시니어 투어', 107650, 65090, '2025-08-01', '2025-08-15', 1, 15, 'ON_SALE', '/static/img/product/region6/newyork.jpg',  0, 6, 'INTERNATIONAL', 'NEWYORK', 'United States', 'NEWYORK, United States', 20),
                                                                     ('NEWYORK002', 06, 20, 15, '뉴욕 뮤지컬 투어', '브로드웨이 뮤지컬 관람 및 뉴욕 문화 체험', 249810, 201550, '2025-09-01', '2025-09-30 ', 1, 10, 'ON_SALE', '/static/img/product/region6/newyork.jpg',  0, 6, 'INTERNATIONAL', 'NEWYORK', 'United States', 'NEWYORK, United States', 20),
                                                                     ('NEWYORK003', 06, 20, 7, '뉴욕 센트럴 파크 & 자연사 박물관 투어', '뉴욕의 대표적인 공원과 자연사 박물관을 탐험하는 투어', 134770, 80340, '2025-10-10', '2025-10-12', 1, 15, 'ON_SALE', '/static/img/product/region6/newyork.jpg',  0, 6, 'INTERNATIONAL', 'NEWYORK', 'United States', 'NEWYORK, United States', 20),
                                                                     ('NEWYORK004', 06, 20, 11, '뉴욕 브로드웨이 & 타임스퀘어 투어', '뉴욕 브로드웨이에서 인기 뮤지컬 거리와 화려한 타임스퀘어를 경험하는 투어', 54900, 30180, '2025-09-10', '2025-09-12', 1, 10, 'ON_SALE', '/static/img/product/region6/newyork.jpg',  0, 6, 'INTERNATIONAL', 'NEWYORK', 'United States', 'NEWYORK, United States', 20),
                                                                     ('NEWYORK005', 06, 20, 6, '뉴욕 자유의 여신상 & 웅장한 엠파이어 스테이트 빌딩', '뉴욕의 상징적인 랜드마크를 방문하는 필수 코스', 159880, 154720, '2025-09-15', '2025-09-15', 3, 10, 'SOLD_OUT', '/static/img/product/region6/newyork.jpg',  0, 6, 'INTERNATIONAL', 'NEWYORK', 'United States', 'NEWYORK, United States', 20),
                                                                     ('NEWYORK006', 06, 20, 1, '뉴욕 자유의 여신상 & 엘리스 섬 투어', '뉴욕의 상징 자유의 여신상과 이민 역사를 담은 엘리스 섬을 방문하는 투어', 184910, 95330, '2025-11-01', '2025-11-01', 1, 10, 'ON_SALE', '/static/img/product/region6/newyork.jpg',  0, 6, 'INTERNATIONAL', 'NEWYORK', 'United States', 'NEWYORK, United States', 20),
                                                                     ('NEWYORK007', 06, 20, 14, '뉴욕 현대 미술관(MoMA) & 록펠러 센터 투어', '세계적인 현대 미술 작품을 감상하고 뉴욕 시내를 한눈에 담을 수 있는 록펠러 센터 방문', 179500, 120660, '2025-12-10', '2025-12-10', 2, 8, 'ON_SALE', '/static/img/product/region6/newyork.jpg',  0, 6, 'INTERNATIONAL', 'NEWYORK', 'United States', 'NEWYORK, United States', 20),

                                                                     ('MALE001', 07, 21, 4, '몰디브 해양 액티비티', '몰디브의 아름다운 바다에서 즐기는 액티비티 투어', 87650, 50190, '2025-10-01', '2025-10-31', 4, 15, 'ON_SALE', '/static/img/product/region7/maldive.jpg',  0, 7, 'INTERNATIONAL', 'MALE', 'Maldives', 'MALE, Maldives', 21),
                                                                     ('MALE002', 07, 21, 12, '몰디브 스노클링 & 해변 휴양 투어', '몰디브의 아름다운 바다에서 스노클링을 즐기고 프라이빗 해변에서 휴식을 취하는 투어', 64880, 39950, '2025-10-15', '2025-10-18', 4, 15, 'ON_SALE', '/static/img/product/region7/maldive.jpg',  0, 7, 'INTERNATIONAL', 'MALE', 'Maldives', 'MALE, Maldives', 21),
                                                                     ('MALE003', 07, 21, 12, '몰디브 섬 호핑 & 스노클링 투어', '다양한 몰디브의 섬들을 방문하여 스노클링을 즐기는 해양 액티비티 투어', 59700, 35340, '2025-11-01', '2025-11-03', 4, 12, 'ON_SALE', '/static/img/product/region7/maldive.jpg',  0, 7, 'INTERNATIONAL', 'MALE', 'Maldives', 'MALE, Maldives', 21),
                                                                     ('MALE004', 07, 21, 3, '몰디브 선셋 크루즈 & 로맨틱 디너', '아름다운 몰디브의 석양을 감상하며 즐기는 로맨틱한 저녁 식사', 124930, 70210, '2025-12-15', '2025-12-15', 2, 6, 'ON_SALE', '/static/img/product/region7/maldive.jpg',  0, 7, 'INTERNATIONAL', 'MALE', 'Maldives', 'MALE, Maldives', 21),

                                                                     ('SYDNEY001', 08, 22, 5, '시드니 오페라 하우스 투어', '시드니 오페라 하우스와 하버 브릿지를 탐방', 139880, 80150, '2025-11-01', '2025-11-30', 2, 10, 'ON_SALE', '/static/img/product/region7/sydney.jpg',  0, 7, 'INTERNATIONAL', 'SYDNEY', 'Australia', 'SYDNEY, Australia', 22),
                                                                     ('SYDNEY002', 08, 22, 13, '시드니 하버 브릿지 클라이밍 & 오페라 하우스 내부 투어', '시드니 하버 브릿지를 등반하고 오페라 하우스 내부를 관람하는 특별한 경험', 151020, 91370, '2025-11-10', '2025-11-12', 2, 10, 'ON_SALE', '/static/img/product/region7/sydney.jpg',  0, 7, 'INTERNATIONAL', 'SYDNEY', 'Australia', 'SYDNEY, Australia', 22),
                                                                     ('SYDNEY003', 08, 22, 5, '시드니 하버를 가로지르는 특별한 크루즈', '시드니의 아름다운 항만을 따라 즐기는 크루즈', 119750, 70440, '2025-11-15', '2025-11-15', 4, 18, 'SOLD_OUT', '/static/img/product/region7/sydney.jpg',  0, 7, 'INTERNATIONAL', 'SYDNEY', 'Australia', 'SYDNEY, Australia', 22),
                                                                     ('SYDNEY004', 08, 22, 7, '시드니 블루 마운틴 & 자연 탐험 투어', '웅장한 블루 마운틴의 아름다운 자연을 탐험하는 트레킹 투어', 144600, 85290, '2025-12-01', '2025-12-02', 3, 10, 'ON_SALE', '/static/img/product/region7/sydney.jpg',  0, 7, 'INTERNATIONAL', 'SYDNEY', 'Australia', 'SYDNEY, Australia', 22),
                                                                     ('SYDNEY005', 08, 22, 12, '시드니 본다이 비치 & 서핑 레슨', '시드니의 대표적인 해변 본다이에서 서핑을 배우고 자유시간을 즐기는 투어', 129910, 75630, '2025-01-10', '2026-01-10', 1, 15, 'ON_SALE', '/static/img/product/region7/sydney.jpg',  0, 7, 'INTERNATIONAL', 'SYDNEY', 'Australia', 'SYDNEY, Australia', 22),

                                                                     ('DUBAI001', 09, 23, 6, '두바이 럭셔리 쇼핑 투어', '두바이의 럭셔리 쇼핑몰과 랜드마크를 방문', 139550, 80880, '2025-12-01', '2025-12-31', 3, 12, 'ON_SALE', '/static/img/product/region4/dubai.jpg',  0, 4, 'INTERNATIONAL', 'DUBAI', 'United Arab Emirates', 'DUBAI, United Arab Emirates', 23),
                                                                     ('DUBAI002', 09, 23, 14, '두바이 사막 사파리 & 벨리댄스 투어', '두바이의 광활한 사막에서 사파리 투어를 즐기고 전통 벨리댄스 공연을 관람하는 투어', 81300, 50770, '2025-12-10', '2025-12-12', 3, 12, 'ON_SALE', '/static/img/product/region4/dubai.jpg',  0, 4, 'INTERNATIONAL', 'DUBAI', 'United Arab Emirates', 'DUBAI, United Arab Emirates', 23),
                                                                     ('DUBAI003', 09, 23, 6, '두바이 부르즈 할리파 & 환상적인 두바이 몰', '세계 최고층 빌딩과 거대한 쇼핑몰을 방문하는 투어', 101820, 60310, '2025-12-15', '2025-12-15', 2, 12, 'SOLD_OUT', '/static/img/product/region4/dubai.jpg',  0, 4, 'INTERNATIONAL', 'DUBAI', 'United Arab Emirates', 'DUBAI, United Arab Emirates', 23),
                                                                     ('DUBAI004', 09, 23, 1, '두바이 몰 분수 쇼 & 야경 투어', '세계 최대 규모의 두바이 몰 분수 쇼와 화려한 야경을 감상하는 투어', 104940, 65120, '2025-01-05', '2026-01-05', 2, 10, 'ON_SALE', '/static/img/product/region4/dubai.jpg',  0, 4, 'INTERNATIONAL', 'DUBAI', 'United Arab Emirates', 'DUBAI, United Arab Emirates', 23),
                                                                     ('DUBAI005', 09, 23, 10, '두바이 전통 시장 & 향신료 체험 투어', '두바이의 전통 시장을 방문하여 다양한 향신료와 문화를 체험하는 투어', 55230, 29880, '2025-02-10', '2026-02-10', 3, 15, 'ON_SALE', '/static/img/product/region4/dubai.jpg',  0, 4, 'INTERNATIONAL', 'DUBAI', 'United Arab Emirates', 'DUBAI, United Arab Emirates', 23),

                                                                     ('CAPETOWN001', 10, 24, 4, '케이프타운 자연 투어', '케이프타운의 아름다운 자연 경관을 감상', 60110, 34950, '2025-05-01', '2025-05-31', 2, 8, 'ON_SALE', '/static/img/product/region8/capetown.jpg',  0, 8, 'INTERNATIONAL', 'CAPETOWN', 'South Africa', 'CAPETOWN, South Africa', 24),
                                                                     ('CAPETOWN002', 10, 24, 15, '케이프타운 테이블 마운틴 & 와이너리 투어', '케이프타운의 상징 테이블 마운틴을 방문하고 아름다운 와이너리에서 와인을 시음하는 투어', 154880, 114700, '2025-05-15', '2025-05-17', 2, 8, 'ON_SALE', '/static/img/product/region8/capetown.jpg',  0, 8, 'INTERNATIONAL', 'CAPETOWN', 'South Africa', 'CAPETOWN, South Africa', 24),
                                                                     ('CAPETOWN003', 10, 24, 4, '케이프타운 희망봉 & 귀여운 아프리카 펭귄', '아프리카 대륙의 남쪽 끝과 귀여운 펭귄을 만나는 투어', 134920, 70260, '2025-05-22', '2025-05-22', 3, 10, 'SOLD_OUT', '/static/img/product/region8/capetown.jpg',  0, 8, 'INTERNATIONAL', 'CAPETOWN', 'South Africa', 'CAPETOWN, South Africa', 24),
                                                                     ('CAPETOWN004', 10, 24, 1, '케이프타운 희망봉 & 케이블카 투어', '아프리카 최남단 희망봉을 방문하고 테이블 마운틴 케이블카를 탑승하는 투어', 101500, 59800, '2025-02-01', '2026-02-020', 2, 8, 'ON_SALE', '/static/img/product/region8/capetown.jpg',  0, 8, 'INTERNATIONAL', 'CAPETOWN', 'South Africa', 'CAPETOWN, South Africa', 24),
                                                                     ('CAPETOWN005', 10, 24, 12, '케이프타운 해변 & 해양 스포츠 체험', '케이프타운의 아름다운 해변에서 다양한 해양 스포츠를 즐기는 액티비티 투어', 80370, 49910, '2025-03-10', '2026-03-10', 1, 12, 'ON_SALE', '/static/img/product/region8/capetown.jpg',  0, 8, 'INTERNATIONAL', 'CAPETOWN', 'South Africa', 'CAPETOWN, South Africa', 24),

                                                                     ('TORONTO001', 11, 25, 1, '토론토 CN 타워 & 로열 온타리오 박물관 투어', '토론토의 랜드마크 CN 타워에서 아찔한 전망을 감상하고, 캐나다 최대 규모의 로열 온타리오 박물관에서 역사와 문화를 탐방하는 핵심 투어', 95380, 70110, '2025-09-15', '2025-09-15', 2, 15, 'ON_SALE', '/static/img/product/region6/toronto.jpg',  0, 6, 'INTERNATIONAL', 'TORONTO', 'Canada', 'TORONTO, Canada', 25),
                                                                     ('TORONTO002', 11, 25, 12, '토론토 출발! 나이아가라 폭포 & 와이너리 체험 일일 투어', '세계적인 명소 나이아가라 폭포의 웅장함을 느끼고, 주변 아이스와인 와이너리에서 특별한 시음까지 즐기는 어드벤처 가득한 하루', 137990, 100420, '2025-10-20', '2025-10-20', 4, 20, 'ON_SALE', '/static/img/product/region6/toronto.jpg',  0, 6, 'INTERNATIONAL', 'TORONTO', 'Canada', 'TORONTO, Canada', 25),

                                                                     ('BEIJING002', 12, 26, 9, '베이징 왕푸징 거리 & 이화원 쇼핑 투어', '활기찬 쇼핑 거리와 아름다운 황실 정원 방문', 95350, 47810, '2025-07-10', '2025-07-12', 4, 20, 'SOLD_OUT', '/static/img/product/region4/beijing.jpg',  0, 4, 'INTERNATIONAL', 'BEIJING', 'China', 'BEIJING, China', 26),
                                                                     ('BEIJING003', 12, 26, 13, '베이징 만리장성 & 명 13릉 투어', '웅장한 만리장성과 명나라 황제들의 무덤 방문', 140180, 69750, '2025-11-01', '2025-11-03', 4, 18, 'CLOSED', '/static/img/product/region4/beijing.jpg',  0, 4, 'INTERNATIONAL', 'BEIJING', 'China', 'BEIJING, China', 26),
                                                                     ('BEIJING004', 12, 26, 15, '베이징 서커스 & 딤섬 맛집 투어', '중국 전통 서커스 관람과 맛있는 딤섬 맛집 방문', 110590, 54930, '2025-07-15', '2025-07-15', 3, 20, 'CLOSED', '/static/img/product/region4/beijing.jpg',  0, 4, 'INTERNATIONAL', 'BEIJING', 'China', 'BEIJING, China', 26),
                                                                     ('BEIJING005', 12, 26, 13, '베이징 자금성 & 천단 공원 역사 투어', '중국의 대표적인 황궁 자금성과 하늘에 제사를 지내던 천단 공원을 방문하는 투어', 110270, 55160, '2025-03-01', '2026-03-01', 4, 25, 'ON_SALE', '/static/img/product/region4/beijing.jpg',  0, 4, 'INTERNATIONAL', 'BEIJING', 'China', 'BEIJING, China', 26),
                                                                     ('BEIJING006', 12, 26, 1, '베이징 후통 & 전통 가옥 체험 투어', '베이징의 옛 골목길 후통을 탐험하고 전통 가옥을 방문하여 중국 문화를 체험하는 투어', 90840, 44700, '2025-04-10', '2026-04-10', 2, 15, 'ON_SALE', '/static/img/product/region4/beijing.jpg',  0, 4, 'INTERNATIONAL', 'BEIJING', 'China', 'BEIJING, China', 26),

                                                                     ('SHANGHAI001', 12, 27, 16, '상하이 야경 & 유람선 투어', '황푸 강을 따라 펼쳐지는 상하이의 화려한 야경을 감상하는 로맨틱 투어', 120610, 59890, '2025-06-10', '2025-10-10', 2, 15, 'ON_SALE', '/static/img/product/region4/shanghai.jpeg',  0, 4, 'INTERNATIONAL', 'SHANGHAI', 'China', 'SHANGHAI, China', 27),
                                                                     ('SHANGHAI002', 12, 27, 13, '상하이 대한민국 임시정부 청사 & 신천지 투어', '대한민국의 독립운동 역사를 배우고 현대적인 문화 거리 신천지를 둘러보는 투어', 80130, 39940, '2025-07-05', '2025-07-05', 3, 20, 'ON_SALE', '/static/img/product/region4/shanghai.jpeg',  0, 4, 'INTERNATIONAL', 'SHANGHAI', 'China', 'SHANGHAI, China', 27),

                                                                     ('GUANGZHOU001', 12, 28, 1, '광저우 타워 & 주장 신도시 투어', '광저우의 랜드마크 광저우 타워에서 도시 전경을 감상하고 현대적인 주장 신도시를 둘러보는 투어', 100770, 50380, '2025-08-01', '2025-08-01', 2, 12, 'ON_SALE', '/static/img/product/region4/guangzhou.jpg',  0, 4, 'INTERNATIONAL', 'GUANGZHOU', 'China', 'GUANGZHOU, China', 28),
                                                                     ('GUANGZHOU002', 12, 28, 13, '광저우 진씨 서원 & 샤미엔 섬 투어', '화려한 전통 건축물 진씨 서원을 방문하고 이국적인 분위기의 샤미엔 섬을 둘러보는 투어', 70400, 34880, '2025-09-10', '2025-09-10', 4, 25, 'ON_SALE', '/static/img/product/region4/guangzhou.jpg', 0, 4, 'INTERNATIONAL', 'GUANGZHOU', 'China', 'GUANGZHOU, China', 28),

                                                                     ('MADRID001', 13, 29, 14, '마드리드 프라도 미술관 & 레티로 공원 투어', '세계적인 미술관 프라도 미술관을 방문하고 아름다운 레티로 공원에서 여유로운 시간을 보내는 투어', 110760, 54830, '2025-10-01', '2025-10-01', 2, 10, 'ON_SALE', '/static/img/product/region5/madrid.png',  0, 5, 'INTERNATIONAL', 'MADRID', 'Spain', 'MADRID, Spain', 29),
                                                                     ('MADRID002', 13, 29, 13, '마드리드 왕궁 & 오리엔테 광장 투어', '화려한 마드리드 왕궁을 둘러보고 왕궁 앞에 펼쳐진 아름다운 오리엔테 광장을 산책하는 투어', 90190, 45310, '2025-11-05', '2025-11-05', 3, 15, 'ON_SALE', '/static/img/product/region5/madrid.png',  0, 5, 'INTERNATIONAL', 'MADRID', 'Spain', 'MADRID, Spain', 29),

                                                                     ('BARCELONA001', 13, 30, 10, '바르셀로나 캄프 누 & 몬주익 언덕 투어', '축구 성지와 아름다운 야경을 자랑하는 언덕 방문', 150440, 74920, '2025-08-01', '2025-08-03', 2, 12, 'SOLD_OUT', '/static/img/product/region5/barcelona.jpg',  0, 5, 'INTERNATIONAL', 'BARCELONA', 'Spain', 'BARCELONA, Spain', 30),
                                                                     ('BARCELONA002', 13, 30, 14, '바르셀로나 피카소 미술관 & 구엘 공원 투어', '피카소의 예술 세계와 환상적인 구엘 공원 탐험', 160210, 80150, '2025-12-05', '2025-12-07', 3, 14, 'SOLD_OUT', '/static/img/product/region5/barcelona.jpg',  0, 5, 'INTERNATIONAL', 'BARCELONA', 'Spain', 'BARCELONA, Spain', 30),
                                                                     ('BARCELONA003', 13, 30, 3, '바르셀로나 해변 & 타파스 투어', '바르셀로나의 아름다운 해변을 즐기고 맛있는 타파스를 맛보는 투어', 125580, 62700, '2025-08-05', '2025-08-07 19:00:00', 2, 10, 'SOLD_OUT', '/static/img/product/region5/barcelona.jpg', 0, 5, 'INTERNATIONAL', 'BARCELONA', 'Spain', 'BARCELONA, Spain', ''),

                                                                     ('HANOI001', 14, 31, 1, '하노이 호안끼엠 호수 & 구시가지 투어', '하노이의 중심 호안끼엠 호수와 전통적인 구시가지를 둘러보는 투어', 65100, 32870, '2025-07-01', '2026-07-01', 4, 20, 'ON_SALE', '/static/img/product/region4/hanoi.jpg',  0, 4, 'INTERNATIONAL', 'HANOI', 'Vietnam', 'HANOI, Vietnam', 31),
                                                                     ('HANOI002', 14, 31, 13, '하노이 문묘 & 민족학 박물관 투어', '베트남 최초의 대학 문묘와 다양한 민족 문화를 전시하는 박물관을 방문하는 교육적인 투어', 72530, 35910, '2025-08-10', '2026-08-10', 3, 15, 'ON_SALE', '/static/img/product/region4/hanoi.jpg',  0, 4, 'INTERNATIONAL', 'HANOI', 'Vietnam', 'HANOI, Vietnam', 31),

                                                                     ('HOCHIMINH001', 14, 32, 13, '호치민 전쟁 박물관 & 통일궁 투어', '베트남 전쟁의 역사를 보여주는 박물관과 남베트남 대통령궁이었던 통일궁 방문', 68920, 33850, '2025-09-01', '2026-09-01', 2, 18, 'ON_SALE', '/static/img/product/region4/hochiminh.jpg',  0, 4, 'INTERNATIONAL', 'HOCHIMINH', 'Vietnam', 'HOCHIMINH', 32),
                                                                     ('HOCHIMINH002', 14, 32, 1, '호치민 벤탄 시장 & 사이공 강 크루즈', '활기 넘치는 벤탄 시장을 둘러보고 사이공 강을 따라 여유로운 크루즈를 즐기는 투어', 75250, 37660, '2025-10-10', '2026-10-10', 1, 10, 'ON_SALE', '/static/img/product/region4/hochiminh.jpg',  0, 4, 'INTERNATIONAL', 'HOCHIMINH', 'Vietnam', 'HOCHIMINH', 32),

                                                                     ('BERLIN001', 15, 33, 13, '베를린 장벽 & 체크포인트 찰리 투어', '냉전 시대의 상징 베를린 장벽과 체크포인트 찰리를 방문하는 역사 투어', 150880, 74730, '2025-11-01', '2026-11-01', 3, 15, 'ON_SALE', '/static/img/product/region5/berlin.jpg', 0, 5, 'INTERNATIONAL', 'BERLIN', 'Germany', 'BERLIN, Germany', 33),
                                                                     ('BERLIN002', 15, 33, 1, '베를린 브란덴부르크 문 & 국회의사당 투어', '베를린의 상징 브란덴부르크 문과 독일 연방 의회 의사당을 방문하는 투어', 130150, 65040, '2025-12-10', '2026-12-10', 2, 12, 'ON_SALE', '/static/img/product/region5/berlin.jpg',  0, 5, 'INTERNATIONAL', 'BERLIN', 'Germany', 'BERLIN, Germany', 33),

                                                                     ('HAMBURG001', 15, 34, 10, '함부르크 항구 & 어시장 투어', '활기 넘치는 함부르크 항구를 둘러보고 싱싱한 해산물을 맛볼 수 있는 어시장 방문', 110620, 54980, '2025-07-05', '2026-07-05', 1, 10, 'ON_SALE', '/static/img/product/region5/hamburg.jpg', 0, 5, 'INTERNATIONAL', 'HAMBURG', 'Germany', 'HAMBURG, Germany', 34),
                                                                     ('HAMBURG002', 15, 34, 1, '함부르크 시청사 & 알스터 호수 투어', '웅장한 함부르크 시청사를 방문하고 아름다운 알스터 호수 주변을 산책하는 투어', 95370, 48110, '2025-08-15 ', '2026-08-15', 2, 15, 'ON_SALE', '/static/img/product/region5/hamburg.jpg',  0, 5, 'INTERNATIONAL', 'HAMBURG', 'Germany', 'HAMBURG, Germany', 34),

                                                                     ('MUNICH001', 15, 35, 1, '뮌헨 마리엔 광장 & 신/구 시청사 투어', '뮌헨의 중심 마리엔 광장과 아름다운 신/구 시청사를 방문하는 투어', 120900, 59770, '2025-09-05', '2026-09-05', 3, 20, 'ON_SALE', '/static/img/product/region5/munich.jpg', 0, 5, 'INTERNATIONAL', 'MUNICH', 'Germany', 'MUNICH, Germany', 35),
                                                                     ('MUNICH002', 15, 35, 1, '뮌헨 BMW 박물관 & 올림픽 공원 투어', '세계적인 자동차 브랜드 BMW의 역사와 올림픽 공원을 둘러보는 투어', 105450, 52890, '2025-10-20', '2026-10-20', 2, 18, 'ON_SALE', '/static/img/product/region5/munich.jpg',  0, 5, 'INTERNATIONAL', 'MUNICH', 'Germany', 'MUNICH, Germany', 35),

                                                                     ('CAIRO001', 16, 36, 13, '카이로 피라미드 & 스핑크스 투어', '세계적인 불가사의 피라미드와 스핑크스를 방문하는 역사적인 투어', 95650, 47910, '2025-11-01', '2026-11-01', 5, 30, 'ON_SALE', '/static/img/product/region8/cairo.jpg',  0, 8, 'INTERNATIONAL', 'CAIRO', 'Egypt', 'CAIRO, Egypt', 36),
                                                                     ('CAIRO002', 16, 36, 13, '카이로 이집트 박물관 & 나일 강 크루즈', '파라오의 유물을 전시하는 이집트 박물관을 관람하고 나일 강을 따라 유유자적 크루즈를 즐기는 투어', 110330, 55180, '2025-12-15', '2026-12-15', 3, 20, 'ON_SALE', '/static/img/product/region8/cairo.jpg',  0, 8, 'INTERNATIONAL', 'CAIRO', 'Egypt', 'CAIRO, Egypt', 36),

                                                                     ('AUCKLAND001', 17, 37, 1, '오클랜드 스카이 타워 & 하버 브릿지 투어', '오클랜드의 상징 스카이 타워에서 도시 전경을 감상하고 하버 브릿지를 건너는 투어', 120870, 59640, '2025-09-01', '2026-09-01', 2, 10, 'ON_SALE', '/static/img/product/region7/auckland.jpg',  0, 7, 'INTERNATIONAL', 'AUCKLAND', 'New Zealand', 'AUCKLAND, New Zealand', 37),
                                                                     ('AUCKLAND002', 17, 37, 13, '오클랜드 박물관 & 아오테아 광장 투어', '마오리 문화와 뉴질랜드 역사를 전시하는 오클랜드 박물관과 활기찬 아오테아 광장을 방문하는 문화 투어', 95410, 47820, '2025-10-15', '2026-10-15', 3, 15, 'ON_SALE', '/static/img/product/region7/auckland.jpg',  0, 7, 'INTERNATIONAL', 'AUCKLAND', 'New Zealand', 'AUCKLAND, New Zealand', 37),

                                                                     ('RIO_DE_JANEIRO001', 18, 38, 1, '리우 예수상 & 팡 데 아수카르 투어', '리우의 상징 예수상과 아름다운 설탕빵 산을 방문하는 대표적인 투어', 160500, 79880, '2025-07-01', '2026-07-01', 3, 15, 'ON_SALE', '/static/img/product/region6/rio_de_janeiro.jpg',  0, 6, 'INTERNATIONAL', 'RIO_DE_JANEIRO', 'Brazil', 'RIO_DE_JANEIRO, Brazil', 38),
                                                                     ('RIO_DE_JANEIRO002', 18, 38, 1, '리우 코파카바나 & 이파네마 해변 투어', '세계적으로 유명한 코파카바나와 이파네마 해변을 즐기고 주변을 둘러보는 투어', 120340, 60120, '2025-08-15', '2026-08-15', 2, 20, 'ON_SALE', '/static/img/product/region6/rio_de_janeiro.jpg',  0, 6, 'INTERNATIONAL', 'RIO_DE_JANEIRO', 'Brazil', 'RIO_DE_JANEIRO, Brazil', 38),

                                                                     ('SAO_PAULO001', 18, 39, 14, '상파울루 미술관(MASP) & 이비라푸에라 공원 투어', '남미 최대 규모의 미술관 중 하나인 MASP와 넓고 아름다운 이비라푸에라 공원을 방문하는 문화 휴식 투어', 95770, 48300, '2025-09-05', '2026-09-05', 1, 10, 'ON_SALE', '/static/img/product/region6/sao_paulo.jpg',  0, 6, 'INTERNATIONAL', 'SAO PAULO', 'Brazil', 'SAO PAULO, Brazil', 39),
                                                                     ('SAO_PAULO002', 18, 39, 9, '상파울루 시립 시장 & 파울리스타 거리 투어', '다양한 식료품과 기념품을 판매하는 활기찬 시립 시장과 상파울루의 중심 거리 파울리스타를 둘러보는 투어', 80260, 39750, '2025-10-20', '2026-10-20', 2, 15, 'ON_SALE', '/static/img/product/region6/sao_paulo.jpg',  0, 6, 'INTERNATIONAL', 'SAO PAULO', 'Brazil', 'SAO PAULO, Brazil', 39),

                                                                     ('JAKARTA001', 19, 40, 13, '자카르타 국립 박물관 & 독립 광장 투어', '인도네시아의 역사와 문화를 전시하는 국립 박물관과 자카르타의 중심 독립 광장을 방문하는 투어', 55190, 27930, '2025-11-01', '2026-11-01 17:00:00', 4, 22, 'ON_SALE', '/static/img/product/region4/jakarta.jpg',  0, 4, 'INTERNATIONAL', 'JAKARTA', 'Indonesia', 'JAKARTA, Indonesia', 40),
                                                                     ('JAKARTA002', 19, 40, 13, '자카르타 올드타운 (코타 투아) & 파타힐라 광장 투어', '네덜란드 식민지 시대의 흔적이 남아있는 올드타운과 파타힐라 광장을 둘러보는 역사 문화 투어', 62480, 30880, '2025-12-15', '2026-12-15', 3, 18, 'ON_SALE', '/static/img/product/region4/jakarta.jpg',  0, 4, 'INTERNATIONAL', 'JAKARTA', 'Indonesia', 'JAKARTA, Indonesia', 40),

                                                                     ('LONDON001', 20, 41, 13, '런던 타워 & 타워 브릿지 투어', '런던의 역사적인 왕궁 런던 타워와 상징적인 타워 브릿지를 방문하는 투어', 121450, 71080, '2025-09-01', '2026-09-01', 3, 12, 'ON_SALE', '/static/img/product/region5/london.jpg', 0, 5, 'INTERNATIONAL', 'LONDON', 'United Kingdom', 'LONDON, United Kingdom', 41),
                                                                     ('LONDON002', 20, 41, 13, '런던 버킹엄 궁전 & 웨스트민스터 사원 투어', '영국 왕실의 상징 버킹엄 궁전과 역사적인 웨스트민스터 사원을 방문하는 투어', 102890, 60330, '2025-10-15', '2026-10-15', 2, 10, 'ON_SALE', '/static/img/product/region5/london.jpg',  0, 5, 'INTERNATIONAL', 'LONDON', 'United Kingdom', 'LONDON, United Kingdom', 41),

                                                                     ('MANCHESTER001', 20, 42, 1, '맨체스터 국립 축구 박물관 & 올드 트래포드 투어', '축구 팬이라면 놓칠 수 없는 국립 축구 박물관과 맨체스터 유나이티드의 홈 구장 올드 트래포드 방문', 144170, 72560, '2025-11-01', '2026-11-01', 1, 8, 'ON_SALE', '/static/img/product/region5/manchester.png',  0, 5, 'INTERNATIONAL', 'MANCHESTER', 'United Kingdom', 'MANCHESTER, United Kingdom', 42),
                                                                     ('MANCHESTER002', 20, 42, 13, '맨체스터 과학 산업 박물관 & 존 라이랜즈 도서관 투어', '산업 혁명의 중심지 맨체스터의 과학 기술 역사를 보여주는 박물관과 아름다운 고딕 양식의 도서관 방문', 118600, 59110, '2025-12-10', '2026-12-10', 2, 12, 'ON_SALE', '/static/img/product/region5/manchester.png',  0, 5, 'INTERNATIONAL', 'MANCHESTER', 'United Kingdom', 'MANCHESTER, United Kingdom', 42),

                                                                     ('MEXICO_CITY001', 21, 43, 13, '멕시코시티 소칼로 광장 & 국립 궁전 투어', '멕시코의 중심 소칼로 광장과 웅장한 국립 궁전을 방문하는 역사 문화 투어', 101720, 60880, '2025-09-01', '2026-09-01', 4, 25, 'ON_SALE', '/static/img/product/region6/mexico_city.jpg',  0, 6, 'INTERNATIONAL', 'MEXICO_CITY', 'Mexico', 'MEXICO_CITY, Mexico', 43),
                                                                     ('MEXICO_CITY002', 21, 43, 13, '멕시코시티 테오티우아칸 피라미드 투어', '고대 아즈텍 문명의 거대 유적지 테오티우아칸의 태양의 피라미드와 달의 피라미드를 탐험하는 투어', 122050, 70190, '2025-10-15', '2026-10-15', 3, 20, 'ON_SALE', '/static/img/product/region6/mexico_city.jpg',  0, 6, 'INTERNATIONAL', 'MEXICO_CITY', 'Mexico', 'MEXICO_CITY, Mexico', 43),

                                                                     ('MANILA001', 22, 44, 13, '마닐라 인트라무로스 & 산티아고 요새 투어', '스페인 식민지 시대의 성곽 도시 인트라무로스와 역사적인 산티아고 요새를 탐험하는 투어', 71880, 40300, '2025-07-01', '2026-07-01', 4, 22, 'ON_SALE', '/static/img/product/region4/manila.jpg',  0, 4, 'INTERNATIONAL', 'MANILA', 'Philippines', 'MANILA, Philippines', 44),
                                                                     ('MANILA002', 22, 44, 9, '마닐라 그린벨트 & 보니파시오 글로벌 시티 쇼핑 투어', '마닐라의 현대적인 쇼핑 중심지 그린벨트와 보니파시오 글로벌 시티에서 쇼핑을 즐기는 투어', 64910, 35160, '2025-08-15', '2026-08-15', 3, 20, 'ON_SALE', '/static/img/product/region4/manila.jpg',  0, 4, 'INTERNATIONAL', 'MANILA', 'Philippines', 'MANILA, Philippines', 44),

                                                                     ('CEBU001', 22, 45, 12, '세부 막탄 섬 호핑 & 해양 액티비티 투어', '세부 막탄 섬 주변의 아름다운 섬들을 방문하여 스노클링, 다이빙 등 해양 액티비티를 즐기는 투어', 101250, 59870, '2025-09-05', '2026-09-05', 2, 15, 'ON_SALE', '/static/img/product/region4/cebu.jpg',  0, 4, 'INTERNATIONAL', 'CEBU', 'Philippines', 'CEBU, Philippines', 45),
                                                                     ('CEBU002', 22, 45, 13, '세부 시티 역사 & 문화 유적지 투어', '세부 시티의 마젤란의 십자가, 산토니뇨 성당 등 역사적인 유적지와 문화를 체험하는 투어', 60370, 29940, '2025-10-20', '2026-10-20', 1, 10, 'ON_SALE', '/static/img/product/region4/cebu.jpg',  0, 4, 'INTERNATIONAL', 'CEBU', 'Philippines', 'CEBU, Philippines', 45),

                                                                     ('STOCKHOLM001', 23, 46, 13, '스톡홀름 감라스탄 & 왕궁 투어', '스톡홀름의 구시가지 감라스탄의 좁은 골목길을 탐험하고 스웨덴 왕궁을 방문하는 역사 문화 투어', 159700, 90550, '2025-11-01', '2026-11-01', 3, 12, 'ON_SALE', '/static/img/product/region5/stockholm.jpg', 0, 5, 'INTERNATIONAL', 'STOCKHOLM', 'Sweden', 'STOCKHOLM, Sweden', 46),
                                                                     ('STOCKHOLM002', 23, 46, 13, '스톡홀름 바사 박물관 & 스칸센 야외 박물관 투어', '침몰한 전함 바사를 전시하는 바사 박물관과 스웨덴의 전통 가옥과 동물을 볼 수 있는 스칸센 방문', 134810, 105390, '2025-12-15', '2026-12-15', 2, 10, 'ON_SALE', '/static/img/product/region5/stockholm.jpg',  0, 5, 'INTERNATIONAL', 'STOCKHOLM', 'Sweden', 'STOCKHOLM, Sweden', 46),

                                                                     ('BUENOS_AIRES001', 24, 47, 15, '부에노스아이레스 탱고 & 야경 투어', '탱고의 본고장에서 정열적인 탱고 공연을 관람하고 아름다운 부에노스아이레스의 야경을 감상하는 투어', 161040, 80770, '2025-07-01', '2026-07-01', 2, 10, 'ON_SALE', '/static/img/product/region6/buenos_aries.jpg',  0, 6, 'INTERNATIONAL', 'BUENOS AIRES', 'Argentina', 'BUENOS AIRES, Argentina', 47),
                                                                     ('BUENOS_AIRES002', 24, 47, 14, '부에노스아이레스 라 보카 & 산 텔모 지구 투어', '화려한 색감의 건물들이 인상적인 라 보카 지구와 고풍스러운 산 텔모 지구를 둘러보는 문화 투어', 121880, 69930, '2025-08-15', '2026-08-15', 3, 15, 'ON_SALE', '/static/img/product/region6/buenos_aries.jpg',  0, 6, 'INTERNATIONAL', 'BUENOS AIRES', 'Argentina', 'BUENOS AIRES, Argentina', 47),

                                                                     ('SINGAPORE001', 25, 48, 1, '싱가포르 마리나 베이 샌즈 & 가든스 바이 더 베이 투어', '싱가포르의 대표적인 랜드마크 마리나 베이 샌즈와 아름다운 가든스 바이 더 베이를 방문하는 투어', 184330, 155110, '2025-09-01', '2026-09-01', 2, 10, 'ON_SALE', '/static/img/product/region4/singapore.png',  0, 4, 'INTERNATIONAL', 'SINGAPORE', 'Singapore', 'SINGAPORE, Singapore', 48),
                                                                     ('SINGAPORE002', 25, 48, 12, '싱가포르 센토사 섬 & 유니버설 스튜디오 투어', '다양한 어트랙션과 해변을 즐길 수 있는 센토사 섬과 유니버설 스튜디오를 방문하는 즐거운 투어', 219660, 180490, '2025-10-15', '2026-10-15', 1, 8, 'ON_SALE', '/static/img/product/region4/singapore.png',  0, 4, 'INTERNATIONAL', 'SINGAPORE', 'Singapore', 'SINGAPORE, Singapore', 48),

                                                                     ('ZURICH001', 26, 49, 1, '취리히 호수 & 린덴호프 언덕 투어', '아름다운 취리히 호수에서 유람선을 타고 린덴호프 언덕에서 도시 전경을 감상하는 투어', 181520, 101370, '2025-11-01', '2026-11-01', 3, 12, 'ON_SALE', '/static/img/product/region5/zurich.jpg',  0, 5, 'INTERNATIONAL', 'ZURICH', 'Switzerland', 'ZURICH, Switzerland', 49),
                                                                     ('ZURICH002', 26, 49, 9, '취리히 반호프슈트라세 & 구시가지 투어', '세계적으로 유명한 쇼핑 거리 반호프슈트라세와 매력적인 구시가지를 둘러보는 투어', 149800, 89650, '2025-12-10', '2026-12-10', 2, 10, 'ON_SALE', '/static/img/product/region5/zurich.jpg', 0, 5, 'INTERNATIONAL', 'ZURICH', 'Switzerland', 'ZURICH, Switzerland', 49);




INSERT IGNORE INTO tbl_product_theme (product_code, theme_code) VALUES
                                                                    (1,1),
                                                                    (2,7),
                                                                    (3,1),
                                                                    (4,11),
                                                                    (5,15),
                                                                    (6,4),
                                                                    (7,2),
                                                                    (8,8),
                                                                    (9,3),
                                                                    (10,9),
                                                                    (11,7),
                                                                    (12,11),
                                                                    (13,13),
                                                                    (14,4),
                                                                    (15,4),
                                                                    (16,10),
                                                                    (17,5),
                                                                    (18,11),
                                                                    (19,4),
                                                                    (20,13),
                                                                    (21,10),
                                                                    (22,4),
                                                                    (23,4),
                                                                    (24,8),
                                                                    (25,4),
                                                                    (26,13),
                                                                    (27,11),
                                                                    (28,11),
                                                                    (29,11),
                                                                    (30,10),
                                                                    (31,13),
                                                                    (32,10),
                                                                    (33,11),
                                                                    (34,1),
                                                                    (35,1),
                                                                    (36,12),
                                                                    (37,11),
                                                                    (38,13),
                                                                    (39,13),
                                                                    (40,11),
                                                                    (41,14),
                                                                    (42,14),
                                                                    (43,10),
                                                                    (44,4),
                                                                    (45,1),
                                                                    (46,7),
                                                                    (47,6),
                                                                    (48,12),
                                                                    (49,7),
                                                                    (50,15),
                                                                    (51,12),
                                                                    (52,1),
                                                                    (53,1),
                                                                    (54,11),
                                                                    (55,10),
                                                                    (56,13),
                                                                    (57,9),
                                                                    (58,1),
                                                                    (59,13),
                                                                    (60,13),
                                                                    (61,8),
                                                                    (62,1),
                                                                    (63,10),
                                                                    (64,11),
                                                                    (65,1),
                                                                    (66,1),
                                                                    (67,14),
                                                                    (68,14),
                                                                    (69,13),
                                                                    (70,1),
                                                                    (71,14),
                                                                    (72,5),
                                                                    (73,1),
                                                                    (74,15),
                                                                    (75,13),
                                                                    (76,13),
                                                                    (77,1),
                                                                    (78,14),
                                                                    (79,6),
                                                                    (80,15),
                                                                    (81,7),
                                                                    (82,11),
                                                                    (83,6),
                                                                    (84,1),
                                                                    (85,14),
                                                                    (86,4),
                                                                    (87,12),
                                                                    (88,12),
                                                                    (89,3),
                                                                    (90,5),
                                                                    (91,13),
                                                                    (92,5),
                                                                    (93,7),
                                                                    (94,12),
                                                                    (95,6),
                                                                    (96,14),
                                                                    (97,6),
                                                                    (98,1),
                                                                    (99,10),
                                                                    (100,4),
                                                                    (101,15),
                                                                    (102,4),
                                                                    (103,1),
                                                                    (104,12),
                                                                    (105,1),
                                                                    (106,12),
                                                                    (107,9),
                                                                    (108,13),
                                                                    (109,15),
                                                                    (110,13),
                                                                    (111,1),
                                                                    (112,13),
                                                                    (113,1),
                                                                    (114,13),
                                                                    (115,14),
                                                                    (116,13),
                                                                    (117,10),
                                                                    (118,14),
                                                                    (119,3),
                                                                    (120,1),
                                                                    (121,13),
                                                                    (122,13),
                                                                    (123,1),
                                                                    (124,13),
                                                                    (125,1),
                                                                    (126,10),
                                                                    (127,1),
                                                                    (128,1),
                                                                    (129,1),
                                                                    (130,13),
                                                                    (131,13),
                                                                    (132,1),
                                                                    (133,13),
                                                                    (134,1),
                                                                    (135,1),
                                                                    (136,14),
                                                                    (137,9),
                                                                    (138,13),
                                                                    (139,13),
                                                                    (140,13),
                                                                    (141,13),
                                                                    (142,1),
                                                                    (143,13),
                                                                    (144,13),
                                                                    (145,13),
                                                                    (146,13),
                                                                    (147,9),
                                                                    (148,12),
                                                                    (149,13),
                                                                    (150,13),
                                                                    (151,13),
                                                                    (152,15),
                                                                    (153,14),
                                                                    (154,1),
                                                                    (155,12),
                                                                    (156,1),
                                                                    (157,9);
