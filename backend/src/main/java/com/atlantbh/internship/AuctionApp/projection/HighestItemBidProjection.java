package com.atlantbh.internship.AuctionApp.projection;

import java.util.UUID;

public interface HighestItemBidProjection {
    long getItemId();

    long getBidderId();

    Double getMax();
}
