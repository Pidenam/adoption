import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentOrphelin } from '../models/document-orphelin.model';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class DocumentOrphelinService {
private apiUrl = `${environment.apiUrl}/api/orphelins`;

  constructor(private http: HttpClient) {}

  upload(orphelinId: number, typeDocument: string, fichier: File): Observable<DocumentOrphelin> {
    const formData = new FormData();
    formData.append('orphelinId', orphelinId.toString());
    formData.append('typeDocument', typeDocument);
    formData.append('fichier', fichier);
    return this.http.post<DocumentOrphelin>(`${this.apiUrl}/upload`, formData);
  }

  listerParOrphelin(orphelinId: number): Observable<DocumentOrphelin[]> {
    return this.http.get<DocumentOrphelin[]>(`${this.apiUrl}/orphelin/${orphelinId}`);
  }
  getUrlTelechargement(id: number): string {
    return `${this.apiUrl}/telecharger/${id}`;
  }
  telechargerFichier(id: number) {
    return this.http.get(`${this.apiUrl}/telecharger/${id}`, { responseType: 'blob' });
  }
}