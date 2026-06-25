package com.adoption.adoption_backend.repository;

import com.adoption.adoption_backend.entity.Adoptant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AdoptantRepository extends JpaRepository<Adoptant, Long> {

    Optional<Adoptant> findByEmail(String email);

    boolean existsByEmail(String email);
}