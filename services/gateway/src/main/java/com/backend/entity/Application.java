package com.backend.entity;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "application")
public class Application {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;

    @Column(name = "status")
    private String status;

    @OneToOne
    @JoinColumn(name = "person_id", unique = true)
    private Person person;
 
    public Application() {
    }
}