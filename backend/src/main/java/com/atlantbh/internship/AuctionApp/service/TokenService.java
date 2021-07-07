package com.atlantbh.internship.AuctionApp.service;

import com.atlantbh.internship.AuctionApp.model.Token;
import com.atlantbh.internship.AuctionApp.repository.TokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TokenService {

    @Autowired private final TokenRepository tokenRepository;

    public void saveConfirmationToken(Token token){
        tokenRepository.save(token);
    }
    public Optional<Token> getToken(String token) {
        return tokenRepository.findByToken(token);
    }

    public void setConfirmedAt(String token) {
        tokenRepository.updateConfirmedAt(
                token, LocalDateTime.now());
    }
}
