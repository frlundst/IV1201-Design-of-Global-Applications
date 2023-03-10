package com.backend.model;

import java.io.Serializable;

/**
 * JwtRequest.
 */
public class JwtRequest implements Serializable {

	private static final long serialVersionUID = 12345L;

	private String username;
	private String password;

	/**
	 * Default constructor.
	 */
	public JwtRequest() {
	}

	/**
	 * Constructor.
	 * @param username username
	 * @param password password
	 */
	public JwtRequest(String username, String password) {
		this.setUsername(username);
		this.setPassword(password);
	}

	/**
	 * Get username.
	 * @return
	 */
	public String getUsername() {
		return this.username;
	}

	/**
	 * Set username.
	 * @param username
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * Get password.
	 * @return password
	 */
	public String getPassword() {
		return this.password;
	}

	/**
	 * Set password.
	 * @param password
	 */
	public void setPassword(String password) {
		this.password = password;
	}
}
