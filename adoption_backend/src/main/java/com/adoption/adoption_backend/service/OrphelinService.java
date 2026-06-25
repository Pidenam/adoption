package com.adoption.adoption_backend.service;

import com.adoption.adoption_backend.dto.OrphelinRequestDTO;
import com.adoption.adoption_backend.dto.OrphelinResponseDTO;
import com.adoption.adoption_backend.entity.Orphelin;
import com.adoption.adoption_backend.repository.OrphelinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Year;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrphelinService {

    @Autowired
    private OrphelinRepository orphelinRepository;

    public List<OrphelinResponseDTO> listerOrphelins() {
        return orphelinRepository.findAllByOrderByDateEnregistrementDesc()
                .stream()
                .map(this::convertirEnDTO)
                .collect(Collectors.toList());
    }

    public OrphelinResponseDTO trouverParId(Long id) {
        Orphelin orphelin = orphelinRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orphelin introuvable"));
        return convertirEnDTO(orphelin);
    }

    public OrphelinResponseDTO creerOrphelin(OrphelinRequestDTO dto) {
        Orphelin orphelin = new Orphelin();
        orphelin.setNom(dto.getNom());
        orphelin.setPrenom(dto.getPrenom());
        orphelin.setAge(dto.getAge());
        orphelin.setSexe(dto.getSexe());
        orphelin.setSituationFamiliale(dto.getSituationFamiliale());
        orphelin.setEtatSante(dto.getEtatSante());
        orphelin.setNiveauScolarisation(dto.getNiveauScolarisation());
        orphelin.setRegionOrigine(dto.getRegionOrigine());
        orphelin.setVilleOrigine(dto.getVilleOrigine());
        orphelin.setStructureAccueil(dto.getStructureAccueil());
        orphelin.setDateEnregistrement(LocalDate.now());
        orphelin.setStatut("DISPONIBLE");
        orphelin.setActif(true);
        orphelin.setNumeroDossier(genererNumeroDossier());
        Orphelin sauvegarde = orphelinRepository.save(orphelin);
        return convertirEnDTO(sauvegarde);
    }

    public OrphelinResponseDTO modifierOrphelin(Long id, OrphelinRequestDTO dto) {
        Orphelin orphelin = orphelinRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orphelin introuvable"));
        orphelin.setNom(dto.getNom());
        orphelin.setPrenom(dto.getPrenom());
        orphelin.setAge(dto.getAge());
        orphelin.setSexe(dto.getSexe());
        orphelin.setSituationFamiliale(dto.getSituationFamiliale());
        orphelin.setEtatSante(dto.getEtatSante());
        orphelin.setNiveauScolarisation(dto.getNiveauScolarisation());
        orphelin.setRegionOrigine(dto.getRegionOrigine());
        orphelin.setVilleOrigine(dto.getVilleOrigine());
        orphelin.setStructureAccueil(dto.getStructureAccueil());
        if (dto.getStatut() != null && !dto.getStatut().isEmpty()) {
            orphelin.setStatut(dto.getStatut());
        }
        Orphelin sauvegarde = orphelinRepository.save(orphelin);
        return convertirEnDTO(sauvegarde);
    }

    public OrphelinResponseDTO toggleActif(Long id) {
        Orphelin orphelin = orphelinRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orphelin introuvable"));
        orphelin.setActif(!orphelin.getActif());
        Orphelin sauvegarde = orphelinRepository.save(orphelin);
        return convertirEnDTO(sauvegarde);
    }

    private String genererNumeroDossier() {
        int annee = Year.now().getValue();
        long compteur = orphelinRepository.count() + 1;
        return String.format("ORPH-%d-%04d", annee, compteur);
    }

    private OrphelinResponseDTO convertirEnDTO(Orphelin o) {
        OrphelinResponseDTO dto = new OrphelinResponseDTO();
        dto.setId(o.getId());
        dto.setNumeroDossier(o.getNumeroDossier());
        dto.setNom(o.getNom());
        dto.setPrenom(o.getPrenom());
        dto.setAge(o.getAge());
        dto.setSexe(o.getSexe());
        dto.setSituationFamiliale(o.getSituationFamiliale());
        dto.setEtatSante(o.getEtatSante());
        dto.setNiveauScolarisation(o.getNiveauScolarisation());
        dto.setRegionOrigine(o.getRegionOrigine());
        dto.setVilleOrigine(o.getVilleOrigine());
        dto.setStructureAccueil(o.getStructureAccueil());
        dto.setDateEnregistrement(o.getDateEnregistrement());
        dto.setStatut(o.getStatut());
        dto.setActif(o.getActif());
        return dto;
    }
}