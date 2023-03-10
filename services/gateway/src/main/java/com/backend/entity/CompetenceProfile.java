package com.backend.entity;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "competence_profile")
public class CompetenceProfile {
   
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String Id;
   
    @Column(
        name="years_of_experience",
        nullable = false
    )
    private int yearsOfExperience;

    @ManyToOne
    @JoinColumn(name="competence_id")
    private Competence competence;

    @Column(name="person_id")
    private String personId;

    public CompetenceProfile(){

    }

    public CompetenceProfile(int yearsOfExperience){
        this.yearsOfExperience = yearsOfExperience;
    }

}
