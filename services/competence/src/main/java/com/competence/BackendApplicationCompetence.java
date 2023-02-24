package com.competence;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
@ComponentScan(basePackages = {"com.competence"})
@EntityScan("com.competence")
public class BackendApplicationCompetence extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplicationCompetence.class, args);
	}
}
