package com.atlantbh.internship.AuctionApp.repository;

import com.atlantbh.internship.AuctionApp.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findAllByOrderByStartDateDesc();

    List<Item> findAllByOrderByEndDateAsc();

    List<Item> findByCategoryId(Long categoryId);

    @Modifying(flushAutomatically = true)
    @Query(value = "UPDATE Item i SET i.currentPrice= :bid WHERE i.id= :id")
    void updateCurrentPrice(@Param(value = "bid") double bid, @Param(value = "id") long id);

    List<Item> findByCategoryIdOrderByCurrentPriceAsc(long categoryId);

    List<Item> findByCategoryIdOrderByCurrentPriceDesc(long categoryId);

    List<Item> findByCategoryIdOrderByNameAsc(long categoryId);

    List<Item> findByCategoryIdOrderByStartDateDesc(long categoryId);

    List<Item> findByCategoryIdOrderByEndDateAsc(long categoryId);

    Item findTop1ByCategoryIdOrderByCurrentPriceDesc(long categoryId);

    Item findTop1ByCategoryIdOrderByCurrentPriceAsc(long categoryId);

    @Query(value = "SELECT AVG(i.currentPrice) FROM Item i WHERE i.categoryId = ?1")
    Integer findAveragePrice(long categoryId);

    List<Item> findBySubcategoryId(long subcategoryId);

    List<Item> findByNameIgnoreCaseContaining(String name);

    List<Item> findBySellerIdAndEndDateGreaterThanEqual(long sellerId, LocalDateTime endDate);

    List<Item> findBySellerIdAndEndDateLessThan(long sellerId, LocalDateTime endDate);
}
