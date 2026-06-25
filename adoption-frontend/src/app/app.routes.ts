import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdoptantAuthComponent } from './pages/adoptant-auth/adoptant-auth.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UtilisateursComponent } from './pages/utilisateurs/utilisateurs.component';
import { UtilisateurFormComponent } from './pages/utilisateur-form/utilisateur-form.component';
import { RolesComponent } from './pages/roles/roles.component';
import { OrphelinsComponent } from './pages/orphelins/orphelins.component';
import { OrphelinFormComponent } from './pages/orphelin-form/orphelin-form.component';
import { OrphelinDetailComponent } from './pages/orphelin-detail/orphelin-detail.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'adoptant', component: AdoptantAuthComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'utilisateurs', component: UtilisateursComponent },
      { path: 'utilisateurs/nouveau', component: UtilisateurFormComponent },
      { path: 'utilisateurs/modifier/:id', component: UtilisateurFormComponent },
      { path: 'roles', component: RolesComponent, canActivate: [authGuard] },
      { path: 'orphelins', component: OrphelinsComponent, canActivate: [authGuard] },
      { path: 'orphelins/nouveau', component: OrphelinFormComponent, canActivate: [authGuard] },
      { path: 'orphelins/modifier/:id', component: OrphelinFormComponent, canActivate: [authGuard] },
      { path: 'orphelins/detail/:id', component: OrphelinDetailComponent, canActivate: [authGuard] },
    ]
  }
];