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

INSERT INTO tbl_wish_group (member_code, group_name, wish_count) VALUES
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
    (1, 4, 2),
    (1, 5, 3),
    (1, 6, 3),
    (2, 7, 4),
    (2, 8, 4),
    (2, 9, 5),
    (2, 10, 5),
    (3, 11, 6),
    (3, 12, 6);

INSERT INTO tbl_option (product_code, reservation_date, adult_count, child_count) VALUES
    (1, '2025-05-20', 2, NULL),
    (2, '2025-04-08', 2, 3),
    (3, '2025-06-15', 1, 1),
    (4, '2025-04-23', 1, 1),
    (5, '2025-04-23', 1, 1);

INSERT INTO tbl_order (product_code, option_code, member_code, booking_uid, order_adult_price, order_children_price, total_price, order_date, order_status) VALUES
-- 일반상품: 아동 분리 없음
(1, 1, 1, 'RSV20250401-01', 120000, NULL, 240000, '2025-04-01 10:23:45', '예정'),
-- 디즈니월드: 아동 분리 있음
(2, 2, 1, 'RSV20250401-02', 80000, 50000, 310000, '2025-04-02 14:10:12', '완료'),
-- 디즈니월드: 취소된 주문
(3, 3, 1, 'RSV20250401-03', 80000, 50000, 130000, '2025-04-03 09:05:33', '취소'),
(4, 4, 2, 'RSV20250401-04', 80000, 50000, 130000, '2025-04-03 10:05:33', '완료'),
(5, 5, 3, 'RSV20250401-05', 80000, 50000, 130000, '2025-04-04 12:05:33', '완료');

INSERT INTO tbl_payment (member_code, order_code, payment_method, payment_brand, payment_time, payment_amount, payment_status, imp_uid, merchant_uid, receipt_url) VALUES
    (1, 1, '카드', '삼성카드', '2025-04-01 10:23:45', 240000, '완료', 'imp_1234567890', 'RSV20250401-01', 'https://receipt.url/1'),
    (1, 2, '무통장', '신한카드', '2025-04-02 14:10:12', 310000, '완료', 'imp_1234567891', 'RSV20250401-02', 'https://receipt.url/2'),
    (1, 3, '카드', '국민카드', '2025-04-03 09:05:33', 130000, '취소', 'imp_1234567892', 'RSV20250401-03', 'https://receipt.url/3'),
    (2, 4, '카드', '롯데카드', '2025-04-04 09:12:33', 130000, '완료', 'imp_1234567893', 'RSV20250401-04', 'https://receipt.url/4'),
    (3, 5, '카드', '우리카드', '2025-04-04 09:15:33', 130000, '완료', 'imp_1234567894', 'RSV20250401-05', 'https://receipt.url/5');

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