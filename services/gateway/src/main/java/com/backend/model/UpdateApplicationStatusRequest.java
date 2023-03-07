package com.backend.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateApplicationStatusRequest {
    private String status;
    private String id;
}
