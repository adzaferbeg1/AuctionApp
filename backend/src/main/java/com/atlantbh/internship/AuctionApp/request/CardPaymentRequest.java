package com.atlantbh.internship.AuctionApp.request;

public class CardPaymentRequest {
    private long amount;
    private String id;

    public CardPaymentRequest(long amount, String id) {
        this.amount = amount;
        this.id = id;
    }

    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
