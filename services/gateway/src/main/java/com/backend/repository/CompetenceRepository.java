package com.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.Competence;

public interface CompetenceRepository extends JpaRepository<Competence, String >{ // repository used to interact with databse. Find by iD, insert data and more.

    public Optional<Competence> findById(String Id);

    public Competence findByNameOfCompetence(String nameOfCompetence);
    
    public void deleteByNameOfCompetence(String nameOfCompetence);

}
