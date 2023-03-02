package com.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.GenerationType.*;

@Entity(name = "Competence")
@Table(name = "Competence")
public class Competence {
    
    // This class will represent entity in database.
    /* 
    private @Id
    @GeneratedValue Long competenceId;*/
    

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String Id;


    @Column(
        name="nameOfCompetence",
        nullable = false,
        columnDefinition = "TEXT"
    )

    private String nameOfCompetence;


    public Competence(){
        
    }

    public Competence(String nameOfCompetence){
        this.nameOfCompetence = nameOfCompetence;
    }

    public String getId(){
        return this.Id;
    }

    public String getNameOfCompetence(){
        return this.nameOfCompetence;
    }





}
