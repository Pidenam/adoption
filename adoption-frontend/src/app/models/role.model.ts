export interface Permission {
  id: number;
  code: string;
  description: string;
  module: string;
}

export interface Role {
  id: number;
  nom: string;
  description: string;
  actif: boolean;
  nombreUtilisateurs: number;
  permissions: Permission[];
}

export interface RoleRequest {
  nom: string;
  description: string;
  permissionIds: number[];
}

export interface PermissionParModule {
  module: string;
  permissions: Permission[];
}