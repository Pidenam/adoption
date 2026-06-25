package com.adoption.adoption_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "documents_orphelin")
public class DocumentOrphelin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "orphelin_id", nullable = false)
    private Long orphelinId;

    @Column(name = "type_document", nullable = false, length = 50)
    private String typeDocument;

    @Column(name = "nom_fichier", nullable = false, length = 255)
    private String nomFichier;

    @Column(nullable = false, length = 500)
    private String chemin;

    @Column
    private Long taille;

    @Column(length = 50)
    private String format;

    @Column(name = "date_upload")
    private LocalDateTime dateUpload = LocalDateTime.now();

    public DocumentOrphelin() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getOrphelinId() { return orphelinId; }
    public void setOrphelinId(Long orphelinId) { this.orphelinId = orphelinId; }

    public String getTypeDocument() { return typeDocument; }
    public void setTypeDocument(String typeDocument) { this.typeDocument = typeDocument; }

    public String getNomFichier() { return nomFichier; }
    public void setNomFichier(String nomFichier) { this.nomFichier = nomFichier; }

    public String getChemin() { return chemin; }
    public void setChemin(String chemin) { this.chemin = chemin; }

    public Long getTaille() { return taille; }
    public void setTaille(Long taille) { this.taille = taille; }

    public String getFormat() { return format; }
    public void setFormat(String format) { this.format = format; }

    public LocalDateTime getDateUpload() { return dateUpload; }
    public void setDateUpload(LocalDateTime dateUpload) { this.dateUpload = dateUpload; }
}