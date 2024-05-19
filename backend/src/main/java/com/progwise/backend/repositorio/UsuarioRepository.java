package com.progwise.backend.repositorio;

import com.progwise.backend.modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByCorreo(String correo);
    boolean existsByCorreo(String correo);
}
