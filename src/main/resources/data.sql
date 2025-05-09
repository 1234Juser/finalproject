INSERT IGNORE INTO tbl_member (member_name, member_id, member_password, member_email, member_phone,member_profile_image_url, member_registerdate, member_enddate, member_endstatus, social_type, social_account_id, admin_active)
VALUES
('관리자1', 'user01', '$2a$10$8ygMfWX3HMqordLnpduoNOHD049O.rJCWbNJpbctoVdWVnjpKIuRq', 'user01@gmail.com', '010-1234-5678',null, '2025-04-27 21:41:01', NULL, 'N', NULL, NULL,'Y'),
('관리자2', 'user02', '$2a$10$W1NEKHPHdPx8F4Cx6BqWXe/BPGBFLz/ZieDKXxcKUpieDdaKMZs2q', 'user02@gmail.com', '010-1234-5678',null, '2025-04-27 21:41:21', NULL, 'N', NULL, NULL,'Y'),
('관리자3', 'user03', '$2a$10$1K6C8wBhLf1M8p2EeSB61.MagmzTz7EQugD9VtkStJBv7Sjbr2nqS', 'user03@gmail.com', '010-1234-5678',null, '2025-04-27 21:41:37', NULL, 'N', NULL, NULL,'Y'),
('유저테스트용', 'user04', '$2a$10$oeEYhmRfa3bxZhSSGPAElei6l1ya0KgsRUAaRmBduD8c1EIOIpLU2', 'user04@gmail.com', '010-1234-5678',null, '2025-04-27 21:42:46', NULL, 'N', NULL, NULL,'Y');

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

-- 이벤트 데이터 중복삭제
DELETE FROM tbl_event;
INSERT INTO tbl_event (event_title, event_content, event_img, event_status, event_startdate, event_enddate)
VALUES
    ('기본 이벤트', '기본 이벤트입니다.', 'event/default_event.jpg', '진행중', NOW(), '2025-06-30 23:59:59'),
    ('기본 이벤트2', '기본 이벤트입니다2.', 'event/default_event.jpg', '진행중', NOW(), '2026-06-30 23:59:59'),
    ('기본 이벤트3', '기본 이벤트입니다3.', 'event/default_event.jpg', '진행중', NOW(), '2027-06-30 23:59:59'),
    ('기본 이벤트4', '기본 이벤트입니다3.', 'event/default_event.jpg', '진행중', NOW(), '2027-06-30 23:59:59'),
    ('기본 이벤트5', '기본 이벤트입니다3.', 'event/default_event.jpg', '진행중', NOW(), '2027-06-30 23:59:59'),
    ('기본 이벤트6', '기본 이벤트입니다3.', 'event/default_event.jpg', '진행중', NOW(), '2027-06-30 23:59:59'),
    ('기본 이벤트7', '기본 이벤트입니다3.', 'event/default_event.jpg', '진행중', NOW(), '2027-06-30 23:59:59'),
    ('기본 이벤트8', '기본 이벤트입니다3.', 'event/default_event.jpg', '진행중', NOW(), '2027-06-30 23:59:59'),
    ('기본 이벤트9', '기본 이벤트입니다3.', 'event/default_event.jpg', '진행중', NOW(), '2027-06-30 23:59:59'),
    ('기본 이벤트10', '기본 이벤트입니다3.', 'event/default_event.jpg', '진행중', NOW(), '2027-06-30 23:59:59'),
    ('기본 이벤트11', '기본 이벤트입니다3.', 'event/default_event.jpg', '진행중', NOW(), '2027-06-30 23:59:59'),
    ('기본 이벤트11', '기본 이벤트입니다3.', 'event/default_event.jpg', '진행중', NOW(), '2027-06-30 23:59:59'),
    ('기본 이벤트11', '기본 이벤트입니다3.', 'event/default_event.jpg', '진행중', NOW(), '2027-06-30 23:59:59');

-- faq테이블 중복삭제
DELETE FROM tbl_faq;
INSERT INTO tbl_faq (faq_title, faq_content)
VALUES
    ('자주 묻는 질문 1', '첫 번째 FAQ 내용'),
    ('자주 묻는 질문 2', '두 번째 FAQ 내용'),
    ('자주 묻는 질문 3', '세 번째 FAQ 내용'),
    ('자주 묻는 질문 4', '세 번째 FAQ 내용'),
    ('자주 묻는 질문 5', '세 번째 FAQ 내용'),
    ('자주 묻는 질문 6', '세 번째 FAQ 내용'),
    ('자주 묻는 질문 7', '세 번째 FAQ 내용'),
    ('자주 묻는 질문 8', '세 번째 FAQ 내용'),
    ('자주 묻는 질문 9', '세 번째 FAQ 내용'),
    ('자주 묻는 질문 10', '세 번째 FAQ 내용'),
    ('자주 묻는 질문 11', '열한 번째 FAQ 내용'),
    ('자주 묻는 질문 12', '열두 번째 FAQ 내용');

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
                                                                                                        (1201, 12, 'BEIJING1201', 'BEIJING', '베이징', 4),
                                                                                                        (1202, 12, 'SHANGHAI1202', 'SHANGHAI', '상하이', 4),
                                                                                                        (1203, 12, 'GUANGZHOU1203', 'GUANGZHOU', '광저우', 4),
                                                                                                        (1301, 13, 'MADRID1301', 'MADRID', '마드리드', 5),
                                                                                                        (1301, 13, 'BARCELONA1301', 'BARCELONA', '바르셀로나', 5),
                                                                                                        (1401, 14, 'HANOI1401', 'HANOI', '하노이', 4),
                                                                                                        (1402, 14, 'HOCHIMINH1402', 'HOCHIMINH', '호치민', 4),
                                                                                                        (1501, 15, 'BERLIN1501', 'BERLIN', '베를린', 5),
                                                                                                        (1502, 15, 'HAMBURG1502', 'HAMBURG', '함부르크', 5),
                                                                                                        (1503, 15, 'MUNICH1503', 'MUNICH', '뮌헨', 5),
                                                                                                        (1601, 16, 'CAIRO1601', 'CAIRO', '카이로', 8),
                                                                                                        (1701, 17, 'AUCKLAND1701', 'AUCKLAND', '오클랜드', 7),
                                                                                                        (1801, 18, 'RIO_DE_JANEIRO1801', 'RIO DE JANEIRO', '리우데자네이루', 6),
                                                                                                        (1901, 19, 'JAKARTA1901', 'JAKARTA', '자카르타', 4),
                                                                                                        (2001, 20, 'LONDON2001', 'LONDON', '런던', 5),
                                                                                                        (2002, 20, 'MANCHESTER2002', 'MANCHESTER', '맨체스터', 5),
                                                                                                        (2301, 23, 'MEXICO_CITY2301', 'MEXICO CITY', '멕시코시티', 6),
                                                                                                        (2401, 24, 'MANILA2401', 'MANILA', '마닐라', 4),
                                                                                                        (2402, 24, 'CEBU2402', 'CEBU', '세부', 4),
                                                                                                        (2501, 25, 'STOCKHOLM2501', 'STOCKHOLM', '스톡홀름', 5),
                                                                                                        (2801, 28, 'BUENOS_AIRES2801', 'BUENOS AIRES', '부에노스아이레스', 6),
                                                                                                        (2901, 29, 'SINGAPORE2901', 'SINGAPORE', '싱가포르', 4),
                                                                                                        (3001, 30, 'ZURICH3001', 'ZURICH', '취리히', 5);


INSERT IGNORE INTO tbl_theme (theme_code, theme_uid, theme_name) VALUES
(1,'THEME_001', 'TOUR'),
(2,'THEME_002', 'GOLF'),
(3,'THEME_003', 'CRUISE'),
(4,'THEME_004', 'KIDS'),
(5,'THEME_005', 'HONEYMOON'),
(6,'THEME_006', 'SILVER'),
(7,'THEME_007', 'TREKKING'),
(8,'THEME_008', 'FESTIVAL'),
(9,'THEME_009', 'SHOPPING'),
(10,'THEME_010', 'FOOD'),
(11,'THEME_011', 'HEALING'),
(12,'THEME_012', 'ADVENTURE'),
(13,'THEME_013', 'HISTORY'),
(14,'THEME_014', 'ART'),
(15,'THEME_015', 'PERFORMANCE');

INSERT IGNORE INTO tbl_product (
    product_uid, country_id, city_id, theme_code,
    product_title, product_content, product_adult, product_child,
    product_start_date, product_end_date, product_min_participants,
    product_max_participants, product_status, product_thumbnail, product_type, review_count, region_code, region_type,
    city_name, country_name, full_location, product_description) VALUES
    ('SEOUL001', 01, 1, 1, '서울 시티 투어', '서울 시내 관광 투어', 100000, 50000, '2025-05-01 09:00:00', '2025-05-31 18:00:00', 1, 30, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'SEOUL', 'South Korea', 'SEOUL, South Korea', ''),
    ('BUSAN001', 01, 2, 2, '부산 골프 리조트 투어', '부산 최고의 골프 리조트를 즐기는 패키지', 250000, 0, '2025-06-01 09:00:00', '2025-06-30 18:00:00', 2, 20, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'BUSAN', 'South Korea', 'BUSAN, South Korea', ''),
    ('JEJU001', 01, 3, 3, '제주 크루즈 투어', '제주 해안을 따라 즐기는 럭셔리 크루즈', 300000, 30000, '2025-07-01 09:00:00', '2025-07-31 18:00:00', 10, 100, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'JEJU', 'South Korea', 'JEJU, South Korea', ''),
    ('GANGNEUNG001', 01, 4, 4, '강릉 키즈 체험 투어', '아이들과 함께하는 해변 체험 프로그램', 90000, 12900, '2025-06-15 09:00:00', '2025-06-30 18:00:00', 2, 25, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'GANGNEUNG', 'South Korea', 'GANGNEUNG, South Korea', ''),
('DAEJEON001', 01, 5, 5, '대전 허니문 스페셜', '신혼부부를 위한 럭셔리 과학 도시 체험', 180000, 0, '2025-07-01 09:00:00', '2025-07-15 18:00:00', 2, 10, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'DAEJEON', 'South Korea', 'DAEJEON, South Korea', ''),
('TOKYO001', 02, 15, 6, '도쿄 시니어 문화 투어', '실버 세대를 위한 편안한 도쿄 여행', 160000, 0, '2025-06-01 09:00:00', '2025-06-30 18:00:00', 1, 20, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 4, 'INTERNATIONAL', 'TOKYO', 'Japan', 'TOKYO, Japan', ''),
('BANGKOK001', 03, 16, 1, '방콕 시내 투어', '방콕의 주요 명소를 둘러보는 시내 투어', 780000, 99000, '2025-06-01 09:00:00', '2025-06-30 18:00:00', 1, 25, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 4, 'INTERNATIONAL', 'BANGKOK', 'Thailand', 'BANGKOK, Thailand', ''),
('PARIS001', 04, 17, 2, '파리 골프 투어', '파리 근교의 프리미엄 골프 코스를 즐기는 투어', 400000, 0, '2025-07-01 09:00:00', '2025-07-15 18:00:00', 2, 12, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 5, 'INTERNATIONAL', 'PARIS', 'France', 'PARIS, France', ''),
('ROME001', 05, 18, 5, '로마 허니문 투어', '역사와 낭만이 가득한 로마에서의 허니문', 270000, 0, '2025-08-01 09:00:00', '2025-08-31 18:00:00', 2, 8, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 5, 'INTERNATIONAL', 'ROME', 'Italy', 'ROME, Italy', ''),
('NEWYORK001', 06, 19, 6, '뉴욕 실버 시티 투어', '편안하게 즐기는 뉴욕의 시니어 투어', 2500000, 0, '2025-08-01 09:00:00', '2025-08-15 18:00:00', 1, 15, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 6, 'INTERNATIONAL', 'NEWYORK', 'United States', 'NEWYORK, United States', ''),
('CHUNCHEON001', 01, 7, 4, '춘천 가족 여행', '춘천의 아름다운 자연을 담은 가족 여행', 99000, 29000, '2025-05-01 00:00:00', '2025-05-31 00:00:00', 3, 20, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'CHUNCHEON', 'South Korea', 'CHUNCHEON, South Korea', ''),
('SUWON001', 01, 8, 3, '수원 역사 탐방', '수원화성을 중심으로 한 역사 여행', 50000, 10000, '2025-06-01 00:00:00', '2025-06-30 00:00:00', 2, 15, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'SUWON', 'South Korea', 'SUWON, South Korea', ''),
('CHEONGJU001', 01, 9, 5, '청주 힐링 여행', '청주의 자연과 문화를 느낄 수 있는 힐링 여행', 30000, 0, '2025-07-01 00:00:00', '2025-07-31 00:00:00', 1, 10, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'CHEONGJU', 'South Korea', 'CHEONGJU, South Korea', ''),
('DAEGU001', 01, 10, 1, '대구 미식 투어', '대구의 다양한 먹거리를 탐방하는 미식 여행', 70000, 0, '2025-08-01 00:00:00', '2025-08-31 00:00:00', 2, 20, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'DAEGU', 'South Korea', 'DAEGU, South Korea', ''),
('JEONJU001', 01, 11, 2, '전주 한옥마을 투어', '전주 한옥마을의 전통과 멋을 느낄 수 있는 여행', 60000, 0, '2025-09-01 00:00:00', '2025-09-30 00:00:00', 3, 18, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'JEONJU', 'South Korea', 'JEONJU, South Korea', ''),
('GYEONGJU001', 01, 12, 3, '경주 신라 역사 투어', '신라 천년의 역사를 따라가는 경주 여행', 28000, 8000, '2025-10-01 00:00:00', '2025-10-31 00:00:00', 1, 12, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'GYEONGJU', 'South Korea', 'GYEONGJU, South Korea', ''),
('GWANGJU001', 01, 13, 5, '광주 예술 여행', '광주의 예술과 문화를 체험하는 특별한 여행', 60000, 0, '2025-11-01 00:00:00', '2025-11-30 00:00:00', 2, 15, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'GWANGJU', 'South Korea', 'GWANGJU, South Korea', ''),
('ULSAN001', 01, 14, 4, '울산 산업 탐방', '울산의 자동차, 조선 산업 현장을 견학하는 투어', 48000, 0, '2025-12-01 00:00:00', '2025-12-31 00:00:00', 5, 25, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'ULSAN', 'South Korea', 'ULSAN, South Korea', ''),
('TOKYO002', 02, 15, 1, '도쿄 쇼핑 투어', '도쿄의 다양한 쇼핑 명소를 방문하는 즐거운 투어', 600000, 70000, '2025-05-01 00:00:00', '2025-05-31 00:00:00', 1, 10, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 4, 'INTERNATIONAL', 'TOKYO', 'Japan', 'TOKYO, Japan', ''),
('BANGKOK002', 03, 16, 2, '방콕 왕궁 및 사원 투어', '방콕의 화려한 왕궁과 사원을 탐방하는 투어', 1100000, 155000, '2025-06-01 00:00:00', '2025-06-30 00:00:00', 2, 18, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 4, 'INTERNATIONAL', 'BANGKOK', 'Thailand', 'BANGKOK, Thailand', ''),
('PARIS002', 04, 17, 3, '파리 미술관 투어', '세계적인 파리 미술관을 방문하는 예술 투어', 2500000, 125000, '2025-07-01 00:00:00', '2025-07-31 00:00:00', 1, 8, 'ON_SALE', '/img/empty/empty-list.jpeg', 'TOUR', 0, 5, 'INTERNATIONAL', 'PARIS', 'France', 'PARIS, France', ''),
('ROME002', 05, 18, 1, '로마 고대 유적 투어', '로마의 콜로세움, 포로 로마노 등 고대 유적을 탐험', 2200000, 210000, '2025-08-01 00:00:00', '2025-08-31 00:00:00', 3, 12, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 5, 'INTERNATIONAL', 'ROME', 'Italy', 'ROME, Italy', ''),
('NEWYORK002', 06, 19, 2, '뉴욕 뮤지컬 투어', '브로드웨이 뮤지컬 관람 및 뉴욕 문화 체험', 2800000, 140000, '2025-09-01 00:00:00', '2025-09-30 00:00:00', 1, 10, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 6, 'INTERNATIONAL', 'NEWYORK', 'United States', 'NEWYORK, United States', ''),
('MALE001', 07, 20, 4, '몰디브 해양 액티비티', '몰디브의 아름다운 바다에서 즐기는 액티비티 투어', 850000, 200000, '2025-10-01 00:00:00', '2025-10-31 00:00:00', 4, 15, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 4, 'INTERNATIONAL', 'MALE', 'Maldives', 'MALE, Maldives', ''),
('SYDNEY001', 08, 21, 5, '시드니 오페라 하우스 투어', '시드니 오페라 하우스와 하버 브릿지를 탐방', 3500000, 240000, '2025-11-01 00:00:00', '2025-11-30 00:00:00', 2, 10, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 7, 'INTERNATIONAL', 'SYDNEY', 'Australia', 'SYDNEY, Australia', ''),
('DUBAI001', 09, 22, 6, '두바이 럭셔리 쇼핑 투어', '두바이의 럭셔리 쇼핑몰과 랜드마크를 방문', 1300000, 150000, '2025-12-01 00:00:00', '2025-12-31 00:00:00', 3, 12, 'ON_SALE', 'dubai_shopping.jpg', 'TOUR', 0, 4, 'INTERNATIONAL', 'DUBAI', 'United Arab Emirates', 'DUBAI, United Arab Emirates', ''),
('CAPETOWN001', 10, 23, 4, '케이프타운 자연 투어', '케이프타운의 아름다운 자연 경관을 감상', 1220000, 110000, '2025-05-01 00:00:00', '2025-05-31 00:00:00', 2, 8, 'ON_SALE', 'capetown_nature.jpg', 'TOUR', 0, 8, 'INTERNATIONAL', 'CAPETOWN', 'South Africa', 'CAPETOWN, South Africa', ''),
('SEOUL002', 01, 1, 7, '서울 트레킹 명소 투어', '서울의 아름다운 산과 숲길을 따라 걷는 힐링 트레킹 투어', 87000, 0, '2025-05-01 09:00:00', '2025-05-31 18:00:00', 1, 30, 'ON_SALE', '/static/img/earth.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'SEOUL', 'South Korea', 'SEOUL, South Korea', ''),
('BUSAN002', 01, 2, 8, '부산 불꽃 축제 & 야경 투어', '부산의 화려한 불꽃 축제와 아름다운 야경을 즐기는 특별한 투어', 125000, 0, '2025-08-15 19:00:00', '2025-08-15 23:00:00', 2, 20, 'ON_SALE', 'busan_fireworks.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'BUSAN', 'South Korea', 'BUSAN, South Korea', ''),
('JEJU002', 01, 3, 9, '제주 면세점 쇼핑 & 맛집 투어', '제주 면세점에서 쇼핑을 즐기고 현지인 추천 맛집을 탐방하는 투어', 94000, 15000, '2025-07-05 10:00:00', '2025-07-10 17:00:00', 10, 100, 'ON_SALE', 'jeju_shopping_food.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'JEJU', 'South Korea', 'JEJU, South Korea', ''),
('GANGNEUNG002', 01, 4, 10, '강릉 커피 축제 & 해변 드라이브', '향긋한 커피 축제와 함께 아름다운 강릉 해안 도로를 따라 드라이브하는 투어', 69000, 8000, '2025-10-01 09:00:00', '2025-10-03 18:00:00', 2, 25, 'ON_SALE', 'gangneung_coffee_drive.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'GANGNEUNG', 'South Korea', 'GANGNEUNG, South Korea', ''),
('DAEJEON002', 01, 5, 11, '대전 과학관 탐험 & 족욕 체험', '다양한 과학 전시관을 탐험하고 유성 온천에서 피로를 푸는 힐링 투어', 50000, 0, '2025-09-10 14:00:00', '2025-09-12 18:00:00', 2, 10, 'ON_SALE', 'daejeon_science_spa.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'DAEJEON', 'South Korea', 'DAEJEON, South Korea', ''),
('TOKYO003', 02, 15, 12, '도쿄 애니메이션 & 피규어 쇼핑 투어', '도쿄의 유명 애니메이션 거리에서 쇼핑을 즐기는 덕후 투어', 560000, 0, '2025-06-05 11:00:00', '2025-06-08 20:00:00', 1, 20, 'ON_SALE', 'tokyo_anime_shopping.jpg', 'TOUR', 0, 4, 'INTERNATIONAL', 'TOKYO', 'Japan', 'TOKYO, Japan', ''),
('BANGKOK003', 03, 16, 13, '방콕 역사 유적지 탐방 투어', '방콕의 왕궁, 사원 등 역사적인 유적지를 깊이 있게 둘러보는 투어', 790000, 45000, '2025-07-15 08:00:00', '2025-07-18 17:00:00', 1, 25, 'ON_SALE', 'bangkok_history.jpg', 'TOUR', 0, 4, 'INTERNATIONAL', 'BANGKOK', 'Thailand', 'BANGKOK, Thailand', ''),
('PARIS003', 04, 17, 14, '파리 루브르 박물관 & 몽마르뜨 투어', '파리의 대표적인 미술관과 낭만적인 예술가 언덕을 방문하는 투어', 2280000, 0, '2025-08-01 09:00:00', '2025-08-04 18:00:00', 2, 12, 'ON_SALE', 'paris_louvre_montmartre.jpg', 'TOUR', 0, 5, 'INTERNATIONAL', 'PARIS', 'France', 'PARIS, France', ''),
('ROME003', 05, 18, 15, '로마 오페라 관람 & 야경 투어', '로마에서 유명 오페라를 감상하고 아름다운 야경 명소를 방문하는 투어', 3270000, 0, '2025-09-05 19:00:00', '2025-09-08 23:00:00', 2, 8, 'ON_SALE', 'rome_opera_night.jpg', 'TOUR', 0, 5, 'INTERNATIONAL', 'ROME', 'Italy', 'ROME, Italy', ''),
('NEWYORK003', 06, 19, 7, '뉴욕 센트럴 파크 & 자연사 박물관 투어', '뉴욕의 대표적인 공원과 자연사 박물관을 탐험하는 투어', 3200000, 0, '2025-10-10 10:00:00', '2025-10-12 17:00:00', 1, 15, 'ON_SALE', 'newyork_centralpark_museum.jpg', 'TOUR', 0, 6, 'INTERNATIONAL', 'NEWYORK', 'United States', 'NEWYORK, United States', ''),
('CHUNCHEON002', 01, 7, 8, '춘천 닭갈비 & 호수 유람선 투어', '춘천의 명물 닭갈비를 맛보고 아름다운 호수에서 유람선을 타는 낭만 투어', 50000, 6000, '2025-05-15 10:00:00', '2025-05-17 18:00:00', 3, 20, 'ON_SALE', 'chuncheon_dakgalbi_lake.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'CHUNCHEON', 'South Korea', 'CHUNCHEON, South Korea', ''),
('SUWON002', 01, 8, 9, '수원 화성 야간 달빛 투어', '밤에 더욱 아름다운 수원 화성을 거닐며 역사 이야기를 듣는 특별한 투어', 90000, 70000, '2025-06-10 19:00:00', '2025-06-10 22:00:00', 2, 15, 'ON_SALE', 'suwon_night_tour.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'SUWON', 'South Korea', 'SUWON, South Korea', ''),
('CHEONGJU002', 01, 9, 10, '청주 농촌 체험 & 전통 음식 만들기', '청주의 농촌에서 다양한 체험 활동을 하고 전통 음식을 만들어보는 투어', 20000, 5000, '2025-07-20 09:00:00', '2025-07-22 17:00:00', 1, 10, 'ON_SALE', 'cheongju_farm_food.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'CHEONGJU', 'South Korea', 'CHEONGJU, South Korea', ''),
('DAEGU002', 01, 10, 11, '대구 근대 골목길 & 서문시장 투어', '대구의 역사적인 골목길을 탐방하고 활기 넘치는 전통 시장을 방문하는 투어', 30000, 3000, '2025-08-05 10:00:00', '2025-08-07 18:00:00', 2, 20, 'ON_SALE', 'daegu_alley_market.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'DAEGU', 'South Korea', 'DAEGU, South Korea', ''),
('JEONJU002', 01, 11, 12, '전주 한복 체험 & 경기전 관람', '전주 한옥마을에서 아름다운 한복을 입고 경기전을 관람하는 특별한 경험', 45000, 5000, '2025-09-15 10:00:00', '2025-09-17 17:00:00', 3, 18, 'ON_SALE', 'jeonju_hanbok_gyeonggijeon.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'JEONJU', 'South Korea', 'JEONJU, South Korea', ''),
('GYEONGJU002', 01, 12, 13, '경주 불국사 & 첨성대 역사 투어', '신라의 대표적인 유적인 불국사와 첨성대를 방문하여 역사를 배우는 투어', 40000, 10000, '2025-10-05 09:00:00', '2025-10-07 18:00:00', 1, 12, 'ON_SALE', 'gyeongju_history_tour.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'GYEONGJU', 'South Korea', 'GYEONGJU, South Korea', ''),
('GWANGJU002', 01, 13, 14, '광주 비엔날레 & 예술의 거리 투어', '광주 비엔날레 전시를 관람하고 예술가들의 혼이 담긴 거리를 둘러보는 투어', 55000, 0, '2025-11-01 10:00:00', '2025-11-03 18:00:00', 2, 15, 'ON_SALE', 'gwangju_art_biennale.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'GWANGJU', 'South Korea', 'GWANGJU, South Korea', ''),
('ULSAN002', 01, 14, 15, '울산 조선소 & 태화강 국가정원 투어', '한국의 산업 중심지 울산의 조선소를 견학하고 아름다운 태화강 국가정원을 산책하는 투어', 49000, 0, '2025-12-01 09:00:00', '2025-12-03 18:00:00', 5, 25, 'ON_SALE', 'ulsan_industry_garden.jpg', 'TOUR', 0, 1, 'DOMESTIC', 'ULSAN', 'South Korea', 'ULSAN, South Korea', ''),
('TOKYO004', 02, 15, 7, '도쿄 근교 온천 & 자연 감상 투어', '도쿄 근교의 유명 온천에서 휴식을 취하고 아름다운 자연을 만끽하는 힐링 투어', 340000, 50000, '2025-05-20 10:00:00', '2025-05-22 17:00:00', 1, 10, 'ON_SALE', 'tokyo_onsen_nature.jpg', 'TOUR', 0, 4, 'INTERNATIONAL', 'TOKYO', 'Japan', 'TOKYO, Japan', ''),
('BANGKOK004', 03, 16, 8, '방콕 루프탑 바 & 야경 감상 투어', '방콕의 핫한 루프탑 바에서 멋진 야경을 감상하는 로맨틱 투어', 510000, 120000, '2025-06-15 19:00:00', '2025-06-15 23:00:00', 2, 18, 'ON_SALE', 'bangkok_rooftop_night.jpg', 'TOUR', 0, 4, 'INTERNATIONAL', 'BANGKOK', 'Thailand', 'BANGKOK, Thailand', ''),
('PARIS004', 04, 17, 9, '파리 베르사유 궁전 & 정원 투어', '화려함의 극치 베르사유 궁전과 아름다운 정원을 둘러보는 럭셔리 투어', 2500000, 125000, '2025-07-10 09:00:00', '2025-07-12 18:00:00', 1, 8, 'ON_SALE', 'paris_versailles.jpg', 'TOUR', 0, 5, 'INTERNATIONAL', 'PARIS', 'France', 'PARIS, France', ''),
('ROME004', 05, 18, 10, '로마 바티칸 & 천사의 성 투어', '카톨릭의 중심지 바티칸과 웅장한 천사의 성을 방문하는 역사 투어', 2200000, 110000, '2025-08-10 10:00:00', '2025-08-12 17:00:00', 3, 12, 'ON_SALE', 'rome_vatican_castel.jpg', 'TOUR', 0, 5, 'INTERNATIONAL', 'ROME', 'Italy', 'ROME, Italy', ''),
('NEWYORK004', 06, 19, 11, '뉴욕 브로드웨이 뮤지컬 & 타임스퀘어 투어', '뉴욕 브로드웨이에서 인기 뮤지컬을 관람하고 화려한 타임스퀘어를 경험하는 투어', 4280000, 140000, '2025-09-10 19:00:00', '2025-09-12 23:00:00', 1, 10, 'ON_SALE', 'newyork_broadway_timesquare.jpg', 'TOUR', 0, 6, 'INTERNATIONAL', 'NEWYORK', 'United States', 'NEWYORK, United States', ''),
('MALE002', 07, 20, 12, '몰디브 스노클링 & 해변 휴양 투어', '몰디브의 아름다운 바다에서 스노클링을 즐기고 프라이빗 해변에서 휴식을 취하는 투어', 930000, 90000, '2025-10-15 09:00:00', '2025-10-18 18:00:00', 4, 15, 'ON_SALE', 'male_snorkeling_beach.jpg', 'TOUR', 0, 4, 'INTERNATIONAL', 'MALE', 'Maldives', 'MALE, Maldives', ''),
('SYDNEY002', 08, 21, 13, '시드니 하버 브릿지 클라이밍 & 오페라 하우스 내부 투어', '시드니 하버 브릿지를 등반하고 오페라 하우스 내부를 관람하는 특별한 경험', 4200000, 100000, '2025-11-10 10:00:00', '2025-11-12 17:00:00', 2, 10, 'ON_SALE', 'sydney_bridge_opera.jpg', 'TOUR', 0, 7, 'INTERNATIONAL', 'SYDNEY', 'Australia', 'SYDNEY, Australia', ''),
('DUBAI002', 09, 22, 14, '두바이 사막 사파리 & 벨리댄스 투어', '두바이의 광활한 사막에서 사파리 투어를 즐기고 전통 벨리댄스 공연을 관람하는 투어', 3300000, 150000, '2025-12-10 15:00:00', '2025-12-12 22:00:00', 3, 12, 'ON_SALE', 'dubai_desert_safari.jpg', 'TOUR', 0, 4, 'INTERNATIONAL', 'DUBAI', 'United Arab Emirates', 'DUBAI, United Arab Emirates', ''),
('CAPETOWN002', 10, 23, 15, '케이프타운 테이블 마운틴 & 와이너리 투어', '케이프타운의 상징 테이블 마운틴을 방문하고 아름다운 와이너리에서 와인을 시음하는 투어', 5220000, 110000, '2025-05-15 09:00:00', '2025-05-17 18:00:00', 2, 8, 'ON_SALE', 'capetown_tablemountain_winery.jpg', 'TOUR', 0, 8, 'INTERNATIONAL', 'CAPETOWN', 'South Africa', 'CAPETOWN, South Africa', '')
;


INSERT IGNORE INTO tbl_product_theme (product_code, theme_code) VALUES
                                                                    (1, 1),    -- 서울 시티 투어 -> TOUR (THEME_001)
                                                                    (2, 2),    -- 부산 골프 리조트 투어 -> GOLF (THEME_002)
                                                                    (3, 3),    -- 제주 크루즈 투어 -> CRUISE (THEME_003)
                                                                    (4, 4),    -- 강릉 키즈 체험 투어 -> KIDS (THEME_004)
                                                                    (5, 5),    -- 대전 허니문 스페셜 -> HONEYMOON (THEME_005)
                                                                    (6, 6),    -- 도쿄 시니어 문화 투어 -> SILVER (THEME_006)
                                                                    (7, 1),    -- 방콕 시내 투어 -> TOUR (THEME_001)
                                                                    (8, 2),    -- 파리 골프 투어 -> GOLF (THEME_002)
                                                                    (9, 5),    -- 로마 허니문 투어 -> HONEYMOON (THEME_005)
                                                                    (10, 6),   -- 뉴욕 실버 시티 투어 -> SILVER (THEME_006)
                                                                    (11, 4),   -- 춘천 가족 여행 -> KIDS (THEME_004)
                                                                    (12, 3),   -- 수원 역사 탐방 -> CRUISE (THEME_003)
                                                                    (13, 5),   -- 청주 힐링 여행 -> HONEYMOON (THEME_005)
                                                                    (14, 1),   -- 대구 미식 투어 -> TOUR (THEME_001)
                                                                    (15, 2),   -- 전주 한옥마을 투어 -> GOLF (THEME_002)
                                                                    (16, 3),   -- 경주 신라 역사 투어 -> CRUISE (THEME_003)
                                                                    (17, 5),   -- 광주 예술 여행 -> HONEYMOON (THEME_005)
                                                                    (18, 4),   -- 울산 산업 탐방 -> KIDS (THEME_004)
                                                                    (19, 1),   -- 도쿄 쇼핑 투어 -> TOUR (THEME_001)
                                                                    (20, 2),   -- 방콕 왕궁 및 사원 투어 -> GOLF (THEME_002)
                                                                    (21, 3),   -- 파리 미술관 투어 -> CRUISE (THEME_003)
                                                                    (22, 1),   -- 로마 고대 유적 투어 -> TOUR (THEME_001)
                                                                    (23, 2),   -- 뉴욕 뮤지컬 투어 -> GOLF (THEME_002)
                                                                    (24, 4),   -- 몰디브 해양 액티비티 -> KIDS (THEME_004)
                                                                    (25, 5),   -- 시드니 오페라 하우스 투어 -> HONEYMOON (THEME_005)
                                                                    (26, 6),   -- 두바이 럭셔리 쇼핑 투어 -> SILVER (THEME_006)
                                                                    (27, 4);   -- 케이프타운 자연 투어 -> KIDS (THEME_004)

