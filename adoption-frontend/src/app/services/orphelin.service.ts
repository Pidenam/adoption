import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orphelin, OrphelinRequest } from '../models/orphelin.model';

@Injectable({ providedIn: 'root' })
export class OrphelinService {

  private apiUrl = 'http://localhost:8080/api/orphelins';

  constructor(private http: HttpClient) {}

  getOrphelins(): Observable<Orphelin[]> {
    return this.http.get<Orphelin[]>(this.apiUrl);
  }

  getOrphelinById(id: number): Observable<Orphelin> {
    return this.http.get<Orphelin>(`${this.apiUrl}/${id}`);
  }

  creerOrphelin(request: OrphelinRequest): Observable<Orphelin> {
    return this.http.post<Orphelin>(this.apiUrl, request);
  }

  modifierOrphelin(id: number, request: OrphelinRequest): Observable<Orphelin> {
    return this.http.put<Orphelin>(`${this.apiUrl}/${id}`, request);
  }

  toggleActif(id: number): Observable<Orphelin> {
    return this.http.patch<Orphelin>(`${this.apiUrl}/${id}/toggle`, {});
  }
  getUrlTelechargement(id: number): string {
    return `${this.apiUrl}/telecharger/${id}`;
  }
}