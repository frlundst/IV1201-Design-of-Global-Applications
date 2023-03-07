package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.entity.CompetenceProfile;

public interface CompetenceProfileRepository extends JpaRepository<CompetenceProfile, String> { // repository used to
                                                                                                // interact with
                                                                                                // databse. Find by iD,
                                                                                                // insert data and more.

}
