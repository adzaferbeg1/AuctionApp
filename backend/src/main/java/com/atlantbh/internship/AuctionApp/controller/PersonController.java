package com.atlantbh.internship.AuctionApp.controller;

import com.atlantbh.internship.AuctionApp.request.RegisterRequest;
import com.atlantbh.internship.AuctionApp.service.PersonService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/auth")
@NoArgsConstructor
public class PersonController {

    @Autowired private PersonService personService;


    @PostMapping
    public String register(@RequestBody RegisterRequest request){
        return personService.register(request);
    }

    @GetMapping(path = "/confirm")
    public String confirm(@RequestParam("token") String token){
        return personService.confirmToken(token);
    }
}

