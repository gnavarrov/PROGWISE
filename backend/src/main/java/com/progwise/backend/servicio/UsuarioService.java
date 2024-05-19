package com.progwise.backend.servicio;

import com.progwise.backend.modelo.Usuario;
import com.progwise.backend.repositorio.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

    public Usuario registrarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> obtenerTodosLosUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario autenticarUsuario(String correo, String contraseña) {
        if (correo == null) {
            return null; // Retorna null si el correo es null
        }
        Usuario usuario = usuarioRepository.findByCorreo(correo);
        if (usuario != null && usuario.getContraseña().equals(contraseña)) {
            return usuario;
        } else {
            return null; // Retorna null si las credenciales son incorrectas
        }
    }

    public boolean existeUsuarioPorCorreo(String correo) {
        return usuarioRepository.existsByCorreo(correo);
    }
}
