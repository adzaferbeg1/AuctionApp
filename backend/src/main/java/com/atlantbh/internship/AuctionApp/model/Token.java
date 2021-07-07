package com.atlantbh.internship.AuctionApp.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "token")
public class Token {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String token;
    @Column(nullable = false)
    private LocalDateTime createdAt;
    @Column(nullable = false)
    private LocalDateTime expiresAt;
    private LocalDateTime confirmedAt;
    @ManyToOne
    @JoinColumn(nullable = false, name = "person_id")
    private Person person;

    public Token(String token, LocalDateTime createdAt, LocalDateTime expiresAt,  Person person) {
        this.token = token;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.person = person;
    }
}
