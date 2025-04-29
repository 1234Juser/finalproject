USE travelogicdb;

-- 외래키 무시하고 삭제 시작
SET FOREIGN_KEY_CHECKS = 0;

-- 문제되는 테이블 삭제
DROP TABLE IF EXISTS tbl_product;
DROP TABLE IF EXISTS tbl_product_country;
DROP TABLE IF EXISTS tbl_product_theme;

-- 외래키 체크 다시 켜기
SET FOREIGN_KEY_CHECKS = 1;

DROP TABLE IF EXISTS tbl_review CASCADE;
DROP TABLE IF EXISTS tbl_payment_cancel CASCADE;
DROP TABLE IF EXISTS tbl_payment CASCADE;
DROP TABLE IF EXISTS tbl_order CASCADE;
DROP TABLE IF EXISTS tbl_option CASCADE;
DROP TABLE IF EXISTS tbl_wish CASCADE;
DROP TABLE IF EXISTS tbl_wish_group CASCADE;
DROP TABLE IF EXISTS `tbl_product_theme` CASCADE;
DROP TABLE IF EXISTS `tbl_product` CASCADE;
DROP TABLE IF EXISTS `tbl_city` CASCADE;
DROP TABLE IF EXISTS `tbl_country` CASCADE;
DROP TABLE IF EXISTS `tbl_theme` CASCADE;
DROP TABLE IF EXISTS `tbl_region` CASCADE;
DROP TABLE IF EXISTS `tbl_companion_comment` CASCADE;
DROP TABLE IF EXISTS `tbl_companion` CASCADE;
DROP TABLE IF EXISTS `tbl_chat_room_member` CASCADE;
DROP TABLE IF EXISTS `tbl_chat` CASCADE;
DROP TABLE IF EXISTS `tbl_inquiry_chat` CASCADE;
DROP TABLE IF EXISTS `tbl_notification` CASCADE;
DROP TABLE IF EXISTS tbl_faq CASCADE;
DROP TABLE IF EXISTS tbl_event CASCADE;
DROP TABLE IF EXISTS tbl_member_role CASCADE;
DROP TABLE IF EXISTS tbl_authority CASCADE;
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
    member_profileImageUrl VARCHAR(255) NULL COMMENT '프로필이미지',
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
    authority_name VARCHAR(20) NOT NULL UNIQUE COMMENT '권한이름',
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

-- 4. 구글 smtp 인증코드 테이블 (tbl_password_reset_code)
CREATE TABLE tbl_password_reset_code (
                                         auth_id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '인증기본 키 ',
                                         member_email VARCHAR(30) NOT NULL COMMENT '인증번호요청한이메일',
                                         auth_code VARCHAR(10) NOT NULL COMMENT '발급된 인증 코드',
                                         expired_at DATETIME NOT NULL COMMENT '인증번호 만료 시간'
);

CREATE TABLE `tbl_region` (
                              `region_code` INT AUTO_INCREMENT NOT NULL COMMENT '지역 id',
                              `region_uid` VARCHAR(20) NOT NULL COMMENT '지역고유코드',
                              `region_type` ENUM('DOMESTIC', 'INTERNATIONAL') NOT NULL COMMENT '국내/해외 구분',
                              `region_name` VARCHAR(20) NOT NULL COMMENT '지역명(서울/중부권, 아시아 등)',
                              PRIMARY KEY (`region_code`)
);

CREATE TABLE `tbl_theme` (
                             `theme_code` INT AUTO_INCREMENT NOT NULL COMMENT '테마id',
                             `theme_uid` VARCHAR(20) NOT NULL COMMENT '테마고유코드',
                             `theme_name` VARCHAR(20) NOT NULL COMMENT '도시명',
                             CONSTRAINT `PK_TBL_THEME` PRIMARY KEY (`theme_code`)
);

CREATE TABLE `tbl_country` (
                               `country_code` INT AUTO_INCREMENT NOT NULL COMMENT '국가id',
                               `region_code` INT NOT NULL COMMENT '지역 고유번호',
                               `country_uid` VARCHAR(20) NOT NULL COMMENT '국가고유코드',
                               `country_name` VARCHAR(20) NOT NULL COMMENT '국가명',
                               CONSTRAINT `PK_TBL_COUNTRY` PRIMARY KEY (`country_code`),
                               CONSTRAINT `FK_tbl_region_TO_tbl_country_1` FOREIGN KEY (`region_code`) REFERENCES `tbl_region` (`region_code`)
);
CREATE TABLE `tbl_city` (
                            `city_code` INT AUTO_INCREMENT NOT NULL COMMENT '도시id',
                            `country_code` INT NOT NULL COMMENT '국가고유코드',
                            `city_uid` VARCHAR(20) NOT NULL COMMENT '도시고유코드',
                            `city_name` VARCHAR(50) NOT NULL COMMENT '도시명',
                            CONSTRAINT `FK_tbl_country_TO_tbl_city_1` FOREIGN KEY (`country_code`) REFERENCES `tbl_country` (`country_code`),
                            CONSTRAINT pk_city_code PRIMARY KEY (city_code)
) ENGINE=INNODB COMMENT '도시정보' AUTO_INCREMENT = 1001;


CREATE TABLE `tbl_product` (
                               `product_code` INT AUTO_INCREMENT NOT NULL COMMENT '투어상품 id',
                               `product_uid` VARCHAR(20) NOT NULL COMMENT '상품 고유 코드',
                               `country_code` INT NOT NULL COMMENT '국가고유번호',
                               `city_code` INT NOT NULL COMMENT '도시고유번호',
                               `theme_code` INT NULL COMMENT '테마코드',
                               `product_title` VARCHAR(255) NOT NULL COMMENT '투어상품 제목',
                               `product_content` TEXT NOT NULL COMMENT '투어상품 상세내용',
                               `product_adult` INT NOT NULL COMMENT '성인금액',
                               `product_child` INT DEFAULT 0 COMMENT '소인금액',
                               `product_start_date` DATETIME NOT NULL COMMENT '판매 시작일',
                               `product_end_date` DATETIME NOT NULL COMMENT '판매 종료일',
                               `product_min_participants` INT NOT NULL COMMENT '투어 출발 최소 인원',
                               `product_max_participants` INT NOT NULL COMMENT '투어 출발 최대 인원',
                               `product_status` ENUM('ON_SALE', 'SOLD_OUT', 'CLOSED') NOT NULL COMMENT '상품 판매 상태',
                               `product_thumbnail` VARCHAR(255) NOT NULL COMMENT '대표 이미지 URL',
                               CONSTRAINT `PK_TBL_PRODUCT` PRIMARY KEY (`product_code`),
                               CONSTRAINT `FK_tbl_country_TO_tbl_product` FOREIGN KEY (`country_code`) REFERENCES `tbl_country` (`country_code`),
                               CONSTRAINT `FK_tbl_city_TO_tbl_product` FOREIGN KEY (`city_code`) REFERENCES `tbl_city` (`city_code`),
                               CONSTRAINT `FK_tbl_theme_TO_tbl_product` FOREIGN KEY (`theme_code`) REFERENCES `tbl_theme` (`theme_code`)
);

CREATE TABLE tbl_wish_group (
    group_code INT NOT NULL AUTO_INCREMENT COMMENT '찜그룹고유번호',
    member_code INT NOT NULL COMMENT '회원번호',
    group_title VARCHAR(255) NOT NULL COMMENT '찜그룹이름',
    wish_count INT NOT NULL DEFAULT 0 COMMENT '찜 담긴 수',
    PRIMARY KEY (group_code),
    FOREIGN KEY (member_code) REFERENCES tbl_member (member_code)
);

CREATE TABLE tbl_wish (
    wish_code INT NOT NULL AUTO_INCREMENT COMMENT '찜고유번호',
    group_code INT NOT NULL COMMENT '찜그룹고유번호',
    product_code INT NOT NULL COMMENT '상품고유번호',
    member_code INT NOT NULL COMMENT '회원번호',
    PRIMARY KEY (wish_code),
    FOREIGN KEY (group_code) REFERENCES tbl_wish_group (group_code),
    FOREIGN KEY (product_code) REFERENCES tbl_product (product_code),
    FOREIGN KEY (member_code) REFERENCES tbl_member (member_code),
    UNIQUE KEY unique_wish (member_code, product_code)
);

CREATE TABLE tbl_option (
    option_code INT NOT NULL AUTO_INCREMENT COMMENT '옵션고유번호',
    product_code INT NOT NULL COMMENT '투어상품 고유번호',
    reservation_date DATE NULL COMMENT '선택된 예약 날짜',
    adult_count INT NOT NULL COMMENT '기본(성인) 수량',
    child_count INT NULL COMMENT '아동 수량',
    PRIMARY KEY (option_code),
    FOREIGN KEY (product_code) REFERENCES tbl_product (product_code)
);


CREATE TABLE tbl_order (
    order_code INT NOT NULL AUTO_INCREMENT COMMENT '예약고유번호',
    product_code INT NOT NULL COMMENT '투어상품 고유번호',
    option_code INT NOT NULL COMMENT '옵션고유번호',
    member_code INT NOT NULL COMMENT '예약자 정보',
    booking_uid VARCHAR(50) NOT NULL COMMENT '고객용예약번호',
    order_adult_price INT NOT NULL COMMENT '주문 당시 성인단가',
    order_child_price INT NULL COMMENT '주문 당시 아동단가',
    total_price INT NOT NULL COMMENT '총금액',
    order_date DATETIME NOT NULL COMMENT '주문확정시간',
    order_status ENUM('SCHEDULED', 'COMPLETED', 'CANCELED') NOT NULL DEFAULT 'SCHEDULED' COMMENT '예정/완료/취소',
    PRIMARY KEY (order_code),
    FOREIGN KEY (product_code) REFERENCES tbl_product (product_code),
    FOREIGN KEY (option_code) REFERENCES tbl_option (option_code),
    FOREIGN KEY (member_code) REFERENCES tbl_member (member_code)
);


CREATE TABLE tbl_payment (
    payment_code INT NOT NULL AUTO_INCREMENT COMMENT '결제고유번호',
    member_code INT NOT NULL COMMENT '결제자 정보',
    order_code INT NOT NULL COMMENT '예약고유번호',
    payment_method VARCHAR(50) NOT NULL COMMENT '카드/무통장',
    payment_brand VARCHAR(50) NOT NULL COMMENT '카드사, 페이 브랜드',
    payment_time DATETIME NOT NULL COMMENT '결제한 날',
    payment_amount INT NOT NULL COMMENT '결제총금액',
    payment_status ENUM('COMPLETED', 'CANCELED') NOT NULL DEFAULT 'COMPLETED' COMMENT '완료/취소',
    imp_uid VARCHAR(255) NOT NULL COMMENT '아임포트에서 부여한 거래ID',
    merchant_uid VARCHAR(255) NOT NULL COMMENT '아임포트 결제고유ID',
    receipt_url VARCHAR(500) NULL COMMENT '영수증url',
    PRIMARY KEY (payment_code),
    FOREIGN KEY (member_code) REFERENCES tbl_member (member_code),
    FOREIGN KEY (order_code) REFERENCES tbl_order (order_code)
);


CREATE TABLE tbl_payment_cancel (
    cancel_code INT NOT NULL AUTO_INCREMENT COMMENT '취소고유번호',
    payment_code INT NOT NULL COMMENT '결제고유번호',
    cancel_time DATETIME NOT NULL COMMENT '취소일시',
    cancel_amount INT NOT NULL COMMENT '취소금액',
    pg_tid VARCHAR(500) NULL,
    cancel_receipt_url VARCHAR(255) NULL COMMENT '취소매출전표URL',
    PRIMARY KEY (cancel_code),
    FOREIGN KEY (payment_code) REFERENCES tbl_payment (payment_code)
);

CREATE TABLE tbl_review (
    review_code INT NOT NULL AUTO_INCREMENT COMMENT '리뷰고유번호',
    member_code INT NOT NULL COMMENT '회원고유번호',
    order_code INT NOT NULL COMMENT '예약정보',
    review_rating TINYINT NOT NULL CHECK (review_rating BETWEEN 1 AND 5) COMMENT '상품평점',
    review_content TEXT NULL COMMENT '리뷰내용',
    review_date DATETIME NOT NULL COMMENT '리뷰작성일',
    review_pic VARCHAR(255) NULL COMMENT '리뷰이미지',
    review_status ENUM('ACTIVE', 'DELETE BY ADMIN') NOT NULL DEFAULT 'ACTIVE' COMMENT '활성화, 관리자에 의한 삭제',
    PRIMARY KEY (review_code),
    FOREIGN KEY (member_code) REFERENCES tbl_member (member_code),
    FOREIGN KEY (order_code) REFERENCES tbl_order (order_code)
);



CREATE TABLE tbl_event (
                           event_code INT AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT COMMENT '이벤트 번호',
                           event_title VARCHAR(50) NOT NULL COMMENT '제목',
                           event_content VARCHAR(255) NOT NULL COMMENT '내용',
                           event_img VARCHAR(255) NOT NULL COMMENT '이미지 파일 경로',
                           event_status VARCHAR(10) NOT NULL COMMENT '진행 상태'
)ENGINE=INNODB COMMENT '이벤트';

CREATE TABLE tbl_faq (
                         faq_code INT AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT COMMENT 'FAQ 번호',
                         faq_title VARCHAR(50) NOT NULL COMMENT '제목',
                         faq_content VARCHAR(255) NOT NULL COMMENT '내용'
)ENGINE=INNODB COMMENT 'FAQ';

CREATE TABLE `tbl_product_theme` (
                                     `pt_id` INT AUTO_INCREMENT NOT NULL COMMENT '상품테마 id',
                                     `product_code` INT NOT NULL COMMENT '투어상품 id',
                                     `theme_code` INT NOT NULL COMMENT '테마id',
                                     CONSTRAINT `PK_TBL_PRODUCT_THEME` PRIMARY KEY (`pt_id`, `product_code`, `theme_code`),
                                     CONSTRAINT `FK_tbl_product_TO_tbl_product_theme_1` FOREIGN KEY (`product_code`) REFERENCES `tbl_product` (`product_code`),
                                     CONSTRAINT `FK_tbl_theme_TO_tbl_product_theme_1` FOREIGN KEY (`theme_code`) REFERENCES `tbl_theme` (`theme_code`)
);


CREATE TABLE `tbl_companion` (
                                 `comp_id` INT AUTO_INCREMENT NOT NULL COMMENT '여행동행게시판 번호',
                                 `member_code` INT NOT NULL COMMENT '회원번호',
                                 `comp_member_id` VARCHAR(20) NOT NULL COMMENT '작성자 id',
                                 `comp_title` VARCHAR(50) NOT NULL COMMENT '글 제목',
                                 `comp_created_at` DATETIME NOT NULL COMMENT '작성일자',
                                 `comp_view_count` INT DEFAULT 0 NOT NULL COMMENT '조회수',
                                 CONSTRAINT `PK_TBL_COMPANION` PRIMARY KEY (`comp_id`),
                                 CONSTRAINT `FK_tbl_member_TO_tbl_companion_1` FOREIGN KEY (`member_code`) REFERENCES `tbl_member` (`member_code`)
);

CREATE TABLE `tbl_companion_comment` (
                                         `com_id` INT AUTO_INCREMENT NOT NULL COMMENT '여행동행게시판 댓글 번호',
                                         `member_code` INT NOT NULL COMMENT '회원번호',
                                         `comp_id` INT NOT NULL COMMENT '여행동행게시판 번호',
                                         `com_member_id` VARCHAR(20) NOT NULL COMMENT '댓글 작성자 id',
                                         `com_content` VARCHAR(255) NOT NULL COMMENT '댓글 내용',
                                         `com_created_at` DATETIME NOT NULL COMMENT '댓글 작성일자',
                                         CONSTRAINT `PK_TBL_COMPANION_COMMENT` PRIMARY KEY (`com_id`),
                                         CONSTRAINT `FK_tbl_member_TO_tbl_companion_comment_1` FOREIGN KEY (`member_code`) REFERENCES `tbl_member` (`member_code`),
                                         CONSTRAINT `FK_tbl_companion_TO_tbl_companion_comment_1` FOREIGN KEY (`comp_id`) REFERENCES `tbl_companion` (`comp_id`)
);

CREATE TABLE `tbl_chat` (
                            `chat_id` INT AUTO_INCREMENT NOT NULL COMMENT '채팅방 id',
                            `member_code` INT NOT NULL COMMENT '회원번호',
                            `chat_uid` VARCHAR(20) NOT NULL COMMENT '채팅방고유코드',
                            `chat_title` VARCHAR(50) NOT NULL COMMENT '채팅방 제목',
                            `chat_create_at` DATETIME NOT NULL COMMENT '개설일자',
                            CONSTRAINT `FK_tbl_member_TO_tbl_chat_1` FOREIGN KEY (`member_code`) REFERENCES `tbl_member` (`member_code`),
                            CONSTRAINT `PK_TBL_CHAT` PRIMARY KEY (`chat_id`)
);

CREATE TABLE `tbl_chat_room_member` (
                                        `crm_id` INT AUTO_INCREMENT NOT NULL COMMENT '중간 테이블 고유ID',
                                        `chat_id` INT NOT NULL COMMENT '채팅방 id',
                                        `member_code` INT NOT NULL COMMENT '회원번호',
                                        `crm_joined_at` DATETIME NOT NULL COMMENT '채팅방 참여 시간',
                                        `crm_is_exited` BOOLEAN NOT NULL COMMENT '퇴장 여부',
                                        `crm_exited_at` DATETIME NULL COMMENT '퇴장 시간',
                                        CONSTRAINT `PK_TBL_CHAT_ROOM_MEMBER` PRIMARY KEY (`crm_id`),
                                        CONSTRAINT `FK_tbl_chat_TO_tbl_chat_room_member_1` FOREIGN KEY (`chat_id`) REFERENCES `tbl_chat` (`chat_id`),
                                        CONSTRAINT `FK_tbl_member_TO_tbl_chat_room_member_1` FOREIGN KEY (`member_code`) REFERENCES `tbl_member` (`member_code`)
);

CREATE TABLE `tbl_inquiry_chat` (
                                    `ic_id` INT AUTO_INCREMENT NOT NULL COMMENT '1:1 문의 채팅 id',
                                    `member_code` INT NOT NULL COMMENT '회원번호',
                                    `authority_code` INT NOT NULL COMMENT '권한번호',
                                    `ic_start_date` DATETIME NOT NULL COMMENT '채팅 시작 일자',
                                    `ic_end_date` DATETIME NULL COMMENT '채팅 종료 일자',
                                    `ic_chat_status` ENUM('WAITING','ACTIVE','CLOSED') NOT NULL COMMENT '채팅 상태',
                                    CONSTRAINT `PK_TBL_INQUIRY_CHAT` PRIMARY KEY (`ic_id`, `member_code`, `authority_code`),
                                    CONSTRAINT `FK_tbl_member_role_TO_tbl_inquiry_chat_1` FOREIGN KEY (`member_code`) REFERENCES `tbl_member_role` (`member_code`),
                                    CONSTRAINT `FK_tbl_member_role_TO_tbl_inquiry_chat_2` FOREIGN KEY (`authority_code`) REFERENCES `tbl_member_role` (`authority_code`)
);

CREATE TABLE `tbl_notification` (
                                    `noti_id` INT AUTO_INCREMENT NOT NULL COMMENT '알림id',
                                    `member_code` INT NOT NULL COMMENT '회원번호',
                                    `noti_message` VARCHAR(255) NOT NULL COMMENT '알림메시지',
                                    `noti_is_read` BOOLEAN DEFAULT FALSE NULL COMMENT '읽음 여부',
                                    `noti_created_at` DATETIME NOT NULL COMMENT '알림시간',
                                    CONSTRAINT `PK_TBL_NOTIFICATION` PRIMARY KEY (`noti_id`),
                                    CONSTRAINT `FK_tbl_member_TO_tbl_notification_1` FOREIGN KEY (`member_code`) REFERENCES `tbl_member` (`member_code`)
);