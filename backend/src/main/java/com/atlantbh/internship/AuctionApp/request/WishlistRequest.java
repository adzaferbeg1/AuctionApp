package com.atlantbh.internship.AuctionApp.request;

import com.atlantbh.internship.AuctionApp.model.Item;
import com.atlantbh.internship.AuctionApp.model.Person;

public class WishlistRequest {

    private Person person;

    private Item item;

    public WishlistRequest(Person person, Item item) {
        this.person = person;
        this.item = item;
    }

    public Person getPerson() {
        return person;
    }

    public Item getItem() {
        return item;
    }
}
