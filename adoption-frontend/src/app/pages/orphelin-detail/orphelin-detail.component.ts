import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { OrphelinService } from '../../services/orphelin.service';
import { DocumentOrphelinService } from '../../services/document-orphelin.service';
import { DocumentOrphelin } from '../../models/document-orphelin.model';

@Component({
  selector: 'app-orphelin-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orphelin-detail.component.html',
  styleUrl: './orphelin-detail.component.css'
})
export class OrphelinDetailComponent implements OnInit {

  orphelinId!: number;
  orphelin: any = null;
  documents: DocumentOrphelin[] = [];
  chargement = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orphelinService: OrphelinService,
    private documentService: DocumentOrphelinService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.orphelinId = +id;
      this.chargerOrphelin();
      this.chargerDocuments();
    }
  }

  chargerOrphelin() {
    this.orphelinService.getOrphelinById(this.orphelinId).subscribe({
      next: (o) => {
        this.orphelin = o;
        this.chargement = false;
      },
      error: () => this.chargement = false
    });
  }

  chargerDocuments() {
    this.documentService.listerParOrphelin(this.orphelinId).subscribe({
      next: (docs) => this.documents = docs
    });
  }

  getInitiales(): string {
    if (!this.orphelin) return '?';
    const p = (this.orphelin.prenom || '').charAt(0).toUpperCase();
    const n = (this.orphelin.nom || '').charAt(0).toUpperCase();
    return (n + p) || '?';
  }

  getAvatarClass(): string {
    return this.orphelin?.sexe === 'Féminin' ? 'av-f' : 'av-m';
  }

  getStatutLabel(statut: string): string {
    switch (statut) {
      case 'DISPONIBLE': return 'Disponible';
      case 'EN_COURS': return 'En cours';
      case 'ADOPTE': return 'Adopté';
      default: return statut;
    }
  }

  getStatutClass(): string {
    switch (this.orphelin?.statut) {
      case 'DISPONIBLE': return 'st-dispo';
      case 'EN_COURS': return 'st-cours';
      case 'ADOPTE': return 'st-adopte';
      default: return 'st-dispo';
    }
  }

  getLabelType(type: string): string {
    switch (type) {
      case 'ACTE_NAISSANCE': return 'Acte de naissance';
      case 'DECLARATION_ABANDON': return 'Déclaration d\'abandon';
      case 'ORDONNANCE_PLACEMENT': return 'Ordonnance de placement';
      default: return 'Autre document';
    }
  }

  estImage(format: string): boolean {
    return ['jpg', 'jpeg', 'png'].includes((format || '').toLowerCase());
  }

  estPdf(format: string): boolean {
    return (format || '').toLowerCase() === 'pdf';
  }

  iconeFichier(format: string): string {
    const f = (format || '').toLowerCase();
    if (f === 'pdf') return 'ti ti-file-type-pdf';
    if (['jpg', 'jpeg', 'png'].includes(f)) return 'ti ti-photo';
    if (['doc', 'docx'].includes(f)) return 'ti ti-file-type-doc';
    return 'ti ti-file';
  }

  classeIcone(format: string): string {
    const f = (format || '').toLowerCase();
    if (f === 'pdf') return 'pdf';
    if (['jpg', 'jpeg', 'png'].includes(f)) return 'img';
    if (['doc', 'docx'].includes(f)) return 'word';
    return 'pdf';
  }

  formaterTaille(octets: number): string {
    if (!octets) return '';
    if (octets < 1024) return octets + ' o';
    if (octets < 1048576) return Math.round(octets / 1024) + ' Ko';
    return Math.round(octets / 1048576) + ' Mo';
  }

  urlDocument(id: number): string {
    return this.documentService.getUrlTelechargement(id);
  }

  telecharger(doc: DocumentOrphelin) {
    this.documentService.telechargerFichier(doc.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = doc.nomFichier;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => alert('Erreur lors du téléchargement')
    });
  }

  ouvrirDocument(doc: DocumentOrphelin) {
    this.documentService.telechargerFichier(doc.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      },
      error: () => alert('Erreur lors de l\'ouverture')
    });
  }

  modifier() {
    this.router.navigate(['/orphelins/modifier', this.orphelinId]);
  }
voirDetail(id: number): void {
    this.router.navigate(['/orphelins/detail', id]);
  }
  retour() {
    this.router.navigate(['/orphelins']);
  }
}