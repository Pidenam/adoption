import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OrphelinService } from '../../services/orphelin.service';
import { OrphelinRequest } from '../../models/orphelin.model';
import { DocumentOrphelinService } from '../../services/document-orphelin.service';

@Component({
  selector: 'app-orphelin-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orphelin-form.component.html',
  styleUrl: './orphelin-form.component.css'
})
export class OrphelinFormComponent implements OnInit {

  mode: string = 'creation';
  orphelinId: number | null = null;
  numeroDossier = '';
  fichierActeNaissance: File | null = null;
  fichierDeclarationAbandon: File | null = null;
  fichierOrdonnancePlacement: File | null = null;
  documentsLibres: File[] = [];
  uploadEnCours = false;

  form: OrphelinRequest = {
    nom: '', prenom: '', age: null, sexe: '',
    situationFamiliale: '', etatSante: '', niveauScolarisation: '',
    regionOrigine: '', villeOrigine: '', structureAccueil: '', statut: ''
  };

  regions = ['Maritime', 'Plateaux', 'Centrale', 'Kara', 'Savanes'];
  chargement = false;
  erreur = '';
  succes = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orphelinService: OrphelinService,
    private documentService: DocumentOrphelinService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mode = 'edition';
      this.orphelinId = +id;
      this.chargerOrphelin(+id);
    }
  }

  chargerOrphelin(id: number) {
    this.orphelinService.getOrphelinById(id).subscribe({
      next: (o) => {
        this.numeroDossier = o.numeroDossier;
        this.form = {
          nom: o.nom,
          prenom: o.prenom,
          age: o.age,
          sexe: o.sexe,
          situationFamiliale: o.situationFamiliale,
          etatSante: o.etatSante || '',
          niveauScolarisation: o.niveauScolarisation,
          regionOrigine: o.regionOrigine,
          villeOrigine: o.villeOrigine || '',
          structureAccueil: o.structureAccueil || '',
          statut: o.statut
        };
      },
      error: (err) => console.error(err)
    });
  }

  getInitiales(): string {
    const p = this.form.prenom.charAt(0).toUpperCase();
    const n = this.form.nom.charAt(0).toUpperCase();
    return (p + n) || '?';
  }

  getAvatarClass(): string {
    return this.form.sexe === 'Féminin' ? 'av-f' : 'av-m';
  }

  getStatutLabel(statut: string): string {
    switch (statut) {
      case 'DISPONIBLE': return 'Disponible';
      case 'EN_COURS': return 'En cours';
      case 'ADOPTE': return 'Adopté';
      default: return 'Disponible';
    }
  }

  getStatutClass(): string {
    switch (this.form.statut) {
      case 'DISPONIBLE': return 'st-dispo';
      case 'EN_COURS': return 'st-cours';
      case 'ADOPTE': return 'st-adopte';
      default: return 'st-dispo';
    }
  }

  onSubmit() {
    if (!this.form.nom || !this.form.prenom || !this.form.age ||
        !this.form.sexe || !this.form.situationFamiliale ||
        !this.form.niveauScolarisation || !this.form.regionOrigine) {
      this.erreur = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.mode === 'creation' && !this.documentsObligatoiresFournis()) {
      this.erreur = 'Les 3 documents obligatoires doivent être fournis.';
      return;
    }

    this.chargement = true;
    this.erreur = '';
    this.succes = '';

    if (this.mode === 'creation') {
      this.uploadEnCours = true;
      this.orphelinService.creerOrphelin(this.form).subscribe({
        next: (orphelinCree: any) => {
          this.envoyerDocuments(orphelinCree.id);
        },
        error: (err) => {
          this.erreur = err.error?.message || 'Erreur lors de la création.';
          this.chargement = false;
          this.uploadEnCours = false;
        }
      });
    } else {
      this.orphelinService.modifierOrphelin(this.orphelinId!, this.form).subscribe({
        next: () => {
          this.succes = 'Dossier modifié avec succès !';
          this.chargement = false;
          setTimeout(() => this.router.navigate(['/orphelins']), 1500);
        },
        error: (err) => {
          this.erreur = err.error?.message || 'Erreur lors de la modification.';
          this.chargement = false;
        }
      });
    }
  }

  envoyerDocuments(orphelinId: number): void {
    const uploads = [
      this.documentService.upload(orphelinId, 'ACTE_NAISSANCE', this.fichierActeNaissance!),
      this.documentService.upload(orphelinId, 'DECLARATION_ABANDON', this.fichierDeclarationAbandon!),
      this.documentService.upload(orphelinId, 'ORDONNANCE_PLACEMENT', this.fichierOrdonnancePlacement!)
    ];

    this.documentsLibres.forEach(f => {
      uploads.push(this.documentService.upload(orphelinId, 'AUTRE', f));
    });

    let termines = 0;
    uploads.forEach(obs => {
      obs.subscribe({
        next: () => {
          termines++;
          if (termines === uploads.length) {
            this.succes = 'Dossier créé avec succès !';
            this.uploadEnCours = false;
            this.chargement = false;
            setTimeout(() => this.router.navigate(['/orphelins']), 1500);
          }
        },
        error: () => {
          this.erreur = 'Dossier créé mais erreur lors de l\'envoi d\'un document.';
          this.uploadEnCours = false;
          this.chargement = false;
        }
      });
    });
  }

  annuler() {
    this.router.navigate(['/orphelins']);
  }
  onFichierSelectionne(event: any, type: string): void {
    const fichier = event.target.files[0];
    if (!fichier) return;
    if (type === 'ACTE_NAISSANCE') this.fichierActeNaissance = fichier;
    else if (type === 'DECLARATION_ABANDON') this.fichierDeclarationAbandon = fichier;
    else if (type === 'ORDONNANCE_PLACEMENT') this.fichierOrdonnancePlacement = fichier;
  }

  onDocumentLibreSelectionne(event: any): void {
    const fichier = event.target.files[0];
    if (fichier) this.documentsLibres.push(fichier);
  }

  documentsObligatoiresFournis(): boolean {
    return !!this.fichierActeNaissance
        && !!this.fichierDeclarationAbandon
        && !!this.fichierOrdonnancePlacement;
  }

  formaterTaille(octets: number): string {
    if (octets < 1024) return octets + ' o';
    if (octets < 1048576) return Math.round(octets / 1024) + ' Ko';
    return Math.round(octets / 1048576) + ' Mo';
  }
}