package com.backend.controller;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.entity.Competence;
import com.backend.entity.CompetenceProfile;
import com.backend.entity.Person;
import com.backend.model.dtos.NewCompetenceProfileDto;
import com.backend.repository.*;

import com.backend.repository.CompetenceRepository;
import com.backend.security.config.JwtTokenUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;

@CrossOrigin(origins = "${cors.frontend.url}")
@RestController
@Transactional
public class CompetenceProfileController {

    @Autowired
    private CompetenceProfileRepository repository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private CompetenceRepository competenceRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    public CompetenceProfileController() {
    }

    /**
     * Create a new competence profile for a person.
     * 
     * @param newCompetenceProfileRequest
     * @param principal
     * @return
     */
    @PostMapping("/api/create/competenceProfile")
    public ResponseEntity<?> newCompetenceProfile(
            @Valid @RequestBody NewCompetenceProfileDto newCompetenceProfileRequest, HttpServletRequest request) {

        String token = request.getHeader("Authorization").substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        Person person = personRepository.findByEmail(username);

        Optional<Competence> competence = competenceRepository.findById(newCompetenceProfileRequest.id);

        if (person.equals(null) || competence.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        CompetenceProfile newCompetenceProfile = new CompetenceProfile();
        newCompetenceProfile.setYearsOfExperience(newCompetenceProfileRequest.yearsOfExperience);
        newCompetenceProfile.setPersonId(person.getId()); // person.get(). To Get the person ok.
        newCompetenceProfile.setCompetence(competence.get()); // competence. getCompetence.

        repository.save(newCompetenceProfile); // SAVE THE NEW COMPETENCE PROFILE ok?.
        return new ResponseEntity<>(newCompetenceProfile, HttpStatus.CREATED);
    }

    /**
     * Delete a competence profile.
     * @param id
     * @param request
     * @return
     */
    @DeleteMapping("/api/delete/competenceProfile/{id}")
    public ResponseEntity<?> deleteCompetenceProfile(@PathVariable String id, HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        Person person = personRepository.findByEmail(username);

        CompetenceProfile competenceProfile = repository.findById(id).get();

        if (person.equals(null) || competenceProfile.equals(null)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (!competenceProfile.getPersonId().equals(person.getId())) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        repository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
