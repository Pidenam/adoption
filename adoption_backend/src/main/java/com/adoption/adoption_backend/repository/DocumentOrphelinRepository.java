package com.adoption.adoption_backend.repository;

import com.adoption.adoption_backend.entity.DocumentOrphelin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DocumentOrphelinRepository extends JpaRepository<DocumentOrphelin, Long> {
    List<DocumentOrphelin> findByOrphelinId(Long orphelinId);
}