import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilisateurService } from '../../services/utilisateur.service';
import { RoleService } from '../../services/role.service';
import { UtilisateurRequest } from '../../models/utilisateur.model';
import { Role } from '../../models/role.model';

@Component({
  selector: 'app-utilisateur-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './utilisateur-form.component.html',
  styleUrl: './utilisateur-form.component.css'
})
export class UtilisateurFormComponent implements OnInit {

  mode: string = 'creation';
  utilisateurId: number | null = null;

  form: UtilisateurRequest = {
    nom: '', prenom: '', email: '',
    motDePasse: '', telephone: '', roleId: 0 as any
  };

  roles: Role[] = [];
  showPassword = false;
  chargement = false;
  erreur = '';
  succes = '';
  pwdScore = 0;
  roleNomActuel = '';

  rolesInfo = [
    { id: 0, nom: 'PRESIDENT', couleur: '#FFD100', description: 'Accès complet, validation finale des adoptions' },
    { id: 0, nom: 'SECRETAIRE', couleur: '#1565c0', description: 'Gestion des dossiers administratifs' },
    { id: 0, nom: 'AGENT_SOCIAL', couleur: '#7b1fa2', description: 'Enquêtes sociales et rapports de terrain' },
    { id: 0, nom: 'ADMINISTRATEUR', couleur: '#880e4f', description: 'Gestion technique de la plateforme' },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utilisateurService: UtilisateurService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mode = 'edition';
      this.utilisateurId = +id;
    }
    this.chargerRoles();
  }

  chargerRoles() {
    this.roleService.getRoles().subscribe({
      next: (data: Role[]) => {
        this.roles = data;
        this.rolesInfo = this.rolesInfo.map(ri => {
          const r = data.find(r => r.nom === ri.nom);
          return { ...ri, id: r ? r.id : 0 };
        });
        if (this.mode === 'edition' && this.utilisateurId) {
          this.chargerUtilisateur(this.utilisateurId);
        }
      },
      error: (err: any) => console.error(err)
    });
  }

  chargerUtilisateur(id: number) {
    this.utilisateurService.trouverParId(id).subscribe({
      next: (u: any) => {
        this.form.nom = u.nom;
        this.form.prenom = u.prenom;
        this.form.email = u.email;
        this.form.telephone = u.telephone;
        this.roleNomActuel = u.roleNom;
        const role = this.roles.find((r: Role) => r.nom === u.roleNom);
        if (role) this.form.roleId = role.id;
      },
      error: (err: any) => console.error(err)
    });
  }

  togglePassword() { this.showPassword = !this.showPassword; }

  checkPasswordStrength() {
    const pwd = this.form.motDePasse;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    this.pwdScore = score;
  }

  getPwdBarClass(index: number): string {
    if (this.pwdScore === 0) return '';
    if (this.pwdScore === 1 && index <= 1) return 'weak';
    if (this.pwdScore === 2 && index <= 2) return 'medium';
    if (this.pwdScore === 3 && index <= 3) return 'strong';
    if (this.pwdScore >= 4) return 'strong';
    return '';
  }

  getPwdLabel(): string {
    switch(this.pwdScore) {
      case 1: return 'Faible';
      case 2: return 'Moyen';
      case 3: return 'Fort';
      case 4: return 'Très fort';
      default: return '';
    }
  }

  getPwdLabelClass(): string {
    switch(this.pwdScore) {
      case 1: return 'weak';
      case 2: return 'medium';
      case 3: case 4: return 'strong';
      default: return '';
    }
  }

  getInitiales(): string {
    const p = this.form.prenom.charAt(0).toUpperCase();
    const n = this.form.nom.charAt(0).toUpperCase();
    return (p + n) || '?';
  }

  getRoleSelectionne(): string {
    const r = this.roles.find(r => r.id === +this.form.roleId);
    return r ? r.nom : '';
  }

  getAvatarClass(): string {
    const nom = this.getRoleSelectionne();
    switch(nom) {
      case 'PRESIDENT': return 'av-president';
      case 'SECRETAIRE': return 'av-secretaire';
      case 'AGENT_SOCIAL': return 'av-agent';
      default: return 'av-default';
    }
  }

  getRoleClass(): string {
    const nom = this.getRoleSelectionne();
    switch(nom) {
      case 'PRESIDENT': return 'r-president';
      case 'SECRETAIRE': return 'r-secretaire';
      case 'AGENT_SOCIAL': return 'r-agent';
      default: return 'r-admin';
    }
  }

  estPresident(): boolean {
    return this.roleNomActuel === 'PRESIDENT';
  }

  selectionnerRole(id: number) {
    this.form.roleId = id;
  }

  updatePreview() {}

  onSubmit() {
    if (!this.form.nom || !this.form.prenom || !this.form.email) {
      this.erreur = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }
    if (!this.estPresident() && !this.form.roleId) {
      this.erreur = 'Veuillez sélectionner un rôle.';
      return;
    }
    if (this.mode === 'creation' && !this.form.motDePasse) {
      this.erreur = 'Le mot de passe est obligatoire à la création.';
      return;
    }
    this.chargement = true;
    this.erreur = '';
    this.succes = '';

    if (this.mode === 'creation') {
      this.utilisateurService.creerUtilisateur(this.form).subscribe({
        next: () => {
          this.succes = 'Utilisateur créé avec succès !';
          this.chargement = false;
          setTimeout(() => this.router.navigate(['/utilisateurs']), 1500);
        },
        error: (err: any) => {
          this.erreur = err.error?.message || 'Erreur lors de la création.';
          this.chargement = false;
        }
      });
    } else {
      this.utilisateurService.modifierUtilisateur(this.utilisateurId!, this.form).subscribe({
        next: () => {
          this.succes = 'Utilisateur modifié avec succès !';
          this.chargement = false;
          setTimeout(() => this.router.navigate(['/utilisateurs']), 1500);
        },
        error: (err: any) => {
          this.erreur = err.error?.message || 'Erreur lors de la modification.';
          this.chargement = false;
        }
      });
    }
  }

  annuler() { this.router.navigate(['/utilisateurs']); }
}