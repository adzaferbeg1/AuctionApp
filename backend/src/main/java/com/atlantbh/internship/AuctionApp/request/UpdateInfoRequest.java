package com.atlantbh.internship.AuctionApp.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;

public class UpdateInfoRequest {
    @NotBlank
    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    private String surname;
    @NotBlank
    private String birthDate;
    @NotBlank
    private String phoneNo;
    @NotBlank
    @Size(min = 5, max = 60)
    private String email;
    @NotBlank
    private String address;
    @NotBlank
    private String sex;

    public UpdateInfoRequest() {
    }

    public UpdateInfoRequest(String name,
                             String surname,
                             String birthDate,
                             String phoneNo,
                             String email,
                             String address,
                             String sex,
                             Long id) {
        this.name = name;
        this.surname = surname;
        this.birthDate = birthDate;
        this.phoneNo = phoneNo;
        this.email = email;
        this.address = address;
        this.sex = sex;
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }
}
