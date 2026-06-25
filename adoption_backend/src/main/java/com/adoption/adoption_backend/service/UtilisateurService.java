package com.adoption.adoption_backend.service;

import com.adoption.adoption_backend.dto.UtilisateurRequestDTO;
import com.adoption.adoption_backend.dto.UtilisateurResponseDTO;
import com.adoption.adoption_backend.entity.Role;
import com.adoption.adoption_backend.entity.Utilisateur;
import com.adoption.adoption_backend.repository.RoleRepository;
import com.adoption.adoption_backend.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UtilisateurResponseDTO creerUtilisateur(UtilisateurRequestDTO dto) {
        if (utilisateurRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Un utilisateur avec cet email existe déjà");
        }
        Role role = roleRepository.findById(dto.getRoleId())
                .orElseThrow(() -> new RuntimeException("Rôle introuvable"));
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setNom(dto.getNom());
        utilisateur.setPrenom(dto.getPrenom());
        utilisateur.setEmail(dto.getEmail());
        utilisateur.setMotDePasse(passwordEncoder.encode(dto.getMotDePasse()));
        utilisateur.setTelephone(dto.getTelephone());
        utilisateur.setRole(role);
        Utilisateur sauvegarde = utilisateurRepository.save(utilisateur);
        return convertirEnDTO(sauvegarde);
    }

    public List<UtilisateurResponseDTO> listerUtilisateurs() {
        return utilisateurRepository.findAll()
                .stream()
                .map(this::convertirEnDTO)
                .collect(Collectors.toList());
    }

    public UtilisateurResponseDTO trouverParId(Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        return convertirEnDTO(utilisateur);
    }

    public UtilisateurResponseDTO modifierUtilisateur(Long id, UtilisateurRequestDTO dto) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        utilisateur.setNom(dto.getNom());
        utilisateur.setPrenom(dto.getPrenom());
        utilisateur.setEmail(dto.getEmail());
        utilisateur.setTelephone(dto.getTelephone());

        if (dto.getRoleId() != null && dto.getRoleId() > 0) {
            Role role = roleRepository.findById(dto.getRoleId())
                    .orElseThrow(() -> new RuntimeException("Rôle introuvable"));
            utilisateur.setRole(role);
        }

        if (dto.getMotDePasse() != null && !dto.getMotDePasse().isEmpty()) {
            utilisateur.setMotDePasse(passwordEncoder.encode(dto.getMotDePasse()));
        }

        Utilisateur sauvegarde = utilisateurRepository.save(utilisateur);
        return convertirEnDTO(sauvegarde);
    }

    public UtilisateurResponseDTO toggleActif(Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        utilisateur.setActif(!utilisateur.getActif());
        Utilisateur sauvegarde = utilisateurRepository.save(utilisateur);
        return convertirEnDTO(sauvegarde);
    }

    private UtilisateurResponseDTO convertirEnDTO(Utilisateur u) {
        UtilisateurResponseDTO dto = new UtilisateurResponseDTO();
        dto.setId(u.getId());
        dto.setNom(u.getNom());
        dto.setPrenom(u.getPrenom());
        dto.setEmail(u.getEmail());
        dto.setTelephone(u.getTelephone());
        dto.setActif(u.getActif());
        dto.setRoleNom(u.getRole().getNom());
        dto.setDateCreation(u.getDateCreation());
        return dto;
    }
    public void supprimerUtilisateur(Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        utilisateurRepository.delete(utilisateur);
    }
}