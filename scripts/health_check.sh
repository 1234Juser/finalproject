#!/bin/bash
# /home/ubuntu/app/scripts/health_check.sh

# 헬스 체크 URL은 반드시 'localhost'를 사용해야 합니다.
# 외부 도메인을 사용하면 새로 배포된 인스턴스가 아닌,
# 기존에 운영 중인 다른 서버를 체크하게 되어 배포 검증의 의미가 없습니다.
HEALTH_CHECK_URL="http://localhost:8080/actuator/health"

MAX_ATTEMPTS=10
SLEEP_INTERVAL=5

echo ">>> Health check 시작 (대상: $HEALTH_CHECK_URL)..."

for ((i=1; i<=$MAX_ATTEMPTS; i++)); do
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_CHECK_URL)

    if [ "$HTTP_CODE" -eq 200 ]; then
        echo ">>> Health check 성공 (시도 횟수: $i)"
        exit 0 # 성공
    fi

    echo ">>> Health check 실패 (HTTP 코드: $HTTP_CODE), $SLEEP_INTERVAL초 후 재시도..."
    sleep $SLEEP_INTERVAL
done

echo ">>> Health check 최종 실패."
exit 1 # 실패