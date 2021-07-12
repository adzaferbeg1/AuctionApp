package com.atlantbh.internship.AuctionApp.response;

import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;

class JwtResponseTest {

    private String randomToken = UUID.randomUUID().toString();
    private JwtResponse jwtResponse = new JwtResponse(randomToken);

    @Test
    void getToken() {
        assertEquals(randomToken, jwtResponse.getToken());
    }

    @Test
    void getType() {
        assertEquals("Bearer", jwtResponse.getType());
    }
}