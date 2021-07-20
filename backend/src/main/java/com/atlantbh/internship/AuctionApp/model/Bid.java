package com.atlantbh.internship.AuctionApp.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table
public class Bid {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Column(name="item_id")
    private long itemId;

    @NotNull
    @Column(name="bidder_id")
    private long bidderId;

    @Column(name="bid")
    private double bid;

    public Bid(
            final long itemId,
            final long bidderId,
            final double bid) {

        this.itemId = itemId;
        this.bidderId = bidderId;
        this.bid = bid;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getItemId() {
        return itemId;
    }

    public void setItemId(long itemId) {
        this.itemId = itemId;
    }

    public long getBidderId() {
        return bidderId;
    }

    public void setBidderId(long bidderId) {
        this.bidderId = bidderId;
    }

    public double getBid() {
        return bid;
    }

    public void setBid(double bid) {
        this.bid = bid;
    }
}
