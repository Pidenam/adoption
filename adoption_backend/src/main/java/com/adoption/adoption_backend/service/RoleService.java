package com.adoption.adoption_backend.service;

import com.adoption.adoption_backend.dto.RoleDTO;
import com.adoption.adoption_backend.entity.Permission;
import com.adoption.adoption_backend.entity.Role;
import com.adoption.adoption_backend.repository.PermissionRepository;
import com.adoption.adoption_backend.repository.RoleRepository;
import com.adoption.adoption_backend.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final UtilisateurRepository utilisateurRepository;

    public List<RoleDTO.RoleResponse> getAllRoles() {
        return roleRepository.findAllByOrderByNomAsc()
                .stream()
                .filter(role -> !role.getNom().equals("ADMINISTRATEUR") && !role.getNom().equals("PRESIDENT"))
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<RoleDTO.PermissionResponse> getAllPermissions() {
        return permissionRepository.findAllOrderedByModuleAndCode()
                .stream()
                .map(this::toPermissionResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public RoleDTO.RoleResponse createRole(RoleDTO.RoleRequest request) {
        String codeNom = request.getNom().toUpperCase().trim().replace(" ", "_");
        if (roleRepository.existsByNom(codeNom)) {
            throw new RuntimeException("Un rôle avec ce nom existe déjà");
        }
        Role role = new Role();
        role.setNom(codeNom);
        role.setDescription(request.getDescription());
        role.setActif(true);
        role.setPermissions(resolvePermissions(request.getPermissionIds()));
        return toResponse(roleRepository.save(role));
    }

    @Transactional
    public RoleDTO.RoleResponse updateRole(Long id, RoleDTO.RoleRequest request) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rôle introuvable"));
        role.setDescription(request.getDescription());
        role.setPermissions(resolvePermissions(request.getPermissionIds()));
        return toResponse(roleRepository.save(role));
    }

    @Transactional
    public RoleDTO.RoleResponse toggleActif(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rôle introuvable"));
        role.setActif(!role.getActif());
        return toResponse(roleRepository.save(role));
    }

    private Set<Permission> resolvePermissions(List<Long> ids) {
        if (ids == null || ids.isEmpty()) return new HashSet<>();
        return new HashSet<>(permissionRepository.findAllById(ids));
    }

    private RoleDTO.RoleResponse toResponse(Role role) {
        RoleDTO.RoleResponse dto = new RoleDTO.RoleResponse();
        dto.setId(role.getId());
        dto.setNom(role.getNom());
        dto.setDescription(role.getDescription());
        dto.setActif(role.getActif());
        dto.setSysteme(role.getNom().equals("PRESIDENT"));
        dto.setNombreUtilisateurs(utilisateurRepository.countByRoleId(role.getId()));
        dto.setPermissions(role.getPermissions().stream()
                .map(this::toPermissionResponse)
                .collect(Collectors.toSet()));
        return dto;
    }

    private RoleDTO.PermissionResponse toPermissionResponse(Permission p) {
        RoleDTO.PermissionResponse dto = new RoleDTO.PermissionResponse();
        dto.setId(p.getId());
        dto.setCode(p.getCode());
        dto.setDescription(p.getDescription());
        dto.setModule(p.getModule());
        return dto;
    }
}