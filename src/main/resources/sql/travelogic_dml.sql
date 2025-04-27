-- 1. 회원정보 테이블 (tbl_member)
INSERT INTO tbl_member (member_name, member_id, member_password, member_email, member_phone, member_registerdate, member_enddate, member_endstatus, social_type, social_account_id, social_account_ci)
VALUES
-- 일반 사용자
('홍길동', 'hong123', 'password123', 'hong123@example.com', '010-1234-5678', NOW(), NULL, 'N', NULL, NULL, NULL),  -- 일반 사용자 (비밀번호 있음)
-- 소셜 로그인 사용자 (카카오)
('김유진', 'kakao_283498234', NULL, 'kim456@example.com', '010-2345-6789', NOW(), NULL, 'N', 'KAKAO', 283498234, 'abc123'),  -- 소셜 로그인 사용자 (카카오)
-- 소셜 로그인 사용자 (구글)
('박수정', 'google_283498235', NULL, 'park789@example.com', '010-3456-7890', NOW(), '2025-04-25 10:00:00', 'Y', 'GOOGLE', 283498235, 'xyz456');  -- 소셜 로그인 사용자 (구글)

-- 2. 권한 테이블 (tbl_authority)
INSERT INTO tbl_authority (authority_name)
VALUES
    ('ROLE_ADMIN'),  -- 관리자 권한
    ('ROLE_USER');  -- 일반 사용자 권한

-- 3. 회원별권한 테이블 (tbl_member_role)
-- 홍길동: ADMIN 권한
-- 김유진: USER 권한 (소셜 로그인 사용자)
-- 박수정: USER 권한 (소셜 로그인 사용자)
INSERT INTO tbl_member_role (member_code, authority_code)
VALUES
    (1, 1),  -- 홍길동: ADMIN
    (2, 2),  -- 김유진: USER (소셜 로그인 사용자)
    (3, 2);  -- 박수정: USER (소셜 로그인 사용자)



INSERT INTO tbl_region (region_code, region_uid, region_type, region_name) VALUES
                                                                               (1, 'SEOUL_GYEONGGI', 'DOMESTIC', '서울/경기/강원/충청'),
                                                                               (2, 'BUSAN_GYEONGSANG', 'DOMESTIC', '부산/경상/전라'),
                                                                               (3, 'JEJU', 'DOMESTIC', '제주'),
                                                                               (4, 'ASIA', 'INTERNATIONAL', '아시아'),
                                                                               (5, 'EUROPE', 'INTERNATIONAL', '유럽'),
                                                                               (6, 'AMERICAS', 'INTERNATIONAL', '아메리카'),
                                                                               (7, 'OCEANIA', 'INTERNATIONAL', '오세아니아'),
                                                                               (8, 'AFRICA', 'INTERNATIONAL', '아프리카');


INSERT INTO tbl_country (country_code, region_code, country_uid, country_name) VALUES
                                                                                   (1, 4, 'KOR', '대한민국'),
                                                                                   (2, 4, 'JPN', '일본'),
                                                                                   (3, 4, 'THA', '태국'),
                                                                                   (4, 5, 'FRA', '프랑스'),
                                                                                   (5, 5, 'ITA', '이탈리아'),
                                                                                   (6, 6, 'USA', '미국'),
                                                                                   (7, 4, 'MDV', '몰디브'),
                                                                                   (8, 7, 'AUS', '호주'),
                                                                                   (9, 4, 'ARE', '아랍에미리트'),
                                                                                   (10, 8, 'ZAF', '남아프리카공화국');

INSERT INTO tbl_city (city_code, country_code, city_uid, city_name) VALUES
                                                                        (1001, 1, 'SEOUL', '서울'),
                                                                        (1002, 1, 'BUSAN', '부산'),
                                                                        (1003, 1, 'JEJU', '제주'),
                                                                        (1004, 1, 'GANGNEUNG', '강릉'),
                                                                        (1005, 1, 'DAEJEON', '대전'),
                                                                        (1110, 1, 'INCHEON', '인천'),
                                                                        (1101, 2, 'TOKYO', '도쿄'),
                                                                        (1102, 3, 'BANGKOK', '방콕'),
                                                                        (1103, 4, 'PARIS', '파리'),
                                                                        (1104, 5, 'ROME', '로마'),
                                                                        (1105, 6, 'NEWYORK', '뉴욕'),
                                                                        (1106, 7, 'MALE', '말레'),
                                                                        (1107, 8, 'SYDNEY', '시드니'),
                                                                        (1108, 9, 'DUBAI', '두바이'),
                                                                        (1109, 10, 'CAPE_TOWN', '케이프타운');

INSERT INTO tbl_theme (theme_code, theme_uid, theme_name) VALUES
                                                              (1, 'THEME_001', 'TOUR'),
                                                              (2, 'THEME_002', 'GOLF'),
                                                              (3, 'THEME_003', 'CRUISE'),
                                                              (4, 'THEME_004', 'KIDS'),
                                                              (5, 'THEME_005', 'HONEYMOON'),
                                                              (6, 'THEME_006', 'SILVER');

INSERT INTO tbl_product (
    product_code, product_uid, country_code, city_code, theme_code, product_title, product_content,
    product_adult, product_child, product_start_date, product_end_date,
    product_min_participants, product_max_participants,
    product_status, product_thumbnail
) VALUES
            (1, 'SEOUL_001', 1, 1001, 1, '서울 시티 투어', '서울 시내 관광 투어',
             100000, 50000, '2025-05-01 09:00:00', '2025-05-31 18:00:00',
             1, 30, 'ON_SALE', 'seoul_tour.jpg'),
            (2, 'BUSAN_001', 1, 1002, 2, '부산 골프 리조트 투어', '부산 최고의 골프 리조트를 즐기는 패키지',
             250000, 0, '2025-06-01 09:00:00', '2025-06-30 18:00:00',
             2, 20, 'ON_SALE', 'busan_golf.jpg'),
            (3, 'JEJU_001', 1, 1003, 3, '제주 크루즈 투어', '제주 해안을 따라 즐기는 럭셔리 크루즈',
             300000, 150000, '2025-07-01 09:00:00', '2025-07-31 18:00:00',
             10, 100, 'ON_SALE', 'jeju_cruise.jpg'),
            (4, 'GANGNEUNG_001', 1, 1004, 4, '강릉 키즈 체험 투어', '아이들과 함께하는 해변 체험 프로그램',
             90000, 50000, '2025-06-15 09:00:00', '2025-06-30 18:00:00',
             2, 25, 'ON_SALE', 'gangneung_kids.jpg'),
            (5, 'DAEJEON_001', 1, 1005, 5, '대전 허니문 스페셜', '신혼부부를 위한 럭셔리 과학 도시 체험',
             180000, 0, '2025-07-01 09:00:00', '2025-07-15 18:00:00',
             2, 10, 'ON_SALE', 'daejeon_honeymoon.jpg'),
            (6, 'TOKYO_001', 2, 1101, 6, '도쿄 시니어 문화 투어', '실버 세대를 위한 편안한 도쿄 여행',
             160000, 0, '2025-06-01 09:00:00', '2025-06-30 18:00:00',
             1, 20, 'ON_SALE', 'tokyo_silver.jpg'),
            (7, 'BANGKOK_001', 3, 1102, 1, '방콕 시내 투어', '방콕의 주요 명소를 둘러보는 시내 투어',
             90000, 45000, '2025-06-01 09:00:00', '2025-06-30 18:00:00',
             1, 25, 'ON_SALE', 'bangkok_tour.jpg'),
            (8, 'PARIS_001', 4, 1103, 2, '파리 골프 투어', '파리 근교의 프리미엄 골프 코스를 즐기는 투어',
             280000, 0, '2025-07-01 09:00:00', '2025-07-15 18:00:00',
             2, 12, 'ON_SALE', 'paris_golf.jpg'),
            (9, 'ROME_001', 5, 1104, 5, '로마 허니문 투어', '역사와 낭만이 가득한 로마에서의 허니문',
             270000, 0, '2025-08-01 09:00:00', '2025-08-31 18:00:00',
             2, 8, 'ON_SALE', 'rome_honeymoon.jpg'),
            (10, 'NEWYORK_001', 6, 1105, 6, '뉴욕 실버 시티 투어', '편안하게 즐기는 뉴욕의 시니어 투어',
             200000, 0, '2025-08-01 09:00:00', '2025-08-15 18:00:00',
             1, 15, 'ON_SALE', 'newyork_silver.jpg');


INSERT INTO tbl_product_theme (pt_id, product_code, theme_code) VALUES
                                                                    (1, 1, 1),    -- 서울 시티 투어 -> TOUR
                                                                    (2, 2, 2),    -- 부산 골프 리조트 투어 -> GOLF
                                                                    (3, 3, 3),    -- 제주 크루즈 투어 -> CRUISE
                                                                    (4, 4, 4),    -- 강릉 키즈 체험 투어 -> KIDS
                                                                    (5, 5, 5),    -- 대전 허니문 스페셜 -> HONEYMOON
                                                                    (6, 6, 6),    -- 도쿄 시니어 문화 투어 -> SILVER
                                                                    (7, 7, 1),    -- 방콕 시내 투어 -> TOUR
                                                                    (8, 8, 2),    -- 파리 골프 투어 -> GOLF
                                                                    (9, 9, 5),    -- 로마 허니문 투어 -> HONEYMOON
                                                                    (10, 10, 6);  -- 뉴욕 실버 시티 투어 -> SILVER


INSERT INTO tbl_wish_group (member_code, group_title, wish_count) VALUES
                                                                      (1, '파리', 12),
                                                                      (1, '도쿄', 8),
                                                                      (1, '뉴욕', 15),
                                                                      (2, '바르셀로나', 5),
                                                                      (2, '시드니', 9),
                                                                      (3, '로마', 13);

INSERT INTO tbl_wish (member_code, group_code, product_code) VALUES
                                                                 (1, 1, 1),
                                                                 (1, 2, 1),
                                                                 (1, 3, 1),
                                                                 (1, 1, 2),
                                                                 (1, 2, 3),
                                                                 (1, 3, 3),
                                                                 (2, 1, 4),
                                                                 (2, 2, 4),
                                                                 (2, 3, 5),
                                                                 (2, 1, 5),
                                                                 (3, 2, 6),
                                                                 (3, 3, 6);

INSERT INTO tbl_option (product_code, reservation_date, adult_count, child_count) VALUES
                                                                                      (1, '2025-05-20', 2, NULL),
                                                                                      (2, '2025-04-08', 2, 3),
                                                                                      (3, '2025-06-15', 1, 1),
                                                                                      (4, '2025-04-23', 1, 1),
                                                                                      (5, '2025-04-23', 1, 1);

INSERT INTO tbl_order (product_code, option_code, member_code, booking_uid, order_adult_price, order_child_price, total_price, order_date, order_status) VALUES
-- 일반상품: 아동 분리 없음
(1, 1, 1, 'RSV20250401-01', 120000, NULL, 240000, '2025-04-01 10:23:45', 'SCHEDULED'),
-- 디즈니월드: 아동 분리 있음
(2, 2, 1, 'RSV20250401-02', 80000, 50000, 310000, '2025-04-02 14:10:12', 'COMPLETED'),
-- 디즈니월드: 취소된 주문
(3, 3, 1, 'RSV20250401-03', 80000, 50000, 130000, '2025-04-03 09:05:33', 'CANCELED'),
(4, 4, 2, 'RSV20250401-04', 80000, 50000, 130000, '2025-04-03 10:05:33', 'COMPLETED'),
(5, 5, 3, 'RSV20250401-05', 80000, 50000, 130000, '2025-04-04 12:05:33', 'COMPLETED');

INSERT INTO tbl_payment (member_code, order_code, payment_method, payment_brand, payment_time, payment_amount, payment_status, imp_uid, merchant_uid, receipt_url) VALUES
                                                                                                                                                                       (1, 1, '카드', '삼성카드', '2025-04-01 10:23:45', 240000, 'COMPLETED', 'imp_1234567890', 'RSV20250401-01', 'https://receipt.url/1'),
                                                                                                                                                                       (1, 2, '무통장', '신한카드', '2025-04-02 14:10:12', 310000, 'COMPLETED', 'imp_1234567891', 'RSV20250401-02', 'https://receipt.url/2'),
                                                                                                                                                                       (1, 3, '카드', '국민카드', '2025-04-03 09:05:33', 130000, 'CANCELED', 'imp_1234567892', 'RSV20250401-03', 'https://receipt.url/3'),
                                                                                                                                                                       (2, 4, '카드', '롯데카드', '2025-04-04 09:12:33', 130000, 'COMPLETED', 'imp_1234567893', 'RSV20250401-04', 'https://receipt.url/4'),
                                                                                                                                                                       (3, 5, '카드', '우리카드', '2025-04-04 09:15:33', 130000, 'COMPLETED', 'imp_1234567894', 'RSV20250401-05', 'https://receipt.url/5');

INSERT INTO tbl_payment_cancel (payment_code, cancel_time, cancel_amount, pg_tid, cancel_receipt_url) VALUES
    (3, '2025-04-04 11:35:20', 130000, 'pg_cancel_9876543210', 'https://receipt.url/cancel/3');

INSERT INTO tbl_review (member_code, order_code, review_rating, review_content, review_date, review_pic, review_status) VALUES
                                                                                                                            (1, 2, 5, '정말 최고의 디즈니 여행이었어요! 애들도 좋아했어요~', '2025-04-09 14:30:00', 'disney_review.jpg', 'ACTIVE'),
                                                                                                                            (2, 4, 1, NULL, '2025-04-24 09:15:00', NULL, 'DELETE BY ADMIN'),
                                                                                                                            (3, 5, 4, '재밌었음. 나중에 또오겠음.', '2025-04-24 09:15:00', NULL, 'ACTIVE');

-- 4. 이벤트 테이블 (tbl_event)
INSERT INTO tbl_event (event_title, event_content, event_img, event_status)
VALUES
    ('이벤트 1', '첫 번째 이벤트 내용', '/images/event1.jpg', '진행중'),
    ('이벤트 2', '두 번째 이벤트 내용', '/images/event2.jpg', '진행중'),
    ('이벤트 3', '세 번째 이벤트 내용', '/images/event3.jpg', '종료');

-- 5. FAQ 테이블 (tbl_faq)
INSERT INTO tbl_faq (faq_title, faq_content)
VALUES
    ('자주 묻는 질문 1', '첫 번째 FAQ 내용'),
    ('자주 묻는 질문 2', '두 번째 FAQ 내용'),
    ('자주 묻는 질문 3', '세 번째 FAQ 내용');


INSERT INTO tbl_companion (
    comp_id, member_code, comp_member_id, comp_title, comp_created_at, comp_view_count
) VALUES
      (1, 1, 'user001', '5월 황금연휴 강릉 여행 같이 가요!', '2025-04-10 09:00:00', 12),
      (2, 2, 'user002', '도쿄 맛집 투어 멤버 구해요', '2025-04-12 15:20:00', 25),
      (3, 3, 'user003', '부산 당일치기 여행 동행 구해요~', '2025-04-15 11:45:00', 8);

INSERT INTO tbl_companion_comment (
    com_id, member_code, comp_id, com_member_id, com_content, com_created_at
) VALUES
      (1, 2, 1, 'user002', '저 강릉 좋아해요! 같이 가요~', '2025-04-10 10:05:00'),
      (2, 3, 1, 'user003', '일정 맞으면 저도 참여하고 싶어요.', '2025-04-10 11:00:00'),
      (3, 1, 2, 'user001', '맛집 코스 어떻게 짜셨나요?', '2025-04-12 16:00:00'),
      (4, 3, 2, 'user003', '저 도쿄 가는 비행기 이미 예매했어요!', '2025-04-12 16:20:00'),
      (5, 1, 3, 'user001', '부산 좋아요~ 몇 시 출발 예정이신가요?', '2025-04-15 12:00:00');

INSERT INTO tbl_inquiry_chat (
    ic_id, member_code, authority_code, ic_start_date, ic_end_date, ic_chat_status
) VALUES
      (1, 2, 2, '2025-04-20 10:00:00', NULL, 'ACTIVE'),
      (2, 2, 2, '2025-04-21 09:30:00', '2025-04-21 09:45:00', 'CLOSED'),
      (3, 3, 2, '2025-04-22 11:15:00', NULL, 'WAITING');


INSERT INTO tbl_chat (
    chat_id, member_code, chat_uid, chat_title, chat_create_at
) VALUES
      (1, 1, 'CHAT001', '서울 여행 같이 가실 분~', '2025-04-01 10:00:00'),
      (2, 2, 'CHAT002', '도쿄 디즈니 동행 구해요!', '2025-04-05 15:30:00');

INSERT INTO tbl_chat_room_member (
    crm_id, chat_id, member_code, crm_joined_at, crm_is_exited, crm_exited_at
) VALUES
      (1, 1, 1, '2025-04-01 10:00:00', false, NULL),
      (2, 1, 2, '2025-04-01 10:05:00', false, NULL),
      (3, 2, 2, '2025-04-05 15:30:00', false, NULL),
      (4, 2, 3, '2025-04-05 15:35:00', true, '2025-04-05 16:00:00');


INSERT INTO tbl_notification (
    noti_id, member_code, noti_message, noti_is_read, noti_created_at
) VALUES
      (1, 1, '새로운 여행 동행 댓글이 달렸습니다.', false, '2025-04-23 08:30:00'),
      (2, 2, '1:1 문의에 답변이 도착했습니다.', true, '2025-04-22 15:45:00'),
      (3, 1, '예약하신 투어 상품의 일정이 확정되었습니다.', false, '2025-04-23 11:00:00'),
      (4, 3, '회원님의 리뷰에 답글이 달렸습니다.', true, '2025-04-21 17:20:00'),
      (5, 1, '새로운 이벤트가 시작되었습니다! 지금 확인해보세요.', false, '2025-04-24 09:10:00');
