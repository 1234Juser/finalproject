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
    ('ADMIN'),  -- 관리자 권한
    ('USER');  -- 일반 사용자 권한

-- 3. 회원별권한 테이블 (tbl_member_role)
-- 홍길동: ADMIN 권한
-- 김유진: USER 권한 (소셜 로그인 사용자)
-- 박수정: USER 권한 (소셜 로그인 사용자)
INSERT INTO tbl_member_role (member_code, authority_code)
VALUES
    (1, 1),  -- 홍길동: ADMIN
    (2, 2),  -- 김유진: USER (소셜 로그인 사용자)
    (3, 2);  -- 박수정: USER (소셜 로그인 사용자)

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