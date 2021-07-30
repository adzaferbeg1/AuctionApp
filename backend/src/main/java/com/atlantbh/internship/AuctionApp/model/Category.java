package com.atlantbh.internship.AuctionApp.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
public class Category {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    @Column(name = "title", unique = true)
    @Size(min = 2, max = 50)
    private String title;

    @Column(name = "supercategory_id")
    private long supercategory;

    public Category() {
    }

    public Category(
            final long id,
            final String title,
            final long supercategory) {

        this.id = id;
        this.title = title;
        this.supercategory = supercategory;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public long getSupercategory() {
        return supercategory;
    }

    public void setSupercategory(long supercategory) {
        this.supercategory = supercategory;
    }
}
