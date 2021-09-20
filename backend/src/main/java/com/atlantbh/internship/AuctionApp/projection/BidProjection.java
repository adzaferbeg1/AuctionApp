package com.atlantbh.internship.AuctionApp.projection;

import java.time.LocalDateTime;
import java.util.UUID;

public interface BidProjection {
    UUID getId();

    String getName();

    String getSurname();

    Double getBid();

    LocalDateTime getDate();
}
