package com.adoption.adoption_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "orphelins")
@Data
public class Orphelin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_dossier", nullable = false, unique = true, length = 50)
    private String numeroDossier;

    @Column(nullable = false, length = 100)
    private String nom;

    @Column(nullable = false, length = 100)
    private String prenom;

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false, length = 20)
    private String sexe;

    @Column(name = "situation_familiale", nullable = false, length = 50)
    private String situationFamiliale;

    @Column(name = "etat_sante", columnDefinition = "TEXT")
    private String etatSante;

    @Column(name = "niveau_scolarisation", nullable = false, length = 50)
    private String niveauScolarisation;

    @Column(name = "region_origine", nullable = false, length = 50)
    private String regionOrigine;

    @Column(name = "ville_origine", length = 100)
    private String villeOrigine;

    @Column(name = "structure_accueil", length = 150)
    private String structureAccueil;

    @Column(name = "date_enregistrement", nullable = false)
    private LocalDate dateEnregistrement;

    @Column(nullable = false, length = 50)
    private String statut;

    @Column(nullable = false)
    private Boolean actif = true;
}
