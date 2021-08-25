package com.atlantbh.internship.AuctionApp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
public class Item {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    @Column(name = "seller_id", nullable = false)
    private long sellerId;

    @NotBlank
    @Column(name = "category_id", nullable = false)
    private long categoryId;

    @Column(name = "subcategory_id")
    private Integer subcategoryId;

    @NotBlank
    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "start_price", nullable = false)
    private double startPrice;

    @Column(name = "current_price", nullable = false)
    private double currentPrice;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

    @Column(name = "img_url")
    private String imgUrl;

    public Item() {
    }


    public Item(
            final long categoryId,
            final double currentPrice,
            final String description,
            final LocalDateTime endDate,
            final String imgUrl,
            final String name,
            final long sellerId,
            final LocalDateTime startDate,
            final double startPrice,
            final Integer subcategoryId) {

        this.sellerId = sellerId;
        this.categoryId = categoryId;
        this.subcategoryId = subcategoryId;
        this.name = name;
        this.description = description;
        this.startPrice = startPrice;
        this.currentPrice = currentPrice;
        this.startDate = startDate;
        this.endDate = endDate;
        this.imgUrl = imgUrl;
    }

    public long getId() {
        return id;
    }

    public long getSellerId() {
        return sellerId;
    }

    public long getCategoryId() {
        return categoryId;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public double getStartPrice() {
        return startPrice;
    }

    public double getCurrentPrice() {
        return currentPrice;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setSellerId(long sellerId) {
        this.sellerId = sellerId;
    }

    public void setCategoryId(long categoryId) {
        this.categoryId = categoryId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStartPrice(double startPrice) {
        this.startPrice = startPrice;
    }

    public void setCurrentPrice(double currentPrice) {
        this.currentPrice = currentPrice;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public long getSubcategoryId() {
        return subcategoryId;
    }

    public void setSubcategoryId(Integer subcategoryId) {
        this.subcategoryId = subcategoryId;
    }
}
