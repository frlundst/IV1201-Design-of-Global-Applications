package com.backend.model.dtos;

import javax.validation.constraints.NotNull;

/**
 * NewCompetenceProfileDto.
 */
public class NewCompetenceProfileDto {
    
    @NotNull
    public int yearsOfExperience; 
    
    @NotNull
    public String id;
}
