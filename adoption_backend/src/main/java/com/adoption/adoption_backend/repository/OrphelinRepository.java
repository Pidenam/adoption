package com.adoption.adoption_backend.repository;

import com.adoption.adoption_backend.entity.Orphelin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrphelinRepository extends JpaRepository<Orphelin, Long> {
    List<Orphelin> findAllByOrderByDateEnregistrementDesc();
    long countByActifTrue();
}