package com.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.entity.Availability;

import jakarta.transaction.Transactional;

@CrossOrigin(origins = "${cors.frontend.url}")
@Transactional
@RestController
public class AvailabilityController {

    public AvailabilityController() {
    }

    /**
     * Post availability
     * @return
     */
    @PostMapping("api/availability")
    public String test(@RequestBody Availability availability) {
        return "test";
    }
}
