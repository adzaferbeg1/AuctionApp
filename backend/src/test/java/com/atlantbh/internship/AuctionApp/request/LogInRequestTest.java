package com.atlantbh.internship.AuctionApp.request;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class LogInRequestTest {

    private LogInRequest logInRequest = new LogInRequest();

    @Test
    void setEmail() {
        logInRequest.setEmail("a1@email.com");
        assertEquals("a1@email.com", logInRequest.getEmail());
    }

    @Test
    void setPassword() {

        logInRequest.setPassword("7777");
        assertEquals("7777", logInRequest.getPassword());
    }
}
