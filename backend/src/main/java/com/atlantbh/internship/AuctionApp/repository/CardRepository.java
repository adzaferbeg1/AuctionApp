package com.atlantbh.internship.AuctionApp.repository;

import com.atlantbh.internship.AuctionApp.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CardRepository extends JpaRepository<Card, Long> {

    @Query(value = "SELECT * FROM card WHERE person_id= ?1", nativeQuery = true)
    Card findUserCardInformation(Long id);

    @Query(value = "insert into card (id, card_name, card_number, cvc, exp_date, person_id) " +
            "values (:id, :cardName, :cardNumber, :cvc, :expDate, :personId) ON CONFLICT (id) DO UPDATE SET " +
            "card_name= :cardName, card_number= :cardNumber, cvc= :cvc, exp_date= :expDate",
            nativeQuery = true)
    void updateCardInfo(@Param("id") long id,
                        @Param("cardName") String cardName,
                        @Param("cardNumber") String cardNumber,
                        @Param("cvc") String cvc,
                        @Param("expDate") String expDate,
                        @Param("personId") long personId
                        );
}
