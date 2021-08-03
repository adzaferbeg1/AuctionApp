package com.atlantbh.internship.AuctionApp.request;

import javax.validation.constraints.NotNull;

public class UpdatePriceRequest {

    private double bid;

    @NotNull
    private long itemId;

    public UpdatePriceRequest(double bid, @NotNull long itemId) {
        this.bid = bid;
        this.itemId = itemId;
    }

    public double getBid() {
        return bid;
    }

    public void setBid(double bid) {
        this.bid = bid;
    }

    public long getItemId() {
        return itemId;
    }

    public void setItemId(long itemId) {
        this.itemId = itemId;
    }
}
