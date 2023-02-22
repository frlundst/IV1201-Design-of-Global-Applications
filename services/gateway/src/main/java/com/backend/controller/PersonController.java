package com.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.entity.Person;
import com.backend.model.JwtRequest;
import com.backend.model.JwtResponse;
import com.backend.repository.PersonRepository;
import com.backend.security.config.JwtTokenUtil;
import com.backend.service.PersonService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;

@CrossOrigin(origins = "${cors.frontend.url}")
@RestController
public class PersonController {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private PersonService personService;

    public PersonController() {
    }

    /**
     * Endpoint Test
     * @return
     */
    @GetMapping("api/person/test")
    public String test() {
        return "test";
    }

    /**
     * Endpoint to register a new person
     * @param customer
     * @param response
     * @return
     */
    @PostMapping(value = "api/person/register", consumes = "application/json", produces = "application/json")
    @Transactional
    public String registerPerson(@RequestBody Person person, HttpServletResponse response) {
        try {
            // Check given data
            if (person.getName() == null || person.getName().length() < 1) {
                response.setStatus(400);
                return "Name is required";
            }

            if (person.getSurname() == null || person.getSurname().length() < 1) {
                response.setStatus(400);
                return "Surname is required";
            }

            if (person.getPnr() == null || person.getPnr().length() < 10 || person.getPnr().length() > 12) {
                response.setStatus(400);
                return "Pnr is required";
            }

            if (person.getEmail() == null || person.getEmail().length() < 1) {
                response.setStatus(400);
                return "Email is required";
            }

            if (person.getPassword() == null || person.getPassword().length() < 6) {
                response.setStatus(400);
                return "Password is required";
            }

            if (person.getUsername() == null || person.getUsername().length() < 1) {
                response.setStatus(400);
                return "Username is required";
            }

            // Hash password the new password
            String password = passwordEncoder.encode(person.getPassword());
            
            // Create new person
            Person c = new Person();
            c.setName(person.getName());
            c.setSurname(person.getSurname());
            c.setPnr(person.getPnr());
            c.setEmail(person.getEmail());
            c.setPassword(password);
            c.setUsername(person.getUsername());
            c.setPersonRole("USER");

            // Save person in db
            personRepository.save(c);

            // Success
            response.setStatus(200);
            return "Person registered successfully";
        } catch (Exception e) {
            response.setStatus(500);
            System.out.println(e.getMessage());
            return "Customer registration failed";
        }
    }

    /**
     * Endpoint to authenticate a person
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @PostMapping(value = "api/person/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> loginCustomer(@RequestBody JwtRequest request, HttpServletResponse response) throws Exception {
        authenticate(request.getUsername(), request.getPassword());

        final UserDetails userDetails = personService
                .loadUserByUsername(request.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    /**
     * Get profile
     * @param response
     * @param request
     * @return
     */
    @GetMapping("api/person/getProfile")
    public Person getProfile(HttpServletResponse response, HttpServletRequest request) {
        System.out.println("Customer getProfile request received");
        try {
            String username = jwtTokenUtil.getUsernameFromToken(request.getHeader("Authorization").substring(7));
            System.out.println(username);
            Person customer = personRepository.findByEmail(username);
            customer.setPassword("");
            response.setStatus(200);
            return customer;
        } catch (Exception e) {
            response.setStatus(500);
            System.out.println(e.getMessage());
        }
        return null;
    }

    /**
     * Generate token for user.
     * @param username
     * @param password
     * @throws Exception
     */
    private void authenticate(String username, String password) throws Exception {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    }
}
