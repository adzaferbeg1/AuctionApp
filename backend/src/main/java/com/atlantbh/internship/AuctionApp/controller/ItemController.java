package com.atlantbh.internship.AuctionApp.controller;

import com.atlantbh.internship.AuctionApp.model.Item;
import com.atlantbh.internship.AuctionApp.repository.ItemRepository;
import com.atlantbh.internship.AuctionApp.request.AddItemRequest;
import com.atlantbh.internship.AuctionApp.request.UpdatePriceRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/item")
public class ItemController {

    @Autowired
    private final ItemRepository itemRepository;

    public ItemController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/new-arrival")
    public List<Item> getNewArrival() {
        return itemRepository.findAllByOrderByStartDateDesc();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/last-chance")
    public List<Item> getLastChance() {
        return itemRepository.findAllByOrderByEndDateAsc();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/category")
    public List<Item> getItemsByCategory(@RequestParam Long id) {
        return itemRepository.findByCategoryId(id);
    }

    @Transactional
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/place-bid")
    public ResponseEntity updateCurrentPrice(@RequestBody UpdatePriceRequest updatePriceRequest) {
        itemRepository.updateCurrentPrice(updatePriceRequest.getBid(), updatePriceRequest.getItemId());
        return ResponseEntity.ok().body("Current price updated successfully!");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/single-item")
    public Optional<Item> getItemById(@RequestParam Long id) {
        return itemRepository.findById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/sort-price-low")
    public List<Item> getLowPrice(@RequestParam Long id) {
        return itemRepository.findByCategoryIdOrderByCurrentPriceAsc(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/sort-price-high")
    public List<Item> getHighPrice(@RequestParam Long id) {
        return itemRepository.findByCategoryIdOrderByCurrentPriceDesc(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/sort-default")
    public List<Item> getDefault(@RequestParam Long id) {
        return itemRepository.findByCategoryIdOrderByNameAsc(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/new-to-old")
    public List<Item> getNewToOld(@RequestParam Long id) {
        return itemRepository.findByCategoryIdOrderByStartDateDesc(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/time-left")
    public List<Item> getTimeLeft(@RequestParam Long id) {
        return itemRepository.findByCategoryIdOrderByEndDateAsc(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/max-price")
    public double getMaxPrice(@RequestParam Long id) {
        final Item item = itemRepository.findTop1ByCategoryIdOrderByCurrentPriceDesc(id);
        return item.getCurrentPrice();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/min-price")
    public double getMinPrice(@RequestParam Long id) {
        final Item item = itemRepository.findTop1ByCategoryIdOrderByCurrentPriceAsc(id);
        return item.getCurrentPrice();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/avg-price")
    public Integer getAvgPrice(@RequestParam Long id) {
        return itemRepository.findAveragePrice(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/subcategory-items")
    public List<Item> getSubcategoryItems(@RequestParam long id) {
        return itemRepository.findBySubcategoryId(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/search")
    public List<Item> getSearchItems(@RequestParam String name) {
        return itemRepository.findByNameIgnoreCaseContaining(name);
    }

    @GetMapping("/active-items")
    public List<Item> getActiveItemsForSeller(@RequestParam Long id) {
        return itemRepository.findBySellerIdAndEndDateGreaterThanEqual(id, LocalDateTime.now());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/sold-items")
    public List<Item> getSoldItemsForSeller(@RequestParam Long id) {
        return itemRepository.findBySellerIdAndEndDateLessThan(id, LocalDateTime.now());
    }

    @Transactional
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/add-item")
    public ResponseEntity addItemForSale(@RequestBody AddItemRequest addItemRequest) {
        final Item item = new Item(addItemRequest.getCategoryId(),
                addItemRequest.getCurrentPrice(),
                addItemRequest.getDescription(),
                addItemRequest.getEndDate(),
                addItemRequest.getImgUrl(),
                addItemRequest.getName(),
                addItemRequest.getSellerId(),
                addItemRequest.getStartDate(),
                addItemRequest.getStartPrice(),
                addItemRequest.getSubcategoryId()
        );
        itemRepository.save(item);
        return ResponseEntity.ok().body("New item added successfully!");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/bid-sell-items")
    public List<Long> getBidSellCategoriesForUser(@RequestParam Long id) {
        return itemRepository.findBidSellCategoriesForUser(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/recommended-items")
    public List<Item> getRecommendedItems(@RequestParam("id-list") List<Long> idList) {
        return itemRepository.findByCategoryIdIn(idList);
    }

}
