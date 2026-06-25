
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from '../../services/utilisateur.service';
import { Utilisateur } from '../../models/utilisateur.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.css',
  encapsulation: ViewEncapsulation.None
  // Désactive l'encapsulation CSS → les styles s'appliquent globalement
})
export class UtilisateursComponent implements OnInit {

  utilisateurs: Utilisateur[] = [];
  utilisateursFiltres: Utilisateur[] = [];
  chargement = true;
  recherche = '';
  filtreRole = '';
  filtreStatut = '';

  
  pageActuelle = 1;
  parPage = 10;

  menuOuvert: number | null = null;

  modalOuvert = false;
  utilisateurSelectionne: Utilisateur | null = null;

  modalSuppressionOuvert = false;
  utilisateurASupprimer: Utilisateur | null = null;

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  ngOnInit() { this.chargerUtilisateurs(); }

  chargerUtilisateurs() {
    this.chargement = true;
    this.utilisateurService.listerUtilisateurs().subscribe({
      next: (data: Utilisateur[]) => {
        this.utilisateurs = data;
        this.appliquerFiltres();
        this.chargement = false;
      },
      error: (err: any) => {
        console.error('Erreur :', err);
        this.chargement = false;
      }
    });
  }
  supprimerUtilisateur(id: number) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    this.utilisateurService.supprimerUtilisateur(id).subscribe({
      next: () => this.chargerUtilisateurs(),
      error: (err: any) => console.error(err)
    });
  }
  this.fermerMenus();
}

ouvrirModalSuppression(u: Utilisateur, event: Event) {
  event.stopPropagation();
  event.preventDefault();
  this.menuOuvert = null;
  this.utilisateurASupprimer = { ...u };
  // { ...u } = copie l'objet pour éviter les problèmes de référence
  this.modalSuppressionOuvert = true;
  console.log('Modal suppression:', this.modalSuppressionOuvert, this.utilisateurASupprimer);
  // Ce log va confirmer que la modal s'ouvre
}
fermerModalSuppression() {
  this.modalSuppressionOuvert = false;
  this.utilisateurASupprimer = null;
}

confirmerSuppression() {
  if (!this.utilisateurASupprimer) return;
  this.utilisateurService.supprimerUtilisateur(this.utilisateurASupprimer.id).subscribe({
    next: () => {
      this.chargerUtilisateurs();
      this.fermerModalSuppression();
    },
    error: (err: any) => console.error(err)
  });
}
estPresident(u: Utilisateur): boolean {
  return u.roleNom === 'PRESIDENT';
}
  appliquerFiltres() {
    let liste = [...this.utilisateurs];
    if (this.recherche) {
      const t = this.recherche.toLowerCase();
      liste = liste.filter(u =>
        u.nom.toLowerCase().includes(t) ||
        u.prenom.toLowerCase().includes(t) ||
        u.email.toLowerCase().includes(t) ||
        u.roleNom.toLowerCase().includes(t)
      );
    }
    if (this.filtreRole) {
      liste = liste.filter(u => u.roleNom === this.filtreRole);
    }
    if (this.filtreStatut === 'actif') {
      liste = liste.filter(u => u.actif);
    } else if (this.filtreStatut === 'inactif') {
      liste = liste.filter(u => !u.actif);
    }
    this.utilisateursFiltres = liste;
    this.pageActuelle = 1;
  }

  get totalPages(): number {
    return Math.ceil(this.utilisateursFiltres.length / this.parPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get utilisateursPage(): Utilisateur[] {
    const debut = (this.pageActuelle - 1) * this.parPage;
    return this.utilisateursFiltres.slice(debut, debut + this.parPage);
  }

  get debutAffichage(): number {
    return (this.pageActuelle - 1) * this.parPage + 1;
  }

  get finAffichage(): number {
    return Math.min(this.pageActuelle * this.parPage, this.utilisateursFiltres.length);
  }

  changerPage(p: number) {
    if (p >= 1 && p <= this.totalPages) this.pageActuelle = p;
  }

  get totalActifs(): number { return this.utilisateurs.filter(u => u.actif).length; }
  get totalInactifs(): number { return this.utilisateurs.filter(u => !u.actif).length; }
  get totalPresidents(): number { return this.utilisateurs.filter(u => u.roleNom === 'PRESIDENT').length; }

  toggleMenu(id: number, event: Event) {
    event.stopPropagation();
    this.menuOuvert = this.menuOuvert === id ? null : id;
  }

  fermerMenus() { this.menuOuvert = null; }

 ouvrirModal(u: Utilisateur, event: Event) {
  event.stopPropagation();
  this.utilisateurSelectionne = u;
  this.modalOuvert = true;
  this.menuOuvert = null;
}

  fermerModal() {
    this.modalOuvert = false;
    this.utilisateurSelectionne = null;
  }

  confirmerToggle() {
    if (!this.utilisateurSelectionne) return;
    this.utilisateurService.toggleActif(this.utilisateurSelectionne.id).subscribe({
      next: () => {
        this.chargerUtilisateurs();
        this.fermerModal();
      },
      error: (err: any) => console.error(err)
    });
  }

  creerUtilisateur() { this.router.navigate(['/utilisateurs/nouveau']); }
  modifierUtilisateur(id: number) {
    this.fermerMenus();
    this.router.navigate(['/utilisateurs/modifier', id]);
  }

  getAvatarClass(role: string): string {
    switch(role) {
      case 'PRESIDENT': return 'av-president';
      case 'SECRETAIRE': return 'av-secretaire';
      case 'AGENT_SOCIAL': return 'av-agent';
      default: return 'av-admin';
    }
  }

  getRoleClass(role: string): string {
    switch(role) {
      case 'PRESIDENT': return 'r-president';
      case 'SECRETAIRE': return 'r-secretaire';
      case 'AGENT_SOCIAL': return 'r-agent';
      default: return 'r-admin';
    }
  }

  getRoleIcon(role: string): string {
    switch(role) {
      case 'PRESIDENT': return 'ti ti-crown';
      case 'SECRETAIRE': return 'ti ti-pencil';
      case 'AGENT_SOCIAL': return 'ti ti-search';
      default: return 'ti ti-settings';
    }
  }

  getInitiales(u: Utilisateur): string {
    return (u.prenom.charAt(0) + u.nom.charAt(0)).toUpperCase();
  }
}