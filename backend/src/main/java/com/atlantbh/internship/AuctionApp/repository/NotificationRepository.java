package com.atlantbh.internship.AuctionApp.repository;

import com.atlantbh.internship.AuctionApp.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    @Modifying
    @Query("UPDATE Notification n SET n.seen = :seen WHERE n.id = :id")
    void updateSeenStatus(@Param(value = "seen") boolean seen, @Param(value = "id") long id);

    List<Notification> findByUserId(long userId);
}
