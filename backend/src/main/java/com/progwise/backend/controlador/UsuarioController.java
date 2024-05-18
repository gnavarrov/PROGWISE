package com.progwise.backend.controlador;

import com.progwise.backend.modelo.Usuario;
import com.progwise.backend.servicio.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
        String email = usuario.getCorreo();
        if (usuario.getContraseña() == null) {
            return ResponseEntity.badRequest().body("La contraseña es obligatoria");
        }

        // Verificar si el correo electrónico ya está registrado
        if (usuarioService.existeUsuarioConEmail(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El correo electrónico ya está registrado");
        }

        // Lógica para guardar el usuario
        usuarioService.registrarUsuario(usuario);
        return ResponseEntity.ok(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Usuario usuario) {
        String correo = usuario.getCorreo();
        String contraseña = usuario.getContraseña();

        boolean credencialesValidas = usuarioService.validarCredenciales(correo, contraseña);

        if (credencialesValidas) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Inicio de sesión exitoso");
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Credenciales incorrectas");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
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