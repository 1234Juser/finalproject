#!/bin/bash
APP_DIR="/home/ec2-user/app"
LOG_PATH="$APP_DIR/deploy.log"

# 특정 jar 파일을 지정하는 대신, 해당 위치의 모든 jar 파일을 찾습니다.
# build/libs/ 에 jar가 하나만 있다는 가정 하에 동작합니다.
JAR_PATH=$(ls $APP_DIR/*.jar | head -n 1)
JAR_NAME=$(basename $JAR_PATH)

echo ">>> 실행할 JAR 파일: $JAR_NAME" >> $LOG_PATH

echo ">>> 현재 실행중인 애플리케이션 pid 확인" >> $LOG_PATH
# .jar 대신 JAR 파일의 이름으로 프로세스를 찾아서 더 정확하게 식별합니다.
CURRENT_PID=$(pgrep -f $JAR_NAME)

if [ -z "$CURRENT_PID" ]; then
    echo ">>> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다." >> $LOG_PATH
else
    echo ">>> kill -15 $CURRENT_PID"
    kill -15 $CURRENT_PID
    sleep 5
fi

echo ">>> 새 애플리케이션 배포: $JAR_PATH" >> $LOG_PATH
# prod 프로파일로 실행합니다.
nohup java -jar -Dspring.profiles.active=prod $JAR_PATH >> $LOG_PATH 2>&1 &