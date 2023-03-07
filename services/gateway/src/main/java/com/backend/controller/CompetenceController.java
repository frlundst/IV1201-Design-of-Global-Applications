package com.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.entity.Competence;
import com.backend.repository.CompetenceRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

//@CrossOrigin(origins = { "*" })
@RestController

public class CompetenceController {


    private final CompetenceRepository repository;
    

    public CompetenceController(CompetenceRepository repository){
        this.repository = repository;
    }

    /**
     * Endpoint Test
     * @return
     */
    @GetMapping("api/person/test")
    public String test() {
        return "test";
    }

    @GetMapping("")
    public String test10() {
        return "test10";
    }


    @GetMapping("/api/competences")
    public List<Competence> getAll(HttpServletResponse response, HttpServletRequest request) {
        System.out.println("getAll competences executing..");
        try {
            response.setStatus(200);
            return repository.findAll(); // RETURN LIST OF ALL. 
        } catch (Exception e) {
            response.setStatus(500);
            System.out.println(e.getMessage());
        }
        return null;
    }


    
}
