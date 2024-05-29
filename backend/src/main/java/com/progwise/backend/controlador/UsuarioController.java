package com.progwise.backend.controlador;

import com.progwise.backend.modelo.Usuario;
import com.progwise.backend.servicio.UsuarioService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario, HttpServletResponse response) {
        if (usuarioService.existeUsuarioPorCorreo(usuario.getCorreo())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El correo ya está registrado");
        }

        if (usuario.getContraseña() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("La contraseña es obligatoria");
        }

        Usuario registrado = usuarioService.registrarUsuario(usuario);

        // Configuración de la cookie para la sesión
        Cookie cookie = new Cookie("userSession", registrado.getUsuarioId().toString());
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);

        return ResponseEntity.ok(registrado);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody Usuario usuario, HttpServletResponse response) {
        Usuario usuarioAutenticado = usuarioService.autenticarUsuario(usuario.getCorreo(), usuario.getContraseña());
        if (usuarioAutenticado != null) {
            // Configuración de la cookie para la sesión
            Cookie cookie = new Cookie("userSession", usuarioAutenticado.getUsuarioId().toString());
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            response.addCookie(cookie);

            return ResponseEntity.ok(usuarioAutenticado);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
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
