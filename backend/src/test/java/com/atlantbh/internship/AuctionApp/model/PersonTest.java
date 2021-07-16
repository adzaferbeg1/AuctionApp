package com.atlantbh.internship.AuctionApp.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class PersonTest {

    private Person person = new Person("Ajla", "Ajlic", "ajladz", "ajladz@email.com", "123456");


    @Test
    void setName() {
        person.setName("Ajla2");
        assertEquals("Ajla2", person.getName());
    }

    @Test
    void setSurname() {
        person.setSurname("Dzaferbegovic");
        assertEquals("Dzaferbegovic", person.getSurname());
    }

    @Test
    void setUsername() {
        person.setUsername("a111");
        assertEquals("a111", person.getUsername());
    }

    @Test
    void setEmail() {
        person.setEmail("a1@email.com");
        assertEquals("a1@email.com", person.getEmail());
    }

    @Test
    void setPassword() {
        person.setPassword("123456777");
        assertEquals("123456777", person.getPassword());
    }

    @Test
    void setAddress() {
        person.setAddress("Adresa 1234");
        assertEquals("Adresa 1234", person.getAddress());
    }

    @Test
    void setPhoneNumber() {
        person.setPhoneNumber("+387123456");
        assertEquals("+387123456", person.getPhoneNumber());
    }

    @Test
    void getName() {
        assertEquals("Ajla", person.getName());
    }

    @Test
    void getSurname() {
        assertEquals("Ajlic", person.getSurname());
    }

    @Test
    void getUsername() {
        assertEquals("ajladz", person.getUsername());
    }

    @Test
    void getEmail() {
        assertEquals("ajladz@email.com", person.getEmail());
    }

    @Test
    void getPassword() {
        assertEquals("123456", person.getPassword());
    }
}
