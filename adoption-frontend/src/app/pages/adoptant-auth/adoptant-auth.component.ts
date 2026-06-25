import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdoptantService } from '../../services/adoptant.service';
import { AuthService } from '../../services/auth.service';
import { AdoptantRequest } from '../../models/adoptant.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-adoptant-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './adoptant-auth.component.html',
  styleUrl: './adoptant-auth.component.css'
})
export class AdoptantAuthComponent {

  onglet: string = 'inscription';

  loginEmail: string = '';
  loginPassword: string = '';
  showLoginPassword: boolean = false;

  inscription: AdoptantRequest = {
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    telephone: '',
    adresse: '',
    situationMatrimoniale: ''
  };
  showInscriptionPassword: boolean = false;

  situationsDisponibles = [
    'Célibataire', 'Marié(e)', 'Divorcé(e)', 'Veuf(ve)'
  ];

  constructor(
    private router: Router,
    private adoptantService: AdoptantService,
    private authService: AuthService
  ) {}

  switchOnglet(o: string) { this.onglet = o; }
  toggleLoginPassword() { this.showLoginPassword = !this.showLoginPassword; }
  toggleInscriptionPassword() { this.showInscriptionPassword = !this.showInscriptionPassword; }

  onLogin() {
    this.authService.loginAdoptant(this.loginEmail, this.loginPassword).subscribe({
      next: (res: any) => {
        console.log('Connecté :', res);
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => console.error('Erreur connexion :', err)
    });
  }

  onInscrire() {
    this.adoptantService.inscrire(this.inscription).subscribe({
      next: (res: any) => {
        console.log('Inscription réussie :', res);
        this.onglet = 'connexion';
      },
      error: (err: any) => console.error('Erreur inscription :', err)
    });
  }
}