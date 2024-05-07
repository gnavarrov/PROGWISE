package com.progwise.backend.controlador;

import com.progwise.backend.modelo.Usuario;
import com.progwise.backend.servicio.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
        if (usuario.getContraseña() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("La contraseña es obligatoria");
        }
        // Lógica para guardar el usuario
        usuarioService.registrarUsuario(usuario);
        return ResponseEntity.ok(usuario);
    }


    @GetMapping("/listar")
    public ResponseEntity<List<Usuario>> listarTodosLosUsuarios() {
        List<Usuario> usuarios = usuarioService.obtenerTodosLosUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    // Método de prueba para verificar la conectividad
    @GetMapping("/test")
    public ResponseEntity<String> testController() {
        return ResponseEntity.ok("El controlador está funcionando correctamente.");
    }

}