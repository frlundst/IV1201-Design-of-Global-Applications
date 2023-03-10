package com.backend.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import com.backend.entity.Application;

public interface ApplicationRepository extends JpaRepository<Application, String> {
    /**
     * Find application by id.
     */
    Optional<Application> findById(String id);

    /**
     * Find all applications by id.
     */
    List<Application> findAllById(Iterable<String> ids);

    /**
     * Find application by person id.
     * @param personId
     * @return
     */
    Application findByPersonId(String personId);

    @Modifying
    @Query("UPDATE Application a SET a.status = ?1 WHERE a.id = ?2")
    /**
     * Update status by id.
     * @param status
     * @param id
     */
    public void updateStatusById(String status, String id);
}