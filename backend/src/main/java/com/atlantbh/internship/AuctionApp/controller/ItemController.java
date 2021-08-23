package com.atlantbh.internship.AuctionApp.controller;

import com.atlantbh.internship.AuctionApp.model.Item;
import com.atlantbh.internship.AuctionApp.repository.ItemRepository;
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

import java.util.List;

@RestController
@RequestMapping(path = "/item")
public class ItemController {

    @Autowired
    private final ItemRepository itemRepository;

    public ItemController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/newarrival")
    public List<Item> getNewArrival() {
        return itemRepository.findNewArrivals();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/lastchance")
    public List<Item> getLastChance() {
        return itemRepository.findLastChances();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/category")
    public List<Item> getItemsByCategory(@RequestParam Long id) {
        return itemRepository.findByCategoryId(id);
    }

    @Transactional
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/placebid")
    public ResponseEntity updateCurrentPrice(@RequestBody UpdatePriceRequest updatePriceRequest) {

        itemRepository.updateCurrentPrice(updatePriceRequest.getBid(), updatePriceRequest.getItemId());

        return ResponseEntity.ok().body("Current price updated successfully!");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/singleitem")
    public Item getItemById(@RequestParam Long id) {
        return itemRepository.findItemById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/sortpricelow")
    public List<Item> getLowPrice(@RequestParam Long id) {
        return itemRepository.sortByLowPrice(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/sortpricehigh")
    public List<Item> getHighPrice(@RequestParam Long id) {
        return itemRepository.sortByHighPrice(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/sortdefault")
    public List<Item> getDefault(@RequestParam Long id) {
        return itemRepository.sortByDefault(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/newtoold")
    public List<Item> getNewToOld(@RequestParam Long id) {
        return itemRepository.sortByNewToOld(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/timeleft")
    public List<Item> getTimeLeft(@RequestParam Long id) {
        return itemRepository.sortByTimeLeft(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/maxprice")
    public Integer getMaxPrice(@RequestParam Long id) {
        return itemRepository.findMaxPrice(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/minprice")
    public Integer getMinPrice(@RequestParam Long id) {
        return itemRepository.findMinPrice(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/avgprice")
    public Integer getAvgPrice(@RequestParam Long id) {
        return itemRepository.findAvgPrice(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/subcategoryitems")
    public List<Item> getSubcategoryItems(@RequestParam Long id) {
        return itemRepository.findSubcategoryItems(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/search")
    public List<Item> getSearchItems(@RequestParam String name) {
        return itemRepository.findByNameIgnoreCaseContaining(name);
    }

    @GetMapping("/activeitems")
    public List<Item> getActiveItemsForSeller(@RequestParam Long id) {
        return itemRepository.findActiveItemsForSeller(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/solditems")
    public List<Item> getSoldItemsForSeller(@RequestParam Long id) {
        return itemRepository.findSoldItemsForSeller(id);
    }

}
