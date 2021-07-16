package com.atlantbh.internship.AuctionApp.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


public class LogInRequest {
    @NotBlank
    @Size(min=3, max = 60)
    private String email;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    public LogInRequest() {
    }

    public LogInRequest(@NotBlank @Size(min = 3, max = 60) String email, @NotBlank @Size(min = 6, max = 40) String password) {
        this.email = email;
        this.password = password;
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
}
