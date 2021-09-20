package com.atlantbh.internship.AuctionApp.repository;

import com.atlantbh.internship.AuctionApp.model.Bid;
import com.atlantbh.internship.AuctionApp.projection.BidProjection;
import com.atlantbh.internship.AuctionApp.projection.HighestItemBidProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {
    @Query(value = "select person.name, person.surname, bid.bid, bid.date " +
            "from person inner join bid on person.id=bid.bidder_id where bid.item_id= ?1",
            nativeQuery = true)
    List<BidProjection> getAllBiddersForItem(long itemId);

    Integer countByItemId(long itemId);

    Bid findTop1ByItemIdOrderByBidDesc(long itemId);

    @Query(value = "SELECT b.itemId as itemId, b.bidderId as bidderId, max(b.bid) as max FROM Bid AS b " +
            "GROUP BY b.itemId, b.bidderId ORDER BY b.itemId ASC")
    List<HighestItemBidProjection> findHighestPlacedItemBid();

}
