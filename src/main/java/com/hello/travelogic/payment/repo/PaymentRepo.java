package com.hello.travelogic.payment.repo;

import com.hello.travelogic.payment.domain.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepo extends JpaRepository<PaymentEntity, Long> {

    // murchantUid로 결제 정보 조회
    PaymentEntity findByMerchantUid(String merchantUid);

    // impUid로 결제 취소/완료/실패 등 상태 업데이트
    PaymentEntity findByImpUid(String impUid);
//    Optional<PaymentEntity> findByImpUid(String impUid);

    // 내 여행 페이지에서 orderCode에 해당하는 결제 정보 조회
    List<PaymentEntity> findByOrder_OrderCode(Long orderCode);

    // orderStatus를 기본값 PENDING에서 SCHEDULED로 변경
    Optional<PaymentEntity> findOptionalByImpUid(String impUid);

    // 결제 상태 변경을 위해서 바꾼버전
    Optional<PaymentEntity> findTopByOrder_OrderCode(Long orderCode);
}
