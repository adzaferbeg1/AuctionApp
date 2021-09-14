package com.atlantbh.internship.AuctionApp.request;

public class NotificationRequest {
    private long itemId;
    private long userId;
    private String message;
    private boolean seen;

    public NotificationRequest(long itemId, long userId, String message, boolean seen) {
        this.itemId = itemId;
        this.userId = userId;
        this.message = message;
        this.seen = seen;
    }

    public long getItemId() {
        return itemId;
    }

    public long getUserId() {
        return userId;
    }

    public String getMessage() {
        return message;
    }

    public boolean isSeen() {
        return seen;
    }
}
