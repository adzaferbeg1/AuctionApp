package com.atlantbh.internship.AuctionApp.repository;

import com.atlantbh.internship.AuctionApp.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

    Optional<Person> findByEmail(String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    @Query(value = "SELECT * FROM person WHERE id= ?1", nativeQuery = true)
    Person findUserById(long id);

    @Modifying(flushAutomatically = true)
    @Query(value = "UPDATE person SET name= ?1, surname= ?2, birth_date= ?3, phone_no= ?4, email= ?5, address= ?6, sex= ?7 WHERE id= ?8",
            nativeQuery = true)
    void updateProfileInformation(String name,
                                  String surname,
                                  String birthDate,
                                  String phoneNo,
                                  String email,
                                  String address,
                                  String sex,
                                  long id);

    @Modifying(flushAutomatically = true)
    @Query(value = "DELETE FROM person WHERE id= ?1", nativeQuery = true)
    void deleteUser(long id);

    @Query(value =
            "SELECT item.img_url AS item_image, item.id AS item_id, item.name AS item_name, " +
                    "item.end_date AS item_end, bid.bid AS bid_value, " +
                    "(SELECT COUNT(bid) FROM bid WHERE bid.item_id=item.id) as bids_no, item.current_price AS highest_bid " +
                    "FROM bid INNER JOIN item ON bid.item_id=item.id WHERE bid.bidder_id= ?1", nativeQuery = true)
    List<Object> findUserBids(long id);


}
