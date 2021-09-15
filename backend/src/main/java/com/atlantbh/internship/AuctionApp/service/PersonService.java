package com.atlantbh.internship.AuctionApp.service;

import com.atlantbh.internship.AuctionApp.model.Person;
import com.atlantbh.internship.AuctionApp.repository.PersonRepository;
import com.atlantbh.internship.AuctionApp.request.LogInRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PersonService implements UserDetailsService {

    @Autowired
    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        Person user = personRepository.findByEmail(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User Not Found with -> username or email : " + username)
                );

        return PersonPrinciple.build(user);
    }

    public Person signIn(LogInRequest loginRequest) {
        return personRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new IllegalStateException("Wrong email"));
    }
}
