package com.atlantbh.internship.AuctionApp.repository;

import com.atlantbh.internship.AuctionApp.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    @Query(value = "SELECT * FROM ITEM ORDER BY start_date DESC", nativeQuery = true)
    List<Item> findNewArrivals();

    @Query(value = "SELECT * FROM ITEM ORDER BY end_date ASC", nativeQuery = true)
    List<Item> findLastChances();
}
