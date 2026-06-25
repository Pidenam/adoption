package com.adoption.adoption_backend.controller;

import com.adoption.adoption_backend.dto.RoleDTO;
import com.adoption.adoption_backend.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @GetMapping
    public ResponseEntity<List<RoleDTO.RoleResponse>> getAllRoles() {
        return ResponseEntity.ok(roleService.getAllRoles());
    }

    @GetMapping("/permissions")
    public ResponseEntity<List<RoleDTO.PermissionResponse>> getAllPermissions() {
        return ResponseEntity.ok(roleService.getAllPermissions());
    }

    @PostMapping
    public ResponseEntity<RoleDTO.RoleResponse> createRole(@RequestBody RoleDTO.RoleRequest request) {
        return ResponseEntity.ok(roleService.createRole(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoleDTO.RoleResponse> updateRole(@PathVariable Long id, @RequestBody RoleDTO.RoleRequest request) {
        return ResponseEntity.ok(roleService.updateRole(id, request));
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<RoleDTO.RoleResponse> toggleActif(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.toggleActif(id));
    }
}