package com.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import org.hibernate.annotations.GenericGenerator;

@Getter
@Setter
@Entity(name = "Competence")
@Table(name = "Competence")
public class Competence {

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
}
