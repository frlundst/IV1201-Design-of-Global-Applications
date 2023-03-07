package com.backend.security.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.backend.service.PersonService;

import lombok.AllArgsConstructor;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class WebSecurityConfig {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private PersonService customerService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customerService).passwordEncoder(passwordEncoder);
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .authorizeHttpRequests()
                .requestMatchers(
                        "/api/person/**",
                        "/api/person/login",
                        "/api/person/register",
                        "/api/create/competenceProfile",
                        "/api/competences") // THIS IS THE NEW API CALL OK? // THIS IS NOT FINISHED. NEXT STEP IS TO CREATE A NEW Competence PRofile OK?.

                .permitAll()
                .requestMatchers(
                        "/api/allPersons",
                        "api/allApplications",
                        "api/updateApplicationStatus")
                .hasAuthority("ADMIN")
                .anyRequest()
                .authenticated()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .httpBasic();

        http.cors();

        return http.build();
    }
}
