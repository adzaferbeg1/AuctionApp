package com.atlantbh.internship.AuctionApp.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="person")
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

    public Person(@NotBlank @Size(min = 2, max = 200) String name, @NotBlank @Size(min = 2, max = 200) String surname, @Size(max = 100) String username, @NotBlank @Size(max = 50) String email, @NotBlank @Size(min = 4, max = 100) String password) {

        this.name = name;
        this.surname = surname;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
