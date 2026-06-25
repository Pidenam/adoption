package com.adoption.adoption_backend.service;

import com.adoption.adoption_backend.entity.DocumentOrphelin;
import com.adoption.adoption_backend.repository.DocumentOrphelinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class DocumentOrphelinService {

    @Autowired
    private DocumentOrphelinRepository documentRepository;

    @Value("${fichiers.dossier}")
    private String dossierStockage;

    private static final List<String> FORMATS_AUTORISES = Arrays.asList(
            "pdf", "jpg", "jpeg", "png", "doc", "docx"
    );

    public DocumentOrphelin enregistrerDocument(Long orphelinId, String typeDocument, MultipartFile fichier) {
        if (fichier.isEmpty()) {
            throw new RuntimeException("Le fichier est vide");
        }

        String nomOriginal = fichier.getOriginalFilename();
        String extension = "";
        if (nomOriginal != null && nomOriginal.contains(".")) {
            extension = nomOriginal.substring(nomOriginal.lastIndexOf(".") + 1).toLowerCase();
        }

        if (!FORMATS_AUTORISES.contains(extension)) {
            throw new RuntimeException("Format non autorise : " + extension);
        }

        try {
            Path dossier = Paths.get(dossierStockage);
            if (!Files.exists(dossier)) {
                Files.createDirectories(dossier);
            }

            String nomUnique = UUID.randomUUID().toString() + "." + extension;
            Path cheminComplet = dossier.resolve(nomUnique);
            Files.copy(fichier.getInputStream(), cheminComplet);

            DocumentOrphelin doc = new DocumentOrphelin();
            doc.setOrphelinId(orphelinId);
            doc.setTypeDocument(typeDocument);
            doc.setNomFichier(nomOriginal);
            doc.setChemin(cheminComplet.toString());
            doc.setTaille(fichier.getSize());
            doc.setFormat(extension);

            return documentRepository.save(doc);
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de l'enregistrement du fichier : " + e.getMessage());
        }
    }

    public List<DocumentOrphelin> listerParOrphelin(Long orphelinId) {
        return documentRepository.findByOrphelinId(orphelinId);
    }

    public DocumentOrphelin trouverParId(Long id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document introuvable"));
    }
}