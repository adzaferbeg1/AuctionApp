package com.atlantbh.internship.AuctionApp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Card {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Column(name = "person_id")
    private long personId;

    @NotNull
    @Column(name = "card_name")
    private String cardName;

    @NotNull
    @Column(name = "card_number")
    private String cardNumber;

    @NotNull
    @Column(name = "exp_date")
    private String expDate;

    @NotNull
    @Column(name = "cvc")
    private String cvc;

    public Card() {
    }

    public Card(final long personId,
                final String cardName,
                final String cardNumber,
                final String expDate,
                final String cvc) {
        this.personId = personId;
        this.cardName = cardName;
        this.cardNumber = cardNumber;
        this.expDate = expDate;
        this.cvc = cvc;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getPersonId() {
        return personId;
    }

    public void setPersonId(long personId) {
        this.personId = personId;
    }

    public String getCardName() {
        return cardName;
    }

    public void setCardName(String cardName) {
        this.cardName = cardName;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getExpDate() {
        return expDate;
    }

    public void setExpDate(String expDate) {
        this.expDate = expDate;
    }

    public String getCvc() {
        return cvc;
    }

    public void setCvc(String cvc) {
        this.cvc = cvc;
    }
}
