package com.atlantbh.internship.AuctionApp.repository;

import com.atlantbh.internship.AuctionApp.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query(value = "SELECT * FROM category WHERE supercategory_id=id", nativeQuery = true)
    List<Category> getAllSupercategories();

    @Query(value = "SELECT * FROM category WHERE supercategory_id<>id ORDER BY supercategory_id ASC", nativeQuery = true)
    List<Category> getAllSubcategories();
}
