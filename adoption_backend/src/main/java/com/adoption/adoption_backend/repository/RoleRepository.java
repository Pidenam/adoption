package com.adoption.adoption_backend.repository;

import com.adoption.adoption_backend.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByNom(String nom);
    List<Role> findAllByOrderByNomAsc();
    boolean existsByNom(String nom);
}