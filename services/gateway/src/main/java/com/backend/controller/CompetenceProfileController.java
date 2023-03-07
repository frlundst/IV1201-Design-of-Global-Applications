package com.backend.controller;



import java.security.Principal;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.entity.Competence;
import com.backend.entity.CompetenceProfile;
import com.backend.entity.Person;
import com.backend.model.dtos.NewCompetenceProfileDto;
import com.backend.repository.*;

import com.backend.repository.CompetenceRepository;

//;CompetenceProfileRepository;




@RestController
public class CompetenceProfileController {
    
private final CompetenceProfileRepository repository;
private final PersonRepository personRepository;
private final CompetenceRepository competenceRepository;


public CompetenceProfileController(CompetenceProfileRepository repository, PersonRepository personRepository, CompetenceRepository competenceRepository){

    this.repository = repository;
    this.personRepository = personRepository;
    this.competenceRepository = competenceRepository;
    
}

@PostMapping("/api/create/competenceProfile")
public ResponseEntity<?> newCompetenceProfile(@Valid @RequestBody NewCompetenceProfileDto newCompetenceProfileRequest, Principal principal){

    Optional<Person> person = personRepository.findByUsername(principal.getName());

    Optional<Competence> competence= competenceRepository.findById(newCompetenceProfileRequest.Id);

    if(person.isEmpty() || competence.isEmpty()){
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    CompetenceProfile newCompetenceProfile = new CompetenceProfile();
    newCompetenceProfile.setYearsOfExperience(newCompetenceProfileRequest.yearsOfExperience);
    newCompetenceProfile.setPerson(person.get()); // person.get(). To Get the person ok.
    newCompetenceProfile.setCompetence(competence.get()); // competence. getCompetence.

    repository.save(newCompetenceProfile); // SAVE THE NEW COMPETENCE PROFILE ok?.
    return new ResponseEntity<>(newCompetenceProfile, HttpStatus.CREATED);
}



}
