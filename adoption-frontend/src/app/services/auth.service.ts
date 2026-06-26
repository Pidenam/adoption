import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

private apiUrl = `${environment.apiUrl}/api/auth`;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  loginStaff(email: string, motDePasse: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, motDePasse }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('nom', res.nom);
        localStorage.setItem('prenom', res.prenom);
        localStorage.setItem('email', res.email);
      })
    );
  }

  loginAdoptant(email: string, motDePasse: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login-adoptant`, { email, motDePasse }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('nom', res.nom);
        localStorage.setItem('prenom', res.prenom);
        localStorage.setItem('email', res.email);
      })
    );
  }

  seDeconnecter() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  estConnecte(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getNomComplet(): string {
    const nom = localStorage.getItem('nom') || '';
    const prenom = localStorage.getItem('prenom') || '';
    return `${prenom} ${nom}`.trim();
  }
}