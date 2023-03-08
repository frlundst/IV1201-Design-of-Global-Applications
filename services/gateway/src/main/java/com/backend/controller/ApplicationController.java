package com.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.entity.Application;
import com.backend.model.UpdateApplicationStatusRequest;
import com.backend.repository.ApplicationRepository;
import com.backend.repository.PersonRepository;
import com.backend.security.config.JwtTokenUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;

@CrossOrigin(origins = "${cors.frontend.url}")
@RestController
@Transactional
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired 
    private PersonRepository personRepository;

    public ApplicationController() {
    }

    /**
     * Get all applications
     * Can only be done by ADMIN.
     * @return
     */
    @GetMapping("api/allApplications")
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    /**
     * Get the authenticated user application.
     * Is used when user is logged in.
     * @param request
     * @return
     */
    @GetMapping("api/application/get")
    public Application getApplication(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(token);

        return applicationRepository.findByPersonId(personRepository.findByEmail(username).getId());
    }

    /**
     * Add a new application.
     * Is used when user is logged in.
     * @param request
     */
    @PostMapping("api/application/add")
    @Transactional
    public String addApplication(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(token);

        Application application = new Application();
        application.setPerson(personRepository.findByEmail(username));
        application.setStatus("Status.Unhandled");

        applicationRepository.save(application);
        return "Success";
    }

    /**
     * Update the application status by id.
     * Can only be done by ADMIN.
     * @param request
     */
    @PutMapping("api/updateApplicationStatus")
    public String updateApplicationStatus(@RequestBody UpdateApplicationStatusRequest request){
        if(request.getStatus() == null || request.getId() == null)
            throw new IllegalArgumentException("Status or id is null");
        
        if(!request.getStatus().equals("Status.Accepted") && !request.getStatus().equals("Status.Rejected") && !request.getStatus().equals("Status.Unhandled"))
            throw new IllegalArgumentException("Status is not valid");

        applicationRepository.updateStatusById(request.getStatus(), request.getId());
        return "Success";
    }
}
