
/* 
package com.backend.entity;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import com.backend.entity.Person;

import jakarta.persistence.GenerationType.*;

@Entity(name = "CompetenceProfile")
@Table(name = "CompetenceProfile")
public class CompetenceProfile {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String Id; // THE ID, primary key of the class.

    @Column(
        name="yearsOfExperience",
        nullable = false
    )
    private int yearsOfExperience;

    @ManyToOne
    @JoinColumn(name="competence_id")
    private Competence competence;

    @ManyToOne
    @JoinColumn(name="person_id")
    private Person person;


    public CompetenceProfile(){

    }

    public CompetenceProfile(int yearsOfExperience){
        this.yearsOfExperience = yearsOfExperience;
    }

    public Competence getCompetence(){
        return competence;
    }

    public void setCompetence(Competence competence){
        this.competence = competence;
    }

    public Person getPerson(){
        return person;
    }

    public void setPerson(Person person){
        this.person = person;
    }

    public void setYearsOfExperience(int yearsOfExperience){
        this.yearsOfExperience = yearsOfExperience; 
    }

    public Integer getYearsOfExperience() {
        return null;
    }

}


*/

package com.backend.entity;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "CompetenceProfile")
@Table(name = "CompetenceProfile")
public class CompetenceProfile {
   
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String Id;
   
    @Column(
        name="years_of_experience",
        nullable = false,
        precision=10, 
        scale=2
    )
    private double yearsOfExperience;

    @ManyToOne
    @JoinColumn(name="competence_id")
    private Competence competence;

    @Column(name="person_id")
    private String personId;





    public CompetenceProfile(){

    }

    public CompetenceProfile(double yearsOfExperience){
        this.yearsOfExperience = yearsOfExperience;
    }
    
    public double getYearsOfExperience(){
        return this.yearsOfExperience;
    }


    public String getPerson() {
        return this.personId;
    }

    //public String getYearsOfExperience

}
