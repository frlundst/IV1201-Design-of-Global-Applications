package com.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
/**
 * AddApplicationRequest model.
 */
public class AddApplicationRequest {
    private String name;
    private String description;
    private int years;
}