package com.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.entity.Competence;
import com.backend.repository.CompetenceRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;

@CrossOrigin(origins = "${cors.frontend.url}")
@RestController
@Transactional
public class CompetenceController {

    @Autowired
    private CompetenceRepository repository;
    
    public CompetenceController(){}

    /**
     * GET ALL COMPETENCES
     * @param response
     * @param request
     * @return
     */
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
