package com.backend.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import com.backend.entity.Application;

public interface ApplicationRepository extends JpaRepository<Application, String> {
    Optional<Application> findById(String id);

    List<Application> findAllById(Iterable<String> ids);

    Application findByPersonId(String personId);

    @Modifying
    @Query("UPDATE Application a SET a.status = ?1 WHERE a.id = ?2")
    public void updateStatusById(String status, String id);
}