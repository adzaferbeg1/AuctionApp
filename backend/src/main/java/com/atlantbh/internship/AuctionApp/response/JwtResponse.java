package com.atlantbh.internship.AuctionApp.response;

public class JwtResponse {
    private long personId;
    private String token;
    private String type = "Bearer";

    public JwtResponse(String token, long id) {

        this.token = token;
        this.personId = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getPersonId() {
        return personId;
    }

    public void setPersonId(long personId) {
        this.personId = personId;
    }
}
