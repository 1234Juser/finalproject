USE travelogicdb;

-- 1. 회원정보 테이블 (tbl_member)
INSERT INTO tbl_member (member_name, member_id, member_password, member_email, member_phone, member_profile_image_url, member_registerdate, member_enddate, member_endstatus, social_type, social_account_id, social_account_ci)
VALUES
-- 일반 사용자
('홍길동', 'hong123', 'password123', 'hong123@example.com', '010-1234-5678', null, NOW(), NULL, 'N', NULL, NULL, NULL),  -- 일반 사용자 (비밀번호 있음)
-- 소셜 로그인 사용자 (카카오)
('김유진', 'kakao_283498234', NULL, 'kim456@example.com', '010-2345-6789', null, NOW(), NULL, 'N', 'KAKAO', 283498234, 'abc123'),  -- 소셜 로그인 사용자 (카카오)
-- 소셜 로그인 사용자 (구글)
('박수정', 'google_283498235', NULL, 'park789@example.com', '010-3456-7890', null, NOW(), '2025-04-25 10:00:00', 'Y', 'GOOGLE', 283498235, 'xyz456');  -- 소셜 로그인 사용자 (구글)

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




INSERT INTO tbl_region (region_code, region_uid, region_name, region_type) VALUES
    #1
    (1,'SEOULGYEONGGI', '서울/경기/강원/충청', 'DOMESTIC'),
    #2
    (2,'BUSANGYEONGSANG', '부산/경상/전라', 'DOMESTIC'),
    #3
    (3,'JEJU', '제주', 'DOMESTIC'),
    #4
    (4,'ASIA', '아시아', 'INTERNATIONAL'),
    #5
    (5,'EUROPE', '유럽', 'INTERNATIONAL'),
    #6
    (6,'AMERICAS', '아메리카', 'INTERNATIONAL'),
    #7
    (7,'OCEANIA', '오세아니아', 'INTERNATIONAL'),
    #8
    (8,'AFRICA', '아프리카', 'INTERNATIONAL');


INSERT INTO tbl_country (country_code, region_code, country_uid, country_name) VALUES
    #01
    (01,4, 'KR01', '대한민국'),
    #02
    (02,4, 'JP02', '일본'),
    #03
    (03,4, 'TH03', '태국'),
    #04
    (04,5, 'FR04', '프랑스'),
    #05
    (05,5, 'IT05', '이탈리아'),
    #06
    (06,6, 'US06', '미국'),
    #07
    (07,4, 'MV07', '몰디브'),
    #08
    (08,7, 'AU08', '호주'),
    #09
    (09,4, 'AE09', '아랍에미리트'),
    #10
    (10,8, 'ZA10', '남아프리카공화국');


INSERT INTO tbl_city (city_code, country_id, city_uid, city_name, city_name_kr, region_code) VALUES
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
                                                                                                 (0301, 03, 'BANGKOK0301', 'BANGKOK', '방콕', 4),
                                                                                                 (0401, 04, 'PARIS0401', 'PARIS', '파리', 5),
                                                                                                 (0501, 05, 'ROME0501', 'ROME', '로마', 5),
                                                                                                 (0601, 06, 'NEWYORK0601', 'NEWYORK', '뉴욕', 6),
                                                                                                 (0701, 07, 'MALE0701', 'MALE', '말레', 7),
                                                                                                 (0801, 08, 'SYDNEY0801', 'SYDNEY', '시드니', 7),
                                                                                                 (0901, 09, 'DUBAI0901', 'DUBAI', '두바이', 4),
                                                                                                 (1001, 10, 'CAPE_TOWN1001', 'CAPETOWN', '케이프타운', 8);
INSERT INTO tbl_theme (theme_code, theme_uid, theme_name) VALUES
#1
(1,'THEME_001', 'TOUR'),
#2
(2,'THEME_002', 'GOLF'),
#3
(3,'THEME_003', 'CRUISE'),
#4
(4,'THEME_004', 'KIDS'),
#5
(5,'THEME_005', 'HONEYMOON'),
#6
(6,'THEME_006', 'SILVER');

INSERT INTO tbl_product (
    product_uid, country_id, city_id, theme_code,
    product_title, product_content, product_adult, product_child,
    product_start_date, product_end_date, product_min_participants,
    product_max_participants, product_status, product_thumbnail, review_count
) VALUES
      -- 기존 데이터 수정
      ('SEOUL001', 01, 1, 1, '서울 시티 투어', '서울 시내 관광 투어',
       100000, 50000, '2025-05-01 09:00:00', '2025-05-31 18:00:00',
       1, 30, 'ON_SALE', 'seoul_tour.jpg', 0),
      ('BUSAN001', 01, 2, 2, '부산 골프 리조트 투어', '부산 최고의 골프 리조트를 즐기는 패키지',
       250000, 0, '2025-06-01 09:00:00', '2025-06-30 18:00:00',
       2, 20, 'ON_SALE', 'busan_golf.jpg', 0),
      ('JEJU001', 01, 3, 3, '제주 크루즈 투어', '제주 해안을 따라 즐기는 럭셔리 크루즈',
       300000, 150000, '2025-07-01 09:00:00', '2025-07-31 18:00:00',
       10, 100, 'ON_SALE', 'jeju_cruise.jpg', 0),
      ('GANGNEUNG001', 01, 4, 4, '강릉 키즈 체험 투어', '아이들과 함께하는 해변 체험 프로그램',
       90000, 50000, '2025-06-15 09:00:00', '2025-06-30 18:00:00',
       2, 25, 'ON_SALE', 'gangneung_kids.jpg', 0),
      ('DAEJEON001', 01, 5, 5, '대전 허니문 스페셜', '신혼부부를 위한 럭셔리 과학 도시 체험',
       180000, 0, '2025-07-01 09:00:00', '2025-07-15 18:00:00',
       2, 10, 'ON_SALE', 'daejeon_honeymoon.jpg', 0),
      ('TOKYO001', 02, 15, 6, '도쿄 시니어 문화 투어', '실버 세대를 위한 편안한 도쿄 여행',
       160000, 0, '2025-06-01 09:00:00', '2025-06-30 18:00:00',
       1, 20, 'ON_SALE', 'tokyo_silver.jpg', 0),
      ('BANGKOK001', 03, 16, 1, '방콕 시내 투어', '방콕의 주요 명소를 둘러보는 시내 투어',
       90000, 45000, '2025-06-01 09:00:00', '2025-06-30 18:00:00',
       1, 25, 'ON_SALE', 'bangkok_tour.jpg', 0),
      ('PARIS001', 04, 17, 2, '파리 골프 투어', '파리 근교의 프리미엄 골프 코스를 즐기는 투어',
       280000, 0, '2025-07-01 09:00:00', '2025-07-15 18:00:00',
       2, 12, 'ON_SALE', 'empty-list.jpeg', 0),
      ('ROME001', 05, 18, 5, '로마 허니문 투어', '역사와 낭만이 가득한 로마에서의 허니문',
       270000, 0, '2025-08-01 09:00:00', '2025-08-31 18:00:00',
       2, 8, 'ON_SALE', 'rome_honeymoon.jpg', 0),
      ('NEWYORK001', 06, 19, 6, '뉴욕 실버 시티 투어', '편안하게 즐기는 뉴욕의 시니어 투어',
       200000, 0, '2025-08-01 09:00:00', '2025-08-15 18:00:00',
       1, 15, 'ON_SALE', 'newyork_silver.jpg', 0),
      -- 추가 더미 데이터
      ('CHUNCHEON001', 01, 7, 4, '춘천 가족 여행', '춘천의 아름다운 자연을 담은 가족 여행',
       120000, 60000, '2025-05-01', '2025-05-31', 3, 20, 'ON_SALE', 'chuncheon_family.jpg', 0),
      ('SUWON001', 01, 8, 3, '수원 역사 탐방', '수원화성을 중심으로 한 역사 여행',
       90000, 70000, '2025-06-01', '2025-06-30', 2, 15, 'ON_SALE', 'suwon_history.jpg', 0),
      ('CHEONGJU001', 01, 9, 5, '청주 힐링 여행', '청주의 자연과 문화를 느낄 수 있는 힐링 여행',
       110000, 55000, '2025-07-01', '2025-07-31', 1, 10, 'ON_SALE', 'cheongju_healing.jpg', 0),
      ('DAEGU001', 01, 10, 1, '대구 미식 투어', '대구의 다양한 먹거리를 탐방하는 미식 여행',
       100000, 50000, '2025-08-01', '2025-08-31', 2, 20, 'ON_SALE', 'daegu_food.jpg', 0),
      ('JEONJU001', 01, 11, 2, '전주 한옥마을 투어', '전주 한옥마을의 전통과 멋을 느낄 수 있는 여행',
       95000, 65000, '2025-09-01', '2025-09-30', 3, 18, 'ON_SALE', 'jeonju_hanok.jpg', 0),
      ('GYEONGJU001', 01, 12, 3, '경주 신라 역사 투어', '신라 천년의 역사를 따라가는 경주 여행',
       120000, 80000, '2025-10-01', '2025-10-31', 1, 12, 'ON_SALE', 'gyeongju_history.jpg', 0),
      ('GWANGJU001', 01, 13, 5, '광주 예술 여행', '광주의 예술과 문화를 체험하는 특별한 여행',
       105000, 60000, '2025-11-01', '2025-11-30', 2, 15, 'ON_SALE', 'gwangju_art.jpg', 0),
      ('ULSAN001', 01, 14, 4, '울산 산업 탐방', '울산의 자동차, 조선 산업 현장을 견학하는 투어',
       130000, 90000, '2025-12-01', '2025-12-31', 5, 25, 'ON_SALE', 'ulsan_industry.jpg', 0),
      ('TOKYO002', 02, 15, 1, '도쿄 쇼핑 투어', '도쿄의 다양한 쇼핑 명소를 방문하는 즐거운 투어',
       140000, 70000, '2025-05-01', '2025-05-31', 1, 10, 'ON_SALE', 'tokyo_shopping.jpg', 0),
      ('BANGKOK002', 03, 16, 2, '방콕 왕궁 및 사원 투어', '방콕의 화려한 왕궁과 사원을 탐방하는 투어',
       110000, 55000, '2025-06-01', '2025-06-30', 2, 18, 'ON_SALE', 'bangkok_temple.jpg', 0),
      ('PARIS002', 04, 17, 3, '파리 미술관 투어', '세계적인 파리 미술관을 방문하는 예술 투어',
       250000, 125000, '2025-07-01', '2025-07-31', 1, 8, 'ON_SALE', '/img/empty/empty-list.jpeg', 0),
      ('ROME002', 05, 18, 1, '로마 고대 유적 투어', '로마의 콜로세움, 포로 로마노 등 고대 유적을 탐험',
       220000, 110000, '2025-08-01', '2025-08-31', 3, 12, 'ON_SALE', '/img/empty/empty-list.jpeg', 0),
      ('NEWYORK002', 06, 19, 2, '뉴욕 뮤지컬 투어', '브로드웨이 뮤지컬 관람 및 뉴욕 문화 체험',
       280000, 140000, '2025-09-01', '2025-09-30', 1, 10, 'ON_SALE', '/img/empty/empty-list.jpeg', 0),
      ('MALE001', 07, 20, 4, '몰디브 해양 액티비티', '몰디브의 아름다운 바다에서 즐기는 액티비티 투어',
       350000, 200000, '2025-10-01', '2025-10-31', 4, 15, 'ON_SALE', '/img/empty/empty-list.jpeg', 0),
      ('SYDNEY001', 08, 21, 5, '시드니 오페라 하우스 투어', '시드니 오페라 하우스와 하버 브릿지를 탐방',
       200000, 100000, '2025-11-01', '2025-11-30', 2, 10, 'ON_SALE', '/img/empty/empty-list.jpeg', 0),
      ('DUBAI001', 09, 22, 6, '두바이 럭셔리 쇼핑 투어', '두바이의 럭셔리 쇼핑몰과 랜드마크를 방문',
       300000, 150000, '2025-12-01', '2025-12-31', 3, 12, 'ON_SALE', '/img/empty/empty-list.jpeg', 0),
      ('CAPETOWN001', 10, 23, 4, '케이프타운 자연 투어', '케이프타운의 아름다운 자연 경관을 감상',
       220000, 110000, '2025-05-01', '2025-05-31', 2, 8, 'ON_SALE', '/img/empty/empty-list.jpeg', 0);


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
    (1, '파리', 0),
    (1, '도쿄', 0),
    (1, '뉴욕', 0),
    (2, '서울', 0),
    (2, '도쿄', 0),
    (2, '로마', 0),
    (2, '강릉', 0),
    (2, '뉴욕', 0),
    (2, '부산', 0),
    (2, '제주', 0),
    (3, '서울', 0),
    (3, '부산', 0),
    (3, '제주', 0),
    (3, '로마', 0),
    (1, '방콕', 0),
    (1, '부산', 0),
    (1, '시드니', 0),
    (1, '두바이', 0),
    (1, '케이프타운', 0);

INSERT INTO tbl_wish (member_code, group_code, product_code) VALUES
    (1, 1, 8),
    (1, 2, 6),
    (1, 3, 10),
    (2, 4, 1),
    (2, 5, 6),
    (2, 6, 9),
    (2, 7, 4),
    (2, 8, 10),
    (2, 9, 2),
    (2, 10, 3),
    (3, 11, 1),
    (3, 12, 2),
    (3, 13, 3),
    (3, 14, 9),
    (1, 2, 19),
    (1, 1, 21),
    (1, 3, 23),
    (1, 15, 7),
    (1, 15, 20),
    (1, 16, 2),
    (1, 17, 25),
    (1, 18, 26),
    (1, 19, 27);

INSERT INTO tbl_option (product_code, reservation_date, adult_count, child_count) VALUES
(1, '2025-05-20', 2, NULL),
(2, '2025-04-08', 2, 3),
(3, '2025-06-15', 1, 1),
(4, '2025-04-23', 1, 1),
(5, '2025-04-23', 1, 1),
(9, '2025-04-28', 1, 1);

INSERT INTO tbl_option (product_code, reservation_date, adult_count, child_count) VALUES
(8, '2025-04-29', 1, 1),
(27, '2025-04-29', 1, 1),
(27, '2025-04-29', 1, 1),
# 10
(27, '2025-04-29', 1, 1),
(27, '2025-04-29', 1, 1),
(27, '2025-04-29', 1, 1),
(21, '2025-04-29', 1, 1),
(27, '2025-04-29', 1, 1),
(21, '2025-05-29', 1, 1),
# 16
(27, '2025-06-29', 1, 1);


INSERT INTO tbl_order (product_code, option_code, member_code, booking_uid, order_adult_price, order_child_price, total_price, order_date, order_status, is_reviewed) VALUES
-- 일반상품: 아동 분리 없음
(1, 1, 1, 'RSV20250401-01', 120000, NULL, 240000, '2025-04-01 10:23:45', 'SCHEDULED', 0),
-- 디즈니월드: 아동 분리 있음
(2, 2, 1, 'RSV20250401-02', 80000, 50000, 310000, '2025-04-02 14:10:12', 'COMPLETED', 1),
-- 디즈니월드: 취소된 주문
(3, 3, 1, 'RSV20250401-03', 80000, 50000, 130000, '2025-04-03 09:05:33', 'CANCELED', 0),
(4, 4, 2, 'RSV20250401-04', 80000, 50000, 130000, '2025-04-03 10:05:33', 'COMPLETED', 1),
(5, 5, 3, 'RSV20250401-05', 80000, 50000, 130000, '2025-04-04 12:05:33', 'COMPLETED', 1),
(9, 6, 3, 'RSV20250401-06', 80000, 50000, 130000, '2025-04-06 12:05:33', 'COMPLETED', 0);

INSERT INTO tbl_order (product_code, option_code, member_code, booking_uid, order_adult_price, order_child_price, total_price, order_date, order_status, is_reviewed) VALUES
(8, 7, 1, 'RSV20250401-07', 80000, 50000, 130000, '2025-04-06 12:05:33', 'SCHEDULED', 0),
(27, 8, 4, 'RSV20250401-08', 80000, 50000, 130000, '2025-04-07 17:05:33', 'COMPLETED', 0),
(27, 9, 3, 'RSV20250401-09', 80000, 50000, 130000, '2025-04-08 12:05:33', 'COMPLETED', 0),
# 10
(27, 10, 2, 'RSV20250401-10', 80000, 50000, 130000, '2025-04-09 12:05:33', 'CANCELED', 0),
(27, 11, 1, 'RSV20250401-11', 80000, 50000, 130000, '2025-04-10 12:05:33', 'COMPLETED', 0),
(27, 12, 3, 'RSV20250401-12', 80000, 50000, 130000, '2025-04-11 12:05:33', 'COMPLETED', 0),
(21, 13, 3, 'RSV20250401-13', 80000, 50000, 130000, '2025-04-12 12:05:33', 'CANCELED', 0),
(27, 14, 2, 'RSV20250401-14', 80000, 50000, 130000, '2025-04-13 12:05:33', 'COMPLETED', 0),
(21, 15, 3, 'RSV20250401-15', 80000, 50000, 130000, '2025-04-14 12:05:33', 'SCHEDULED', 0),
#16
(27, 16, 3, 'RSV20250401-16', 80000, 50000, 130000, '2025-05-03 12:05:33', 'SCHEDULED', 0);

INSERT INTO tbl_payment (member_code, order_code, payment_method, payment_brand, payment_time, payment_amount, payment_status, imp_uid, merchant_uid, receipt_url) VALUES
    (1, 1, '카드', '삼성카드', '2025-04-01 10:23:45', 240000, 'COMPLETED', 'imp_1234567890', 'RSV20250401-01', 'https://receipt.url/1'),
    (1, 2, '무통장', '신한카드', '2025-04-02 14:10:12', 310000, 'COMPLETED', 'imp_1234567891', 'RSV20250401-02', 'https://receipt.url/2'),
    (1, 3, '카드', '국민카드', '2025-04-03 09:05:33', 130000, 'CANCELED', 'imp_1234567892', 'RSV20250401-03', 'https://receipt.url/3'),
    (2, 4, '카드', '롯데카드', '2025-04-03 10:05:33', 130000, 'COMPLETED', 'imp_1234567893', 'RSV20250401-04', 'https://receipt.url/4'),
    (3, 5, '카드', '우리카드', '2025-04-04 12:05:33', 130000, 'COMPLETED', 'imp_1234567894', 'RSV20250401-05', 'https://receipt.url/5'),
    (3, 6, '카드', '비씨카드', '2025-04-06 12:05:33', 130000, 'COMPLETED', 'imp_1234567895', 'RSV20250401-06', 'https://receipt.url/6');

INSERT INTO tbl_payment (member_code, order_code, payment_method, payment_brand, payment_time, payment_amount, payment_status, imp_uid, merchant_uid, receipt_url) VALUES
    (1, 7, '카드', '비씨카드', '2025-04-06 12:05:33', 130000, 'COMPLETED', 'imp_1234567896', 'RSV20250401-07', 'https://receipt.url/7'),
    (4, 8, '카드', '비씨카드', '2025-04-07 17:05:33', 130000, 'COMPLETED', 'imp_1234567897', 'RSV20250401-08', 'https://receipt.url/8'),
    (3, 9, '카드', '비씨카드', '2025-04-08 12:05:33', 130000, 'COMPLETED', 'imp_1234567898', 'RSV20250401-09', 'https://receipt.url/9'),
    # 10
    (2, 10, '카드', '비씨카드', '2025-04-09 12:05:33', 130000, 'CANCELED', 'imp_1234567899', 'RSV20250401-10', 'https://receipt.url/10'),
    (1, 11, '카드', '비씨카드', '2025-04-10 12:05:33', 130000, 'COMPLETED', 'imp_1234567900', 'RSV20250401-11', 'https://receipt.url/11'),
    (3, 12, '카드', '비씨카드', '2025-04-11 12:05:33', 130000, 'COMPLETED', 'imp_1234567901', 'RSV20250401-12', 'https://receipt.url/12'),
    (3, 13, '카드', '비씨카드', '2025-04-12 12:05:33', 130000, 'CANCELED', 'imp_1234567902', 'RSV20250401-13', 'https://receipt.url/13'),
    (2, 14, '카드', '비씨카드', '2025-04-13 12:05:33', 130000, 'COMPLETED', 'imp_1234567903', 'RSV20250401-14', 'https://receipt.url/14'),
    (3, 15, '카드', '비씨카드', '2025-04-14 12:05:33', 130000, 'COMPLETED', 'imp_1234567904', 'RSV20250401-15', 'https://receipt.url/15'),
    # 16
    (3, 16, '카드', '비씨카드', '2025-05-03 12:05:33', 130000, 'COMPLETED', 'imp_1234567905', 'RSV20250401-16', 'https://receipt.url/16');

INSERT INTO tbl_payment_cancel (payment_code, cancel_time, cancel_amount, pg_tid, cancel_receipt_url) VALUES
    (3, '2025-04-04 11:35:20', 130000, 'pg_cancel_9876543210', 'https://receipt.url/cancel/3');

INSERT INTO tbl_review (member_code, product_code, order_code, review_rating, review_content, review_date, review_pic, review_status) VALUES
    (1, 2, 2, 5, '정말 최고의 디즈니 여행이었어요! 애들도 좋아했어요~', '2025-04-09 14:30:00', 'disney_review.jpg', 'ACTIVE'),
    (2, 4, 4, 1, NULL, '2025-04-24 09:15:00', NULL, 'DELETE_BY_ADMIN'),
    (3, 5, 5, 4, '재밌었음. 나중에 또오겠음.', '2025-04-24 09:15:00', NULL, 'ACTIVE');

-- 4. 이벤트 테이블 (tbl_event)
INSERT INTO tbl_event (event_title, event_content, event_img, event_status,event_startdate, event_enddate)
VALUES
    ('이벤트 1', '첫 번째 이벤트 내용', '/images/event1.jpg', '진행중', NOW(), '2025-04-25 10:00:00'),
    ('이벤트 2', '두 번째 이벤트 내용', '/images/event2.jpg', '진행중', NOW(),'2025-05-25 10:00:00'),
    ('이벤트 3', '세 번째 이벤트 내용', '/images/event3.jpg', '종료', NOW(),'2025-06-25 10:00:00');

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

COMMIT;