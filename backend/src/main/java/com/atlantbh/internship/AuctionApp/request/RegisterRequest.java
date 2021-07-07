package com.atlantbh.internship.AuctionApp.request;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;


@AllArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
public class RegisterRequest {
    private final String name;
    private final String surname;
    private final String password;
    private final String email;

}
