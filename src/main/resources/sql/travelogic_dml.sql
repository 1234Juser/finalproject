USE travelogicdb;

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
(1, '2025-05-20', 2, 0),
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

INSERT INTO tbl_option (product_code, reservation_date, adult_count, child_count) VALUES
(10, '2025-05-09', 3, 2),
(11, '2025-05-09', 2, 1),
(12, '2025-05-09', 4, 0),
#20
(13, '2025-05-09', 2, 2),
(14, '2025-05-09', 1, 3),
(15, '2025-05-09', 2, 0),
(16, '2025-05-09', 5, 1),
(17, '2025-05-09', 1, 0),
(18, '2025-05-09', 2, 0),
#26
(19, '2025-05-09', 3, 2),
(20, '2025-05-09', 4, 0);


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
(27, 8, 4, 'RSV20250401-08', 80000, 50000, 130000, '2025-04-07 17:05:33', 'COMPLETED', 1),
(27, 9, 3, 'RSV20250401-09', 80000, 50000, 130000, '2025-04-08 12:05:33', 'COMPLETED', 1),
# 10
(27, 10, 2, 'RSV20250401-10', 80000, 50000, 130000, '2025-04-09 12:05:33', 'CANCELED', 0),
(27, 11, 1, 'RSV20250401-11', 80000, 50000, 130000, '2025-04-10 12:05:33', 'COMPLETED', 1),
(27, 12, 3, 'RSV20250401-12', 80000, 50000, 130000, '2025-04-11 12:05:33', 'COMPLETED', 1),
(21, 13, 3, 'RSV20250401-13', 80000, 50000, 130000, '2025-04-12 12:05:33', 'CANCELED', 0),
(27, 14, 2, 'RSV20250401-14', 80000, 50000, 130000, '2025-04-13 12:05:33', 'COMPLETED', 1),
(21, 15, 3, 'RSV20250401-15', 80000, 50000, 130000, '2025-04-14 12:05:33', 'SCHEDULED', 0),
#16
(27, 16, 3, 'RSV20250401-16', 80000, 50000, 130000, '2025-05-03 12:05:33', 'SCHEDULED', 0);

INSERT INTO tbl_order (product_code, option_code, member_code, booking_uid, order_adult_price, order_child_price, total_price, order_date, order_status, is_reviewed) VALUES
(10, 17, 1, 'RSV20250510-17', 70000, 30000, 250000, '2025-05-10 11:00:00', 'SCHEDULED', 0),
(11, 18, 2, 'RSV20250611-18', 80000, 25000, 185000, '2025-06-11 12:00:00', 'COMPLETED', 1),
(12, 19, 3, 'RSV20250712-19', 60000, 0, 240000, '2025-07-12 13:00:00', 'CANCELED', 0),
(13, 20, 4, 'RSV20250813-20', 90000, 40000, 320000, '2025-08-13 14:00:00', 'COMPLETED', 1),
#21
(14, 21, 1, 'RSV20250914-21', 75000, 35000, 230000, '2025-09-14 15:00:00', 'SCHEDULED', 0),
(15, 22, 2, 'RSV20251015-22', 120000, 0, 240000, '2025-10-15 16:00:00', 'COMPLETED', 1),
(16, 23, 3, 'RSV20251116-23', 60000, 20000, 340000, '2025-11-16 17:00:00', 'COMPLETED', 1),
(17, 24, 4, 'RSV20251217-24', 70000, 0, 280000, '2025-12-17 18:00:00', 'CANCELED', 0),
(18, 25, 1, 'RSV20250518-25', 50000, 0, 200000, '2025-05-18 11:30:00', 'COMPLETED', 1),
#26
(19, 26, 2, 'RSV20250619-26', 65000, 25000, 270000, '2025-06-19 12:30:00', 'SCHEDULED', 0),
(20, 27, 3, 'RSV20250720-27', 80000, 0, 320000, '2025-07-20 13:30:00', 'COMPLETED', 1);

INSERT INTO tbl_payment (member_code, order_code, payment_method, payment_brand, payment_time, payment_amount, payment_status, imp_uid, merchant_uid, receipt_url) VALUES
    (1, 1, 'CARD', '삼성카드', '2025-04-01 10:23:45', 240000, 'COMPLETED', 'imp_1234567890', 'RSV20250401-01', 'https://receipt.url/1'),
    (1, 2, 'CARD', '신한카드', '2025-04-02 14:10:12', 310000, 'COMPLETED', 'imp_1234567891', 'RSV20250401-02', 'https://receipt.url/2'),
    (1, 3, 'CARD', '국민카드', '2025-04-03 09:05:33', 130000, 'CANCELED', 'imp_1234567892', 'RSV20250401-03', 'https://receipt.url/3'),
    (2, 4, 'CARD', '롯데카드', '2025-04-03 10:05:33', 130000, 'COMPLETED', 'imp_1234567893', 'RSV20250401-04', 'https://receipt.url/4'),
    (3, 5, 'CARD', '우리카드', '2025-04-04 12:05:33', 130000, 'COMPLETED', 'imp_1234567894', 'RSV20250401-05', 'https://receipt.url/5'),
    (3, 6, 'CARD', '비씨카드', '2025-04-06 12:05:33', 130000, 'COMPLETED', 'imp_1234567895', 'RSV20250401-06', 'https://receipt.url/6');

INSERT INTO tbl_payment (member_code, order_code, payment_method, payment_brand, payment_time, payment_amount, payment_status, imp_uid, merchant_uid, receipt_url) VALUES
    (1, 7, 'CARD', '비씨카드', '2025-04-06 12:05:33', 130000, 'COMPLETED', 'imp_1234567896', 'RSV20250401-07', 'https://receipt.url/7'),
    (4, 8, 'CARD', '비씨카드', '2025-04-07 17:05:33', 130000, 'COMPLETED', 'imp_1234567897', 'RSV20250401-08', 'https://receipt.url/8'),
    (3, 9, 'CARD', '비씨카드', '2025-04-08 12:05:33', 130000, 'COMPLETED', 'imp_1234567898', 'RSV20250401-09', 'https://receipt.url/9'),
    # 10
    (2, 10, 'CARD', '비씨카드', '2025-04-09 12:05:33', 130000, 'CANCELED', 'imp_1234567899', 'RSV20250401-10', 'https://receipt.url/10'),
    (1, 11, 'CARD', '비씨카드', '2025-04-10 12:05:33', 130000, 'COMPLETED', 'imp_1234567900', 'RSV20250401-11', 'https://receipt.url/11'),
    (3, 12, 'CARD', '비씨카드', '2025-04-11 12:05:33', 130000, 'COMPLETED', 'imp_1234567901', 'RSV20250401-12', 'https://receipt.url/12'),
    (3, 13, 'CARD', '비씨카드', '2025-04-12 12:05:33', 130000, 'CANCELED', 'imp_1234567902', 'RSV20250401-13', 'https://receipt.url/13'),
    (2, 14, 'CARD', '비씨카드', '2025-04-13 12:05:33', 130000, 'COMPLETED', 'imp_1234567903', 'RSV20250401-14', 'https://receipt.url/14'),
    (3, 15, 'CARD', '비씨카드', '2025-04-14 12:05:33', 130000, 'COMPLETED', 'imp_1234567904', 'RSV20250401-15', 'https://receipt.url/15'),
    # 16
    (3, 16, 'CARD', '비씨카드', '2025-05-03 12:05:33', 130000, 'COMPLETED', 'imp_1234567905', 'RSV20250401-16', 'https://receipt.url/16');

INSERT INTO tbl_payment (member_code, order_code, payment_method, payment_brand, payment_time, payment_amount, payment_status, imp_uid, merchant_uid, receipt_url) VALUES
    (1, 17, 'CARD', '삼성카드', '2025-05-10 11:30:00', 250000, 'COMPLETED', 'imp_1234567910', 'RSV20250510-17', 'https://receipt.url/17'),
    (2, 18, 'CARD', '신한카드', '2025-06-11 12:30:00', 185000, 'COMPLETED', 'imp_1234567911', 'RSV20250611-18', 'https://receipt.url/18'),
    (3, 19, 'CARD', '국민카드', '2025-07-12 13:30:00', 240000, 'CANCELED', 'imp_1234567912', 'RSV20250712-19', 'https://receipt.url/19'),
    (4, 20, 'CARD', '롯데카드', '2025-08-13 14:30:00', 320000, 'COMPLETED', 'imp_1234567913', 'RSV20250813-20', 'https://receipt.url/20'),
    #21
    (1, 21, 'CARD', '우리카드', '2025-09-14 15:30:00', 230000, 'COMPLETED', 'imp_1234567914', 'RSV20250914-21', 'https://receipt.url/21'),
    (2, 22, 'CARD', '비씨카드', '2025-10-15 16:30:00', 240000, 'COMPLETED', 'imp_1234567915', 'RSV20251015-22', 'https://receipt.url/22'),
    (3, 23, 'CARD', '현대카드', '2025-11-16 17:30:00', 340000, 'COMPLETED', 'imp_1234567916', 'RSV20251116-23', 'https://receipt.url/23'),
    (4, 24, 'CARD', '하나카드', '2025-12-17 18:30:00', 280000, 'CANCELED', 'imp_1234567917', 'RSV20251217-24', 'https://receipt.url/24'),
    (1, 25, 'CARD', '롯데카드', '2025-05-18 11:45:00', 200000, 'COMPLETED', 'imp_1234567918', 'RSV20250518-25', 'https://receipt.url/25'),
    #26
    (2, 26, 'CARD', '우리카드', '2025-06-19 12:45:00', 270000, 'COMPLETED', 'imp_1234567919', 'RSV20250619-26', 'https://receipt.url/26'),
    (3, 27, 'CARD', '신한카드', '2025-07-20 13:45:00', 320000, 'COMPLETED', 'imp_1234567920', 'RSV20250720-27', 'https://receipt.url/27');



INSERT INTO tbl_payment_cancel (payment_code, cancel_time, cancel_amount, pg_tid, cancel_receipt_url) VALUES
    (3, '2025-04-04 11:35:20', 130000, 'pg_cancel_9876543210', 'https://receipt.url/cancel/3'),
    (10, '2025-05-09 11:00:00', 130000, 'pg_cancel_1234567910', 'https://receipt.url/cancel/10'),
    (13, '2025-05-09 11:30:00', 130000, 'pg_cancel_1234567913', 'https://receipt.url/cancel/13'),
    (19, '2025-05-09 11:45:00', 240000, 'pg_cancel_1234567912', 'https://receipt.url/cancel/19'),
    (24, '2025-05-09 11:55:00', 280000, 'pg_cancel_1234567917', 'https://receipt.url/cancel/24');

INSERT INTO tbl_review (member_code, product_code, option_code, order_code, review_rating, review_content, review_date, review_pic, review_status) VALUES
    (1, 2, 2, 2, 5, '정말 최고의 디즈니 여행이었어요! 애들도 좋아했어요~', '2025-04-09 14:30:00', 'disney_review.jpg', 'ACTIVE'),
    (2, 4, 4, 4, 1, NULL, '2025-04-24 09:15:00', NULL, 'DELETE_BY_ADMIN'),
    (3, 5, 5, 5, 4, '재밌었음. 나중에 또오겠음.', '2025-04-24 09:15:00', NULL, 'ACTIVE');

INSERT INTO tbl_review (member_code, product_code, option_code, order_code, review_rating, review_content, review_date, review_pic, review_status) VALUES
    (2, 11, 18, 18, 5, '정말 멋진 경험이었어요!', '2025-06-12 15:00:00', 'product11_review.jpg', 'ACTIVE'),
    (4, 13, 20, 20, 5, '잊지 못할 추억을 만들었어요.', '2025-08-14 17:00:00', 'product13_review.jpg', 'ACTIVE'),
    (2, 15, 22, 22, 4, '기대보다 더 좋았어요.', '2025-10-16 15:00:00', 'product15_review.jpg', 'ACTIVE'),
    (3, 16, 23, 23, 5, '완벽한 여행이었어요.', '2025-11-17 16:00:00', 'product16_review.jpg', 'ACTIVE'),
    (1, 18, 25, 25, 3, '그럭저럭 괜찮았어요.', '2025-05-19 14:00:00', 'product18_review.jpg', 'ACTIVE'),
    (3, 20, 27, 27, 5, '정말 잊을 수 없는 추억이었어요.', '2025-05-07 17:00:00', 'product20_review.jpg', 'ACTIVE'),
    (4, 27, 8, 8, 5, '정말 멋진 경험이었어요. 꼭 다시 가고 싶어요!', '2025-05-05 10:00:00', 'review_8.jpg', 'ACTIVE'),
    (3, 27, 9, 9, 4, '가격 대비 만족스러웠어요. 재방문 의사 있습니다.', '2025-05-06 11:00:00', 'review_10.jpg', 'ACTIVE'),
    (1, 27, 11, 11, 3, '기대보다는 조금 아쉬웠어요. 그래도 괜찮았습니다.', '2025-05-07 12:00:00', 'review_11.jpg', 'ACTIVE'),
    (3, 27, 12, 12, 5, '최고의 여행이었습니다. 다시 가고 싶어요!', '2025-05-08 13:00:00', 'review_12.jpg', 'ACTIVE'),
    (2, 27, 14, 14, 4, '가이드분이 정말 친절하셨습니다. 추천합니다.', '2025-05-09 11:00:00', 'review_14.jpg', 'ACTIVE');
COMMIT;