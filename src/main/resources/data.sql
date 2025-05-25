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

-- 게시물테이블 중복삭제
DELETE FROM tbl_like;
DELETE FROM tbl_companion_comment;
DELETE FROM tbl_companion;
INSERT INTO tbl_companion (companion_id, member_code, companion_title, companion_content, companion_created_at, companion_modified_at, companion_view_count,companion_notice) VALUES
                                                                                                                                                                 (1, (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), '제목 1', '1번 동행글 내용입니다.', NOW() - INTERVAL 10 DAY, NULL, 12, true),
                                                                                                                                                                 (2, (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), '제목 2', '2번 동행글 내용입니다.', NOW() - INTERVAL 9 DAY, NULL, 34, false),
                                                                                                                                                                 (3, (SELECT member_code FROM tbl_member WHERE member_id = 'user03'), '제목 3', '3번 동행글 내용입니다.', NOW() - INTERVAL 8 DAY, NULL, 56, false),
                                                                                                                                                                 (4, (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), '제목 4', '4번 동행글 내용입니다.', NOW() - INTERVAL 7 DAY, NULL, 21, false),
                                                                                                                                                                 (5, (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), '제목 5', '5번 동행글 내용입니다.', NOW() - INTERVAL 6 DAY, NULL, 0, false),
                                                                                                                                                                 (6, (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), '제목 6', '6번 동행글 내용입니다.', NOW() - INTERVAL 5 DAY, NULL, 13, false),
                                                                                                                                                                 (7, (SELECT member_code FROM tbl_member WHERE member_id = 'user03'), '제목 7', '7번 동행글 내용입니다.', NOW() - INTERVAL 4 DAY, NULL, 88, false),
                                                                                                                                                                 (8, (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), '제목 8', '8번 동행글 내용입니다.', NOW() - INTERVAL 3 DAY, NULL, 45, false),
                                                                                                                                                                 (9, (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), '제목 9', '9번 동행글 내용입니다.', NOW() - INTERVAL 2 DAY, NULL, 7, false),
                                                                                                                                                                 (10, (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), '제목 10', '10번 동행글 내용입니다.', NOW() - INTERVAL 1 DAY, NULL, 99, false),
                                                                                                                                                                 (11, (SELECT member_code FROM tbl_member WHERE member_id = 'user03'), '제목 11', '11번 동행글 내용입니다.', NOW(), NULL, 3, false);


-- 여행커뮤니티댓글테이블
-- 게시글 1번에 댓글 11개
INSERT INTO tbl_companion_comment (companion_comment_id, member_code, companion_id, companion_comment_content, companion_comment_created_at, companion_comment_modified_at) VALUES
                                                                                                                                                                                (1, (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), 1, '1번 게시물의 댓글 1', NOW() - INTERVAL 11 DAY, NULL),
                                                                                                                                                                                (2, (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), 1, '1번 게시물의 댓글 2', NOW() - INTERVAL 10 DAY, NULL),
                                                                                                                                                                                (3, (SELECT member_code FROM tbl_member WHERE member_id = 'user03'), 1, '1번 게시물의 댓글 3', NOW() - INTERVAL 9 DAY, NULL),
                                                                                                                                                                                (4, (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), 1, '1번 게시물의 댓글 4', NOW() - INTERVAL 8 DAY, NULL),
                                                                                                                                                                                (5, (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), 1, '1번 게시물의 댓글 5', NOW() - INTERVAL 7 DAY, NULL),
                                                                                                                                                                                (6, (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), 1, '1번 게시물의 댓글 6', NOW() - INTERVAL 6 DAY, NULL),
                                                                                                                                                                                (7, (SELECT member_code FROM tbl_member WHERE member_id = 'user03'), 1, '1번 게시물의 댓글 7', NOW() - INTERVAL 5 DAY, NULL),
                                                                                                                                                                                (8, (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), 1, '1번 게시물의 댓글 8', NOW() - INTERVAL 4 DAY, NULL),
                                                                                                                                                                                (9, (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), 1, '1번 게시물의 댓글 9', NOW() - INTERVAL 3 DAY, NULL),
                                                                                                                                                                                (10, (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), 1, '1번 게시물의 댓글 10', NOW() - INTERVAL 2 DAY, NULL),
                                                                                                                                                                                (11, (SELECT member_code FROM tbl_member WHERE member_id = 'user03'), 1, '1번 게시물의 댓글 11', NOW() - INTERVAL 1 DAY, NULL),
                                                                                                                                                                                (12, (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), 2, '2번 게시물의 댓글', NOW() - INTERVAL 10 DAY, NULL),
                                                                                                                                                                                (13, (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), 3, '3번 게시물의 댓글', NOW() - INTERVAL 9 DAY, NULL),
                                                                                                                                                                                (14, (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), 4, '4번 게시물의 댓글', NOW() - INTERVAL 8 DAY, NULL),
                                                                                                                                                                                (15, (SELECT member_code FROM tbl_member WHERE member_id = 'user03'), 5, '5번 게시물의 댓글', NOW() - INTERVAL 7 DAY, NULL),
                                                                                                                                                                                (16, (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), 6, '6번 게시물의 댓글', NOW() - INTERVAL 6 DAY, NULL),
                                                                                                                                                                                (17, (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), 7, '7번 게시물의 댓글', NOW() - INTERVAL 5 DAY, NULL),
                                                                                                                                                                                (18, (SELECT member_code FROM tbl_member WHERE member_id = 'user02'), 8, '8번 게시물의 댓글', NOW() - INTERVAL 4 DAY, NULL),
                                                                                                                                                                                (19, (SELECT member_code FROM tbl_member WHERE member_id = 'user03'), 9, '9번 게시물의 댓글', NOW() - INTERVAL 3 DAY, NULL),
                                                                                                                                                                                (20, (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), 10, '10번 게시물의 댓글', NOW() - INTERVAL 2 DAY, NULL),
                                                                                                                                                                                (21, (SELECT member_code FROM tbl_member WHERE member_id = 'user01'), 11, '11번 게시물의 댓글', NOW() - INTERVAL 1 DAY, NULL);

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

                                                                                      -- user04의 팔로워 (다른 사람이 user04를 팔로우) - 3개
                                                                                      ((SELECT member_code FROM tbl_member WHERE member_id = 'user01'), (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), NOW() - INTERVAL 19 DAY),
                                                                                      ((SELECT member_code FROM tbl_member WHERE member_id = 'user02'), (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), NOW() - INTERVAL 17 DAY),
                                                                                      ((SELECT member_code FROM tbl_member WHERE member_id = 'user03'), (SELECT member_code FROM tbl_member WHERE member_id = 'user04'), NOW() - INTERVAL 14 DAY),

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

INSERT IGNORE INTO tbl_product (
    product_uid, country_id, city_id, theme_code,
    product_title, product_content, product_adult_price, product_child_price,
    product_start_date, product_end_date, product_min_participants,
    product_max_participants, product_status, product_thumbnail, review_count, region_code, region_type,
    city_name, country_name, full_location, product_description) VALUES
('SEOUL001', 01, 1, 1, '결제용테스트', '결제용테스트', 500, 100, '2025-05-01 09:00:00', '2025-05-31 18:00:00', 1, 30, 'ON_SALE', '/static/img/earth.jpg',  0, 1, 'DOMESTIC', 'SEOUL', 'South Korea', 'SEOUL, South Korea', ''),
('SEOUL002', 01, 1, 7, '서울 트레킹 명소 투어', '서울의 아름다운 산과 숲길을 따라 걷는 힐링 트레킹 투어', 500, 100, '2025-05-01 09:00:00', '2025-05-31 18:00:00', 1, 30, 'ON_SALE', '/static/img/product/region1/seoul.jpg', 0, 1, 'DOMESTIC', 'SEOUL', 'South Korea', 'SEOUL, South Korea', ''),
('SEOUL003', 01, 1, 1, '서울 시티 투어', '서울 시내 관광 투어', 101880, 51020, '2025-05-01 09:00:00', '2025-05-31 18:00:00', 1, 30, 'ON_SALE', '/static/img/product/region1/seoul.jpg',  0, 1, 'DOMESTIC', 'SEOUL', 'South Korea', 'SEOUL, South Korea', ''),
('SEOUL004', 01, 1, 11, '서울 힐링 & 전통 문화 체험', '북촌 한옥마을과 남산골 한옥마을에서 즐기는 전통 체험', 71950, 36040, '2025-09-05 10:00:00', '2025-09-07 17:00:00', 2, 10, 'CLOSED', '/static/img/product/region1/seoul.jpg',  0, 1, 'DOMESTIC', 'SEOUL', 'South Korea', 'SEOUL, South Korea', ''),
('SEOUL005', 01, 1, 15, '서울 야경 명소 버스 투어', '서울의 아름다운 야경을 편안하게 감상하는 투어', 67900, 33870, '2025-05-20 19:00:00', '2025-05-20 23:00:00', 5, 30, 'CLOSED', '/static/img/product/region1/seoul.jpg',  0, 1, 'DOMESTIC', 'SEOUL', 'South Korea', 'SEOUL, South Korea', ''),
('SEOUL006', 01, 1, 4, '서울 놀이공원 & 벚꽃 축제 투어', '신나는 놀이기구와 아름다운 벚꽃을 만끽하는 봄 시즌 한정 투어', 91880, 45910, '2025-04-05 10:00:00', '2025-04-07 18:00:00', 5, 30, 'CLOSED', '/static/img/product/region1/seoul.jpg',  0, 1, 'DOMESTIC', 'SEOUL', 'South Korea', 'SEOUL, South Korea', ''),

('BUSAN001', 01, 2, 2, '부산 골프 리조트 투어', '부산 최고의 골프 리조트를 즐기는 패키지', 254870, 149650, '2025-06-01 09:00:00', '2025-06-30 18:00:00', 2, 20, 'ON_SALE', '/static/img/product/region2/busan.jpg', 0, 2, 'DOMESTIC', 'BUSAN', 'South Korea', 'BUSAN, South Korea', ''),
('BUSAN002', 01, 2, 8, '부산 불꽃 축제 & 야경 투어', '부산의 화려한 불꽃 축제와 아름다운 야경을 즐기는 특별한 투어', 127900, 69880, '2025-08-15 19:00:00', '2025-08-15 23:00:00', 2, 20, 'ON_SALE', '/static/img/product/region2/busan.jpg',  0, 2, 'DOMESTIC', 'BUSAN', 'South Korea', 'BUSAN, South Korea', ''),

('JEJU001', 01, 3, 3, '제주 크루즈 투어', '제주 해안을 따라 즐기는 럭셔리 크루즈', 304880, 34910, '2025-07-01 09:00:00', '2025-07-31 18:00:00', 10, 100, 'ON_SALE', '/static/img/product/region3/jeju.jpg',  0, 3, 'DOMESTIC', 'JEJU', 'South Korea', 'JEJU, South Korea', ''),
('JEJU002', 01, 3, 9, '제주 면세점 쇼핑 & 맛집 투어', '제주 면세점에서 쇼핑을 즐기고 현지인 추천 맛집을 탐방하는 투어', 95950, 17880, '2025-07-05 10:00:00', '2025-07-10 17:00:00', 10, 100, 'ON_SALE', '/static/img/product/region3/jeju.jpg',  0, 3, 'DOMESTIC', 'JEJU', 'South Korea', 'JEJU, South Korea', ''),
('JEJU003', 01, 3, 7, '제주 한라산 영실 코스 트레킹 투어', '한라산 영실 코스를 따라 아름다운 기암괴석과 풍경을 감상하는 트레킹 투어', 71880, 39930, '2025-08-01 08:00:00', '2025-08-01 16:00:00', 5, 15, 'ON_SALE', '/static/img/product/region3/jeju.jpg',  0, 3, 'DOMESTIC', 'JEJU', 'South Korea', 'JEJU, South Korea', ''),
('JEJU004', 01, 3, 11, '제주 서부 해안 & 오설록 힐링 투어', '곽지과물 해변, 협재 해변 등 아름다운 서부 해안을 따라 오설록 티 뮤지엄에서 차를 즐기는 힐링 여행', 86900, 21870, '2025-08-20 09:30:00', '2025-08-20 17:00:00', 3, 12, 'ON_SALE', '/static/img/product/region3/jeju.jpg', 0, 3, 'DOMESTIC', 'JEJU', 'South Korea', 'JEJU, South Korea', ''),
('JEJU005', 01, 3, 13, '제주 동굴 & 화산 지형 탐험 투어', '만장굴, 성산일출봉 등 제주의 독특한 화산 지형과 동굴을 탐험하며 자연 역사를 배우는 투어', 91880, 47950, '2025-09-10 10:00:00', '2025-09-10 18:00:00', 4, 18, 'ON_SALE', '/static/img/product/region3/jeju.jpg',  0, 3, 'DOMESTIC', 'JEJU', 'South Korea', 'JEJU, South Korea', ''),


('GANGNEUNG001', 01, 4, 4, '강릉 키즈 체험 투어', '아이들과 함께하는 해변 체험 프로그램', 91950, 44880, '2025-06-15 09:00:00', '2025-06-30 18:00:00', 2, 25, 'ON_SALE', '/static/img/product/region1/gangneung.jpg',  0, 1, 'DOMESTIC', 'GANGNEUNG', 'South Korea', 'GANGNEUNG, South Korea', ''),
('GANGNEUNG003', 01, 4, 4, '강릉 바다 열차 & 회 센터 즐기기', '낭만적인 동해 바다를 따라 달리는 기차 여행', 77880, 39930, '2025-06-25 10:00:00', '2025-06-25 18:00:00', 2, 20, 'CLOSED', '/static/img/product/region1/gangneung.jpg',  0, 1, 'DOMESTIC', 'GANGNEUNG', 'South Korea', 'GANGNEUNG, South Korea', ''),
('GANGNEUNG002', 01, 4, 10, '강릉 커피 축제 & 해변 드라이브', '향긋한 커피 축제와 함께 아름다운 강릉 해안 도로를 따라 드라이브하는 투어', 70900, 34870, '2025-10-01 09:00:00', '2025-10-03 18:00:00', 2, 25, 'ON_SALE', '/static/img/product/region1/gangneung.jpg',  0, 1, 'DOMESTIC', 'GANGNEUNG', 'South Korea', 'GANGNEUNG, South Korea', ''),

('DAEJEON001', 01, 5, 5, '대전 허니문 스페셜', '신혼부부를 위한 럭셔리 과학 도시 체험', 184880, 99870, '2025-07-01 09:00:00', '2025-07-15 18:00:00', 2, 10, 'ON_SALE', '/static/img/product/region1/daejeon.jpg',  0, 1, 'DOMESTIC', 'DAEJEON', 'South Korea', 'DAEJEON, South Korea', ''),
('DAEJEON002', 01, 5, 11, '대전 과학관 탐험 & 족욕 체험', '다양한 과학 전시관을 탐험하고 유성 온천에서 피로를 푸는 힐링 투어', 52900, 27910, '2025-09-10 14:00:00', '2025-09-12 18:00:00', 2, 10, 'ON_SALE', '/static/img/product/region1/daejeon.jpg',  0, 1, 'DOMESTIC', 'DAEJEON', 'South Korea', 'DAEJEON, South Korea', ''),
('DAEJEON003', 01, 5, 4, '대전 과학 기술 신나는 체험', '아이들과 함께 즐거운 과학 체험 학습', 61880, 31950, '2025-07-08 09:00:00', '2025-07-08 16:00:00', 3, 25, 'CLOSED', '/static/img/product/region1/daejeon.jpg',  0, 1, 'DOMESTIC', 'DAEJEON', 'South Korea', 'DAEJEON, South Korea', ''),

('INCHEON001', 01, 6, 13, '인천 강화도 역사 탐방 투어', '고려 시대부터 근현대까지, 강화도의 유서 깊은 역사를 따라가는 투어', 67950, 40110, '2025-07-05 09:00:00', '2025-07-06 18:00:00', 2, 15, 'ON_SALE', '/static/img/product/region1/incheon.jpg',  0, 1, 'DOMESTIC', 'INCHEON', 'South Korea', 'INCHEON, South Korea', ''),
('INCHEON002', 01, 6, 10, '인천 차이나타운 & 신포시장 먹방 투어', '인천의 명물 차이나타운과 신포시장에서 다양한 길거리 음식을 맛보는 미식 투어', 41880, 17930, '2025-08-15 11:00:00', '2025-08-15 16:00:00', 1, 10, 'ON_SALE', '/static/img/product/region1/incheon.jpg',  0, 1, 'DOMESTIC', 'INCHEON', 'South Korea', 'INCHEON, South Korea', ''),
('INCHEON003', 01, 6, 4, '월미도 테마파크 & 해양 생태 체험 투어', '아이들과 함께 월미도에서 놀이기구도 타고, 해양 생태도 배우는 신나는 투어', 57900, 43150, '2025-09-01 10:00:00', '2025-09-01 18:00:00', 2, 20, 'ON_SALE', '/static/img/product/region1/incheon.jpg',  0, 1, 'DOMESTIC', 'INCHEON', 'South Korea', 'INCHEON, South Korea', ''),

('CHUNCHEON001', 01, 7, 4, '춘천 가족 여행', '춘천의 아름다운 자연을 담은 가족 여행', 89770, 49880, '2025-05-01 00:00:00', '2025-05-31 00:00:00', 3, 20, 'ON_SALE', '/static/img/product/region1/chuncheon.jpg',  0, 1, 'DOMESTIC', 'CHUNCHEON', 'South Korea', 'CHUNCHEON, South Korea', ''),
('CHUNCHEON002', 01, 7, 8, '춘천 닭갈비 & 호수 유람선 투어', '춘천의 명물 닭갈비를 맛보고 아름다운 호수에서 유람선을 타는 낭만 투어', 52910, 27950, '2025-05-15 10:00:00', '2025-05-17 18:00:00', 3, 20, 'ON_SALE', '/static/img/product/region1/chuncheon.jpg',  0, 1, 'DOMESTIC', 'CHUNCHEON', 'South Korea', 'CHUNCHEON, South Korea', ''),
('CHUNCHEON003', 01, 7, 4, '춘천 닭갈비 맛집 & 소양호 유람', '춘천의 명물과 아름다운 호수를 만끽하는 여행', 81880, 43040, '2025-05-18 10:00:00', '2025-05-18 17:00:00', 4, 15, 'CLOSED', '/static/img/product/region1/chuncheon.jpg',  0, 1, 'DOMESTIC', 'CHUNCHEON', 'South Korea', 'CHUNCHEON, South Korea', ''),

('SUWON001', 01, 8, 13, '수원 역사 탐방', '수원화성을 중심으로 한 역사 여행', 52950, 27880, '2025-06-01 00:00:00', '2025-06-30 00:00:00', 2, 15, 'ON_SALE', '/static/img/product/region1/suwon.jpg',  0, 1, 'DOMESTIC', 'SUWON', 'South Korea', 'SUWON, South Korea', ''),
('SUWON002', 01, 8, 11, '수원 화성 야간 달빛 투어', '밤에 더욱 아름다운 수원 화성을 거닐며 역사 이야기를 듣는 특별한 투어', 91880, 71910, '2025-06-10 19:00:00', '2025-06-10 22:00:00', 2, 15, 'ON_SALE', '/static/img/product/region1/suwon.jpg',  0, 1, 'DOMESTIC', 'SUWON', 'South Korea', 'SUWON, South Korea', ''),
('SUWON003', 01, 8, 11, '수원 화성 달빛 아래 특별한 산책', '밤의 고즈넉한 수원 화성을 걷는 특별한 경험', 57910, 30150, '2025-06-12 19:00:00', '2025-06-12 22:00:00', 2, 18, 'CLOSED', '/static/img/product/region1/suwon.jpg',  0, 1, 'DOMESTIC', 'SUWON', 'South Korea', 'SUWON, South Korea', ''),

('CHEONGJU001', 01, 9, 11, '청주 힐링 여행', '청주의 자연과 문화를 느낄 수 있는 힐링 여행', 34900, 17870, '2025-07-01 00:00:00', '2025-07-31 00:00:00', 1, 10, 'ON_SALE', '/static/img/product/region1/cheongju.jpg',  0, 1, 'DOMESTIC', 'CHEONGJU', 'South Korea', 'CHEONGJU, South Korea', ''),
('CHEONGJU002', 01, 9, 10, '청주 농촌 체험 & 전통 음식 만들기', '청주의 농촌에서 다양한 체험 활동을 하고 전통 음식을 만들어보는 투어', 50330, 24980, '2025-07-20 09:00:00', '2025-07-22 17:00:00', 1, 10, 'ON_SALE', '/static/img/product/region1/cheongju.jpg',  0, 1, 'DOMESTIC', 'CHEONGJU', 'South Korea', 'CHEONGJU, South Korea', ''),
('CHEONGJU003', 01, 9, 13, '청주 직지 & 상당산성 역사 탐방', '청주의 역사와 문화를 탐방하는 여행', 47950, 25110, '2025-07-25 09:00:00', '2025-07-25 17:00:00', 1, 10, 'CLOSED', '/static/img/product/region1/cheongju.jpg',  0, 1, 'DOMESTIC', 'CHEONGJU', 'South Korea', 'CHEONGJU, South Korea', ''),

('DAEGU001', 01, 10, 10, '대구 미식 투어', '대구의 다양한 먹거리를 탐방하는 미식 여행', 71880, 39930, '2025-08-01 00:00:00', '2025-08-31 00:00:00', 2, 20, 'ON_SALE', '/static/img/product/region2/daegu.jpg',  0, 2, 'DOMESTIC', 'DAEGU', 'South Korea', 'DAEGU, South Korea', ''),
('DAEGU002', 01, 10, 11, '대구 근대 골목길 & 서문시장 투어', '대구의 역사적인 골목길을 탐방하고 활기 넘치는 전통 시장을 방문하는 투어', 32900, 14880, '2025-08-05 10:00:00', '2025-08-07 18:00:00', 2, 20, 'ON_SALE', '/static/img/product/region2/daegu.jpg',  0, 2, 'DOMESTIC', 'DAEGU', 'South Korea', 'DAEGU, South Korea', ''),
('DAEGU003', 01, 10, 1, '대구 서문시장 야경 & 근대 골목길 투어', '활기찬 야시장과 역사적인 골목을 둘러보는 여행', 67950, 34910, '2025-08-10 18:00:00', '2025-08-10 22:00:00', 3, 22, 'CLOSED', '/static/img/product/region2/daegu.jpg',  0, 2, 'DOMESTIC', 'DAEGU', 'South Korea', 'DAEGU, South Korea', ''),

('JEONJU001', 01, 11, 1, '전주 한옥마을 투어', '전주 한옥마을의 전통과 멋을 느낄 수 있는 여행', 61880, 34950, '2025-09-01 00:00:00', '2025-09-30 00:00:00', 3, 18, 'ON_SALE', '/static/img/product/region2/jeonju.jpg',  0, 2, 'DOMESTIC', 'JEONJU', 'South Korea', 'JEONJU, South Korea', ''),
('JEONJU002', 01, 11, 12, '전주 한복 체험 & 경기전 관람', '전주 한옥마을에서 아름다운 한복을 입고 경기전을 관람하는 특별한 경험', 47900, 24870, '2025-09-15 10:00:00', '2025-09-17 17:00:00', 3, 18, 'ON_SALE', '/static/img/product/region2/jeonju.jpg',  0, 2, 'DOMESTIC', 'JEONJU', 'South Korea', 'JEONJU, South Korea', ''),
('JEONJU003', 01, 11, 11, '전주 한옥마을에서의 특별한 하룻밤', '전통 한옥에서의 특별한 하룻밤과 다채로운 체험', 97950, 50110, '2025-09-20 15:00:00', '2025-09-21 11:00:00', 2, 16, 'CLOSED', '/static/img/product/region2/jeonju.jpg',  0, 2, 'DOMESTIC', 'JEONJU', 'South Korea', 'JEONJU, South Korea', ''),

('GYEONGJU001', 01, 12, 13, '경주 신라 역사 투어', '신라 천년의 역사를 따라가는 경주 여행', 30250, 9810, '2025-10-01 00:00:00', '2025-10-31 00:00:00', 1, 12, 'ON_SALE', '/static/img/product/region2/gyeongju.jpg',  0, 2, 'DOMESTIC', 'GYEONGJU', 'South Korea', 'GYEONGJU, South Korea', ''),
('GYEONGJU002', 01, 12, 13, '경주 불국사 & 첨성대 역사 투어', '신라의 대표적인 유적인 불국사와 첨성대를 방문하여 역사를 배우는 투어', 45180, 14930, '2025-10-05 09:00:00', '2025-10-07 18:00:00', 1, 12, 'ON_SALE', '/static/img/product/region2/gyeongju.jpg',  0, 2, 'DOMESTIC', 'GYEONGJU', 'South Korea', 'GYEONGJU, South Korea', ''),
('GYEONGJU003', 01, 12, 11, '경주 불국사의 고즈넉한 아침 산책', '조용한 아침, 불국사의 아름다움을 느껴보는 힐링 투어', 39880, 20150, '2025-10-20 07:00:00', '2025-10-20 10:00:00', 1, 10, 'CLOSED', '/static/img/product/region2/gyeongju.jpg',  0, 2, 'DOMESTIC', 'GYEONGJU', 'South Korea', 'GYEONGJU, South Korea', ''),

('GWANGJU001', 01, 13, 14, '광주 예술 여행', '광주의 예술과 문화를 체험하는 특별한 여행', 64920, 35040, '2025-11-01 00:00:00', '2025-11-30 00:00:00', 2, 15, 'ON_SALE', '/static/img/product/region2/gwangju.jpg',  0, 2, 'DOMESTIC', 'GWANGJU', 'South Korea', 'GWANGJU, South Korea', ''),
('GWANGJU002', 01, 13, 14, '광주 비엔날레 & 예술의 거리 투어', '광주 비엔날레 전시를 관람하고 예술가들의 혼이 담긴 거리를 둘러보는 투어', 59870, 30110, '2025-11-01 10:00:00', '2025-11-03 18:00:00', 2, 15, 'ON_SALE', '/static/img/product/region2/gwangju.jpg',  0, 2, 'DOMESTIC', 'GWANGJU', 'South Korea', 'GWANGJU, South Korea', ''),
('GWANGJU003', 01, 13, 10, '광주 떡갈비 & 남광주 야시장 투어', '광주 송정리 떡갈비 골목에서 맛있는 떡갈비를 맛보고, 활기찬 남광주 야시장을 즐기는 투어', 65100, 40330, '2025-11-15 17:00:00', '2025-11-15 22:00:00', 2, 12, 'ON_SALE', '/static/img/product/region2/gwangju.jpg',  0, 2, 'DOMESTIC', 'GWANGJU', 'South Korea', 'GWANGJU, South Korea', ''),

('ULSAN001', 01, 14, 4, '울산 산업 탐방', '울산의 자동차, 조선 산업 현장을 견학하는 투어', 49880, 24950, '2025-12-01 00:00:00', '2025-12-31 00:00:00', 5, 25, 'ON_SALE', '/static/img/product/region2/ulsan.jpg', 0, 2, 'DOMESTIC', 'ULSAN', 'South Korea', 'ULSAN, South Korea', ''),
('ULSAN002', 01, 14, 1, '울산 조선소 & 태화강 국가정원 투어', '한국의 산업 중심지 울산의 조선소를 견학하고 아름다운 태화강 국가정원을 산책하는 투어', 54910, 30080, '2025-12-01 09:00:00', '2025-12-03 18:00:00', 5, 25, 'ON_SALE', '/static/img/product/region2/ulsan.jpg',  0, 2, 'DOMESTIC', 'ULSAN', 'South Korea', 'ULSAN, South Korea', ''),
('ULSAN003', 01, 14, 7, '울산 대왕암공원 & 간절곶 해안 트레킹', '울산의 아름다운 해안선을 따라 대왕암공원과 간절곶을 걷는 힐링 트레킹 투어', 50340, 27870, '2025-11-10 09:00:00', '2025-11-10 16:00:00', 3, 20, 'ON_SALE', '/static/img/product/region2/ulsan.jpg', 0, 2, 'DOMESTIC', 'ULSAN', 'South Korea', 'ULSAN, South Korea', ''),

('TOKYO001', 02, 15, 6, '도쿄 시니어 문화 투어', '실버 세대를 위한 편안한 도쿄 여행', 79660, 49880, '2025-06-01 09:00:00', '2025-06-30 18:00:00', 1, 20, 'ON_SALE', '/static/img/product/region4/tokyo.jpg',  0, 4, 'INTERNATIONAL', 'TOKYO', 'Japan', 'TOKYO', ''), -- full_location이 TOKYO만 있었는데 Japan 추가
('TOKYO002', 02, 15, 12, '도쿄 애니메이션 & 피규어 쇼핑 투어', '도쿄의 유명 애니메이션 거리에서 쇼핑을 즐기는 덕후 투어', 59800, 35190, '2025-06-05 11:00:00', '2025-06-08 20:00:00', 1, 20, 'ON_SALE', '/static/img/product/region4/tokyo.jpg',  0, 4, 'INTERNATIONAL', 'TOKYO', 'Japan', 'TOKYO', ''), -- full_location이 TOKYO만 있었는데 Japan 추가
('TOKYO003', 02, 15, 7, '도쿄 근교 온천 & 자연 감상 투어', '도쿄 근교의 유명 온천에서 휴식을 취하고 아름다운 자연을 만끽하는 힐링 투어', 37910, 31880, '2025-05-20 10:00:00', '2025-05-22 17:00:00', 1, 10, 'ON_SALE', '/static/img/product/region4/tokyo.jpg',  0, 4, 'INTERNATIONAL', 'TOKYO', 'Japan', 'TOKYO', ''), -- full_location이 TOKYO만 있었는데 Japan 추가
('TOKYO004', 02, 15, 15, '도쿄 디즈니랜드 & 디즈니씨 투어', '꿈과 환상의 세계, 도쿄 디즈니랜드와 디즈니씨를 하루에 모두 즐기는 특별한 투어', 149880, 100150, '2025-07-01 09:00:00', '2025-07-01 22:00:00', 1, 10, 'ON_SALE', '/static/img/product/region4/tokyo.jpg',  0, 4, 'INTERNATIONAL', 'TOKYO', 'Japan', 'TOKYO', ''),
('TOKYO005', 02, 15, 12, '도쿄 애니메이션 성지 순례 투어', '유명 애니메이션 배경지를 방문하는 특별한 투어', 69750, 39900, '2025-10-10 09:00:00', '2025-10-12 18:00:00', 1, 8, 'SOLD_OUT', '/static/img/product/region4/tokyo.jpg',  0, 4, 'INTERNATIONAL', 'TOKYO', 'Japan', 'TOKYO', ''),
('TOKYO006', 02, 15, 1, '도쿄 스카이트리 & 아사쿠사 센소지 투어', '도쿄의 랜드마크와 전통적인 사찰 방문', 54930, 30120, '2025-06-15 10:00:00', '2025-06-17 17:00:00', 2, 16, 'SOLD_OUT', '/static/img/product/region4/tokyo.jpg',  0, 4, 'INTERNATIONAL', 'TOKYO', 'Japan', 'TOKYO', ''),
('TOKYO007', 02, 15, 1, '도쿄 타워 & 오다이바 야경 투어', '도쿄의 상징적인 타워와 아름다운 해변 지역의 야경 감상', 49770, 24880, '2025-09-20 18:00:00', '2025-09-20 22:00:00', 3, 15, 'SOLD_OUT', '/static/img/product/region4/tokyo.jpg',  0, 4, 'INTERNATIONAL', 'TOKYO', 'Japan', 'TOKYO', ''),
('TOKYO008', 02, 15, 11, '도쿄 이자카야 & 골목길 탐방 투어', '도쿄 현지인처럼 즐기는 이자카야 체험과 숨겨진 골목길 탐험', 49890, 27930, '2025-08-10 18:00:00', '2025-08-10 23:00:00', 2, 8, 'ON_SALE', '/static/img/product/region4/tokyo.jpg',  0, 4, 'INTERNATIONAL', 'TOKYO', 'Japan', 'TOKYO', ''),

('OSAKA001', 02, 16, 10, '오사카 도톤보리 & 신사이바시 먹방 투어', '오사카의 대표적인 번화가에서 맛있는 음식을 즐기는 미식 투어', 54880, 30250, '2025-06-05 11:00:00', '2025-06-05 21:00:00', 1, 12, 'ON_SALE', '/static/img/product/region4/osaka.jpg',  0, 4, 'INTERNATIONAL', 'OSAKA', 'Japan', 'OSAKA, Japan', ''),
('OSAKA002', 02, 16, 13, '오사카 성 & 주택박물관 역사 투어', '오사카의 상징 오사카 성과 옛 오사카의 생활상을 엿볼 수 있는 주택박물관 방문', 49910, 25080, '2025-07-20 09:00:00', '2025-07-20 18:00:00', 2, 18, 'ON_SALE', '/static/img/product/region4/osaka.jpg',  0, 4, 'INTERNATIONAL', 'OSAKA', 'Japan', 'OSAKA, Japan', ''),
('OSAKA003', 02, 16, 9, '오사카 난바 & 신사이바시 쇼핑 투어', '오사카 최대 번화가에서 최신 유행 아이템을 쇼핑하는 투어', 59750, 35160, '2025-06-10 10:00:00', '2025-06-10 17:00:00', 1, 10, 'ON_SALE', '/static/img/product/region4/osaka.jpg',  0, 4, 'INTERNATIONAL', 'OSAKA', 'Japan', 'OSAKA, Japan', ''),

('BANGKOK001', 03, 17, 1, '방콕 시내 투어', '방콕의 주요 명소를 둘러보는 시내 투어', 79870, 45110, '2025-06-01 09:00:00', '2025-06-30 18:00:00', 1, 25, 'ON_SALE', '/static/img/product/region4/bangkok.jpg',  0, 4, 'INTERNATIONAL', 'BANGKOK', 'Thailand', 'BANGKOK, Thailand', ''),
('BANGKOK002', 03, 17, 13, '방콕 왕궁 및 사원 투어', '방콕의 화려한 왕궁과 사원을 탐방하는 투어', 84920, 50330, '2025-06-01 00:00:00', '2025-06-30 00:00:00', 2, 18, 'ON_SALE', '/static/img/product/region4/bangkok.jpg',  0, 4, 'INTERNATIONAL', 'BANGKOK', 'Thailand', 'BANGKOK, Thailand', ''),
('BANGKOK003', 03, 17, 13, '방콕 역사 유적지 심층 탐방 투어', '방콕의 왕궁, 사원 등 역사적인 유적지를 깊이 있게 둘러보는 투어', 89750, 55600, '2025-07-15 08:00:00', '2025-07-18 17:00:00', 1, 25, 'ON_SALE', '/static/img/product/region4/bangkok.jpg',  0, 4, 'INTERNATIONAL', 'BANGKOK', 'Thailand', 'BANGKOK, Thailand', ''),
('BANGKOK004', 03, 17, 8, '방콕 루프탑 바 & 야경 감상 투어', '방콕의 핫한 루프탑 바에서 멋진 야경을 감상하는 로맨틱 투어', 59800, 35170, '2025-06-15 19:00:00', '2025-06-15 23:00:00', 2, 18, 'ON_SALE', '/static/img/product/region4/bangkok.jpg',  0, 4, 'INTERNATIONAL', 'BANGKOK', 'Thailand', 'BANGKOK, Thailand', ''),
('BANGKOK005', 03, 17, 1, '방콕 짜뚜짝 시장 & 활기찬 수상 시장', '활기 넘치는 방콕의 대표 시장들을 둘러보는 투어', 44910, 25040, '2025-06-10 09:00:00', '2025-06-10 18:00:00', 5, 30, 'SOLD_OUT', '/static/img/product/region4/bangkok.jpg',  0, 4, 'INTERNATIONAL', 'BANGKOK', 'Thailand', 'BANGKOK, Thailand', ''),
('BANGKOK006', 03, 17, 10, '방콕 쿠킹 클래스 & 현지 시장 투어', '태국 전통 음식을 배우고 현지 시장을 체험하는 특별한 투어', 70330, 39880, '5-02-01 09:00:00', '2026-02-01 16:00:00', 2, 10, 'ON_SALE', '/static/img/product/region4/bangkok.jpg',  0, 4, 'INTERNATIONAL', 'BANGKOK', 'Thailand', 'BANGKOK, Thailand', ''),
('BANGKOK007', 03, 17, 11, '방콕 수상 보트 투어 & 사원 탐방', '짜오프라야 강을 따라 보트를 타고 주요 사원들을 둘러보는 투어', 64950, 38120, '2025-08-01 08:00:00', '2025-08-01 17:00:00', 3, 22, 'ON_SALE', '/static/img/product/region4/bangkok.jpg',  0, 4, 'INTERNATIONAL', 'BANGKOK', 'Thailand', 'BANGKOK, Thailand', ''),
('BANGKOK008', 03, 17, 1, '방콕 전통 마사지 & 짐 톰슨 하우스 투어', '태국 전통 마사지로 피로를 풀고 아름다운 짐 톰슨 하우스를 방문하는 힐링 투어', 54890, 30210, '2025-01-15 10:00:00', '2026-01-15 17:00:00', 2, 10, 'ON_SALE', '/static/img/product/region4/bangkok.jpg',  0, 4, 'INTERNATIONAL', 'BANGKOK', 'Thailand', 'BANGKOK, Thailand', ''),

('PARIS001', 04, 18, 1, '파리 근교 프리미엄 골프 투어', '파리 근교의 프리미엄 골프 코스를 즐기는 투어', 249700, 150150, '2025-07-01 09:00:00', '2025-07-15 18:00:00', 2, 12, 'ON_SALE', '/static/img/product/region5/paris.jpg',  0, 5, 'INTERNATIONAL', 'PARIS', 'France', 'PARIS, France', ''),
('PARIS002', 04, 18, 14, '파리 주요 미술관 탐방 투어', '세계적인 파리 미술관을 방문하는 예술 투어', 119650, 70380, '2025-07-01 00:00:00', '2025-07-31 00:00:00', 1, 8, 'ON_SALE', '/static/img/product/region5/paris.jpg',  0, 5, 'INTERNATIONAL', 'PARIS', 'France', 'PARIS, France', ''),
('PARIS003', 04, 18, 14, '파리 루브르 박물관 & 몽마르뜨 투어', '파리의 대표적인 미술관과 낭만적인 예술가 언덕을 방문하는 투어', 100400, 59890, '2025-08-01 09:00:00', '2025-08-04 18:00:00', 2, 12, 'ON_SALE', '/static/img/product/region5/paris.jpg',  0, 5, 'INTERNATIONAL', 'PARIS', 'France', 'PARIS, France', ''),
('PARIS004', 04, 18, 13, '파리 베르사유 궁전 & 정원 투어', '화려함의 극치 베르사유 궁전과 아름다운 정원을 둘러보는 럭셔리 투어', 129880, 75110, '2025-07-10 09:00:00', '2025-07-12 18:00:00', 1, 8, 'ON_SALE', '/static/img/product/region5/paris.jpg',  0, 5, 'INTERNATIONAL', 'PARIS', 'France', 'PARIS, France', ''),
('PARIS005', 04, 18, 1, '파리 에펠탑 & 센 강 유람선 투어', '파리의 상징 에펠탑을 방문하고 낭만적인 센 강을 따라 유람선을 타는 투어', 89770, 50030, '2025-09-01 10:00:00', '2025-09-01 22:00:00', 2, 10, 'ON_SALE', '/static/img/product/region5/paris.jpg',  0, 5, 'INTERNATIONAL', 'PARIS', 'France', 'PARIS, France', ''),
('PARIS006', 04, 18, 14, '파리 몽마르뜨 언덕 & 화가 체험 투어', '예술가의 거리 몽마르뜨를 거닐고 직접 그림을 그려보는 특별한 체험', 70120, 40350, '2025-10-10 11:00:00', '2025-10-10 19:00:00', 1, 8, 'ON_SALE', '/static/img/product/region5/paris.jpg',  0, 5, 'INTERNATIONAL', 'PARIS', 'France', 'PARIS, France', ''),

('ROME001', 05, 19, 5, '로마 허니문 투어', '역사와 낭만이 가득한 로마에서의 허니문', 129800, 70190, '2025-08-01 09:00:00', '2025-08-31 18:00:00', 2, 8, 'ON_SALE', '/static/img/product/region5/rome.jpg',  0, 5, 'INTERNATIONAL', 'ROME', 'Italy', 'ROME, Italy', ''),
('ROME002', 05, 19, 1, '로마 고대 유적 투어', '로마의 콜로세움, 포로 로마노 등 고대 유적을 탐험', 89750, 45310, '2025-08-01 00:00:00', '2025-08-31 00:00:00', 3, 12, 'ON_SALE', '/static/img/product/region5/rome.jpg',  0, 5, 'INTERNATIONAL', 'ROME', 'Italy', 'ROME, Italy', ''),
('ROME003', 05, 19, 15, '로마 오페라 관람 & 야경 투어', '로마에서 유명 오페라를 감상하고 아름다운 야경 명소를 방문하는 투어', 199660, 150440, '2025-09-05 19:00:00', '2025-09-08 23:00:00', 2, 8, 'ON_SALE', '/static/img/product/region5/rome.jpg',  0, 5, 'INTERNATIONAL', 'ROME', 'Italy', 'ROME, Italy', ''),
('ROME004', 05, 19, 13, '로마 바티칸 & 천사의 성 투어', '카톨릭의 중심지 바티칸과 웅장한 천사의 성을 방문하는 역사 투어', 110500, 64920, '2025-08-10 10:00:00', '2025-08-12 17:00:00', 3, 12, 'ON_SALE', '/static/img/product/region5/rome.jpg',  0, 5, 'INTERNATIONAL', 'ROME', 'Italy', 'ROME, Italy', ''),
('ROME005', 05, 19, 13, '로마 콜로세움 & 포로 로마노 심층 투어', '고대 로마의 중심지 콜로세움과 포로 로마노를 깊이 있게 탐험하는 역사 투어', 129910, 75630, '2025-10-01 09:00:00', '2025-10-01 18:00:00', 3, 15, 'ON_SALE', '/static/img/product/region5/rome.jpg',  0, 5, 'INTERNATIONAL', 'ROME', 'Italy', 'ROME, Italy', ''),
('ROME006', 05, 19, 1, '로마 트레비 분수 & 아름다운 스페인 광장', '로마의 아름다운 명소들을 걸으며 감상하는 투어', 79880, 40150, '2025-08-18 10:00:00', '2025-08-18 17:00:00', 2, 15, 'SOLD_OUT', '/static/img/product/region5/rome.jpg',  0, 5, 'INTERNATIONAL', 'ROME', 'Italy', 'ROME, Italy', ''),
('ROME007', 05, 19, 14, '로마 바티칸 박물관 & 시스티나 성당 투어', '미켈란젤로의 걸작이 있는 시스티나 성당과 바티칸 박물관을 관람하는 예술 투어', 110300, 65080, '2025-11-15 10:00:00', '2025-11-15 17:00:00', 2, 12, 'ON_SALE', '/static/img/product/region5/rome.jpg',  0, 5, 'INTERNATIONAL', 'ROME', 'Italy', 'ROME, Italy', ''),

('NEWYORK001', 06, 20, 6, '뉴욕 실버 시티 투어', '편안하게 즐기는 뉴욕의 시니어 투어', 107650, 65090, '2025-08-01 09:00:00', '2025-08-15 18:00:00', 1, 15, 'ON_SALE', '/static/img/product/region6/newyork.jpg',  0, 6, 'INTERNATIONAL', 'NEWYORK', 'United States', 'NEWYORK, United States', ''),
('NEWYORK002', 06, 20, 15, '뉴욕 뮤지컬 투어', '브로드웨이 뮤지컬 관람 및 뉴욕 문화 체험', 249810, 201550, '2025-09-01 00:00:00', '2025-09-30 00:00:00', 1, 10, 'ON_SALE', '/static/img/product/region6/newyork.jpg',  0, 6, 'INTERNATIONAL', 'NEWYORK', 'United States', 'NEWYORK, United States', ''),
('NEWYORK003', 06, 20, 7, '뉴욕 센트럴 파크 & 자연사 박물관 투어', '뉴욕의 대표적인 공원과 자연사 박물관을 탐험하는 투어', 134770, 80340, '2025-10-10 10:00:00', '2025-10-12 17:00:00', 1, 15, 'ON_SALE', '/static/img/product/region6/newyork.jpg',  0, 6, 'INTERNATIONAL', 'NEWYORK', 'United States', 'NEWYORK, United States', ''),
('NEWYORK004', 06, 20, 11, '뉴욕 브로드웨이 & 타임스퀘어 투어', '뉴욕 브로드웨이에서 인기 뮤지컬 거리와 화려한 타임스퀘어를 경험하는 투어', 54900, 30180, '2025-09-10 19:00:00', '2025-09-12 23:00:00', 1, 10, 'ON_SALE', '/static/img/product/region6/newyork.jpg',  0, 6, 'INTERNATIONAL', 'NEWYORK', 'United States', 'NEWYORK, United States', ''),
('NEWYORK005', 06, 20, 6, '뉴욕 자유의 여신상 & 웅장한 엠파이어 스테이트 빌딩', '뉴욕의 상징적인 랜드마크를 방문하는 필수 코스', 159880, 154720, '2025-09-15 09:00:00', '2025-09-15 18:00:00', 3, 10, 'SOLD_OUT', '/static/img/product/region6/newyork.jpg',  0, 6, 'INTERNATIONAL', 'NEWYORK', 'United States', 'NEWYORK, United States', ''),
('NEWYORK006', 06, 20, 1, '뉴욕 자유의 여신상 & 엘리스 섬 투어', '뉴욕의 상징 자유의 여신상과 이민 역사를 담은 엘리스 섬을 방문하는 투어', 184910, 95330, '2025-11-01 09:00:00', '2025-11-01 17:00:00', 1, 10, 'ON_SALE', '/static/img/product/region6/newyork.jpg',  0, 6, 'INTERNATIONAL', 'NEWYORK', 'United States', 'NEWYORK, United States', ''),
('NEWYORK007', 06, 20, 14, '뉴욕 현대 미술관(MoMA) & 록펠러 센터 투어', '세계적인 현대 미술 작품을 감상하고 뉴욕 시내를 한눈에 담을 수 있는 록펠러 센터 방문', 179500, 120660, '2025-12-10 10:00:00', '2025-12-10 18:00:00', 2, 8, 'ON_SALE', '/static/img/product/region6/newyork.jpg',  0, 6, 'INTERNATIONAL', 'NEWYORK', 'United States', 'NEWYORK, United States', ''),

('MALE001', 07, 21, 4, '몰디브 해양 액티비티', '몰디브의 아름다운 바다에서 즐기는 액티비티 투어', 87650, 50190, '2025-10-01 00:00:00', '2025-10-31 00:00:00', 4, 15, 'ON_SALE', '/static/img/product/region7/maldive.jpg',  0, 7, 'INTERNATIONAL', 'MALE', 'Maldives', 'MALE, Maldives', ''),
('MALE002', 07, 21, 12, '몰디브 스노클링 & 해변 휴양 투어', '몰디브의 아름다운 바다에서 스노클링을 즐기고 프라이빗 해변에서 휴식을 취하는 투어', 64880, 39950, '2025-10-15 09:00:00', '2025-10-18 18:00:00', 4, 15, 'ON_SALE', '/static/img/product/region7/maldive.jpg',  0, 7, 'INTERNATIONAL', 'MALE', 'Maldives', 'MALE, Maldives', ''),
('MALE003', 07, 21, 12, '몰디브 섬 호핑 & 스노클링 투어', '다양한 몰디브의 섬들을 방문하여 스노클링을 즐기는 해양 액티비티 투어', 59700, 35340, '2025-11-01 09:00:00', '2025-11-03 18:00:00', 4, 12, 'ON_SALE', '/static/img/product/region7/maldive.jpg',  0, 7, 'INTERNATIONAL', 'MALE', 'Maldives', 'MALE, Maldives', ''),
('MALE004', 07, 21, 3, '몰디브 선셋 크루즈 & 로맨틱 디너', '아름다운 몰디브의 석양을 감상하며 즐기는 로맨틱한 저녁 식사', 124930, 70210, '2025-12-15 18:00:00', '2025-12-15 23:00:00', 2, 6, 'ON_SALE', '/static/img/product/region7/maldive.jpg',  0, 7, 'INTERNATIONAL', 'MALE', 'Maldives', 'MALE, Maldives', ''),

('SYDNEY001', 08, 22, 5, '시드니 오페라 하우스 투어', '시드니 오페라 하우스와 하버 브릿지를 탐방', 139880, 80150, '2025-11-01 00:00:00', '2025-11-30 00:00:00', 2, 10, 'ON_SALE', '/static/img/product/region7/sydney.jpg',  0, 7, 'INTERNATIONAL', 'SYDNEY', 'Australia', 'SYDNEY, Australia', ''),
('SYDNEY002', 08, 22, 13, '시드니 하버 브릿지 클라이밍 & 오페라 하우스 내부 투어', '시드니 하버 브릿지를 등반하고 오페라 하우스 내부를 관람하는 특별한 경험', 151020, 91370, '2025-11-10 10:00:00', '2025-11-12 17:00:00', 2, 10, 'ON_SALE', '/static/img/product/region7/sydney.jpg',  0, 7, 'INTERNATIONAL', 'SYDNEY', 'Australia', 'SYDNEY, Australia', ''),
('SYDNEY003', 08, 22, 5, '시드니 하버를 가로지르는 특별한 크루즈', '시드니의 아름다운 항만을 따라 즐기는 크루즈', 119750, 70440, '2025-11-15 14:00:00', '2025-11-15 22:00:00', 4, 18, 'SOLD_OUT', '/static/img/product/region7/sydney.jpg',  0, 7, 'INTERNATIONAL', 'SYDNEY', 'Australia', 'SYDNEY, Australia', ''),
('SYDNEY004', 08, 22, 7, '시드니 블루 마운틴 & 자연 탐험 투어', '웅장한 블루 마운틴의 아름다운 자연을 탐험하는 트레킹 투어', 144600, 85290, '2025-12-01 08:00:00', '2025-12-02 17:00:00', 3, 10, 'ON_SALE', '/static/img/product/region7/sydney.jpg',  0, 7, 'INTERNATIONAL', 'SYDNEY', 'Australia', 'SYDNEY, Australia', ''),
('SYDNEY005', 08, 22, 12, '시드니 본다이 비치 & 서핑 레슨', '시드니의 대표적인 해변 본다이에서 서핑을 배우고 자유시간을 즐기는 투어', 129910, 75630, '2025-01-10 10:00:00', '2026-01-10 16:00:00', 1, 15, 'ON_SALE', '/static/img/product/region7/sydney.jpg',  0, 7, 'INTERNATIONAL', 'SYDNEY', 'Australia', 'SYDNEY, Australia', ''),

('DUBAI001', 09, 23, 6, '두바이 럭셔리 쇼핑 투어', '두바이의 럭셔리 쇼핑몰과 랜드마크를 방문', 139550, 80880, '2025-12-01 00:00:00', '2025-12-31 00:00:00', 3, 12, 'ON_SALE', '/static/img/product/region4/dubai.jpg',  0, 4, 'INTERNATIONAL', 'DUBAI', 'United Arab Emirates', 'DUBAI, United Arab Emirates', ''),
('DUBAI002', 09, 23, 14, '두바이 사막 사파리 & 벨리댄스 투어', '두바이의 광활한 사막에서 사파리 투어를 즐기고 전통 벨리댄스 공연을 관람하는 투어', 81300, 50770, '2025-12-10 15:00:00', '2025-12-12 22:00:00', 3, 12, 'ON_SALE', '/static/img/product/region4/dubai.jpg',  0, 4, 'INTERNATIONAL', 'DUBAI', 'United Arab Emirates', 'DUBAI, United Arab Emirates', ''),
('DUBAI003', 09, 23, 6, '두바이 부르즈 할리파 & 환상적인 두바이 몰', '세계 최고층 빌딩과 거대한 쇼핑몰을 방문하는 투어', 101820, 60310, '2025-12-15 10:00:00', '2025-12-15 20:00:00', 2, 12, 'SOLD_OUT', '/static/img/product/region4/dubai.jpg',  0, 4, 'INTERNATIONAL', 'DUBAI', 'United Arab Emirates', 'DUBAI, United Arab Emirates', ''),
('DUBAI004', 09, 23, 1, '두바이 몰 분수 쇼 & 야경 투어', '세계 최대 규모의 두바이 몰 분수 쇼와 화려한 야경을 감상하는 투어', 104940, 65120, '2025-01-05 19:00:00', '2026-01-05 23:00:00', 2, 10, 'ON_SALE', '/static/img/product/region4/dubai.jpg',  0, 4, 'INTERNATIONAL', 'DUBAI', 'United Arab Emirates', 'DUBAI, United Arab Emirates', ''),
('DUBAI005', 09, 23, 10, '두바이 전통 시장 & 향신료 체험 투어', '두바이의 전통 시장을 방문하여 다양한 향신료와 문화를 체험하는 투어', 55230, 29880, '2025-02-10 10:00:00', '2026-02-10 17:00:00', 3, 15, 'ON_SALE', '/static/img/product/region4/dubai.jpg',  0, 4, 'INTERNATIONAL', 'DUBAI', 'United Arab Emirates', 'DUBAI, United Arab Emirates', ''),

('CAPETOWN001', 10, 24, 4, '케이프타운 자연 투어', '케이프타운의 아름다운 자연 경관을 감상', 60110, 34950, '2025-05-01 00:00:00', '2025-05-31 00:00:00', 2, 8, 'ON_SALE', '/static/img/product/region8/capetown.jpg',  0, 8, 'INTERNATIONAL', 'CAPETOWN', 'South Africa', 'CAPETOWN, South Africa', ''),
('CAPETOWN002', 10, 24, 15, '케이프타운 테이블 마운틴 & 와이너리 투어', '케이프타운의 상징 테이블 마운틴을 방문하고 아름다운 와이너리에서 와인을 시음하는 투어', 154880, 114700, '2025-05-15 09:00:00', '2025-05-17 18:00:00', 2, 8, 'ON_SALE', '/static/img/product/region8/capetown.jpg',  0, 8, 'INTERNATIONAL', 'CAPETOWN', 'South Africa', 'CAPETOWN, South Africa', ''),
('CAPETOWN003', 10, 24, 4, '케이프타운 희망봉 & 귀여운 아프리카 펭귄', '아프리카 대륙의 남쪽 끝과 귀여운 펭귄을 만나는 투어', 134920, 70260, '2025-05-22 08:00:00', '2025-05-22 17:00:00', 3, 10, 'SOLD_OUT', '/static/img/product/region8/capetown.jpg',  0, 8, 'INTERNATIONAL', 'CAPETOWN', 'South Africa', 'CAPETOWN, South Africa', ''),
('CAPETOWN004', 10, 24, 1, '케이프타운 희망봉 & 케이블카 투어', '아프리카 최남단 희망봉을 방문하고 테이블 마운틴 케이블카를 탑승하는 투어', 101500, 59800, '2025-02-01 09:00:00', '2026-02-02 18:00:00', 2, 8, 'ON_SALE', '/static/img/product/region8/capetown.jpg',  0, 8, 'INTERNATIONAL', 'CAPETOWN', 'South Africa', 'CAPETOWN, South Africa', ''),
('CAPETOWN005', 10, 24, 12, '케이프타운 해변 & 해양 스포츠 체험', '케이프타운의 아름다운 해변에서 다양한 해양 스포츠를 즐기는 액티비티 투어', 80370, 49910, '2025-03-10 10:00:00', '2026-03-10 17:00:00', 1, 12, 'ON_SALE', '/static/img/product/region8/capetown.jpg',  0, 8, 'INTERNATIONAL', 'CAPETOWN', 'South Africa', 'CAPETOWN, South Africa', ''),

('TORONTO001', 11, 25, 1, '토론토 CN 타워 & 로열 온타리오 박물관 투어', '토론토의 랜드마크 CN 타워에서 아찔한 전망을 감상하고, 캐나다 최대 규모의 로열 온타리오 박물관에서 역사와 문화를 탐방하는 핵심 투어', 95380, 70110, '2025-09-15 09:30:00', '2025-09-15 17:30:00', 2, 15, 'ON_SALE', '/static/img/product/region6/toronto.jpg',  0, 6, 'INTERNATIONAL', 'TORONTO', 'Canada', 'TORONTO, Canada', ''),
('TORONTO002', 11, 25, 12, '토론토 출발! 나이아가라 폭포 & 와이너리 체험 일일 투어', '세계적인 명소 나이아가라 폭포의 웅장함을 느끼고, 주변 아이스와인 와이너리에서 특별한 시음까지 즐기는 어드벤처 가득한 하루', 137990, 100420, '2025-10-20 08:00:00', '2025-10-20 19:00:00', 4, 20, 'ON_SALE', '/static/img/product/region6/toronto.jpg',  0, 6, 'INTERNATIONAL', 'TORONTO', 'Canada', 'TORONTO, Canada', ''),

('BEIJING002', 12, 26, 9, '베이징 왕푸징 거리 & 이화원 쇼핑 투어', '활기찬 쇼핑 거리와 아름다운 황실 정원 방문', 95350, 47810, '2025-07-10 10:00:00', '2025-07-12 19:00:00', 4, 20, 'SOLD_OUT', '/static/img/product/region4/beijing.jpg',  0, 4, 'INTERNATIONAL', 'BEIJING', 'China', 'BEIJING, China', ''),
('BEIJING003', 12, 26, 13, '베이징 만리장성 & 명 13릉 투어', '웅장한 만리장성과 명나라 황제들의 무덤 방문', 140180, 69750, '2025-11-01 08:00:00', '2025-11-03 19:00:00', 4, 18, 'CLOSED', '/static/img/product/region4/beijing.jpg',  0, 4, 'INTERNATIONAL', 'BEIJING', 'China', 'BEIJING, China', ''),
('BEIJING004', 12, 26, 15, '베이징 서커스 & 딤섬 맛집 투어', '중국 전통 서커스 관람과 맛있는 딤섬 맛집 방문', 110590, 54930, '2025-07-15 18:00:00', '2025-07-15 22:00:00', 3, 20, 'CLOSED', '/static/img/product/region4/beijing.jpg',  0, 4, 'INTERNATIONAL', 'BEIJING', 'China', 'BEIJING, China', ''),
('BEIJING005', 12, 26, 13, '베이징 자금성 & 천단 공원 역사 투어', '중국의 대표적인 황궁 자금성과 하늘에 제사를 지내던 천단 공원을 방문하는 투어', 110270, 55160, '2025-03-01 09:00:00', '2026-03-01 18:00:00', 4, 25, 'ON_SALE', '/static/img/product/region4/beijing.jpg',  0, 4, 'INTERNATIONAL', 'BEIJING', 'China', 'BEIJING, China', ''),
('BEIJING006', 12, 26, 1, '베이징 후통 & 전통 가옥 체험 투어', '베이징의 옛 골목길 후통을 탐험하고 전통 가옥을 방문하여 중국 문화를 체험하는 투어', 90840, 44700, '2025-04-10 10:00:00', '2026-04-10 17:00:00', 2, 15, 'ON_SALE', '/static/img/product/region4/beijing.jpg',  0, 4, 'INTERNATIONAL', 'BEIJING', 'China', 'BEIJING, China', ''),

('SHANGHAI001', 12, 27, 16, '상하이 야경 & 유람선 투어', '황푸 강을 따라 펼쳐지는 상하이의 화려한 야경을 감상하는 로맨틱 투어', 120610, 59890, '2025-06-10 19:00:00', '2025-10-10 22:00:00', 2, 15, 'ON_SALE', '/static/img/product/region4/shanghai.jpeg',  0, 4, 'INTERNATIONAL', 'SHANGHAI', 'China', 'SHANGHAI, China', ''),
('SHANGHAI002', 12, 27, 13, '상하이 대한민국 임시정부 청사 & 신천지 투어', '대한민국의 독립운동 역사를 배우고 현대적인 문화 거리 신천지를 둘러보는 투어', 80130, 39940, '2025-07-05 10:00:00', '2025-07-05 17:00:00', 3, 20, 'ON_SALE', '/static/img/product/region4/shanghai.jpeg',  0, 4, 'INTERNATIONAL', 'SHANGHAI', 'China', 'SHANGHAI, China', ''),

('GUANGZHOU001', 12, 28, 1, '광저우 타워 & 주장 신도시 투어', '광저우의 랜드마크 광저우 타워에서 도시 전경을 감상하고 현대적인 주장 신도시를 둘러보는 투어', 100770, 50380, '2025-08-01 10:00:00', '2025-08-01 18:00:00', 2, 12, 'ON_SALE', '/static/img/product/region4/guangzhou.jpg',  0, 4, 'INTERNATIONAL', 'GUANGZHOU', 'China', 'GUANGZHOU, China', ''),
('GUANGZHOU002', 12, 28, 13, '광저우 진씨 서원 & 샤미엔 섬 투어', '화려한 전통 건축물 진씨 서원을 방문하고 이국적인 분위기의 샤미엔 섬을 둘러보는 투어', 70400, 34880, '2025-09-10 09:00:00', '2025-09-10 16:00:00', 4, 25, 'ON_SALE', '/static/img/product/region4/guangzhou.jpg', 0, 4, 'INTERNATIONAL', 'GUANGZHOU', 'China', 'GUANGZHOU, China', ''),

('MADRID001', 13, 29, 14, '마드리드 프라도 미술관 & 레티로 공원 투어', '세계적인 미술관 프라도 미술관을 방문하고 아름다운 레티로 공원에서 여유로운 시간을 보내는 투어', 110760, 54830, '2025-10-01 10:00:00', '2025-10-01 18:00:00', 2, 10, 'ON_SALE', '/static/img/product/region5/madrid.png',  0, 5, 'INTERNATIONAL', 'MADRID', 'Spain', 'MADRID, Spain', ''),
('MADRID002', 13, 29, 13, '마드리드 왕궁 & 오리엔테 광장 투어', '화려한 마드리드 왕궁을 둘러보고 왕궁 앞에 펼쳐진 아름다운 오리엔테 광장을 산책하는 투어', 90190, 45310, '2025-11-05 09:00:00', '2025-11-05 17:00:00', 3, 15, 'ON_SALE', '/static/img/product/region5/madrid.png',  0, 5, 'INTERNATIONAL', 'MADRID', 'Spain', 'MADRID, Spain', ''),

('BARCELONA001', 13, 30, 10, '바르셀로나 캄프 누 & 몬주익 언덕 투어', '축구 성지와 아름다운 야경을 자랑하는 언덕 방문', 150440, 74920, '2025-08-01 14:00:00', '2025-08-03 21:00:00', 2, 12, 'SOLD_OUT', '/static/img/product/region5/barcelona.jpg',  0, 5, 'INTERNATIONAL', 'BARCELONA', 'Spain', 'BARCELONA, Spain', ''),
('BARCELONA002', 13, 30, 14, '바르셀로나 피카소 미술관 & 구엘 공원 투어', '피카소의 예술 세계와 환상적인 구엘 공원 탐험', 160210, 80150, '2025-12-05 09:00:00', '2025-12-07 18:00:00', 3, 14, 'SOLD_OUT', '/static/img/product/region5/barcelona.jpg',  0, 5, 'INTERNATIONAL', 'BARCELONA', 'Spain', 'BARCELONA, Spain', ''),
('BARCELONA003', 13, 30, 3, '바르셀로나 해변 & 타파스 투어', '바르셀로나의 아름다운 해변을 즐기고 맛있는 타파스를 맛보는 투어', 125580, 62700, '2025-08-05 11:00:00', '2025-08-07 19:00:00', 2, 10, 'SOLD_OUT', '/static/img/product/region5/barcelona.jpg', 0, 5, 'INTERNATIONAL', 'BARCELONA', 'Spain', 'BARCELONA, Spain', ''),

('HANOI001', 14, 31, 1, '하노이 호안끼엠 호수 & 구시가지 투어', '하노이의 중심 호안끼엠 호수와 전통적인 구시가지를 둘러보는 투어', 65100, 32870, '2025-07-01 09:00:00', '2026-07-01 17:00:00', 4, 20, 'ON_SALE', '/static/img/product/region4/hanoi.jpg',  0, 4, 'INTERNATIONAL', 'HANOI', 'Vietnam', 'HANOI, Vietnam', ''),
('HANOI002', 14, 31, 13, '하노이 문묘 & 민족학 박물관 투어', '베트남 최초의 대학 문묘와 다양한 민족 문화를 전시하는 박물관을 방문하는 교육적인 투어', 72530, 35910, '2025-08-10 10:00:00', '2026-08-10 18:00:00', 3, 15, 'ON_SALE', '/static/img/product/region4/hanoi.jpg',  0, 4, 'INTERNATIONAL', 'HANOI', 'Vietnam', 'HANOI, Vietnam', ''),

('HOCHIMINH001', 14, 32, 13, '호치민 전쟁 박물관 & 통일궁 투어', '베트남 전쟁의 역사를 보여주는 박물관과 남베트남 대통령궁이었던 통일궁 방문', 68920, 33850, '2025-09-01 09:00:00', '2026-09-01 17:00:00', 2, 18, 'ON_SALE', '/static/img/product/region4/hochiminh.jpg',  0, 4, 'INTERNATIONAL', 'HOCHIMINH', 'Vietnam', 'HOCHIMINH', ''),
('HOCHIMINH002', 14, 32, 1, '호치민 벤탄 시장 & 사이공 강 크루즈', '활기 넘치는 벤탄 시장을 둘러보고 사이공 강을 따라 여유로운 크루즈를 즐기는 투어', 75250, 37660, '2025-10-10 18:00:00', '2026-10-10 22:00:00', 1, 10, 'ON_SALE', '/static/img/product/region4/hochiminh.jpg',  0, 4, 'INTERNATIONAL', 'HOCHIMINH', 'Vietnam', 'HOCHIMINH', ''),

('BERLIN001', 15, 33, 13, '베를린 장벽 & 체크포인트 찰리 투어', '냉전 시대의 상징 베를린 장벽과 체크포인트 찰리를 방문하는 역사 투어', 150880, 74730, '2025-11-01 09:00:00', '2026-11-01 17:00:00', 3, 15, 'ON_SALE', '/static/img/product/region5/berlin.jpg', 0, 5, 'INTERNATIONAL', 'BERLIN', 'Germany', 'BERLIN, Germany', ''),
('BERLIN002', 15, 33, 1, '베를린 브란덴부르크 문 & 국회의사당 투어', '베를린의 상징 브란덴부르크 문과 독일 연방 의회 의사당을 방문하는 투어', 130150, 65040, '2025-12-10 10:00:00', '2026-12-10 18:00:00', 2, 12, 'ON_SALE', '/static/img/product/region5/berlin.jpg',  0, 5, 'INTERNATIONAL', 'BERLIN', 'Germany', 'BERLIN, Germany', ''),

('HAMBURG001', 15, 34, 10, '함부르크 항구 & 어시장 투어', '활기 넘치는 함부르크 항구를 둘러보고 싱싱한 해산물을 맛볼 수 있는 어시장 방문', 110620, 54980, '2025-07-05 06:00:00', '2026-07-05 14:00:00', 1, 10, 'ON_SALE', '/static/img/product/region5/hamburg.jpg', 0, 5, 'INTERNATIONAL', 'HAMBURG', 'Germany', 'HAMBURG, Germany', ''),
('HAMBURG002', 15, 34, 1, '함부르크 시청사 & 알스터 호수 투어', '웅장한 함부르크 시청사를 방문하고 아름다운 알스터 호수 주변을 산책하는 투어', 95370, 48110, '2025-08-15 10:00:00', '2026-08-15 17:00:00', 2, 15, 'ON_SALE', '/static/img/product/region5/hamburg.jpg',  0, 5, 'INTERNATIONAL', 'HAMBURG', 'Germany', 'HAMBURG, Germany', ''),

('MUNICH001', 15, 35, 1, '뮌헨 마리엔 광장 & 신/구 시청사 투어', '뮌헨의 중심 마리엔 광장과 아름다운 신/구 시청사를 방문하는 투어', 120900, 59770, '2025-09-05 10:00:00', '2026-09-05 18:00:00', 3, 20, 'ON_SALE', '/static/img/product/region5/munich.jpg', 0, 5, 'INTERNATIONAL', 'MUNICH', 'Germany', 'MUNICH, Germany', ''),
('MUNICH002', 15, 35, 1, '뮌헨 BMW 박물관 & 올림픽 공원 투어', '세계적인 자동차 브랜드 BMW의 역사와 올림픽 공원을 둘러보는 투어', 105450, 52890, '2025-10-20 10:00:00', '2026-10-20 17:00:00', 2, 18, 'ON_SALE', '/static/img/product/region5/munich.jpg',  0, 5, 'INTERNATIONAL', 'MUNICH', 'Germany', 'MUNICH, Germany', ''),

('CAIRO001', 16, 36, 13, '카이로 피라미드 & 스핑크스 투어', '세계적인 불가사의 피라미드와 스핑크스를 방문하는 역사적인 투어', 95650, 47910, '2025-11-01 08:00:00', '2026-11-01 17:00:00', 5, 30, 'ON_SALE', '/static/img/product/region8/cairo.jpg',  0, 8, 'INTERNATIONAL', 'CAIRO', 'Egypt', 'CAIRO, Egypt', ''),
('CAIRO002', 16, 36, 13, '카이로 이집트 박물관 & 나일 강 크루즈', '파라오의 유물을 전시하는 이집트 박물관을 관람하고 나일 강을 따라 유유자적 크루즈를 즐기는 투어', 110330, 55180, '2025-12-15 10:00:00', '2026-12-15 22:00:00', 3, 20, 'ON_SALE', '/static/img/product/region8/cairo.jpg',  0, 8, 'INTERNATIONAL', 'CAIRO', 'Egypt', 'CAIRO, Egypt', ''),

('AUCKLAND001', 17, 37, 1, '오클랜드 스카이 타워 & 하버 브릿지 투어', '오클랜드의 상징 스카이 타워에서 도시 전경을 감상하고 하버 브릿지를 건너는 투어', 120870, 59640, '2025-09-01 10:00:00', '2026-09-01 18:00:00', 2, 10, 'ON_SALE', '/static/img/product/region7/auckland.jpg',  0, 7, 'INTERNATIONAL', 'AUCKLAND', 'New Zealand', 'AUCKLAND, New Zealand', ''),
('AUCKLAND002', 17, 37, 13, '오클랜드 박물관 & 아오테아 광장 투어', '마오리 문화와 뉴질랜드 역사를 전시하는 오클랜드 박물관과 활기찬 아오테아 광장을 방문하는 문화 투어', 95410, 47820, '2025-10-15 10:00:00', '2026-10-15 17:00:00', 3, 15, 'ON_SALE', '/static/img/product/region7/auckland.jpg',  0, 7, 'INTERNATIONAL', 'AUCKLAND', 'New Zealand', 'AUCKLAND, New Zealand', ''),

('RIO_DE_JANEIRO001', 18, 38, 1, '리우 예수상 & 팡 데 아수카르 투어', '리우의 상징 예수상과 아름다운 설탕빵 산을 방문하는 대표적인 투어', 160500, 79880, '2025-07-01 09:00:00', '2026-07-01 18:00:00', 3, 15, 'ON_SALE', '/static/img/product/region6/rio_de_janeiro.jpg',  0, 6, 'INTERNATIONAL', 'RIO_DE_JANEIRO', 'Brazil', 'RIO_DE_JANEIRO, Brazil', ''),
('RIO_DE_JANEIRO002', 18, 38, 1, '리우 코파카바나 & 이파네마 해변 투어', '세계적으로 유명한 코파카바나와 이파네마 해변을 즐기고 주변을 둘러보는 투어', 120340, 60120, '2025-08-15 10:00:00', '2026-08-15 17:00:00', 2, 20, 'ON_SALE', '/static/img/product/region6/rio_de_janeiro.jpg',  0, 6, 'INTERNATIONAL', 'RIO_DE_JANEIRO', 'Brazil', 'RIO_DE_JANEIRO, Brazil', ''),

('SAO_PAULO001', 18, 39, 14, '상파울루 미술관(MASP) & 이비라푸에라 공원 투어', '남미 최대 규모의 미술관 중 하나인 MASP와 넓고 아름다운 이비라푸에라 공원을 방문하는 문화 휴식 투어', 95770, 48300, '2025-09-05 10:00:00', '2026-09-05 17:00:00', 1, 10, 'ON_SALE', '/static/img/product/region6/sao_paulo.jpg',  0, 6, 'INTERNATIONAL', 'SAO PAULO', 'Brazil', 'SAO PAULO, Brazil', ''),
('SAO_PAULO002', 18, 39, 9, '상파울루 시립 시장 & 파울리스타 거리 투어', '다양한 식료품과 기념품을 판매하는 활기찬 시립 시장과 상파울루의 중심 거리 파울리스타를 둘러보는 투어', 80260, 39750, '2025-10-20 10:00:00', '2026-10-20 16:00:00', 2, 15, 'ON_SALE', '/static/img/product/region6/sao_paulo.jpg',  0, 6, 'INTERNATIONAL', 'SAO PAULO', 'Brazil', 'SAO PAULO, Brazil', ''),

('JAKARTA001', 19, 40, 13, '자카르타 국립 박물관 & 독립 광장 투어', '인도네시아의 역사와 문화를 전시하는 국립 박물관과 자카르타의 중심 독립 광장을 방문하는 투어', 55190, 27930, '2025-11-01 09:00:00', '2026-11-01 17:00:00', 4, 22, 'ON_SALE', '/static/img/product/region4/jakarta.jpg',  0, 4, 'INTERNATIONAL', 'JAKARTA', 'Indonesia', 'JAKARTA, Indonesia', ''),
('JAKARTA002', 19, 40, 13, '자카르타 올드타운 (코타 투아) & 파타힐라 광장 투어', '네덜란드 식민지 시대의 흔적이 남아있는 올드타운과 파타힐라 광장을 둘러보는 역사 문화 투어', 62480, 30880, '2025-12-15 10:00:00', '2026-12-15 16:00:00', 3, 18, 'ON_SALE', '/static/img/product/region4/jakarta.jpg',  0, 4, 'INTERNATIONAL', 'JAKARTA', 'Indonesia', 'JAKARTA, Indonesia', ''),

('LONDON001', 20, 41, 13, '런던 타워 & 타워 브릿지 투어', '런던의 역사적인 왕궁 런던 타워와 상징적인 타워 브릿지를 방문하는 투어', 121450, 71080, '2025-09-01 09:00:00', '2026-09-01 17:00:00', 3, 12, 'ON_SALE', '/static/img/product/region5/london.jpg', 0, 5, 'INTERNATIONAL', 'LONDON', 'United Kingdom', 'LONDON, United Kingdom', ''),
('LONDON002', 20, 41, 13, '런던 버킹엄 궁전 & 웨스트민스터 사원 투어', '영국 왕실의 상징 버킹엄 궁전과 역사적인 웨스트민스터 사원을 방문하는 투어', 102890, 60330, '2025-10-15 10:00:00', '2026-10-15 16:00:00', 2, 10, 'ON_SALE', '/static/img/product/region5/london.jpg',  0, 5, 'INTERNATIONAL', 'LONDON', 'United Kingdom', 'LONDON, United Kingdom', ''),

('MANCHESTER001', 20, 42, 1, '맨체스터 국립 축구 박물관 & 올드 트래포드 투어', '축구 팬이라면 놓칠 수 없는 국립 축구 박물관과 맨체스터 유나이티드의 홈 구장 올드 트래포드 방문', 144170, 72560, '2025-11-01 10:00:00', '2026-11-01 17:00:00', 1, 8, 'ON_SALE', '/static/img/product/region5/manchester.png',  0, 5, 'INTERNATIONAL', 'MANCHESTER', 'United Kingdom', 'MANCHESTER, United Kingdom', ''),
('MANCHESTER002', 20, 42, 13, '맨체스터 과학 산업 박물관 & 존 라이랜즈 도서관 투어', '산업 혁명의 중심지 맨체스터의 과학 기술 역사를 보여주는 박물관과 아름다운 고딕 양식의 도서관 방문', 118600, 59110, '2025-12-10 10:00:00', '2026-12-10 16:00:00', 2, 12, 'ON_SALE', '/static/img/product/region5/manchester.png',  0, 5, 'INTERNATIONAL', 'MANCHESTER', 'United Kingdom', 'MANCHESTER, United Kingdom', ''),

('MEXICO_CITY001', 21, 43, 13, '멕시코시티 소칼로 광장 & 국립 궁전 투어', '멕시코의 중심 소칼로 광장과 웅장한 국립 궁전을 방문하는 역사 문화 투어', 101720, 60880, '2025-09-01 09:00:00', '2026-09-01 17:00:00', 4, 25, 'ON_SALE', '/static/img/product/region6/mexico_city.jpg',  0, 6, 'INTERNATIONAL', 'MEXICO_CITY', 'Mexico', 'MEXICO_CITY, Mexico', ''),
('MEXICO_CITY002', 21, 43, 13, '멕시코시티 테오티우아칸 피라미드 투어', '고대 아즈텍 문명의 거대 유적지 테오티우아칸의 태양의 피라미드와 달의 피라미드를 탐험하는 투어', 122050, 70190, '2025-10-15 08:00:00', '2026-10-15 18:00:00', 3, 20, 'ON_SALE', '/static/img/product/region6/mexico_city.jpg',  0, 6, 'INTERNATIONAL', 'MEXICO_CITY', 'Mexico', 'MEXICO_CITY, Mexico', ''),

('MANILA001', 22, 44, 13, '마닐라 인트라무로스 & 산티아고 요새 투어', '스페인 식민지 시대의 성곽 도시 인트라무로스와 역사적인 산티아고 요새를 탐험하는 투어', 71880, 40300, '2025-07-01 09:00:00', '2026-07-01 17:00:00', 4, 22, 'ON_SALE', '/static/img/product/region4/manila.jpg',  0, 4, 'INTERNATIONAL', 'MANILA', 'Philippines', 'MANILA, Philippines', ''),
('MANILA002', 22, 44, 9, '마닐라 그린벨트 & 보니파시오 글로벌 시티 쇼핑 투어', '마닐라의 현대적인 쇼핑 중심지 그린벨트와 보니파시오 글로벌 시티에서 쇼핑을 즐기는 투어', 64910, 35160, '2025-08-15 10:00:00', '2026-08-15 18:00:00', 3, 20, 'ON_SALE', '/static/img/product/region4/manila.jpg',  0, 4, 'INTERNATIONAL', 'MANILA', 'Philippines', 'MANILA, Philippines', ''),

('CEBU001', 22, 45, 12, '세부 막탄 섬 호핑 & 해양 액티비티 투어', '세부 막탄 섬 주변의 아름다운 섬들을 방문하여 스노클링, 다이빙 등 해양 액티비티를 즐기는 투어', 101250, 59870, '2025-09-05 09:00:00', '2026-09-05 17:00:00', 2, 15, 'ON_SALE', '/static/img/product/region4/cebu.jpg',  0, 4, 'INTERNATIONAL', 'CEBU', 'Philippines', 'CEBU, Philippines', ''),
('CEBU002', 22, 45, 13, '세부 시티 역사 & 문화 유적지 투어', '세부 시티의 마젤란의 십자가, 산토니뇨 성당 등 역사적인 유적지와 문화를 체험하는 투어', 60370, 29940, '2025-10-20 10:00:00', '2026-10-20 16:00:00', 1, 10, 'ON_SALE', '/static/img/product/region4/cebu.jpg',  0, 4, 'INTERNATIONAL', 'CEBU', 'Philippines', 'CEBU, Philippines', ''),

('STOCKHOLM001', 23, 46, 13, '스톡홀름 감라스탄 & 왕궁 투어', '스톡홀름의 구시가지 감라스탄의 좁은 골목길을 탐험하고 스웨덴 왕궁을 방문하는 역사 문화 투어', 159700, 90550, '2025-11-01 09:00:00', '2026-11-01 17:00:00', 3, 12, 'ON_SALE', '/static/img/product/region5/stockholm.jpg', 0, 5, 'INTERNATIONAL', 'STOCKHOLM', 'Sweden', 'STOCKHOLM, Sweden', ''),
('STOCKHOLM002', 23, 46, 13, '스톡홀름 바사 박물관 & 스칸센 야외 박물관 투어', '침몰한 전함 바사를 전시하는 바사 박물관과 스웨덴의 전통 가옥과 동물을 볼 수 있는 스칸센 방문', 134810, 105390, '2025-12-15 10:00:00', '2026-12-15 16:00:00', 2, 10, 'ON_SALE', '/static/img/product/region5/stockholm.jpg',  0, 5, 'INTERNATIONAL', 'STOCKHOLM', 'Sweden', 'STOCKHOLM, Sweden', ''),

('BUENOS_AIRES001', 24, 47, 15, '부에노스아이레스 탱고 & 야경 투어', '탱고의 본고장에서 정열적인 탱고 공연을 관람하고 아름다운 부에노스아이레스의 야경을 감상하는 투어', 161040, 80770, '2025-07-01 19:00:00', '2026-07-01 23:00:00', 2, 10, 'ON_SALE', '/static/img/product/region6/buenos_aries.jpg',  0, 6, 'INTERNATIONAL', 'BUENOS AIRES', 'Argentina', 'BUENOS AIRES, Argentina', ''),
('BUENOS_AIRES002', 24, 47, 14, '부에노스아이레스 라 보카 & 산 텔모 지구 투어', '화려한 색감의 건물들이 인상적인 라 보카 지구와 고풍스러운 산 텔모 지구를 둘러보는 문화 투어', 121880, 69930, '2025-08-15 10:00:00', '2026-08-15 17:00:00', 3, 15, 'ON_SALE', '/static/img/product/region6/buenos_aries.jpg',  0, 6, 'INTERNATIONAL', 'BUENOS AIRES', 'Argentina', 'BUENOS AIRES, Argentina', ''),

('SINGAPORE001', 25, 48, 1, '싱가포르 마리나 베이 샌즈 & 가든스 바이 더 베이 투어', '싱가포르의 대표적인 랜드마크 마리나 베이 샌즈와 아름다운 가든스 바이 더 베이를 방문하는 투어', 184330, 155110, '2025-09-01 10:00:00', '2026-09-01 22:00:00', 2, 10, 'ON_SALE', '/static/img/product/region4/singapore.png',  0, 4, 'INTERNATIONAL', 'SINGAPORE', 'Singapore', 'SINGAPORE, Singapore', ''),
('SINGAPORE002', 25, 48, 12, '싱가포르 센토사 섬 & 유니버설 스튜디오 투어', '다양한 어트랙션과 해변을 즐길 수 있는 센토사 섬과 유니버설 스튜디오를 방문하는 즐거운 투어', 219660, 180490, '2025-10-15 10:00:00', '2026-10-15 19:00:00', 1, 8, 'ON_SALE', '/static/img/product/region4/singapore.png',  0, 4, 'INTERNATIONAL', 'SINGAPORE', 'Singapore', 'SINGAPORE, Singapore', ''),

('ZURICH001', 26, 49, 1, '취리히 호수 & 린덴호프 언덕 투어', '아름다운 취리히 호수에서 유람선을 타고 린덴호프 언덕에서 도시 전경을 감상하는 투어', 181520, 101370, '2025-11-01 10:00:00', '2026-11-01 17:00:00', 3, 12, 'ON_SALE', '/static/img/product/region5/zurich.jpg',  0, 5, 'INTERNATIONAL', 'ZURICH', 'Switzerland', 'ZURICH, Switzerland', ''),
('ZURICH002', 26, 49, 9, '취리히 반호프슈트라세 & 구시가지 투어', '세계적으로 유명한 쇼핑 거리 반호프슈트라세와 매력적인 구시가지를 둘러보는 투어', 149800, 89650, '2025-12-10 10:00:00', '2026-12-10 16:00:00', 2, 10, 'ON_SALE', '/static/img/product/region5/zurich.jpg', 0, 5, 'INTERNATIONAL', 'ZURICH', 'Switzerland', 'ZURICH, Switzerland', '');






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