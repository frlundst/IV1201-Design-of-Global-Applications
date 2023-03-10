package com.backend.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Collection;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.util.Assert;

import com.backend.entity.Application;
import com.backend.entity.Availability;
import com.backend.entity.Competence;
import com.backend.entity.CompetenceProfile;
import com.backend.entity.Person;
import com.backend.model.AddApplicationRequest;
import com.backend.model.JwtRequest;
import com.backend.model.JwtResponse;
import com.backend.model.UpdateApplicationStatusRequest;

@SpringBootTest
class EntityTests {

	@Test
	void contextLoads() {
		Assert.isTrue(true, "Test successful");
	}

    
    @Test
    void testGettersAndSettersEA() {
        String id = "testid";
        String status = "teststatus";
        Person person = new Person();

        Application application = new Application();
        application.setId(id);
        application.setStatus(status);
        application.setPerson(person);

        assertEquals(id, application.getId());
        assertEquals(status, application.getStatus());
        assertEquals(person, application.getPerson());
    }

    @Test
    void testConstructorEA() {
        Application application = new Application();

        assertNull(application.getId());
        assertNull(application.getStatus());
        assertNull(application.getPerson());
    }

    @Test
    void testSetPersonEA() {
        Person person = new Person();
        Application application = new Application();

        application.setPerson(person);

        assertEquals(person, application.getPerson());
    }

    @Test
    public void testAvailability() {
        Availability availability = new Availability();
        availability.setId("1");
        availability.setDateFrom("2022-01-01");
        availability.setDateTo("2022-01-31");
        availability.setPersonId("2");

        assertEquals("1", availability.getId());
        assertEquals("2022-01-01", availability.getDateFrom());
        assertEquals("2022-01-31", availability.getDateTo());
        assertEquals("2", availability.getPersonId());
    }


    @Test
    public void testEmptyConstructor() {
        Competence competence = new Competence();

        assertNotNull(competence);
    }

    @Test
    void getUsername_shouldReturnEmail() {
        Person person = new Person();
        person.setEmail("test@example.com");
        assertEquals("test@example.com", person.getUsername());
    }

    @Test
    void isEnabled_shouldReturnTrue() {
        Person person = new Person();
        assertTrue(person.isEnabled());
    }

    @Test
    void getAuthorities_shouldReturnPersonRole() {
        Person person = new Person();
        person.setPersonRole("ADMIN");

        Collection<? extends GrantedAuthority> authorities = person.getAuthorities();

        assertEquals(1, authorities.size());
        assertTrue(authorities.contains(new SimpleGrantedAuthority("ADMIN")));
    }

    @Test
    void isAccountNonExpired_shouldReturnTrue() {
        Person person = new Person();
        assertTrue(person.isAccountNonExpired());
    }

    @Test
    void isAccountNonLocked_shouldReturnTrue() {
        Person person = new Person();
        assertTrue(person.isAccountNonLocked());
    }

    @Test
    void isCredentialsNonExpired_shouldReturnTrue() {
        Person person = new Person();
        assertTrue(person.isCredentialsNonExpired());
    }

}