package com.atlantbh.internship.AuctionApp.request;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class AddItemRequest {
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

    public AddItemRequest(final long sellerId,
                          final long categoryId,
                          Integer subcategoryId,
                          final String name,
                          String description,
                          double startPrice,
                          double currentPrice,
                          LocalDateTime startDate,
                          LocalDateTime endDate,
                          String imgUrl) {
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

    public long getSellerId() {
        return sellerId;
    }

    public void setSellerId(long sellerId) {
        this.sellerId = sellerId;
    }

    public long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(long categoryId) {
        this.categoryId = categoryId;
    }

    public Integer getSubcategoryId() {
        return subcategoryId;
    }

    public void setSubcategoryId(Integer subcategoryId) {
        this.subcategoryId = subcategoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getStartPrice() {
        return startPrice;
    }

    public void setStartPrice(double startPrice) {
        this.startPrice = startPrice;
    }

    public double getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(double currentPrice) {
        this.currentPrice = currentPrice;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
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
}
