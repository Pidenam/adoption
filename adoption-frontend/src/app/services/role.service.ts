import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role, RoleRequest, Permission } from '../models/role.model';

@Injectable({ providedIn: 'root' })
export class RoleService {

  private apiUrl = 'http://localhost:8080/api/roles';

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