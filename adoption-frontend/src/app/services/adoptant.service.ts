import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adoptant, AdoptantRequest } from '../models/adoptant.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdoptantService {

private apiUrl = `${environment.apiUrl}/api/adoptants`;

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