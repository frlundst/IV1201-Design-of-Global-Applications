package com.backend.model;

import java.io.Serializable;

import com.backend.entity.Person;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse implements Serializable {

	private static final long serialVersionUID = -12345L;
	private final String token;
	private Person person;

	public JwtResponse(String jwttoken, Person person) {
		this.token = jwttoken;
		this.person = person;
	}

	public String getToken() {
		return this.token;
	}

    public void setToken(String token2) {
    }
}
