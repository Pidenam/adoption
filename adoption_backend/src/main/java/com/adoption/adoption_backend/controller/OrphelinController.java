package com.adoption.adoption_backend.controller;

import com.adoption.adoption_backend.dto.OrphelinRequestDTO;
import com.adoption.adoption_backend.dto.OrphelinResponseDTO;
import com.adoption.adoption_backend.service.OrphelinService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orphelins")
@CrossOrigin(origins = "http://localhost:4200")
public class OrphelinController {

    @Autowired
    private OrphelinService orphelinService;

    @GetMapping
    public ResponseEntity<List<OrphelinResponseDTO>> lister() {
        return ResponseEntity.ok(orphelinService.listerOrphelins());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrphelinResponseDTO> trouver(@PathVariable Long id) {
        return ResponseEntity.ok(orphelinService.trouverParId(id));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('CREER_DOSSIER') or hasAuthority('ALL_PERMISSIONS')")
    public ResponseEntity<OrphelinResponseDTO> creer(@Valid @RequestBody OrphelinRequestDTO dto) {
        return ResponseEntity.ok(orphelinService.creerOrphelin(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('MODIFIER_DOSSIER') or hasAuthority('ALL_PERMISSIONS')")
    public ResponseEntity<OrphelinResponseDTO> modifier(@PathVariable Long id, @Valid @RequestBody OrphelinRequestDTO dto) {
        return ResponseEntity.ok(orphelinService.modifierOrphelin(id, dto));
    }

    @PatchMapping("/{id}/toggle")
    @PreAuthorize("hasAuthority('SUPPRIMER_DOSSIER') or hasAuthority('ALL_PERMISSIONS')")
    public ResponseEntity<OrphelinResponseDTO> toggleActif(@PathVariable Long id) {
        return ResponseEntity.ok(orphelinService.toggleActif(id));
    }
}