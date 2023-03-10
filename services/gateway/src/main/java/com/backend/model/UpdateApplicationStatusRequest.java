package com.backend.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/**
 * UpdateApplicationStatusRequest model.
 */
public class UpdateApplicationStatusRequest {
    private String status;
    private String id;
}
