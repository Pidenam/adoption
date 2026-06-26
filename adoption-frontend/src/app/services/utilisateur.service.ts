import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur, UtilisateurRequest } from '../models/utilisateur.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

private apiUrl = `${environment.apiUrl}/api/orphelins`;

  constructor(private http: HttpClient) {}

  listerUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.apiUrl);
  }

  trouverParId(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/${id}`);
  }

  creerUtilisateur(data: UtilisateurRequest): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.apiUrl, data);
  }

  modifierUtilisateur(id: number, data: UtilisateurRequest): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.apiUrl}/${id}`, data);
  }
  supprimerUtilisateur(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

  toggleActif(id: number): Observable<Utilisateur> {
    return this.http.patch<Utilisateur>(`${this.apiUrl}/${id}/toggle`, {});
  }
}