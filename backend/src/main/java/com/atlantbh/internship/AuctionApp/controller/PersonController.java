package com.atlantbh.internship.AuctionApp.controller;

import com.atlantbh.internship.AuctionApp.model.Person;
import com.atlantbh.internship.AuctionApp.repository.PersonRepository;
import com.atlantbh.internship.AuctionApp.request.LogInRequest;
import com.atlantbh.internship.AuctionApp.request.RegisterRequest;
import com.atlantbh.internship.AuctionApp.request.UpdateInfoRequest;
import com.atlantbh.internship.AuctionApp.response.JwtResponse;
import com.atlantbh.internship.AuctionApp.security.jwt.JwtProvider;
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

    public PersonController(PersonRepository personRepository, PersonService personService, PasswordEncoder passwordEncoder, JwtProvider jwtProvider) {
        this.personRepository = personRepository;
        this.personService = personService;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/signin")
    public ResponseEntity authenticateUser(@RequestBody LogInRequest loginRequest) {
        final Person person = personService.signIn(loginRequest);
        if (!passwordEncoder.matches(loginRequest.getPassword(), person.getPassword()))
            return ResponseEntity.status(500).body("Wrong password");
        final String jwt = jwtProvider.generateJwtToken(person.getEmail());
        return ResponseEntity.ok(new JwtResponse(jwt, person.getId()));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/signup")
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
                passwordEncoder.encode(signUpRequest.getPassword()));


        personRepository.save(user);

        return ResponseEntity.ok().body("User registered successfully!");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/singleuser")
    public Person getUserById(@RequestParam Long id) {
        return personRepository.findUserById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/useremail")
    public Optional<Person> getUserByEmail(@RequestParam String email) {
        return personRepository.findByEmail(email);
    }

    @Transactional
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/updateinformation")
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
    @GetMapping("/deleteuser")
    public void deleteUserFromDB(@RequestParam Long id) {
        personRepository.deleteUser(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/userbids")
    public List<Object> getBidsForUser(@RequestParam Long id) {
        return personRepository.findUserBids(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/useraddress")
    public Optional<String> getAddressForUser(@RequestParam Long id) {
        return personRepository.findAddressById(id);
    }
}
