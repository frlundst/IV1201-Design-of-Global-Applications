package com.backend.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.backend.entity.User;
import com.backend.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CustomerService implements UserDetailsService {
    private final UserRepository customerRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User c = customerRepository.findByEmail(email);

        if (c == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return c;
    }
}
