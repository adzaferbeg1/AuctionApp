package com.atlantbh.internship.AuctionApp.controller;

import com.atlantbh.internship.AuctionApp.model.Bid;
import com.atlantbh.internship.AuctionApp.repository.BidRepository;
import com.atlantbh.internship.AuctionApp.request.BidRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/bid")
public class BidController {

    @Autowired
    private final BidRepository bidRepository;

    public BidController(BidRepository bidRepository) {
        this.bidRepository = bidRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/placebid")
    public ResponseEntity placeBid(@Valid @RequestBody BidRequest bidRequest) {

        Bid bid = new Bid(bidRequest.getItemId(), bidRequest.getBidderId(), bidRequest.getBid());
        bidRepository.save(bid);

        return ResponseEntity.ok().body("Bid placed successfully!");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/bidders")
    public List<Bid> getAllBiddersForItem(@RequestParam Long id) {
        return bidRepository.getAllBiddersForItem(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/bidsno")
    public Integer getNumberOfBidsForItem(@RequestParam Long id) {
        return bidRepository.getNumberOfBids(id);
    }

}
