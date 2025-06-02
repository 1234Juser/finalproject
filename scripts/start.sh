#!/bin/bash
# /home/ubuntu/app/scripts/start.sh

APP_DIR="/home/ubuntu/app"
LOG_PATH="$APP_DIR/deploy.log" # 표준 출력 로그 파일 경로
ERROR_LOG_PATH="$APP_DIR/error.log" # 표준 에러 로그 파일 경로

# 실행 가능한 JAR만 선택 (plain.jar 제외)
JAR_PATH=$(ls $APP_DIR/*.jar | grep -v 'plain' | head -n 1)
JAR_NAME=$(basename $JAR_PATH)

echo ">>> 새 애플리케이션 배포: $JAR_PATH" >> $LOG_PATH

# 작업 디렉토리를 APP_DIR로 변경합니다.
cd $APP_DIR

# 이제 java -jar 명령어는 /home/ubuntu/app 디렉토리에서 실행됩니다.
# 이렇게 하면 Logback 설정에서 상대 경로('logs/chat-message.log')를 사용할 때
# 기준이 되는 현재 작업 디렉토리가 /home/ubuntu/app 가 됩니다.
# 따라서 application-prod.properties의 'logging.file.path=/home/ubuntu/app/logs' 설정과
# Logback의 상대 경로 설정이 일관되게 동작할 가능성이 매우 높아집니다.
nohup java -jar -Dspring.profiles.active=prod $JAR_PATH > $LOG_PATH 2> $ERROR_LOG_PATH &