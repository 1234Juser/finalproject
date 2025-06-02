#!/bin/bash
# /home/ubuntu/app/scripts/start.sh

APP_DIR="/home/ubuntu/app" # <<< 경로 수정
LOG_PATH="$APP_DIR/deploy.log"
ERROR_LOG_PATH="$APP_DIR/error.log"

# 해당 위치의 모든 jar 파일을 찾습니다.
# build/libs/ 에 jar가 하나만 있다는 가정 하에 동작합니다.
JAR_PATH=$(ls $APP_DIR/*.jar | grep -v 'plain' | head -n 1)
JAR_NAME=$(basename $JAR_PATH)

echo ">>> 새 애플리케이션 배포: $JAR_PATH" >> $LOG_PATH
# prod 프로파일로 실행하고, 표준 출력과 표준 에러를 각각 다른 파일에 기록합니다.
nohup java -jar -Dspring.profiles.active=prod $JAR_PATH > $LOG_PATH 2> $ERROR_LOG_PATH &