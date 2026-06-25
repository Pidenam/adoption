package com.adoption.adoption_backend.controller;

import com.adoption.adoption_backend.entity.Adoptant;
import com.adoption.adoption_backend.entity.Utilisateur;
import com.adoption.adoption_backend.repository.AdoptantRepository;
import com.adoption.adoption_backend.repository.UtilisateurRepository;
import com.adoption.adoption_backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private AdoptantRepository adoptantRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;
    @PostMapping("/login")
    public ResponseEntity<?> loginStaff(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String motDePasse = body.get("motDePasse");
        Optional<Utilisateur> optUser = utilisateurRepository.findByEmail(email);

        if (optUser.isEmpty()) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "Email ou mot de passe incorrect"));
        }

        Utilisateur user = optUser.get();
        if (!passwordEncoder.matches(motDePasse, user.getMotDePasse())) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "Email ou mot de passe incorrect"));
        }
        if (!user.getActif()) {
            return ResponseEntity.status(403)
                    .body(Map.of("message", "Compte désactivé"));
        }
        List<String> permissions = user.getRole().getPermissions()
                .stream()
                .map(p -> p.getCode())
                .collect(Collectors.toList());
        String token = jwtUtil.genererToken(email, user.getRole().getNom(), permissions);


        return ResponseEntity.ok(Map.of(
                "token", token,
                "email", user.getEmail(),
                "nom", user.getNom(),
                "prenom", user.getPrenom(),
                "role", user.getRole().getNom()
        ));
    }

    @PostMapping("/login-adoptant")
    public ResponseEntity<?> loginAdoptant(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String motDePasse = body.get("motDePasse");

        Optional<Adoptant> optAdoptant = adoptantRepository.findByEmail(email);

        if (optAdoptant.isEmpty()) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "Email ou mot de passe incorrect"));
        }

        Adoptant adoptant = optAdoptant.get();

        if (!passwordEncoder.matches(motDePasse, adoptant.getMotDePasse())) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "Email ou mot de passe incorrect"));
        }

        if (!adoptant.getActif()) {
            return ResponseEntity.status(403)
                    .body(Map.of("message", "Compte désactivé"));
        }

        String token = jwtUtil.genererToken(email, "ADOPTANT", List.of());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "email", adoptant.getEmail(),
                "nom", adoptant.getNom(),
                "prenom", adoptant.getPrenom(),
                "role", "ADOPTANT"
        ));
    }
    @GetMapping("/hash")
    public ResponseEntity<?> genererHash(@RequestParam String password) {
        return ResponseEntity.ok(Map.of("hash", passwordEncoder.encode(password)));
    }
}