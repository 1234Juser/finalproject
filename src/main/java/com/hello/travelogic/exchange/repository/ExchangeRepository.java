package com.hello.travelogic.exchange.repository;

import com.hello.travelogic.exchange.domain.ExchangeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExchangeRepository extends JpaRepository<ExchangeEntity, Long> {
    List<ExchangeEntity> findTop5ByBaseCurrencyOrderByUpdatedDateDesc(String baseCurrency);

}
