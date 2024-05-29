package com.progwise.backend.servicio;

import com.progwise.backend.modelo.Proyecto;
import com.progwise.backend.modelo.Usuario;
import com.progwise.backend.repositorio.ProyectoRepository;
import com.progwise.backend.repositorio.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProyectoService {

    @Autowired
    private ProyectoRepository proyectoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Proyecto crearProyecto(Proyecto proyecto) {
        Optional<Usuario> propietarioOpt = usuarioRepository.findById(proyecto.getPropietario().getUsuarioId());
        if (propietarioOpt.isPresent()) {
            proyecto.setPropietario(propietarioOpt.get());
        } else {
            throw new IllegalArgumentException("Usuario propietario no encontrado");
        }
        return proyectoRepository.save(proyecto);
    }

    public List<Proyecto> obtenerProyectosPorUsuario(Usuario usuario) {
        return proyectoRepository.findByPropietario(usuario);
    }
}
