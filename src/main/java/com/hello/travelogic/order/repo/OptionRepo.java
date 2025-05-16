package com.hello.travelogic.order.repo;

import com.hello.travelogic.order.domain.OptionEntity;
import com.hello.travelogic.order.domain.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface OptionRepo extends JpaRepository<OptionEntity, Long> {

    // productcode 기반
//    @Query("SELECT COALESCE(SUM(o.adultCount + o.childCount), 0) " +
//            "FROM OptionEntity o " +
//            "WHERE o.product.productCode = :productCode " +
//            "AND o.reservationDate = :reservationDate")
//    int getTotalParticipantsByDate(
//            @Param("productCode") Long productCode,
//            @Param("reservationDate") String reservationDate);

    // productUid 기반
    @Query("SELECT COALESCE(SUM(o.adultCount + o.childCount), 0) " +
            "FROM OptionEntity o " +
            "WHERE o.product.productUid = :productUid " +
            "AND o.reservationDate = :reservationDate")
    int getTotalParticipantsByDate(
            @Param("productUid") String productUid,
            @Param("reservationDate") LocalDate reservationDate);

//    List<OptionEntity> findByProduct_ProductUidAndReservationDate(String productUid, LocalDate parse);
//    @Query("SELECT o FROM OptionEntity o WHERE o.product.productUid = :productUid AND o.reservationDate = :reservationDate")
//    List<OptionEntity> findByProduct_ProductUidAndReservationDate(
//            @Param("productUid") String productUid,
//            @Param("reservationDate") LocalDate reservationDate);
    @Query("SELECT o FROM OptionEntity o WHERE o.product.productUid = :productUid AND o.reservationDate BETWEEN :startDate AND :endDate")
    List<OptionEntity> findByProduct_ProductUidAndReservationDate(
            @Param("productUid") String productUid,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);
//    @Query("SELECT o FROM OptionEntity o " +
//            "WHERE o.product.productCode = :productCode " +
//            "AND o.reservationDate BETWEEN :startDate AND :endDate")
//    List<OptionEntity> findByProduct_ProductUidAndReservationDate(
//            @Param("productCode") Long productCode,
//            @Param("startDate") LocalDate startDate,
//            @Param("endDate") LocalDate endDate);

}
