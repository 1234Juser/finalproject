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


-- 9. 이벤트 테이블 (tbl_event)
CREATE TABLE tbl_event (
                           event_code INT PRIMARY KEY AUTO_INCREMENT COMMENT '이벤트 번호',
                           event_title VARCHAR(50) NOT NULL COMMENT '제목',
                           event_content VARCHAR(255) NOT NULL COMMENT '내용',
                           event_img VARCHAR(255) NOT NULL COMMENT '이미지 파일 경로',
                           event_status VARCHAR(10) NOT NULL COMMENT '진행 상태'
)ENGINE=INNODB COMMENT '이벤트';

-- 10. FAQ 테이블 (tbl_faq)
CREATE TABLE tbl_faq (
                         faq_code INT PRIMARY KEY AUTO_INCREMENT COMMENT 'FAQ 번호',
                         faq_title VARCHAR(50) NOT NULL COMMENT '제목',
                         faq_content VARCHAR(255) NOT NULL COMMENT '내용'
)ENGINE=INNODB COMMENT 'FAQ';