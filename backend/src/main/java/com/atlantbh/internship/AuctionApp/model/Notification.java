package com.atlantbh.internship.AuctionApp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Notification {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Column(name = "item_id")
    private long itemId;

    @NotNull
    @Column(name = "user_id")
    private long userId;

    @Column(name = "message")
    private String message;

    @Column(name = "seen")
    private boolean seen;

    public Notification() {
    }

    public Notification(@NotNull long itemId, @NotNull long userId, String message, boolean seen) {
        this.itemId = itemId;
        this.userId = userId;
        this.message = message;
        this.seen = seen;
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

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSeen() {
        return seen;
    }

    public void setSeen(boolean seen) {
        this.seen = seen;
    }
}
