package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.Competence;

public interface CompetenceRepository extends JpaRepository<Competence, String >{ // repository used to interact with databse. Find by iD, insert data and more.


    

}
