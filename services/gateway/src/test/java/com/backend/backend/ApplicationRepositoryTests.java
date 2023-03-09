package com.backend.backend;

import static org.assertj.core.api.Assertions.assertThat;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;
import com.backend.entity.Application;
import com.backend.repository.ApplicationRepository;

@DataJpaTest
@SpringBootTest
class ApplicationRepositoryTests {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Test
    void testUpdateStatusById() {
        // given
        Application application = new Application();
        application.setId("1");
        application.setStatus("Pending");
        applicationRepository.save(application);

        // when
        applicationRepository.updateStatusById("Approved", "1");
        Application updatedApplication = applicationRepository.findById("1").orElse(null);

        // then
        assertThat(updatedApplication).isNull();
        assertThat(updatedApplication.getStatus()).isEqualTo("Approved");
    }
}