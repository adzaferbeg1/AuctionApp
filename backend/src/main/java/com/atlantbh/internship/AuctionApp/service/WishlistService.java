package com.atlantbh.internship.AuctionApp.service;

import com.atlantbh.internship.AuctionApp.model.Item;
import com.atlantbh.internship.AuctionApp.model.Person;
import com.atlantbh.internship.AuctionApp.model.Wishlist;
import com.atlantbh.internship.AuctionApp.repository.ItemRepository;
import com.atlantbh.internship.AuctionApp.repository.PersonRepository;
import com.atlantbh.internship.AuctionApp.repository.WishlistRepository;
import com.atlantbh.internship.AuctionApp.request.WishlistRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WishlistService {
    @Autowired
    private final WishlistRepository wishlistRepository;

    @Autowired
    private final ItemRepository itemRepository;

    @Autowired
    private final PersonRepository personRepository;

    public WishlistService(WishlistRepository wishlistRepository, ItemRepository itemRepository, PersonRepository personRepository) {
        this.wishlistRepository = wishlistRepository;
        this.itemRepository = itemRepository;
        this.personRepository = personRepository;
    }

    public void add(WishlistRequest wishlistRequest) throws Exception {
        final Person person = wishlistRequest.getPerson();
        final Item item = wishlistRequest.getItem();
        if (!wishlistRepository.existsByPersonAndItem(person, item)) {
            wishlistRepository.save(new Wishlist(person, item));
        } else {
            throw new Exception("You already wishlisted this product");
        }
    }

    public Optional<List<Wishlist>> getWishlistItems(Long personId) {
        final Optional<Person> person = personRepository.findById(personId);
        Optional<List<Wishlist>> wishlistList = Optional.empty();
        if (person.isPresent()) {
            wishlistList = wishlistRepository.findByPerson(person.get());
        }
        return wishlistList;
    }

    public void removeItem(WishlistRequest request) {
        final Optional<Wishlist> wishlist = wishlistRepository
                .findByPersonAndItem(request.getPerson(), request.getItem());
        wishlist.ifPresent(wishlistRepository::delete);
    }
}
