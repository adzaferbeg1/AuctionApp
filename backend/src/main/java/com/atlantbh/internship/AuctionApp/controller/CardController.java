package com.atlantbh.internship.AuctionApp.controller;

import com.atlantbh.internship.AuctionApp.model.Card;
import com.atlantbh.internship.AuctionApp.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/card")
public class CardController {
    @Autowired
    private final CardRepository categoryRepository;

    public CardController(CardRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/userinformation")
    public Card getUserCardInfo(@RequestParam Long id) {
        return categoryRepository.findUserCardInformation(id);
    }

}
