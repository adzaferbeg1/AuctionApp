package com.atlantbh.internship.AuctionApp.model;

import lombok.EqualsAndHashCode;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


@EqualsAndHashCode
@Entity
public class Person {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    @Column(name="name")
    @Size(min = 2, max = 200)
    private String name;

    @NotBlank
    @Column(name="surname")
    @Size(min = 2, max = 200)
    private String surname;

    @Column(name="username")
    @Size(max = 100)
    private String username;

    @NotBlank
    @Column(name="email", nullable = false, unique = true)
    @Size(max = 50)
    private String email;

    @NotBlank
    @Column(name="password", nullable = false)
    @Size(min = 4, max = 100)
    private String password;

    @Column(name="address")
    @Size(max = 300)
    private String address;

    @Column(name="phone_no")
    @Size(max = 100)
    private String phoneNumber;

    public Person() {
    }

    public Person(
            final String name,
            final String surname,
            final String username,
            final String email,
            final String password) {

        this.name = name;
        this.surname = surname;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
