package com.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.Competence;

public interface CompetenceRepository extends JpaRepository<Competence, String >{
    /**
     * Find competence by id.
     */
    public Optional<Competence> findById(String Id);
}
