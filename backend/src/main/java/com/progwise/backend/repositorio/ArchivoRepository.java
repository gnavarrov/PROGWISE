package com.progwise.backend.repositorio;

import com.progwise.backend.modelo.Archivo;
import com.progwise.backend.modelo.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArchivoRepository extends JpaRepository<Archivo, Long> {
    List<Archivo> findByProyecto(Proyecto proyecto);
}
