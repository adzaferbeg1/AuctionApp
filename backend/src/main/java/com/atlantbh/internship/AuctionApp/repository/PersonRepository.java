package com.atlantbh.internship.AuctionApp.repository;

import com.atlantbh.internship.AuctionApp.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

    Optional<Person> findByEmail(String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    @Query(value = "SELECT * FROM person WHERE id= ?1", nativeQuery = true)
    Person findUserById(long id);

    @Modifying(flushAutomatically = true)
    @Query(value = "UPDATE person SET name= ?1, surname= ?2, birth_date= ?3, phone_no= ?4, email= ?5, address= ?6, sex= ?7 WHERE id= ?8",
            nativeQuery = true)
    void updateProfileInformation(String name,
                              String surname,
                              String birthDate,
                              String phoneNo,
                              String email,
                              String address,
                              String sex,
                              long id);

    @Modifying(flushAutomatically = true)
    @Query(value = "DELETE FROM person WHERE id= ?1", nativeQuery = true)
    void deleteUser(long id);
}
