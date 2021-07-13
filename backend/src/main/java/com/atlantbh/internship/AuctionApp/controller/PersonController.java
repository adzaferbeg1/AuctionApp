package com.atlantbh.internship.AuctionApp.controller;

import com.atlantbh.internship.AuctionApp.model.Person;
import com.atlantbh.internship.AuctionApp.repository.PersonRepository;
import com.atlantbh.internship.AuctionApp.request.LogInRequest;
import com.atlantbh.internship.AuctionApp.request.RegisterRequest;
import com.atlantbh.internship.AuctionApp.response.JwtResponse;
import com.atlantbh.internship.AuctionApp.security.jwt.JwtProvider;
import com.atlantbh.internship.AuctionApp.service.PersonService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/auth")
@NoArgsConstructor
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

    @PostMapping("/signin")
    public ResponseEntity authenticateUser(@RequestBody LogInRequest loginRequest) {
        final Person person = personService.signin(loginRequest);
        if (!passwordEncoder.matches(loginRequest.getPassword(), person.getPassword()))
            return ResponseEntity.status(500).body("Wrong password");
        final String jwt = jwtProvider.generateJwtToken(person.getEmail());
        return ResponseEntity.ok(new JwtResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
        if(personRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity("Fail -> Username is already taken!",
                    HttpStatus.BAD_REQUEST);
        }

        if(personRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity("Fail -> Email is already in use!",
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        Person user = new Person(signUpRequest.getName(), signUpRequest.getSurname(), signUpRequest.getUsername(),
                signUpRequest.getEmail(), passwordEncoder.encode(signUpRequest.getPassword()));


        personRepository.save(user);

        return ResponseEntity.ok().body("User registered successfully!");
    }
    /*
    @GetMapping("/verify")
    public ResponseEntity verifyToken(HttpServletRequest request){
        String jwt = "";
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.replace("Bearer ","");
        }
        try {
            if(jwtProvider.validateJwtToken(jwt)) {
                String subjectEmail = jwtProvider.getUserNameFromJwtToken(jwt);
                String refreshedToken = jwtProvider.generateJwtToken(subjectEmail);
                return ResponseEntity.ok(new JwtResponse(refreshedToken));
            }
        }catch (Error e){
            System.out.print("Invalid token");
            return ResponseEntity.badRequest().body("Invalid token");
        }
        System.out.print("Token expired");
        return ResponseEntity.status(401).body("Token expired");
    }

     */

}


