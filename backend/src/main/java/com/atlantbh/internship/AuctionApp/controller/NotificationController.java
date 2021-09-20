package com.atlantbh.internship.AuctionApp.controller;

import com.atlantbh.internship.AuctionApp.model.Notification;
import com.atlantbh.internship.AuctionApp.repository.NotificationRepository;
import com.atlantbh.internship.AuctionApp.request.NotificationRequest;
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
@RequestMapping("/notification")
public class NotificationController {
    @Autowired
    private final NotificationRepository notificationRepository;

    public NotificationController(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Transactional
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/post-notification")
    public ResponseEntity postNotificationForUser(@RequestBody NotificationRequest notificationRequest) {
        final Notification notification = new Notification(notificationRequest.getItemId(),
                notificationRequest.getUserId(),
                notificationRequest.getMessage(),
                notificationRequest.isSeen()
        );
        notificationRepository.save(notification);
        return ResponseEntity.ok().body(notification);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/all-notifications")
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    @Transactional
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/set-seen")
    public void setSeenStatus(@RequestParam long id) {
        notificationRepository.updateSeenStatus(true, id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user-notifications")
    public List<Notification> getNotificationsForUser(@RequestParam long id) {
        return notificationRepository.findByUserId(id);
    }
}
