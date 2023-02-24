package com.competence.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = { "*" })
@RestController

public class CompetenceController {


    public CompetenceController(){

    }

    /**
     * Endpoint Test
     * @return
     */
    @GetMapping("api/person/test")
    public String test() {
        return "test";
    }


    




    
}
