import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role, RoleRequest, Permission } from '../models/role.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RoleService {

private apiUrl = `${environment.apiUrl}/api/orphelins`;

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl);
  }

  getPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.apiUrl}/permissions`);
  }

  createRole(request: RoleRequest): Observable<Role> {
    return this.http.post<Role>(this.apiUrl, request);
  }

  updateRole(id: number, request: RoleRequest): Observable<Role> {
    return this.http.put<Role>(`${this.apiUrl}/${id}`, request);
  }

  toggleActif(id: number): Observable<Role> {
    return this.http.patch<Role>(`${this.apiUrl}/${id}/toggle`, {});
  }
}