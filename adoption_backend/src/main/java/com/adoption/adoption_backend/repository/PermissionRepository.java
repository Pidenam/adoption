package com.adoption.adoption_backend.repository;

import com.adoption.adoption_backend.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface PermissionRepository extends JpaRepository<Permission, Long> {

    @Query("SELECT p FROM Permission p ORDER BY p.module ASC, p.code ASC")
    List<Permission> findAllOrderedByModuleAndCode();
}