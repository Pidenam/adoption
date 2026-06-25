import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  menuActif: string = 'dashboard';
  dateAujourdhui: string = '';
  rechercheSidebar: string = '';
  rechercheGlobale: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      const url = e.urlAfterRedirects;
      if (url.includes('utilisateurs')) this.menuActif = 'utilisateurs';
      else if (url.includes('orphelins')) this.menuActif = 'orphelins';
      else if (url.includes('adoptants')) this.menuActif = 'adoptants';
      else if (url.includes('dossiers')) this.menuActif = 'dossiers';
      else if (url.includes('adoptions')) this.menuActif = 'adoptions';
      else if (url.includes('enquetes')) this.menuActif = 'enquetes';
      else if (url.includes('paiements')) this.menuActif = 'paiements';
      else if (url.includes('rapports')) this.menuActif = 'rapports';
      else if (url.includes('dashboard')) this.menuActif = 'dashboard';
    });
  }

  ngOnInit() {
    const now = new Date();
    this.dateAujourdhui = now.toLocaleDateString('fr-FR', {
      weekday: 'long', year: 'numeric',
      month: 'long', day: 'numeric'
    });
  }

  naviguer(menu: string, route: string) {
    this.menuActif = menu;
    this.router.navigate([route]);
  }

  seDeconnecter() { this.authService.seDeconnecter(); }

  getNomUtilisateur(): string { return this.authService.getNomComplet(); }
  getRole(): string { return this.authService.getRole() || ''; }

  getInitiale(): string {
    const nom = this.authService.getNomComplet();
    return nom ? nom.charAt(0).toUpperCase() : 'U';
  }

  getPageTitle(): string {
    const titles: any = {
      dashboard: 'Tableau de bord',
      utilisateurs: 'Gestion des utilisateurs',
      orphelins: 'Gestion des orphelins',
      dossiers: "Dossiers d'adoption",
      adoptants: 'Gestion des adoptants',
      adoptions: 'Suivi des adoptions',
      enquetes: 'Enquêtes sociales',
      paiements: 'Paiements',
      communications: 'Communications',
      rapports: 'Rapports & Statistiques'
    };
    return titles[this.menuActif] || 'SGAOA';
  }

  getPageIcon(): string {
    const icons: any = {
      dashboard: 'ti ti-layout-dashboard',
      utilisateurs: 'ti ti-users',
      orphelins: 'ti ti-baby-carriage',
      dossiers: 'ti ti-folder-open',
      adoptants: 'ti ti-heart',
      adoptions: 'ti ti-refresh',
      enquetes: 'ti ti-search',
      paiements: 'ti ti-credit-card',
      communications: 'ti ti-message',
      rapports: 'ti ti-chart-bar'
    };
    return icons[this.menuActif] || 'ti ti-home';
  }
}