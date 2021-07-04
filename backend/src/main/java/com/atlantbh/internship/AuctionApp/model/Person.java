package com.atlantbh.internship.AuctionApp.model;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name="person")
public class Person {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    @Column(name="name")
    @Max(200)
    @Min(2)
    private String name;

    @NotBlank
    @Column(name="surname")
    @Max(200)
    @Min(2)
    private String surname;

    @NotBlank
    @Column(name="email", nullable = false, unique = true)
    @Max(100)
    private String email;

    @NotBlank
    @Column(name="password", nullable = false, unique = true)
    @Max(100)
    private String password;

    @Column(name="address")
    @Max(300)
    private String address;

    @Column(name="phone_no")
    @Max(100)
    private String phoneNumber;

    public Person(@NotBlank @Max(200) @Min(2) String name, @NotBlank @Max(200) @Min(2) String surname, @NotBlank @Max(100) String email, @NotBlank @Max(100) String password, @Max(300) String address, @Max(100) String phoneNumber) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}
