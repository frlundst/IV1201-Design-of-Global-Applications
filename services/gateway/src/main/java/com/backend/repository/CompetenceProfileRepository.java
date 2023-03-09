package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.entity.CompetenceProfile;

public interface CompetenceProfileRepository extends JpaRepository<CompetenceProfile, String> {

    //public void deleteByNameOfCompetence(String nameOfCompetence);
    



}
