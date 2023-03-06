package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.entity.Availability;

@Repository
public interface AvailabilityRepository extends JpaRepository<Availability, String> {
    public Availability save(Availability availability);
}
