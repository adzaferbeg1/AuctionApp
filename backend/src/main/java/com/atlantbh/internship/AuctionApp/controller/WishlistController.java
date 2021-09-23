package com.atlantbh.internship.AuctionApp.controller;

import com.atlantbh.internship.AuctionApp.model.Wishlist;
import com.atlantbh.internship.AuctionApp.request.WishlistRequest;
import com.atlantbh.internship.AuctionApp.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/wishlist")
public class WishlistController {
    @Autowired
    private WishlistService wishlistService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/add")
    public ResponseEntity<String> addItem(@RequestBody WishlistRequest wishlistRequest) throws Exception {
        wishlistService.add(wishlistRequest);
        return ResponseEntity.ok("Product added to wishlist");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/get-items")
    public Optional<List<Wishlist>> getWishlistItems(@RequestParam("person-id") Long personId) {
        return wishlistService.getWishlistItems(personId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/remove-item")
    public void removeItemFromList(@RequestBody WishlistRequest wishlistRequest) throws Exception {
        try {
            wishlistService.removeItem(wishlistRequest);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
