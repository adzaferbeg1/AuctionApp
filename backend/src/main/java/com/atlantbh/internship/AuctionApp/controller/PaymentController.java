package com.atlantbh.internship.AuctionApp.controller;

import com.atlantbh.internship.AuctionApp.request.CardPaymentRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/checkout")
public class PaymentController {

    @Value("${app.STRIPE_SECRET_KEY}")
    private String stripeSecretKey;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/card-payment")
    public ResponseEntity processCardPayment(@RequestBody CardPaymentRequest cardPaymentRequest) {
        Stripe.apiKey = stripeSecretKey;
        try {
            PaymentIntentCreateParams createParams = new PaymentIntentCreateParams.Builder()
                    .setCurrency("usd")
                    .setAmount(cardPaymentRequest.getAmount())
                    .setDescription("Auction-App Purchase")
                    .setPaymentMethod(cardPaymentRequest.getId())
                    .setConfirm(true)
                    .build();
            PaymentIntent intent = PaymentIntent.create(createParams);
            return ResponseEntity.status(200).body("Payment successful");
        } catch (StripeException se) {
            se.printStackTrace();
            return ResponseEntity.status(500).body("Payment not processed");
        }
    }
}
