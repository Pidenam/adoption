import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  periodeActive = '6M';
  periodeFiltres = ['6M', '1A', 'Tout'];
  dossierFiltreActif = 'tous';

  moisLabels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'];

  dossierFiltres = [
    { label: 'Tous', val: 'tous' },
    { label: 'Attente', val: 'En attente' },
    { label: 'Validés', val: 'Validé' }
  ];

  statsCards = [
    {
      icon: 'ti ti-baby-carriage', color: 'green',
      valeur: 47, label: 'Orphelins enregistrés',
      trend: '+3', trendType: 'up', strokeColor: '#006633',
      sparkline: '0,18 15,14 30,16 45,10 60,12 75,6 100,8',
      sparklineFill: '0,18 15,14 30,16 45,10 60,12 75,6 100,8 100,24 0,24'
    },
    {
      icon: 'ti ti-folder-open', color: 'blue',
      valeur: 23, label: 'Dossiers en cours',
      trend: '3', trendType: 'down', strokeColor: '#1565c0',
      sparkline: '0,8 15,12 30,10 45,16 60,14 75,18 100,15',
      sparklineFill: '0,8 15,12 30,10 45,16 60,14 75,18 100,15 100,24 0,24'
    },
    {
      icon: 'ti ti-circle-check', color: 'green',
      valeur: 89, label: 'Adoptions validées',
      trend: '+7', trendType: 'up', strokeColor: '#006633',
      sparkline: '0,20 15,16 30,18 45,12 60,8 75,5 100,3',
      sparklineFill: '0,20 15,16 30,18 45,12 60,8 75,5 100,3 100,24 0,24'
    },
    {
      icon: 'ti ti-users', color: 'yellow',
      valeur: 12, label: 'Utilisateurs actifs',
      trend: '+2', trendType: 'up', strokeColor: '#b8860b',
      sparkline: '0,16 15,14 30,18 45,12 60,14 75,10 100,8',
      sparklineFill: '0,16 15,14 30,18 45,12 60,14 75,10 100,8 100,24 0,24'
    }
  ];

  donutData = [
    { label: 'Validés', valeur: 10, pct: 43, couleur: '#006633' },
    { label: 'En attente', valeur: 8, pct: 35, couleur: '#FFD100' },
    { label: 'En révision', valeur: 3, pct: 13, couleur: '#1565c0' },
    { label: 'Rejetés', valeur: 2, pct: 9, couleur: '#CC0000' }
  ];

  derniersDossiers = [
    { adoptant: 'TCHODOU R.', orphelin: 'Kofi A.', date: '20/06/26', statut: 'En attente' },
    { adoptant: 'MENSAH P.', orphelin: 'Ama K.', date: '19/06/26', statut: 'En révision' },
    { adoptant: 'AGBEKO S.', orphelin: 'Kosi D.', date: '18/06/26', statut: 'Validé' },
    { adoptant: 'DOSSOU M.', orphelin: 'Yawa F.', date: '17/06/26', statut: 'En attente' }
  ];

  activites = [
    { texte: 'Dossier #D-2026-047 validé par la Secrétaire', temps: 'En direct', icon: 'ti ti-circle-check', bg: '#e8f5e9', color: '#006633' },
    { texte: 'Nouvel adoptant inscrit — MENSAH Pierre', temps: 'Il y a 1h', icon: 'ti ti-user-plus', bg: '#fff8e1', color: '#b8860b' },
    { texte: 'Enquête sociale planifiée — Agent AYENA', temps: 'Il y a 2h', icon: 'ti ti-search', bg: '#e3f2fd', color: '#1565c0' },
    { texte: 'Bordereau #P-089 en attente de validation', temps: 'Il y a 3h', icon: 'ti ti-credit-card', bg: '#ffebee', color: '#CC0000' }
  ];

  ngOnInit() {}

  getDossiersFiltres() {
    if (this.dossierFiltreActif === 'tous') return this.derniersDossiers;
    return this.derniersDossiers.filter(d => d.statut === this.dossierFiltreActif);
  }

  getStatutClass(statut: string): string {
    switch(statut) {
      case 'Validé': return 'p-green';
      case 'En révision': return 'p-blue';
      case 'En attente': return 'p-yellow';
      default: return 'p-red';
    }
  }
}