package com.backend.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.backend.entity.Application;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, String> {
    List<Application> findByCategoryId(String id);

    Optional<Application> findById(String id);

    List<Application> findAllById(Iterable<String> ids);

    List<Application> findByNameContaining(String name);

    @Modifying
    @Query("INSERT INTO Application (SQL CODE HERE AMOGUS)")
    void saveWithCategory(String name, String description, int YearsofExp);

    @Modifying
    @Query("UPDATE Application ")
    void addSale(double discount, String name);
}