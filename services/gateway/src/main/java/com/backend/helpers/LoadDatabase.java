/* 
package com.backend.helpers;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.backend.entity.Competence;
import com.backend.repository.CompetenceRepository;

import org.springframework.boot.CommandLineRunner;

@Configuration
public class LoadDatabase {

    @Bean // managed by Bean Container.
    CommandLineRunner initDatabase (CompetenceRepository competenceRepository ){

    return args -> {

       // Competence ticket_keeper = new Competence((long) 1, "Ticketkeeper");

        

        Competence firstRole10= new Competence("Competence.AttractionWard");

        competenceRepository.save(firstRole10); // save this into the database ok?.

        Competence firstRole11= new Competence("Competence.GateKeeper");



        competenceRepository.save(firstRole11); // save this into the database ok?.

        Competence firstRole12= new Competence("Competence.Cleaner");

        competenceRepository.save(firstRole12); // save this into the database ok?.

        Competence firstRole13= new Competence("Competence.Ballonist");

        competenceRepository.save(firstRole13); // save this into the database ok?.
        

        
    };
    }
    
}

*/