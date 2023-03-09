/*package com.backend.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.backend.entity.Competence;
import com.backend.repository.*;

import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;
import jakarta.transaction.Transactional;

import com.backend.entity.*;

@SpringBootTest
public class CompetenceProfileRepositoryTests {
    
    @Autowired
    public CompetenceProfileRepository underTest;


    @Transactional
    @Test   // PRERUN OK.
    void deleteRepository(){

        underTest.deleteByNameOfCompetence("Competence.Test3");
        Competence retrievedCompetence = underTest.findByNameOfCompetence("Competence.Test3");
        boolean checkTrueDeleted = false;

        if(retrievedCompetence == null){
            checkTrueDeleted = true;
        }
        assertThat(checkTrueDeleted).isTrue();

        
    }




    @Transactional
    @Test
    void checkRepository(){
        
        underTest.deleteByNameOfCompetence("Competence.Test6");
        Competence retrievedCompetenceToDelete = underTest.findByNameOfCompetence("Competence.Test6");
        boolean checkTrueDeleted = false;

        if(retrievedCompetenceToDelete == null){
            checkTrueDeleted = true;
        }
        assertThat(checkTrueDeleted).isTrue();
        
        Competence competence = new Competence("Competence.Test6");
        underTest.save(competence);
        Competence retrievedCompetence = underTest.findByNameOfCompetence("Competence.Test6");

        String finalString = retrievedCompetence.getNameOfCompetence();
        
        boolean checkTrue = false;
        if(finalString.equals("Competence.Test6")){
            checkTrue = true;
        }
        assertThat(checkTrue).isTrue();     
    }
    


}
*/
