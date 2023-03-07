package com.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.entity.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, String> {
    public Person findByEmail(String email);


    public Optional<Person> findByUsername(String username);

    

}
