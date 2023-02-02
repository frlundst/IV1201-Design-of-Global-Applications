package com.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
@ComponentScan(basePackages = {"com.backend"})
@EntityScan("com.backend")
public class BackendApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
}
