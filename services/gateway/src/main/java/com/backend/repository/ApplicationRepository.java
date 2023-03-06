package com.backend.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.backend.entity.Application;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, String> {
    Optional<Application> findById(String id);

    List<Application> findAllById(Iterable<String> ids);

    public Application save(Application application);
}