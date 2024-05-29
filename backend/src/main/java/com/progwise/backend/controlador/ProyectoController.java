package com.progwise.backend.controlador;

import com.progwise.backend.modelo.Proyecto;
import com.progwise.backend.modelo.Usuario;
import com.progwise.backend.servicio.ProyectoService;
import com.progwise.backend.servicio.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/proyectos")
public class ProyectoController {

    @Autowired
    private ProyectoService proyectoService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/crear")
    public ResponseEntity<Proyecto> crearProyecto(@RequestBody Proyecto proyecto) {
        if (proyecto.getPropietarioId() == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Optional<Usuario> propietarioOpt = usuarioService.obtenerUsuarioPorId(proyecto.getPropietarioId());
        if (!propietarioOpt.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        proyecto.setPropietario(propietarioOpt.get());
        Proyecto nuevoProyecto = proyectoService.crearProyecto(proyecto);
        return ResponseEntity.ok(nuevoProyecto);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Proyecto>> obtenerProyectosPorUsuario(@PathVariable Long usuarioId) {
        Optional<Usuario> usuarioOpt = usuarioService.obtenerUsuarioPorId(usuarioId);
        if (!usuarioOpt.isPresent()) {
            return ResponseEntity.badRequest().body(null);
        }
        Usuario usuario = usuarioOpt.get();
        List<Proyecto> proyectos = proyectoService.obtenerProyectosPorUsuario(usuario);
        return ResponseEntity.ok(proyectos);
    }
}
