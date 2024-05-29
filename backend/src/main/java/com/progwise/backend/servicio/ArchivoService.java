package com.progwise.backend.servicio;
import com.progwise.backend.modelo.Archivo;
import com.progwise.backend.modelo.Proyecto;
import com.progwise.backend.modelo.Usuario;
import com.progwise.backend.repositorio.ArchivoRepository;
import com.progwise.backend.repositorio.ProyectoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service
public class ArchivoService {
    @Autowired
    private ArchivoRepository archivoRepository;

    public Archivo guardarArchivo(Archivo archivo) {
        return archivoRepository.save(archivo);
    }

    public List<Archivo> obtenerArchivosPorProyecto(Proyecto proyecto) {
        return archivoRepository.findByProyecto(proyecto);
    }

    // Otros métodos de servicio según sea necesario
}
