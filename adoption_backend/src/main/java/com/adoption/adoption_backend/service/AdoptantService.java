package com.adoption.adoption_backend.service;

import com.adoption.adoption_backend.dto.AdoptantRequestDTO;
import com.adoption.adoption_backend.dto.AdoptantResponseDTO;
import com.adoption.adoption_backend.entity.Adoptant;
import com.adoption.adoption_backend.repository.AdoptantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdoptantService {

    @Autowired
    private AdoptantRepository adoptantRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AdoptantResponseDTO inscrire(AdoptantRequestDTO dto) {

        if (adoptantRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Cet email est déjà utilisé");
        }

        Adoptant adoptant = new Adoptant();
        adoptant.setNom(dto.getNom());
        adoptant.setPrenom(dto.getPrenom());
        adoptant.setEmail(dto.getEmail());
        adoptant.setMotDePasse(passwordEncoder.encode(dto.getMotDePasse()));
        adoptant.setTelephone(dto.getTelephone());
        adoptant.setAdresse(dto.getAdresse());
        adoptant.setSituationMatrimoniale(dto.getSituationMatrimoniale());

        Adoptant sauvegarde = adoptantRepository.save(adoptant);

        return convertirEnDTO(sauvegarde);
    }

    public List<AdoptantResponseDTO> listerAdoptants() {
        return adoptantRepository.findAll()
                .stream()
                .map(this::convertirEnDTO)
                .collect(Collectors.toList());
    }

    public AdoptantResponseDTO trouverParId(Long id) {
        Adoptant adoptant = adoptantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Adoptant introuvable"));
        return convertirEnDTO(adoptant);
    }

    private AdoptantResponseDTO convertirEnDTO(Adoptant a) {
        AdoptantResponseDTO dto = new AdoptantResponseDTO();
        dto.setId(a.getId());
        dto.setNom(a.getNom());
        dto.setPrenom(a.getPrenom());
        dto.setEmail(a.getEmail());
        dto.setTelephone(a.getTelephone());
        dto.setAdresse(a.getAdresse());
        dto.setSituationMatrimoniale(a.getSituationMatrimoniale());
        dto.setActif(a.getActif());
        dto.setDateInscription(a.getDateInscription());
        return dto;
    }
}