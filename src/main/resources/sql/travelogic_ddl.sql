DROP TABLE IF EXISTS tbl_review CASCADE;
DROP TABLE IF EXISTS tbl_payment_cancel CASCADE;
DROP TABLE IF EXISTS tbl_payment CASCADE;
DROP TABLE IF EXISTS tbl_option CASCADE;
DROP TABLE IF EXISTS tbl_order CASCADE;
DROP TABLE IF EXISTS tbl_like CASCADE;
DROP TABLE IF EXISTS tbl_like_group CASCADE;
DROP TABLE IF EXISTS tbl_product CASCADE;
DROP TABLE IF EXISTS tbl_product_theme CASCADE;
DROP TABLE IF EXISTS tbl_theme CASCADE;
DROP TABLE IF EXISTS tbl_city CASCADE;
DROP TABLE IF EXISTS tbl_product_country CASCADE;
DROP TABLE IF EXISTS tbl_country CASCADE;
DROP TABLE IF EXISTS tbl_region CASCADE;
DROP TABLE IF EXISTS tbl_companion_comment CASCADE;
DROP TABLE IF EXISTS tbl_companion CASCADE;
DROP TABLE IF EXISTS tbl_inquiry_chat_message CASCADE;
DROP TABLE IF EXISTS tbl_inquiry_chat CASCADE;
DROP TABLE IF EXISTS tbl_chat_message CASCADE;
DROP TABLE IF EXISTS tbl_chat_room_member CASCADE;
DROP TABLE IF EXISTS tbl_chat CASCADE;
DROP TABLE IF EXISTS tbl_notification CASCADE;
DROP TABLE IF EXISTS tbl_faq CASCADE;
DROP TABLE IF EXISTS tbl_event CASCADE;
DROP TABLE IF EXISTS tbl_authority CASCADE;
DROP TABLE IF EXISTS tbl_member_role CASCADE;
DROP TABLE IF EXISTS tbl_member CASCADE;

-- 1. 회원정보 테이블 (tbl_member)
CREATE TABLE tbl_member
(
    member_code INT AUTO_INCREMENT NOT NULL COMMENT '회원번호',
    member_name VARCHAR(20) NOT NULL COMMENT '이름',
    member_id VARCHAR(20) NOT NULL UNIQUE COMMENT '아이디',
    member_password VARCHAR(255) NULL COMMENT '비밀번호(소셜로그인은비밀번호x)',
    member_email VARCHAR(30) NOT NULL UNIQUE COMMENT '이메일',
    member_phone VARCHAR(20) NOT NULL COMMENT '연락처',
    member_registerdate DATETIME NOT NULL COMMENT '가입날짜',
    member_enddate DATETIME NULL COMMENT '탈퇴날짜/시간',
    member_endstatus VARCHAR(20) NOT NULL DEFAULT 'N' COMMENT '탈퇴여부',
    social_type VARCHAR(255) NULL COMMENT '소셜종류(카카오, 구글)',
    social_account_id INT NULL COMMENT '서비스 내 사용자 식별자 (계정 ID 역할)',
    social_account_ci VARCHAR(255) NULL COMMENT '동일인 식별 (탈퇴/재가입 등 추적)',
    CONSTRAINT pk_member_code PRIMARY KEY (member_code)
) ENGINE=INNODB COMMENT '회원정보' AUTO_INCREMENT = 1;


-- 2. 권한 테이블 (tbl_authority)
CREATE TABLE IF NOT EXISTS tbl_authority
(
    -- COLUMN LEVEL CONSTRAINTS
    authority_code INT AUTO_INCREMENT COMMENT '권한번호',
    authority_name VARCHAR(20) NOT NULL COMMENT '권한이름',
    -- TABLE LEVEL CONSTRAINTS
    CONSTRAINT pk_authority_code PRIMARY KEY (authority_code)
    ) ENGINE=INNODB COMMENT '권한';

-- 3. 회원별권한 테이블 (tbl_member_role)
CREATE TABLE IF NOT EXISTS tbl_member_role
(
    -- COLUMN LEVEL CONSTRAINTS
    member_code INT AUTO_INCREMENT COMMENT '회원번호',
    authority_code INT NOT NULL COMMENT '권한번호',
    -- TABLE LEVEL CONSTRAINTS
    CONSTRAINT pk_member_role PRIMARY KEY (member_code, authority_code),
    CONSTRAINT fk_member_code FOREIGN KEY (member_code) REFERENCES tbl_member (member_code),
    CONSTRAINT fk_authority_code FOREIGN KEY (authority_code) REFERENCES tbl_authority (authority_code)
    ) ENGINE=INNODB COMMENT '회원별권한';

CREATE TABLE tbl_wish_group (
    group_code int NOT NULL	COMMENT '찜그룹고유번호',
    member_code	int	NOT NULL COMMENT '회원번호',
    group_title	varchar(255) NOT NULL COMMENT '찜그룹이름',
    wish_count int	NOT NULL DEFAULT '0' COMMENT '찜 담긴 수'
);
ALTER TABLE tbl_wish_group ADD CONSTRAINT PK_TBL_WISH_GROUP PRIMARY KEY (group_code);
ALTER TABLE tbl_wish_group ADD CONSTRAINT FK_tbl_member_TO_tbl_wish_group_1 FOREIGN KEY (member_code)
    REFERENCES tbl_member (member_code);

CREATE TABLE tbl_wish (
    wish_code int NOT NULL COMMENT '찜고유번호',
    group_code int NOT NULL COMMENT '찜그룹고유번호',
    product_code int NOT NULL COMMENT '상품고유번호',
    member_code	int	NOT NULL COMMENT '회원번호'
);
ALTER TABLE tbl_wish ADD CONSTRAINT PK_TBL_WISH PRIMARY KEY (wish_code);
ALTER TABLE tbl_wish ADD CONSTRAINT FK_tbl_wish_group_TO_tbl_wish FOREIGN KEY (group_code)
    REFERENCES tbl_wish_group (group_code);
ALTER TABLE tbl_wish ADD CONSTRAINT FK_tbl_product_TO_tbl_wish FOREIGN KEY (product_code)
    REFERENCES tbl_product (product_code);
ALTER TABLE `tbl_wish` ADD CONSTRAINT `FK_tbl_member_TO_tbl_wish_1` FOREIGN KEY (member_code)
    REFERENCES tbl_member (member_code);

CREATE TABLE tbl_option (
    option_code	int	NOT NULL COMMENT '옵션고유번호',
    product_code int NOT NULL COMMENT '투어상품 고유번호',
    reservation_date date NULL COMMENT '선택된 예약 날짜',
    adult_count	int	NOT NULL COMMENT '기본(성인) 수량',
    child_count	int	NULL COMMENT '아동 수량'
);
ALTER TABLE tbl_option ADD CONSTRAINT PK_TBL_OPTION PRIMARY KEY (option_code);
ALTER TABLE tbl_option ADD CONSTRAINT FK_tbl_product_TO_tbl_option FOREIGN KEY (product_code)
    REFERENCES tbl_product (product_code);

CREATE TABLE tbl_order (
    order_code int NOT NULL	COMMENT '예약고유번호',
    product_code int NOT NULL COMMENT '투어상품 고유번호',
    option_code	int	NOT NULL COMMENT '옵션고유번호',
    member_code	int	NOT NULL COMMENT '예약자 정보',
    booking_uid	varchar(50)	NOT NULL COMMENT '고객용예약번호',
    order_adult_price int NOT NULL COMMENT '주문 당시 성인단가',
    order_child_price int NULL COMMENT '주문 당시 아동단가',
    total_price	int	NOT NULL COMMENT '총금액',
    order_date datetime	NOT NULL COMMENT '주문확정시간',
    order_status enum('SCHEDULED', 'COMPLETED', 'CANCELED')	NOT NULL DEFAULT 'SCHEDULED' COMMENT '예정/완료/취소'
);
ALTER TABLE tbl_order ADD CONSTRAINT PK_TBL_ORDER PRIMARY KEY (order_code);
ALTER TABLE tbl_order ADD CONSTRAINT FK_tbl_product_TO_tbl_order FOREIGN KEY (product_code)
    REFERENCES tbl_product (product_code);
ALTER TABLE tbl_order ADD CONSTRAINT FK_tbl_option_TO_tbl_order FOREIGN KEY (option_code)
    REFERENCES tbl_option (option_code);
ALTER TABLE tbl_order ADD CONSTRAINT FK_tbl_member_TO_tbl_order FOREIGN KEY (member_code)
    REFERENCES tbl_member (member_code);

CREATE TABLE tbl_payment (
    payment_code int NOT NULL COMMENT '결제고유번호',
    member_code	int	NOT NULL COMMENT '결제자 정보',
    order_code int	NOT NULL COMMENT '예약고유번호',
    payment_method varchar(50) NOT NULL	COMMENT '카드/무통장',
    payment_brand varchar(50) NOT NULL COMMENT '카드사, 페이 브랜드',
    payment_time datetime NOT NULL COMMENT '결제한 날',
    payment_amout int NOT NULL COMMENT '결제총금액',
    payment_stauts enum('COMPLETED', 'CANCELED') NOT NULL DEFAULT 'COMPLETED' COMMENT '완료/취소',
    imp_uid	varchar(255) NOT NULL COMMENT '아임포트에서 부여한 거래ID',
    merchant_uid varchar(255) NOT NULL COMMENT '아임포트 결제고유ID',
    receipt_url	varchar(500) NULL COMMENT '영수증url'
);
ALTER TABLE tbl_payment ADD CONSTRAINT PK_TBL_PAYMENT PRIMARY KEY (payment_code);
ALTER TABLE tbl_payment ADD CONSTRAINT FK_tbl_member_TO_tbl_payment FOREIGN KEY (member_code)
    REFERENCES tbl_member (member_code);
ALTER TABLE tbl_payment ADD CONSTRAINT FK_tbl_order_TO_tbl_payment FOREIGN KEY (order_code)
    REFERENCES tbl_order (order_code);

CREATE TABLE tbl_payment_cancel (
    cancel_code	int	NOT NULL COMMENT '취소고유번호',
    payment_code int NOT NULL COMMENT '결제고유번호',
    cancel_time	datetime NOT NULL COMMENT '취소일시',
    cancel_amount int NOT NULL COMMENT '취소금액',
    pg_tid varchar(500) NULL,
    cancel_receipt_url varchar(255) NULL COMMENT '취소매출전표URL'
);
ALTER TABLE tbl_payment_cancel ADD CONSTRAINT PK_TBL_PAYMENT_CANCEL PRIMARY KEY (cancel_code);
ALTER TABLE tbl_payment_cancel ADD CONSTRAINT FK_tbl_payment_TO_tbl_payment_cancel FOREIGN KEY (payment_code)
    REFERENCES tbl_payment (payment_code);

CREATE TABLE tbl_review (
    review_code	int	NOT NULL COMMENT '리뷰고유번호',
    member_code	int	NOT NULL COMMENT '회원고유번호',
    order_code int NOT NULL COMMENT '예약정보',
    review_rating tinyint NOT NULL COMMENT '상품평점',
    review_content text	NULL COMMENT '리뷰내용(Toast UI Editor)',
    review_date	datetime NOT NULL COMMENT '리뷰작성일',
    review_pic varchar(255)	NULL COMMENT '리뷰이미지',
    review_status enum('ACTIVE', 'DELETE BY ADMIN')	NOT NULL DEFAULT 'ACTIVE' COMMENT '활성화, 관리자에 의한 삭제'
);
ALTER TABLE `tbl_review` ADD CONSTRAINT `PK_TBL_REVIEW` PRIMARY KEY (review_code);
ALTER TABLE `tbl_review` ADD CONSTRAINT `FK_tbl_member_TO_tbl_review_1` FOREIGN KEY (member_code)
    REFERENCES `tbl_member` (member_code);
ALTER TABLE `tbl_review` ADD CONSTRAINT `FK_tbl_order_TO_tbl_review_1` FOREIGN KEY (order_code)
    REFERENCES `tbl_order` (order_code);

CREATE TABLE tbl_event (
                           event_code INT PRIMARY KEY AUTO_INCREMENT COMMENT '이벤트 번호',
                           event_title VARCHAR(50) NOT NULL COMMENT '제목',
                           event_content VARCHAR(255) NOT NULL COMMENT '내용',
                           event_img VARCHAR(255) NOT NULL COMMENT '이미지 파일 경로',
                           event_status VARCHAR(10) NOT NULL COMMENT '진행 상태'
)ENGINE=INNODB COMMENT '이벤트';

CREATE TABLE tbl_faq (
                         faq_code INT PRIMARY KEY AUTO_INCREMENT COMMENT 'FAQ 번호',
                         faq_title VARCHAR(50) NOT NULL COMMENT '제목',
                         faq_content VARCHAR(255) NOT NULL COMMENT '내용'
)ENGINE=INNODB COMMENT 'FAQ';