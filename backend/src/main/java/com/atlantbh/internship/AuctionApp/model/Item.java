package com.atlantbh.internship.AuctionApp.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class Item {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    @Column(name="seller_id", nullable = false)
    private long sellerId;

    @NotBlank
    @Column(name="category_id", nullable = false)
    private long categoryId;

    @NotBlank
    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="start_price",  nullable = false)
    private double startPrice;

    @Column(name="current_price",  nullable = false)
    private double currentPrice;

    @Column(name="start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name="end_date", nullable = false)
    private LocalDateTime endDate;

    public Item(@NotBlank long sellerId, @NotBlank long categoryId, String name, String description, double startPrice, double currentPrice, LocalDateTime startDate, LocalDateTime endDate) {
        this.sellerId = sellerId;
        this.categoryId = categoryId;
        this.name = name;
        this.description = description;
        this.startPrice = startPrice;
        this.currentPrice = currentPrice;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
