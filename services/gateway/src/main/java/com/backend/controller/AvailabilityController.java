package com.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.entity.Availability;
import com.backend.repository.AvailabilityRepository;
import com.backend.repository.PersonRepository;
import com.backend.security.config.JwtTokenUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;

@CrossOrigin(origins = "${cors.frontend.url}")
@Transactional
@RestController
public class AvailabilityController {

    @Autowired
    private AvailabilityRepository availabilityRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired 
    private PersonRepository personRepository;

    public AvailabilityController() {
    }

    /**
     * Add availability
     * @param availability
     * @param request
     * @param response
     * @return
     */
    @PostMapping("api/availability/add")
    public String addAvailability(@RequestBody Availability availability, HttpServletRequest request, HttpServletResponse response) {

        if(request.getHeader("Authorization") == null) {
            response.setStatus(401);
            return "Unauthorized";
        }

        if(availability.getDateFrom() == null || availability.getDateTo() == null) {
            response.setStatus(400);
            return "Bad Request";
        }

        if(availability.getDateFrom().length() != 10 || availability.getDateTo().length() != 10) {
            response.setStatus(400);
            return "Bad Request";
        }

        String token = request.getHeader("Authorization").substring(7);

        String username = jwtTokenUtil.getUsernameFromToken(token);

        availability.setPersonId(personRepository.findByEmail(username).getId());

        availabilityRepository.save(availability);
        response.setStatus(200);
        return "Success";
    }

    /**
     * Delete availability
     * @param id
     * @param response
     * @return
     */
    @DeleteMapping("api/availability/remove/{id}")
    public String removeAvailability(@PathVariable String id, HttpServletResponse response) {
        availabilityRepository.deleteById(id);
        response.setStatus(200);
        return "Success";
    }

}
