package com.adoption.adoption_backend.repository;

import com.adoption.adoption_backend.entity.Utilisateur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {

    Optional<Utilisateur> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("SELECT u FROM Utilisateur u WHERE " +
            "(:search IS NULL OR LOWER(u.nom) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(u.prenom) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "AND (:roleId IS NULL OR u.role.id = :roleId) " +
            "AND u.role.nom != 'PRESIDENT'")
    Page<Utilisateur> findAllFiltered(@Param("search") String search,
                                      @Param("roleId") Long roleId,
                                      Pageable pageable);

    int countByRoleId(Long roleId);
}