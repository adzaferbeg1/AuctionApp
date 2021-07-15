package com.atlantbh.internship.AuctionApp.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Data
@NoArgsConstructor
@Table(name="category")
public class Category {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    @Column(name="title", unique = true)
    @Size(min = 2, max = 50)
    private String title;

    @Column(name="supercategory_id")
    private long supercategory;


}
