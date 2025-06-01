#!/bin/bash
# /home/ubuntu/app/scripts/stop.sh

APP_DIR="/home/ubuntu/app" # <<< 경로 수정
LOG_PATH="$APP_DIR/deploy.log"

echo ">>> 기존 애플리케이션 pid 확인" >> $LOG_PATH
# /home/ubuntu/app/ 경로 아래에서 실행되는 .jar 프로세스를 찾습니다.
CURRENT_PID=$(pgrep -f "$APP_DIR/.*.jar")

if [ -z "$CURRENT_PID" ]; then
    echo ">>> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다." >> $LOG_PATH
else
    echo ">>> kill -15 $CURRENT_PID" >> $LOG_PATH
    kill -15 $CURRENT_PID
    sleep 5
fi