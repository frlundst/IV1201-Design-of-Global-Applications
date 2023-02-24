package com.competence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.competence.entity.Competence;

public interface CompetenceRepository extends JpaRepository<Competence, String >{ // repository used to interact with databse. Find by iD, insert data and more.

}
