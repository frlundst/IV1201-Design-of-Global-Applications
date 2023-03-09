package com.backend.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

import com.backend.entity.Application;
import com.backend.entity.Person;
import com.backend.model.AddApplicationRequest;
import com.backend.model.JwtRequest;
import com.backend.model.JwtResponse;
import com.backend.model.UpdateApplicationStatusRequest;

@SpringBootTest
class BackendApplicationTests {

	@Test
	void contextLoads() {
		Assert.isTrue(true, "Test successful");
	}
	
    @Test
    void testConstructorAndGetters() {
        String name = "Test Application";
        String description = "This is a test application";
        int years = 1;
        AddApplicationRequest request = new AddApplicationRequest(name, description, years);

        assertEquals(name, request.getName());
        assertEquals(description, request.getDescription());
        assertEquals(years, request.getYears());
    }

    @Test
    void testSetters() {
        String name = "Test Application";
        String description = "This is a test application";
        int years = 1;
        AddApplicationRequest request = new AddApplicationRequest(null, null, 0);

        request.setName(name);
        request.setDescription(description);
        request.setYears(years);

        assertEquals(name, request.getName());
        assertEquals(description, request.getDescription());
        assertEquals(years, request.getYears());
    }

	@Test
    void testConstructorAndGettersRequest() {
        String username = "testuser";
        String password = "testpassword";
        JwtRequest request = new JwtRequest(username, password);

        assertEquals(username, request.getUsername());
        assertEquals(password, request.getPassword());
    }

    @Test
    void testSettersRequest() {
        String username = "testuser";
        String password = "testpassword";
        JwtRequest request = new JwtRequest(null, null);

        request.setUsername(username);
        request.setPassword(password);

        assertEquals(username, request.getUsername());
        assertEquals(password, request.getPassword());
    }

	@Test
    void testConstructorAndGettersResponse() {
        String token = "testtoken";
        Person person = new Person();
        JwtResponse response = new JwtResponse(token, person);

        assertEquals(token, response.getToken());
        assertEquals(person, response.getPerson());
    }

    @Test
    void testSetterResponse() {
        String token = "testtoken";
        Person person = new Person();
        JwtResponse response = new JwtResponse(null, null);

        response.setPerson(person);

        assertEquals(token, response.getToken());
        assertEquals(person, response.getPerson());
    }

    @Test
    void testConstructorAndGettersApp() {
        String status = "approved";
        String id = "123";
        UpdateApplicationStatusRequest request = new UpdateApplicationStatusRequest();
        request.setStatus(status);
        request.setId(id);

        assertEquals(status, request.getStatus());
        assertEquals(id, request.getId());
    }

    @Test
    void testSettersApp() {
        String status = "rejected";
        String id = "456";
        UpdateApplicationStatusRequest request = new UpdateApplicationStatusRequest();

        request.setStatus(status);
        request.setId(id);

        assertEquals(status, request.getStatus());
        assertEquals(id, request.getId());
    }

	
}