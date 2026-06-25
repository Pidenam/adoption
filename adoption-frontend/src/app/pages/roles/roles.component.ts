import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Role, Permission, PermissionParModule, RoleRequest } from '../../models/role.model';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles: Role[] = [];
  permissionsParModule: PermissionParModule[] = [];
  loading = false;
  modalOuvert = false;
  modeEdition = false;
  roleEnCours: Role | null = null;

  form: RoleRequest = { nom: '', description: '', permissionIds: [] };
  codeAuto = '';
  permissionsSelectionnees: Permission[] = [];
  erreur = '';
  succes = '';

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.chargerRoles();
    this.chargerPermissions();
  }

  chargerRoles(): void {
    this.loading = true;
    this.roleService.getRoles().subscribe({
      next: (data) => { this.roles = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  chargerPermissions(): void {
    this.roleService.getPermissions().subscribe({
      next: (data) => {
        const map = new Map<string, Permission[]>();
        data.forEach(p => {
          if (!map.has(p.module)) map.set(p.module, []);
          map.get(p.module)!.push(p);
        });
        this.permissionsParModule = Array.from(map.entries()).map(([module, permissions]) => ({ module, permissions }));
      }
    });
  }

  ouvrirModalCreation(): void {
    this.modeEdition = false;
    this.roleEnCours = null;
    this.form = { nom: '', description: '', permissionIds: [] };
    this.codeAuto = '';
    this.permissionsSelectionnees = [];
    this.erreur = '';
    this.modalOuvert = true;
  }

  ouvrirModalEdition(role: Role): void {
    this.modeEdition = true;
    this.roleEnCours = role;
    this.form = {
      nom: role.nom,
      description: role.description || '',
      permissionIds: role.permissions.map(p => p.id)
    };
    this.codeAuto = role.nom;
    this.permissionsSelectionnees = [...role.permissions];
    this.erreur = '';
    this.modalOuvert = true;
  }

  fermerModal(): void {
    this.modalOuvert = false;
  }

  onNomChange(): void {
    this.codeAuto = this.form.nom.toUpperCase().trim().replace(/\s+/g, '_');
  }

  isSelectionnee(permission: Permission): boolean {
    return this.form.permissionIds.includes(permission.id);
  }

  togglePermission(permission: Permission): void {
    const idx = this.form.permissionIds.indexOf(permission.id);
    if (idx === -1) {
      this.form.permissionIds.push(permission.id);
      this.permissionsSelectionnees.push(permission);
    } else {
      this.form.permissionIds.splice(idx, 1);
      this.permissionsSelectionnees = this.permissionsSelectionnees.filter(p => p.id !== permission.id);
    }
  }

  retirerPermission(permission: Permission): void {
    this.togglePermission(permission);
  }

  enregistrer(): void {
    if (!this.form.nom.trim()) { this.erreur = 'Le nom du rôle est obligatoire.'; return; }
    this.erreur = '';
    const obs = this.modeEdition && this.roleEnCours
      ? this.roleService.updateRole(this.roleEnCours.id, this.form)
      : this.roleService.createRole(this.form);

    obs.subscribe({
      next: () => {
        this.fermerModal();
        this.chargerRoles();
        this.succes = this.modeEdition ? 'Rôle modifié avec succès.' : 'Rôle créé avec succès.';
        setTimeout(() => this.succes = '', 3000);
      },
      error: (err) => {
        this.erreur = err?.error?.message || 'Une erreur est survenue.';
      }
    });
  }

  toggleActif(role: Role): void {
    this.roleService.toggleActif(role.id).subscribe({
      next: () => this.chargerRoles()
    });
  }
}