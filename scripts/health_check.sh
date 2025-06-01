#!/bin/bash
# /home/ubuntu/app/scripts/health_check.sh

# Actuator health check 엔드포인트를 사용합니다. (Spring Boot Actuator 의존성 필요)
HEALTH_CHECK_URL="http://localhost:8080/actuator/health"
MAX_ATTEMPTS=10
SLEEP_INTERVAL=5

echo ">>> Health check 시작..."

for ((i=1; i<=$MAX_ATTEMPTS; i++)); do
    # curl로 health check URL에 요청을 보내고, HTTP 상태 코드를 확인합니다.
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_CHECK_URL)

    if [ "$HTTP_CODE" -eq 200 ]; then
        echo ">>> Health check 성공 (시도 횟수: $i)"
        exit 0 # 성공 시 0을 반환하고 종료
    fi

    echo ">>> Health check 실패 (HTTP 코드: $HTTP_CODE), $SLEEP_INTERVAL초 후 재시도..."
    sleep $SLEEP_INTERVAL
done

echo ">>> Health check 최종 실패."
exit 1 # 실패 시 1을 반환하여 CodeDeploy 배포를 실패 처리