package com.atlantbh.internship.AuctionApp.controller;

import com.atlantbh.internship.AuctionApp.model.Person;
import com.atlantbh.internship.AuctionApp.repository.PersonRepository;
import com.atlantbh.internship.AuctionApp.request.LogInRequest;
import com.atlantbh.internship.AuctionApp.request.RegisterRequest;
import com.atlantbh.internship.AuctionApp.request.ResetPasswordRequest;
import com.atlantbh.internship.AuctionApp.request.UpdateInfoRequest;
import com.atlantbh.internship.AuctionApp.response.JwtResponse;
import com.atlantbh.internship.AuctionApp.security.jwt.JwtProvider;
import com.atlantbh.internship.AuctionApp.service.EmailService;
import com.atlantbh.internship.AuctionApp.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(path = "/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PersonController {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private PersonService personService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private EmailService emailService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/sign-in")
    public ResponseEntity authenticateUser(@RequestBody LogInRequest loginRequest) {
        final Person person = personService.signIn(loginRequest);
        if (!passwordEncoder.matches(loginRequest.getPassword(), person.getPassword()))
            return ResponseEntity.status(500).body("Wrong password");
        final String jwt = jwtProvider.generateJwtToken(person.getEmail());
        return ResponseEntity.ok(new JwtResponse(jwt, person.getId()));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/sign-up")
    public ResponseEntity registerUser(@RequestBody RegisterRequest signUpRequest) {
        if (personRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity("Fail -> Username is already taken!",
                    HttpStatus.BAD_REQUEST);
        }
        if (personRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity("Fail -> Email is already in use!",
                    HttpStatus.BAD_REQUEST);
        }
        Person user = new Person(
                signUpRequest.getName(),
                signUpRequest.getSurname(),
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                passwordEncoder.encode(signUpRequest.getPassword())
        );
        personRepository.save(user);
        return ResponseEntity.ok().body("User registered successfully!");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/single-user")
    public Optional<Person> getUserById(@RequestParam Long id) {
        return personRepository.findById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user-email")
    public Optional<Person> getUserByEmail(@RequestParam String email) {
        return personRepository.findByEmail(email);
    }

    @Transactional
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/update-information")
    public ResponseEntity updateProfileInformation(@RequestBody UpdateInfoRequest updateInfoRequest) {
        personRepository.updateProfileInformation(
                updateInfoRequest.getName(),
                updateInfoRequest.getSurname(),
                updateInfoRequest.getBirthDate(),
                updateInfoRequest.getPhoneNo(),
                updateInfoRequest.getEmail(),
                updateInfoRequest.getAddress(),
                updateInfoRequest.getSex(),
                updateInfoRequest.getId());
        return ResponseEntity.ok("Profile information successfully saved");
    }

    @Transactional
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/delete-user")
    public void deleteUserFromDB(@RequestParam Long id) {
        personRepository.deleteById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user-bids")
    public List<Object> getBidsForUser(@RequestParam Long id) {
        return personRepository.findPlacedBids(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user-address")
    public String getUserAddress(@RequestParam Long id) {
        final Optional<Person> person = personRepository.findById(id);
        if (person.isPresent()) {
            return person.get().getAddress();
        }
        return "";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/reset-password")
    public ResponseEntity resetPasswordEmail(@RequestParam String email) throws MessagingException {
        final Optional<Person> person = personRepository.findByEmail(email);
        if (person.isPresent()) {
            final String jwt = jwtProvider.generateJwtToken(email);
            emailService.sendEmail(person.get().getEmail(), "Password Reset", jwt);
            return ResponseEntity.ok(new JwtResponse(jwt, person.get().getId()));
        }
        return ResponseEntity.status(400).body("No user with this email can be found");
    }

    @Transactional
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/save-new-password")
    public ResponseEntity saveNewPassword(@RequestBody ResetPasswordRequest request) {
        try {
            personRepository.resetPassword(
                    passwordEncoder.encode(request.getPassword()),
                    request.getEmail()
            );
            return ResponseEntity.ok().body("Password has been updated");
        } catch (Error e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}
