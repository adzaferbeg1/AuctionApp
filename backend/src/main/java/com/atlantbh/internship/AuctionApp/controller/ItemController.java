package com.atlantbh.internship.AuctionApp.controller;

import com.atlantbh.internship.AuctionApp.model.Item;
import com.atlantbh.internship.AuctionApp.repository.ItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/item")
public class ItemController {

    @Autowired
    private final ItemRepository itemRepository;


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/newarrival")
    public List<Item> getNewArrival(){
        return itemRepository.findNewArrivals();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/lastchance")
    public List<Item> getLastChance(){
        return itemRepository.findLastChances();
    }
}
