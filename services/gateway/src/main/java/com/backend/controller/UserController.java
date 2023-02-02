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

import com.backend.entity.User;
import com.backend.model.JwtRequest;
import com.backend.model.JwtResponse;
import com.backend.repository.UserRepository;
import com.backend.security.config.JwtTokenUtil;
import com.backend.service.CustomerService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;

@CrossOrigin(origins = { "*" })
@RestController
public class UserController {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository customerRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private CustomerService customerService;

    public UserController() {
    }

    @GetMapping("/test")
    public String test() {
        User c = new User();
        customerRepository.save(c);
        return "test";
    }

    @PostMapping(value = "/customer/register", consumes = "application/json", produces = "application/json")
    @Transactional
    public String registerCustomer(@RequestBody User customer, HttpServletResponse response) {
        System.out.println("Customer registration request received");

        try {
            User c = new User();
            c.setEmail(customer.getEmail());

            String password = passwordEncoder.encode(customer.getPassword());
            c.setPassword(password);
            c.setCustomerRole("USER");
            customerRepository.save(c);
            response.setStatus(200);
            return "Customer registered successfully";
        } catch (Exception e) {
            response.setStatus(500);
            System.out.println(e.getMessage());
            return "Customer registration failed";
        }
    }

    @PostMapping(value = "/customer/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> loginCustomer(@RequestBody JwtRequest request, HttpServletResponse response)
            throws Exception {
        System.out.println("Customer login request received");

        authenticate(request.getUsername(), request.getPassword());

        final UserDetails userDetails = customerService
                .loadUserByUsername(request.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @GetMapping("/customer/isAuth")
    public String isAuth(HttpServletResponse response, HttpServletRequest request) {
        System.out.println("Customer isauth request received");
        try {
            String username = jwtTokenUtil.getUsernameFromToken(request.getHeader("Authorization").substring(7));
            System.out.println(username);
            response.setStatus(200);
        } catch (Exception e) {
            response.setStatus(500);
            System.out.println(e.getMessage());
        }
        return "";
    }

    @GetMapping("/customer/getProfile")
    public User getProfile(HttpServletResponse response, HttpServletRequest request) {
        System.out.println("Customer getProfile request received");
        try {
            String username = jwtTokenUtil.getUsernameFromToken(request.getHeader("Authorization").substring(7));
            System.out.println(username);
            User customer = customerRepository.findByEmail(username);
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
     * 
     * @param username
     * @param password
     * @throws Exception
     */
    private void authenticate(String username, String password) throws Exception {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    }
}
