package com.progwise.backend.repositorio;

import com.progwise.backend.modelo.Proyecto;
import com.progwise.backend.modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {
    List<Proyecto> findByPropietario(Usuario propietario);
}
