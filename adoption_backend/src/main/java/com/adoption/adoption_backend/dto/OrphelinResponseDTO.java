package com.adoption.adoption_backend.dto;

import java.time.LocalDate;

public class OrphelinResponseDTO {

    private Long id;
    private String numeroDossier;
    private String nom;
    private String prenom;
    private Integer age;
    private String sexe;
    private String situationFamiliale;
    private String etatSante;
    private String niveauScolarisation;
    private String regionOrigine;
    private String villeOrigine;
    private String structureAccueil;
    private LocalDate dateEnregistrement;
    private String statut;
    private Boolean actif;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNumeroDossier() { return numeroDossier; }
    public void setNumeroDossier(String numeroDossier) { this.numeroDossier = numeroDossier; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getSexe() { return sexe; }
    public void setSexe(String sexe) { this.sexe = sexe; }

    public String getSituationFamiliale() { return situationFamiliale; }
    public void setSituationFamiliale(String situationFamiliale) { this.situationFamiliale = situationFamiliale; }

    public String getEtatSante() { return etatSante; }
    public void setEtatSante(String etatSante) { this.etatSante = etatSante; }

    public String getNiveauScolarisation() { return niveauScolarisation; }
    public void setNiveauScolarisation(String niveauScolarisation) { this.niveauScolarisation = niveauScolarisation; }

    public String getRegionOrigine() { return regionOrigine; }
    public void setRegionOrigine(String regionOrigine) { this.regionOrigine = regionOrigine; }

    public String getVilleOrigine() { return villeOrigine; }
    public void setVilleOrigine(String villeOrigine) { this.villeOrigine = villeOrigine; }

    public String getStructureAccueil() { return structureAccueil; }
    public void setStructureAccueil(String structureAccueil) { this.structureAccueil = structureAccueil; }

    public LocalDate getDateEnregistrement() { return dateEnregistrement; }
    public void setDateEnregistrement(LocalDate dateEnregistrement) { this.dateEnregistrement = dateEnregistrement; }

    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }

    public Boolean getActif() { return actif; }
    public void setActif(Boolean actif) { this.actif = actif; }
}