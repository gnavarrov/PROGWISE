package com.progwise.backend.controlador;

import com.progwise.backend.modelo.Archivo;
import com.progwise.backend.modelo.Proyecto;
import com.progwise.backend.servicio.ArchivoService;
import com.progwise.backend.servicio.ProyectoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/archivos")
public class ArchivoController {
    @Autowired
    private ArchivoService archivoService;
    private ProyectoService proyectoService;

    @PostMapping("/subir")
    public ResponseEntity<Archivo> subirArchivo(@RequestBody Archivo archivo) {
        Archivo nuevoArchivo = archivoService.guardarArchivo(archivo);
        return ResponseEntity.ok(nuevoArchivo);
    }

//    @GetMapping("/proyecto/{proyectoId}")
//    public ResponseEntity<List<Archivo>> obtenerArchivosPorProyecto(@PathVariable Long proyectoId) {
//        Proyecto proyecto = proyectoService.obtenerProyectoPorId(proyectoId);
//        List<Archivo> archivos = archivoService.obtenerArchivosPorProyecto(proyecto);
//        return ResponseEntity.ok(archivos);
//    }

    // Otros endpoints según sea necesario
}
