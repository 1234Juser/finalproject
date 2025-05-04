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
