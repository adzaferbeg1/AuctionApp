package com.atlantbh.internship.AuctionApp.service;

import com.atlantbh.internship.AuctionApp.model.Person;
import com.atlantbh.internship.AuctionApp.model.Token;
import com.atlantbh.internship.AuctionApp.model.enums.PersonRole;
import com.atlantbh.internship.AuctionApp.repository.PersonRepository;
import com.atlantbh.internship.AuctionApp.request.RegisterRequest;
import com.atlantbh.internship.AuctionApp.validation.EmailValidation;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@AllArgsConstructor
public class PersonService implements UserDetailsService {

    private final static String USER_NOT_FOUND_MSSG = "USER WITH EMAIL %s NOT FOUND";
    @Autowired private final PersonRepository personRepository;
    @Autowired private final EmailValidation emailValidation;
    @Autowired private final BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired private final TokenService tokenService;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return personRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSSG, email)));
    }

    public String register(RegisterRequest registerRequest) {
        boolean isValidEmail =
                emailValidation.test(registerRequest.getEmail());
        if(!isValidEmail)
            throw new IllegalStateException("Invalid Email");
        return signUp(
                new Person(
                        registerRequest.getName(),
                        registerRequest.getSurname(),
                        registerRequest.getEmail(),
                        registerRequest.getPassword(),
                        PersonRole.USER

                )
        );
    }

    public String signUp(Person person){
        boolean userExists = personRepository.findByEmail(person.getEmail())
                .isPresent();
        if(userExists)
            throw new IllegalStateException("User with this email already exists");
        String encodedPassword = bCryptPasswordEncoder.encode(person.getPassword());
        person.setPassword(encodedPassword);
        personRepository.save(person);
        String token = UUID.randomUUID().toString();
        Token confirmationToken = new Token(token, LocalDateTime.now(), LocalDateTime.now().plusMinutes(3), person);
        tokenService.saveConfirmationToken(confirmationToken);
        return token;
    }

    @Transactional
    public String confirmToken(String token) {
        Token confirmationToken = tokenService.getToken(token)
                .orElseThrow(() -> new IllegalStateException("Token not found"));
        if(confirmationToken.getConfirmedAt() != null) throw new IllegalStateException("Email already confirmed");
        LocalDateTime expiredAt  = confirmationToken.getExpiresAt();
        if(expiredAt.isBefore(LocalDateTime.now())){
            throw new IllegalStateException("Token expired");
        }
        tokenService.setConfirmedAt(token);
        this.enableAppUser(confirmationToken.getPerson().getEmail());
        return "confirmed user";
    }

    public void enableAppUser(String email) {
        personRepository.enableAppUser(email);
    }
}
