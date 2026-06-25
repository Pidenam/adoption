import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Orphelin } from '../../models/orphelin.model';
import { OrphelinService } from '../../services/orphelin.service';

@Component({
  selector: 'app-orphelins',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orphelins.component.html',
  styleUrls: ['./orphelins.component.css']
})
export class OrphelinsComponent implements OnInit {

  orphelins: Orphelin[] = [];
  orphelinsFiltres: Orphelin[] = [];
  orphelinsPage: Orphelin[] = [];
  chargement = false;

  recherche = '';
  filtreStatut = '';
  filtreSexe = '';
  filtreActivite = '';

  pageActuelle = 1;
  parPage = 10;

  menuOuvert: number | null = null;

  modalOuvert = false;
  orphelinASupprimer: Orphelin | null = null;

  constructor(
    private orphelinService: OrphelinService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerOrphelins();
  }

  chargerOrphelins(): void {
    this.chargement = true;
    this.orphelinService.getOrphelins().subscribe({
      next: (data) => {
        this.orphelins = data;
        this.appliquerFiltres();
        this.chargement = false;
      },
      error: () => { this.chargement = false; }
    });
  }

  appliquerFiltres(): void {
    let liste = [...this.orphelins];
    const r = this.recherche.toLowerCase().trim();
    if (r) {
      liste = liste.filter(o =>
        o.nom.toLowerCase().includes(r) ||
        o.prenom.toLowerCase().includes(r) ||
        o.numeroDossier.toLowerCase().includes(r)
      );
    }
    if (this.filtreStatut) {
      liste = liste.filter(o => o.statut === this.filtreStatut);
    }
    if (this.filtreSexe) {
      liste = liste.filter(o => o.sexe === this.filtreSexe);
    }
    if (this.filtreActivite === 'actif') {
      liste = liste.filter(o => o.actif);
    } else if (this.filtreActivite === 'inactif') {
      liste = liste.filter(o => !o.actif);
    }
    this.orphelinsFiltres = liste;
    this.pageActuelle = 1;
    this.decouperPage();
  }

  decouperPage(): void {
    const debut = (this.pageActuelle - 1) * this.parPage;
    const fin = debut + this.parPage;
    this.orphelinsPage = this.orphelinsFiltres.slice(debut, fin);
  }

  get pages(): number[] {
    const total = Math.ceil(this.orphelinsFiltres.length / this.parPage);
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  get debutAffichage(): number {
    if (this.orphelinsFiltres.length === 0) return 0;
    return (this.pageActuelle - 1) * this.parPage + 1;
  }

  get finAffichage(): number {
    return Math.min(this.pageActuelle * this.parPage, this.orphelinsFiltres.length);
  }

  changerPage(p: number): void {
    if (p < 1 || p > this.pages.length) return;
    this.pageActuelle = p;
    this.decouperPage();
  }

  get totalDisponibles(): number {
    return this.orphelins.filter(o => o.statut === 'DISPONIBLE').length;
  }

  get totalEnCours(): number {
    return this.orphelins.filter(o => o.statut === 'EN_COURS').length;
  }

  get totalAdoptes(): number {
    return this.orphelins.filter(o => o.statut === 'ADOPTE').length;
  }

  getInitiales(o: Orphelin): string {
    return ((o.prenom?.charAt(0) || '') + (o.nom?.charAt(0) || '')).toUpperCase();
  }

  getStatutLabel(statut: string): string {
    switch (statut) {
      case 'DISPONIBLE': return 'Disponible';
      case 'EN_COURS': return 'En cours';
      case 'ADOPTE': return 'Adopté';
      default: return statut;
    }
  }

  getStatutClass(statut: string): string {
    switch (statut) {
      case 'DISPONIBLE': return 'st-dispo';
      case 'EN_COURS': return 'st-cours';
      case 'ADOPTE': return 'st-adopte';
      default: return '';
    }
  }

  getAvatarClass(sexe: string): string {
    return sexe === 'Féminin' ? 'av-f' : 'av-m';
  }
  get totalInactifs(): number {
    return this.orphelins.filter(o => !o.actif).length;
  }

  creerOrphelin(): void {
    this.router.navigate(['/orphelins/nouveau']);
  }

  modifierOrphelin(id: number): void {
    this.router.navigate(['/orphelins/modifier', id]);
  }
voirDetail(id: number): void {
    this.router.navigate(['/orphelins/detail', id]);
  }
  toggleMenu(id: number, event: Event): void {
    event.stopPropagation();
    this.menuOuvert = this.menuOuvert === id ? null : id;
  }

  fermerMenus(): void {
    this.menuOuvert = null;
  }

  ouvrirModalSuppression(o: Orphelin, event: Event): void {
    event.stopPropagation();
    this.orphelinASupprimer = o;
    this.modalOuvert = true;
    this.menuOuvert = null;
  }

  fermerModal(): void {
    this.modalOuvert = false;
    this.orphelinASupprimer = null;
  }

  confirmerToggle(): void {
    if (!this.orphelinASupprimer) return;
    this.orphelinService.toggleActif(this.orphelinASupprimer.id).subscribe({
      next: () => {
        this.fermerModal();
        this.chargerOrphelins();
      }
    });
  }
}