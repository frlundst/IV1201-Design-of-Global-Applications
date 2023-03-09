package com.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.entity.CompetenceProfile;

public interface CompetenceProfileRepository extends JpaRepository<CompetenceProfile, String> { // repository used to
                                                                                                // interact with
    Optional<CompetenceProfile> findAllByPersonId(String personId);                                                                                        // databse. Find by iD,
                                                                                                // insert data and more.

}
