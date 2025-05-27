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
DROP TABLE IF EXISTS `tbl_theme` CASCADE;
DROP TABLE IF EXISTS `tbl_city_view_count` CASCADE;
DROP TABLE IF EXISTS `tbl_city` CASCADE;
DROP TABLE IF EXISTS `tbl_country` CASCADE;
DROP TABLE IF EXISTS `tbl_theme` CASCADE;
DROP TABLE IF EXISTS `tbl_region` CASCADE;
DROP TABLE IF EXISTS `tbl_like` CASCADE;
DROP TABLE IF EXISTS `tbl_companion_comment` CASCADE;
DROP TABLE IF EXISTS `tbl_companion` CASCADE;
DROP TABLE IF EXISTS `tbl_chat_room_member` CASCADE;
DROP TABLE IF EXISTS `tbl_chat` CASCADE;
DROP TABLE IF EXISTS `tbl_inquiry_chat_message` CASCADE;
DROP TABLE IF EXISTS `tbl_inquiry_chat` CASCADE;
DROP TABLE IF EXISTS `tbl_notification` CASCADE;
DROP TABLE IF EXISTS tbl_faq CASCADE;
DROP TABLE IF EXISTS tbl_event CASCADE;
DROP TABLE IF EXISTS tbl_member_role CASCADE;
DROP TABLE IF EXISTS tbl_authority CASCADE;
DROP TABLE IF EXISTS tbl_password_reset_code CASCADE;
DROP TABLE IF EXISTS tbl_chat_room CASCADE;
DROP TABLE IF EXISTS tbl_follow CASCADE;
DROP TABLE IF EXISTS tbl_member CASCADE;

-- 1. 회원정보 테이블 (tbl_member)
CREATE TABLE tbl_member
(
    member_code INT AUTO_INCREMENT NOT NULL COMMENT '회원번호',
    member_name VARCHAR(20) NOT NULL COMMENT '이름',
    member_id VARCHAR(255) NOT NULL UNIQUE COMMENT '아이디',
    member_password VARCHAR(255) NULL COMMENT '비밀번호(소셜로그인은비밀번호x)',
    member_email VARCHAR(30) NOT NULL UNIQUE COMMENT '이메일',
    member_phone VARCHAR(20) NOT NULL COMMENT '연락처',
    member_profile_image_url VARCHAR(255) NULL COMMENT '프로필이미지',
    member_registerdate DATETIME NOT NULL COMMENT '가입날짜',
    member_enddate DATETIME NULL COMMENT '탈퇴날짜/시간',
    member_endstatus VARCHAR(20) NOT NULL DEFAULT 'N' COMMENT '탈퇴여부',
    social_type VARCHAR(255) NULL COMMENT '소셜종류(카카오, 구글)',
    social_account_id INT NULL COMMENT '서비스 내 사용자 식별자 (계정 ID 역할)',
    admin_active VARCHAR(20) NULL COMMENT '관리자활성권한',
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

-- 권역 테이블
CREATE TABLE `tbl_region` (
                              `region_code` BIGINT NOT NULL COMMENT '권역 코드 (PK)',
                              `region_uid` VARCHAR(20) NOT NULL COMMENT '권역 고유 코드',
                              `region_type` ENUM('DOMESTIC', 'INTERNATIONAL') NOT NULL COMMENT '권역 타입 (국내/해외)',
                              `region_name` VARCHAR(20) NOT NULL COMMENT '권역명(서울/중부권, 아시아 등)',
                              PRIMARY KEY (`region_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='권역 정보';

-- 테마 테이블
CREATE TABLE `tbl_theme` (
                             `theme_code` BIGINT NOT NULL COMMENT '테마 ID',
                             `theme_uid` VARCHAR(20) NOT NULL COMMENT '테마 고유 코드',
                             `theme_name` VARCHAR(20) NOT NULL COMMENT '테마 이름',
                             PRIMARY KEY (`theme_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='테마 정보';

CREATE TABLE `tbl_country` (
                               `country_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '국가 ID (PK)',
                               `country_code` BIGINT NOT NULL UNIQUE COMMENT '국가 코드',
                               `region_code` BIGINT NOT NULL COMMENT '지역 코드 (FK)',
                               `country_uid` VARCHAR(20) NOT NULL COMMENT '국가 고유 코드',
                               `country_name` VARCHAR(20) NOT NULL COMMENT '국가명',
                               `country_name_kr` VARCHAR(20) NOT NULL COMMENT '국가명(한글)',
                               PRIMARY KEY (`country_id`),
                               CONSTRAINT `FK_country_region` FOREIGN KEY (`region_code`) REFERENCES `tbl_region` (`region_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='국가 정보';

CREATE TABLE `tbl_city` (
                            `city_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '도시 ID (PK)',
                            `city_code` BIGINT NOT NULL UNIQUE COMMENT '도시 코드',
                            `country_id` BIGINT NOT NULL COMMENT '국가 ID (FK)',
                            `region_code` BIGINT NOT NULL COMMENT '지역 코드 (FK)',
                            `city_uid` VARCHAR(20) NOT NULL COMMENT '도시 고유 코드',
                            `city_name` VARCHAR(20) NOT NULL COMMENT '도시명',
                            `city_name_kr` VARCHAR(50) NOT NULL COMMENT '도시명 (한글)',
                            PRIMARY KEY (`city_id`),
                            CONSTRAINT `FK_city_country` FOREIGN KEY (`country_id`) REFERENCES `tbl_country` (`country_id`),
                            CONSTRAINT `FK_city_region` FOREIGN KEY (`region_code`) REFERENCES `tbl_region` (`region_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='도시 정보';

-- 상품 테이블
CREATE TABLE `tbl_product` (
                               `product_code` BIGINT AUTO_INCREMENT NOT NULL COMMENT '투어상품 ID',
                               `product_uid` VARCHAR(20) NOT NULL UNIQUE COMMENT '상품 고유 코드',
                               `region_code` BIGINT NOT NULL COMMENT '지역 코드 (RegionEntity 참조)',
                               `country_id` BIGINT NOT NULL COMMENT '국가 ID',
                               `city_id` BIGINT NOT NULL COMMENT '도시 ID',
                               `theme_code` BIGINT NULL COMMENT '테마 코드 (단일 테마일 경우, N:M 관계면 삭제 가능)',

                               `product_title` VARCHAR(255) NOT NULL COMMENT '상품 제목',
                               `product_content` TEXT NOT NULL COMMENT '상품 상세 내용',
                               `product_adult` INT NOT NULL DEFAULT 0 COMMENT '성인 금액',
                               `product_child` INT NOT NULL DEFAULT 0 COMMENT '소인 금액',
                               `product_start_date` DATE NOT NULL COMMENT '판매 시작일',
                               `product_end_date` DATE NOT NULL COMMENT '판매 종료일',
                               `product_min_participants` INT NOT NULL COMMENT '최소 인원',
                               `product_max_participants` INT NOT NULL COMMENT '최대 인원',
                               `product_status` ENUM('ON_SALE', 'SOLD_OUT', 'CLOSED') NOT NULL COMMENT '상품 상태',
                               `product_type` ENUM('TOUR', 'GOLF', 'CRUISE', 'KIDS', 'HONEYMOON', 'SILVER') NOT NULL COMMENT '상품 타입',
                               `product_thumbnail` VARCHAR(255) NOT NULL COMMENT '대표 이미지',
                               `review_count` INT NOT NULL DEFAULT 0 COMMENT '리뷰 수',

                               `region_type` ENUM('DOMESTIC', 'INTERNATIONAL') NOT NULL COMMENT '지역 타입',
                               `city_name` VARCHAR(50) NOT NULL COMMENT '도시명 (표시용)',
                               `country_name` VARCHAR(50) NOT NULL COMMENT '국가명 (표시용)',
                               `full_location` VARCHAR(100) NOT NULL COMMENT '도시+국가 (ex. 파리, 프랑스)',
                               `product_description` TEXT COMMENT '상품 설명',

                               PRIMARY KEY (`product_code`),
                               FOREIGN KEY (`region_code`) REFERENCES `tbl_region` (`region_code`),
                               FOREIGN KEY (`country_id`) REFERENCES `tbl_country` (`country_id`),
                               FOREIGN KEY (`city_id`) REFERENCES `tbl_city` (`city_id`),
                               FOREIGN KEY (`theme_code`) REFERENCES `tbl_theme` (`theme_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='상품';

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
    product_code BIGINT NOT NULL COMMENT '상품고유번호',
    member_code INT NOT NULL COMMENT '회원번호',
    PRIMARY KEY (wish_code),
    FOREIGN KEY (group_code) REFERENCES tbl_wish_group (group_code),
    FOREIGN KEY (product_code) REFERENCES tbl_product (product_code),
    FOREIGN KEY (member_code) REFERENCES tbl_member (member_code),
    UNIQUE KEY unique_wish (member_code, product_code)
);

CREATE TABLE tbl_option (
    option_code INT NOT NULL AUTO_INCREMENT COMMENT '옵션고유번호',
    product_code BIGINT NOT NULL COMMENT '투어상품 고유번호',
    reservation_date DATE NULL COMMENT '선택된 예약 날짜',
    adult_count INT NOT NULL COMMENT '기본(성인) 수량',
    child_count INT NULL COMMENT '아동 수량',
    PRIMARY KEY (option_code),
    FOREIGN KEY (product_code) REFERENCES tbl_product (product_code)
);


CREATE TABLE tbl_order (
    order_code INT NOT NULL AUTO_INCREMENT COMMENT '예약고유번호',
    product_code BIGINT NOT NULL COMMENT '투어상품 고유번호',
    option_code INT NOT NULL COMMENT '옵션고유번호',
    member_code INT NOT NULL COMMENT '예약자 정보',
    booking_uid VARCHAR(50) NOT NULL COMMENT '고객용예약번호',
    order_adult_price INT NOT NULL COMMENT '주문 당시 성인단가',
    order_child_price INT NULL COMMENT '주문 당시 아동단가',
    total_price INT NOT NULL COMMENT '총금액',
    order_date DATETIME NOT NULL COMMENT '주문확정시간',
    order_status ENUM('SCHEDULED', 'COMPLETED', 'CANCELED') NOT NULL DEFAULT 'SCHEDULED' COMMENT '예정/완료/취소',
    is_reviewed TINYINT NOT NULL DEFAULT 0 COMMENT '리뷰 작성 여부',
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
    product_code BIGINT NOT NULL COMMENT '상품고유번호',
    order_code INT NOT NULL COMMENT '예약정보',
    review_rating TINYINT NOT NULL CHECK (review_rating BETWEEN 1 AND 5) COMMENT '상품평점',
    review_content TEXT NULL COMMENT '리뷰내용',
    review_date DATETIME NOT NULL COMMENT '리뷰작성일',
    review_pic VARCHAR(255) NULL COMMENT '리뷰이미지',
    review_status ENUM('ACTIVE', 'DELETE_BY_ADMIN') NOT NULL DEFAULT 'ACTIVE' COMMENT '활성화, 관리자에 의한 삭제',
    PRIMARY KEY (review_code),
    FOREIGN KEY (member_code) REFERENCES tbl_member (member_code),
    FOREIGN KEY (product_code) REFERENCES tbl_product (product_code),
    FOREIGN KEY (order_code) REFERENCES tbl_order (order_code)
);


# 이벤트테이블
CREATE TABLE tbl_event (
                           event_code INT AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT COMMENT '이벤트 번호',
                           event_title VARCHAR(50) NOT NULL COMMENT '제목',
                           event_content VARCHAR(255) NOT NULL COMMENT '내용',
                           event_img VARCHAR(255) NOT NULL COMMENT '이미지 파일 경로',
                           event_status VARCHAR(10) NOT NULL COMMENT '진행 상태',
                           event_startdate DATE NOT NULL COMMENT '이벤트 시작날짜',
                           event_enddate DATE NOT NULL COMMENT '이벤트 종료날짜'
)ENGINE=INNODB COMMENT '이벤트';

# faq테이블
CREATE TABLE tbl_faq (
                         faq_code INT AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT COMMENT 'FAQ 번호',
                         faq_title VARCHAR(50) NOT NULL COMMENT '제목',
                         faq_content VARCHAR(255) NOT NULL COMMENT '내용'
)ENGINE=INNODB COMMENT 'FAQ';

-- 상품-테마 매핑 중간 테이블
CREATE TABLE `tbl_product_theme` (
                                     `pt_id` BIGINT AUTO_INCREMENT NOT NULL COMMENT '상품테마 ID',
                                     `product_code` BIGINT NOT NULL COMMENT '상품 ID',
                                     `theme_code` BIGINT NOT NULL COMMENT '테마 ID',
                                     PRIMARY KEY (`pt_id`),
                                     FOREIGN KEY (`product_code`) REFERENCES `tbl_product` (`product_code`) ON DELETE CASCADE,
                                     FOREIGN KEY (`theme_code`) REFERENCES `tbl_theme` (`theme_code`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='상품-테마 매핑 중간 테이블';


# 여행게시판
CREATE TABLE `tbl_companion` (
                                 companion_id INT AUTO_INCREMENT NOT NULL COMMENT '여행동행게시판 번호',
                                 member_code INT NOT NULL COMMENT '회원번호',
                                 companion_title VARCHAR(50) NOT NULL COMMENT '글 제목',
                                 companion_content TEXT NOT NULL COMMENT '글 내용',
                                 companion_created_at DATETIME NOT NULL COMMENT '작성일자',
                                 companion_modified_at DATETIME NULL COMMENT '수정일자',
                                 companion_view_count INT DEFAULT 0 NOT NULL COMMENT '조회수',
                                 companion_notice BOOLEAN DEFAULT false NOT NULL COMMENT '공지사항',
                                 companion_image_urls TEXT NULL COMMENT '이미지',
                                 CONSTRAINT `PK_TBL_COMPANION` PRIMARY KEY (`companion_id`),
                                 CONSTRAINT `FK_tbl_member_TO_tbl_companion_1` FOREIGN KEY (`member_code`) REFERENCES `tbl_member` (`member_code`)
)ENGINE=INNODB COMMENT '여행게시판';
# 여행게시판댓글
CREATE TABLE `tbl_companion_comment` (
                                         companion_comment_id INT AUTO_INCREMENT NOT NULL COMMENT '여행동행게시판 댓글 번호',
                                         member_code INT NOT NULL COMMENT '회원번호',
                                         companion_id INT NOT NULL COMMENT '여행동행게시판 번호',
                                         companion_comment_content TEXT NOT NULL COMMENT '댓글 내용',
                                         companion_comment_created_at DATETIME NOT NULL COMMENT '댓글 작성일자',
                                         companion_comment_modified_at DATETIME NULL COMMENT '댓글 수정일자',
                                         CONSTRAINT `PK_TBL_COMPANION_COMMENT` PRIMARY KEY (`companion_comment_id`), -- 기본 키 수정
                                         CONSTRAINT `FK_tbl_member_TO_tbl_companion_comment_1` FOREIGN KEY (`member_code`) REFERENCES `tbl_member` (`member_code`),
                                         CONSTRAINT `FK_tbl_companion_TO_tbl_companion_comment_1` FOREIGN KEY (`companion_id`) REFERENCES `tbl_companion` (`companion_id`)
)ENGINE=INNODB COMMENT '여행게시판댓글';

# 팔로우/팔로워기능
CREATE TABLE `tbl_follow` (
                              follow_id INT AUTO_INCREMENT NOT NULL COMMENT '팔로우 번호',
                              follower_member_code INT NOT NULL COMMENT '나를 팔로우 하는 회원 번호',
                              following_member_code INT NOT NULL COMMENT '내가 팔로우 하는 회원 번호',
                              followed_at DATETIME NOT NULL COMMENT '팔로우 한 날짜',
                              CONSTRAINT `PK_TBL_FOLLOW` PRIMARY KEY (`follow_id`),
                              CONSTRAINT `FK_tbl_member_TO_tbl_follow_follower` FOREIGN KEY (`follower_member_code`) REFERENCES `tbl_member` (`member_code`),
                              CONSTRAINT `FK_tbl_member_TO_tbl_follow_following` FOREIGN KEY (`following_member_code`) REFERENCES `tbl_member` (`member_code`),
                              CONSTRAINT `UK_follower_following` UNIQUE (`follower_member_code`, `following_member_code`) -- 중복 팔로우 방지
)ENGINE=INNODB COMMENT '회원 팔로우/팔로워 관계';

# 게시글좋아요/테이블
CREATE TABLE tbl_like (
                          like_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL COMMENT '좋아요 번호',
                          member_code BIGINT NOT NULL COMMENT '회원번호',
                          companion_id INT NULL COMMENT '게시글 번호',        -- 게시물 좋아요 (게시물이 아니면 NULL)
                          companion_comment_id INT NULL COMMENT '댓글 번호', -- 댓글 좋아요 (댓글이 아니면 NULL)
                          created_at DATETIME NOT NULL COMMENT '좋아요처음클릭한날짜',
                          FOREIGN KEY (member_code) REFERENCES tbl_member(member_code),
                          FOREIGN KEY (companion_id) REFERENCES tbl_companion(companion_id) ON DELETE CASCADE, -- 게시글 삭제 시 좋아요 정보도 삭제
                          FOREIGN KEY (companion_comment_id) REFERENCES tbl_companion_comment(companion_comment_id) ON DELETE CASCADE, -- 댓글 삭제 시 좋아요 정보도 삭제
                          UNIQUE KEY uk_member_companion (member_code, companion_id), -- 게시물 좋아요 중복 방지
                          UNIQUE KEY uk_member_comment (member_code, companion_comment_id) -- 댓글 좋아요 중복 방지
);



CREATE TABLE `tbl_chat_room` (
                                 `chat_room_id` INT AUTO_INCREMENT NOT NULL COMMENT '채팅방 고유 ID',
                                 `member_code` INT NOT NULL COMMENT '생성한 회원 고유 번호',
                                 `chat_room_uid` VARCHAR(20) NOT NULL UNIQUE COMMENT '클라이언트용 채팅방 고유 코드',
                                 `chat_room_title` VARCHAR(50) NOT NULL COMMENT '채팅방 제목',
                                 `chat_room_create_at` DATETIME NOT NULL COMMENT '개설일자',
                                 `chat_room_description` VARCHAR(50) DEFAULT NULL COMMENT '채팅방 설명',
                                 `chat_room_max_participants` INT NOT NULL COMMENT '최대 참여자 수',
                                 PRIMARY KEY (`chat_room_id`),
                                 CONSTRAINT `FK_member_to_chat_room` FOREIGN KEY (`member_code`) REFERENCES `tbl_member` (`member_code`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='채팅방';;

CREATE TABLE `tbl_chat_room_member` (
                                        `crm_id` INT AUTO_INCREMENT NOT NULL COMMENT '채팅방 참여자 고유 ID',
                                        `chat_room_id` INT NOT NULL COMMENT '채팅방 고유 ID',
                                        `member_code` INT NOT NULL COMMENT '회원 고유 번호',
                                        `crm_joined_at` DATETIME NOT NULL COMMENT '채팅방 참여 시간',
                                        `crm_is_exited` BOOLEAN NOT NULL COMMENT '퇴장 여부',
                                        `crm_exited_at` DATETIME DEFAULT NULL COMMENT '퇴장 시간',
                                        `member_name` VARCHAR(255) NOT NULL COMMENT '참여자 이름',
                                        `crm_is_creator` BOOLEAN NOT NULL COMMENT '개설자인지 여부',
                                        PRIMARY KEY (`crm_id`),
                                        CONSTRAINT `FK_chat_room_to_crm` FOREIGN KEY (`chat_room_id`) REFERENCES `tbl_chat_room` (`chat_room_id`),
                                        CONSTRAINT `FK_member_to_crm` FOREIGN KEY (`member_code`) REFERENCES `tbl_member` (`member_code`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='채팅방-회원 매핑 중간 테이블';

-- 1:1 문의 채팅 테이블
CREATE TABLE tbl_inquiry_chat (
                                  ic_id INT NOT NULL AUTO_INCREMENT COMMENT '1:1 문의 채팅 id',
                                  member_code INT NOT NULL COMMENT '회원번호',
                                  authority_code INT NOT NULL COMMENT '권한번호',
                                  ic_start_date DATETIME NOT NULL COMMENT '채팅 시작 일자',
                                  ic_end_date DATETIME DEFAULT NULL COMMENT '채팅 종료 일자',
                                  ic_chat_status ENUM('WAITING','ACTIVE','CLOSED') NOT NULL COMMENT '채팅 상태',
                                  member_id VARCHAR(255) NOT NULL COMMENT '회원 아이디',
                                  member_email VARCHAR(30) NOT NULL COMMENT '회원 이메일',
                                  PRIMARY KEY (ic_id),
                                  CONSTRAINT fk_inquiry_chat_member_role FOREIGN KEY (member_code, authority_code)
                                      REFERENCES tbl_member_role (member_code, authority_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='1:1 문의 채팅 테이블';


-- 1:1 문의 채팅 메시지 테이블
CREATE TABLE tbl_inquiry_chat_message (
                                          icm_id INT NOT NULL AUTO_INCREMENT COMMENT '1:1 문의 채팅 메시지 id',
                                          ic_id INT NOT NULL COMMENT '1:1 문의 채팅 id',
                                          member_code INT NOT NULL COMMENT '회원번호',
                                          authority_code INT NOT NULL COMMENT '권한번호',
                                          icm_sender_type ENUM('user', 'admin') NOT NULL COMMENT '보낸 사람',
                                          icm_message TEXT NOT NULL COMMENT '메시지',
                                          icm_sent_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '보낸 시간',
                                          PRIMARY KEY (icm_id),
                                          CONSTRAINT fk_icm_chat FOREIGN KEY (ic_id)
                                              REFERENCES tbl_inquiry_chat (ic_id),
                                          CONSTRAINT fk_icm_member_role FOREIGN KEY (member_code, authority_code)
                                              REFERENCES tbl_member_role (member_code, authority_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='1:1 문의 채팅 메시지 테이블';

CREATE TABLE `tbl_notification` (
                                    `noti_id` INT AUTO_INCREMENT NOT NULL COMMENT '알림id',
                                    `member_code` INT NOT NULL COMMENT '회원번호',
                                    `noti_message` VARCHAR(255) NOT NULL COMMENT '알림메시지',
                                    `noti_is_read` BOOLEAN DEFAULT FALSE NULL COMMENT '읽음 여부',
                                    `noti_created_at` DATETIME NOT NULL COMMENT '알림시간',
                                    CONSTRAINT `PK_TBL_NOTIFICATION` PRIMARY KEY (`noti_id`),
                                    CONSTRAINT `FK_tbl_member_TO_tbl_notification_1` FOREIGN KEY (`member_code`) REFERENCES `tbl_member` (`member_code`)
);

-- 환율 테이블 생성
CREATE TABLE IF NOT EXISTS tbl_exchange_rates (
                                              id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '자동 증가 ID',
                                              base_currency VARCHAR(3) NOT NULL DEFAULT 'USD' COMMENT '기준 통화',
                                              target_currency VARCHAR(3) NOT NULL COMMENT '대상 통화',
                                              rate DECIMAL(19, 6) NOT NULL COMMENT '환율',
                                              updated_date DATETIME NOT NULL COMMENT '환율 기준일시',
                                              UNIQUE KEY unique_rate (base_currency, target_currency, updated_date)
) ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COMMENT='국가별 환율정보';

-- 실시간검색어 테이블 (도시별 조회수를 집계)
-- city_id는 tbl_city 테이블의 city_id를 참조합니다.
-- view_count는 해당 도시의 상품 상세 페이지 총 조회수를 저장합니다.
CREATE TABLE tbl_city_view_count (
                                     id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '고유 식별자',
                                     city_id BIGINT NOT NULL COMMENT '도시 코드 (tbl_city 테이블 참조)',
                                     view_count INT NOT NULL DEFAULT 0 COMMENT '도시별 총 조회수',
                                     city_name_kr VARCHAR(20) NOT NULL COMMENT '도시 이름',
                                     last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '마지막 업데이트 시간',
                                     UNIQUE KEY uk_city_id (city_id), -- 도시당 하나의 집계 레코드만 존재하도록 UNIQUE 제약 조건 추가
                                     FOREIGN KEY (city_id) REFERENCES tbl_city(city_id) -- tbl_city 테이블을 참조하는 외래 키
) ENGINE=INNODB COMMENT='도시별 조회수 집계 테이블';

-- 실시간 검색어 순위 조회를 위한 인덱스 추가 (view_count 기준 내림차순 정렬 성능 향상)
CREATE INDEX idx_city_view_count_view_count ON tbl_city_view_count (view_count DESC);

-- 알림 테이블
CREATE TABLE tbl_notification (
                                  noti_id INT NOT NULL AUTO_INCREMENT COMMENT '알림id',
                                  member_code INT NOT NULL COMMENT '회원번호',
                                  noti_message VARCHAR(255) NOT NULL COMMENT '알림메시지',
                                  noti_is_read BOOLEAN DEFAULT FALSE COMMENT '읽음 여부',
                                  noti_created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '알림시간',
                                  noti_target_post_id INT NOT NULL COMMENT '대상 게시글 ID',
                                  PRIMARY KEY (noti_id),
                                  CONSTRAINT FK_tbl_member_TO_tbl_notification FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=INNODB COMMENT='알림';

commit;