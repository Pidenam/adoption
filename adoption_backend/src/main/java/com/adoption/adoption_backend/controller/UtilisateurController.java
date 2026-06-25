package com.adoption.adoption_backend.controller;

import com.adoption.adoption_backend.dto.UtilisateurRequestDTO;
import com.adoption.adoption_backend.dto.UtilisateurResponseDTO;
import com.adoption.adoption_backend.service.UtilisateurService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/utilisateurs")
@CrossOrigin(origins = "http://localhost:4200")

public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;
    @GetMapping
    public ResponseEntity<List<UtilisateurResponseDTO>> listerUtilisateurs() {
        List<UtilisateurResponseDTO> liste = utilisateurService.listerUtilisateurs();
        return ResponseEntity.ok(liste);
    }
    @GetMapping("/{id}")
    public ResponseEntity<UtilisateurResponseDTO> trouverParId(@PathVariable Long id) {
        UtilisateurResponseDTO dto = utilisateurService.trouverParId(id);
        return ResponseEntity.ok(dto);
    }
    @PostMapping
    public ResponseEntity<UtilisateurResponseDTO> creerUtilisateur(
            @Valid @RequestBody UtilisateurRequestDTO dto) {
        UtilisateurResponseDTO reponse = utilisateurService.creerUtilisateur(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(reponse);
    }
    @PutMapping("/{id}")
    public ResponseEntity<UtilisateurResponseDTO> modifierUtilisateur(
            @PathVariable Long id,
            @Valid @RequestBody UtilisateurRequestDTO dto) {
        UtilisateurResponseDTO reponse = utilisateurService.modifierUtilisateur(id, dto);
        return ResponseEntity.ok(reponse);
    }
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<UtilisateurResponseDTO> toggleActif(@PathVariable Long id) {
        UtilisateurResponseDTO reponse = utilisateurService.toggleActif(id);
        return ResponseEntity.ok(reponse);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerUtilisateur(@PathVariable Long id) {
        utilisateurService.supprimerUtilisateur(id);
        return ResponseEntity.noContent().build();
    }
}