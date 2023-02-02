package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    public User save(User user);
    public User findByEmail(String email);
}
