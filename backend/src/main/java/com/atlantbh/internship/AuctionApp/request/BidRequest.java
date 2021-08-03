package com.atlantbh.internship.AuctionApp.request;

import javax.validation.constraints.NotNull;

public class BidRequest {
    @NotNull
    private long itemId;

    @NotNull
    private long bidderId;

    private double bid;

    public BidRequest(@NotNull long itemId, @NotNull long bidderId, double bid) {
        this.itemId = itemId;
        this.bidderId = bidderId;
        this.bid = bid;
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
