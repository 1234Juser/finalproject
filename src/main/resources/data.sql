INSERT IGNORE INTO tbl_member (member_name, member_id, member_password, member_email, member_phone,member_profile_image_url, member_registerdate, member_enddate, member_endstatus, social_type, social_account_id, admin_active)
VALUES
('관리자1', 'user01', '$2a$10$8ygMfWX3HMqordLnpduoNOHD049O.rJCWbNJpbctoVdWVnjpKIuRq', 'user01@gmail.com', '010-1234-5678',null, '2025-04-27 21:41:01', NULL, 'N', NULL, NULL,NULL),
('관리자2', 'user02', '$2a$10$W1NEKHPHdPx8F4Cx6BqWXe/BPGBFLz/ZieDKXxcKUpieDdaKMZs2q', 'user02@gmail.com', '010-1234-5678',null, '2025-04-27 21:41:21', NULL, 'N', NULL, NULL,NULL),
('관리자3', 'user03', '$2a$10$1K6C8wBhLf1M8p2EeSB61.MagmzTz7EQugD9VtkStJBv7Sjbr2nqS', 'user03@gmail.com', '010-1234-5678',null, '2025-04-27 21:41:37', NULL, 'N', NULL, NULL,NULL),
('유저테스트용', 'user04', '$2a$10$oeEYhmRfa3bxZhSSGPAElei6l1ya0KgsRUAaRmBduD8c1EIOIpLU2', 'user04@gmail.com', '010-1234-5678',null, '2025-04-27 21:42:46', NULL, 'N', NULL, NULL,NULL);

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
((SELECT member_code FROM tbl_member WHERE member_id = 'user04'), 2);  -- user04: USER

INSERT INTO tbl_region (region_code, region_uid, region_name, region_type)
VALUES
(1,'SEOULGYEONGGI', '서울/경기/강원/충청', 'DOMESTIC'),
(2,'BUSANGYEONGSANG', '부산/경상/전라', 'DOMESTIC'),
(3,'JEJU', '제주', 'DOMESTIC'),
(4,'ASIA', '아시아', 'INTERNATIONAL'),
(5,'EUROPE', '유럽', 'INTERNATIONAL'),
(6,'AMERICAS', '아메리카', 'INTERNATIONAL'),
(7,'OCEANIA', '오세아니아', 'INTERNATIONAL'),
(8,'AFRICA', '아프리카', 'INTERNATIONAL');


INSERT INTO tbl_country (country_code, region_code, country_uid, country_name) VALUES
(01,4, 'KR01', '대한민국'),
 (02,4, 'JP02', '일본'),
(03,4, 'TH03', '태국'),
(04,5, 'FR04', '프랑스'),
(05,5, 'IT05', '이탈리아'),
(06,6, 'US06', '미국'),
(07,4, 'MV07', '몰디브'),
(08,7, 'AU08', '호주'),
(09,4, 'AE09', '아랍에미리트'),
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
(1,'THEME_001', 'TOUR'),
(2,'THEME_002', 'GOLF'),
(3,'THEME_003', 'CRUISE'),
(4,'THEME_004', 'KIDS'),
(5,'THEME_005', 'HONEYMOON'),
(6,'THEME_006', 'SILVER');

INSERT INTO tbl_product (
    product_uid, country_id, city_id, theme_code,
    product_title, product_content, product_adult, product_child,
    product_start_date, product_end_date, product_min_participants,
    product_max_participants, product_status, product_thumbnail, product_type, review_count) VALUES
      ('SEOUL001', 01, 1, 1, '서울 시티 투어', '서울 시내 관광 투어',
       100000, 50000, '2025-05-01 09:00:00', '2025-05-31 18:00:00',
       1, 30, 'ON_SALE', 'seoul_tour.jpg', 'TOUR', 0),
      ('BUSAN001', 01, 2, 2, '부산 골프 리조트 투어', '부산 최고의 골프 리조트를 즐기는 패키지',
       250000, 0, '2025-06-01 09:00:00', '2025-06-30 18:00:00',
       2, 20, 'ON_SALE', 'busan_golf.jpg', 'GOLF', 0),
      ('JEJU001', 01, 3, 3, '제주 크루즈 투어', '제주 해안을 따라 즐기는 럭셔리 크루즈',
       300000, 150000, '2025-07-01 09:00:00', '2025-07-31 18:00:00',
       10, 100, 'ON_SALE', 'jeju_cruise.jpg', 'CRUISE', 0),
      ('GANGNEUNG001', 01, 4, 4, '강릉 키즈 체험 투어', '아이들과 함께하는 해변 체험 프로그램',
       90000, 50000, '2025-06-15 09:00:00', '2025-06-30 18:00:00',
       2, 25, 'ON_SALE', 'gangneung_kids.jpg', 'KIDS', 0),
      ('DAEJEON001', 01, 5, 5, '대전 허니문 스페셜', '신혼부부를 위한 럭셔리 과학 도시 체험',
       180000, 0, '2025-07-01 09:00:00', '2025-07-15 18:00:00',
       2, 10, 'ON_SALE', 'daejeon_honeymoon.jpg', 'HONEYMOON', 0),
      ('TOKYO001', 02, 15, 6, '도쿄 시니어 문화 투어', '실버 세대를 위한 편안한 도쿄 여행',
       160000, 0, '2025-06-01 09:00:00', '2025-06-30 18:00:00',
       1, 20, 'ON_SALE', 'tokyo_silver.jpg', 'SILVER', 0),
      ('BANGKOK001', 03, 16, 1, '방콕 시내 투어', '방콕의 주요 명소를 둘러보는 시내 투어',
       90000, 45000, '2025-06-01 09:00:00', '2025-06-30 18:00:00',
       1, 25, 'ON_SALE', 'bangkok_tour.jpg', 'TOUR', 0),
      ('PARIS001', 04, 17, 2, '파리 골프 투어', '파리 근교의 프리미엄 골프 코스를 즐기는 투어',
       280000, 0, '2025-07-01 09:00:00', '2025-07-15 18:00:00',
       2, 12, 'ON_SALE', 'empty-list.jpeg', 'GOLF', 0),
      ('ROME001', 05, 18, 5, '로마 허니문 투어', '역사와 낭만이 가득한 로마에서의 허니문',
       270000, 0, '2025-08-01 09:00:00', '2025-08-31 18:00:00',
       2, 8, 'ON_SALE', 'rome_honeymoon.jpg', 'HONEYMOON', 0),
      ('NEWYORK001', 06, 19, 6, '뉴욕 실버 시티 투어', '편안하게 즐기는 뉴욕의 시니어 투어',
       200000, 0, '2025-08-01 09:00:00', '2025-08-15 18:00:00',
       1, 15, 'ON_SALE', 'newyork_silver.jpg', 'SILVER', 0),
      ('CHUNCHEON001', 01, 7, 4, '춘천 가족 여행', '춘천의 아름다운 자연을 담은 가족 여행',
       120000, 60000, '2025-05-01', '2025-05-31', 3, 20, 'ON_SALE', 'chuncheon_family.jpg', 'TOUR', 0),
      ('SUWON001', 01, 8, 3, '수원 역사 탐방', '수원화성을 중심으로 한 역사 여행',
       90000, 70000, '2025-06-01', '2025-06-30', 2, 15, 'ON_SALE', 'suwon_history.jpg', 'TOUR', 0),
      ('CHEONGJU001', 01, 9, 5, '청주 힐링 여행', '청주의 자연과 문화를 느낄 수 있는 힐링 여행',
       110000, 55000, '2025-07-01', '2025-07-31', 1, 10, 'ON_SALE', 'cheongju_healing.jpg', 'TOUR', 0),
      ('DAEGU001', 01, 10, 1, '대구 미식 투어', '대구의 다양한 먹거리를 탐방하는 미식 여행',
       100000, 50000, '2025-08-01', '2025-08-31', 2, 20, 'ON_SALE', 'daegu_food.jpg', 'TOUR',0),
      ('JEONJU001', 01, 11, 2, '전주 한옥마을 투어', '전주 한옥마을의 전통과 멋을 느낄 수 있는 여행',
       95000, 65000, '2025-09-01', '2025-09-30', 3, 18, 'ON_SALE', 'jeonju_hanok.jpg', 'TOUR',0),
      ('GYEONGJU001', 01, 12, 3, '경주 신라 역사 투어', '신라 천년의 역사를 따라가는 경주 여행',
       120000, 80000, '2025-10-01', '2025-10-31', 1, 12, 'ON_SALE', 'gyeongju_history.jpg', 'TOUR',0),
      ('GWANGJU001', 01, 13, 5, '광주 예술 여행', '광주의 예술과 문화를 체험하는 특별한 여행',
       105000, 60000, '2025-11-01', '2025-11-30', 2, 15, 'ON_SALE', 'gwangju_art.jpg', 'TOUR',0),
      ('ULSAN001', 01, 14, 4, '울산 산업 탐방', '울산의 자동차, 조선 산업 현장을 견학하는 투어',
       130000, 90000, '2025-12-01', '2025-12-31', 5, 25, 'ON_SALE', 'ulsan_industry.jpg', 'TOUR',0),
      ('TOKYO002', 02, 15, 1, '도쿄 쇼핑 투어', '도쿄의 다양한 쇼핑 명소를 방문하는 즐거운 투어',
       140000, 70000, '2025-05-01', '2025-05-31', 1, 10, 'ON_SALE', 'tokyo_shopping.jpg', 'TOUR',0),
      ('BANGKOK002', 03, 16, 2, '방콕 왕궁 및 사원 투어', '방콕의 화려한 왕궁과 사원을 탐방하는 투어',
       110000, 55000, '2025-06-01', '2025-06-30', 2, 18, 'ON_SALE', 'bangkok_temple.jpg', 'TOUR',0),
      ('PARIS002', 04, 17, 3, '파리 미술관 투어', '세계적인 파리 미술관을 방문하는 예술 투어',
       250000, 125000, '2025-07-01', '2025-07-31', 1, 8, 'ON_SALE', '/img/empty/empty-list.jpeg', 'TOUR', 0),
      ('ROME002', 05, 18, 1, '로마 고대 유적 투어', '로마의 콜로세움, 포로 로마노 등 고대 유적을 탐험',
       220000, 110000, '2025-08-01', '2025-08-31', 3, 12, 'ON_SALE', 'rome_ancient.jpg', 'TOUR', 0),
      ('NEWYORK002', 06, 19, 2, '뉴욕 뮤지컬 투어', '브로드웨이 뮤지컬 관람 및 뉴욕 문화 체험',
       280000, 140000, '2025-09-01', '2025-09-30', 1, 10, 'ON_SALE', 'newyork_musical.jpg', 'TOUR', 0),
      ('MALE001', 07, 20, 4, '몰디브 해양 액티비티', '몰디브의 아름다운 바다에서 즐기는 액티비티 투어',
       350000, 200000, '2025-10-01', '2025-10-31', 4, 15, 'ON_SALE', 'male_activity.jpg', 'TOUR', 0),
      ('SYDNEY001', 08, 21, 5, '시드니 오페라 하우스 투어', '시드니 오페라 하우스와 하버 브릿지를 탐방',
       200000, 100000, '2025-11-01', '2025-11-30', 2, 10, 'ON_SALE', 'sydney_opera.jpg', 'TOUR', 0),
      ('DUBAI001', 09, 22, 6, '두바이 럭셔리 쇼핑 투어', '두바이의 럭셔리 쇼핑몰과 랜드마크를 방문',
       300000, 150000, '2025-12-01', '2025-12-31', 3, 12, 'ON_SALE', 'dubai_shopping.jpg', 'TOUR', 0),
      ('CAPETOWN001', 10, 23, 4, '케이프타운 자연 투어', '케이프타운의 아름다운 자연 경관을 감상',
       220000, 110000, '2025-05-01', '2025-05-31', 2, 8, 'ON_SALE', 'capetown_nature.jpg', 'TOUR', 0);


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