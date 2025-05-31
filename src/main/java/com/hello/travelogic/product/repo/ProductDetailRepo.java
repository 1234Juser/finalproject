package com.hello.travelogic.product.repo;

import com.hello.travelogic.product.domain.ProductDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDetailRepo extends JpaRepository<ProductDetailEntity, Long> {

}
