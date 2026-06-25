package com.adoption.adoption_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class OrphelinRequestDTO {

    @NotBlank(message = "Le nom est obligatoire")
    private String nom;

    @NotBlank(message = "Le prénom est obligatoire")
    private String prenom;

    @NotNull(message = "L'âge est obligatoire")
    private Integer age;

    @NotBlank(message = "Le sexe est obligatoire")
    private String sexe;

    @NotBlank(message = "La situation familiale est obligatoire")
    private String situationFamiliale;

    private String etatSante;

    @NotBlank(message = "Le niveau de scolarisation est obligatoire")
    private String niveauScolarisation;

    @NotBlank(message = "La région d'origine est obligatoire")
    private String regionOrigine;

    private String villeOrigine;

    private String structureAccueil;

    private String statut;

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

    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }
}