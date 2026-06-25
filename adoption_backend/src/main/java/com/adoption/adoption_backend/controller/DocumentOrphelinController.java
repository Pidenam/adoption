package com.adoption.adoption_backend.controller;

import com.adoption.adoption_backend.entity.DocumentOrphelin;
import com.adoption.adoption_backend.service.DocumentOrphelinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/documents-orphelin")
@CrossOrigin(origins = "http://localhost:4200")
public class DocumentOrphelinController {

    @Autowired
    private DocumentOrphelinService documentService;

    @PostMapping("/upload")
    @PreAuthorize("hasAuthority('CREER_DOSSIER') or hasAuthority('ALL_PERMISSIONS')")
    public ResponseEntity<DocumentOrphelin> upload(
            @RequestParam("orphelinId") Long orphelinId,
            @RequestParam("typeDocument") String typeDocument,
            @RequestParam("fichier") MultipartFile fichier) {
        return ResponseEntity.ok(documentService.enregistrerDocument(orphelinId, typeDocument, fichier));
    }

    @GetMapping("/orphelin/{orphelinId}")
    public ResponseEntity<List<DocumentOrphelin>> listerParOrphelin(@PathVariable Long orphelinId) {
        return ResponseEntity.ok(documentService.listerParOrphelin(orphelinId));
    }

    @GetMapping("/telecharger/{id}")
    public ResponseEntity<Resource> telecharger(@PathVariable Long id) {
        try {
            DocumentOrphelin doc = documentService.trouverParId(id);
            Path chemin = Paths.get(doc.getChemin());
            Resource resource = new UrlResource(chemin.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + doc.getNomFichier() + "\"")
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}