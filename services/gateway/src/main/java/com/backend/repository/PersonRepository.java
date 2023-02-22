package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.entity.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, String> {
    public Person save(Person user);
    public Person findByEmail(String email);
}
