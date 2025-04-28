package com.hello.travelogic.product.repo;

import com.hello.travelogic.product.domain.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepo extends JpaRepository<ProductEntity, Long> {

    // 찜 등록/취소에 사용
    Optional<ProductEntity> findByProductCode(long productCode);
}
