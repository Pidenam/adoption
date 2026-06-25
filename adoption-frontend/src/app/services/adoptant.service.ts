import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adoptant, AdoptantRequest } from '../models/adoptant.model';

@Injectable({
  providedIn: 'root'
})
export class AdoptantService {

  private apiUrl = 'http://localhost:8080/api/adoptants';

  constructor(private http: HttpClient) {}

  listerAdoptants(): Observable<Adoptant[]> {
    return this.http.get<Adoptant[]>(this.apiUrl);
  }

  trouverParId(id: number): Observable<Adoptant> {
    return this.http.get<Adoptant>(`${this.apiUrl}/${id}`);
  }

  inscrire(data: AdoptantRequest): Observable<Adoptant> {
    return this.http.post<Adoptant>(`${this.apiUrl}/inscription`, data);
  }
}