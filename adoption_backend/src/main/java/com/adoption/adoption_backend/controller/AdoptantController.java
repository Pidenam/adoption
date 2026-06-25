package com.adoption.adoption_backend.controller;

import com.adoption.adoption_backend.dto.AdoptantRequestDTO;
import com.adoption.adoption_backend.dto.AdoptantResponseDTO;
import com.adoption.adoption_backend.service.AdoptantService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adoptants")
@CrossOrigin(origins = "http://localhost:4200")
public class AdoptantController {

    @Autowired
    private AdoptantService adoptantService;
    @GetMapping
    public ResponseEntity<List<AdoptantResponseDTO>> listerAdoptants() {
        return ResponseEntity.ok(adoptantService.listerAdoptants());
    }
    @GetMapping("/{id}")
    public ResponseEntity<AdoptantResponseDTO> trouverParId(@PathVariable Long id) {
        return ResponseEntity.ok(adoptantService.trouverParId(id));
    }
    @PostMapping("/inscription")
    public ResponseEntity<AdoptantResponseDTO> inscrire(
            @Valid @RequestBody AdoptantRequestDTO dto) {
        AdoptantResponseDTO reponse = adoptantService.inscrire(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(reponse);
    }
}