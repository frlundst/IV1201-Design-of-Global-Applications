package com.backend.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.entity.Person;
import com.backend.entity.Application;
import com.backend.repository.ApplicationRepository;
import com.backend.model.AddApplicationRequest;

import jakarta.transaction.Transactional;

@CrossOrigin(origins = {"http://127.0.0.1:5173", "http://localhost:5173"})
@RestController
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    public ApplicationController() {
    }

    @GetMapping("/applications/search/{name}")
    public List<Application> searchApplications(@PathVariable String name, Model model) {
        return applicationRepository.findByNameContaining(name);
    }

    @PostMapping("/application/add")
    @Transactional
    public String addApplication(@RequestBody AddApplicationRequest apr) {
        applicationRepository.saveWithCategory(apr.getName(), apr.getDescription(), apr.getYears());
        return "Success";
    }
}
