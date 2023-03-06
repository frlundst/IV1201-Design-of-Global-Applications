package com.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.entity.Application;
import com.backend.repository.ApplicationRepository;

import jakarta.transaction.Transactional;

@CrossOrigin(origins = "${cors.frontend.url}")
@RestController
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    public ApplicationController() {
    }

    @GetMapping("/applications/search/{name}")
    public List<Application> searchApplications(@PathVariable String name, Model model) {
        return null;
    }

    @PostMapping("/application/add")
    @Transactional
    public String addApplication(@RequestBody Application application) {
        applicationRepository.save(application);
        return "Success";
    }
}
