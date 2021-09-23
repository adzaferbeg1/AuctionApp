package com.atlantbh.internship.AuctionApp.repository;

import com.atlantbh.internship.AuctionApp.model.Item;
import com.atlantbh.internship.AuctionApp.model.Person;
import com.atlantbh.internship.AuctionApp.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    Optional<List<Wishlist>> findByPerson(Person person);

    boolean existsByPersonAndItem(Person person, Item item);

    Optional<Wishlist> findByPersonAndItem(Person person, Item item);

}
