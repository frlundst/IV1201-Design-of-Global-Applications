package com.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.Person;

public interface PersonRepository extends JpaRepository<Person, String> {
    /**
     * Find person by id.
     * @param email
     * @return
     */
    public Person findByEmail(String email);

    /**
     * Find person by username.
     * @param username
     * @return
     */
    public Optional<Person> findByUsername(String username);
}
