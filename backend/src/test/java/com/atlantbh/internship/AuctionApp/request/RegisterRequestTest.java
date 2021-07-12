package com.atlantbh.internship.AuctionApp.request;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RegisterRequestTest {

    private RegisterRequest registerRequest = new RegisterRequest("Name", "Surname", "namesurname", "name@email.com", "000000");

    @Test
    void getName() {
        assertEquals("Name", registerRequest.getName());
    }

    @Test
    void getSurname() {
        assertEquals("Surname", registerRequest.getSurname());
    }

    @Test
    void getUsername() {
        assertEquals("namesurname", registerRequest.getUsername());
    }

    @Test
    void getEmail() {

        assertEquals("name@email.com", registerRequest.getEmail());
    }

    @Test
    void getPassword() {

        assertEquals("000000", registerRequest.getPassword());
    }

    @Test
    void setName() {
        registerRequest.setName("New name");
        assertEquals("New name", registerRequest.getName());
    }

    @Test
    void setSurname() {
        registerRequest.setSurname("New surname");
        assertEquals("New surname", registerRequest.getSurname());
    }

    @Test
    void setUsername() {
        registerRequest.setUsername("new11");
        assertEquals("new11", registerRequest.getUsername());
    }

    @Test
    void setEmail() {

        registerRequest.setEmail("e@email.com");
        assertEquals("e@email.com", registerRequest.getEmail());
    }

    @Test
    void setPassword() {
        registerRequest.setPassword("111111");
        assertEquals("111111", registerRequest.getPassword());
    }
}