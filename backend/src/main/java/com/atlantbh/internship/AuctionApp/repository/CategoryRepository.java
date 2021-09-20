package com.atlantbh.internship.AuctionApp.repository;

import com.atlantbh.internship.AuctionApp.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query(value = "SELECT c FROM Category c WHERE c.supercategory=c.id")
    List<Category> getAllSupercategories();

    @Query(value = "SELECT c FROM Category c WHERE c.supercategory<>c.id ORDER BY c.supercategory ASC")
    List<Category> getAllSubcategories();

    Optional<Category> findByTitle(String title);
}
