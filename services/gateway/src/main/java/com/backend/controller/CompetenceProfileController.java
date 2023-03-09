package com.backend.controller;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;

//;CompetenceProfileRepository;

@CrossOrigin(origins = "${cors.frontend.url}")
@Transactional

@RestController
public class CompetenceProfileController {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private final CompetenceProfileRepository repository;
    private final PersonRepository personRepository;
    private final CompetenceRepository competenceRepository;

    public CompetenceProfileController(CompetenceProfileRepository repository, PersonRepository personRepository,
            CompetenceRepository competenceRepository) {

        this.repository = repository;
        this.personRepository = personRepository;
        this.competenceRepository = competenceRepository;

    }

    @PostMapping("/api/create/competenceProfile") // TRY THIS FIRST OK?
    public ResponseEntity<?> newCompetenceProfile(
            @Valid @RequestBody NewCompetenceProfileDto newCompetenceProfileRequest, Principal principal) {

        Optional<Person> person = personRepository.findByUsername(principal.getName()); // THIS WE GET FROM TOKEN OK?

        Optional<Competence> competence = competenceRepository.findById(newCompetenceProfileRequest.Id);

        if (person.isEmpty() || competence.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        CompetenceProfile newCompetenceProfile = new CompetenceProfile();
        newCompetenceProfile.setYearsOfExperience(newCompetenceProfileRequest.yearsOfExperience);
        newCompetenceProfile.setPerson(person.get()); // person.get(). To Get the person ok.
        newCompetenceProfile.setCompetence(competence.get()); // competence. getCompetence.

        repository.save(newCompetenceProfile); // SAVE THE NEW COMPETENCE PROFILE ok?.
        return new ResponseEntity<>(newCompetenceProfile, HttpStatus.CREATED);

    }

    @GetMapping("/api/competenceProfile/get") // RETURNS LIST OF COMPETENCE PROFILES.
    public Optional<CompetenceProfile> getCompetenceProfile(HttpServletResponse response, HttpServletRequest request) {
        System.out.println("getAll competences executing..");
        try {

            String token = request.getHeader("Authorization").substring(7);
            String username = jwtTokenUtil.getUsernameFromToken(token);
            response.setStatus(200);
            return repository.findAllByPersonId(personRepository.findByEmail(username).getId()); // RETURN Id + name ok.

        } catch (Exception e) {
            response.setStatus(500);
            System.out.println(e.getMessage());
        }
        return null;
    }

}
