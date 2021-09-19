package com.atlantbh.internship.AuctionApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Async
    public void sendEmail(String to, String subject, String token) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom("reset-password@auctionapp.com");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(generateEmailBody(to, token), true);
        javaMailSender.send(message);
        System.out.println("Mail sent");
    }

    private String generateEmailBody(String email, String token) {
        String url = "localhost:3000/verify-password?email=" + email + "&token=" + token;
        return "<div> <h3>Hello from Auction App</h3> " +
                "<p> Follow this link to reset your password, please note " +
                "that the link expires in 15 minutes.</p> " +
                "<a href=\"" + url + "\">" + url + "</a> </div>";
    }
}
