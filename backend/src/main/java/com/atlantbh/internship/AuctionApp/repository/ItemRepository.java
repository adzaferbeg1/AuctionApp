package com.atlantbh.internship.AuctionApp.repository;

import com.atlantbh.internship.AuctionApp.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    @Query(value = "SELECT * FROM ITEM ORDER BY start_date DESC", nativeQuery = true)
    List<Item> findNewArrivals();

    @Query(value = "SELECT * FROM ITEM ORDER BY end_date ASC", nativeQuery = true)
    List<Item> findLastChances();

    @Query(value = "SELECT * FROM ITEM WHERE category_id= ?1", nativeQuery = true)
    List<Item> findByCategoryId(Long categoryId);

    @Modifying(flushAutomatically = true)
    @Query(value = "UPDATE item SET current_price= ?1 WHERE id= ?2", nativeQuery = true)
    void updateCurrentPrice(double bid, long id);

    @Query(value = "SELECT * FROM item WHERE id= ?1", nativeQuery = true)
    Item findItemById(long id);

    @Query(value = "SELECT * FROM item WHERE category_id= ?1 ORDER BY current_price ASC", nativeQuery = true)
    List<Item> sortByLowPrice(long id);

    @Query(value = "SELECT * FROM item WHERE category_id= ?1 ORDER BY current_price DESC", nativeQuery = true)
    List<Item> sortByHighPrice(long id);

    @Query(value = "SELECT * FROM item WHERE category_id= ?1 ORDER BY name ASC", nativeQuery = true)
    List<Item> sortByDefault(long id);

    @Query(value = "SELECT * FROM item WHERE category_id= ?1 ORDER BY start_date DESC", nativeQuery = true)
    List<Item> sortByNewToOld(long id);

    @Query(value = "SELECT * FROM item WHERE category_id= ?1 ORDER BY end_date ASC", nativeQuery = true)
    List<Item> sortByTimeLeft(long id);

    @Query(value = "SELECT MAX(current_price) FROM item WHERE category_id= ?1", nativeQuery = true)
    Integer findMaxPrice(long id);

    @Query(value = "SELECT MIN(current_price) FROM item WHERE category_id= ?1", nativeQuery = true)
    Integer findMinPrice(long id);

    @Query(value = "SELECT AVG(current_price) FROM item WHERE category_id= ?1", nativeQuery = true)
    Integer findAvgPrice(long id);

    @Query(value = "SELECT * FROM item WHERE subcategory_id= ?1", nativeQuery = true)
    List<Item> findSubcategoryItems(long id);

    List<Item> findByNameIgnoreCaseContaining(String name);

    @Query(value = "SELECT * FROM item WHERE seller_id= ?1 AND end_date >= CURRENT_DATE", nativeQuery = true)
    List<Item> findActiveItemsForSeller(long id);

    @Query(value = "SELECT * FROM item WHERE seller_id= ?1 AND end_date < CURRENT_DATE", nativeQuery = true)
    List<Item> findSoldItemsForSeller(long id);
}
