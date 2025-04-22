-- 1) 디폴트 데이터베이스 스키마인 mysql로 이동
USE mysql;

#SELECT * FROM user;
SHOW databases;

-- 2) 데이터베이스 생성(travelogicdb)
CREATE DATABASE travelogicdb;
SHOW DATABASES;

-- 3) 유저 생성 (hellotravelogic/hellotravelogic)
CREATE USER 'hellotravelogic'@'%' IDENTIFIED BY 'hellotravelogic';
SELECT * FROM user;


-- 4) 유저에게 권한 부여
GRANT ALL PRIVILEGES ON travelogicdb.* TO 'hellotravelogic'@'%';
SHOW GRANTS FOR 'hellotravelogic'@'%';


-- 5) SQL을 실행할 타겟 스키마(travelogicdb)로 이동
USE travelogicdb;