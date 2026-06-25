package com.adoption.adoption_backend.dto;

import lombok.Data;
import java.util.List;
import java.util.Set;

public class RoleDTO {

    @Data
    public static class PermissionResponse {
        private Long id;
        private String code;
        private String description;
        private String module;
    }

    @Data
    public static class RoleResponse {
        private Long id;
        private String nom;
        private String description;
        private Boolean actif;
        private int nombreUtilisateurs;
        private boolean systeme;
        private Set<PermissionResponse> permissions;
    }

    @Data
    public static class RoleRequest {
        private String nom;
        private String description;
        private List<Long> permissionIds;
    }
}